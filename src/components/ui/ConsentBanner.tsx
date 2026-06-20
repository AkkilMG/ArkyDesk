'use client';

import { useConsent } from '@/lib/ConsentContext';
import Link from 'next/link';

export default function ConsentBanner() {
    const { consentSettings, needsConsentUpdate, hasValidConsent, updateConsent } = useConsent();

    // Don't show if consent is valid and up to date
    if (hasValidConsent() && !needsConsentUpdate()) {
        return null;
    }

    const getStatusInfo = () => {
        if (!hasValidConsent()) {
            return {
                type: 'error',
                title: 'Action Required',
                message: 'Please accept our terms and privacy policy to continue using ArkyDesk.',
                bgColor: 'bg-red-50',
                borderColor: 'border-red-400',
                textColor: 'text-red-800',
                lightTextColor: 'text-red-700',
                iconColor: 'text-red-400',
                buttonBg: 'bg-red-100',
                buttonHover: 'hover:bg-red-200'
            };
        } else if (needsConsentUpdate()) {
            return {
                type: 'warning',
                title: 'Consent Update Needed',
                message: 'Your consent preferences need to be refreshed. Please review our updated policies.',
                bgColor: 'bg-yellow-50',
                borderColor: 'border-yellow-400',
                textColor: 'text-yellow-800',
                lightTextColor: 'text-yellow-700',
                iconColor: 'text-yellow-400',
                buttonBg: 'bg-yellow-100',
                buttonHover: 'hover:bg-yellow-200'
            };
        }
        return null;
    };

    const statusInfo = getStatusInfo();
    if (!statusInfo) return null;

    return (
        <div className={`${statusInfo.bgColor} border-l-4 ${statusInfo.borderColor} p-4 mb-6 rounded-r-lg`} data-consent-banner>
            <div className="flex">
                <div className="flex-shrink-0">
                    {statusInfo.type === 'error' ? (
                        <svg className={`h-5 w-5 ${statusInfo.iconColor}`} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg className={`h-5 w-5 ${statusInfo.iconColor}`} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    )}
                </div>
                <div className="ml-3 flex-1">
                    <h3 className={`text-sm font-medium ${statusInfo.textColor}`}>
                        {statusInfo.title}
                    </h3>
                    <div className={`mt-2 text-sm ${statusInfo.lightTextColor}`}>
                        <p>{statusInfo.message}</p>
                    </div>
                    <div className="mt-4">
                        <div className="-mx-2 -my-1.5 flex space-x-3">
                            <button
                                onClick={(e) => {
                                    updateConsent({
                                        termsAccepted: true,
                                        privacyAccepted: true,
                                        dataProcessingAccepted: true,
                                    });
                                }}
                                className="px-4 py-2 rounded-md text-xs font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors"
                            >
                                Accept
                            </button>
                            <Link
                                href="/policy"
                                className={`${statusInfo.buttonBg} px-2 py-1.5 rounded-md text-xs font-medium ${statusInfo.textColor} ${statusInfo.buttonHover} transition-colors`}
                            >
                                Review Policies
                            </Link>
                            <button
                                onClick={(e) => {
                                    const privacyButton = document.querySelector('[data-privacy-settings]');
                                    if (privacyButton) {
                                        (privacyButton as HTMLElement).click();
                                    }
                                }}
                                className={`${statusInfo.buttonBg} px-2 py-1.5 rounded-md text-xs font-medium ${statusInfo.textColor} ${statusInfo.buttonHover} transition-colors`}
                            >
                                Update Preferences
                            </button>
                        </div>
                    </div>
                </div>
                <div className="ml-auto pl-3">
                    <div className="-mx-1.5 -my-1.5">
                        <button
                            type="button"
                            className={`inline-flex ${statusInfo.bgColor} rounded-md p-1.5 ${statusInfo.iconColor.replace('text-', 'text-').replace('-400', '-500')} ${statusInfo.buttonHover.replace('bg-', 'hover:bg-').replace('-200', '-100')} transition-colors`}
                            onClick={(e) => {
                                // Hide banner temporarily
                                const banner = document.querySelector('[data-consent-banner]');
                                if (banner) {
                                    (banner as HTMLElement).style.display = 'none';
                                }
                            }}
                        >
                            <span className="sr-only">Dismiss</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
