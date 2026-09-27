"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { owner } from "@/lib/constants";
import { cn } from "@/lib/cn";
import ThemeToggle from "@/components/ui/ThemeToggle";

/**
 * Split layout shared by every auth route: `/signin`, `/signup`,
 * `/forgot-password`, `/reset-password/[token]` and `/verify/[id]`.
 *
 * All five previously hand-rolled this shell, and every copy carried the same
 * defects: an inline `height: '100vh'` (which ignores the mobile URL bar and
 * clips content on iOS), `min-h-screen`, an autoplaying decorative `<video>`
 * that was not hidden from assistive tech and ignored
 * `prefers-reduced-motion`, and a Dribbble credit rendered as a bare `<a>` with
 * no `rel`. Extracting it here is what keeps the pages from drifting apart
 * again.
 *
 * `data-auth` opts the subtree into the height-driven rhythm scale in
 * `globals.css`, which is what lets the pages fit short viewports.
 */
export default function AuthShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [videoIndex, setVideoIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Picked after mount rather than in a state initialiser: a `Math.random()`
  // during render would make the server and client markup disagree and trip
  // React's hydration check.
  useEffect(() => {
    setVideoIndex(Math.floor(Math.random() * owner.length));
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <main data-auth="" className="flex min-h-dvh flex-col lg:flex-row">
      {/* Decorative brand panel. `aria-hidden` because the video carries no
          information a sighted user needs from a screen reader.

          Sticky + `self-start` so the panel stays exactly one viewport tall
          when the form column is taller than the screen and the document
          scrolls — otherwise `h-dvh` on the video would leave an unpainted
          gap below it. */}
      <div className="relative hidden shrink-0 overflow-hidden bg-muted lg:sticky lg:top-0 lg:block lg:h-dvh lg:self-start lg:w-1/3">
        <header className="absolute inset-x-0 top-0 z-10 p-6">
          <Link
            href="/signin"
            className="inline-flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/20"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/letter.png" alt="Arkynox" className="no-drag h-8 w-auto" />
          </Link>
        </header>

        <video
          className="no-drag h-dvh w-full object-cover"
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={`/assets/video/${videoIndex}.mp4`} type="video/mp4" />
        </video>

        <a
          href={`https://dribbble.com/${owner[videoIndex]}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-x-0 bottom-5 text-center text-sm font-semibold text-white drop-shadow"
        >
          @{owner[videoIndex]}
        </a>
      </div>

      <div
        className={cn(
          // `flex-col` is load-bearing, not decoration. Without it this is a
          // *row* container: `justify-content` (default flex-start) would then
          // control horizontal placement and pin the card to the left edge of
          // the panel, while `items-center` and the `my-auto` below only ever
          // touched the vertical axis. With `flex-col` the main axis is
          // vertical, so `items-center` centres the card horizontally.
          //
          // There is deliberately no `justify-center`: it would centre on the
          // main axis, and a centred flex child that is taller than its
          // container overflows in *both* directions, making the top
          // impossible to scroll to. `my-auto` on the child below centres
          // short content and collapses to zero when there is no free space,
          // so a tall form simply grows the document and scrolls normally —
          // the sticky brand panel rides along. Nothing is ever clipped.
          "relative flex flex-col flex-1 items-center px-5 py-[var(--auth-pad)] sm:px-6 lg:w-2/3",
          className
        )}
      >
        {/* Absolute so the toggle costs no vertical space, which is the whole
            budget the "fits in any screen" requirement spends. The `pt-11` on
            the content below reserves room for it only below `sm`, where the
            centred card can actually reach the top-right corner. */}
        <ThemeToggle className="absolute right-4 top-4 z-10" />

        <div className="my-auto w-full max-w-md pt-11 sm:pt-0">{children}</div>
      </div>
    </main>
  );
}

/**
 * Page heading for the auth card.
 *
 * Extracted from the old `AuthTitle` because "Sign in to <logo>" cannot
 * grammatically cover the other auth routes — "Forgot your password? to
 * Arkynox" is nonsense — so `/forgot-password`, `/reset-password/[token]`
 * and `/verify/[id]` need the heading without the trailing brand clause.
 * The size is height-driven via `--auth-title` so it shrinks on short
 * viewports.
 */
export function AuthHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "mb-[var(--auth-block)] flex items-center gap-3 text-[length:var(--auth-title)] font-bold tracking-tight",
        className
      )}
    >
      {children}
    </h1>
  );
}

/** Muted supporting sentence under an `AuthHeading`. */
export function AuthSubtitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn("mb-[var(--auth-block)] text-sm text-muted-foreground", className)}
    >
      {children}
    </p>
  );
}

/**
 * "Sign in to <logo>" style heading used at the top of the auth card.
 *
 * The wordmark is decorative here — the sentence already names the product — so
 * it is hidden from assistive tech to avoid a duplicated announcement.
 */
export function AuthTitle({ verb }: { verb: string }) {
  return (
    <AuthHeading>
      <span>
        {verb} to{" "}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo/letter-dark.png" alt="" className="no-drag inline-block h-6 align-middle" />
      </span>
    </AuthHeading>
  );
}
