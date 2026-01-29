import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'Waikiki Events | Yoga • Meditation • Movement',
  description:
    'Waikiki Events: Yoga, Meditation, and Movement at Le\'ahi Beach Park. Ancient wisdom, modern community. Join us in Waikiki, Honolulu.',
  keywords: [
    'Waikiki Events',
    'Yoga',
    'Meditation',
    'Movement',
    'Wellness',
    'Honolulu',
    'Community',
    'Hawaii',
  ],
  authors: [{ name: 'Waikiki Events' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Waikiki Events',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: 'Waikiki Events | Yoga • Meditation • Movement',
    description:
      'Waikiki Events: Yoga, Meditation, and Movement at Le\'ahi Beach Park. Ancient wisdom, modern community. Join us in Waikiki, Honolulu.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Waikiki Events | Yoga • Meditation • Movement',
    description:
      'Waikiki Events: Yoga, Meditation, and Movement at Le\'ahi Beach Park. Ancient wisdom, modern community. Join us in Waikiki, Honolulu.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Jost font - closest free alternative to Futura */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        {/* iOS PWA settings */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* Prevent text size adjustment on orientation change */}
        <meta name="x-ua-compatible" content="IE=edge" />
      </head>
      <body className="antialiased text-white selection:bg-red-500 selection:text-black min-h-screen flex flex-col text-center">
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
