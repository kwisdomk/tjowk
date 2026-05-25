# The Journey — Solo Dev Documentation
> *"I blueprint things before they escape. Most of them turn into something real."*
> — Wisdom Kinoti · φιλόσοφος

**Version:** 1.0  
**Author:** Wisdom Kinoti  
**Status:** Active Build  
**Last Updated:** April 2026

---

## 0. What This Document Is

This is the single source of truth for building, maintaining, and extending **The Journey** — a personal portfolio and living system that documents Wisdom Kinoti's technical evolution.

It is written for:
- You (the solo dev) working alone
- Any AI assistant you pair-program with
- Future-you, reading this in 3 years wondering why you made a decision

If you're unsure about anything, check this document first. If it's not here, add it after you figure it out.

---

## 1. Project Identity

| Field | Value |
|---|---|
| **Project Name** | The Journey |
| **Tagline** | "I blueprint things before they escape. Most of them turn into something real." |
| **Owner** | Wisdom Kinoti · φιλόσοφος |
| **Purpose** | Living journal + project showcase. Documents technical growth. For self first, peers second, world third. |
| **Repo** | `kwisdomk/port-wk` (primary) |
| **Live URL** | `port-wk.vercel.app` (Vercel free subdomain) |
| **Design Philosophy** | Professional, custom, built by me for me. Not a template. Not a landing page. A space. |

---

## 2. Tech Stack

### Frontend
| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15** (App Router) | Already set up. Fast. Vercel-native. |
| Language | **TypeScript** | Type safety catches errors before runtime |
| Styling | **Tailwind CSS v3** | Utility-first. No separate CSS files to manage. |
| Animations | **Framer Motion v11** | Timeline and entry animations. Already installed. |
| Icons | **Lucide React** | Consistent icon set. Lightweight. |
| Charts | **Recharts** | Skills radar. Already installed. |
| Theme | **next-themes** | Dark mode toggle. Already wired. |

### Backend
| Layer | Choice | Why |
|---|---|---|
| Hosting | **Vercel** (free tier) | Zero config deploy from GitHub. Auto-deploys on push. |
| API Routes | **Next.js API Routes** | Serverless. No separate backend needed. |
| Contact Form | **Resend** (free tier: 3,000 emails/month) | Developer-first email API. Simple. Reliable. No backend server needed. |
| Journal/Blog | **MDX files** (local, no CMS) | Write in markdown. Version controlled. No database needed. Scaffold now, wire later. |

### Data
| Layer | Choice | Why |
|---|---|---|
| Project data | **Static TypeScript files** (`/lib/data/`) | No database needed. Edit a `.ts` file to add a project. |
| Certifications | **Static TypeScript files** | Same pattern. |
| Journal posts | **`.mdx` files** (`/content/journal/`) | File = post. No CMS. Add when ready. |

### No Database
This site has **no database**. Everything is static files or serverless API calls. This keeps it:
- Free to run
- Fast to load
- Simple to maintain
- Easy to deploy

If this changes in the future (e.g. comments, analytics), revisit this section.

---

## 3. Project Structure

