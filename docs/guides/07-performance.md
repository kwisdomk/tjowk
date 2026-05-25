# Guide 07 — Performance
> The Journey · Engineering Guides

---

## Targets

| Metric | Target | Why |
|---|---|---|
| Lighthouse Performance | 90+ | Vercel will show this on every deploy |
| Lighthouse SEO | 90+ | Discoverability |
| Lighthouse Accessibility | 90+ | Public site standard |
| First Contentful Paint | < 1.5s | Fast enough for anyone |
| Bundle size (gzipped) | < 100KB JS | Reasonable for this stack |

This is a static-first site with no database. These targets are achievable without special effort if you avoid common mistakes.

---

## Image Rules

**Rule: No images unless they are real visuals of actual work.**

When you do use images:

```tsx
// Always use Next.js Image component — never <img>
import Image from 'next/image';

<Image
  src="/visuals/otdt-dashboard.png"
  alt="OTDT dashboard showing geothermal plant monitoring"
  width={1200}
  height={675}
  quality={85}
  loading="lazy"    // for below-the-fold images
  priority          // for above-the-fold (landing page hero)
/>
```

### Image file rules
- Format: WebP preferred, PNG fallback
- Max file size: 200KB per image
- Dimensions: exactly what's displayed (don't load 2000px wide image for a 600px card)
- Storage: `/public/visuals/[project-id]/`

---

## Font Loading

```typescript
// app/layout.tsx — fonts already configured
// next/font handles optimization automatically:
// - Self-hosted (no external request)
// - Only loads weights you specify
// - No layout shift (size-adjust applied)
```

Don't load font weights you don't use:
```typescript
// ❌ Loading all weights
const inter = Inter({ subsets: ['latin'] });

// ✅ Only what you need
const inter = Inter({
  subsets:  ['latin'],
  weight:   ['400', '500', '600', '700'],
  variable: '--font-sans',
});
```

---

## Bundle Size

### What's already installed (from Biblitheca)
- `framer-motion` — large (~100KB). Use sparingly.
- `recharts` — large (~100KB). Only on pages that use it.
- `lucide-react` — tree-shaken. Only import icons you use.

```typescript
// ✅ Named import — tree-shaken
import { Github, ExternalLink } from 'lucide-react';

// ❌ Default import — loads all icons
import * as Icons from 'lucide-react';
```

### Framer Motion — use minimally
```typescript
// ✅ Only import what you use
import { motion, AnimatePresence } from 'framer-motion';

// Keep animations: entry fades, layout transitions
// Remove: continuous animations, blob effects, parallax
```

### Recharts — lazy load
Only load on the `/about` or `/projects` page, not globally:
```typescript
// Dynamic import — only loads when that page is visited
const RadarChart = dynamic(() => import('recharts').then(m => m.RadarChart), {
  ssr: false,
  loading: () => <div className="h-48 animate-pulse bg-white/5 rounded" />,
});
```

---

## Static Generation

Next.js App Router statically generates pages by default when there's no dynamic data.

All pages in this site should be statically generated — no `fetch()` calls, no server-side data fetching. Everything comes from `/lib/content/` TypeScript files.

```typescript
// ✅ This is a static page — fastest possible
export default function ProjectsPage() {
  return <TimelineSpine entries={timeline} />;
  // timeline imported directly from lib/content/timeline.ts
}

// ❌ This makes it dynamic (slower, no need)
export default async function ProjectsPage() {
  const data = await fetch('/api/projects');
  // ...
}
```

---

## Vercel Analytics (One Line)

Add when ready. Free. Zero config.

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />  {/* add this */}
      </body>
    </html>
  );
}
```

```bash
npm install @vercel/analytics
```

---

## Performance Checklist

```
Images
[ ] Using next/image everywhere
[ ] No images over 200KB
[ ] Alt text on all images
[ ] Priority flag on above-fold images only

Fonts
[ ] Only needed font weights loaded
[ ] next/font used (not Google Fonts CDN link)

Bundle
[ ] lucide-react using named imports
[ ] recharts dynamically imported
[ ] framer-motion used minimally

Pages
[ ] All pages are statically generated
[ ] No unnecessary useEffect on static data
[ ] No fetching data that's already in lib/content/

Build verification
[ ] npm run build completes without errors
[ ] No TypeScript errors (npx tsc --noEmit)
[ ] No ESLint errors (npm run lint)
[ ] Lighthouse run before launch
```
