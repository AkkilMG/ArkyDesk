'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import PolicyHeader from './PolicyHeader';
import PolicyToc, { type TocItem } from './PolicyToc';
import { policies, POLICY_CONTACTS, POLICY_EFFECTIVE_DATE, POLICY_VERSION } from '@/lib/policy/policies';
import { MailIcon } from './Icons';

interface PolicyLayoutProps {
    /** Route segment under /policy, e.g. "privacy-policy". */
    slug: string;
    title: string;
    /** One-line plain-language statement of what the document covers. */
    description: string;
    effectiveDate?: string;
    version?: string;
    toc: TocItem[];
    children: ReactNode;
}

/**
 * Shared shell for every /policy page. This is a client component only
 * because the TOC needs IntersectionObserver and the header needs a theme
 * toggle — `children` are still server-rendered by the page and passed
 * through untouched, so no legal copy ships to the client as props.
 */
export default function PolicyLayout({
    slug,
    title,
    description,
    effectiveDate = POLICY_EFFECTIVE_DATE,
    version = POLICY_VERSION,
    toc,
    children,
}: PolicyLayoutProps) {
    const related = policies.filter((p) => p.slug !== slug);

    return (
        <div className="min-h-screen bg-background">
            <PolicyHeader currentSlug={slug} />

            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
                <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
                    {/* Full-height pinned column. `self-start` is load-bearing: without
                        it the grid stretches this item to the article's height, the
                        explicit height is ignored and the TOC never scrolls internally.
                        No `overflow` is set here, so the sticky still resolves against
                        the viewport. */}
                    <div className="lg:sticky lg:top-[4.5rem] lg:flex lg:h-[calc(100dvh-4.5rem)] lg:min-h-0 lg:flex-col lg:self-start">
                        <PolicyToc items={toc} />
                    </div>

                    <article className="min-w-0">
                        <header className="mb-10 border-b border-border pb-8">
                            <p className="eyebrow mb-4">Arkynox Legal</p>
                            <h1 className="page-title mb-3">{title}</h1>
                            <p className="max-w-[65ch] text-[15px] leading-relaxed text-muted-foreground">
                                {description}
                            </p>
                            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs font-medium text-muted-foreground">
                                <span>
                                    Effective date: <span className="text-foreground">{effectiveDate}</span>
                                </span>
                                <span aria-hidden className="text-border">•</span>
                                <span>
                                    Version <span className="text-foreground tabular-nums">{version}</span>
                                </span>
                                <span aria-hidden className="text-border">•</span>
                                <span>Applies to all ArkyDesk users worldwide</span>
                            </div>
                        </header>

                        <div className="prose max-w-[70ch]">{children}</div>

                        <footer className="mt-16 border-t border-border pt-10">
                            <h2 className="section-title mb-4">Related policies</h2>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {related.map((p) => (
                                    <Link
                                        key={p.slug}
                                        href={`/policy/${p.slug}`}
                                        className="group rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted/60"
                                    >
                                        <span className="block text-sm font-semibold text-foreground">
                                            {p.title}
                                        </span>
                                        <span className="mt-1 block text-xs leading-snug text-muted-foreground">
                                            {p.description}
                                        </span>
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-8 flex flex-col gap-3 rounded-xl border border-border bg-muted/40 p-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                                <p>
                                    Questions about this document? Email{' '}
                                    <a
                                        href={`mailto:${POLICY_CONTACTS.legal}`}
                                        className="font-medium text-foreground underline decoration-muted-foreground/50 underline-offset-4 hover:decoration-foreground"
                                    >
                                        {POLICY_CONTACTS.legal}
                                    </a>{' '}
                                    or raise a ticket in ArkyDesk.
                                </p>
                                <p className="flex items-center gap-1.5 text-xs">
                                    <MailIcon size={14} className="shrink-0" aria-hidden />
                                    We respond within 5 business days.
                                </p>
                            </div>

                            <p className="mt-8 text-xs text-muted-foreground">
                                This {title} was last updated on {effectiveDate}. Previous versions are available on
                                request.
                            </p>
                        </footer>
                    </article>
                </div>
            </div>
        </div>
    );
}
