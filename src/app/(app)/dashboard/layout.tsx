import type { ReactNode } from "react";

import AccessRestricted from "@/components/auth/AccessRestricted";
import { getPageAccess } from "@/lib/auth-server";

export const dynamic = "force-dynamic";

/**
 * Server-side administrator gate for `/dashboard`.
 *
 * The page itself is a Client Component and cannot read cookies, so the check
 * lives in this Server Component layout and runs before the page is rendered or
 * streamed. A guest or plain member therefore never receives the dashboard
 * markup at all — the previous client-only `router.push` guard left the full
 * dashboard in the DOM for anyone reading the page source.
 */
export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const access = await getPageAccess("admin");

  if (access.status === "unauthenticated") {
    return <AccessRestricted user={null} reason="role" />;
  }

  if (access.status === "forbidden") {
    return <AccessRestricted user={access.user} reason={access.reason} />;
  }

  return <>{children}</>;
}
