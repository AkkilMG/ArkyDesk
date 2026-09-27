import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

import { getMongoClient } from "@/lib/mongodb";
import { apiJson } from "@/lib/api-auth";
import { consumeToken } from "@/lib/tokens";
import { logSecurityEvent } from "@/lib/security-log";

export const dynamic = "force-dynamic";

/**
 * Consumes an email-verification token and marks the account verified.
 *
 * This is the endpoint `/verify/[id]` has always called. It did not exist
 * before — the page issued `POST /api/auth/verify`, which only ever exported
 * `GET`, so email confirmation was silently broken.
 *
 * Reached as a link click, so it is a state-changing GET. The token is
 * single-use, hashed at rest and short-lived, which is what makes that
 * acceptable here; a CSRF-triggered verification is not a security-relevant
 * state change.
 */
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get("token") ?? "";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || url.origin;

    const claimed = await consumeToken("verification", token);
    if (!claimed) {
      const failed = NextResponse.redirect(
        new URL("/signin?verify=expired", baseUrl)
      );
      return failed;
    }

    const db = await getMongoClient();
    await db.collection("users").updateOne(
      { _id: new ObjectId(claimed.userId) },
      { $set: { verify: true, verifiedAt: new Date() } }
    );

    logSecurityEvent("auth.guest_link_consumed", {
      userId: claimed.userId,
      flow: "email_verification",
    });

    return NextResponse.redirect(new URL("/signin?verified=1", baseUrl));
  } catch (error) {
    console.error("Email verification failed:", error);
    return NextResponse.redirect(new URL("/signin?verify=error", request.url));
  }
}

/** Same behaviour for programmatic callers that prefer POST. */
export async function POST(request: Request) {
  let token = "";
  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      const body = await request.json();
      token = typeof body?.token === "string" ? body.token : "";
    } else {
      token = new URL(request.url).searchParams.get("token") ?? "";
    }
  } catch {
    token = "";
  }

  try {
    const claimed = await consumeToken("verification", token);
    if (!claimed) {
      return apiJson(
        { success: false, message: "This verification link is invalid or has expired." },
        400
      );
    }

    const db = await getMongoClient();
    await db.collection("users").updateOne(
      { _id: new ObjectId(claimed.userId) },
      { $set: { verify: true, verifiedAt: new Date() } }
    );

    logSecurityEvent("auth.guest_link_consumed", {
      userId: claimed.userId,
      flow: "email_verification",
    });

    return apiJson({ success: true, message: "Email address confirmed." }, 200);
  } catch (error) {
    console.error("Email verification failed:", error);
    return apiJson({ success: false, message: "Verification failed." }, 500);
  }
}
