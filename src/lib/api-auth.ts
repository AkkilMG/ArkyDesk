import "server-only";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

import { decrypt } from "@/lib/crypto";
import { getMongoClient } from "@/lib/mongodb";
import { decryptSession } from "@/lib/session";
import { logSecurityEvent } from "@/lib/security-log";
import { USER_PROJECTION, type SessionUser } from "@/lib/auth-server";

/**
 * Route-handler authorisation helpers (ISO 27001:2022 A.8.2 privileged access).
 *
 * Replaces the copy-pasted cookie/JWT/decrypt/lookup block that was duplicated
 * across every protected API route, and guarantees:
 *  - 401 for unauthenticated requests, 403 for authenticated-but-not-permitted,
 *    so status codes are trustworthy on the client.
 *  - an explicit field projection, so the password hash cannot be serialised
 *    into a response by accident.
 */

export type ApiUser = SessionUser;

export type ApiAuthFailure = {
  ok: false;
  status: 401 | 403;
  response: NextResponse;
};

export type ApiAuthSuccess = { ok: true; user: ApiUser };

export type ApiAuthResult = ApiAuthSuccess | ApiAuthFailure;

/**
 * A record counts as a guest session when *either* flag is set. Checking only
 * `guest` would let a record carrying `temporary: true` alone reach privileged
 * endpoints, because the guest magic-link intake writes both flags in separate
 * code paths.
 */
function isGuestSession(user: Pick<ApiUser, "guest" | "temporary">) {
  return Boolean(user.guest || user.temporary);
}

function json(body: unknown, status: number) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Content-Type": "application/json",
      // Authenticated API responses must not be cached by intermediaries.
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

/** Resolve the caller, or `null`. Never throws. */
export async function getApiUser(): Promise<ApiUser | null> {
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
}

/** Any valid session, including guests. */
export async function requireApiUser(): Promise<ApiAuthResult> {
  try {
    const user = await getApiUser();
    if (!user) {
      return {
        ok: false,
        status: 401,
        response: json({ success: false, message: "Authentication required." }, 401),
      };
    }
    return { ok: true, user };
  } catch (error) {
    console.error("requireApiUser failed:", error);
    return {
      ok: false,
      status: 401,
      response: json({ success: false, message: "Authentication required." }, 401),
    };
  }
}

/**
 * Administrator-only. Rejects guest sessions with 403 as well as 401, and logs
 * the denial for monitoring.
 */
export async function requireApiAdmin(): Promise<ApiAuthResult> {
  const result = await requireApiUser();
  if (!result.ok) return result;

  const isGuest = isGuestSession(result.user);
  if (isGuest || !result.user.admin) {
    logSecurityEvent("access.denied", {
      userId: result.user.id,
      resource: "api",
      reason: isGuest ? "guest" : "role",
    });
    return {
      ok: false,
      status: 403,
      response: json({ success: false, message: "Access denied." }, 403),
    };
  }

  return result;
}

/** Guest sessions may not use write endpoints. */
export async function requireApiRegisteredUser(): Promise<ApiAuthResult> {
  const result = await requireApiUser();
  if (!result.ok) return result;

  if (isGuestSession(result.user)) {
    logSecurityEvent("access.denied", {
      userId: result.user.id,
      resource: "api",
      reason: "guest",
    });
    return {
      ok: false,
      status: 403,
      response: json(
        {
          success: false,
          message: "This action requires a registered account. Please sign up.",
          upgrade: true,
        },
        403
      ),
    };
  }

  return result;
}

export { json as apiJson };
