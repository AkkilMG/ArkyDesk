"use client";

import { useId, useRef, useState } from "react";

import { cn } from "@/lib/cn";

export type TabItem = {
  value: string;
  label: React.ReactNode;
  /** Optional count rendered as a pill, e.g. open ticket totals. */
  badge?: React.ReactNode;
  disabled?: boolean;
};

type TabsProps = {
  items: TabItem[];
  value: string;
  onValueChange: (value: string) => void;
  /** Accessible name for the tab list, e.g. "Ticket status". */
  label: string;
  className?: string;
  /** Stretch tabs to fill the row, as in the reference site's segmented bar. */
  fullWidth?: boolean;
  children: React.ReactNode;
};

/**
 * Accessible tab list.
 *
 * Implements the WAI-ARIA tabs pattern by hand because the reference segmented
 * control is the only place it appears and pulling in a dependency for one
 * component is not worth it:
 *
 *  - `role="tablist"` / `tab` / `tabpanel`, wired by `aria-controls`/`aria-labelledby`
 *  - **Roving tabindex.** Only the active tab is in the tab order, and arrow keys
 *    move between them. Without this, Tab walks through every tab header before
 *    reaching the panel (WCAG 2.1.1 Keyboard).
 *  - Panels are unmounted when inactive, so `hidden` is not needed.
 */
export default function Tabs({
  items,
  value,
  onValueChange,
  label,
  className,
  fullWidth = false,
  children,
}: TabsProps) {
  const baseId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  // Uncontrolled fallback keeps the component usable without a wrapper state.
  const [internal, setInternal] = useState(items[0]?.value ?? "");
  const active = value ?? internal;

  const select = (next: string) => {
    setInternal(next);
    onValueChange(next);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    const enabled = items.filter((item) => !item.disabled);
    const currentIndex = enabled.findIndex((item) => item.value === active);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % enabled.length;
    if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + enabled.length) % enabled.length;
    }
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = enabled.length - 1;

    const next = enabled[nextIndex]!;
    select(next.value);
    // Move real focus, not just selection, or the next Tab press is lost.
    listRef.current
      ?.querySelector<HTMLButtonElement>(`#${CSS.escape(`${baseId}-tab-${next.value}`)}`)
      ?.focus();
  };

  return (
    <div className={className}>
      <div
        ref={listRef}
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className={cn(
          "inline-flex gap-1 rounded-2xl border border-border bg-card p-1",
          fullWidth && "flex w-full"
        )}
      >
        {items.map((item) => {
          const selected = item.value === active;
          return (
            <button
              key={item.value}
              id={`${baseId}-tab-${item.value}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.value}`}
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              onClick={() => select(item.value)}
              className={cn(
                "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-bold transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/15",
                "disabled:cursor-not-allowed disabled:opacity-50",
                selected
                  ? "bg-primary text-primary-foreground shadow-card"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {item.label}
              {item.badge != null ? (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                    selected ? "bg-primary-foreground/20" : "bg-muted"
                  )}
                >
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {items.map((item) =>
        item.value === active ? (
          <div
            key={item.value}
            id={`${baseId}-panel-${item.value}`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${item.value}`}
            tabIndex={0}
            className="focus-visible:outline-none"
          >
            {children}
          </div>
        ) : null
      )}
    </div>
  );
}
