import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Orgho Development Group',
    default: 'Orgho Development Group — Luxury Real Estate California',
  },
  description:
    'Boutique luxury real estate development firm crafting landmark residences across California\'s most coveted addresses.',
  keywords: ['luxury real estate', 'California development', 'Malibu', 'Bel Air', 'Santa Barbara', 'investment properties'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Orgho Development Group',
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