```
port-wk/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout, fonts, metadata, ThemeProvider
│   ├── globals.css               # Global styles, CSS variables, Tailwind base
│   ├── page.tsx                  # / — Landing page
│   │
│   ├── projects/
│   │   └── page.tsx              # /projects — Timeline + Featured cards
│   │
│   ├── certs/
│   │   └── page.tsx              # /certs — Credentials wall
│   │
│   ├── about/
│   │   └── page.tsx              # /about — The person, the arc
│   │
│   ├── contact/
│   │   └── page.tsx              # /contact — Links + optional form
│   │
│   ├── journal/
│   │   ├── page.tsx              # /journal — Post list (scaffold now)
│   │   └── [slug]/
│   │       └── page.tsx          # /journal/[slug] — Single post
│   │
│   └── api/
│       └── contact/
│           └── route.ts          # POST /api/contact — Resend email handler
│
├── components/                   # Reusable UI components
│   ├── ui/                       # Base components (button, badge, toggle)
│   │   ├── button.tsx
│   │   ├── theme-toggle.tsx
│   │   └── theme-provider.tsx
│   │
│   ├── layout/                   # Layout components
│   │   ├── Navbar.tsx            # Top navigation
│   │   └── Footer.tsx            # Footer
│   │
│   ├── home/                     # Landing page components
│   │   ├── IdentityBlock.tsx     # Name, handle, tagline, status
│   │   └── CurrentOps.tsx        # What's being built right now
│   │
│   ├── projects/                 # Projects page components
│   │   ├── TimelineSpine.tsx     # Chronological timeline
│   │   ├── FeaturedCard.tsx      # Full project dossier card
│   │   └── TimelineEntry.tsx     # Compact timeline entry
│   │
│   ├── certs/
│   │   └── CredentialCard.tsx    # Single cert/badge card
│   │
│   └── contact/
│       └── ContactForm.tsx       # Resend-powered form
│
├── lib/                          # Data and utilities
│   ├── data/
│   │   ├── projects.ts           # All project data (source of truth)
│   │   ├── certs.ts              # All certifications data
│   │   └── status.ts             # Current build status (update manually)
│   └── utils.ts                  # cn() and other helpers
│
├── content/
│   └── journal/                  # MDX posts go here (scaffold only)
│       └── .gitkeep
│
├── public/
│   ├── robots.txt
│   └── wallpaper.svg
│
├── .env.local                    # Local secrets (never commit)
├── .env.example                  # Template for env vars (commit this)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 4. Pages — What Each One Does

### `/` — Landing
**Purpose:** First impression. Identity. Current status.

**Contains:**
- Name: Wisdom Kinoti
- Handle: φιλόσοφος · kwisdomk
- Role: Junior Cybersecurity Analyst · CS Student · IBM i3 Intern
- Location: Nairobi, Kenya
- Tagline: *"I blueprint things before they escape. Most of them turn into something real."*
- Current operation status (what's being built right now — pulled from `lib/data/status.ts`)
- Navigation to all sections

**Design intent:** Not a hero section with a typewriter. An *identity transmission*. Dark. Purposeful. The name resolves, the tagline hits, the status shows you're active. That's it.

---

### `/projects` — Operations Log
**Purpose:** The journey of builds. Chronological + featured.

**Layout:**
```
[FEATURED — top section]
OTDT · WisdomAI · HAKI · vulai
Full treatment: problem / solution / result / stack / status / links

[TIMELINE — below featured]
2024 ──── OOP labs · eNSP networking · first scripts
2025 ──── zurvan-tracker · Miniazon · IBM Bootcamp starts
         genesis · Eye-of-Odin · CyberSentinel
Late 2025 ─ IBM technical review (9.0/10)
2026 ──── HAKI · WisdomAI · OTDT · vulai · Wisevoido
Now ───── AEGIS · ai-athena · this site
```

**Each featured project card has:**
- Codename + full title
- Status badge: `ACTIVE` / `COMPLETE` / `ARCHIVED` / `CLASSIFIED`
- Problem statement
- What actually happened (solution)
- Result / impact
- Tech stack tags
- GitHub link (if public) · Live link (if deployed)

**Each timeline entry has:**
- Date
- Project name
- One line description
- Status dot (color coded)

---

### `/certs` — Acquired Capabilities
**Purpose:** Prove it.

**Contains:**
```
COMPLETE
├── IBM QRadar SIEM L2                  88%
├── IBM QRadar SIEM L3 Tech Sales       100%
├── IBM QRadar Architecture & Sizing    90%
├── IBM Agentic AI Hands-On             CognitiveClass.ai · Mar 2026
├── Anthropic Claude 101                100% · Mar 2026
└── ISC2 Candidate                      Active

