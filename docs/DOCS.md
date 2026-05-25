# THE JOURNEY — Master Documentation
> *"I blueprint things before they escape. Most of them turn into something real."*

**Version:** 1.0 (Final)
**Author:** Wisdom Kinoti · φιλόσοφος
**Repo:** `kwisdomk/port-wk`
**Live:** `port-wk.vercel.app`
**Last Updated:** April 2026

---

## What This System Is

**The Journey** is not a portfolio. Not a resume site. Not a landing page.

It is a **self-updating technical autobiography system with engineering traceability** — a living system map of technical evolution, structured as a navigable interface.

It serves:
- You (the builder) — as a documented record of everything you've built, abandoned, shipped, or learned
- Peers and younger builders — as an honest map of what a real technical journey looks like
- Anyone evaluating your work — who will find more signal here than in any CV

**Core principle (non-negotiable):**
> "Everything I build is valid as long as it reflects progression."

---

## Documentation Index

This master document covers system-wide decisions.
Separate guides cover each engineering sector:

```
DOCS.md                    ← You are here (master)
guides/
├── 01-frontend.md         ← Component patterns, structure, rules
├── 02-ui-ux.md            ← Design system, layout, motion, mobile
├── 03-backend.md          ← API routes, Resend, future serverless layer
├── 04-data.md             ← Data models, content files, update workflow
├── 05-security.md         ← CSP headers, env vars, input hygiene
├── 06-seo.md              ← Meta, OG images, sitemap, discoverability
├── 07-performance.md      ← Lighthouse targets, bundle, images
└── 08-git-workflow.md     ← Branching, commits, deploy discipline
```

---

## Tech Stack (Locked)

### Frontend
| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 15 (App Router) | Vercel-native. File-based routing. Already set up. |
| Language | TypeScript | Type safety. Catches schema mismatches before runtime. |
| Styling | Tailwind CSS v3 | No separate CSS files. Utility-first. Fast iteration. |
| Animation | Framer Motion v11 | Timeline animations. Entry reveals. Already installed. |
| Icons | Lucide React | Lightweight. Consistent. Already installed. |
| Charts | Recharts | Skills radar. Already installed. |
| Theme | next-themes | Dark mode toggle. Already wired. |

### Backend
| Layer | Choice | Reason |
|---|---|---|
| Hosting | Vercel (free tier) | Zero config. Auto-deploys on push to main. |
| API Routes | Next.js serverless functions | No separate server needed. |
| Email | Resend (free: 3,000/month) | Developer-first. Simple API. Owns the flow. |
| Journal | Markdown files (local) | File = post. No CMS. Version controlled. |

### Data
| Layer | Choice | Reason |
|---|---|---|
| All content | Static TypeScript files in `/lib/content/` | No database. Edit a `.ts` file = update the site. |
| No database | — | Not needed. Everything is read-only at runtime. |

**Rule: No backend until there is a concrete, unavoidable reason.**

---

## Project Structure (Final)

