import { ObjectId } from "mongodb";
import { z } from "zod";

import { getMongoClient } from "@/lib/mongodb";
import { requireApiAdmin, apiJson } from "@/lib/api-auth";
import { logSecurityEvent } from "@/lib/security-log";

export const dynamic = "force-dynamic";

const schema = z.object({
  userId: z.string().min(1).max(64),
  action: z.enum(["flag", "admin", "delete"]),
  reason: z.string().max(1000).optional(),
});

/**
 * Raises an administrative action request for another account.
 *
 * Nothing is applied here — the request lands in `userActions` as `pending` and
 * must be approved through `PUT /api/admin/approve-action`. That two-person
 * split is the control for privileged changes (ISO 27001:2022 A.8.2).
 */
export async function POST(request: Request) {
  const auth = await requireApiAdmin();
  if (!auth.ok) return auth.response;

  try {
    const parsed = schema.safeParse(await request.json().catch(() => ({})));
    if (!parsed.success) {
      return apiJson({ success: false, message: "Invalid request parameters." }, 400);
    }

    const { userId, action, reason } = parsed.data;

    if (!ObjectId.isValid(userId)) {
      return apiJson({ success: false, message: "Invalid user id." }, 400);
    }

    const db = await getMongoClient();
    const targetUser = await db.collection("users").findOne({ _id: new ObjectId(userId) });

    if (!targetUser) {
      return apiJson({ success: false, message: "Target user not found." }, 404);
    }

    // An administrator may not queue an action against another administrator.
    if (targetUser.admin && targetUser._id.toString() !== auth.user.id) {
      return apiJson(
        { success: false, message: "Cannot perform actions on other administrators." },
        403
      );
    }

    const result = await db.collection("userActions").insertOne({
      userId: new ObjectId(userId),
      action,
      reason: reason ?? "",
      status: "pending",
      requestedBy: new ObjectId(auth.user.id),
      requestedAt: new Date(),
      user: {
        _id: targetUser._id,
        name: targetUser.name,
        email: targetUser.email,
      },
    });

    if (!result.insertedId) {
      return apiJson({ success: false, message: "Failed to create action request." }, 500);
    }

    logSecurityEvent("access.denied", {
      actor: auth.user.id,
      flow: "user_action_requested",
      action,
      target: targetUser._id.toString(),
    });

    return apiJson(
      { success: true, message: "Action request submitted successfully." },
      201
    );
  } catch (error) {
    console.error("Error creating user action:", error);
    return apiJson({ success: false, message: "Internal server error." }, 500);
  }
}
