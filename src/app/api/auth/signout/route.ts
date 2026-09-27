import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { logSecurityEvent } from "@/lib/security-log";

export const dynamic = "force-dynamic";

/**
 * Ends the session.
 *
 * SECURITY FIX: sign-out was implemented as `GET`, which made it CSRF-able —
 * any cross-site `<img>` or prefetch on a page containing an attacker-chosen
 * URL could terminate a victim's session. It is now `POST` only, and `GET`
 * responds 405 so a stale caller fails loudly rather than silently logging
 * somebody out.
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

    return NextResponse.json(
      { success: true },
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
