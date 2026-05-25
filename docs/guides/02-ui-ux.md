# Guide 02 — UI/UX Design System
> The Journey · Engineering Guides

---

## Design Philosophy

> "This is not a portfolio. It is a system interface."

Every design decision flows from one question:
**Does this serve clarity, or does it serve decoration?**

If the answer is decoration — remove it.

---

## Color System

One background. One surface. One accent. That's it.

```css
/* globals.css — add to :root */

/* Backgrounds */
--color-bg:         #0a0a0a;   /* Page background */
--color-surface:    #111111;   /* Card, modal, elevated surfaces */
--color-surface-2:  #161616;   /* Nested surfaces */

/* Borders */
--color-border:     rgba(255, 255, 255, 0.06);  /* Default border */
--color-border-hover: rgba(255, 255, 255, 0.14); /* Hover state border */

/* Text */
--color-text:       #f5f5f5;   /* Primary text */
--color-muted:      #737373;   /* Secondary, labels, timestamps */
--color-subtle:     #404040;   /* Disabled, placeholder */

/* Accent — ONE color only */
--color-accent:     #10B981;   /* Emerald — active, links, highlights */
--color-accent-dim: rgba(16, 185, 129, 0.12); /* Emerald backgrounds */

/* Status colors (for badges only) */
--color-active:     #10B981;  /* green */
--color-paused:     #3B82F6;  /* blue */
--color-archived:   #525252;  /* gray */
--color-critical:   #EF4444;  /* red */
--color-warning:    #F59E0B;  /* amber */
```

### Tailwind config additions
```typescript
// tailwind.config.ts — add to theme.extend.colors
colors: {
  bg:       '#0a0a0a',
  surface:  '#111111',
  accent:   '#10B981',
  // use Tailwind's built-in neutral, emerald, blue, red scales for everything else
}
```

### Color rules
- **Never** use purple, pink, or cyan as accent colors
- **Never** use blue-to-purple gradients
- **Never** use more than one accent color
- Background gradients: only `from-black to-[#0d0d0d]` — barely perceptible

---

## Typography

Two fonts. Hard limit.

```typescript
// app/layout.tsx
import { JetBrains_Mono, Inter } from 'next/font/google';

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});
```

### Usage rules
```
font-mono  →  data, labels, status, code, timestamps, section headers
font-sans  →  body copy, project descriptions, about page narrative
```

### Type scale
```
text-[10px]  → micro labels, stack tags, timestamps
text-xs      → status badges, secondary labels (12px)
text-sm      → card body, timeline entries (14px)
text-base    → standard body copy (16px)
text-lg      → card titles (18px)
text-xl      → sub-section headers (20px)
text-2xl     → section titles (24px)
text-4xl     → page titles (36px)
text-5xl     → hero name (48px)
```

### Font weight rules
```
font-normal   → body, descriptions
font-medium   → card titles, labels
font-semibold → section headers
font-bold     → page titles, name/identity
```

---

## Spacing System

8px grid. All spacing is multiples of 4 or 8.

```
p-1   = 4px     → micro padding
p-2   = 8px     → tight elements
p-3   = 12px    → badge padding
p-4   = 16px    → standard padding
p-6   = 24px    → card padding
p-8   = 32px    → generous card padding
p-12  = 48px    → section spacing
p-16  = 64px    → large section spacing
p-24  = 96px    → between major page sections

gap-2  = 8px    → between tags/badges
gap-4  = 16px   → between card elements
gap-6  = 24px   → between cards in grid
gap-8  = 32px   → between major sections
```

---

## Layout System

```
max-width:  1200px  (max-w-6xl)
content:    6-column grid on mobile, 12-column on desktop
gutter:     24px horizontal padding (px-6)
navbar:     56px fixed top
body:       pt-20 to clear navbar
```

### Grid patterns
```tsx
/* 3-column cards */
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

/* 2-column split (content + sidebar) */
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div className="lg:col-span-2">  {/* main */}  </div>
  <div>  {/* sidebar */}  </div>
</div>

/* Full width */
<div className="w-full">
```

---

## Component Visual Patterns

### Section header
```tsx
<div className="mb-10">
  <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">
    SECTION_LABEL
  </p>
  <h2 className="text-3xl font-bold text-white">
    Section Title
  </h2>
  <p className="text-sm text-neutral-400 mt-2">
    Optional subtitle — keep it short.
  </p>
</div>
```

### Divider
```tsx
<div className="border-t border-white/6 my-8" />
```

