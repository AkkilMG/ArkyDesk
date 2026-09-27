import { z } from "zod";
import { ObjectId } from "mongodb";

import { getMongoClient } from "@/lib/mongodb";
import { encryptCode } from "@/lib/crypto";
import { consumeToken } from "@/lib/tokens";
import { checkRateLimit, clientIp, RATE_LIMITS } from "@/lib/rate-limit";
import { logSecurityEvent } from "@/lib/security-log";
import { apiJson } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

const schema = z
  .object({
    token: z.string().min(16).max(512),
    password: z.string().min(8).max(128),
    confirm: z.string().min(1).max(128),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match.",
    path: ["confirm"],
  });

/**
 * Completes a password reset by consuming a single-use reset token.
 *
 * Paired with `POST /api/auth/forgot-password`, which issues the token. Both
 * halves were previously non-functional.
 */
export async function POST(request: Request) {
  try {
    const ip = clientIp(request);
    const limit = checkRateLimit(`reset:${ip}`, RATE_LIMITS.write);
    if (!limit.allowed) {
      return apiJson(
        { success: false, message: "Too many attempts. Please try again later." },
        429
      );
    }

    const parsed = schema.safeParse(await request.json().catch(() => ({})));
    if (!parsed.success) {
      return apiJson(
        {
          success: false,
          message: parsed.error.issues[0]?.message ?? "Invalid input.",
        },
        400
      );
    }

    const { token, password } = parsed.data;

    const claimed = await consumeToken("passwordReset", token);
    if (!claimed) {
      return apiJson(
        {
          success: false,
          message: "This reset link is invalid or has expired. Please request a new one.",
        },
        400
      );
    }

    const db = await getMongoClient();
    const user = await db.collection("users").findOne({
      _id: new ObjectId(claimed.userId),
    });
    if (!user) {
      return apiJson({ success: false, message: "Account not found." }, 404);
    }

    await db.collection("users").updateOne(
      { _id: user._id },
      {
        $set: {
          password: encryptCode(password),
          updatedAt: new Date(),
          passwordChangedAt: new Date(),
        },
      }
    );

    logSecurityEvent("account.password_changed", {
      userId: user._id.toString(),
      flow: "password_reset",
    });

    return apiJson(
      { success: true, message: "Your password has been updated. You can sign in now." },
      200
    );
  } catch (error) {
    console.error("Error resetting password:", error);
    return apiJson({ success: false, message: "Something went wrong." }, 500);
  }
}
