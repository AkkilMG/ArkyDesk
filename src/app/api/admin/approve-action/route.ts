import { ObjectId } from "mongodb";
import { z } from "zod";

import { getMongoClient } from "@/lib/mongodb";
import { requireApiAdmin, apiJson } from "@/lib/api-auth";
import { logSecurityEvent } from "@/lib/security-log";

export const dynamic = "force-dynamic";

const schema = z.object({
  actionId: z.string().min(1).max(64),
  approved: z.boolean(),
});

/**
 * Approves or rejects a queued administrative action and, when approving,
 * applies it.
 *
 * `status: "pending"` is part of the lookup filter, so an action can only ever
 * be processed once — a replayed request finds nothing and returns 404.
 */
export async function PUT(request: Request) {
  const auth = await requireApiAdmin();
  if (!auth.ok) return auth.response;

  try {
    const parsed = schema.safeParse(await request.json().catch(() => ({})));
    if (!parsed.success) {
      return apiJson({ success: false, message: "Invalid request parameters." }, 400);
    }

    const { actionId, approved } = parsed.data;
    if (!ObjectId.isValid(actionId)) {
      return apiJson({ success: false, message: "Invalid action id." }, 400);
    }

    const adminObjectId = new ObjectId(auth.user.id);
    const db = await getMongoClient();

    const actionRequest = await db
      .collection("userActions")
      .findOne({ _id: new ObjectId(actionId), status: "pending" });

    if (!actionRequest) {
      return apiJson(
        { success: false, message: "Action request not found or already processed." },
        404
      );
    }

    if (!approved) {
      await db.collection("userActions").updateOne(
        { _id: new ObjectId(actionId) },
        { $set: { status: "rejected", rejectedBy: adminObjectId, rejectedAt: new Date() } }
      );

      logSecurityEvent("access.denied", {
        actor: auth.user.id,
        flow: "user_action_rejected",
        action: actionRequest.action,
        target: actionRequest.userId?.toString(),
      });

      return apiJson({ success: true, message: "Action rejected." }, 200);
    }

    // Re-check at approval time: privileges may have changed since the request
    // was raised, and the target may since have become an administrator.
    const target = await db
      .collection("users")
      .findOne({ _id: actionRequest.userId }, { projection: { admin: 1 } });

    if (!target) {
      return apiJson({ success: false, message: "Target user no longer exists." }, 404);
    }
    if (target.admin && actionRequest.userId.toString() !== auth.user.id) {
      return apiJson(
        { success: false, message: "Cannot perform actions on other administrators." },
        403
      );
    }

    const now = new Date();
    const actor = adminObjectId;

    switch (actionRequest.action) {
      case "flag":
        await db.collection("users").updateOne(
          { _id: actionRequest.userId },
          {
            $set: {
              flagged: true,
              flaggedAt: now,
              flaggedBy: actor,
              flaggedReason: actionRequest.reason,
            },
          }
        );
        break;

      case "admin":
        await db.collection("users").updateOne(
          { _id: actionRequest.userId },
          { $set: { admin: true, promotedAt: now, promotedBy: actor } }
        );
        break;

      case "delete":
        // Soft delete: the address is retained for the retention period defined
        // in the data-retention policy, the password is cleared so the account
        // can never be used to sign in again, and tickets are preserved.
        await db.collection("users").updateOne(
          { _id: actionRequest.userId },
          {
            $set: {
              deleted: true,
              deletedAt: now,
              deletedBy: actor,
              deletedReason: actionRequest.reason,
              originalEmail: actionRequest.user?.email,
              password: null,
              name: "[DELETED USER]",
            },
          }
        );
        break;

      default:
        return apiJson({ success: false, message: "Unsupported action." }, 400);
    }

    await db.collection("userActions").updateOne(
      { _id: new ObjectId(actionId) },
      { $set: { status: "approved", approvedBy: actor, approvedAt: now } }
    );

    logSecurityEvent("access.denied", {
      actor: auth.user.id,
      flow: "user_action_approved",
      action: actionRequest.action,
      target: actionRequest.userId?.toString(),
    });

    return apiJson(
      { success: true, message: "Action approved and executed." },
      200
    );
  } catch (error) {
    console.error("Error processing action approval:", error);
    return apiJson({ success: false, message: "Internal server error." }, 500);
  }
}
