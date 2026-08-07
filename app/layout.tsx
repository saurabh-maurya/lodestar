import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { FloatingCta } from '@/components/floating-cta';
import { HashScroll } from '@/components/hash-scroll';
import { Toaster } from '@/components/toast';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://lodestar.guru'),
  title: {
    default: 'Lodestar — India\'s first scientific career guidance program',
    template: '%s · Lodestar',
  },
  description:
    'Psychometric assessment, 250+ researched careers and three one-to-one sessions with a trained expert — ending in a written plan from stream to college. Trusted by 40,000+ parents since 2011.',
  openGraph: {
    type: 'website',
    siteName: 'Lodestar',
    locale: 'en_IN',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <head>
        <link
          rel="preload"
          href="/fonts/InterVariable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <HashScroll />
        <FloatingCta />
        {/* Always mounted: a live region has to be in the tree before the
            message arrives, or the first announcement is missed. */}
        <Toaster />
      </body>
    </html>
  );
}
