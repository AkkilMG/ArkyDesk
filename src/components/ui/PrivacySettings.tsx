'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { useConsent } from '@/lib/ConsentContext';
import Button from '@/components/ui/Button';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import Dialog from '@/components/ui/Dialog';
import { cn } from '@/lib/cn';

type ConsentSettings = {
    functional: boolean;
    analytics: boolean;
    marketing: boolean;
    communications: boolean;
};

const EMPTY: ConsentSettings = {
    functional: false,
    analytics: false,
    marketing: false,
    communications: false,
};

function StatusDot({ tone }: { tone: 'ok' | 'warn' | 'bad' }) {
    return (
        <span
            aria-hidden="true"
            className={cn(
                'size-2.5 shrink-0 rounded-full',
                tone === 'ok' && 'bg-success',
                tone === 'warn' && 'bg-warning',
                tone === 'bad' && 'bg-destructive'
            )}
        />
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="space-y-3">
            <h3 className="text-sm font-semibold tracking-tight text-foreground">{title}</h3>
            {children}
        </section>
    );
}

/**
 * A labelled checkbox row. The whole row is the `<label>`, so clicking the
 * description toggles the control and the control itself keeps its own visible
 * text association — the original used a bare `<input>` with a sibling `<div>`,
 * which gave the checkbox no accessible name at all.
 */
function ToggleRow({
    label,
    description,
    checked,
    onChange,
    disabled,
}: {
    label: string;
    description: string;
    checked: boolean;
    onChange?: (next: boolean) => void;
    disabled?: boolean;
}) {
    return (
        <label
            className={cn(
                'flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-4 transition-colors',
                disabled ? 'opacity-60' : 'hover:bg-muted/60'
            )}
        >
            <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-foreground">{label}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{description}</span>
            </span>
            <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={(e) => onChange?.(e.target.checked)}
                className="mt-0.5 size-5 shrink-0 accent-primary"
            />
        </label>
    );
}

function AgreementRow({
    label,
    accepted,
    href,
    cta,
}: {
    label: string;
    accepted?: boolean;
    href: string;
    cta: string;
}) {
    return (
        <div className="flex items-center justify-between gap-4 rounded-xl bg-muted p-3">
            <div className="flex min-w-0 items-center gap-3">
                <StatusDot tone={accepted ? 'ok' : 'bad'} />
                <span className="truncate text-sm font-medium text-foreground">{label}</span>
                <span className="sr-only">{accepted ? 'accepted' : 'not accepted'}</span>
            </div>
            <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
                {cta}
            </Link>
        </div>
    );
}

