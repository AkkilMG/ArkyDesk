import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { encrypt } from "@/lib/crypto";
import { getMongoClient } from "@/lib/mongodb";
import { encryptSession, SESSION_TTL_MS, sessionCookieOptions } from "@/lib/session";
import { logSecurityEvent } from "@/lib/security-log";
import type { Session } from "@/types/auth";

export const dynamic = "force-dynamic";

/**
 * OAuth callback — receives an authorization code from auth.arkynox.com,
 * exchanges it for user info, provisions a local user record (JIT), and
 * mints a local session cookie.
 *
 * This is the single entry point for delegated authentication. The edge
 * middleware redirects unauthenticated visitors to the auth server, which
 * sends them back here with `?code=...&state=...` after they sign in.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state") || "/";
  const error = url.searchParams.get("error");

  // The auth server signals a user denial or other upstream failure via
  // the `error` query parameter rather than a code.
  if (error) {
    return NextResponse.redirect(new URL("/signin?reason=access_denied", url.origin));
  }

  if (!code) {
    return NextResponse.redirect(new URL("/signin?reason=no_code", url.origin));
  }

  const authServerUrl = process.env.AUTH_SERVER_URL;
  const clientId = process.env.AUTH_CLIENT_ID || "arkdesk";

  if (!authServerUrl) {
    console.error("AUTH_SERVER_URL is not configured — cannot exchange authorization code.");
    return NextResponse.redirect(new URL("/signin?reason=auth_not_configured", url.origin));
  }

  // The callback URL must match exactly what was sent to the authorize endpoint.
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || url.origin;
  const redirectUri = `${baseUrl}/api/auth/callback`;

  try {
    // ── Exchange the authorization code for tokens ──────────────────────
    const tokenResponse = await fetch(`${authServerUrl}/api/auth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code,
        client_id: clientId,
        client_secret: process.env.AUTH_CLIENT_SECRET,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      const errBody = await tokenResponse.json().catch(() => ({}));
      console.error("Token exchange failed:", tokenResponse.status, errBody);
      return NextResponse.redirect(
        new URL("/signin?reason=token_exchange_failed", url.origin)
      );
    }

    const tokenData = (await tokenResponse.json()) as {
      access_token: string;
      token_type: string;
      expires_in: number;
      refresh_token: string;
      user: {
        id: string;
        name: string;
        email: string | null;
        username: string | null;
        role: string;
      } | null;
    };

    if (!tokenData.user) {
      console.error("Token exchange succeeded but no user payload was returned.");
      return NextResponse.redirect(
        new URL("/signin?reason=no_user_info", url.origin)
      );
    }

    const { id: externalId, name, role } = tokenData.user;
    // Username-only accounts may not have an email — never query with
    // `email: undefined`, which would match arbitrary documents.
    const email =
      typeof tokenData.user.email === "string" && tokenData.user.email.trim()
        ? tokenData.user.email.trim().toLowerCase()
        : null;

    // ── JIT provisioning: find or create local user ─────────────────────
    const db = await getMongoClient();

    // Map the auth server role to the local admin flag.
    const admin = role === "admin";

    let user = await db.collection("users").findOne({ externalId });

    if (!user && email) {
      // Also match by email so an existing local account is linked rather
      // than duplicated when the user first signs in via the auth server.
      user = await db.collection("users").findOne({ email });

      if (user) {
        // Link the existing account to the auth server identity.
        await db.collection("users").updateOne(
          { _id: user._id },
          {
            $set: {
              externalId,
              name: name || user.name,
              email,
              admin,
              updatedAt: new Date(),
            },
          }
        );
        logSecurityEvent("auth.oauth_linked", {
          userId: user._id.toString(),
          externalId,
        });
      }
    }

    if (!user) {
      // Brand-new user — create a local record. Omit the email field entirely
      // when the account has none so sparse/partial unique indexes stay happy.
      const doc: Record<string, unknown> = {
        name: name || "Customer",
        externalId,
        admin,
        guest: false,
        temporary: false,
        verify: true, // Auth server handles email verification.
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      if (email) doc.email = email;

      const inserted = await db.collection("users").insertOne(doc);
      user = await db.collection("users").findOne({ _id: inserted.insertedId });
      logSecurityEvent("auth.oauth_provisioned", {
        userId: inserted.insertedId.toString(),
        externalId,
      });
    } else {
      // Existing OAuth user — keep name, email and role in sync.
      const set: Record<string, unknown> = {
        name: name || user.name,
        admin,
        updatedAt: new Date(),
      };
      if (email) set.email = email;

      await db.collection("users").updateOne(
        { _id: user._id },
        { $set: set }
      );
    }

    // Re-fetch to pick up any updates from above.
    user = await db.collection("users").findOne({ externalId });
    if (!user) {
      console.error("Failed to find user after JIT provisioning.");
      return NextResponse.redirect(
        new URL("/signin?reason=provisioning_failed", url.origin)
      );
    }

    // ── Mint the local session cookie ───────────────────────────────────
    const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
    const session = await encryptSession({
      token: await encrypt(user._id.toString()),
      expiresAt,
    } as Session);

    try {
      cookies().set("session", session, sessionCookieOptions(expiresAt));
    } catch {
      cookies().set("session", session, { path: "/", httpOnly: true });
    }

    logSecurityEvent("auth.signin", {
      userId: user._id.toString(),
      admin: Boolean(user.admin),
      flow: "oauth_callback",
    });

    // ── Redirect to the appropriate destination ─────────────────────────
    // The `state` parameter carries the original path the visitor wanted.
    const next = state.startsWith("/") && !state.startsWith("//") ? state : "/tickets";
    return NextResponse.redirect(new URL(next, url.origin));
  } catch (error) {
    console.error("OAuth callback error:", error);
    return NextResponse.redirect(new URL("/signin?reason=callback_error", url.origin));
  }
}

/** The callback is a GET-only redirect endpoint. */
export async function POST() {
  return NextResponse.json(
    { success: false, message: "Use GET for the OAuth callback." },
    { status: 405, headers: { "Content-Type": "application/json", Allow: "GET" } }
  );
}
