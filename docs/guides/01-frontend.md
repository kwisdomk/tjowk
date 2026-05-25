# Guide 01 — Frontend
> The Journey · Engineering Guides

---

## Stack (Locked)

```
Next.js 16 (App Router)
TypeScript
Tailwind CSS v3
Framer Motion v11
Lucide React
Recharts
next-themes
```

**Rules:**
- App Router only. No Pages Router.
- Functional components only. No class components.
- No UI libraries (MUI, Chakra, shadcn beyond what's already installed).
- No CSS files except `globals.css` for tokens.
- Framer Motion for animation only. No CSS keyframe animations unless trivial.

---

## Folder Structure

```
components/
├── ui/                    # Primitives — reusable atoms
│   ├── button.tsx         # Base button
│   ├── badge.tsx          # Status badge (ACTIVE / ARCHIVED etc)
│   ├── theme-toggle.tsx   # Dark mode toggle
│   └── theme-provider.tsx # next-themes wrapper
│
├── layout/                # Page-level chrome
│   ├── Navbar.tsx         # Top nav — name + links + status dot
│   └── Footer.tsx         # Minimal — copyright + links
│
├── home/                  # Landing page blocks
│   ├── IdentityBlock.tsx  # Name, handle, role, tagline
│   └── CurrentOps.tsx     # Live current operation from status.ts
│
├── projects/              # Projects page blocks
│   ├── FeaturedCard.tsx   # Full project dossier
│   ├── TimelineSpine.tsx  # Full timeline rendering
│   └── TimelineEntry.tsx  # Single timeline row
│
├── certs/
│   └── CredentialCard.tsx # Single cert card
│
└── contact/
    └── ContactForm.tsx    # Resend-powered form
```

---

## Component Hierarchy

```
Page (app/*/page.tsx)
  └── Layout (Navbar + Footer)
       └── Sections (components/home/, components/projects/, etc.)
            └── UI Primitives (components/ui/)
```

**Rule:** Pages are thin. They import sections and pass data. No logic in pages.

```tsx
// ✅ Correct — page is thin
export default function ProjectsPage() {
  return (
    <main>
      <FeaturedSection projects={projects.filter(p => p.phase === 'production')} />
      <TimelineSpine entries={timeline} />
    </main>
  );
}

// ❌ Wrong — logic in page
export default function ProjectsPage() {
  const [filter, setFilter] = useState('all');
  const filtered = projects.filter(p => {
    // 40 lines of filtering logic
  });
  // ...
}
```

---

## Component Patterns

### Base Surface — GlassCard
Every card on the site uses this base pattern:

```tsx
// components/ui/glass-card.tsx
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  controls?: React.ReactNode;
  onClick?: () => void;
}

export function GlassCard({ children, className, title, controls, onClick }: GlassCardProps) {
  return (
    <motion.div
      layout
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'border border-white/5 bg-black/50 backdrop-blur-xl',
        'transition-all duration-300 hover:border-white/15',
        className
      )}
      onClick={onClick}
    >
      <div className="relative p-6 h-full flex flex-col">
        {title && (
          <div className="mb-4 border-b border-white/8 pb-3 flex justify-between items-center">
            <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
              {title}
            </p>
            {controls && <div className="flex items-center gap-2">{controls}</div>}
          </div>
        )}
        {children}
      </div>
    </motion.div>
  );
}
```

### Status Badge
```tsx
// components/ui/badge.tsx
type BadgeVariant = 'active' | 'paused' | 'archived' | 'complete' | 'in-progress';

const variantStyles: Record<BadgeVariant, string> = {
  active:      'border-emerald-500/50 text-emerald-400 bg-emerald-950/30',
  paused:      'border-blue-500/50 text-blue-400 bg-blue-950/30',
  archived:    'border-neutral-500/50 text-neutral-400 bg-neutral-950/30',
  complete:    'border-emerald-500/50 text-emerald-400 bg-emerald-950/30',
  'in-progress': 'border-yellow-500/50 text-yellow-400 bg-yellow-950/30',
};

export function StatusBadge({ variant, label }: { variant: BadgeVariant; label: string }) {
  return (
    <span className={cn(
      'text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase tracking-wider',
      variantStyles[variant]
    )}>
      {label}
    </span>
  );
}
```

### Stack Tag
```tsx
export function StackTag({ label }: { label: string }) {
  return (
    <span className="text-[10px] font-mono px-2 py-1 bg-white/5 border border-white/8 rounded text-neutral-400">
      {label}
    </span>
  );
}
```

---

## Navbar

```tsx
// components/layout/Navbar.tsx
'use client';

import Link from 'next/link';
import { currentStatus } from '@/lib/content/status';
import { ModeToggle } from '@/components/ui/theme-toggle';

const navLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/certs',    label: 'Certs' },
  { href: '/about',    label: 'About' },
  { href: '/contact',  label: 'Contact' },
  { href: '/journal',  label: 'Journal' },
];

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Left — identity */}
        <Link href="/" className="flex items-center gap-3">
          <span className="text-sm font-mono text-white">φιλόσοφος</span>
          {/* Live status dot */}
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            {currentStatus.uptime}
          </span>
        </Link>

        {/* Right — nav links */}
        <div className="flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-mono text-neutral-400 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <ModeToggle />
        </div>

      </div>
    </nav>
  );
}
```

---

## Page Template

Every page follows this structure:

```tsx
// app/[page]/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title — The Journey',
  description: 'Page description for SEO.',
};

export default function PageName() {
  return (
    <main className="min-h-screen pt-20 pb-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Page header */}
        <div className="mb-12">
          <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">
            SECTION_LABEL
          </p>
          <h1 className="text-4xl font-bold text-white">Page Title</h1>
        </div>

        {/* Page content */}

      </div>
    </main>
  );
}
```

---

## Animation Rules

**Use Framer Motion for:**
- Entry animations (fade in + slide up on scroll)
- Layout transitions (expandable cards)
- The live status ping dot

**Do NOT use for:**
- Decorative effects (floating blobs, particle systems)
- Hover states that can be CSS
- Anything that runs continuously without user interaction (except the ping dot)

### Standard entry animation
```tsx
// Apply to any section that enters on scroll
<motion.div
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: 'easeOut' }}
  viewport={{ once: true }}
>
  {/* content */}
</motion.div>
```

### Staggered children
```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 }
};

<motion.div variants={container} initial="hidden" animate="show">
  {items.map(i => (
    <motion.div key={i.id} variants={item}>{/* content */}</motion.div>
  ))}
</motion.div>
```

---

## TypeScript Rules

```typescript
// Always type component props
interface ComponentProps {
  data: SomeType;
  className?: string;     // optional classname override
  children?: React.ReactNode;
}

// Always type data coming from lib/content/
import type { Project } from '@/lib/content/projects';

// Use cn() for conditional classnames (already in lib/utils.ts)
import { cn } from '@/lib/utils';
className={cn('base-classes', condition && 'conditional-class', className)}
```

---

## What Already Exists (From Biblitheca)

These components work and can be reused or refactored:

| Component | Status | Notes |
|---|---|---|
| `GlassCard` | ✅ Working | Refactor into `components/ui/glass-card.tsx` |
| `TerminalConsole` | ✅ Working | Keep as easter egg. Update commands with real data. |
| `Clock` (live UTC+3) | ✅ Working | Keep in Navbar or landing. |
| `UtilBar` (CPU/RAM) | ✅ Working | Keep in landing status block. |
| `MachineStatus` | ✅ Working | Refactor to use `profile.ts` data. |
| `ModeToggle` | ✅ Working | Already wired. Keep. |
| `HeroSection` | ⚠️ Stale | Has fake data and wrong role. Rebuild as `IdentityBlock`. |
| `ProjectShowroom` | ❌ Wrong design | Disconnected from `page.tsx`. Replace with `FeaturedCard`. |
| `CertificationWall` | ⚠️ Stale | Has wrong cert titles. Refactor to use `certs.ts`. |
| `ContactSection` | ⚠️ Stale | Has placeholder email + wrong GitHub. Rebuild with Resend. |
| `ExperienceTimeline` | ❌ Wrong design | Different aesthetic. Replace with `TimelineSpine`. |
| `PhilosophySection` | ❌ Remove | Blue/purple gradient doesn't fit the system. Content moves to `/about`. |

---

## Forbidden Patterns

```tsx
// ❌ Typewriter text effect
const [text, setText] = useState('');
useEffect(() => { /* typing loop */ }, []);

// ❌ Skill progress bars
<div style={{ width: `${skillLevel}%` }}>Security</div>

// ❌ Floating blob animations
<div className="animate-blob" />  // no

// ❌ Stock or AI images in JSX
<img src="/ai-generated-hacker.jpg" />

// ❌ Fake metrics in data files
impact: "Improved performance by 60%",  // unless actually measured

// ❌ Hardcoded content in components
// If it belongs in a data file, put it in a data file
const myName = "Wisdom Kinoti";  // this lives in profile.ts
```
