import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TerminalButton } from '@/components/ui/terminal';
import { profile } from '@/lib/content/profile';

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

export const metadata: Metadata = {
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          <main className="pt-14">
            {children}
          </main>
          <Footer />
          <TerminalButton />
        </ThemeProvider>
      </body>
    </html>
  );
}