### Inline code / monospace data
```tsx
<code className="text-xs font-mono text-emerald-400 bg-emerald-950/30 px-1.5 py-0.5 rounded">
  value
</code>
```

### Link style
```tsx
<a className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors">
  link text
</a>
```

---

## Timeline Component Design

The timeline is the most important visual element on this site. It needs to read clearly at a glance.

```
Year marker    →  large, monospaced, left-aligned
Entry spine    →  1px vertical line, white/8 opacity
Entry dot      →  4px circle, color-coded by type
Entry content  →  date · title · one-line summary
Project link   →  right side, if projectId exists
```

### Visual hierarchy
```
2026                          ← year header (text-2xl font-mono text-white)
│
├── Mar 2026                  ← date (text-xs font-mono text-muted)
│   OTDT · deployed MAS 9.1  ← title · summary (text-sm)   [→ VIEW]
│
├── Feb 2026
│   WisdomAI · 6-agent health system                        [→ VIEW]
│
└── Jan 2026
    HAKI · IBM DevDay                                        [→ VIEW]

2025
│
├── ...
```

### Entry types → dot colors
```
project    → emerald  (#10B981)
experiment → blue     (#3B82F6)
milestone  → amber    (#F59E0B)
```

---

## Featured Card Design

Each production project gets a full card. Structure is fixed:

```
┌─────────────────────────────────────────────────┐
│  CODENAME          [STATUS BADGE]    [GH] [LIVE] │
│  Full project title                              │
├─────────────────────────────────────────────────┤
│  PROBLEM                                         │
│  What was missing or broken.                     │
│                                                  │
│  SOLUTION                                        │
│  What you actually built.                        │
│                                                  │
│  IMPACT                 ← only if real/measured  │
│  What changed.                                   │
├─────────────────────────────────────────────────┤
│  [stack] [tags] [go] [here]                      │
└─────────────────────────────────────────────────┘
```

---

## Mobile Design

The site must work on mobile. Not "mobile-friendly" — actually usable.

### Responsive rules
```
Mobile (<640px):
  - Single column everything
  - Navbar collapses to hamburger OR scrolls horizontally
  - Timeline spine stays, entries stack full-width
  - Featured cards stack vertically
  - Font sizes reduce one step (text-4xl → text-3xl for page titles)

Tablet (640–1024px):
  - 2-column card grids
  - Timeline sidebar optional

Desktop (>1024px):
  - Full layout
  - 3-column grids where specified
```

### Tailwind responsive prefixes used
```
sm:   640px+
md:   768px+
lg:   1024px+
```

### Touch targets
- All interactive elements: minimum 44×44px touch target
- Navbar links: `py-2` minimum
- Buttons: `px-4 py-2` minimum

---

## Accessibility Rules

This is a public site. Minimum requirements:

1. **Color contrast:** All text on dark backgrounds must meet WCAG AA (4.5:1 for normal, 3:1 for large)
   - `text-neutral-400` on `bg-black` = ✅ passes
   - `text-neutral-600` on `bg-black` = ❌ fails — use `text-neutral-400` minimum

2. **Focus states:** All interactive elements must have visible focus ring
   ```tsx
   className="focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-black"
   ```

3. **Semantic HTML:**
   - `<main>` wraps page content
   - `<nav>` for navigation
   - `<h1>` once per page, `<h2>` for sections
   - `<a>` for links, `<button>` for actions

4. **Alt text:** Any image (screenshot) gets descriptive alt text

5. **Keyboard navigation:** Tab order must make logical sense

---

## What the Site Should Feel Like

**5 seconds after landing:**
- This person is technically serious
- This is built by one person who cares
- There is real work here

**What it should NOT feel like:**
- A template someone customized
- A marketing landing page
- A resume with CSS

**The vibe:** Mission control at 2am. Purposeful. Nothing decorative. Everything has a reason.

---

## Banned Aesthetic Choices

These are hard bans. If you find yourself reaching for any of these, stop.

```
❌ Blue-to-purple gradients
❌ Glassmorphism overdose (one blur layer max per card)
❌ Particle backgrounds
❌ Floating blob animations
❌ Neon glow text
❌ Animated gradient text
❌ Three.js or WebGL backgrounds
❌ Parallax scrolling
❌ Full-screen loading screens
❌ Scroll hijacking
❌ Auto-playing anything
❌ Pop-ups of any kind
❌ Cursor customization
❌ Multiple accent colors
```
