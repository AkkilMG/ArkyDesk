'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Button from '@/components/ui/Button';
import Dialog from '@/components/ui/Dialog';

/**
 * The legal documents are never gated behind a consent prompt.
 *
 * A user has to be able to read the policy that explains what is collected and
 * what they are agreeing to *before* being asked to agree. Blocking /policy with
 * a modal also locked <body> scroll while it was open (see useModalBehaviour),
 * and an overflow-locked <body> becomes a scroll container, which silently
 * defeats every `position: sticky` element on the page - the clause table of
 * contents and the policy header both scrolled out of reach.
 */
const isLegalRoute = (pathname: string) =>
    pathname === '/policy' || pathname.startsWith('/policy/');

interface CookieConsentProps {
    onAccept?: () => void;
    onDecline?: () => void;
}

export default function CookieConsent({ onAccept, onDecline }: CookieConsentProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [preferences, setPreferences] = useState({
        necessary: true, // Always required
        functional: true,
        analytics: false,
        marketing: false
    });
    const pathname = usePathname();

    useEffect(() => {
        if (isLegalRoute(pathname)) {
            // Also covers client-side navigation: following a policy link from
            // inside the open dialog must dismiss it, not carry it across.
            setIsVisible(false);
            return;
        }

        // Check if user has already made a choice
        const cookieConsent = localStorage.getItem('arkynox_cookie_consent');
        if (!cookieConsent) {
            // Show banner after a short delay
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, [pathname]);

    const handleAcceptAll = () => {
        const consentData = {
            necessary: true,
            functional: true,
            analytics: true,
            marketing: true,
            timestamp: new Date().toISOString(),
            version: '1.0'
        };
        
        localStorage.setItem('arkynox_cookie_consent', JSON.stringify(consentData));
        setIsVisible(false);
        onAccept?.();
        
        // Set cookies based on consent
        setCookieConsent(consentData);
    };

    const handleDeclineAll = () => {
        const consentData = {
            necessary: true, // Always required
            functional: false,
            analytics: false,
            marketing: false,
            timestamp: new Date().toISOString(),
            version: '1.0'
        };
        
        localStorage.setItem('arkynox_cookie_consent', JSON.stringify(consentData));
        setIsVisible(false);
        onDecline?.();
        
        // Set minimal cookies only
        setCookieConsent(consentData);
    };

    const handleCustomizePreferences = () => {
        const consentData = {
            ...preferences,
            timestamp: new Date().toISOString(),
            version: '1.0'
        };
        
        localStorage.setItem('arkynox_cookie_consent', JSON.stringify(consentData));
        setIsVisible(false);
        setShowDetails(false);
        
        // Set cookies based on preferences
        setCookieConsent(consentData);
    };

    const setCookieConsent = (consent: any) => {
        // Set a cookie to track consent status
        document.cookie = `arkynox_consent=${JSON.stringify(consent)}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
        
        // Initialize analytics if accepted
        if (consent.analytics) {
            // Initialize Google Analytics or other analytics tools
            console.log('Analytics enabled');
        }
        
        // Initialize marketing tools if accepted
        if (consent.marketing) {
            // Initialize marketing pixels, etc.
            console.log('Marketing cookies enabled');
        }
    };

    if (!isVisible) return null;

    const categories: { key: 'necessary' | 'functional' | 'analytics' | 'marketing'; label: string; description: string; locked?: boolean }[] = [
        {
            key: 'necessary',
            label: 'Necessary cookies',
            description:
                'Essential for the platform to function. These cookies enable core features like security, authentication, and basic functionality.',
            locked: true,
        },
        {
            key: 'functional',
            label: 'Functional cookies',
            description:
                'Remember your preferences and settings to provide a personalized experience, such as language preferences and dashboard layouts.',
        },
        {
            key: 'analytics',
            label: 'Analytics cookies',
            description:
                'Help us understand how you use our platform so we can improve performance and user experience. Data is anonymized and aggregated.',
        },
        {
            key: 'marketing',
            label: 'Marketing cookies',
            description:
                'Used to show you relevant content and advertisements. These cookies may track your activity across different websites.',
        },
    ];

    return (
        <Dialog
            open={isVisible}
            // Consent must be an explicit choice, so the banner cannot be
            // dismissed by clicking the backdrop or pressing Escape.
            onClose={() => setIsVisible(false)}
            dismissible={false}
            hideCloseButton
            size="lg"
            ariaLabel="Cookie and privacy settings"
            title="Cookie & privacy settings"
            description="Manage your privacy preferences"
            footer={
                <div className="flex w-full flex-col-reverse gap-3 sm:flex-row">
                    {showDetails ? (
                        <>
                            <Button
                                onClick={handleCustomizePreferences}
                                className="flex-1"
                                data-autofocus
                            >
                                Save preferences
                            </Button>
                            <Button variant="secondary" onClick={() => setShowDetails(false)}>
                                Back
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={handleAcceptAll} className="flex-1" data-autofocus>
                                Accept all cookies
                            </Button>
                            <Button variant="secondary" onClick={handleDeclineAll}>
                                Decline all
                            </Button>
                            <Button variant="ghost" onClick={() => setShowDetails(true)}>
                                Customize
                            </Button>
                        </>
                    )}
                </div>
            }
        >
            <div className="space-y-6">
                <p className="leading-relaxed text-foreground">
                    We use cookies and similar technologies to enhance your experience on
                    ArkyDesk, provide personalized support, and analyze platform usage. Some
                    cookies are essential for the platform to function properly.
                </p>
                <p className="text-sm text-muted-foreground">
                    By clicking &quot;Accept all&quot;, you consent to our use of cookies. You can
                    customize your preferences or learn more in our{' '}
                    <Link
                        href="/policy/privacy-policy"
                        className="text-primary underline underline-offset-4"
                    >
                        Privacy Policy
                    </Link>{' '}
                    and{' '}
                    <Link
                        href="/policy/privacy-policy"
                        className="text-primary underline underline-offset-4"
                    >
                        Cookie Policy
                    </Link>
                    .
                </p>

                {showDetails ? (
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold tracking-tight">
                            Cookie categories
                        </h4>

                        {categories.map(cat => (
                            <label
                                key={cat.key}
                                className="flex items-start gap-3 rounded-lg bg-muted p-4"
                            >
                                <input
                                    type="checkbox"
                                    checked={preferences[cat.key]}
                                    disabled={cat.locked}
                                    onChange={e =>
                                        setPreferences(prev => ({
                                            ...prev,
                                            [cat.key]: e.target.checked,
                                        }))
                                    }
                                    className="mt-0.5 size-4 shrink-0 accent-primary"
                                />
                                <span className="min-w-0 flex-1">
                                    <span className="block font-medium text-foreground">
                                        {cat.label}
                                    </span>
                                    <span className="mt-0.5 block text-sm text-muted-foreground">
                                        {cat.description}
                                    </span>
                                </span>
                            </label>
                        ))}
                    </div>
                ) : null}

                <div className="border-t border-border pt-4">
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <Link href="/policy/privacy-policy" className="hover:text-foreground hover:underline">
                            Privacy Policy
                        </Link>
                        <Link
                            href="/policy/terms-and-condition"
                            className="hover:text-foreground hover:underline"
                        >
                            Terms of Service
                        </Link>
                        <Link
                            href="/policy/data-retention"
                            className="hover:text-foreground hover:underline"
                        >
                            Data Retention
                        </Link>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}
