import { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { ChevronDownIcon } from './Icons';

interface ClauseProps {
    /** Optional anchor id so the TOC can deep-link a sub-clause. */
    id?: string;
    /** Clause number, e.g. "14.3" — rendered in the muted rail style. */
    no: string;
    title: string;
    /** Start expanded. Keep false for long jurisdiction annexes. */
    defaultOpen?: boolean;
    children: ReactNode;
}

/**
 * Collapsible sub-clause, built on native <details>/<summary>.
 *
 * Deliberately NOT a JS-driven disclosure: the browser handles the toggle, so
 * the content stays reachable with JavaScript disabled, in a print/PDF context,
 * and for assistive technology that does not run client scripts. The content is
 * always in the DOM — only the native disclosure state changes.
 *
 * Server component: there is no state, so no client bundle is shipped for it.
 */
export default function Clause({ id, no, title, defaultOpen = false, children }: ClauseProps) {
    return (
        <details
            id={id}
            open={defaultOpen}
            className="group scroll-mt-24 overflow-hidden rounded-xl border border-border bg-card"
        >
            <summary
                className={cn(
                    'flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-left',
                    'transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/15',
                    '[&::-webkit-details-marker]:hidden [&::-moz-details-marker]:hidden'
                )}
            >
                <span className="text-[15px] font-semibold text-foreground">
                    <span className="clause-no">{no}</span>
                    {title}
                </span>
                <ChevronDownIcon
                    size={16}
                    aria-hidden
                    className="shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                />
            </summary>
            <div className="border-t border-border px-5 pb-5 pt-4">{children}</div>
        </details>
    );
}
