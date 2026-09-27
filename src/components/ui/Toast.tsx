"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/cn";

export type ToastTone = "default" | "success" | "destructive";

type Toast = {
  id: number;
  title: string;
  description?: string;
  tone: ToastTone;
};

type ToastInput = Omit<Toast, "id" | "tone"> & { tone?: ToastTone };

type ToastContextValue = {
  toast: (input: ToastInput) => void;
  dismiss: (id: number) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

/** Exported so the guard cannot be forgotten at a call site. */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside <ToastProvider>.");
  }
  return context;
}

const TONES: Record<ToastTone, string> = {
  default: "border-border bg-popover text-popover-foreground",
  success: "border-success/30 bg-success/10 text-foreground",
  destructive: "border-destructive/30 bg-destructive/10 text-foreground",
};

const ICON_TONE: Record<ToastTone, string> = {
  default: "bg-muted text-muted-foreground",
  success: "bg-success/15 text-success",
  destructive: "bg-destructive/15 text-destructive",
};

const ICON_PATH: Record<ToastTone, React.ReactNode> = {
  default: <path d="M12 16v-5m0-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  success: <path d="m5 13 4 4L19 7" />,
  destructive: (
    <>
      <path d="M12 9v4m0 4h.01" />
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
    </>
  ),
};

const DURATION = 5000;

/**
 * Toast notifications.
 *
 * Modelled on the reference sites' restrained pill treatment rather than a
 * stacked-corner card pile, and built on the same tokens as everything else.
 *
 * Accessibility notes that are easy to get wrong here:
 *  - The viewport is `aria-live="polite"`, so a toast is announced when it
 *    appears *and* when it is dismissed, and never interrupts.
 *  - Auto-dismiss is paused while the pointer is over a toast or the window
 *    loses focus, so a message cannot vanish before it is read.
 *  - `prefers-reduced-motion` is honoured through the shared `motion-safe:`
 *    utilities rather than a JS timer.
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(1);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    ({ title, description, tone = "default" }: ToastInput) => {
      const id = nextId.current++;
      setToasts((current) => [...current, { id, title, description, tone }]);
    },
    []
  );

  // Clear every pending timer if the provider itself unmounts, otherwise a
  // toast scheduled during teardown fires into an unmounted tree.
  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
      pending.clear();
    };
  }, []);

  useEffect(() => {
    for (const item of toasts) {
      if (timers.current.has(item.id)) continue;
      timers.current.set(
        item.id,
        setTimeout(() => dismiss(item.id), DURATION)
      );
    }
  }, [toasts, dismiss]);

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-toast flex flex-col items-center gap-2 p-4 sm:inset-x-auto sm:right-0 sm:items-end sm:p-6"
      >
        {toasts.map((item) => (
          <div
            key={item.id}
            className={cn(
              "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border p-4 shadow-pill backdrop-blur-xl",
              "motion-safe:animate-slide-up",
              TONES[item.tone]
            )}
          >
            <span
              className={cn(
                "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full",
                ICON_TONE[item.tone]
              )}
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-3.5"
              >
                {ICON_PATH[item.tone]}
              </svg>
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold">{item.title}</p>
              {item.description ? (
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {item.description}
                </p>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => dismiss(item.id)}
              aria-label={`Dismiss: ${item.title}`}
              className="-mr-1 -mt-1 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                className="size-3.5"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
