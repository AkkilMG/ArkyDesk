import { ObjectId } from "mongodb";
import { z } from "zod";

import { getMongoClient } from "@/lib/mongodb";
import { requireApiRegisteredUser, apiJson } from "@/lib/api-auth";
import { logSecurityEvent } from "@/lib/security-log";

export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
});

/** Updates the caller's display name. */
export async function PUT(request: Request) {
  const auth = await requireApiRegisteredUser();
  if (!auth.ok) return auth.response;

  try {
    const parsed = schema.safeParse(await request.json().catch(() => ({})));
    if (!parsed.success) {
      return apiJson({ success: false, message: "Enter a name between 1 and 100 characters." }, 400);
    }

    const db = await getMongoClient();
    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(auth.user.id) },
      { $set: { name: parsed.data.name, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return apiJson({ success: false, message: "User not found." }, 404);
    }

    logSecurityEvent("access.denied", {
      userId: auth.user.id,
      flow: "profile_updated",
    });

    return apiJson({ success: true, message: "Profile updated successfully." }, 200);
  } catch (error) {
    console.error("Error updating profile:", error);
    return apiJson({ success: false, message: "Internal server error." }, 500);
  }
}
