import { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface DataTableProps {
    /** Accessible caption; also shown visibly above the table when provided. */
    caption?: string;
    head: ReactNode[];
    rows: ReactNode[][];
    /** Extra classes on individual cells, applied column-wise. Sparse: `undefined` leaves a column unstyled. */
    colClassName?: (string | undefined)[];
    /** Make the first column a bold row-label. */
    firstColHeader?: boolean;
}

/**
 * The single table chrome for every policy page. Replaces the nine
 * hand-written tables and their two competing header styles.
 */
export default function DataTable({ caption, head, rows, colClassName, firstColHeader = false }: DataTableProps) {
    return (
        <figure className="my-6">
            {caption && (
                <figcaption className="mb-2 text-sm font-semibold text-foreground">{caption}</figcaption>
            )}
            <div className="overflow-x-auto rounded-xl border border-border">
                <table className="min-w-full text-sm">
                    <thead className="bg-muted">
                        <tr>
                            {head.map((h, i) => (
                                <th
                                    key={i}
                                    scope="col"
                                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                        {rows.map((row, ri) => (
                            <tr key={ri} className="transition-colors hover:bg-muted/40">
                                {row.map((cell, ci) =>
                                    firstColHeader && ci === 0 ? (
                                        <th
                                            key={ci}
                                            scope="row"
                                            className={cn('px-4 py-3 text-left align-top font-semibold text-foreground', colClassName?.[ci])}
                                        >
                                            {cell}
                                        </th>
                                    ) : (
                                        <td
                                            key={ci}
                                            className={cn('px-4 py-3 align-top text-foreground/80', colClassName?.[ci])}
                                        >
                                            {cell}
                                        </td>
                                    )
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </figure>
    );
}
