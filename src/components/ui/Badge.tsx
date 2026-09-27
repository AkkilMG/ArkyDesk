import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "@/lib/cn";

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      tone: {
        neutral: "badge-neutral",
        brand: "badge-brand",
        outline: "badge-outline",
        destructive: "badge-destructive",
        success: "border-success/30 bg-success/15 text-success",
        warning: "border-warning/30 bg-warning/15 text-warning",
        info: "border-info/30 bg-info/15 text-info",
        muted: "border-transparent bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { tone: "neutral" },
  }
);

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, tone, ...props },
  ref
) {
  return <span ref={ref} className={cn(badgeVariants({ tone }), className)} {...props} />;
});

export default Badge;
