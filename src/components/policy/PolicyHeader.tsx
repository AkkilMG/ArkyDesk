'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { policies } from '@/lib/policy/policies';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/cn';
import { ChevronDownIcon } from './Icons';

/**
 * Sticky top bar for every /policy page: brand mark on the left, the policy
 * switcher and the theme toggle on the right. Policy pages are otherwise
 * chromeless, so this is also the only place dark mode is reachable there.
 */
export default function PolicyHeader({ currentSlug }: { currentSlug: string }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const current = policies.find((p) => p.slug === currentSlug);

    useEffect(() => {
        if (!open) return;
        const onPointerDown = (e: PointerEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('pointerdown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('pointerdown', onPointerDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [open]);

    return (
        <header className="sticky top-0 z-sticky border-b border-border bg-background">
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    className="flex items-center gap-2.5 text-sm font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
                >
                    {/* Theme-specific artwork. `logo.png` was a mid-tone square that
                        read wrong on both surfaces; the pair is swapped purely in CSS so
                        the pre-paint `.dark` class from themeInitScript avoids a flash.
                        Mirrors the pattern in dashboard/sideNav.tsx. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo/logo-light-128.png" alt="" className="h-7 w-7 dark:hidden" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo/logo-dark-128.png" alt="" className="hidden h-7 w-7 dark:block" />
                    ArkyDesk
                    <span className="hidden font-medium text-muted-foreground sm:inline">/ Policies</span>
                </Link>

                <div className="flex items-center gap-1">
                    {/* Desktop switcher: inline links */}
                    <nav aria-label="Policies" className="hidden items-center gap-1 md:flex">
                        {policies.map((p) => (
                            <Link
                                key={p.slug}
                                href={`/policy/${p.slug}`}
                                aria-current={p.slug === currentSlug ? 'page' : undefined}
                                className={cn(
                                    'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                                    p.slug === currentSlug
                                        ? 'bg-muted text-foreground'
                                        : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                                )}
                            >
                                {p.shortTitle}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile switcher: dropdown */}
                    <div ref={menuRef} className="relative md:hidden">
                        <button
                            type="button"
                            onClick={() => setOpen((v) => !v)}
                            aria-expanded={open}
                            aria-haspopup="menu"
                            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/15"
                        >
                            {current?.shortTitle ?? 'Policies'}
                            <ChevronDownIcon
                                size={14}
                                className={cn('text-muted-foreground transition-transform duration-200', open && 'rotate-180')}
                            />
                        </button>
                        {open && (
                            <div
                                role="menu"
                                className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-border bg-popover p-1.5 shadow-panel animate-scale-in"
                            >
                                {policies.map((p) => (
                                    <Link
                                        key={p.slug}
                                        role="menuitem"
                                        href={`/policy/${p.slug}`}
                                        onClick={() => setOpen(false)}
                                        className={cn(
                                            'block rounded-lg px-3 py-2.5',
                                            p.slug === currentSlug ? 'bg-muted' : 'hover:bg-muted/60'
                                        )}
                                    >
                                        <span className="block text-sm font-semibold text-foreground">{p.title}</span>
                                        <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                                            {p.description}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
