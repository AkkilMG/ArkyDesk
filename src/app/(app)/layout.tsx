import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { SessionGuard } from "@/lib/useSession";
import { getSessionUser } from "@/lib/auth-server";

export const dynamic = "force-dynamic";

/**
 * The authenticated shell.
 *
 * `(app)` is a route group, so `/dashboard`, `/admin/*`, `/tickets` and
 * `/profile` keep their public URLs while sharing this layout. Because the
 * layout persists across navigation between those routes, `SessionGuard` is
 * mounted exactly once per session instead of once per page — the previous
 * arrangement ran an identical `/api/auth/verify` in four different components.
 *
 * Guests are admitted here; they are stopped per-route by the admin layouts
 * (`/dashboard`, `/admin/*`) and by `AccessRestricted`.
 */
export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await getSessionUser();
  if (!user) {
    redirect("/signin?reason=session");
  }

  return <SessionGuard>{children}</SessionGuard>;
}
