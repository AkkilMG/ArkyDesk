import { getMongoClient } from "@/lib/mongodb";
import { requireApiUser, apiJson } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

/**
 * Returns the signed-in user's profile plus ticket counters.
 *
 * SECURITY FIX: this route previously returned the raw `users` document, which
 * meant the SHA-256 `password` hash was serialised straight to the browser
 * (ISO 27001:2022 A.8.24 cryptography, A.8.11 data leakage). It now assembles
 * the response field by field from the already-projected session user, so
 * adding a sensitive column to the collection can never leak it by default.
 */
export async function GET() {
  const auth = await requireApiUser();
  if (!auth.ok) return auth.response;

  const { user } = auth;

  const db = await getMongoClient();
  const ticketStats = await db
    .collection("tickets")
    .aggregate([
      { $match: { user: user.id } },
      {
        $group: {
          _id: null,
          totalTickets: { $sum: 1 },
          closedTickets: {
            $sum: { $cond: [{ $eq: ["$status", "closed"] }, 1, 0] },
          },
        },
      },
    ])
    .toArray();

  return apiJson(
    {
      success: true,
      details: {
        _id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
        guest: user.guest,
        temporary: user.temporary,
        verify: user.verify,
        createdAt: user.createdAt,
        tickets: ticketStats[0]?.totalTickets || 0,
        closedTickets: ticketStats[0]?.closedTickets || 0,
      },
    },
    200
  );
}

/** This endpoint is read-only. */
export async function POST() {
  return apiJson(
    { success: false, message: "Use GET to read account details." },
    405
  );
}
