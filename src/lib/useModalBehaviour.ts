"use client";

import { useEffect, useRef } from "react";

/** Selector for everything that can hold focus inside a dialog or drawer. */
export const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(",");

const LOCK_FLAG = "__arkydeskLocks";

/**
 * The behaviour every overlay in ArkyDesk needs, in one place.
 *
 * Extracted from `Dialog` so that `Sheet` behaves identically instead of
 * re-implementing (and slowly diverging from) three subtle rules:
 *
 *  1. **Escape** closes, but only while `dismissible` is true.
 *  2. **Scroll lock** is reference counted on `<body>`. A naive
 *     `overflow = "hidden"` per overlay unlocks the page as soon as *any* one of
 *     two stacked overlays closes.
 *  3. **Focus** moves into the panel on open and returns to the previously
 *     focused element on close, so keyboard users are not dumped at the top of
 *     the document (WCAG 2.4.3 Focus Order).
 */
export function useModalBehaviour({
  open,
  onRequestClose,
  dismissible,
  panelRef,
}: {
  open: boolean;
  onRequestClose: () => void;
  dismissible: boolean;
  panelRef: React.RefObject<HTMLElement>;
}) {
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      // A stacked overlay (dialog inside sheet) handles its own Escape first.
      event.stopPropagation();
      if (dismissible) onRequestClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, dismissible, onRequestClose]);

  useEffect(() => {
    if (!open) return;

    const body = document.body as HTMLElement & { [LOCK_FLAG]?: number };
    const previousOverflow = body.style.overflow;
    body[LOCK_FLAG] = (body[LOCK_FLAG] ?? 0) + 1;
    body.style.overflow = "hidden";

    return () => {
      body[LOCK_FLAG] = (body[LOCK_FLAG] ?? 1) - 1;
      if (body[LOCK_FLAG]! <= 0) {
        body[LOCK_FLAG] = 0;
        body.style.overflow = previousOverflow;
      }
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;

    // Wait a frame so the panel is laid out before we reach into it.
    const raf = requestAnimationFrame(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const target =
        panel.querySelector<HTMLElement>("[data-autofocus]") ??
        panel.querySelector<HTMLElement>(FOCUSABLE) ??
        panel;
      target.focus();
    });

    return () => {
      cancelAnimationFrame(raf);
      restoreFocusRef.current?.focus?.();
    };
  }, [open, panelRef]);
}

/**
 * Keep Tab inside the panel while it is open.
 *
 * Wrap this on the panel's `onKeyDownCapture`. It is a no-op when the panel has
 * no focusable children, in which case focus is pinned to the panel itself so
 * the user cannot tab out into the inert page behind.
 */
export function trapTab(
  event: React.KeyboardEvent<HTMLElement>,
  panelRef: React.RefObject<HTMLElement>
) {
  if (event.key !== "Tab") return;
  const panel = panelRef.current;
  if (!panel) return;

  const focusables = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.offsetParent !== null
  );

  if (focusables.length === 0) {
    event.preventDefault();
    panel.focus();
    return;
  }

  const first = focusables[0]!;
  const last = focusables[focusables.length - 1]!;
  const active = document.activeElement;

  if (event.shiftKey && (active === first || !panel.contains(active))) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}
