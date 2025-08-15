'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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

    const canProceed = acceptedTerms && acceptedPrivacy && acceptedDataProcessing;

    const handleNext = () => {
        if (currentStep === 1 && hasReadTerms && hasReadPrivacy) {
            setCurrentStep(2);
        }
    };

    const handleAccept = async () => {
        if (!canProceed) return;

        const acceptanceData = {
            userEmail: userEmail || 'anonymous',
            timestamp: new Date().toISOString(),
            acceptedTerms: acceptedTerms,
            acceptedPrivacy: acceptedPrivacy,
            acceptedDataProcessing: acceptedDataProcessing,
            acceptedCommunications: acceptedCommunications,
            ipAddress: 'logged', // In real implementation, you'd capture this server-side
            userAgent: navigator.userAgent,
            version: {
                terms: '1.0',
                privacy: '1.0'
            }
        };

        // Store acceptance record
        localStorage.setItem('arkynox_terms_acceptance', JSON.stringify(acceptanceData));

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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop - Non-dismissible */}
            <div className="fixed inset-0 bg-black bg-opacity-60" />
            
            {/* Modal */}
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="bg-white bg-opacity-20 rounded-full p-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">Welcome to ArkyDesk</h2>
                                <p className="text-blue-100">Please review and accept our terms to continue</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-blue-100">Step {currentStep} of 2</div>
                            <div className="w-20 bg-white bg-opacity-20 rounded-full h-2 mt-1">
                                <div 
                                    className="bg-white h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${(currentStep / 2) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-96">
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Review Our Policies
                                </h3>
                                <p className="text-gray-600">
                                    Please take a moment to review our terms and privacy policy before using our support platform.
                                </p>
                            </div>

                            {/* Policy Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Terms and Conditions */}
                                <div className="border border-gray-200 rounded-lg p-6">
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0 mt-1">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Terms & Conditions</h4>
                                            <p className="text-sm text-gray-600 mb-4">
                                                Our terms outline the rules and regulations for using ArkyDesk, including 
                                                service availability, user responsibilities, and limitation of liability.
                                            </p>
                                            <div className="space-y-3">
                                                <Link
                                                    href="/policy/terms-and-condition"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => setHasReadTerms(true)}
                                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                                                >
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                    Read Terms & Conditions
                                                </Link>
                                                {hasReadTerms && (
                                                    <div className="flex items-center text-green-600 text-sm">
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
                                <div className="border border-gray-200 rounded-lg p-6">
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0 mt-1">
                                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Privacy Policy</h4>
                                            <p className="text-sm text-gray-600 mb-4">
                                                Learn how we collect, use, and protect your personal information when you 
                                                use our support ticket system and related services.
                                            </p>
                                            <div className="space-y-3">
                                                <Link
                                                    href="/policy/privacy-policy"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => setHasReadPrivacy(true)}
                                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                                                >
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                    Read Privacy Policy
                                                </Link>
                                                {hasReadPrivacy && (
                                                    <div className="flex items-center text-green-600 text-sm">
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
                            <div className="bg-blue-50 rounded-lg p-6">
                                <h4 className="font-semibold text-blue-900 mb-3">Additional Policies (Optional Reading)</h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <Link href="/policy/sla" target="_blank" className="text-sm text-blue-700 hover:text-blue-900 underline">
                                        Service Level Agreement
                                    </Link>
                                    <Link href="/policy/acceptable-use" target="_blank" className="text-sm text-blue-700 hover:text-blue-900 underline">
                                        Acceptable Use Policy
                                    </Link>
                                    <Link href="/policy/data-retention" target="_blank" className="text-sm text-blue-700 hover:text-blue-900 underline">
                                        Data Retention Policy
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Confirm Your Acceptance
                                </h3>
                                <p className="text-gray-600">
                                    Please confirm your acceptance of our policies to complete your account setup.
                                </p>
                            </div>

                            {/* Acceptance Checkboxes */}
                            <div className="space-y-4">
                                {/* Terms Acceptance */}
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <label className="flex items-start space-x-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={acceptedTerms}
                                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                                            className="mt-1 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <div className="flex-1">
                                            <span className="font-medium text-gray-900">
                                                I accept the Terms and Conditions
                                            </span>
                                            <p className="text-sm text-gray-600 mt-1">
                                                I have read and agree to abide by ArkyDesk's Terms and Conditions, 
                                                including service usage rules and limitations of liability.
                                            </p>
                                        </div>
                                    </label>
                                </div>

                                {/* Privacy Acceptance */}
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <label className="flex items-start space-x-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={acceptedPrivacy}
                                            onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                                            className="mt-1 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <div className="flex-1">
                                            <span className="font-medium text-gray-900">
                                                I accept the Privacy Policy
                                            </span>
                                            <p className="text-sm text-gray-600 mt-1">
                                                I understand how my personal data will be collected, processed, 
                                                and protected according to the Privacy Policy.
                                            </p>
                                        </div>
                                    </label>
                                </div>

                                {/* Data Processing */}
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <label className="flex items-start space-x-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={acceptedDataProcessing}
                                            onChange={(e) => setAcceptedDataProcessing(e.target.checked)}
                                            className="mt-1 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <div className="flex-1">
                                            <span className="font-medium text-gray-900">
                                                I consent to data processing
                                            </span>
                                            <p className="text-sm text-gray-600 mt-1">
                                                I consent to the processing of my personal data for providing 
                                                support services, including ticket management and communications.
                                            </p>
                                        </div>
                                    </label>
                                </div>

                                {/* Communications */}
                                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                                    <label className="flex items-start space-x-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={acceptedCommunications}
                                            onChange={(e) => setAcceptedCommunications(e.target.checked)}
                                            className="mt-1 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <div className="flex-1">
                                            <span className="font-medium text-gray-900">
                                                Service Communications (Recommended)
                                            </span>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Receive important service notifications, ticket updates, and 
                                                system announcements via email.
                                            </p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Legal Notice */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-start space-x-3">
                                    <svg className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-1">Legal Notice</h4>
                                        <p className="text-sm text-gray-600">
                                            Your acceptance is legally binding and will be recorded with timestamp and IP address 
                                            for compliance purposes. You can withdraw consent at any time through your account settings.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                            {currentStep === 1 && "Please review our policies before proceeding"}
                            {currentStep === 2 && `Required: ${!canProceed ? (3 - [acceptedTerms, acceptedPrivacy, acceptedDataProcessing].filter(Boolean).length) : 0} more acceptance(s)`}
                        </div>
                        
                        <div className="flex space-x-3">
                            {currentStep === 1 ? (
                                <>
                                    <button
                                        onClick={handleDecline}
                                        className="px-6 py-2 text-gray-600 font-medium rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        disabled={!hasReadTerms || !hasReadPrivacy}
                                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Continue
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={(e) => setCurrentStep(1)}
                                        className="px-6 py-2 text-gray-600 font-medium rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handleAccept}
                                        disabled={!canProceed}
                                        className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Accept & Continue
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