IN PROGRESS
├── ISC2 CC (Certified in Cybersecurity) → Sep 2026
├── CompTIA Security+                   → 2026
├── CEH                                 → 2026
└── RHSA I (RH124)                      ~46% · 9 days left on lab
```

**Design intent:** Not a badge wall. A capability register. Honest about what's done and what's in progress.

---

### `/about` — The Operator
**Purpose:** The person behind the work.

**Contains:**
- Where it started (Nairobi, infrastructure background — Kenya Power, RK Shah, Close the Gap)
- The shift: from ops to code
- What φιλόσοφος means (actually means, not performatively)
- The three-phase career arc:
  - Phase 1: Technical Depth (CC, Security+, CEH, first professional roles) — *now*
  - Phase 2: Leadership/GRC (OSCP, CySA+, CASP+, senior analyst)
  - Phase 3: Executive (CISSP, CISM, CISO or firm founder by ~30-33)
- Athena (the machine) — part of the lore
- What drives the work

**Design intent:** Not a CV. Not a LinkedIn summary. The actual story.

---

### `/contact` — Signal
**Purpose:** Let people reach you.

**Contains:**
- Email (with copy-to-clipboard)
- GitHub: `github.com/kwisdomk` + `github.com/6ofHertz`
- LinkedIn: `linkedin.com/in/kwisdomk`
- One sentence on what you're open to: *"Collaborations that are technically serious and contextually relevant — East African health tech, security tooling, AI infrastructure, or open-source with a point."*
- Optional: Resend-powered contact form (name + email + message)

---

### `/journal` — Dispatches (Scaffold Only)
**Purpose:** Field notes from the build.

**Current state:** Placeholder page. One line: *"Dispatches from the field. Coming."*

**Future state:** MDX-powered blog. Write a `.mdx` file in `/content/journal/`, it appears automatically. No CMS. No database.

---

## 5. Data Files

All content lives in `/lib/data/`. Edit these files to update the site. No database queries. No CMS login.

### `projects.ts`
```typescript
export type ProjectStatus = 'ACTIVE' | 'COMPLETE' | 'ARCHIVED' | 'CLASSIFIED';

export type Project = {
  id: string;
  codename: string;
  title: string;
  tagline: string;
  status: ProjectStatus;
  date: string;             // "Mar 2026"
  featured: boolean;        // true = appears in Featured section
  problem?: string;
  solution?: string;
  result?: string;
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: 'ai' | 'security' | 'web' | 'infra' | 'tools';
};

export const projects: Project[] = [
  {
    id: 'otdt',
    codename: 'OTDT',
    title: 'OT Digital Twin',
    tagline: 'Real-time industrial digital twin for geothermal plant operations',
    status: 'ACTIVE',
    date: 'Mar 2026',
    featured: true,
    problem: 'No affordable remote monitoring solution for industrial OT environments in East Africa.',
    solution: 'Solo deployment of IBM Maximo Application Suite 9.1 on 6-node OpenShift ROKS cluster (Frankfurt). Monte Carlo failure prediction, LSTM anomaly detection, Unity XR visualisation.',
    result: 'Presented at EAAAIW 2026 (CUEA). Validated by Oil & Gas engineer. 30% PoC → pitch to IBM Research Africa identified.',
    stack: ['IBM MAS 9.1', 'OpenShift 4.19', 'IBM Cloud ROKS', 'watsonx.ai', 'Python', 'Unity XR'],
    category: 'infra',
  },
  // ... more projects
];
```

### `certs.ts`
```typescript
export type CertStatus = 'complete' | 'in-progress' | 'planned';

export type Cert = {
  title: string;
  issuer: string;
  status: CertStatus;
  score?: string;
  date?: string;
  deadline?: string;
  credlyUrl?: string;
};

export const certs: Cert[] = [
  {
    title: 'IBM QRadar SIEM L2',
    issuer: 'IBM',
    status: 'complete',
    score: '88%',
  },
  // ... more certs
];
```

### `status.ts`
```typescript
// Update this manually whenever your current focus changes.
// This powers the "Current Op" indicator on the landing page.

