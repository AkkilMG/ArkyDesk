"use client";

import { useId, useRef } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/cn";
import { useModalBehaviour, trapTab } from "@/lib/useModalBehaviour";

export type DialogSize = "sm" | "md" | "lg" | "xl" | "full";

const sizes: Record<DialogSize, string> = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-lg",
  lg: "sm:max-w-2xl",
  xl: "sm:max-w-4xl",
  full: "sm:max-w-[min(72rem,100%)]",
};

/**
 * The one modal in ArkyDesk.
 *
 * Every dialog behaviour the codebase previously hand-rolled is centralised
 * here, which is what makes "all modals look and behave the same" enforceable:
 *
 *  - **Focus.** On open, focus moves into the panel; Tab is trapped; on close,
 *    focus returns to whatever was focused before. (WCAG 2.1.2 No Keyboard Trap,
 *    2.4.3 Focus Order)
 *  - **Escape + scroll lock.** Escape closes and `overflow: hidden` is applied
 *    to `<body>`, reference-counted so two open dialogs cannot unlock early.
 *  - **Backdrop click.** Closes on `pointerdown` that starts *outside* the
 *    panel, so a text selection that drags out of an input cannot dismiss it.
 *  - **Motion.** The `animate-dialog-in` / `animate-backdrop-in` utilities are
 *    already reduced-motion aware in `globals.css`; no JS animation library is
 *    used, matching the rest of the app.
 */
export default function Dialog({
  open,
  onClose,
  title,
  description,
  size = "md",
  footer,
  /** Replaces the default header. Use for flows that need a full-bleed
   *  coloured banner or an inline progress indicator; supply `ariaLabel` so
   *  the panel still has an accessible name. */
  header,
  children,
  className,
  bodyClassName,
  hideCloseButton = false,
  /** Accessible name for the panel when there is no visible title element. */
  ariaLabel,
  /** `alertdialog` for destructive confirmations, per the ARIA spec. */
  role = "dialog",
  /** Set for flows that must not be dismissed (e.g. mid-submit). */
  dismissible = true,
}: {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  size?: DialogSize;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  hideCloseButton?: boolean;
  ariaLabel?: string;
  role?: "dialog" | "alertdialog";
  dismissible?: boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useModalBehaviour({
    open,
    onRequestClose: onClose,
    dismissible,
    panelRef,
  });

  if (typeof document === "undefined" || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-modal flex items-end justify-center sm:items-center sm:p-6">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-backdrop-in"
        onPointerDown={() => {
          if (dismissible) onClose();
        }}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role={role}
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : ariaLabel}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        onKeyDownCapture={(event) => trapTab(event, panelRef)}
        className={cn(
          // Mobile: a bottom sheet. From `sm` up: a centred dialog.
          "animate-dialog-in relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-2xl bg-card text-card-foreground shadow-panel outline-none sm:rounded-2xl",
          sizes[size],
          className
        )}
      >
        {header ??
          (title || !hideCloseButton ? (
            <header className="flex items-start gap-4 border-b border-border px-5 py-4 sm:px-6">
              <div className="min-w-0 flex-1 space-y-1">
                {title ? (
                  <h2 id={titleId} className="text-base font-semibold tracking-tight sm:text-lg">
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
                  aria-label="Close dialog"
                  className="-mr-1 -mt-1 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="size-4"
                    aria-hidden="true"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              ) : null}
            </header>
          ) : null)}

        <div
          className={cn(
            "min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6",
            bodyClassName
          )}
        >
          {children}
        </div>

        {footer ? (
          <footer className="flex flex-wrap items-center justify-end gap-3 border-t border-border bg-card px-5 py-4 sm:px-6">
            {footer}
          </footer>
        ) : null}
      </div>
    </div>,
    document.body
  );
}
