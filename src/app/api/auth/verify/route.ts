import { updateSession } from "@/lib/session";
import { getApiUser, apiJson } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

/**
 * Session introspection.
 *
 * This is the single endpoint the client uses to answer "am I signed in, as
 * what, and may I go where?". It returns a self-contained payload so callers no
 * longer need to chain it with `/api/auth/details`.
 *
 * The session cookie is minted by the OAuth callback route
 * (`/api/auth/callback`) after a successful code exchange with auth.arkynox.com.
 *
 * Contract:
 *   401 — no cookie, or the cookie does not resolve to a live user.
 *   200 — { success: true, user: {...} }
 */
export async function GET() {
  try {
    const user = await getApiUser();

    if (!user) {
      return apiJson(
        { success: false, message: "Authentication required." },
        401
      );
    }

    // Slide the expiry on each successful verify so an active user is never
    // logged out mid-session.
    await updateSession();

    return apiJson(
      {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          admin: user.admin,
          guest: user.guest,
          temporary: user.temporary,
          verify: user.verify,
          createdAt: user.createdAt,
        },
        // Flattened for backwards compatibility with existing call sites.
        admin: user.admin,
        guest: user.guest,
      },
      200
    );
  } catch (error) {
    console.error("Session verification failed:", error);
    return apiJson({ success: false, message: "Verification failed." }, 401);
  }
}

/** Explicitly refuse writes: this endpoint is idempotent read-only. */
export async function POST() {
  return apiJson(
    { success: false, message: "Use GET to verify a session." },
    405
  );
}
