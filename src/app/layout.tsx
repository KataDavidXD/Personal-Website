import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import './globals.css';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Yang Li - Agent Reliability & Infrastructure Architect',
    template: '%s | Yang Li',
  },
  description: 'Designing system-level infrastructure for reliable, auditable, and testable multi-agent systems.',
  keywords: ['research', 'engineering', 'agent infrastructure', 'AI', 'reliability'],
  authors: [{ name: 'Yang Li' }],
  creator: 'Yang Li',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Yang Li',
    title: 'Yang Li - Agent Reliability & Infrastructure Architect',
    description: 'Designing system-level infrastructure for reliable, auditable, and testable multi-agent systems.',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Yang Li',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yang Li - Agent Reliability & Infrastructure Architect',
    description: 'Designing system-level infrastructure for reliable, auditable, and testable multi-agent systems.',
    creator: '@yourhandle',
    images: ['/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        {process.env.UMAMI_WEBSITE_ID && process.env.UMAMI_SCRIPT_URL && (
          <Script
            src={process.env.UMAMI_SCRIPT_URL}
            data-website-id={process.env.UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
