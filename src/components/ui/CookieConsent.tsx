'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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

    useEffect(() => {
        // Check if user has already made a choice
        const cookieConsent = localStorage.getItem('arkynox_cookie_consent');
        if (!cookieConsent) {
            // Show banner after a short delay
            setTimeout(() => setIsVisible(true), 1000);
        }
    }, []);

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

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black bg-opacity-50" />
            
            {/* Cookie Banner */}
            <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Cookie & Privacy Settings</h3>
                            <p className="text-sm text-gray-600">Manage your privacy preferences</p>
                        </div>
                    </div>
                    <button
                        onClick={(e) => setIsVisible(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="mb-6">
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We use cookies and similar technologies to enhance your experience on ArkyDesk, 
                            provide personalized support, and analyze platform usage. Some cookies are essential 
                            for the platform to function properly.
                        </p>
                        <p className="text-sm text-gray-600">
                            By clicking "Accept All," you consent to our use of cookies. You can customize your 
                            preferences or learn more in our{' '}
                            <Link href="/policy/privacy-policy" className="text-blue-600 hover:text-blue-800 underline">
                                Privacy Policy
                            </Link>{' '}
                            and{' '}
                            <Link href="/policy" className="text-blue-600 hover:text-blue-800 underline">
                                Cookie Policy
                            </Link>.
                        </p>
                    </div>

                    {/* Cookie Categories */}
                    {showDetails && (
                        <div className="mb-6 space-y-4">
                            <h4 className="text-md font-semibold text-gray-900">Cookie Categories</h4>
                            
                            {/* Necessary Cookies */}
                            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                                <input
                                    type="checkbox"
                                    checked={preferences.necessary}
                                    disabled
                                    className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <div className="flex-1">
                                    <h5 className="font-medium text-gray-900">Necessary Cookies</h5>
                                    <p className="text-sm text-gray-600">
                                        Essential for the platform to function. These cookies enable core features 
                                        like security, authentication, and basic functionality.
                                    </p>
                                </div>
                            </div>

                            {/* Functional Cookies */}
                            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                                <input
                                    type="checkbox"
                                    checked={preferences.functional}
                                    onChange={(e) => setPreferences(prev => ({ ...prev, functional: e.target.checked }))}
                                    className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <div className="flex-1">
                                    <h5 className="font-medium text-gray-900">Functional Cookies</h5>
                                    <p className="text-sm text-gray-600">
                                        Remember your preferences and settings to provide a personalized experience, 
                                        such as language preferences and dashboard layouts.
                                    </p>
                                </div>
                            </div>

                            {/* Analytics Cookies */}
                            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                                <input
                                    type="checkbox"
                                    checked={preferences.analytics}
                                    onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                                    className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <div className="flex-1">
                                    <h5 className="font-medium text-gray-900">Analytics Cookies</h5>
                                    <p className="text-sm text-gray-600">
                                        Help us understand how you use our platform so we can improve performance 
                                        and user experience. Data is anonymized and aggregated.
                                    </p>
                                </div>
                            </div>

                            {/* Marketing Cookies */}
                            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                                <input
                                    type="checkbox"
                                    checked={preferences.marketing}
                                    onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                                    className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <div className="flex-1">
                                    <h5 className="font-medium text-gray-900">Marketing Cookies</h5>
                                    <p className="text-sm text-gray-600">
                                        Used to show you relevant content and advertisements. These cookies may 
                                        track your activity across different websites.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        {showDetails ? (
                            <>
                                <button
                                    onClick={handleCustomizePreferences}
                                    className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Save Preferences
                                </button>
                                <button
                                    onClick={(e) => setShowDetails(false)}
                                    className="px-6 py-3 text-gray-600 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                                >
                                    Back
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleAcceptAll}
                                    className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Accept All Cookies
                                </button>
                                <button
                                    onClick={handleDeclineAll}
                                    className="px-6 py-3 text-gray-600 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                                >
                                    Decline All
                                </button>
                                <button
                                    onClick={(e) => setShowDetails(true)}
                                    className="px-6 py-3 text-blue-600 font-medium rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors duration-200"
                                >
                                    Customize
                                </button>
                            </>
                        )}
                    </div>

                    {/* Footer Links */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <Link href="/policy/privacy-policy" className="hover:text-blue-600 underline">
                                Privacy Policy
                            </Link>
                            <Link href="/policy/terms-and-condition" className="hover:text-blue-600 underline">
                                Terms of Service
                            </Link>
                            <Link href="/policy" className="hover:text-blue-600 underline">
                                All Policies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
