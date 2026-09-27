import { jwtVerify } from "jose";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Edge session gate — the first of three enforcement layers (ISO 27001:2022
 * A.5.15 access control, A.8.2 privileged access).
 *
 * This runs before render on every protected route so unauthenticated visitors
 * never receive the protected markup. It deliberately does NOT read role flags:
 * middleware runs in the edge runtime, where neither the `mongodb` driver nor
 * `crypto-js` is available. Role resolution (admin / guest) happens in
 * `src/lib/auth-server.ts` on the Node runtime, one layer deeper.
 *
 * Layer 1 (here)  -> is there a structurally valid, unexpired session JWT?
 * Layer 2 (server) -> does that session belong to an existing user, and are
 *                     they allowed to see this route?
 * Layer 3 (client) -> `SessionGuard` re-checks on tab focus so a session that
 *                     expires mid-use is handled gracefully.
 */

/** Routes that require any valid session. */
const PROTECTED = ["/dashboard", "/admin", "/tickets", "/profile"] as const;

/** Routes that are pointless (and misleading) to show to a signed-in visitor. */
const AUTH_PAGES = ["/signin", "/signup"] as const;

/** Where a signed-in user lands by default. */
const DEFAULT_APP_ROUTE = "/tickets";

/** Header used to tell downstream server components a session cookie exists. */
export const SESSION_HEADER = "x-arkydesk-session";

function encodedKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    // Failing closed is the correct behaviour: an unconfigured deployment must
    // not silently treat every request as authenticated.
    throw new Error("SESSION_SECRET is not defined in environment variables");
  }
  return new TextEncoder().encode(secret);
}

async function hasValidSession(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get("session")?.value;
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, encodedKey(), { algorithms: ["HS256"] });
    return typeof payload.token === "string" && payload.token.length > 0;
  } catch {
    return false;
  }
}

/** Only allow same-origin relative paths through as a post-login destination. */
function safeNextPath(value: string | null): string | null {
  if (!value) return null;
  if (!value.startsWith("/") || value.startsWith("//")) return null;
  return value;
}

function isProtectedPath(pathname: string) {
  return PROTECTED.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

function isAuthPage(pathname: string) {
  return AUTH_PAGES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Never gate static assets or the API: the API enforces its own authorisation
  // per route and returns proper JSON 401s rather than HTML redirects.
  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const authenticated = await hasValidSession(request);

  if (isProtectedPath(pathname) && !authenticated) {
    const signIn = new URL("/signin", request.url);
    const next = safeNextPath(`${pathname}${search}`);
    if (next) signIn.searchParams.set("next", next);
    signIn.searchParams.set("reason", "session");
    return NextResponse.redirect(signIn);
  }

  // A signed-in visitor has no business on /signin or /signup.
  if (isAuthPage(pathname) && authenticated) {
    const next = safeNextPath(request.nextUrl.searchParams.get("next"));
    return NextResponse.redirect(new URL(next ?? DEFAULT_APP_ROUTE, request.url));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(SESSION_HEADER, authenticated ? "1" : "0");

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    /*
     * Everything except Next internals and static files. The API is excluded
     * above as well; keeping it out of the matcher avoids needless crypto work
     * on every asset request.
     */
    "/((?!_next/static|_next/image|favicon.ico|logo/|icons/|assets/|sitemap.xml|robots.txt).*)",
  ],
};
