import { cn } from "@/lib/cn";

export type FormMessageTone = "error" | "success" | "info";

const TONE_STYLES: Record<FormMessageTone, { box: string; icon: string; text: string }> = {
  error: {
    box: "border-destructive/30 bg-destructive/5",
    icon: "text-destructive",
    text: "text-destructive",
  },
  success: {
    box: "border-success/30 bg-success/5",
    icon: "text-success",
    text: "text-success",
  },
  info: {
    box: "border-border bg-muted",
    icon: "text-muted-foreground",
    text: "text-foreground",
  },
};

/** Path data for the three banner glyphs, inlined (no icon dependency). */
const TONE_PATHS: Record<FormMessageTone, string> = {
  error: "M12 8v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
  success: "M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
  info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
};

/**
 * Form-level status banner.
 *
 * Four auth surfaces each had their own version of this — `/signin` a local
 * `BannerMessage`, `/signup` and `/reset-password/[token]` and
 * `/forgot-password` three different inline error blocks, two of which used a
 * bare `<p>` with no `role`. One component keeps the `success`/`destructive`
 * token usage consistent and guarantees the `role` is never forgotten again.
 *
 * Errors use `role="alert"` (assertive) because they interrupt the user.
 * Success uses `role="status"` (polite) so it does not talk over a submit
 * button still being announced.
 */
export default function FormMessage({
  tone,
  children,
  className,
}: {
  tone: FormMessageTone;
  children: React.ReactNode;
  className?: string;
}) {
  const styles = TONE_STYLES[tone];

  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      aria-live={tone === "error" ? "assertive" : "polite"}
      className={cn(
        "flex items-start gap-2 rounded-xl border p-3",
        styles.box,
        className
      )}
    >
      <svg
        className={cn("mt-0.5 size-4 shrink-0", styles.icon)}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d={TONE_PATHS[tone]} />
      </svg>
      <span className={cn("text-sm font-medium", styles.text)}>{children}</span>
    </div>
  );
}
