import type { Metadata } from 'next';
import { Inter, Noto_Serif } from 'next/font/google';
import { Header, Footer, UrgentMessage, SkipLink } from '@/components/layout';
import { siteConfig } from '@/config/site';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: {
    default: siteConfig.name,
    template: '%s | Manna Share A Meal',
  },
  description: `${siteConfig.name} — ${siteConfig.tagline}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSerif.variable}`} suppressHydrationWarning>
      <body
        className="flex min-h-screen w-full max-w-full flex-col overflow-x-clip"
        suppressHydrationWarning
      >
        <SkipLink />
        <UrgentMessage />
        <Header />
        <main id="main" tabIndex={-1} className="w-full max-w-full flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
