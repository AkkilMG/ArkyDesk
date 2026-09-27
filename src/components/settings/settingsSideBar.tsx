"use client";

import { cn } from "@/lib/cn";

export const SETTINGS_SECTIONS = ["profile", "account", "danger"] as const;
export type SettingsSection = (typeof SETTINGS_SECTIONS)[number];

type Props = {
  section: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
  isAdmin?: boolean;
};

type Item = {
  id: SettingsSection;
  label: string;
  description: string;
  icon: React.ReactNode;
  destructive?: boolean;
};

const ITEMS: Item[] = [
  {
    id: "profile",
    label: "Profile",
    description: "Name and avatar",
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7Z"
        />
      </>
    ),
  },
  {
    id: "account",
    label: "Account",
    description: "Password and security",
    icon: (
      <>
        <rect x="4" y="10" width="16" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
  },
  {
    id: "danger",
    label: "Delete account",
    description: "Irreversible",
    destructive: true,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
      />
    ),
  },
];

/**
 * Settings section switcher.
 *
 * Previously three independent booleans (`profile`/`account`/`danger`) were
 * threaded through two components and every entry point was an `<li onClick>`,
 * which is unreachable by keyboard and invisible to assistive tech. It is now a
 * single `section` value rendered as real `<button>`s inside a labelled `nav`,
 * with `aria-current` marking the active section (WAI-ARIA navigation pattern).
 */
export default function SettingsSideBar({ section, onSectionChange, isAdmin }: Props) {
  return (
    <nav
      aria-label="Settings sections"
      className={cn(
        "shrink-0 border-border bg-sidebar",
        // Mobile: a horizontal, scrollable rail above the panel.
        "w-full border-b",
        // Desktop: a vertical rail beside the panel.
        "md:w-64 md:border-b-0 md:border-r"
      )}
    >
      <div className="flex gap-1 overflow-x-auto p-2 md:flex-col md:gap-1 md:overflow-visible md:p-4">
        {ITEMS.map((item) => {
          const active = section === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSectionChange(item.id)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group flex min-w-0 flex-1 items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-200 md:flex-none",
                "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/15",
                item.destructive
                  ? "text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                active && !item.destructive && "bg-muted text-foreground",
                active && item.destructive && "bg-destructive/10 text-destructive"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                  "bg-muted text-muted-foreground",
                  active && "bg-primary text-primary-foreground",
                  active && item.destructive && "bg-destructive text-destructive-foreground"
                )}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  className="size-4"
                >
                  {item.icon}
                </svg>
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold">{item.label}</span>
                <span className="hidden truncate text-xs text-muted-foreground md:block">
                  {item.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {isAdmin ? (
        <p className="hidden border-t border-border px-4 py-3 text-xs text-muted-foreground md:block">
          Administrator accounts cannot be deleted here.
        </p>
      ) : null}
    </nav>
  );
}
