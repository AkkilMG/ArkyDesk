import { getMongoClient } from "@/lib/mongodb";
import { requireApiAdmin, apiJson } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

/** Aggregate counters for the admin dashboard. */
export async function GET() {
  const auth = await requireApiAdmin();
  if (!auth.ok) return auth.response;

  try {
    const db = await getMongoClient();

    const [totalUsers, totalTickets, openTickets, closedTickets, pendingActions] =
      await Promise.all([
        db.collection("users").countDocuments(),
        db.collection("tickets").countDocuments(),
        db.collection("tickets").countDocuments({ status: "open" }),
        db.collection("tickets").countDocuments({ status: "closed" }),
        db.collection("userActions").countDocuments({ status: "pending" }),
      ]);

    return apiJson(
      {
        success: true,
        stats: { totalUsers, totalTickets, openTickets, closedTickets, pendingActions },
      },
      200
    );
  } catch (error) {
    console.error("Error fetching stats:", error);
    return apiJson({ success: false, message: "Internal server error" }, 500);
  }
}
