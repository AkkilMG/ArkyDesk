"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import ThemeToggle from "@/components/ui/ThemeToggle";
import Shimmer from "@/components/ui/Shimmer";
import Sheet from "@/components/ui/Sheet";
import PrivacySettings from "@/components/ui/PrivacySettings";
import { useSession } from "@/lib/useSession";
import { cn } from "@/lib/cn";

type Props = {
  /**
   * `create` is owned by the page, not the shell, so the nav only needs the
   * setter. Pages that do not host a create-ticket flow (admin users/chat)
   * omit it entirely instead of stubbing it.
   */
  setCreate?: (value: boolean) => void;
  setSettings: (value: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
};

type NavItem = {
  href: string;
  label: string;
  /** `admin` items are hidden from members and guests. */
  audience: "all" | "admin";
  icon: React.ReactNode;
};

const ICONS = {
  dashboard: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    />
  ),
  tickets: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  ),
  users: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m3 4.197V9a3 3 0 00-6 0v2.25"
    />
  ),
  chat: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  ),
  profile: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  ),
  settings: (
    <>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </>
  ),
  signOut: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  ),
} as const;

const NAV: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", audience: "admin", icon: ICONS.dashboard },
  { href: "/tickets", label: "Tickets", audience: "all", icon: ICONS.tickets },
  { href: "/admin/users", label: "User management", audience: "admin", icon: ICONS.users },
  { href: "/admin/chat", label: "Admin chat", audience: "admin", icon: ICONS.chat },
];

/**
 * The application shell.
 *
 * Reads identity and role from the shared `SessionGuard` context instead of
 * firing its own `/api/auth/verify` + `/api/auth/details` pair, which every
 * protected page used to do again on mount. The admin links are additionally
 * gated server-side by `(app)/admin/layout.tsx`, so hiding them here is a UX
 * affordance rather than the control itself.
 */
