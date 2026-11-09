import { redirect } from "next/navigation";

/**
 * The local sign-in page is no longer used. Authentication is delegated to
 * the central auth server (auth.arkynox.com). The middleware now redirects
 * unauthenticated visitors directly to the auth server's authorize endpoint.
 *
 * This route exists only as a safety net for any stale bookmark or link.
 */
export default function SigninPage() {
  const authServerUrl = process.env.AUTH_SERVER_URL || "https://auth.arkynox.com";
  const clientId = process.env.AUTH_CLIENT_ID || "arkdesk";
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || "http://localhost:3000";
  const redirectUri = `${baseUrl}/api/auth/callback`;

  const authorizeUrl = new URL("/api/auth/authorize", authServerUrl);
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("response_type", "code");

  redirect(authorizeUrl.toString());
}
