import Link from "next/link";

import type { SessionUser } from "@/lib/auth-server";

type Reason = "guest" | "role";

type Copy = {
  eyebrow: string;
  title: string;
  body: string;
  cta: { href: string; label: string };
  secondary?: { href: string; label: string };
};

const COPY: Record<Reason, Copy> = {
  guest: {
    eyebrow: "Guest session",
    title: "This area is for ArkyDesk administrators",
    body: "You are signed in with a guest session, so the dashboard, user management and admin chat are not available. Your support tickets and profile stay fully available.",
    cta: { href: "/tickets", label: "Go to your tickets" },
    secondary: { href: "/signup", label: "Create an account" },
  },
  role: {
    eyebrow: "Restricted",
    title: "You do not have access to this area",
    body: "This page is limited to ArkyDesk administrators. If you believe you should have access, contact your workspace owner.",
    cta: { href: "/tickets", label: "Back to tickets" },
  },
};

/**
 * Shown instead of a protected page when the session is valid but not
 * permitted (ISO 27001:2022 A.5.15 access control).
 *
 * Rendering this instead of a bare redirect means the visitor learns *why* they
 * were stopped, and it doubles as the guest upgrade prompt.
 */
export default function AccessRestricted({
  user,
  reason,
}: {
  user?: Pick<SessionUser, "name" | "guest"> | null;
  reason: Reason;
}) {
  const copy = COPY[reason];
  const firstName = user?.name?.split(" ")[0];

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16 text-foreground">
      <div className="w-full max-w-lg space-y-8 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-brand/15 text-brand">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            className="size-7"
            aria-hidden="true"
          >
            <rect x="4" y="10" width="16" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
            {copy.eyebrow}
          </p>
          <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            {firstName ? `${copy.title.replace("This", `This, ${firstName}`)}` : copy.title}
          </h1>
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            {copy.body}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href={copy.cta.href} className="btn-primary">
            {copy.cta.label}
          </Link>
          {copy.secondary ? (
            <Link href={copy.secondary.href} className="btn-secondary">
              {copy.secondary.label}
            </Link>
          ) : null}
        </div>

        {reason === "guest" ? (
          <p className="text-xs text-muted-foreground">
            Guest sessions are limited to tickets and profile. Signing up keeps
            your history and unlocks every ticket feature.
          </p>
        ) : null}
      </div>
    </main>
  );
}
