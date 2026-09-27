import { getMongoClient } from "@/lib/mongodb";
import { requireApiAdmin, apiJson } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

/** All users with ticket counts, plus outstanding administrative action requests. */
export async function GET() {
  const auth = await requireApiAdmin();
  if (!auth.ok) return auth.response;

  try {
    const db = await getMongoClient();

    // Explicit allow-list projection rather than `{ password: 0 }`, so a newly
    // added sensitive column is excluded until it is deliberately included.
    const users = await db
      .collection("users")
      .aggregate([
        {
          $lookup: {
            from: "tickets",
            localField: "_id",
            foreignField: "user",
            as: "userTickets",
          },
        },
        {
          $addFields: {
            tickets: { $size: "$userTickets" },
            closedTickets: {
              $size: {
                $filter: {
                  input: "$userTickets",
                  cond: { $eq: ["$$this.status", "closed"] },
                },
              },
            },
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            email: 1,
            admin: 1,
            guest: 1,
            temporary: 1,
            verify: 1,
            flagged: 1,
            deleted: 1,
            createdAt: 1,
            updatedAt: 1,
            tickets: 1,
            closedTickets: 1,
          },
        },
      ])
      .toArray();

    const pendingActions = await db
      .collection("userActions")
      .find({ status: "pending" })
      .toArray();

    return apiJson({ success: true, users, pendingActions }, 200);
  } catch (error) {
    console.error("Error fetching users:", error);
    return apiJson({ success: false, message: "Internal server error" }, 500);
  }
}