export default function SideNav({
  setCreate,
  setSettings,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: Props) {
  const { user, loading, isAdmin, isGuest } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [signingOut, setSigningOut] = useState(false);

  const closeMobile = () => setIsMobileMenuOpen?.(false);

  const isActive = (href: string) => pathname === href || pathname?.startsWith(`${href}/`);

  const navLinkClass = (href: string) =>
    cn(
      "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-fast sm:text-base",
      isActive(href)
        ? "bg-muted text-foreground"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    );

  const navIconClass = (href: string) =>
    cn(
      "size-5 shrink-0 transition-transform duration-fast sm:size-6",
      isActive(href) ? "scale-110 text-foreground" : "text-muted-foreground group-hover:scale-110"
    );

  /**
   * Sign out is POST-only: the route refuses GET so a cross-site `<img src>` or
   * `<link>` cannot end someone's session (CSRF).
   */
  async function signOut() {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await fetch("/api/auth/signout", { method: "POST" });
    } catch {
      // Even a network failure should land the user on the sign-in page.
    } finally {
      router.replace("/signin");
      router.refresh();
    }
  }

  const visibleNav = NAV.filter((item) => item.audience === "all" || isAdmin);
  const displayName = user?.name?.trim() || "Guest";
  const initial = displayName.charAt(0).toUpperCase();

  const content = (
    <div className="flex h-full flex-col">
      <div className="mb-5 flex items-center gap-3">
        <Link
          href={isAdmin ? "/dashboard" : "/tickets"}
          className="min-w-0 flex-1"
          onClick={closeMobile}
        >
          <img
            src="/logo/light.webp"
            alt="Arkynox"
            className="h-6 dark:hidden"
            width={120}
            height={24}
          />
          <img
            src="/logo/dark.webp"
            alt="Arkynox"
            className="hidden h-6 dark:block"
            width={120}
            height={24}
          />
        </Link>
        <ThemeToggle />
      </div>

      <div className="mb-5 flex items-center gap-3">
        {loading ? (
          <>
            <Shimmer className="size-10 rounded-full" shape="circle" />
            <div className="min-w-0 flex-1 space-y-1.5">
              <Shimmer className="h-3.5 w-32 rounded" />
              <Shimmer className="h-3 w-20 rounded" />
            </div>
          </>
        ) : (
          <>
            <div
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background sm:size-12 sm:text-base"
              aria-hidden="true"
            >
              {initial}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold sm:text-base">{displayName}</p>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
                {isGuest ? "Guest session" : isAdmin ? "Administrator" : "Signed in"}
              </p>
            </div>
          </>
        )}
      </div>

      <button
        type="button"
        onClick={() => {
          setCreate?.(true);
          closeMobile();
        }}
        className="btn-brand mb-5 w-full justify-center"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          className="size-5"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        {isGuest ? "Report an issue" : "Create ticket"}
      </button>

      <hr className="mb-5 border-border" />

      <nav className="flex-1 overflow-y-auto" aria-label="Main navigation">
        <ul className="space-y-1">
          {loading
            ? [1, 2, 3].map((i) => (
                <li key={i}>
                  <Shimmer className="h-11 w-full rounded-xl" variant="card" />
                </li>
              ))
            : visibleNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={navLinkClass(item.href)}
                    onClick={closeMobile}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    <svg
                      className={navIconClass(item.href)}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      {item.icon}
                    </svg>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
        </ul>
      </nav>

      <div className="mt-auto border-t border-border pt-4">
        {isGuest ? (
          <div className="mb-4 rounded-xl border border-border bg-muted p-3">
            <p className="text-xs font-semibold text-foreground">Guest account</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Create an account to keep your history and unlock every ticket feature.
            </p>
            <Link
              href="/signup"
              onClick={closeMobile}
              className="btn-brand mt-3 w-full justify-center py-2 text-xs"
            >
              Create account
            </Link>
          </div>
        ) : null}

        <p className="mb-3 px-1 text-xs uppercase tracking-wide text-muted-foreground">
          Profile &amp; settings
        </p>

        <ul className="space-y-1">
          <li>
            <Link
              href="/profile"
              className={navLinkClass("/profile")}
              onClick={closeMobile}
              aria-current={isActive("/profile") ? "page" : undefined}
            >
              <svg
                className={navIconClass("/profile")}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {ICONS.profile}
              </svg>
              <span>Profile</span>
            </Link>
          </li>

          <li>
            <button
              type="button"
              onClick={() => {
                setSettings(true);
                closeMobile();
              }}
              className={cn(navLinkClass("#settings"), "w-full text-left")}
            >
              <svg
                className={navIconClass("#settings")}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {ICONS.settings}
              </svg>
              <span>Settings</span>
            </button>
          </li>

          <PrivacySettings />

          <li>
            <button
              type="button"
              onClick={signOut}
              disabled={signingOut}
              className={cn(
                "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors duration-fast hover:bg-destructive/10 hover:text-destructive disabled:opacity-60 sm:text-base",
                "text-muted-foreground"
              )}
            >
              <svg
                className="size-5 shrink-0 transition-transform duration-fast group-hover:scale-110 sm:size-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {ICONS.signOut}
              </svg>
              <span>{signingOut ? "Signing out…" : "Sign out"}</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <>
      {/*
        Desktop sidebar. It owns the permanent presentation only; the mobile
        drawer below is a separate `Sheet` portal, so this can be `hidden` below
        `sm` without affecting the drawer's `fixed` positioning.
      */}
      <div className="hidden h-full w-64 shrink-0 flex-col overflow-y-auto bg-sidebar p-4 text-sidebar-foreground transition-colors sm:flex lg:w-72 lg:p-6 xl:w-80">
        {content}
      </div>

      <Sheet
        open={!!isMobileMenuOpen}
        onClose={closeMobile}
        side="left"
        title="Menu"
        bodyClassName="p-4"
      >
        {content}
      </Sheet>
    </>
  );
}
