import { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { AlertTriangleIcon, InfoIcon, LockIcon, ScaleIcon } from './Icons';

export type NoteTone = 'info' | 'legal' | 'warning' | 'restricted';

const tones: Record<NoteTone, { bar: string; iconColor: string; Icon: typeof InfoIcon }> = {
    info: { bar: 'border-l-info', iconColor: 'text-info', Icon: InfoIcon },
    legal: { bar: 'border-l-foreground/40', iconColor: 'text-foreground', Icon: ScaleIcon },
    warning: { bar: 'border-l-warning', iconColor: 'text-warning', Icon: AlertTriangleIcon },
    restricted: { bar: 'border-l-destructive', iconColor: 'text-destructive', Icon: LockIcon },
};

interface NoteProps {
    tone?: NoteTone;
    title?: string;
    children: ReactNode;
}

/**
 * The single callout used across all policy pages. Flat, monochrome surface
 * with a 2px status-tinted left bar — replaces the old gradient boxes.
 * Raw <p>/<ul> children inherit .prose styling, which is intended.
 */
export default function Note({ tone = 'info', title, children }: NoteProps) {
    const { bar, iconColor, Icon } = tones[tone];
    return (
        <div className={cn('my-6 rounded-xl border border-border border-l-2 bg-muted/40 p-5', bar)}>
            <div className="flex items-start gap-3">
                <Icon size={18} aria-hidden className={cn('mt-0.5 shrink-0', iconColor)} />
                <div className="min-w-0 text-[15px] leading-relaxed">
                    {title && <div className="mb-1 font-semibold text-foreground">{title}</div>}
                    <div className="space-y-2 text-foreground/80 [&_p]:mb-0">{children}</div>
                </div>
            </div>
        </div>
    );
}
