import { NextResponse } from "next/server";
import { z } from "zod";

import { getMongoClient } from "@/lib/mongodb";
import { sendPasswordResetEmail } from "@/lib/email";
import { issueToken } from "@/lib/tokens";
import { checkRateLimit, clientIp, RATE_LIMITS } from "@/lib/rate-limit";
import { logSecurityEvent } from "@/lib/security-log";
import { apiJson } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

const schema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
});

/**
 * Issues a single-use password-reset link.
 *
 * The previous implementation stored `encryptCode(email)` — a *deterministic*
 * hash of the address — in an `otDump` collection and emailed nothing, so the
 * "forgot password" journey could never complete.
 *
 * Always answers 200 with the same body whether or not the account exists.
 * Distinguishing the two would turn this endpoint into an account-enumeration
 * oracle (ISO 27001:2022 A.8.11 data leakage), and it tells an attacker which
 * addresses are registered with the support desk.
 */
export async function POST(request: Request) {
  try {
    const ip = clientIp(request);
    const limit = checkRateLimit(`forgot:${ip}`, RATE_LIMITS.forgotPassword);
    if (!limit.allowed) {
      logSecurityEvent("auth.rate_limited", { flow: "forgot_password" });
      return apiJson(
        { success: false, message: "Too many requests. Please try again later." },
        429
      );
    }

    const parsed = schema.safeParse(await request.json().catch(() => ({})));
    if (!parsed.success) {
      return apiJson({ success: false, message: "Enter a valid email address." }, 400);
    }

    const { email } = parsed.data;
    const db = await getMongoClient();
    const user = await db.collection("users").findOne({ email });

    if (user && !user.guest && !user.temporary) {
      const { raw } = await issueToken("passwordReset", user._id.toString(), {
        ttlMs: 60 * 60 * 1000,
        extra: { purpose: "password_reset" },
      });

      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || "http://localhost:3000";
      const sent = await sendPasswordResetEmail(
        user.name ?? "there",
        email,
        `${baseUrl}/reset-password/${encodeURIComponent(raw)}`
      );

      logSecurityEvent("auth.signin", { userId: user._id.toString(), flow: "reset_issued" });
      if (!sent) {
        console.warn("Password reset email not sent — SMTP not configured or delivery failed.");
      }
    }

    // Uniform response, whether or not an account exists.
    return apiJson(
      {
        success: true,
        message:
          "If an account exists for that address, a reset link is on its way.",
      },
      200
    );
  } catch (error) {
    console.error("Error issuing password reset:", error);
    return apiJson({ success: false, message: "Something went wrong." }, 500);
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, message: "Method not allowed. Use POST." },
    { status: 405, headers: { "Content-Type": "application/json" } }
  );
}
