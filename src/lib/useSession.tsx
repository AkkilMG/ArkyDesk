"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export type SessionState = {
  id: string;
  name: string;
  email: string;
  admin: boolean;
  guest: boolean;
  temporary: boolean;
  verify: boolean;
  createdAt: string | null;
};

export type SessionValue = {
  user: SessionState | null;
  /** True until the first `/api/auth/verify` round-trip resolves. */
  loading: boolean;
  /** Force a re-check, e.g. straight after signing in. */
  refresh: () => Promise<void>;
  /** Guest sessions are restricted to /tickets and /profile. */
  isGuest: boolean;
  isAdmin: boolean;
  /** Default landing route for this session. */
  homePath: string;
};

const SessionContext = createContext<SessionValue | null>(null);

/** Re-validate on this cadence so a revoked session dies within one interval. */
const REVALIDATE_MS = 5 * 60 * 1000;

function homePathFor(user: SessionState) {
  if (user.admin && !user.guest && !user.temporary) return "/dashboard";
  if (user.guest || user.temporary) return "/tickets?guest=1";
  return "/tickets";
}

/**
 * One session lookup for the whole app.
 *
 * Before this existed, `dashboard`, `tickets`, `profile` and `signin` each ran
 * their own `/api/auth/verify` on mount, so a single page load issued four
 * identical database round-trips and four independent redirects. Mounting
 * `SessionGuard` once in the root layout collapses that to one request, and
 * re-validates on tab focus and on an interval so a session revoked in another
 * tab cannot keep this one alive.
 *
 * This is a *convenience* layer only. Authorisation is enforced server-side in
 * `src/lib/auth-server.ts` and `src/lib/api-auth.ts`; nothing here is trusted.
 */
export function SessionGuard({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionState | null>(null);
  const [loading, setLoading] = useState(true);
  const inFlight = useRef<AbortController | null>(null);
  // Fires at most once per guard mount: once the visitor is being sent to
  // /signin the interval keeps polling and would otherwise spam the same
  // redirect until the guard unmounts.
  const redirecting = useRef(false);
  const router = useRouter();
  const pathname = usePathname();

  const refresh = useCallback(async () => {
    inFlight.current?.abort();
    const controller = new AbortController();
    inFlight.current = controller;

    try {
      const response = await fetch("/api/auth/verify", {
        signal: controller.signal,
        cache: "no-store",
      });

      if (response.status === 401) {
        setUser(null);
        // A 401 while a session was (or should have been) established means it
        // was revoked or expired. `SessionGuard` only mounts inside the `(app)`
        // shell, so this navigates a genuinely live visitor back to sign-in
        // instead of leaving a dead page up until their next navigation.
        if (!redirecting.current) {
          redirecting.current = true;
          const next = pathname ? `&next=${encodeURIComponent(pathname)}` : "";
          router.replace(`/signin?reason=session${next}`);
        }
        return;
      }

      const data = (await response.json()) as { success?: boolean; user?: SessionState };
      setUser(data.success && data.user ? data.user : null);
    } catch (error) {
      // An aborted request is a deliberate supersede, not a failure. Transient
      // network errors just clear the user without redirecting — losing a live
      // visitor over a blip would be worse than showing an empty state.
      if ((error as Error)?.name !== "AbortError") {
        setUser(null);
      }
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, [router, pathname]);

  useEffect(() => {
    void refresh();

    const onFocus = () => void refresh();
    window.addEventListener("focus", onFocus);
    const interval = window.setInterval(() => void refresh(), REVALIDATE_MS);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.clearInterval(interval);
      inFlight.current?.abort();
    };
  }, [refresh]);

  const value = useMemo<SessionValue>(() => {
    const isGuest = Boolean(user && (user.guest || user.temporary));
    return {
      user,
      loading,
      refresh,
      isGuest,
      isAdmin: Boolean(user?.admin) && !isGuest,
      homePath: user ? homePathFor(user) : "/signin",
    };
  }, [user, loading, refresh]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

/**
 * Read the shared session.
 *
 * Throws when used outside `SessionGuard`, so a missing provider surfaces as an
 * obvious error rather than a permanent `null` that silently disables the UI.
 */
export function useSession(): SessionValue {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used inside <SessionGuard>.");
  }
  return context;
}
