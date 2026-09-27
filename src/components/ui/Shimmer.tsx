"use client";

import { cn } from "@/lib/cn";

type ShimmerProps = {
  className?: string;
  shape?: "rect" | "circle";
  variant?: "default" | "list" | "card" | "avatar" | "banner" | "button";
};

/**
 * Loading skeleton.
 *
 * This is the app's de-facto loader (used across ~15 surfaces), so it is the
 * single biggest source of visual drift when it carries its own `gray-*` and
 * `purple-*` palette. Every variant is now expressed in semantic tokens, which
 * means a skeleton automatically matches whichever surface it sits on and flips
 * correctly in dark mode with no `dark:` variants.
 */
const VARIANTS: Record<NonNullable<ShimmerProps["variant"]>, string> = {
  default: "bg-muted",
  list: "bg-muted/80",
  card: "bg-muted",
  avatar: "bg-muted",
  // The banner was the worst offender: a purple-to-blue gradient that matched
  // nothing else in the product.
  banner: "bg-muted",
  button: "bg-muted/60",
};

export default function Shimmer({
  className,
  shape = "rect",
  variant = "default",
}: ShimmerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "shimmer-sweep",
        shape === "circle" || variant === "avatar" ? "rounded-full" : "rounded-lg",
        VARIANTS[variant],
        className
      )}
    />
  );
}
