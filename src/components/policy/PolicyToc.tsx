'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

export interface TocItem {
    /** DOM id of the heading this entry scrolls to. */
    id: string;
    /** Clause number, e.g. "3." or "3.2" — rendered in the muted rail. */
    no: string;
    label: string;
    level: 2 | 3;
}

/**
 * Clause table of contents.
 *
 * Desktop (lg+): the enclosing column in PolicyLayout is a full-height sticky
 * box pinned under the header, and this component fills it — the label stays
 * put while the clause list scrolls inside whatever height is left, with the
 * active entry scrolled into view. Mobile: collapsed <details> rendered inline
 * above the article.
 *
 * The same `items` array drives the page headings (via the page source), so
 * numbers can never drift between the rail and the document.
 */
export default function PolicyToc({ items }: { items: TocItem[] }) {
    const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const headings = items
            .map((i) => document.getElementById(i.id))
            .filter((h): h is HTMLElement => h !== null);
        if (headings.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                }
            },
            // Active band: just under the sticky header, upper third of viewport.
            { rootMargin: '-96px 0px -66% 0px', threshold: 0 }
        );
        headings.forEach((h) => observer.observe(h));
        return () => observer.disconnect();
    }, [items]);

    // The rail is shorter than the clause list on short viewports, so the active
    // entry can sit outside its scrollport. Nudge the list by hand rather than
    // calling scrollIntoView: `html { scroll-behavior: smooth }` would animate
    // the rail on every heading change and leave it lagging behind the document.
    useEffect(() => {
        const scroller = listRef.current;
        if (!scroller) return;
        const active = scroller.querySelector<HTMLElement>(`[data-toc-id="${activeId}"]`);
        if (!active) return;

        const inset = 8;
        const rail = scroller.getBoundingClientRect();
        const item = active.getBoundingClientRect();
        if (item.top - rail.top < inset) scroller.scrollTop += item.top - rail.top - inset;
        else if (rail.bottom - item.bottom < inset) scroller.scrollTop -= rail.bottom - item.bottom + inset;
    }, [activeId]);

    const linkClass = (item: TocItem) =>
        cn(
            'flex items-baseline gap-2 rounded-md py-1.5 pr-2 text-[13px] leading-snug transition-colors',
            item.level === 3 ? 'pl-8' : 'pl-3',
            activeId === item.id
                ? 'font-semibold text-foreground'
                : 'text-muted-foreground hover:text-foreground'
        );

    const markerClass = (item: TocItem) =>
        cn(
            'shrink-0 font-medium tabular-nums',
            activeId === item.id ? 'text-foreground' : 'text-muted-foreground/70'
        );

    return (
        <>
            {/* Mobile: inline collapsible */}
            <details className="mb-10 rounded-xl border border-border bg-card lg:hidden">
                <summary className="cursor-pointer select-none px-4 py-3 text-sm font-semibold text-foreground">
                    On this page
                </summary>
                <nav aria-label="Table of contents" className="border-t border-border px-2 py-2">
                    {items.map((item) => (
                        <a key={item.id} href={`#${item.id}`} className={linkClass(item)}>
                            <span className={markerClass(item)}>{item.no}</span>
                            <span className="whitespace-nowrap">{item.label}</span>
                        </a>
                    ))}
                </nav>
            </details>

            {/* Desktop: fills the pinned column supplied by PolicyLayout */}
            <nav
                aria-label="Table of contents"
                className="hidden min-h-0 flex-1 flex-col overflow-hidden lg:flex"
            >
                <p className="mb-3 shrink-0 px-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    On this page
                </p>
                <div
                    ref={listRef}
                    className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain border-border pr-4 [scrollbar-width:thin]"
                >
                    {items.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            data-toc-id={item.id}
                            className={cn(linkClass(item), '-ml-px border-l-2 border-transparent')}
                            style={
                                activeId === item.id
                                    ? { borderLeftColor: 'rgb(var(--foreground))' }
                                    : undefined
                            }
                        >
                            <span className={markerClass(item)}>{item.no}</span>
                            <span className="whitespace-nowrap">{item.label}</span>
                        </a>
                    ))}
                </div>
            </nav>
        </>
    );
}
