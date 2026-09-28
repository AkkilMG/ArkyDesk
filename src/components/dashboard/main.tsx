"use client";

import { useEffect, useMemo, useState } from "react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card, {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import ConsentBanner from "@/components/ui/ConsentBanner";
import Shimmer from "@/components/ui/Shimmer";
import { cn } from "@/lib/cn";

type Props = {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
  onNewTicket: () => void;
};

type AdminStats = {
  totalUsers: number;
  totalTickets: number;
  openTickets: number;
  closedTickets: number;
  pendingActions: number;
};

type AdminTicket = {
  _id: string;
  user: string;
  email?: string;
  subject?: string;
  createdAt?: unknown;
  status?: string;
};

type Stat = {
  id: keyof Omit<AdminStats, "totalTickets">;
  label: string;
  chip: string;
  icon: React.ReactNode;
};

const EMPTY_STATS: AdminStats = {
  totalUsers: 0,
  totalTickets: 0,
  openTickets: 0,
  closedTickets: 0,
  pendingActions: 0,
};

const STAT_CARDS: Stat[] = [
  {
    id: "totalUsers",
    label: "Total Users",
    chip: "bg-muted text-muted-foreground",
    icon: (
      <svg className="size-4 sm:size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    id: "openTickets",
    label: "Open Tickets",
    chip: "bg-info/15 text-info",
    icon: (
      <svg className="size-4 sm:size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    id: "closedTickets",
    label: "Resolved",
    chip: "bg-success/15 text-success",
    icon: (
      <svg className="size-4 sm:size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: "pendingActions",
    label: "Pending Actions",
    chip: "bg-warning/15 text-warning",
    icon: (
      <svg className="size-4 sm:size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M12 8v4l2.5 2.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

const localKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const formatDay = (key: string) => {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const timeAgo = (value: unknown) => {
  if (!value) return "";
  const date = new Date(value as string | number | Date);
  if (Number.isNaN(date.getTime())) return "";
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const statusLabel = (status?: string) => {
  const value = (status ?? "").trim();
  if (!value) return "Unknown";
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const statusTone = (
  status?: string
): "success" | "info" | "muted" => {
  const value = (status ?? "").toLowerCase();
  if (value === "closed") return "success";
  if (value === "open") return "info";
  return "muted";
};

const initials = (name?: string) => (name ?? "?").trim().charAt(0).toUpperCase();

export default function MainLayout({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  onNewTicket,
}: Props) {
  const [stats, setStats] = useState<AdminStats>(EMPTY_STATS);
  const [tickets, setTickets] = useState<AdminTicket[]>([]);
  const [displayCounts, setDisplayCounts] = useState<Record<string, number>>({});
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setInterval>[] = [];

    const animateCounts = (next: AdminStats) => {
      const targets: Record<string, number> = {
        totalUsers: next.totalUsers,
        openTickets: next.openTickets,
        closedTickets: next.closedTickets,
        pendingActions: next.pendingActions,
      };

      Object.entries(targets).forEach(([key, target]) => {
        const increment = Math.max(1, Math.ceil(target / 40));
        let current = 0;
        const interval = setInterval(() => {
          current = Math.min(target, current + increment);
          setDisplayCounts((prev) => ({ ...prev, [key]: current }));
          if (current >= target) clearInterval(interval);
        }, 25);
        timers.push(interval);
      });

      // Guarantee the final values land exactly, even if a tick is dropped.
      setTimeout(() => {
        setDisplayCounts(targets);
      }, 1500);
    };

    Promise.all([
      fetch("/api/admin/stats")
        .then((res) => res.json())
        .catch(() => ({ success: false })),
      fetch("/api/admin-dashboard/tickets")
        .then((res) => res.json())
        .catch(() => ({ success: false })),
    ]).then(([statsRes, ticketRes]) => {
      if (cancelled) return;
      setStats(statsRes?.stats ?? EMPTY_STATS);
      setTickets(ticketRes?.tickets ?? []);
      animateCounts(statsRes?.stats ?? EMPTY_STATS);
    }).finally(() => {
      if (!cancelled) setLoadingStats(false);
    });

    return () => {
      cancelled = true;
      timers.forEach((timer) => clearInterval(timer));
    };
  }, []);

  const activity = useMemo(() => {
    const now = new Date();
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (6 - i));
      return { key: localKey(date), count: 0 };
    });
    const index = new Map(days.map((day, i) => [day.key, i]));

    for (const ticket of tickets) {
      if (!ticket.createdAt) continue;
      const date = new Date(ticket.createdAt as string | number | Date);
      if (Number.isNaN(date.getTime())) continue;
      const i = index.get(localKey(date));
      if (i !== undefined) days[i].count += 1;
    }

    return days;
  }, [tickets]);

  const maxActivity = Math.max(...activity.map((day) => day.count), 1);

  const status = useMemo(() => {
    const total = stats.totalTickets;
    const open = stats.openTickets;
    const closed = stats.closedTickets;
    return {
      total,
      open,
      closed,
      other: Math.max(0, total - open - closed),
      pendingActions: stats.pendingActions,
    };
  }, [stats]);

  const resolutionRate = status.total > 0
    ? Math.round((status.closed / status.total) * 100)
    : 0;

  const pct = (value: number) => (status.total > 0 ? Math.round((value / status.total) * 100) : 0);

  const recentTickets = tickets.slice(0, 5);

  const statRows = [
    { key: "open", label: "Open", value: status.open, tone: "info" },
    { key: "resolved", label: "Resolved", value: status.closed, tone: "success" },
    { key: "other", label: "Other", value: status.other, tone: "muted" },
  ] as const;

  return (
    <div className="flex-1 overflow-auto">
      <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground animate-fade-in sm:text-3xl">
              Welcome to ArkyDesk
            </h1>
            <p className="mt-1 text-sm text-muted-foreground sm:text-base">
              Manage your tickets and track progress
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={isMobileMenuOpen ? "/icons/close.svg" : "/icons/menu.svg"} alt="" aria-hidden="true" className="size-6" />
            </Button>

            <div className="relative flex-1 sm:flex-initial">
              <label htmlFor="dashboard-search" className="sr-only">Search dashboard</label>
              <input
                id="dashboard-search"
                type="text"
                className="w-full rounded-full border border-border bg-muted/50 py-2 pl-4 pr-10 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-foreground/25 focus:outline-none focus:ring-2 focus:ring-ring/30 sm:w-64"
                placeholder="Search Dashboard"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/search.svg"
                className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground sm:size-5"
                alt=""
                aria-hidden="true"
              />
            </div>

            <Button variant="primary" onClick={onNewTicket}>
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Ticket
            </Button>
          </div>
        </header>

        <ConsentBanner />

        {/* Stat tiles */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STAT_CARDS.map((stat) => (
            <Card key={stat.id} className="p-4 sm:p-5">
              {loadingStats ? (
                <div className="space-y-3 py-1">
                  <Shimmer className="h-8 w-20 rounded" variant="card" />
                  <Shimmer className="h-3 w-16 rounded" variant="list" />
                </div>
              ) : (
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className="block text-2xl font-bold tabular-nums text-foreground animate-fade-in sm:text-3xl">
                      {displayCounts[stat.id] ?? 0}
                    </span>
                    <span className="mt-1 block text-xs font-medium text-muted-foreground sm:text-sm">
                      {stat.label}
                    </span>
                  </div>
                  <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-xl sm:size-10", stat.chip)}>
                    {stat.icon}
                  </span>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Analytics row one */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Activity</CardTitle>
              <CardDescription>Tickets opened in the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingStats ? (
                <div className="space-y-3">
                  <Shimmer className="h-36 w-full rounded-xl" variant="card" />
                  <Shimmer className="h-3 w-40 rounded" variant="list" />
                </div>
              ) : (
                <div>
                  <div className="flex h-40 items-end gap-2 sm:gap-3">
                    {activity.map((day, i) => (
                      <div
                        key={day.key}
                        role="img"
                        aria-label={`${formatDay(day.key)}: ${day.count} ticket${day.count === 1 ? "" : "s"}`}
                        className="group/bar relative flex h-full flex-1 flex-col items-center justify-end"
                      >
                        <span className="pointer-events-none absolute bottom-full z-10 mb-2 whitespace-nowrap rounded-lg bg-foreground px-2 py-1 text-xs font-semibold text-background opacity-0 shadow-pill transition-opacity group-hover/bar:opacity-100">
                          {formatDay(day.key)} · {day.count}
                        </span>
                        <div
                          className={cn(
                            "w-full max-w-10 rounded-t-md",
                            i === activity.length - 1
                              ? "bg-brand group-hover/bar:bg-brand-hover"
                              : "bg-muted group-hover/bar:bg-foreground/60"
                          )}
                          style={{ height: `${(day.count / maxActivity) * 96 + 4}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-2 sm:gap-3">
                    {activity.map((day) => (
                      <span key={day.key} className="flex-1 text-center text-micro uppercase tracking-wide text-muted-foreground">
                        {new Date(`${day.key}T00:00:00`).toLocaleDateString("en-US", { weekday: "short" })}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ticket Status</CardTitle>
              <CardDescription>Distribution of the current backlog</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {loadingStats ? (
                <div className="space-y-3">
                  <Shimmer className="h-2.5 w-full rounded-full" variant="card" />
                  <Shimmer className="h-20 w-full rounded-xl" variant="card" />
                </div>
              ) : (
                <>
                  <div
                    className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted/60"
                    role="img"
                    aria-label={`${status.open} open, ${status.closed} resolved, ${status.other} other of ${status.total} tickets`}
                  >
                    <div className="h-full bg-info transition-all" style={{ width: `${pct(status.open)}%` }} />
                    <div className="h-full bg-success transition-all" style={{ width: `${pct(status.closed)}%` }} />
                    {status.other > 0 && (
                      <div className="h-full bg-muted-foreground/40 transition-all" style={{ width: `${pct(status.other)}%` }} />
                    )}
                  </div>
                  <ul className="space-y-3">
                    {statRows.map((row) => (
                      <li key={row.key} className="flex items-center justify-between gap-3 text-sm">
                        <span className="flex items-center gap-2 font-medium text-foreground">
                          <span
                            className={cn(
                              "size-2.5 rounded-full",
                              row.tone === "info" && "bg-info",
                              row.tone === "success" && "bg-success",
                              row.tone === "muted" && "bg-muted-foreground/40"
                            )}
                            aria-hidden="true"
                          />
                          {row.label}
                        </span>
                        <span className="flex items-baseline gap-2 text-muted-foreground">
                          <span className="font-semibold tabular-nums text-foreground">{row.value}</span>
                          <span className="w-10 text-right tabular-nums">{pct(row.value)}%</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Analytics row two */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Resolution Rate</CardTitle>
              <CardDescription>Share of tickets currently resolved</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {loadingStats ? (
                <Shimmer className="h-24 w-full rounded-xl" variant="card" />
              ) : (
                <>
                  <div className="flex items-end justify-between gap-4">
                    <span className="text-3xl font-bold tabular-nums text-foreground">{resolutionRate}%</span>
                    <Badge tone="brand">{status.closed} closed</Badge>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted/60" role="img" aria-label={`${resolutionRate} percent resolution rate`}>
                    <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${resolutionRate}%` }} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {status.closed} of {status.total} tickets resolved
                    {status.pendingActions > 0 && (
                      <> · {status.pendingActions} pending action{status.pendingActions === 1 ? "" : "s"}</>
                    )}
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Tickets</CardTitle>
              <CardDescription>Latest activity across the helpdesk</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingStats ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Shimmer key={i} className="h-10 w-full rounded-xl" variant="list" />
                  ))}
                </div>
              ) : recentTickets.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">No tickets yet.</p>
              ) : (
                <ul className="divide-y divide-border">
                  {recentTickets.map((ticket) => (
                    <li key={ticket._id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground ring-1 ring-border">
                        {initials(ticket.user)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {ticket.subject?.trim() || "Untitled ticket"}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {ticket.user} · {timeAgo(ticket.createdAt)}
                        </p>
                      </div>
                      <Badge tone={statusTone(ticket.status)}>{statusLabel(ticket.status)}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}