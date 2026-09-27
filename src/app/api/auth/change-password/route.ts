import { ObjectId } from "mongodb";
import { z } from "zod";

import { getMongoClient } from "@/lib/mongodb";
import { encryptCode, decryptCode } from "@/lib/crypto";
import { requireApiRegisteredUser, apiJson } from "@/lib/api-auth";
import { checkRateLimit, clientIp, RATE_LIMITS } from "@/lib/rate-limit";
import { logSecurityEvent } from "@/lib/security-log";

export const dynamic = "force-dynamic";

const schema = z
  .object({
    currentPassword: z.string().min(1).max(128),
    newPassword: z.string().min(8).max(128),
    confirmPassword: z.string().min(1).max(128),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match.",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "The new password must differ from the current one.",
    path: ["newPassword"],
  });

/**
 * Changes the caller's password after re-authenticating with the current one.
 *
 * Re-entering the existing password is the step-up check that stops a hijacked
 * session from silently taking over an account (ISO 27001:2022 A.8.5 secure
 * authentication). Guest records have no password to change and are refused.
 */
export async function PUT(request: Request) {
  const auth = await requireApiRegisteredUser();
  if (!auth.ok) return auth.response;

  try {
    const limit = checkRateLimit(
      `pwchange:${clientIp(request)}`,
      RATE_LIMITS.write
    );
    if (!limit.allowed) {
      return apiJson(
        { success: false, message: "Too many attempts. Please try again later." },
        429
      );
    }

    const parsed = schema.safeParse(await request.json().catch(() => ({})));
    if (!parsed.success) {
      return apiJson(
        { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input." },
        400
      );
    }

    const { currentPassword, newPassword } = parsed.data;

    const db = await getMongoClient();
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(auth.user.id) }, { projection: { password: 1 } });

    if (!user) {
      return apiJson({ success: false, message: "User not found." }, 404);
    }

    if (!user.password || !(await decryptCode(currentPassword, user.password))) {
      logSecurityEvent("auth.signin_failed", {
        userId: auth.user.id,
        reason: "bad_password",
        flow: "change_password",
      });
      return apiJson({ success: false, message: "Current password is incorrect." }, 400);
    }

    await db.collection("users").updateOne(
      { _id: new ObjectId(auth.user.id) },
      {
        $set: {
          password: encryptCode(newPassword),
          updatedAt: new Date(),
          passwordChangedAt: new Date(),
        },
      }
    );

    logSecurityEvent("account.password_changed", {
      userId: auth.user.id,
      flow: "self_service",
    });

    return apiJson(
      { success: true, message: "Password changed successfully." },
      200
    );
  } catch (error) {
    console.error("Error changing password:", error);
    return apiJson({ success: false, message: "Internal server error." }, 500);
  }
}
