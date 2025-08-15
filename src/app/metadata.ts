import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'ArkyDesk',
    template: '%s | ArkyDesk',
  },
  description: 'Technical support and help desk for arkynox products.',
  keywords: ['arkynox', 'product support', 'help desk', 'technical support', 'ticketing system', 'ticket'],
  authors: [{ name: 'arkynox', url: 'https://arkynox.com' }],
  creator: 'ArkyDesk',
  publisher: 'arkynox',
  metadataBase: new URL('https://desk.arkynox.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ArkyDesk',
    description: 'Technical support and help desk for arkynox products.',
    url: 'https://desk.arkynox.com',
    siteName: 'arkynox Support',
    images: [
      {
        url: '/assets/images/arkydesk.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArkyDesk',
    description: 'Technical support and help desk for arkynox products',
    images: ['/assets/images/arkydesk.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo/favicon.ico',
    shortcut: '/logo/favicon-16x16.png',
    apple: '/logo/apple-touch-icon.png',
  },
}