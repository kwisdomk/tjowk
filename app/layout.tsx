import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TerminalButton } from '@/components/ui/terminal';
import { getProfile, getStatus } from '@/lib/content/loaders';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const profile = getProfile();
  return {
    metadataBase: new URL('https://kwaix.dev'),
    title: {
      default: `${profile.name} — The Journey`,
      template: `%s · ${profile.name}`,
    },
    description: `${profile.role} · ${profile.location}. ${profile.tagline}`,
    keywords: ['cybersecurity', 'AI', 'IBM', 'Kenya', 'portfolio', 'Next.js'],
    authors: [{ name: profile.name }],
    creator: profile.name,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      title: `${profile.name} — The Journey`,
      description: profile.tagline,
      siteName: 'The Journey',
    },
    twitter: {
      card: 'summary',
      title: `${profile.name} — The Journey`,
      description: profile.tagline,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const profile = getProfile();
  const status = getStatus();
  return (
    <html lang="en" className={`scroll-smooth ${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar uptime={status.uptime} />
          <main className="pt-14">
            {children}
          </main>
          <Footer profile={profile} />
          <TerminalButton />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

