import { NextResponse } from "next/server";
import { z } from "zod";

import { encryptCode } from "@/lib/crypto";
import { getMongoClient } from "@/lib/mongodb";
import { sendVerificationEmail } from "@/lib/email";
import { issueToken } from "@/lib/tokens";
import { checkRateLimit, clientIp, RATE_LIMITS } from "@/lib/rate-limit";
import { logSecurityEvent } from "@/lib/security-log";
import { apiJson } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(8).max(128),
});

export async function GET() {
  return apiJson(
    { success: false, message: "Method not allowed. Use POST." },
    405
  );
}

export async function POST(request: Request) {
  try {
    const ip = clientIp(request);
    const limit = checkRateLimit(`signup:${ip}`, RATE_LIMITS.signup);
    if (!limit.allowed) {
      logSecurityEvent("auth.rate_limited", { flow: "signup" });
      return apiJson(
        { success: false, message: "Too many attempts. Please try again later." },
        429
      );
    }

    const parsed = schema.safeParse(await request.json().catch(() => ({})));
    if (!parsed.success) {
      return apiJson({ success: false, message: "Invalid input." }, 400);
    }

    const { name, email, password } = parsed.data;
    const db = await getMongoClient();

    const existing = await db.collection("users").findOne({ email });

    if (existing) {
      if (existing.guest || existing.temporary) {
        // Upgrade a guest into a full account, preserving their ticket history.
        await db.collection("users").updateOne(
          { _id: existing._id },
          {
            $set: {
              name,
              password: encryptCode(password),
              guest: false,
              temporary: false,
              upgradedAt: new Date(),
              updatedAt: new Date(),
            },
          }
        );
        await issueVerification(existing._id.toString(), name, email);
        logSecurityEvent("auth.signup", { userId: existing._id.toString(), upgraded: true });
        return apiJson({ success: true, upgraded: true }, 200);
      }

      // 409 rather than the previous 201, which claimed success on a conflict.
      return apiJson(
        { success: false, message: "An account with this email already exists." },
        409
      );
    }

    const inserted = await db.collection("users").insertOne({
      name,
      email,
      password: encryptCode(password),
      guest: false,
      temporary: false,
      verify: false,
      createdAt: new Date(),
    });

    await issueVerification(inserted.insertedId.toString(), name, email);
    logSecurityEvent("auth.signup", { userId: inserted.insertedId.toString(), upgraded: false });

    return apiJson({ success: true }, 201);
  } catch (error) {
    console.error("Error saving user data:", error);
    return apiJson({ success: false, message: "Internal server error." }, 500);
  }
}

/**
 * Issue and email a verification token. Failure to send is non-fatal: the
 * account is usable and the user can request a new link, so a flaky SMTP
 * server must not turn a successful signup into an error.
 */
async function issueVerification(userId: string, name: string, email: string) {
  try {
    const { raw } = await issueToken("verification", userId, {
      ttlMs: 24 * 60 * 60 * 1000,
    });
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || "http://localhost:3000";
    const sent = await sendVerificationEmail(
      name,
      email,
      `${baseUrl}/verify/${encodeURIComponent(raw)}`
    );
    if (!sent) {
      console.warn("Verification email not sent — SMTP not configured or delivery failed.");
    }
  } catch (error) {
    console.error("Failed to issue verification token:", error);
  }
}
