import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, useId, useState } from "react";

import { cn } from "@/lib/cn";

export const fieldVariants = cva("w-full", {
  variants: {
    invalid: {
      true: "border-destructive/70 focus-visible:border-destructive",
      false: "",
    },
    disabled: {
      true: "cursor-not-allowed opacity-60",
      false: "",
    },
  },
  defaultVariants: { invalid: false, disabled: false },
});

/** Eye glyphs, inlined because `lucide-react` is not a dependency. */
function EyeIcon({ off }: { off: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-5"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
      {off ? <path d="m4 4 16 16" /> : null}
    </svg>
  );
}

/**
 * Label row + hint/error scaffolding, with the control passed as children.
 *
 * Split out from `Field` so a caller can put its own control where the input
 * would go. That is what the password reveal needs (the eye lives *inside* the
 * input's box) and what `action` needs (sign-in puts a "Forgot password?"
 * button beside the label).
 */
function FieldShell({
  id,
  label,
  hideLabel,
  hint,
  error,
  action,
  className,
  children,
}: {
  id: string;
  label: string;
  hideLabel?: boolean;
  hint?: string;
  error?: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor={id}
          className={cn("text-sm font-medium text-foreground", hideLabel && "sr-only")}
        >
          {label}
        </label>
        {action}
      </div>

      {children}

      {hint && !error ? (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export type FieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> &
  VariantProps<typeof fieldVariants> & {
    label: string;
    /** Hides the visible label but keeps it for screen readers. */
    hideLabel?: boolean;
    hint?: string;
    error?: string;
    /** Trailing node in the label row, e.g. a "Forgot password?" button. */
    action?: React.ReactNode;
    /**
     * Renders a password input with a show/hide eye. Uncontrolled by default;
     * pass `revealed` + `onRevealChange` to share one toggle across two fields
     * (signup reveals password and confirmation together, since confirming a
     * different secret would be misleading).
     */
    revealable?: boolean;
    revealed?: boolean;
    onRevealChange?: (revealed: boolean) => void;
  };

const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  {
    label,
    hideLabel,
    hint,
    error,
    action,
    revealable,
    revealed: revealedProp,
    onRevealChange,
    className,
    invalid,
    disabled,
    id,
    type,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  const [internalRevealed, setInternalRevealed] = useState(false);
  const isRevealable = Boolean(revealable);
  const revealed = revealedProp ?? internalRevealed;

  const toggleReveal = () => {
    const next = !revealed;
    setInternalRevealed(next);
    onRevealChange?.(next);
  };

  const resolvedType = isRevealable ? (revealed ? "text" : "password") : type;

  const input = (
    <input
      ref={ref}
      id={inputId}
      type={resolvedType}
      disabled={disabled}
      aria-invalid={error ? true : undefined}
      aria-describedby={cn(hintId, errorId) || undefined}
      className={cn(
        "input",
        isRevealable && "pr-11",
        fieldVariants({ invalid: Boolean(error) || invalid, disabled })
      )}
      {...props}
    />
  );

  return (
    <FieldShell
      id={inputId}
      label={label}
      hideLabel={hideLabel}
      hint={hint}
      error={error}
      action={action}
      className={className}
    >
      {isRevealable ? (
        <div className="relative">
          {input}
          <button
            type="button"
            onClick={toggleReveal}
            disabled={disabled}
            aria-label={revealed ? "Hide password" : "Show password"}
            aria-pressed={revealed}
            // No `title`: a tooltip would duplicate the accessible name and
            // flash on hover, and the label already says what it does.
            className={cn(
              "absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-xl",
              "text-muted-foreground transition-colors hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-ring/20",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            <EyeIcon off={revealed} />
          </button>
        </div>
      ) : (
        input
      )}
    </FieldShell>
  );
});

export default Field;