export const currentStatus = {
  operation: 'Building The Journey portfolio',
  secondaryOp: 'RHSA I — RH124 Ch9 I/O Redirection',
  machine: 'Athena (HP Victus 15)',
  uptime: 'ACTIVE',
  lastUpdated: 'Apr 2026',
};
```

---

## 6. Contact Form — How It Works

Using **Resend** — a developer-first email API. Free tier: 3,000 emails/month. No backend server needed.

### Setup
1. Create account at [resend.com](https://resend.com)
2. Get your API key
3. Add to `.env.local`:
```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
CONTACT_EMAIL=your-real-email@gmail.com
```

### API Route (`/app/api/contact/route.ts`)
```typescript
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  // Basic validation
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: 'The Journey <onboarding@resend.dev>', // use resend's domain until yours is verified
      to: process.env.CONTACT_EMAIL!,
      subject: `New message from ${name}`,
      html: `
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
```

### Install Resend
```bash
npm install resend
```

### Why Resend over alternatives
| Option | Verdict |
|---|---|
| **Resend** | ✅ Best for this stack. Dev-first. Free tier generous. Simple API. |
| Formspree | ⚠️ Works but less control. Not React-native. |
| EmailJS | ⚠️ Client-side only — exposes API key in browser. Avoid. |
| Netlify Forms | ❌ Only works on Netlify. You're on Vercel. |
| Custom Node.js SMTP | ❌ Overkill. Maintenance burden. |

---

## 7. Journal/Blog — How It Works (Future)

Using **MDX** — Markdown + JSX. No CMS. No database. A file is a post.

### Setup (when ready)
```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react
npm install gray-matter    # for frontmatter parsing
npm install next-mdx-remote # for rendering MDX
```

### Writing a post
Create a file at `/content/journal/my-post.mdx`:

```mdx
---
title: "How I deployed MAS 9.1 solo on OpenShift"
date: "2026-03-19"
tags: ["openshift", "ibm", "otdt"]
status: "published"
---

# How I deployed MAS 9.1 solo on OpenShift

Content here...
```

That's it. The post appears at `/journal/my-post`.

### Why MDX over a CMS
- Zero cost
- Version controlled (your posts live in git)
- Write in VS Code or any editor
- No login, no dashboard, no vendor lock-in
- Works offline

---

## 8. Deployment

### Vercel (current setup)
- Push to `main` branch → auto-deploys
- Preview deploys on every PR/branch push
- Free tier is sufficient indefinitely for this site

### Environment Variables on Vercel
Go to: Vercel Dashboard → `port-wk` project → Settings → Environment Variables

Add:
```
RESEND_API_KEY        → your Resend API key
CONTACT_EMAIL         → your real email address
```

### Custom Domain (future)
When ready:
1. Buy domain (Namecheap or Cloudflare Registrar — cheapest)
2. In Vercel: Settings → Domains → Add domain
3. Point DNS to Vercel's nameservers
4. Done — auto HTTPS, zero config

Recommended domains (in order of preference):
- `wisdomkinoti.com`
- `6ofhertz.dev`
- `philosophos.dev`

---

## 9. Design System

### Colors
```css
/* Primary palette */
--black:        #0a0a0a;    /* Background */
--surface:      #111111;    /* Card backgrounds */
--border:       rgba(255,255,255,0.08); /* Subtle borders */
--text-primary: #f5f5f5;    /* Main text */
--text-muted:   #737373;    /* Secondary text */

/* Accent — one color only */
--emerald:      #10B981;    /* Active status, highlights, links */
--emerald-dim:  #064e3b;    /* Emerald backgrounds */

/* Status colors */
--status-active:   #10B981; /* green */
--status-stable:   #3B82F6; /* blue */
--status-archived: #6B7280; /* gray */
--status-critical: #EF4444; /* red */
```

### Typography
```css
/* Two fonts only */
font-mono: 'JetBrains Mono', 'Fira Code', monospace;  /* data, status, code */
font-sans: 'Inter', system-ui, sans-serif;              /* narrative, body */

/* Scale */
--text-xs:   0.75rem;   /* 12px — labels, tags */
--text-sm:   0.875rem;  /* 14px — secondary content */
--text-base: 1rem;      /* 16px — body */
--text-lg:   1.125rem;  /* 18px — card titles */
--text-xl:   1.25rem;   /* 20px — section headers */
--text-3xl:  1.875rem;  /* 30px — page titles */
--text-5xl:  3rem;      /* 48px — name/hero */
```

