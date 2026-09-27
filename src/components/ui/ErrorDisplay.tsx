"use client";

import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type ErrorDisplayProps = {
  title?: string;
  message: string;
  onRetry?: () => void;
  showRetry?: boolean;
  className?: string;
};

/**
 * Shared error state.
 *
 * Previously unused, and every page had hand-rolled its own red box with its own
 * copy. Using the `destructive` token plus the `Button` primitive here is what
 * keeps error styling identical everywhere, and `role="alert"` means the message
 * is announced rather than silently swapped in.
 */
export default function ErrorDisplay({
  title = "Something went wrong",
  message,
  onRetry,
  showRetry = true,
  className,
}: ErrorDisplayProps) {
  return (
    <div
      role="alert"
      className={cn(
        "mx-auto flex max-w-md flex-col items-center justify-center rounded-2xl border border-destructive/25 bg-destructive/5 p-8 text-center",
        className
      )}
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          className="size-6"
          aria-hidden="true"
        >
          <path d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
        </svg>
      </div>

      <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{message}</p>

      {showRetry && onRetry ? (
        <Button variant="secondary" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}
