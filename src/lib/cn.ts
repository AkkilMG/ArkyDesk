import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional class names and resolve conflicting Tailwind utilities.
 * `twMerge` makes the last utility win, so component-level overrides such as
 * `className="px-8"` on a `btn-primary` (`px-7`) behave as expected.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
