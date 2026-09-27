import type { Config } from "tailwindcss";

/**
 * ArkyDesk design tokens.
 *
 * Palette, radius scale, shadows, easing and typography are ported 1:1 from the
 * Arkynox corporate site and the Arkynox career site so that all three products
 * share one colour scheme. Colours are CSS variables (see `globals.css`) so the
 * `.dark` class can re-point every token at runtime without duplicating classes.
 *
 * House rules enforced by this config:
 *  1. Light chrome -> `zinc-*`, secondary/body text -> `slate-*`, dark chrome -> `zinc-9xx`.
 *  2. Semantic tokens (`bg-card`, `text-muted-foreground`, ...) are the only
 *     surface colours; raw palette classes are reserved for accents.
 *  3. `--brand` lime is the single chromatic accent, reserved for the upgrade
 *     CTA, positive status and live indicators.
 */
/**
 * Tailwind v3 can only synthesise opacity modifiers (`bg-brand/15`,
 * `ring-ring/25`) from a colour function or a string containing
 * `<alpha-value>`. Returning a function gives us one extra benefit: the
 * token's *designed* base alpha (`--<token>-a`) multiplies with the modifier,
 * so `text-muted-foreground` renders at 60% in dark mode while
 * `text-muted-foreground/80` renders at 48%. The matching variables in
 * `globals.css` therefore store space-separated RGB channels.
 */
type ColorResolver = (input: { opacityValue?: number }) => string;

const token = (name: string): ColorResolver => {
  return ({ opacityValue } = {}) =>
    `rgb(var(--${name}) / calc(var(--${name}-a, 1) * ${opacityValue ?? 1}))`;
};

/** Tailwind v3's published `Config` type only admits string colours. */
type ColorMap = NonNullable<
  NonNullable<NonNullable<Config["theme"]>["extend"]>["colors"]
>;

const semanticColors = {
  background: token("background"),
  foreground: token("foreground"),
  card: {
    DEFAULT: token("card"),
    foreground: token("card-foreground"),
  },
  popover: {
    DEFAULT: token("popover"),
    foreground: token("popover-foreground"),
  },
  primary: {
    DEFAULT: token("primary"),
    foreground: token("primary-foreground"),
  },
  secondary: {
    DEFAULT: token("secondary"),
    foreground: token("secondary-foreground"),
  },
  muted: {
    DEFAULT: token("muted"),
    foreground: token("muted-foreground"),
  },
  accent: {
    DEFAULT: token("accent"),
    foreground: token("accent-foreground"),
  },
  destructive: {
    DEFAULT: token("destructive"),
    foreground: token("destructive-foreground"),
  },
  success: {
    DEFAULT: token("success"),
    foreground: token("success-foreground"),
  },
  warning: {
    DEFAULT: token("warning"),
    foreground: token("warning-foreground"),
  },
  info: {
    DEFAULT: token("info"),
    foreground: token("info-foreground"),
  },
  border: token("border"),
  input: token("input"),
  ring: token("ring"),
  brand: {
    DEFAULT: token("brand"),
    hover: token("brand-hover"),
    foreground: token("brand-foreground"),
  },
  sidebar: {
    DEFAULT: token("sidebar"),
    foreground: token("sidebar-foreground"),
    primary: token("sidebar-primary"),
    "primary-foreground": token("sidebar-primary-foreground"),
    accent: token("sidebar-accent"),
    "accent-foreground": token("sidebar-accent-foreground"),
    border: token("sidebar-border"),
  },
} as unknown as ColorMap;

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/types/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: semanticColors,
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
        "3xl": "calc(var(--radius) + 12px)",
        "4xl": "calc(var(--radius) + 16px)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        pill: "var(--shadow-pill)",
        panel: "var(--shadow-panel)",
        cta: "var(--shadow-cta)",
        "glow-lime": "var(--shadow-glow-lime)",
        "glow-yellow": "var(--shadow-glow-yellow)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // House type ladder: display / title / body / label / micro
        micro: ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.08em" }],
        label: ["0.8125rem", { lineHeight: "1.25rem" }],
      },
      transitionTimingFunction: {
        // The Arkynox house easing curve, used by every entrance animation.
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
        card: "cubic-bezier(0, 0, 0.2, 1)",
      },
      transitionDuration: {
        fast: "200ms",
        mid: "300ms",
        slow: "500ms",
        slower: "700ms",
      },
      zIndex: {
        sticky: "var(--z-sticky)",
        dropdown: "var(--z-dropdown)",
        modal: "var(--z-modal)",
        overlay: "var(--z-overlay)",
        toast: "var(--z-toast)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          from: { transform: "translateX(-100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "dialog-in": {
          from: { opacity: "0", transform: "translateY(12px) scale(0.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "sheet-in": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "backdrop-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "shimmer-sweep": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "float-y-6": {
          "0%, 100%": { transform: "translateY(-15px)" },
          "50%": { transform: "translateY(15px)" },
        },
        "float-y-7": {
          "0%, 100%": { transform: "translateY(10px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(2deg)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "spin-cw": { to: { transform: "rotate(360deg)" } },
        "spin-ccw": { to: { transform: "rotate(-360deg)" } },
      },
      animation: {
        "fade-in": "fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-in": "scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up": "slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-in-left": "slide-in-left 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-in-right": "slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "dialog-in": "dialog-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "sheet-in": "sheet-in 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        "backdrop-in": "backdrop-in 0.2s ease-out",
        "shimmer-sweep": "shimmer-sweep 1.5s ease-in-out infinite",
        "float-y-6": "float-y-6 6s ease-in-out infinite",
        "float-y-7": "float-y-7 7s ease-in-out infinite",
        marquee: "marquee 20s linear infinite",
        "spin-cw": "spin-cw 1s linear infinite",
        "spin-ccw": "spin-ccw 1s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
