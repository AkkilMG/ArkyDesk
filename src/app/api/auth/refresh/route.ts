import { getApiUser, apiJson } from "@/lib/api-auth";
import { updateSession } from "@/lib/session";

export const dynamic = "force-dynamic";

/**
 * Slides the session expiry forward.
 *
 * Called on an interval by `SessionGuard` so an actively used account is not
 * signed out mid-task. It deliberately does not report the user record — the
 * client already holds that from the server-rendered page — only whether the
 * session is still alive, and it returns 401 so the caller can react.
 */
export async function GET() {
  try {
    const user = await getApiUser();
    if (!user) {
      return apiJson({ success: false, message: "No valid session." }, 401);
    }

    const renewed = await updateSession();
    if (!renewed) {
      return apiJson({ success: false, message: "Session could not be renewed." }, 401);
    }

    return apiJson({ success: true, message: "Session refreshed." }, 200);
  } catch (error) {
    console.error("Session refresh failed:", error);
    return apiJson({ success: false, message: "Session refresh failed." }, 401);
  }
}
