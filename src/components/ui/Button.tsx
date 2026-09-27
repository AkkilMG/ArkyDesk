import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "@/lib/cn";

/**
 * The single button definition for ArkyDesk.
 *
 * `className` is merged through `cn` (clsx + tailwind-merge), so a caller can
 * override any single utility — `size`, `w-full`, `rounded-full` — without
 * fighting specificity. The `class-variance-authority` contract is what makes
 * `variant`/`size` a closed, type-checked set.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-bold whitespace-nowrap transition-all duration-200 select-none disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "btn-primary",
        secondary: "btn-secondary",
        ghost: "btn-ghost",
        destructive: "btn-destructive",
        pill: "btn-pill",
        brand: "btn-brand",
      },
      size: {
        sm: "px-3 py-1.5 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-7 py-3.5 text-sm",
        icon: "size-10 p-0",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, fullWidth, type = "button", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...props}
    />
  );
});

export default Button;