export default function PrivacySettings() {
    const { consentSettings, updateConsent, getConsentRecord, revokeAllConsent } = useConsent();
    const [isOpen, setIsOpen] = useState(false);
    const [showRevokeConfirm, setShowRevokeConfirm] = useState(false);
    const [localSettings, setLocalSettings] = useState<ConsentSettings>(
        () => consentSettings ?? EMPTY
    );

    useEffect(() => {
        setLocalSettings(consentSettings);
    }, [consentSettings]);

    const handleSave = () => {
        updateConsent(localSettings);
        setIsOpen(false);
    };

    const handleRevoke = () => {
        revokeAllConsent();
        setShowRevokeConfirm(false);
        setIsOpen(false);
    };

    const consentRecord = getConsentRecord() ?? {
        hasValidConsent: false,
        needsUpdate: false,
        lastUpdated: null as string | null,
    };

    const set = (key: keyof ConsentSettings) => (next: boolean) =>
        setLocalSettings(prev => ({ ...prev, [key]: next }));

    const footer = (
        <div className="flex w-full flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
                Changes take effect immediately and are saved automatically.
            </p>
            <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setIsOpen(false)}>
                    Cancel
                </Button>
                <Button onClick={handleSave}>Save changes</Button>
            </div>
        </div>
    );

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                data-privacy-settings
                className="flex w-full items-center gap-2 rounded-lg p-2 text-sm text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground sm:text-base"
            >
                <svg
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm10-10V7a4 4 0 0 0-8 0v4h8z"
                    />
                </svg>
                <span>Privacy settings</span>
            </button>

            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                title="Privacy & consent settings"
                description="Manage your data preferences and consent"
                size="xl"
                footer={footer}
            >
                <div className="space-y-8">
                    <Section title="Consent status">
                        <div className="grid grid-cols-1 gap-4 rounded-xl bg-muted p-4 md:grid-cols-3">
                            <div className="rounded-lg bg-card p-4">
                                <div className="flex items-center gap-2">
                                    <StatusDot
                                        tone={consentRecord.hasValidConsent ? 'ok' : 'bad'}
                                    />
                                    <span className="text-sm font-medium text-foreground">
                                        Legal compliance
                                    </span>
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {consentRecord.hasValidConsent
                                        ? 'All required consents provided'
                                        : 'Missing required consents'}
                                </p>
                            </div>

                            <div className="rounded-lg bg-card p-4">
                                <div className="flex items-center gap-2">
                                    <StatusDot tone={consentRecord.needsUpdate ? 'warn' : 'ok'} />
                                    <span className="text-sm font-medium text-foreground">
                                        Update status
                                    </span>
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {consentRecord.needsUpdate
                                        ? 'Consent needs refresh'
                                        : 'Current and valid'}
                                </p>
                            </div>

                            <div className="rounded-lg bg-card p-4">
                                <div className="flex items-center gap-2">
                                    <svg
                                        className="size-4 shrink-0 text-muted-foreground"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                                        />
                                    </svg>
                                    <span className="text-sm font-medium text-foreground">
                                        Last updated
                                    </span>
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {consentRecord.lastUpdated
                                        ? new Date(
                                              consentRecord.lastUpdated
                                          ).toLocaleDateString()
                                        : 'Not set'}
                                </p>
                            </div>
                        </div>
                    </Section>

                    <Section title="Cookie preferences">
                        <div className="space-y-3">
                            <ToggleRow
                                label="Necessary cookies"
                                description="Essential for the platform to function properly. These cannot be disabled."
                                checked
                                disabled
                            />
                            <ToggleRow
                                label="Functional cookies"
                                description="Remember your preferences and settings for a personalized experience."
                                checked={!!localSettings.functional}
                                onChange={set('functional')}
                            />
                            <ToggleRow
                                label="Analytics cookies"
                                description="Help us understand usage patterns to improve our services. Data is anonymized."
                                checked={!!localSettings.analytics}
                                onChange={set('analytics')}
                            />
                            <ToggleRow
                                label="Marketing cookies"
                                description="Used to show relevant content and advertisements across websites."
                                checked={!!localSettings.marketing}
                                onChange={set('marketing')}
                            />
                        </div>
                    </Section>

                    <Section title="Communication preferences">
                        <ToggleRow
                            label="Service notifications"
                            description="Receive important updates about your tickets, account, and service changes."
                            checked={!!localSettings.communications}
                            onChange={set('communications')}
                        />
                    </Section>

                    <Section title="Legal agreements">
                        <div className="space-y-3">
                            <AgreementRow
                                label="Terms & conditions"
                                accepted={consentSettings?.termsAccepted}
                                href="/policy/terms-and-condition"
                                cta="View"
                            />
                            <AgreementRow
                                label="Privacy policy"
                                accepted={consentSettings?.privacyAccepted}
                                href="/policy/privacy-policy"
                                cta="View"
                            />
                            <AgreementRow
                                label="Data processing"
                                accepted={consentSettings?.dataProcessingAccepted}
                                href="/policy"
                                cta="View all"
                            />
                        </div>
                    </Section>

                    <Section title="Your data rights">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="rounded-xl border border-border p-4">
                                <h4 className="mb-2 text-sm font-medium text-foreground">
                                    Access your data
                                </h4>
                                <p className="mb-3 text-sm text-muted-foreground">
                                    Download a copy of all personal data we have about you.
                                </p>
                                <Button variant="ghost" size="sm" className="px-0 text-primary hover:bg-transparent hover:underline hover:underline-offset-4">
                                    Request data export
                                </Button>
                            </div>
                            <div className="rounded-xl border border-border p-4">
                                <h4 className="mb-2 text-sm font-medium text-foreground">
                                    Delete account
                                </h4>
                                <p className="mb-3 text-sm text-muted-foreground">
                                    Permanently delete your account and associated data.
                                </p>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="px-0 text-destructive hover:bg-transparent hover:underline hover:underline-offset-4"
                                >
                                    Delete account
                                </Button>
                            </div>
                        </div>
                    </Section>

                    <section className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
                        <h3 className="mb-2 text-sm font-semibold text-destructive">
                            Revoke all consent
                        </h3>
                        <p className="mb-4 text-sm text-destructive/80">
                            Withdraw all consent and disable all non-essential features. This will
                            limit platform functionality.
                        </p>
                        <Button variant="destructive" onClick={() => setShowRevokeConfirm(true)}>
                            Revoke all consent
                        </Button>
                    </section>
                </div>
            </Dialog>

            <ConfirmDialog
                open={showRevokeConfirm}
                onClose={() => setShowRevokeConfirm(false)}
                onConfirm={handleRevoke}
                title="Confirm consent revocation"
                description="Are you sure you want to revoke all consent? This will disable most platform features and you may need to re-accept terms to continue using the service."
                confirmLabel="Revoke all"
            />
        </>
    );
}