### Spacing
```
8px grid system.
All spacing is multiples of 4px or 8px.
Section padding: 96px (6rem) top/bottom.
Card padding: 24px (1.5rem).
Gap between cards: 24px.
```

### Component Patterns
```tsx
// Glass card — the base surface for everything
<div className="rounded-2xl border border-white/5 bg-black/50 backdrop-blur-xl p-6" />

// Status badge
<span className="text-xs font-mono px-2 py-0.5 rounded-full border">
  ACTIVE
</span>

// Section header pattern
<p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">
  SECTION_LABEL
</p>
<h2 className="text-3xl font-bold text-white">
  Section Title
</h2>
```

---

## 10. Rules — What Not To Do

These are hard rules. Don't break them.

1. **No stock images.** No AI-generated images. No Unsplash. If a project needs a visual, use a real screenshot of the actual project.

2. **No fake metrics.** Don't write "Reduced audit time by 65%" unless you measured it. Write what actually happened.

3. **No typewriter hero text.** Already done a million times. Not here.

4. **No progress bars for skills.** "Security: 87%" means nothing. Show what you built instead.

5. **One accent color.** Emerald green. Not blue-green-purple-orange. One.

6. **`status.ts` stays updated.** The current operation on the landing page should reflect reality. If you finish something, update it. Takes 30 seconds.

7. **Dead projects go on the timeline.** Not in the trash. The journey includes the abandoned ones. Just mark them `ARCHIVED`.

8. **No placeholder content in production.** "Lorem ipsum", "coming soon" (except `/journal`), or "example.com" links. Either it's real or it's not there.

---

## 11. Current Build State (April 2026)

### Done (from Biblitheca codebase)
- [x] Next.js 15 project initialized
- [x] Tailwind configured
- [x] Framer Motion installed
- [x] ThemeProvider (dark mode) wired
- [x] `GlassCard` component pattern
- [x] Live clock component
- [x] Radar chart (Recharts)
- [x] Terminal easter egg
- [x] Vercel deployment connected

### To Do — Session 1 (Tonight)
- [ ] Update `lib/data/projects.ts` with real data (OTDT, WisdomAI, HAKI, vulai + timeline entries)
- [ ] Build `/` landing page (identity block + current status)
- [ ] Build `/projects` page (timeline + featured cards)
- [ ] Deploy and get live URL

### To Do — Session 2
- [ ] `/certs` page
- [ ] `/about` page
- [ ] `/contact` page + Resend form
- [ ] Navbar component
- [ ] Footer component

### To Do — Session 3 (Future)
- [ ] `/journal` — MDX setup and first post
- [ ] Custom domain
- [ ] OG image for social sharing
- [ ] Analytics (Vercel Analytics — free, one line to enable)

---

## 12. Commands Reference

```bash
# Start dev server
npm run dev

# Build for production (always run before pushing)
npm run build

# Type check only
npx tsc --noEmit

# Install a new package
npm install <package-name>

# Deploy (auto on git push, or manual)
vercel --prod
```

---

## 13. Questions You'll Have Later

**Q: How do I add a new project?**
Open `lib/data/projects.ts`. Add a new object to the `projects` array. Set `featured: true` if it should appear in the featured section. Push to GitHub. Done.

**Q: How do I update the "current operation" on the landing page?**
Open `lib/data/status.ts`. Change the values. Push. Done.

**Q: How do I write a journal post?**
Create a `.mdx` file in `/content/journal/`. Give it frontmatter (title, date, tags). Push. Done. (Once journal is wired — Session 3.)

**Q: The contact form isn't sending emails.**
Check: (1) `RESEND_API_KEY` is set in Vercel environment variables, (2) `CONTACT_EMAIL` is set, (3) Check Resend dashboard for errors.

**Q: How do I add a custom domain?**
See Section 8. Buy domain → Vercel settings → add domain → point DNS.

**Q: Should I add a database?**
Not yet. Probably not for a long time. Static files are faster, cheaper, and simpler. Add a database only if you need user auth, comments, or dynamic data that can't live in a `.ts` file.

---

*Document maintained by φιλόσοφος. Update it when something changes.*
