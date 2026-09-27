'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import Button from '@/components/ui/Button';
import Dialog from '@/components/ui/Dialog';
import { useConsent } from '@/lib/ConsentContext';

/** `localStorage` can be full, disabled, or hold malformed JSON. Consent
 *  acceptance must never throw and strand the user in the dialog, so every read
 *  is defensive. */
function safeParse(raw: string | null): Record<string, unknown> | null {
    if (!raw) return null;
    try {
        return JSON.parse(raw) as Record<string, unknown>;
    } catch {
        return null;
    }
}

interface TermsAcceptanceProps {
    isOpen: boolean;
    onAccept: () => void;
    onDecline: () => void;
    userEmail?: string;
}

export default function TermsAcceptance({ isOpen, onAccept, onDecline, userEmail }: TermsAcceptanceProps) {
    const [hasReadTerms, setHasReadTerms] = useState(false);
    const [hasReadPrivacy, setHasReadPrivacy] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
    const [acceptedDataProcessing, setAcceptedDataProcessing] = useState(false);
    const [acceptedCommunications, setAcceptedCommunications] = useState(true); // Default to true for essential communications
    const [currentStep, setCurrentStep] = useState(1);
    const { updateConsent } = useConsent();

    const canProceed = acceptedTerms && acceptedPrivacy && acceptedDataProcessing;

    const handleNext = () => {
        if (currentStep === 1 && hasReadTerms && hasReadPrivacy) {
            setCurrentStep(2);
        }
    };

    const handleAccept = async () => {
        if (!canProceed) return;

        // Go through the shared context so live state updates immediately.
        // This used to write `localStorage` directly, but the context only reads
        // that key once on mount — so `hasValidConsent()` kept returning false
        // for the rest of the session, re-showing this dialog on a second
        // attempt and leaving PrivacySettings showing "not accepted".
        updateConsent({
            termsAccepted: acceptedTerms,
            privacyAccepted: acceptedPrivacy,
            dataProcessingAccepted: acceptedDataProcessing,
            communications: acceptedCommunications,
        });

        // Re-write the record to add the audit fields that identify *who*
        // accepted. The context owns the canonical shape; this only appends the
        // compliance metadata it does not track.
        const existing = safeParse(localStorage.getItem('arkynox_terms_acceptance')) ?? {};
        localStorage.setItem(
            'arkynox_terms_acceptance',
            JSON.stringify({
                ...existing,
                userEmail: userEmail || 'anonymous',
                ipAddress: 'logged', // Captured server-side in a real deployment
                userAgent: navigator.userAgent,
            })
        );

        // Call parent component's accept handler
        onAccept();
    };

    const handleDecline = () => {
        // Store decline record
        const declineData = {
            userEmail: userEmail || 'anonymous',
            timestamp: new Date().toISOString(),
            declined: true,
            reason: 'user_declined'
        };

        localStorage.setItem('arkynox_terms_decline', JSON.stringify(declineData));
        onDecline();
    };

    if (!isOpen) return null;

    const footer = (
        <div className="flex w-full flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground" aria-live="polite">
                {currentStep === 1 && "Please review our policies before proceeding"}
                {currentStep === 2 && canProceed
                    ? "All required consents accepted"
                    : currentStep === 2 &&
                      `Required: ${3 - [acceptedTerms, acceptedPrivacy, acceptedDataProcessing].filter(Boolean).length} more acceptance(s)`}
            </p>

            <div className="flex gap-3">
                {currentStep === 1 ? (
                    <>
                        <Button type="button" variant="secondary" onClick={handleDecline}>
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={handleNext}
                            disabled={!hasReadTerms || !hasReadPrivacy}
                        >
                            Continue
                        </Button>
                    </>
                ) : (
                    <>
                        <Button type="button" variant="secondary" onClick={() => setCurrentStep(1)}>
                            Back
                        </Button>
                        <Button type="button" onClick={handleAccept} disabled={!canProceed}>
                            Accept &amp; Continue
                        </Button>
                    </>
                )}
            </div>
        </div>
    );

    return (
        // Mandatory legal flow: `dismissible={false}` disables both Escape and
        // backdrop dismissal, and the close button is hidden, so the only ways
        // out are the explicit Accept / Cancel actions.
        <Dialog
            open={isOpen}
            onClose={onDecline}
            size="xl"
            dismissible={false}
            hideCloseButton
            ariaLabel="Review and accept ArkyDesk terms and privacy policy"
            bodyClassName="px-5 py-6 sm:px-6"
            footer={footer}
            header={
                <div className="flex items-center justify-between gap-4 bg-primary px-5 py-5 text-primary-foreground sm:px-6">
                    <div className="flex min-w-0 items-center gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-foreground/15">
                            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </span>
                        <div className="min-w-0">
                            <h2 className="text-lg font-bold sm:text-2xl">Welcome to ArkyDesk</h2>
                            <p className="text-sm text-primary-foreground/80">
                                Please review and accept our terms to continue
                            </p>
                        </div>
                    </div>

                    <div className="hidden shrink-0 text-right sm:block">
                        <div className="text-sm text-primary-foreground/80">
                            Step {currentStep} of 2
                        </div>
                        <div
                            className="mt-1 h-2 w-20 overflow-hidden rounded-full bg-primary-foreground/20"
                            role="progressbar"
                            aria-valuemin={1}
                            aria-valuemax={2}
                            aria-valuenow={currentStep}
                            aria-label="Acceptance progress"
                        >
                            <div
                                className="h-full rounded-full bg-primary-foreground transition-all duration-300"
                                style={{ width: `${(currentStep / 2) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            }
        >
            {currentStep === 1 && (
                <div className="space-y-6">
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-semibold text-foreground mb-2">
                                    Review Our Policies
                                </h3>
                                <p className="text-muted-foreground">
                                    Please take a moment to review our terms and privacy policy before using our support platform.
                                </p>
                            </div>

                            {/* Policy Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Terms and Conditions */}
                                <div className="border border-border rounded-lg p-6">
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0 mt-1">
                                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-lg font-semibold text-foreground mb-2">Terms & Conditions</h4>
                                            <p className="text-sm text-muted-foreground mb-4">
                                                Our terms outline the rules and regulations for using ArkyDesk, including 
                                                service availability, user responsibilities, and limitation of liability.
                                            </p>
                                            <div className="space-y-3">
                                                <Link
                                                    href="/policy/terms-and-condition"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => setHasReadTerms(true)}
                                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary bg-muted rounded-lg hover:bg-primary/15 transition-colors"
                                                >
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                    Read Terms & Conditions
                                                </Link>
                                                {hasReadTerms && (
                                                    <div className="flex items-center text-success text-sm">
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Document reviewed
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Privacy Policy */}
                                <div className="border border-border rounded-lg p-6">
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0 mt-1">
                                            <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-lg font-semibold text-foreground mb-2">Privacy Policy</h4>
                                            <p className="text-sm text-muted-foreground mb-4">
                                                Learn how we collect, use, and protect your personal information when you 
                                                use our support ticket system and related services.
                                            </p>
                                            <div className="space-y-3">
                                                <Link
                                                    href="/policy/privacy-policy"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => setHasReadPrivacy(true)}
                                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-success bg-success/10 rounded-lg hover:bg-success/15 transition-colors"
                                                >
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                    Read Privacy Policy
                                                </Link>
                                                {hasReadPrivacy && (
                                                    <div className="flex items-center text-success text-sm">
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Document reviewed
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Policies */}
                            <div className="bg-muted rounded-lg p-6">
                                <h4 className="font-semibold text-foreground mb-3">Additional Policies (Optional Reading)</h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <Link href="/policy/sla" target="_blank" className="text-sm text-primary hover:text-primary/80 underline">
                                        Service Level Agreement
                                    </Link>
                                    <Link href="/policy/acceptable-use" target="_blank" className="text-sm text-primary hover:text-primary/80 underline">
                                        Acceptable Use Policy
                                    </Link>
                                    <Link href="/policy/data-retention" target="_blank" className="text-sm text-primary hover:text-primary/80 underline">
                                        Data Retention Policy
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-semibold text-foreground mb-2">
                                    Confirm Your Acceptance
                                </h3>
                                <p className="text-muted-foreground">
                                    Please confirm your acceptance of our policies to complete your account setup.
                                </p>
                            </div>

                            {/* Acceptance Checkboxes */}
                            <div className="space-y-4">
                                {/* Terms Acceptance */}
                                <div className="border border-border rounded-lg p-4">
                                    <label className="flex items-start space-x-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={acceptedTerms}
                                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                                            className="mt-1 size-5 shrink-0 accent-primary"
                                        />
                                        <div className="flex-1">
                                            <span className="font-medium text-foreground">
                                                I accept the Terms and Conditions
                                            </span>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                I have read and agree to abide by ArkyDesk&apos;s Terms and Conditions, 
                                                including service usage rules and limitations of liability.
                                            </p>
                                        </div>
                                    </label>
                                </div>

                                {/* Privacy Acceptance */}
                                <div className="border border-border rounded-lg p-4">
                                    <label className="flex items-start space-x-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={acceptedPrivacy}
                                            onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                                            className="mt-1 size-5 shrink-0 accent-primary"
                                        />
                                        <div className="flex-1">
                                            <span className="font-medium text-foreground">
                                                I accept the Privacy Policy
                                            </span>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                I understand how my personal data will be collected, processed, 
                                                and protected according to the Privacy Policy.
                                            </p>
                                        </div>
                                    </label>
                                </div>

                                {/* Data Processing */}
                                <div className="border border-border rounded-lg p-4">
                                    <label className="flex items-start space-x-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={acceptedDataProcessing}
                                            onChange={(e) => setAcceptedDataProcessing(e.target.checked)}
                                            className="mt-1 size-5 shrink-0 accent-primary"
                                        />
                                        <div className="flex-1">
                                            <span className="font-medium text-foreground">
                                                I consent to data processing
                                            </span>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                I consent to the processing of my personal data for providing 
                                                support services, including ticket management and communications.
                                            </p>
                                        </div>
                                    </label>
                                </div>

                                {/* Communications */}
                                <div className="border border-border rounded-lg p-4 bg-muted">
                                    <label className="flex items-start space-x-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={acceptedCommunications}
                                            onChange={(e) => setAcceptedCommunications(e.target.checked)}
                                            className="mt-1 size-5 shrink-0 accent-primary"
                                        />
                                        <div className="flex-1">
                                            <span className="font-medium text-foreground">
                                                Service Communications (Recommended)
                                            </span>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Receive important service notifications, ticket updates, and 
                                                system announcements via email.
                                            </p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Legal Notice */}
                            <div className="bg-muted rounded-lg p-4">
                                <div className="flex items-start space-x-3">
                                    <svg className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <h4 className="font-medium text-foreground mb-1">Legal Notice</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Your acceptance is legally binding and will be recorded with timestamp and IP address 
                                            for compliance purposes. You can withdraw consent at any time through your account settings.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
        </Dialog>
    );
}
