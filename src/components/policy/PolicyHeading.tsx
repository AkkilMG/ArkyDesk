import { ReactNode } from 'react';

interface ClauseHeadingProps {
    /** Anchor id — must match the corresponding PolicyToc item. */
    id: string;
    /** Clause number, e.g. "3." or "3.2" — rendered muted via .clause-no. */
    no: string;
    children: ReactNode;
}

/**
 * Clause headings for the /policy pages. Server-safe. Keeping the number in
 * a dedicated span lets the TOC rail and the heading share one string and
 * keeps the number visually muted.
 *
 * The number is deliberately NOT aria-hidden: in a legal document the clause
 * number is meaningful content, and it is the reference the table of contents,
 * cross-references and the Grievance process all use.
 */
export function H2({ id, no, children }: ClauseHeadingProps) {
    return (
        <h2 id={id}>
            <span className="clause-no">{no}</span>
            {children}
        </h2>
    );
}

export function H3({ id, no, children }: ClauseHeadingProps) {
    return (
        <h3 id={id}>
            <span className="clause-no">{no}</span>
            {children}
        </h3>
    );
}
