# Guide 06 — SEO & Discoverability
> The Journey · Engineering Guides

---

## Why This Matters

A portfolio no one can find is a portfolio that doesn't exist. Basic SEO means when someone Googles "Wisdom Kinoti" or "φιλόσοφος developer Kenya", your site shows up. It also means when you share a link on LinkedIn, it previews correctly instead of showing a blank card.

---

## Root Metadata (layout.tsx)

```typescript
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://port-wk.vercel.app'),
  title: {
    default:  'Wisdom Kinoti — The Journey',
    template: '%s — The Journey',
  },
  description:
    'I blueprint things before they escape. Most of them turn into something real. ' +
    'Junior Cybersecurity Analyst, CS Student, IBM i3 Intern. Nairobi, Kenya.',
  keywords: [
    'Wisdom Kinoti',
    'cybersecurity',
    'IBM',
    'AI systems',
    'Nairobi',
    'Kenya',
    'OpenShift',
    'watsonx',
    'portfolio',
  ],
  authors: [{ name: 'Wisdom Kinoti', url: 'https://github.com/kwisdomk' }],
  creator: 'Wisdom Kinoti',

  // Open Graph — controls how links preview on LinkedIn, Twitter, WhatsApp
  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         'https://port-wk.vercel.app',
    siteName:    'The Journey',
    title:       'Wisdom Kinoti — The Journey',
    description: 'I blueprint things before they escape. Most of them turn into something real.',
    images: [
      {
        url:    '/og-image.png',   // 1200x630px — create this
        width:  1200,
        height: 630,
        alt:    'The Journey — Wisdom Kinoti',
      },
    ],
  },

  // Twitter card
  twitter: {
    card:        'summary_large_image',
    title:       'Wisdom Kinoti — The Journey',
    description: 'I blueprint things before they escape. Most of them turn into something real.',
    images:      ['/og-image.png'],
  },

  // Robots
  robots: {
    index:  true,
    follow: true,
  },
};
```

---

## Page-Level Metadata

Each page overrides the root metadata:

```typescript
// app/projects/page.tsx
export const metadata: Metadata = {
  title:       'Projects',    // renders as "Projects — The Journey"
  description: 'A chronological record of systems built, experiments run, and milestones reached.',
};

// app/about/page.tsx
export const metadata: Metadata = {
  title:       'About',
  description: 'Context on who Wisdom Kinoti is, where this started, and where it is going.',
};

// app/certs/page.tsx
export const metadata: Metadata = {
  title:       'Certifications',
  description: 'IBM, ISC2, Red Hat, and CompTIA credentials — complete and in progress.',
};
```

---

## OG Image

Create a static `og-image.png` (1200×630px) in `/public/`.

Content: dark background, your name, tagline, maybe the emerald status dot. Keep it text-only — no AI images.

Simple approach — generate it with HTML/CSS, capture at 1200×630, save as PNG.

What it should say:
```
WISDOM KINOTI
φιλόσοφος

"I blueprint things before they escape.
Most of them turn into something real."

● ACTIVE · Nairobi, Kenya
```

---

## robots.txt

```
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://port-wk.vercel.app/sitemap.xml
```

---

## Sitemap

Next.js 15 can generate this automatically:

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://port-wk.vercel.app';

  return [
    { url: baseUrl,               lastModified: new Date(), changeFrequency: 'monthly',  priority: 1 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: 'weekly',   priority: 0.9 },
    { url: `${baseUrl}/about`,    lastModified: new Date(), changeFrequency: 'monthly',  priority: 0.8 },
    { url: `${baseUrl}/certs`,    lastModified: new Date(), changeFrequency: 'monthly',  priority: 0.7 },
    { url: `${baseUrl}/contact`,  lastModified: new Date(), changeFrequency: 'yearly',   priority: 0.5 },
  ];
}
```

---

## Custom Domain (When Ready)

Recommended options in order:
1. `wisdomkinoti.com` — clearest professional identity
2. `6ofhertz.dev` — handle-based, technical signal
3. `port-wk.vercel.app` — free, works fine for now

### Setup on Vercel:
1. Buy domain (Namecheap or Cloudflare Registrar)
2. Vercel Dashboard → Project → Settings → Domains → Add domain
3. Point nameservers to Vercel (or add CNAME/A record)
4. Vercel handles SSL automatically
5. Update `NEXT_PUBLIC_SITE_URL` in env vars
6. Update `metadataBase` in layout.tsx

---

## LinkedIn Link Preview Fix

When you share your portfolio link on LinkedIn, it reads the OG tags. For the preview to look right:
1. OG image must be `1200×630px`
2. `og:title`, `og:description`, `og:image` must be set (done above)
3. Use LinkedIn's Post Inspector to force-refresh: `https://www.linkedin.com/post-inspector/`

---

## SEO Checklist

```
Metadata
[ ] Root metadata in layout.tsx (title, description, OG, Twitter)
[ ] Page-level metadata on each page
[ ] metadataBase set to correct URL

Assets
[ ] og-image.png exists in /public/ at 1200x630px
[ ] robots.txt in /public/
[ ] sitemap.ts created

Performance (affects SEO)
[ ] Lighthouse SEO score 90+
[ ] No broken links
[ ] All pages return 200 (not 404)

Domain
[ ] Site accessible at live URL
[ ] HTTPS working
[ ] Custom domain (future)
```
