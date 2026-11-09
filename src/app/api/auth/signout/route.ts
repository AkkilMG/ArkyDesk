import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { logSecurityEvent } from "@/lib/security-log";

export const dynamic = "force-dynamic";

/**
 * Ends the session locally AND triggers a global logout across all Arkynox
 * platforms (Auth, PikDB, ArkyDesk, Kaffeine).
 *
 * SECURITY FIX: sign-out was implemented as `GET`, which made it CSRF-able —
 * any cross-site `<img>` or prefetch on a page containing an attacker-chosen
 * URL could terminate a victim's session. It is now `POST` only, and `GET`
 * responds 405 so a stale caller fails loudly rather than silently logging
 * somebody out.
 *
 * Global logout flow:
 *   1. Clear the local ArkyDesk session cookie
 *   2. Return the auth server's signout URL — the CLIENT redirects the
 *      browser there, so the auth-domain session cookie is sent automatically
 *   3. Auth server revokes all refresh tokens and redirects back to ArkyDesk
 */
export async function POST() {
  try {
    const session = cookies().get("session")?.value;

    // Clear with the same attributes the cookie was set with, otherwise some
    // browsers keep a shadow cookie scoped to a narrower path.
    cookies().set("session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(0),
      maxAge: 0,
    });

    logSecurityEvent("auth.signout", { hadSession: Boolean(session) });

    // Build the auth server's global-logout URL. The client will redirect the
    // browser here so the auth-domain cookie is sent automatically.
    const authServerUrl = process.env.AUTH_SERVER_URL || "https://auth.arkynox.com";
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3002";
    const signoutUrl = `${authServerUrl}/api/auth/signout?redirect=${encodeURIComponent(appUrl)}`;

    return NextResponse.json(
      { success: true, redirectUrl: signoutUrl },
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error during signout:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      message: "Sign out requires POST.",
    },
    { status: 405, headers: { "Content-Type": "application/json", Allow: "POST" } }
  );
}