```
port-wk/
│
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout, fonts, ThemeProvider
│   ├── globals.css                   # CSS variables, Tailwind base
│   ├── page.tsx                      # / — Landing
│   ├── projects/page.tsx             # /projects — Timeline + Featured
│   ├── about/page.tsx                # /about — The person, the arc
│   ├── certs/page.tsx                # /certs — Capability register
│   ├── contact/page.tsx              # /contact — Signal layer
│   ├── journal/
│   │   ├── page.tsx                  # /journal — Placeholder
│   │   └── [slug]/page.tsx           # /journal/[slug] — Future post
│   └── api/
│       └── contact/route.ts          # POST handler → Resend
│
├── components/
│   ├── ui/                           # Primitives
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   ├── theme-toggle.tsx
│   │   └── theme-provider.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── IdentityBlock.tsx         # Name, handle, tagline
│   │   └── CurrentOps.tsx            # Live status from status.ts
│   ├── projects/
│   │   ├── TimelineSpine.tsx         # Full chronological timeline
│   │   ├── FeaturedCard.tsx          # Production-grade project card
│   │   └── TimelineEntry.tsx         # Compact timeline row
│   ├── certs/
│   │   └── CredentialCard.tsx
│   └── contact/
│       └── ContactForm.tsx           # Resend-powered form
│
├── lib/
│   ├── content/                      # SOURCE OF TRUTH — edit here
│   │   ├── projects.ts
│   │   ├── timeline.ts
│   │   ├── certs.ts
│   │   ├── profile.ts
│   │   ├── status.ts                 # Update manually when focus changes
│   │   ├── ui-state.ts               # UI behavior config
│   │   └── _rules.ts                 # Data integrity contract
│   └── utils.ts                      # cn() and helpers
│
├── content/
│   └── journal/                      # Markdown posts (future)
│       └── .gitkeep
│
├── public/
│   ├── robots.txt
│   ├── sitemap.xml                   # Generate after first deploy
│   └── wallpaper.svg
│
├── .env.local                        # Local secrets — NEVER COMMIT
├── .env.example                      # Template — commit this
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Pages — Behavior and Content

### `/` — The Transmission

**Purpose:** Identity + current system state. Not a marketing hero.

**What it contains:**
- Name: Wisdom Kinoti
- Handle: φιλόσοφος · kwisdomk · 6ofHertz
- Role: Junior Cybersecurity Analyst · CS Student · IBM i3 Intern
- Location: Nairobi, Kenya · UTC+3
- Tagline: *"I blueprint things before they escape. Most of them turn into something real."*
- Current operation block (from `status.ts`) — what's being built right now
- Navigation

**What it does NOT contain:**
- Typewriter hero text
- "Welcome to my portfolio"
- Skill progress bars
- "Hire me" CTA

---

### `/projects` — Operations Log

**Two layers, both visible:**

**Layer A — Featured Systems (top)**
Only these five get full treatment:
- OTDT — Industrial digital twin. Solo MAS 9.1 on OpenShift. Leads everything.
- WisdomAI — 6-agent WhatsApp health system. 78 tests.
- HAKI — IBM DevDay 2026. AI telemedicine.
- vulai — Shipped. Full release cycle. Community distributed.
- AEGIS — Portable Windows diagnostics framework.

Each card: Codename · Status badge · Problem · Solution · Impact · Stack · Links

**Layer B — Timeline (below featured)**
All activity. Chronological. Honest.

```
2024
 ├── OOP1, OOP-bcs         → CS coursework. Raw.
 ├── compsvision            → Computer vision experiments
 └── eNSP labs              → Networking fundamentals

2025
 ├── zurvan-tracker         → Personal learning system
 ├── Miniazon               → DSA implementation
 ├── IBM Bootcamp begins    → [MILESTONE]
 ├── Eye-of-Odin            → MLH Gemini hackathon
 ├── genesis                → GitLab AI hackathon
 └── IBM Technical Review   → 9.0/10 [MILESTONE]

2026
 ├── HAKI                   → IBM DevDay, Team Lead
 ├── WisdomAI               → Multi-agent health system
 ├── OTDT                   → Solo OpenShift deployment
 ├── vulai                  → Shipped open-source
 ├── Wisevoido              → RAG document system
 ├── AEGIS                  → System diagnostics
 └── ai-athena              → Active experiment
```

**Design rule:**
- Timeline = truth layer
- Featured = credibility layer
- Both exist simultaneously

---

### `/about` — The Operator

**Purpose:** Context, not biography.

**Contains:**
- Background: Nairobi. Infrastructure roots (Kenya Power, RK Shah, Close the Gap) before code.
- The shift: operations → systems → intelligence
- What φιλόσοφος actually means to you
- Three-phase career arc:
  - Phase 1 — Technical Depth: CC, Security+, CEH, first professional roles *(now)*
  - Phase 2 — Leadership/GRC: OSCP, CySA+, CASP+, senior analyst/pen tester
  - Phase 3 — Executive: CISSP, CISM, ISO 27001, CISO or firm founder by ~30-33
- Athena — the machine. Part of the lore.
- Current direction

**Does NOT contain:**
- Emotional storytelling
- Motivational language
- Biography format

---

### `/certs` — Acquired Capabilities

**Purpose:** Proof layer. Honest about what's done and in progress.

```
COMPLETE
├── IBM QRadar SIEM L2                   88%
├── IBM QRadar SIEM L3 Tech Sales        100%
├── IBM QRadar Architecture & Sizing     90%
├── IBM Agentic AI Hands-On              Mar 2026
├── Anthropic Claude 101                 100% · Mar 2026
└── ISC2 Candidate                       Active

