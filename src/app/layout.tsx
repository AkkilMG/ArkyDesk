import localFont from "next/font/local";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Suspense } from "react";

import { RealtimeProvider } from "@/lib/RealtimeContext";
import { ConsentProvider } from "@/lib/ConsentContext";
import { ThemeProvider, themeInitScript } from "@/lib/ThemeProvider";
import CookieConsent from "@/components/ui/CookieConsent";
import { ToastProvider } from "@/components/ui/Toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://desk.arkynox.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ArkyDesk — Arkynox Support Portal",
    template: "%s | ArkyDesk",
  },
  description:
    "Professional support ticket system and help desk portal for Arkynox products and services.",
  keywords: [
    "Arkynox",
    "ArkyDesk",
    "support desk",
    "ticketing system",
    "technical support",
    "help portal",
    "issue tracking",
    "support tickets",
    "knowledge base",
  ],
  authors: [{ name: "Arkynox Team" }],
  applicationName: "ArkyDesk",
  manifest: "/logo/site.webmanifest",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "ArkyDesk",
    title: "ArkyDesk — Arkynox Support Portal",
    description:
      "Get technical support for Arkynox products through our professional help desk portal.",
    images: [{ url: "/logo/og.jpg", width: 1200, height: 630, alt: "ArkyDesk" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ArkyDesk — Arkynox Support Portal",
    description: "Professional support ticket system for Arkynox products.",
    images: ["/logo/og.jpg"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/logo/favicon.ico" },
      { url: "/logo/favicon-16x16.png", sizes: "16x16" },
      { url: "/logo/favicon-32x32.png", sizes: "32x32" },
    ],
    apple: "/logo/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      // The theme class is written by the inline script below before paint.
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          // Applies the persisted theme before first paint to avoid a flash.
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body className="bg-background text-foreground font-sans antialiased">
        <ThemeProvider>
          <ToastProvider>
            <ConsentProvider>
              <RealtimeProvider>
                <Suspense fallback={null}>{children}</Suspense>
              </RealtimeProvider>
              <CookieConsent />
            </ConsentProvider>
          </ToastProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

/**
 * Google Analytics is loaded only in production and only after the visitor has
 * granted analytics consent. The consent default is `denied` so no tag fires
 * before that point.
 */
function Analytics() {
  const GA_ID = "G-PXZHEP2GE8";

  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
(function(){
  try {
    if ('${process.env.NODE_ENV}' !== 'production') return;
    var raw = localStorage.getItem('arkynox_cookie_consent');
    if (!raw || !JSON.parse(raw).analytics) return;
    if (window.gtag) return;
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', '${GA_ID}', { anonymize_ip: true });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_ID}';
    document.head.appendChild(s);
  } catch (e) {}
})();
`,
      }}
    />
  );
}
