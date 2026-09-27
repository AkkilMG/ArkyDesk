import { forwardRef } from "react";

import { cn } from "@/lib/cn";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** `subtle` drops the ring and fills with `bg-muted`; `outline` is border-only. */
  tone?: "default" | "subtle" | "outline" | "ghost";
};

const tones = {
  default: "bg-card text-card-foreground ring-1 ring-foreground/10",
  subtle: "bg-muted text-foreground",
  outline: "bg-transparent text-foreground border border-border",
  ghost: "bg-transparent text-foreground",
} as const;

const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, tone = "default", ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("rounded-2xl shadow-card", tones[tone], className)}
      {...props}
    />
  );
});

Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, ...props }, ref) {
    return <div ref={ref} className={cn("space-y-1.5 p-5 sm:p-6", className)} {...props} />;
  }
);

export const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  function CardTitle({ className, ...props }, ref) {
    return (
      <h3
        ref={ref}
        className={cn("text-base font-semibold tracking-tight sm:text-lg", className)}
        {...props}
      />
    );
  }
);

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(function CardDescription({ className, ...props }, ref) {
  return <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />;
});

export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardContent({ className, ...props }, ref) {
    return <div ref={ref} className={cn("p-5 pt-0 sm:p-6 sm:pt-0", className)} {...props} />;
  }
);

export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-3 p-5 pt-0 sm:p-6 sm:pt-0", className)}
        {...props}
      />
    );
  }
);

export default Card;
