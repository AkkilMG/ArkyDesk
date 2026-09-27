import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { z } from "zod";

import { getMongoClient } from "@/lib/mongodb";
import { decryptCode } from "@/lib/crypto";
import { requireApiRegisteredUser, apiJson } from "@/lib/api-auth";
import { checkRateLimit, clientIp, RATE_LIMITS } from "@/lib/rate-limit";
import { logSecurityEvent } from "@/lib/security-log";

export const dynamic = "force-dynamic";

const schema = z
  .object({
    password: z.string().min(8).max(128),
    confirm: z.string().min(1).max(128),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match.",
    path: ["confirm"],
  });

/**
 * Permanently deletes the caller's own account and its personal data.
 *
 * Destructive and irreversible, so it requires re-authentication: the caller
 * must re-enter their current password. Without that step-up check a hijacked
 * or unattended session could erase an account, and a walk-away from an open
 * tab could too (ISO 27001:2022 A.8.5, A.5.25 assessment and decision).
 *
 * Administrators are refused here; they must be removed by another
 * administrator through the approval workflow, so a single compromised admin
 * session cannot erase the operator account.
 */
export async function DELETE(request: Request) {
  const auth = await requireApiRegisteredUser();
  if (!auth.ok) return auth.response;

  try {
    const limit = checkRateLimit(
      `acctdelete:${clientIp(request)}`,
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

    const db = await getMongoClient();
    const user = await db
      .collection("users")
      .findOne(
        { _id: new ObjectId(auth.user.id) },
        { projection: { admin: 1, password: 1 } }
      );

    if (!user) {
      return apiJson({ success: false, message: "User not found." }, 404);
    }

    if (user.admin) {
      return apiJson(
        { success: false, message: "Admin accounts cannot be self-deleted." },
        403
      );
    }

    // Step-up: the stored hash is never returned to the client, so the only
    // way to satisfy this is to actually know the current password.
    if (!user.password || !(await decryptCode(parsed.data.password, user.password))) {
      logSecurityEvent("auth.signin_failed", {
        userId: auth.user.id,
        reason: "bad_password",
        flow: "delete_account",
      });
      return apiJson({ success: false, message: "Password is incorrect." }, 400);
    }

    const userId = auth.user.id;

    await db.collection("tickets").deleteMany({ user: userId });
    await db.collection("comments").deleteMany({ user: userId });
    await db.collection("guest_login_tokens").deleteMany({ userId });

    const result = await db.collection("users").deleteOne({ _id: new ObjectId(userId) });
    if (result.deletedCount === 0) {
      return apiJson({ success: false, message: "Failed to delete account." }, 500);
    }

    // Clear the session with the same attributes it was written with.
    cookies().set("session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(0),
      maxAge: 0,
    });

    logSecurityEvent("account.deleted", { userId });

    return apiJson(
      { success: true, message: "Account deleted successfully." },
      200
    );
  } catch (error) {
    console.error("Error deleting account:", error);
    return apiJson({ success: false, message: "Internal server error." }, 500);
  }
}
