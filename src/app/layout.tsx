import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import { GlobalLoader } from '@/components/ui/GlobalLoader';
import { ScrollManager } from '@/components/ui/ScrollManager';
import './globals.css';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | SITED Development Group',
    default: 'SITED Development Group — Luxury Real Estate California',
  },
  description:
    'Boutique luxury real estate development firm crafting landmark residences across California\'s most coveted addresses.',
  keywords: ['luxury real estate', 'California development', 'Malibu', 'Bel Air', 'Santa Barbara', 'investment properties'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'SITED Development Group',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="antialiased">
        <GlobalLoader />
        <ScrollManager />
        {children}
      </body>
    </html>
  );
}