IN PROGRESS
├── ISC2 CC (Certified in Cybersecurity) → Sep 2026
├── CompTIA Security+                    → 2026
├── CEH                                  → 2026
└── RHSA I (RH124)                       ~46% · Ch9
```

---

### `/contact` — Signal

**Purpose:** Minimal trust layer.

**Contains:**
- Email (copy-to-clipboard)
- GitHub: `kwisdomk` + `6ofHertz`
- LinkedIn: `/in/kwisdomk`
- One line: *"Open to collaborations that are technically serious and contextually relevant — East African health tech, security tooling, AI infrastructure, or open-source with a point."*
- Optional: Resend contact form (name + email + message)

---

### `/journal` — Placeholder

**Current state:** Static page. Text: *"System journal is currently under construction."*

**Future state:** Markdown-powered. A file in `/content/journal/` = a post. No CMS. No backend.

---

## Data Layer (Source of Truth)

All site content lives in `/lib/content/`. UI consumes — never writes.

### `_rules.ts` — Data Integrity Contract
```typescript
export const rules = {
  no_fake_metrics: true,
  all_activity_must_exist_in_timeline: true,
  projects_must_have_phase: true,
  status_must_reflect_real_activity: true,
  inactive_projects_must_be_archived_not_deleted: true,
};
```

### `projects.ts` — Project Records
```typescript
export type ProjectPhase = "exploration" | "systems" | "production";
export type ProjectStatus = "active" | "paused" | "archived";

export type Project = {
  id: string;
  name: string;
  codename: string;
  phase: ProjectPhase;
  status: ProjectStatus;
  date: string;
  description: string;
  problem: string;
  solution: string;
  impact?: string;              // optional — only if real and measurable
  stack: string[];
  category: "ai" | "security" | "web" | "infra" | "tools";
  links?: {
    github?: string;
    live?: string;
  };
};
```

### `timeline.ts` — Full History
```typescript
export type TimelineEntryType = "project" | "experiment" | "milestone";

export type TimelineEntry = {
  id: string;
  date: string;
  title: string;
  type: TimelineEntryType;
  summary: string;
  projectId?: string;           // links back to projects.ts if exists
};
```

### `profile.ts` — Identity
```typescript
export type Profile = {
  name: string;
  alias: string;
  role: string;
  location: string;
  currentFocus: string;
  philosophy: string;
  handles: {
    github_primary: string;
    github_secondary: string;
    linkedin: string;
  };
  machine: {
    name: string;
    specs: string;
  };
};
```

### `status.ts` — Live State
```typescript
// UPDATE THIS whenever your focus changes. Takes 30 seconds.
export const currentStatus = {
  operation: "Building The Journey portfolio",
  secondaryOp: "RHSA I — RH124 Ch9 I/O Redirection",
  machine: "Athena (HP Victus 15)",
  uptime: "ACTIVE" as const,
  lastUpdated: "Apr 2026",
};
```

### `ui-state.ts` — UI Behavior
```typescript
export const uiState = {
  theme: "dark",
  accent: "emerald",
  density: "comfortable",
  animationLevel: "subtle",
  timelineMode: "spine",
};
```

### `certs.ts` — Certifications
```typescript
export type CertStatus = "complete" | "in-progress" | "planned";

export type Cert = {
  title: string;
  issuer: string;
  status: CertStatus;
  score?: string;
  date?: string;
  deadline?: string;
  credlyUrl?: string;
};
```

---

## Data Flow (One Direction)

```
profile.ts    → IdentityBlock (landing)
status.ts     → CurrentOps (landing + navbar)
projects.ts   → FeaturedCard (projects page)
timeline.ts   → TimelineSpine (projects page)
              → projectId links back to projects.ts
