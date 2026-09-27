import type { ReactNode } from "react";

import AccessRestricted from "@/components/auth/AccessRestricted";
import { getPageAccess } from "@/lib/auth-server";

export const dynamic = "force-dynamic";

/** Server-side administrator gate for every `/admin/*` route. */
export default async function AdminLayout({ children }: { children: ReactNode }) {
  const access = await getPageAccess("admin");

  if (access.status === "unauthenticated") {
    return <AccessRestricted user={null} reason="role" />;
  }

  if (access.status === "forbidden") {
    return <AccessRestricted user={access.user} reason={access.reason} />;
  }

  return <>{children}</>;
}
