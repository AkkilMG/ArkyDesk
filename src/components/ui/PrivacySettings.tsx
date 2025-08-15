'use client';

import { useState, useEffect } from 'react';
import { useConsent } from '@/lib/ConsentContext';
import Link from 'next/link';

export default function PrivacySettings() {
    const { consentSettings, updateConsent, getConsentRecord, revokeAllConsent } = useConsent();
    const [isOpen, setIsOpen] = useState(false);
    const [showRevokeConfirm, setShowRevokeConfirm] = useState(false);
    const [localSettings, setLocalSettings] = useState(consentSettings);

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

    const consentRecord = getConsentRecord();

    return (
        <>
            {/* Settings Button */}
            <button
                onClick={(e) => setIsOpen(true)}
                data-privacy-settings
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 p-2 rounded-lg hover:bg-purple-50 transition-smooth text-sm sm:text-base w-full"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Privacy Settings</span>
            </button>

            {/* Privacy Settings Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={(e) => setIsOpen(false)} />
                    
                    <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold">Privacy & Consent Settings</h2>
                                    <p className="text-purple-100 mt-1">Manage your data preferences and consent</p>
                                </div>
                                <button
                                    onClick={(e) => setIsOpen(false)}
                                    className="text-white hover:text-gray-200 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
                            {/* Consent Status */}
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Consent Status</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-white rounded-lg p-4">
                                        <div className="flex items-center space-x-2">
                                            <div className={`w-3 h-3 rounded-full ${consentRecord.hasValidConsent ? 'bg-green-500' : 'bg-red-500'}`} />
                                            <span className="font-medium text-gray-900">Legal Compliance</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {consentRecord.hasValidConsent ? 'All required consents provided' : 'Missing required consents'}
                                        </p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4">
                                        <div className="flex items-center space-x-2">
                                            <div className={`w-3 h-3 rounded-full ${consentRecord.needsUpdate ? 'bg-yellow-500' : 'bg-green-500'}`} />
                                            <span className="font-medium text-gray-900">Update Status</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {consentRecord.needsUpdate ? 'Consent needs refresh' : 'Current and valid'}
                                        </p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4">
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="font-medium text-gray-900">Last Updated</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {consentRecord.lastUpdated ? 
                                                new Date(consentRecord.lastUpdated).toLocaleDateString() : 
                                                'Not set'
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Cookie Preferences */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cookie Preferences</h3>
                                <div className="space-y-4">
                                    {/* Necessary Cookies */}
                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900">Necessary Cookies</h4>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    Essential for the platform to function properly. These cannot be disabled.
                                                </p>
                                            </div>
                                            <div className="ml-4">
                                                <input
                                                    type="checkbox"
                                                    checked={true}
                                                    disabled
                                                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Functional Cookies */}
                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900">Functional Cookies</h4>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    Remember your preferences and settings for a personalized experience.
                                                </p>
                                            </div>
                                            <div className="ml-4">
                                                <input
                                                    type="checkbox"
                                                    checked={localSettings.functional}
                                                    onChange={(e) => setLocalSettings(prev => ({ ...prev, functional: e.target.checked }))}
                                                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Analytics Cookies */}
                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900">Analytics Cookies</h4>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    Help us understand usage patterns to improve our services. Data is anonymized.
                                                </p>
                                            </div>
                                            <div className="ml-4">
                                                <input
                                                    type="checkbox"
                                                    checked={localSettings.analytics}
                                                    onChange={(e) => setLocalSettings(prev => ({ ...prev, analytics: e.target.checked }))}
                                                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Marketing Cookies */}
                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900">Marketing Cookies</h4>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    Used to show relevant content and advertisements across websites.
                                                </p>
                                            </div>
                                            <div className="ml-4">
                                                <input
                                                    type="checkbox"
                                                    checked={localSettings.marketing}
                                                    onChange={(e) => setLocalSettings(prev => ({ ...prev, marketing: e.target.checked }))}
                                                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Communication Preferences */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication Preferences</h3>
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">Service Notifications</h4>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Receive important updates about your tickets, account, and service changes.
                                            </p>
                                        </div>
                                        <div className="ml-4">
                                            <input
                                                type="checkbox"
                                                checked={localSettings.communications}
                                                onChange={(e) => setLocalSettings(prev => ({ ...prev, communications: e.target.checked }))}
                                                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Legal Agreements */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal Agreements</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-3 h-3 rounded-full ${consentSettings.termsAccepted ? 'bg-green-500' : 'bg-red-500'}`} />
                                            <span className="font-medium text-gray-900">Terms & Conditions</span>
                                        </div>
                                        <Link href="/policy/terms-and-condition" target="_blank" className="text-blue-600 hover:text-blue-800 text-sm underline">
                                            View
                                        </Link>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-3 h-3 rounded-full ${consentSettings.privacyAccepted ? 'bg-green-500' : 'bg-red-500'}`} />
                                            <span className="font-medium text-gray-900">Privacy Policy</span>
                                        </div>
                                        <Link href="/policy/privacy-policy" target="_blank" className="text-blue-600 hover:text-blue-800 text-sm underline">
                                            View
                                        </Link>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-3 h-3 rounded-full ${consentSettings.dataProcessingAccepted ? 'bg-green-500' : 'bg-red-500'}`} />
                                            <span className="font-medium text-gray-900">Data Processing</span>
                                        </div>
                                        <Link href="/policy" target="_blank" className="text-blue-600 hover:text-blue-800 text-sm underline">
                                            View All
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Data Rights */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Data Rights</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <h4 className="font-medium text-gray-900 mb-2">Access Your Data</h4>
                                        <p className="text-sm text-gray-600 mb-3">
                                            Download a copy of all personal data we have about you.
                                        </p>
                                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                            Request Data Export
                                        </button>
                                    </div>
                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <h4 className="font-medium text-gray-900 mb-2">Delete Account</h4>
                                        <p className="text-sm text-gray-600 mb-3">
                                            Permanently delete your account and associated data.
                                        </p>
                                        <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                                            Delete Account
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Revoke All Consent */}
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-red-900 mb-2">Revoke All Consent</h3>
                                <p className="text-sm text-red-700 mb-4">
                                    Withdraw all consent and disable all non-essential features. This will limit platform functionality.
                                </p>
                                <button
                                    onClick={(e) => setShowRevokeConfirm(true)}
                                    className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Revoke All Consent
                                </button>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-600">
                                    Changes take effect immediately and are saved automatically.
                                </p>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={(e) => setIsOpen(false)}
                                        className="px-4 py-2 text-gray-600 font-medium rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Revoke Confirmation Modal */}
            {showRevokeConfirm && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black bg-opacity-50" />
                    <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Consent Revocation</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to revoke all consent? This will disable most platform features 
                            and you may need to re-accept terms to continue using the service.
                        </p>
                        <div className="flex space-x-3">
                            <button
                                onClick={(e) => setShowRevokeConfirm(false)}
                                className="flex-1 px-4 py-2 text-gray-600 font-medium rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRevoke}
                                className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Revoke All
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
