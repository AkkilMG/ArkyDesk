"use client";

import localFont from "next/font/local";
import "./globals.css";
import React, { useEffect } from "react";

import NoRightClick from "@/components/noRightClick";
import { RealtimeProvider } from "@/lib/RealtimeContext";
import { ConsentProvider } from "@/lib/ConsentContext";
import CookieConsent from "@/components/ui/CookieConsent";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  useEffect(() => {
    // Function to check if analytics consent is given
    const checkAnalyticsConsent = () => {
      if (typeof window !== 'undefined') {
        try {
          const consent = localStorage.getItem('arkynox_cookie_consent');
          if (consent) {
            const data = JSON.parse(consent);
            return data.analytics === true;
          }
        } catch (error) {
          console.error('Error checking analytics consent:', error);
        }
      }
      return false;
    };

    // Only load analytics in production and with user consent
    if (process.env.NODE_ENV === 'production' && checkAnalyticsConsent()) {
      const loadAnalytics = () => {
        const gtagScript = document.createElement("script");
        gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-PXZHEP2GE8";
        gtagScript.async = true;
        gtagScript.onload = () => {
          const inlineScript = document.createElement("script");
          inlineScript.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PXZHEP2GE8', {
              'anonymize_ip': true,
              'cookie_flags': 'SameSite=Strict;Secure'
            });
          `;
          document.head.appendChild(inlineScript);
        };
        document.head.appendChild(gtagScript);
      };
      
      // Load analytics after page is ready to improve initial performance
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadAnalytics);
      } else {
        loadAnalytics();
      }
    }

    // Set up consent change listener
    const handleConsentChange = () => {
      if (checkAnalyticsConsent() && !(window as any).gtag) {
        // User enabled analytics, load it
        window.location.reload(); // Simple approach - reload to initialize analytics
      } else if (!checkAnalyticsConsent() && (window as any).gtag) {
        // User disabled analytics, inform gtag
        (window as any).gtag('consent', 'update', {
          'analytics_storage': 'denied'
        });
      }
    };

    // Listen for storage changes (consent updates)
    window.addEventListener('storage', handleConsentChange);
    return () => window.removeEventListener('storage', handleConsentChange);
  }, []);

  return (
    <html lang="en">
      <head>
        <title>ArkyDesk - Support Portal</title>
        <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />

        <meta name="title" content="ArkyDesk - Support Portal" />
        <meta name="description" content="Professional support ticket system and help desk portal for Arkynox products and services." />
        <meta name="keywords" content="Arkynox, ArkyDesk, support desk, ticketing system, technical support, customer support, help portal, IT support, issue tracking, problem resolution, support tickets, knowledge base" />
        <meta name="author" content="Arkynox Team" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://support.arkynox.com/" />
        <meta property="og:title" content="ArkyDesk - Support Portal" />
        <meta property="og:description" content="Get technical support for Arkynox products through our professional help desk portal. Submit and track support tickets efficiently." />
        <meta property="og:image" content="/assets/images/arkydesk.png" />

        {/* Privacy-friendly meta tags */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Permissions-Policy" content="interest-cohort=()" />

        <link rel="icon" href="/logo/favicon.ico" />
        <link rel="shortcut" href="/logo/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/logo/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/logo/site.webmanifest" />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NoRightClick />
        <ConsentProvider>
          <RealtimeProvider>
            {children}
          </RealtimeProvider>
          <CookieConsent />
        </ConsentProvider>
      </body>
    </html>
  );
}
