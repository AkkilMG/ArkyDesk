'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/lib/cn';
import {
    jurisdictions as allJurisdictions,
    jurisdictionRegions,
    type JurisdictionInfo,
} from '@/lib/policy/jurisdictions';
import { SearchIcon } from './Icons';

type View = 'cards' | 'table';

interface JurisdictionExplorerProps {
    /** Restrict the dataset, e.g. featured markets only. Defaults to all. */
    data?: JurisdictionInfo[];
    /** Show the per-country key-rights list inside cards. */
    showRights?: boolean;
}

/**
 * Searchable, region-filterable jurisdiction browser used by the policy
 * pages' per-country annexes. Fully client-side filtering over the static
 * dataset — no network, no layout shift.
 */
export default function JurisdictionExplorer({ data, showRights = false }: JurisdictionExplorerProps) {
    const source = data ?? allJurisdictions;
    const [query, setQuery] = useState('');
    const [region, setRegion] = useState<string | null>(null);
    const [view, setView] = useState<View>('cards');

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return source.filter((j) => {
            if (region && j.region !== region) return false;
            if (!q) return true;
            return (
                j.country.toLowerCase().includes(q) ||
                j.law.toLowerCase().includes(q) ||
                j.regulator.toLowerCase().includes(q) ||
                j.keyRights.some((r) => r.toLowerCase().includes(q))
            );
        });
    }, [source, query, region]);

    const regionsInData = jurisdictionRegions.filter((r) => source.some((j) => j.region === r));

    return (
        <div className="my-6">
            {/* Controls */}
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-xs">
                    <SearchIcon
                        size={16}
                        aria-hidden
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search country, law or regulator…"
                        aria-label="Search jurisdictions"
                        className="input pl-10"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                        <button
                            type="button"
                            onClick={() => setRegion(null)}
                            className={cn('badge cursor-pointer transition-colors', region === null ? 'badge-outline bg-muted' : 'badge-outline text-muted-foreground hover:bg-muted/60')}
                            aria-pressed={region === null}
                        >
                            All
                        </button>
                        {regionsInData.map((r) => (
                            <button
                                key={r}
                                type="button"
                                onClick={() => setRegion((cur) => (cur === r ? null : r))}
                                aria-pressed={region === r}
                                className={cn('badge cursor-pointer transition-colors', region === r ? 'badge-outline bg-muted' : 'badge-outline text-muted-foreground hover:bg-muted/60')}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                    <div className="ml-1 hidden items-center rounded-lg border border-border p-0.5 sm:flex" role="group" aria-label="View">
                        {(['cards', 'table'] as View[]).map((v) => (
                            <button
                                key={v}
                                type="button"
                                onClick={() => setView(v)}
                                aria-pressed={view === v}
                                className={cn(
                                    'rounded-md px-2.5 py-1 text-xs font-semibold capitalize transition-colors',
                                    view === v ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                {v}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <p className="mb-3 text-xs font-medium text-muted-foreground" aria-live="polite">
                {filtered.length} of {source.length} jurisdictions
            </p>

            {filtered.length === 0 ? (
                <div className="empty-state py-10">
                    <p className="text-sm text-muted-foreground">No jurisdictions match your search.</p>
                </div>
            ) : view === 'cards' ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {filtered.map((j) => (
                        <div key={j.country} className="rounded-xl border border-border bg-card p-5">
                            <div className="mb-2 flex items-start justify-between gap-2">
                                <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                                    <span aria-hidden>{j.flag}</span>
                                    {j.country}
                                </h4>
                                {j.dataLocalization && (
                                    <span className="badge-destructive">Localization</span>
                                )}
                            </div>
                            <p className="mb-3 text-xs leading-relaxed text-muted-foreground">{j.law}</p>
                            <dl className="space-y-1.5 text-xs">
                                <div className="flex gap-2">
                                    <dt className="w-24 shrink-0 font-medium text-muted-foreground">Breach notice</dt>
                                    <dd className="text-foreground/80">{j.breachNotify}</dd>
                                </div>
                                <div className="flex gap-2">
                                    <dt className="w-24 shrink-0 font-medium text-muted-foreground">Consent age</dt>
                                    <dd className="text-foreground/80">{j.consentAge}+</dd>
                                </div>
                                <div className="flex gap-2">
                                    <dt className="w-24 shrink-0 font-medium text-muted-foreground">Regulator</dt>
                                    <dd className="text-foreground/80">{j.regulator}</dd>
                                </div>
                            </dl>
                            {showRights && (
                                <ul className="mt-3 list-disc space-y-1 border-t border-border pt-3 pl-5 text-xs text-foreground/80 marker:text-muted-foreground">
                                    {j.keyRights.map((r) => (
                                        <li key={r}>{r}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="min-w-full text-sm">
                        <thead className="bg-muted">
                            <tr>
                                {['Country', 'Governing law', 'Consent age', 'Breach notice', 'Localization'].map((h) => (
                                    <th
                                        key={h}
                                        scope="col"
                                        className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border bg-card">
                            {filtered.map((j) => (
                                <tr key={j.country} className="transition-colors hover:bg-muted/40">
                                    <th scope="row" className="whitespace-nowrap px-4 py-3 text-left font-semibold text-foreground">
                                        <span className="mr-1.5" aria-hidden>{j.flag}</span>
                                        {j.country}
                                    </th>
                                    <td className="px-4 py-3 text-xs text-foreground/80">{j.law}</td>
                                    <td className="whitespace-nowrap px-4 py-3 text-foreground/80">{j.consentAge}+</td>
                                    <td className="px-4 py-3 text-xs text-foreground/80">{j.breachNotify}</td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        {j.dataLocalization ? (
                                            <span className="font-medium text-destructive">Required</span>
                                        ) : (
                                            <span className="text-muted-foreground">Not required</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
