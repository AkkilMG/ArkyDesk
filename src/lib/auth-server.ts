import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { ObjectId } from "mongodb";

import { decrypt } from "@/lib/crypto";
import { getMongoClient } from "@/lib/mongodb";
import { decryptSession } from "@/lib/session";
import { logSecurityEvent } from "@/lib/security-log";

/**
 * Server-side authorisation (ISO 27001:2022 A.5.15 access control, A.8.2
 * privileged access, A.8.5 secure authentication).
 *
 * This is the second of three enforcement layers:
 *   1. `src/middleware.ts`  — edge, JWT structure only, blocks anonymous hits.
 *   2. this module          — Node runtime, resolves the user document and the
 *                             role, so a guest can never reach admin surfaces.
 *   3. `SessionGuard`       — client, re-validates on tab focus / interval.
 *
 * Reads are wrapped in React `cache()` so a page that needs the user in three
 * places still performs exactly one database round-trip per request.
 */

/** The only fields allowed to leave the server. Never widen this. */
export const USER_PROJECTION = {
  name: 1,
  email: 1,
  admin: 1,
  guest: 1,
  temporary: 1,
  verify: 1,
  createdAt: 1,
} as const;

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  admin: boolean;
  /** Guest sessions (magic-link, no password) are restricted to /tickets + /profile. */
  guest: boolean;
  temporary: boolean;
  verify: boolean;
  createdAt: string | null;
};

export type AccessRole = "member" | "admin";

export type PageAccess =
  | { status: "authorized"; user: SessionUser }
  | { status: "unauthenticated"; reason: "no_session" | "invalid_session" }
  | { status: "forbidden"; user: SessionUser; reason: "guest" | "role" };

/**
 * A record counts as a guest session when *either* flag is set. The magic-link
 * intake writes `guest` and `temporary` in separate code paths, so testing only
 * `guest` would let a half-migrated record reach a privileged surface.
 */
function isGuestSession(user: Pick<SessionUser, "guest" | "temporary">) {
  return Boolean(user.guest || user.temporary);
}

/**
 * Resolve the current session to a user document.
 *
 * Returns `null` for both "no cookie" and "cookie does not resolve to a live
 * user" — callers must not be able to distinguish the two, since that
 * distinction is an account-enumeration oracle (ISO 27001:2022 A.8.11).
 */
export const getSessionUser = cache(async (): Promise<SessionUser | null> => {
  const sessionCookie = cookies().get("session")?.value;
  if (!sessionCookie) return null;

  const payload = await decryptSession(sessionCookie);
  if (!payload || typeof payload.token !== "string" || !payload.token) return null;

  const userId = await decrypt(payload.token);
  if (!userId || !ObjectId.isValid(userId)) return null;

  const db = await getMongoClient();
  const user = await db.collection("users").findOne(
    { _id: new ObjectId(userId) },
    { projection: USER_PROJECTION }
  );
  if (!user) return null;

  return {
    id: user._id.toString(),
    name: user.name ?? "Customer",
    email: user.email ?? "",
    admin: Boolean(user.admin),
    guest: Boolean(user.guest),
    temporary: Boolean(user.temporary),
    verify: Boolean(user.verify),
    createdAt: user.createdAt ? new Date(user.createdAt).toISOString() : null,
  };
});

/**
 * Resolve access for a protected page.
 *
 * `role: "admin"` requires `admin === true` and additionally rejects guest
 * sessions, so a guest can never reach the dashboard or /admin/* even if a
 * privilege flag is ever mis-assigned. `role: "member"` admits guests, which
 * keeps their ticket workspace reachable.
 */
export const getPageAccess = cache(
  async (role: AccessRole = "member"): Promise<PageAccess> => {
    const user = await getSessionUser();
    if (!user) {
      return { status: "unauthenticated", reason: "no_session" };
    }

    if (isGuestSession(user) && role === "admin") {
      logSecurityEvent("access.denied", {
        userId: user.id,
        path: role,
        reason: "guest",
      });
      return { status: "forbidden", user, reason: "guest" };
    }

    if (!user.admin && role === "admin") {
      logSecurityEvent("access.denied", {
        userId: user.id,
        path: role,
        reason: "role",
      });
      return { status: "forbidden", user, reason: "role" };
    }

    return { status: "authorized", user };
  }
);

/**
 * Hard requirement of a valid session. Redirects to /signin when absent.
 * Use in Server Components only.
 */
export async function requireUser(nextPath = "/"): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) {
    const target = nextPath.startsWith("/") ? nextPath : "/";
    redirect(`/signin?next=${encodeURIComponent(target)}&reason=session`);
  }
  return user;
}

/** Hard requirement of an authenticated, non-guest administrator. */
export async function requireAdmin(): Promise<SessionUser> {
  const access = await getPageAccess("admin");
  if (access.status === "unauthenticated") {
    redirect("/signin?reason=session");
  }
  if (access.status === "forbidden") {
    // Deliberately not a redirect: the page renders <AccessRestricted /> so the
    // visitor learns *why* they were stopped rather than being silently bounced.
    throw new AccessForbiddenError(access.reason, access.user);
  }
  return access.user;
}

export class AccessForbiddenError extends Error {
  readonly reason: "guest" | "role";
  readonly user: SessionUser;
  constructor(reason: "guest" | "role", user: SessionUser) {
    super(
      reason === "guest"
        ? "Guest sessions cannot access administrator surfaces."
        : "Administrator privileges are required for this page."
    );
    this.name = "AccessForbiddenError";
    this.reason = reason;
    this.user = user;
  }
}

/**
 * Where a user should land after signing in, based on their role.
 * Guests and members go to the ticket workspace; admins go to the dashboard.
 */
export function defaultRouteFor(user: Pick<SessionUser, "admin" | "guest" | "temporary">) {
  if (user.admin && !isGuestSession(user)) return "/dashboard";
  if (isGuestSession(user)) return "/tickets?guest=1";
  return "/tickets";
}
