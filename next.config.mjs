// import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // This ensures that webpack doesn't try to bundle Node.js modules for the client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        dns: false,
        child_process: false,
        tls: false,
      };
    }
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['mongodb'],
  },
  /**
   * Security headers (ISO 27001:2022 A.8.20/A.8.21/A.8.25 — information
   * leakage, secure authentication and secure logon protocols).
   *
   * `unsafe-eval` is required by the Workerd runtime and is scoped to
   * script-src only; `unsafe-inline` is limited to styles so Tailwind and the
   * theme bootstrap keep working.
   */
  async headers() {
    const csp = [
      "default-src 'self'",
      // `unsafe-eval` and the workerd blob are required by Cloudflare Workers.
      // Google Tag Manager is the only third-party script, and it is injected
      // by the consent gate in `layout.tsx`, never on first paint.
      `script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: https://www.googletagmanager.com`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      // Lottie and the marketing videos stream their own assets.
      "media-src 'self' blob:",
      // Ticket attachments upload to the ArkyDesk attachment worker; realtime is
      // same-origin SSE.
      `connect-src 'self' https://aviandesk-attachment.avianintek.workers.dev https://*.mongodb.net wss://*.ar.cloudflare.com`,
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "frame-src 'self' https://challenges.cloudflare.com",
      "upgrade-insecure-requests",
    ].join('; ');

    const headers = [
      { key: 'Content-Security-Policy', value: csp },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
      { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
      {
        key: 'Permissions-Policy',
        // Geolocation, camera and microphone are never used by ArkyDesk.
        value: 'camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(), usb=()',
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
    ];

    return [{ source: '/:path*', headers }];
  },
};

// if (process.env.NODE_ENV === 'development') {
//   await setupDevPlatform();
// }

export default nextConfig;