certs.ts      → CredentialCard (certs page)
_rules.ts     → internal only, never rendered
ui-state.ts   → theme/animation config, never rendered as content
```

**Rule: UI consumes content. Content never depends on UI.**

---

## Connector Map

### Internal
| Source | Consumed By |
|---|---|
| `profile.ts` | `/` landing page |
| `status.ts` | `/` landing + Navbar |
| `projects.ts` | `/projects` featured section |
| `timeline.ts` | `/projects` timeline spine |
| `certs.ts` | `/certs` page |

### External
| Service | Purpose | Cost |
|---|---|---|
| Vercel | Hosting + auto-deploy | Free |
| Resend | Contact form email | Free (3k/mo) |
| GitHub | Source of truth | Free |
| Vercel Analytics | Usage tracking (future) | Free |

---

## Environment Variables

### `.env.example` (commit this)
```env
# Email — Resend
RESEND_API_KEY=

# Contact routing
CONTACT_EMAIL=

# Optional — future
VERCEL_ANALYTICS_ID=
NEXT_PUBLIC_SITE_URL=
```

### `.env.local` (never commit — local dev only)
```env
RESEND_API_KEY=re_your_key_here
CONTACT_EMAIL=your-real-email@gmail.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Vercel production
Set via: Vercel Dashboard → Project → Settings → Environment Variables
- `RESEND_API_KEY`
- `CONTACT_EMAIL`
- `NEXT_PUBLIC_SITE_URL` → `https://port-wk.vercel.app`

---

## Build State (April 2026)

### Carried Over From Biblitheca (Working)
- [x] Next.js 15 initialized
- [x] Tailwind configured
- [x] Framer Motion installed
- [x] ThemeProvider (dark mode)
- [x] GlassCard component pattern
- [x] Live clock
- [x] Recharts radar
- [x] Terminal easter egg
- [x] Vercel connected

### Session 1 — Tonight
- [ ] Scaffold `/lib/content/` with all data files
- [ ] Populate real project + timeline data
- [ ] Build `/` landing page
- [ ] Build `/projects` page (timeline + featured)
- [ ] Deploy → get live URL

### Session 2
- [ ] `/certs` page
- [ ] `/about` page
- [ ] `/contact` + Resend form
- [ ] Navbar + Footer components

### Session 3
- [ ] SEO: meta tags, OG image, sitemap
- [ ] Accessibility pass
- [ ] Performance audit (Lighthouse 90+)
- [ ] `/journal` Markdown scaffold

### Future
- [ ] Custom domain
- [ ] Vercel Analytics
- [ ] Journal first post
- [ ] AEGIS/Athena integration layer

---

## Hard Rules (Non-Negotiable)

1. **No stock images. No AI images.** Real visuals of actual work only.
2. **No fake metrics.** If you didn't measure it, don't write it.
3. **No typewriter hero.** Banned.
4. **No skill progress bars.** "Security: 87%" means nothing. Show builds.
5. **One accent color.** Emerald `#10B981`. Not negotiable.
6. **`status.ts` stays current.** Update it when your focus changes.
7. **Dead projects go on the timeline.** Mark as `archived`. Never deleted.
8. **No placeholder content in production.** Except `/journal`.
9. **No secrets in frontend code. Ever.**
10. **Content first, UI second.** If it works but looks plain, that's fine.

---

## Commands Reference

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build — run before every push
npm run lint         # ESLint check
npx tsc --noEmit     # Type check without building

npm install <pkg>    # Install dependency
vercel --prod        # Manual deploy (usually not needed — push to main)
```

---

## FAQ (Questions You'll Have Later)

**Q: How do I add a new project?**
Edit `/lib/content/projects.ts`. Add object to array. Push to GitHub. Done.

**Q: How do I update "currently building" on the landing page?**
Edit `/lib/content/status.ts`. Change values. Push. Done.

**Q: How do I add a journal post?**
Create `/content/journal/your-post.md` with frontmatter. Push. Done. (Once Session 3 is complete.)

**Q: Contact form isn't sending.**
Check: (1) `RESEND_API_KEY` set in Vercel env vars, (2) `CONTACT_EMAIL` set, (3) Check Resend dashboard logs.

**Q: Should I add a database?**
Not yet. Probably not for a long time. Add only when you need user auth, comments, or data that can't live in a `.ts` file.

**Q: Should I add a CMS?**
Not yet. Markdown files are your CMS. Simpler, faster, version-controlled.

**Q: Custom domain?**
When the site is fully built and live. See Guide 06-seo.md for setup steps.

---

*Maintained by φιλόσοφος. Update this document when architecture decisions change.*
