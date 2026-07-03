import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TerminalButton } from '@/components/ui/terminal';
import { getProfile, getStatus } from '@/lib/content/loaders';
import { Analytics } from '@vercel/analytics/next';
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
      default: 'KWAIX Hub',
      template: '%s | KWAIX Hub',
    },
    description: `${profile.name} — ${profile.role} based in ${profile.location}. Cybersecurity, AI-powered security, local AI, automation, and practical systems. ${profile.tagline}`,
    keywords: [
      'Wisdom Kinoti', 'KWAIX', 'KWAIX Hub', 'cybersecurity', 'AI security',
      'IBM', 'QRadar', 'SIEM', 'Kenya', 'Nairobi', 'portfolio',
      'Next.js', 'junior cybersecurity analyst', 'AI agents', 'watsonx',
      'local AI', 'automation', 'systems builder', 'InfoSec',
    ],
    authors: [{ name: profile.name }],
    creator: profile.name,
    alternates: {
      canonical: 'https://kwaix.dev',
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      title: `${profile.name} | KWAIX Hub`,
      description: `${profile.role} · Cybersecurity, AI & Systems Portfolio`,
      siteName: 'KWAIX Hub',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${profile.name} | KWAIX Hub`,
      description: `${profile.role} · Cybersecurity, AI & Systems Portfolio`,
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
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const profile = getProfile();
  const status = getStatus();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://kwaix.dev/#website',
        url: 'https://kwaix.dev',
        name: 'KWAIX Hub',
        description: `${profile.role} · Cybersecurity, AI & Systems Portfolio`,
        publisher: { '@id': 'https://kwaix.dev/#person' },
      },
      {
        '@type': 'Person',
        '@id': 'https://kwaix.dev/#person',
        name: profile.name,
        url: 'https://kwaix.dev',
        jobTitle: profile.role,
        worksFor: { '@type': 'Organization', name: 'Independent' },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Nairobi',
          addressCountry: 'KE',
        },
        sameAs: [
          `https://github.com/${profile.handles.github_primary}`,
          `https://linkedin.com/in/${profile.handles.linkedin}`,
        ],
        knowsAbout: [
          'Cybersecurity', 'AI Security', 'IBM QRadar', 'SIEM',
          'Local AI', 'Automation', 'Next.js', 'TypeScript',
        ],
      },
    ],
  };

  return (
    <html lang="en" className={`scroll-smooth ${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="antialiased font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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

