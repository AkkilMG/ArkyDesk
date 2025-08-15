'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ConsentSettings {
    necessary: boolean;
    functional: boolean;
    analytics: boolean;
    marketing: boolean;
    communications: boolean;
    termsAccepted: boolean;
    privacyAccepted: boolean;
    dataProcessingAccepted: boolean;
    timestamp?: string;
    version?: string;
}

interface ConsentContextType {
    consentSettings: ConsentSettings;
    updateConsent: (settings: Partial<ConsentSettings>) => void;
    hasValidConsent: () => boolean;
    needsConsentUpdate: () => boolean;
    revokeAllConsent: () => void;
    getConsentRecord: () => any;
}

const defaultConsent: ConsentSettings = {
    necessary: true, // Always true
    functional: false,
    analytics: false,
    marketing: false,
    communications: false,
    termsAccepted: false,
    privacyAccepted: false,
    dataProcessingAccepted: false,
};

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export function ConsentProvider({ children }: { children: ReactNode }) {
    const [consentSettings, setConsentSettings] = useState<ConsentSettings>(defaultConsent);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load consent settings from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                // Load cookie consent
                const cookieConsent = localStorage.getItem('arkynox_cookie_consent');
                const termsAcceptance = localStorage.getItem('arkynox_terms_acceptance');

                let settings = { ...defaultConsent };

                if (cookieConsent) {
                    const cookieData = JSON.parse(cookieConsent);
                    settings = {
                        ...settings,
                        necessary: cookieData.necessary ?? true,
                        functional: cookieData.functional ?? false,
                        analytics: cookieData.analytics ?? false,
                        marketing: cookieData.marketing ?? false,
                        timestamp: cookieData.timestamp,
                        version: cookieData.version,
                    };
                }

                if (termsAcceptance) {
                    const termsData = JSON.parse(termsAcceptance);
                    settings = {
                        ...settings,
                        termsAccepted: termsData.acceptedTerms ?? false,
                        privacyAccepted: termsData.acceptedPrivacy ?? false,
                        dataProcessingAccepted: termsData.acceptedDataProcessing ?? false,
                        communications: termsData.acceptedCommunications ?? false,
                    };
                }

                setConsentSettings(settings);
                setIsLoaded(true);
            } catch (error) {
                console.error('Error loading consent settings:', error);
                setConsentSettings(defaultConsent);
                setIsLoaded(true);
            }
        }
    }, []);

    const updateConsent = (newSettings: Partial<ConsentSettings>) => {
        const updatedSettings = {
            ...consentSettings,
            ...newSettings,
            timestamp: new Date().toISOString(),
            version: '1.0',
            necessary: true, // Always ensure necessary cookies are enabled
        };

        setConsentSettings(updatedSettings);

        // Save to localStorage
        if (typeof window !== 'undefined') {
            try {
                // Update cookie consent if cookie-related settings changed
                if ('functional' in newSettings || 'analytics' in newSettings || 'marketing' in newSettings) {
                    const cookieConsent = {
                        necessary: updatedSettings.necessary,
                        functional: updatedSettings.functional,
                        analytics: updatedSettings.analytics,
                        marketing: updatedSettings.marketing,
                        timestamp: updatedSettings.timestamp,
                        version: updatedSettings.version,
                    };
                    localStorage.setItem('arkynox_cookie_consent', JSON.stringify(cookieConsent));
                    
                    // Set browser cookie
                    document.cookie = `arkynox_consent=${JSON.stringify(cookieConsent)}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
                }

                // Update terms acceptance if terms-related settings changed
                if ('termsAccepted' in newSettings || 'privacyAccepted' in newSettings || 'dataProcessingAccepted' in newSettings) {
                    const termsAcceptance = {
                        acceptedTerms: updatedSettings.termsAccepted,
                        acceptedPrivacy: updatedSettings.privacyAccepted,
                        acceptedDataProcessing: updatedSettings.dataProcessingAccepted,
                        acceptedCommunications: updatedSettings.communications,
                        timestamp: updatedSettings.timestamp,
                        userAgent: navigator.userAgent,
                    };
                    localStorage.setItem('arkynox_terms_acceptance', JSON.stringify(termsAcceptance));
                }

                // Initialize or update third-party services based on consent
                updateThirdPartyServices(updatedSettings);
            } catch (error) {
                console.error('Error saving consent settings:', error);
            }
        }
    };

    const hasValidConsent = (): boolean => {
        if (!isLoaded) return false;
        
        // Check if all required consents are given
        return consentSettings.termsAccepted && 
               consentSettings.privacyAccepted && 
               consentSettings.dataProcessingAccepted;
    };

    const needsConsentUpdate = (): boolean => {
        if (!isLoaded) return false;
        
        // Check if consent is older than 12 months (example policy)
        if (consentSettings.timestamp) {
            const consentDate = new Date(consentSettings.timestamp);
            const twelveMonthsAgo = new Date();
            twelveMonthsAgo.setFullYear(twelveMonthsAgo.getFullYear() - 1);
            
            return consentDate < twelveMonthsAgo;
        }
        
        return !hasValidConsent();
    };

    const revokeAllConsent = () => {
        const revokedSettings: ConsentSettings = {
            ...defaultConsent,
            timestamp: new Date().toISOString(),
        };

        setConsentSettings(revokedSettings);

        // Clear localStorage
        if (typeof window !== 'undefined') {
            localStorage.removeItem('arkynox_cookie_consent');
            localStorage.removeItem('arkynox_terms_acceptance');
            
            // Set revocation record
            const revocationRecord = {
                timestamp: new Date().toISOString(),
                reason: 'user_revoked',
                userAgent: navigator.userAgent,
            };
            localStorage.setItem('arkynox_consent_revoked', JSON.stringify(revocationRecord));
            
            // Clear consent cookie
            document.cookie = 'arkynox_consent=; path=/; max-age=0;';
        }

        // Disable third-party services
        updateThirdPartyServices(revokedSettings);
    };

    const getConsentRecord = () => {
        return {
            consentSettings,
            isLoaded,
            hasValidConsent: hasValidConsent(),
            needsUpdate: needsConsentUpdate(),
            lastUpdated: consentSettings.timestamp,
        };
    };

    const updateThirdPartyServices = (settings: ConsentSettings) => {
        // Google Analytics
        if (settings.analytics) {
            // Enable Google Analytics
            if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('consent', 'update', {
                    'analytics_storage': 'granted'
                });
            }
        } else {
            // Disable Google Analytics
            if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('consent', 'update', {
                    'analytics_storage': 'denied'
                });
            }
        }

        // Marketing pixels (Facebook, LinkedIn, etc.)
        if (settings.marketing) {
            // Enable marketing tracking
            console.log('Marketing tracking enabled');
        } else {
            // Disable marketing tracking
            console.log('Marketing tracking disabled');
        }

        // Functional services (Chat widgets, etc.)
        if (settings.functional) {
            // Enable functional services
            console.log('Functional services enabled');
        } else {
            // Disable non-essential functional services
            console.log('Functional services disabled');
        }
    };

    const contextValue: ConsentContextType = {
        consentSettings,
        updateConsent,
        hasValidConsent,
        needsConsentUpdate,
        revokeAllConsent,
        getConsentRecord,
    };

    return (
        <ConsentContext.Provider value={contextValue}>
            {children}
        </ConsentContext.Provider>
    );
}

export function useConsent() {
    const context = useContext(ConsentContext);
    if (context === undefined) {
        throw new Error('useConsent must be used within a ConsentProvider');
    }
    return context;
}

// Utility functions for checking specific consent types
export const canUseAnalytics = (): boolean => {
    if (typeof window === 'undefined') return false;
    
    try {
        const consent = localStorage.getItem('arkynox_cookie_consent');
        if (consent) {
            const data = JSON.parse(consent);
            return data.analytics === true;
        }
    } catch (error) {
        console.error('Error checking analytics consent:', error);
    }
    return false;
};

export const canUseMarketing = (): boolean => {
    if (typeof window === 'undefined') return false;
    
    try {
        const consent = localStorage.getItem('arkynox_cookie_consent');
        if (consent) {
            const data = JSON.parse(consent);
            return data.marketing === true;
        }
    } catch (error) {
        console.error('Error checking marketing consent:', error);
    }
    return false;
};

export const canUseFunctional = (): boolean => {
    if (typeof window === 'undefined') return false;
    
    try {
        const consent = localStorage.getItem('arkynox_cookie_consent');
        if (consent) {
            const data = JSON.parse(consent);
            return data.functional === true;
        }
    } catch (error) {
        console.error('Error checking functional consent:', error);
    }
    return true; // Default to true for backward compatibility
};
