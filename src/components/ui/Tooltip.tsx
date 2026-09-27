"use client";

import { useId, useState } from "react";

import { cn } from "@/lib/cn";

type TooltipProps = {
  /** The trigger. Must be a single focusable element. */
  children: React.ReactElement;
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
};

const POSITIONS = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
} as const;

/**
 * Zero-dependency tooltip.
 *
 * A positioning library would be overkill for the handful of hint labels in the
 * app, and the reference sites carry no dependency either. The bubble is shown
 * on both hover *and* focus, which is the part that matters: a tooltip that only
 * appears on hover is invisible to keyboard and screen-reader users.
 *
 * `role="tooltip"` + `aria-describedby` means the text is announced, and the
 * bubble is `aria-hidden` so it is not read twice.
 */
export default function Tooltip({
  children,
  content,
  side = "top",
  className,
}: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={() => setOpen(false)}
    >
      <span aria-describedby={open ? id : undefined} className="inline-flex">
        {children}
      </span>

      <span
        role="tooltip"
        id={id}
        aria-hidden={!open}
        className={cn(
          "pointer-events-none absolute z-dropdown whitespace-nowrap rounded-lg bg-primary px-2.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-pill",
          "motion-safe:animate-scale-in",
          POSITIONS[side],
          open ? "opacity-100" : "opacity-0",
          className
        )}
      >
        {content}
      </span>
    </span>
  );
}
