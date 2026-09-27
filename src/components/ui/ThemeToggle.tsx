"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/lib/ThemeProvider";
import { cn } from "@/lib/cn";

/**
 * Lightbulb theme toggle.
 *
 * Visual language is a direct port of the Arkynox corporate site header: a
 * glowing filament bulb that dims in dark mode, with a simulated halo on hover.
 * ArkyDesk has no framer-motion dependency, so the spring tap is expressed with
 * an equivalent CSS transition.
 */
export function LightbulbIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn(
        "h-5 w-5 text-yellow-500 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]",
        "transition-all duration-500",
        "dark:text-slate-400 dark:fill-transparent dark:drop-shadow-none",
        className
      )}
    >
      <path d="M9 18h6M10 22h4" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
    </svg>
  );
}

export default function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Guard against hydration mismatch: the server has no way to know the
  // persisted theme, so we render the neutral state until the client mounts.
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
        "border border-transparent transition-all duration-200",
        "hover:bg-muted",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/20",
        "active:scale-[0.8] active:rotate-[-15deg]",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-full bg-yellow-400/20 blur-md",
          "scale-50 opacity-0 transition-all duration-500",
          "group-hover:scale-125 group-hover:opacity-100",
          "dark:bg-sky-400/10"
        )}
      />
      <span className="relative z-10 flex items-center justify-center">
        <LightbulbIcon />
      </span>
    </button>
  );
}
