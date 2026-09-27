"use client";

import { cn } from "@/lib/cn";

type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg";
  text?: string;
  subText?: string;
  className?: string;
};

const SIZES: Record<NonNullable<LoadingSpinnerProps["size"]>, string> = {
  sm: "size-6",
  md: "size-10",
  lg: "size-12",
};

/**
 * Centred loading state.
 *
 * A real spinner rather than a skeleton: used where the shape of the content
 * that is coming is unknown, while `Shimmer` is for when it is predictable.
 * `sizeClasses` was previously typed `any`; it is now a `Record` keyed by the
 * same union as `size`, so a typo is a type error rather than a silent `NaN`
 * class.
 */
export default function LoadingSpinner({
  size = "md",
  text = "Loading…",
  subText,
  className,
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center",
        className
      )}
    >
      <span
        className={cn(
          "mb-4 inline-block rounded-full border-2 border-border border-t-foreground/70",
          "motion-safe:animate-spin",
          SIZES[size]
        )}
        aria-hidden="true"
      />
      {text ? <p className="mb-2 font-medium text-foreground">{text}</p> : null}
      {subText ? (
        <p className="max-w-xs text-sm text-muted-foreground">{subText}</p>
      ) : null}
      {/* Only when there is no visible text: rendering both announced the same
          string twice inside one `role="status"`. With `text` empty the
          element is decorative, so the name still needs to be exposed. */}
      {text ? null : <span className="sr-only">Loading…</span>}
    </div>
  );
}
