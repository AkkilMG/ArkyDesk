"use client";

import { useId, useRef } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/cn";
import { useModalBehaviour, trapTab } from "@/lib/useModalBehaviour";

export type SheetSide = "left" | "right" | "bottom";

const SIDES: Record<SheetSide, string> = {
  // Full height on the side, capped so landscape phones still show the page
  // behind and do not fight the mobile URL bar.
  left: "inset-y-0 left-0 h-[100dvh] w-[85vw] max-w-sm rounded-r-2xl border-r",
  right: "inset-y-0 right-0 h-[100dvh] w-[85vw] max-w-sm rounded-l-2xl border-l",
  // On phones the nav reads better as a bottom sheet, which keeps the thumb
  // within reach of the first links.
  bottom: "inset-x-0 bottom-0 max-h-[88dvh] w-full rounded-t-2xl border-t",
};

/**
 * Slide-in panel for navigation and secondary panels.
 *
 * Shares escape handling, reference-counted scroll locking, focus movement and
 * Tab trapping with `Dialog` via `useModalBehaviour`, so a drawer and a modal
 * cannot drift apart in behaviour. The difference is purely geometric: no
 * centring, no max-width cap beyond `max-w-sm`, and an edge-anchored entrance.
 *
 * The closed panel is left mounted but `inert` + translated off-screen so the
 * slide-out stays visible; the server-rendered HTML never contains it, because
 * the portal only mounts on the client after `open` is true.
 */
export default function Sheet({
  open,
  onClose,
  side = "left",
  title,
  description,
  children,
  className,
  bodyClassName,
  hideCloseButton = false,
  labelledBy,
}: {
  open: boolean;
  onClose: () => void;
  side?: SheetSide;
  /** Supplying a `title` renders the sticky header. */
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  hideCloseButton?: boolean;
  /** For panels that bring their own heading, e.g. the whole app shell nav. */
  labelledBy?: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useModalBehaviour({ open, onRequestClose: onClose, dismissible: true, panelRef });

  if (typeof document === "undefined" || !open) return null;

  const headingId = labelledBy ?? (title ? titleId : undefined);

  return createPortal(
    <div
      data-state="open"
      className={cn(
        "fixed z-overlay flex",
        side === "bottom" ? "inset-0 items-end" : "inset-0"
      )}
    >
      <div
        className="absolute inset-0 animate-backdrop-in bg-black/60 backdrop-blur-sm motion-safe:transition-opacity"
        onPointerDown={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        onKeyDownCapture={(event) => trapTab(event, panelRef)}
        className={cn(
          "absolute flex flex-col overflow-hidden bg-sidebar text-sidebar-foreground shadow-panel outline-none motion-safe:animate-slide-in-left",
          SIDES[side],
          side === "right" && "motion-safe:animate-slide-in-right",
          side === "bottom" && "motion-safe:animate-slide-up",
          className
        )}
      >
        {title || !hideCloseButton ? (
          <header className="flex items-start gap-4 border-b border-border px-5 py-4">
            <div className="min-w-0 flex-1 space-y-1">
              {title ? (
                <h2
                  id={headingId}
                  className="text-base font-semibold tracking-tight text-foreground"
                >
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p id={descriptionId} className="text-sm text-muted-foreground">
                  {description}
                </p>
              ) : null}
            </div>

            {!hideCloseButton ? (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close panel"
                className="-mr-1 -mt-1 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  className="size-4"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            ) : null}
          </header>
        ) : null}

        <div className={cn("min-h-0 flex-1 overflow-y-auto px-4 py-4", bodyClassName)}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
