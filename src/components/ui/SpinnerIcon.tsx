import { cn } from "@/lib/cn";

/**
 * Bare spinner ring for inline slots — buttons, inputs, table cells.
 *
 * `LoadingSpinner` is the page-level wrapper (own padding, its own label, its
 * own live region) and must NOT be nested inside a button: its `p-8` becomes
 * padding on a flex child of the button, which ballooned the pill to ~164px
 * tall, and its default `Loading…` label rendered next to the button's own.
 *
 * Sizing is left to the caller so there is no second size scale competing with
 * `LoadingSpinner`'s `SIZES`. `size-4` next to `text-sm` is the house ratio
 * (see ticket/create.tsx and (app)/dashboard/page.tsx).
 */
export default function SpinnerIcon({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block shrink-0 rounded-full border-2 border-border border-t-foreground/70 motion-safe:animate-spin",
        className
      )}
    />
  );
}
