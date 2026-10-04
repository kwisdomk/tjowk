# KWAIX.dev Current-State Technical Audit (Pre-v3 Baseline)

**Document:** `docs/v3/00-current-state-audit.md`  
**Date:** September 7, 2026  
**Auditor:** Antigravity AI (Pair Programmer)  
**Target Repository:** `kwisdomk/tjowk` (`q:\KWAIX\tjowk`)  
**Purpose:** Technical baseline and reconnaissance for the KWAIX.dev v3 redesign.

---

## 1. Executive Summary

KWAIX.dev is the personal technical portfolio, capability register, and systems record of **Wisdom Kinoti** (`φιλόσοφος`), a Junior Cybersecurity Analyst based in Nairobi, Kenya. The current production codebase represents "v2" ("The Journey"), built as a data-driven Next.js 16 application with static JSON/Markdown content loaders, Tailwind CSS, Framer Motion animations, and a simulated terminal emulator.

The repository is currently checked out on an uncommitted feature branch named `ion`, containing in-progress changes from "Project ION" (an internal reorganization aimed at quarantining unverified workloads into a dev-only incubator HUD, adding a founder portrait, and refining layout spacing).

### Primary Findings
1. **Repository Health:** The core application code compiles cleanly under Next.js 16.2.7 Turbopack and passes TypeScript `5.9.3` validation with zero type errors. However, the working tree is dirty with 16 modified/deleted files and 7 untracked file paths.
2. **Architecture:** Content is primarily static and loaded at build time from `content/*.json` and `content/journal/*.md` using Zod schemas. However, multiple competing sources of truth exist in hardcoded component state (notably within `components/ui/terminal.tsx` and `app/about/page.tsx`).
3. **The `/core` Interface:** As documented in `docs/plans/core-page-deferred.md`, `/core` is **intentionally absent** (404) following two rejected implementation attempts. It must not be re-implemented until an approved geometric wireframe is signed off by Wisdom.
4. **Tooling Gaps:** `npm run lint` is currently broken because `next lint` was removed/changed in Next.js 16 and no ESLint packages or configs are present in the repository. No automated test runner (Jest, Vitest, or Playwright) is installed.
5. **Safety Precaution:** No refactoring, deletion, or redesign work should commence until the Git state is tagged and cleanly branched into `redesign/kwaix-v3`.

---

## 2. Repository & Git State

### Current Status
* **Current Branch:** `ion`
* **Tracking Remote:** `origin/main` (upstream default)
* **Latest Commit:** `7ab5fde checkpoint: preserve repository before Project ION`
* **Commit Date:** Tue Aug 4 23:12:00 2026 +0300
* **Working Tree State:** **DIRTY (Unsafe to branch directly without capturing state)**

### Uncommitted Modifications (16 files)
| Status | File Path | Description of Change |
|---|---|---|
| Modified | `.gitignore` | Added ignores for `.codex`, etc. |
| Modified | `app/about/page.tsx` | Added `OperatorPortrait` import, modified layout grid |
| Modified | `app/robots.ts` | Added `/unknowns` to disallow list |
| Modified | `components/home/IdentityBlock.tsx` | Refined Kierkegaard tagline rendering logic |
| Modified | `components/layout/Footer.tsx` | Split tagline by author separator |
| Modified | `content/certs.json` | Cleaned up cert score attributes |
| Modified | `content/profile.json` | Updated avatar path to `/images/founder.jpeg`, email to Proton |
| Modified | `content/projects/ai-athena.json` | Updated `featuredOrder` to 3, changed phase to exploration |
| Deleted | `content/projects/grove-vision.json` | Project removed from public workloads (moved to quarantine) |
| Deleted | `content/projects/wisdomai.json` | Project removed from public workloads (moved to quarantine) |
| Modified | `content/status.json` | Updated status for August 2026 |
| Modified | `content/timeline.json` | Removed grove-vision and wisdomai milestone entries |
| Modified | `docs/plans/tjowk-workstreams.md` | Workstream documentation updates |
| Modified | `lib/content/loaders.ts` | Added `getUnknowns()` loader and schema export |
| Modified | `lib/content/schemas.ts` | Added `UnknownItemSchema`, `UnknownsFileSchema`, optional `avatar` |
| Modified | `tsconfig.tsbuildinfo` | Incremental compiler cache updated |

### Untracked Files (7 paths)
1. `app/unknowns/` (`app/unknowns/page.tsx` — dev-only R&D incubator HUD)
2. `components/about/` (`components/about/OperatorPortrait.tsx` — founder portrait card)
3. `components/whoami/` (`components/whoami/SingularityPortrait.tsx` — 3D CSS accretion scene)
4. `docs/design/` (design scratchpad files)
5. `docs/hackbook/` (book-length architecture documentation)
6. `docs/plans/project-ion-charter.md` (Project ION decision charter)
7. `public/images/founder.jpeg` (60.7 KB portrait photograph of Wisdom Kinoti)

### Recommended Git Actions (Manual Execution)
To establish a safe baseline before branching for v3:

```powershell
# 1. Commit the pending Project ION work on the current branch
git add .
git commit -m "chore(ion): preserve Project ION staging and incubator updates"

# 2. Tag the pre-v3 baseline
git tag -a v2-baseline -m "KWAIX.dev v2 baseline snapshot before v3 redesign"

# 3. Create and switch to the redesign branch
git checkout -b redesign/kwaix-v3
```

---

## 3. Technology Stack

The actual implementation verified directly from `package.json`, `package-lock.json`, `next.config.ts`, and `tsconfig.json`:

| Layer | Declared / Detected Technology | Exact Version | Repository Source of Truth | Notes |
|---|---|---|---|---|
| **Framework** | Next.js (App Router, Turbopack) | `16.2.7` (`^16.2.6` in pkg) | `package.json`, build output | Running standalone App Router |
| **Runtime / Language** | Node.js / TypeScript | Node `v24.19.0`, TS `5.9.3` (`^5`) | `package.json`, `tsconfig.json` | Strict mode enabled, ES2017 target |
| **UI Library** | React / React DOM | `18.3.1` (`^18.3.1`) | `package.json` | React 18 in use with Next 16 |
| **Package Manager** | npm / pnpm | `package-lock.json` in root | Root directory files | Lockfile is npm format (v3) |
| **Styling** | Tailwind CSS v3 + Vanilla CSS | `3.4.1` | `tailwind.config.ts`, `globals.css` | Custom design tokens via CSS variables |
| **CSS Utilities** | `clsx`, `tailwind-merge`, `cva` | `clsx: 2.1.1`, `tailwind-merge: 3.4.0` | `package.json`, `lib/utils.ts` | Standard `cn()` class helper |
| **Animations** | Framer Motion | `11.18.2` | `package.json` | Heavy client-side layout motion |
| **Icons** | Lucide React | `0.263.1` | `package.json` | Used across UI & terminal |
| **Content Schema** | Zod | `4.4.3` (`^4.4.3`) | `lib/content/schemas.ts` | Validates all static JSON loaders |
| **Markdown Pipeline** | Unified / Remark / Rehype | `unified 11`, `remark-parse 11`, `rehype-highlight 7` | `lib/content/loaders.ts` | Used exclusively for `/journal` |
| **Fonts** | Geist & Geist Mono | Next.js Google Font integration | `app/layout.tsx` | Variable font injections |
| **Theme System** | `next-themes` | `0.4.6` | `components/ui/theme-provider.tsx` | Class-based (`light`, `dark`, `system`) |
| **Email API** | Resend | `6.12.4` | `app/api/contact/route.ts` | Contact form integration |
| **Analytics** | Vercel Analytics & Speed Insights | `analytics: 2.0.1`, `speed: 2.0.0` | `app/layout.tsx` | Embedded in root layout body |
| **CMS** | Decap CMS (formerly Netlify CMS) | `3.12.2` (via unpkg CDN) | `public/admin/index.html` | Custom GitHub OAuth PKCE backend |
| **Deployment Target** | Vercel | Assumed from tooling | Edge OG handler, analytics | Static export with serverless endpoints |

*Discrepancy Note:* Earlier documentation (`docs/DOCS.md`) claimed Recharts was part of the stack for a skills radar. Recharts is **not installed** in `package.json` and does not exist in the codebase.

---

## 4. Current Information Architecture

The website is structured around an engineering portfolio metaphor:

```text
kwaix.dev/
├── /                     → root (System boot, identity, current operations, featured preview)
├── /projects             → workloads (Full chronological catalog, featured projects, horizontal timeline)
│   └── /projects/[id]    → detail view (Deep dive, architecture SVG/screenshot gallery, P/S/I breakdown)
├── /about                → whoami (Operator identity, founder portrait, experience, philosophy)
├── /certs                → certifications (Capability register: complete, in-progress, planned)
├── /contact              → ping (Direct communication channels, Resend message form)
├── /journal              → logs (Field notes, dispatches from real builds)
│   └── /journal/[slug]   → markdown post reader (Technical post rendering with code syntax highlighting)
├── /unknowns             → [DEV ONLY] R&D incubation HUD (quarantined projects, hard 404 in production)
├── /sandbox              → [DEV ONLY] SingularityPortrait test scene (hard 404 in production)
├── /admin                → Decap CMS interface (static HTML in public/admin)
└── /core                 → [DEFERRED] Intentionally returns 404
```

---

## 5. Route Inventory & Exact Route Counts

### Explicit Route Classification [Repository Observation]
* **Top-Level Public Routes (6):** `/`, `/projects`, `/about`, `/certs`, `/contact`, `/journal`
* **Dynamic Public Route Branches (2):**
  * `/projects/[id]` (14 static instances prerendered at build time: `aegis`, `ai-athena`, `compsvision`, `ensp-labs`, `eye-of-odin`, `genesis`, `haki`, `miniazon`, `mr-roboto`, `oop-labs`, `otdt`, `vulai`, `wisevoido`, `zurvan-tracker`)
  * `/journal/[slug]` (1 static instance prerendered at build time: `otdt-solo-deploy`)
  * *Total Public HTML URL Endpoints:* **21 unique public URLs** (6 top-level + 14 project pages + 1 journal post).
* **Development-Only & Internal Admin Routes (3):**
  * `/unknowns` (dynamic server route, runtime killswitch: returns 404 in production)
  * `/sandbox` (dynamic server route, runtime killswitch: returns 404 in production)
  * `/admin` (static Decap CMS Single Page Application served from `public/admin/index.html`)
* **Built-in Error Route (1):**
  * `/_not-found` (prerendered static 404 page)
* **API Endpoints (3):**
  * `POST /api/contact` (dynamic serverless function)
  * `GET /api/auth` (dynamic serverless function)
  * `GET /api/callback` (dynamic serverless function)
* **Dynamic Edge Media Route (1):**
  * `GET /opengraph-image` (dynamic edge-rendered OpenGraph image via Satori)
* **Metadata & Static Asset Routes (5):**
  * `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, `/icon.png`, `/apple-icon.png`
* **Deferred Route (1):**
  * `/core` (Intentionally absent; returns 404)
* **Next.js Turbopack Worker Queue [Executed Verification Result]:**
  * The Next.js production build compiler tracks **31 route items** (26 static/SSG prerendered files/pages + 5 dynamic/edge endpoints).

| URL | Page File | Classification | Layout / Shell | Major Components | SEO / Metadata | Index / Follow | Content Source | In Nav |
|---|---|---|---|---|---|---|---|---|
| `/` | `app/page.tsx` | Public Page | Root (`site-shell`) | `IdentityBlock`, `CurrentOps`, `StatusBadge` | Static title, description, JSON-LD | `index, follow` | `profile.json`, `status.json`, `projects/*.json` | Yes (`root`) |
| `/projects` | `app/projects/page.tsx` | Public Page | Root (`site-shell`) | `FeaturedCard`, `HorizontalTimeline` | Static title, description, canonical | `index, follow` | `getFeaturedProjects()`, `getTimeline()` | Yes (`workloads`) |
| `/projects/[id]` | `app/projects/[id]/page.tsx` | Public Dynamic (14 instances) | Root (`site-shell`) | `VisualGallery`, `StatusBadge`, markdown/text blocks | Dynamic via `generateMetadata` | `index, follow` | `content/projects/{id}.json` | No (Sub-route) |
| `/about` | `app/about/page.tsx` | Public Page | Root (`site-shell`) | `OperatorPortrait`, Lucide icon cards | Static title, description, canonical | `index, follow` | `profile.json` + hardcoded `EXPERIENCE`/`CAREER_ARC` | Yes (`whoami`) |
| `/certs` | `app/certs/page.tsx` | Public Page | Root (`site-shell`) | `CredentialCard`, `StatusBadge` | Static title, description, canonical | `index, follow` | `content/certs.json` | Yes (`certifications`) |
| `/contact` | `app/contact/page.tsx` | Public Page | Root (`site-shell`) | `ContactForm`, direct links | Static title, description, canonical | `index, follow` | `profile.json` + Resend API | Yes (`ping`) |
| `/journal` | `app/journal/page.tsx` | Public Page | Root (`site-shell`) | Dispatches list cards | Static title, description, canonical | `index, follow` | `content/journal/*.md` | Yes (`logs`) |
| `/journal/[slug]` | `app/journal/[slug]/page.tsx` | Public Dynamic (1 instance) | Root (`site-shell`) | Article prose renderer | Dynamic via `generateMetadata` | `index, follow` | `content/journal/{slug}.md` | No (Sub-route) |
| `/unknowns` | `app/unknowns/page.tsx` | Internal Dev HUD | Root (`site-shell`) | Diagnostics cards, checklist | Static title | `noindex, nofollow` (Hard 404 in prod) | `content/unknowns.json` | No (Hidden) |
| `/sandbox` | `app/sandbox/page.tsx` | Internal Dev Scene | Standalone dark wrapper | `SingularityPortrait` | None | Hard 404 in prod | Standalone component | No (Hidden) |
| `/admin` | `public/admin/index.html` | Internal CMS Admin | CDN single-page app | Decap CMS script | Static title | Not listed in robots | GitHub repo commit API | No (Hidden) |
| `/_not-found` | `app/not-found.tsx` | Error Page (Static) | Standalone container | Terminal simulation, home button | Static 404 title | `noindex` | Hardcoded simulation | No (Fallback) |
| `/core` | *Non-existent* | Deferred Feature | N/A | None (Route deleted per owner directive) | N/A | Returns 404 | `docs/plans/core-page-deferred.md` | No (Hidden) |

### API Routes & Utilities
* `POST /api/contact`: Handles contact form submissions with Zod validation, honeypot protection, HTML escaping, and Resend delivery [Repository Observation].
* `GET /api/auth`: Initiates GitHub OAuth flow with PKCE challenge and state cookie for Decap CMS [Repository Observation].
* `GET /api/callback`: Exchanges GitHub OAuth code with PKCE verification, enforces strict origin checks, verifies user identity (`kwisdomk`), and returns HTML postMessage popup handshake [Repository Observation].
* `GET /sitemap.xml`: Generated by `app/sitemap.ts` (Indexes 6 static pages, 14 projects, 1 journal post) [Executed Verification Result].
* `GET /robots.txt`: Generated by `app/robots.ts` [Executed Verification Result].
* `GET /manifest.webmanifest`: Generated by `app/manifest.ts` [Executed Verification Result].
* `GET /opengraph-image`: Generated dynamically via `@vercel/og` (`app/opengraph-image.tsx`) [Executed Verification Result].

---

## 6. Global Shell Architecture

### Root Layout (`app/layout.tsx`)
1. **Document Setup:** Injects `scroll-smooth`, Geist variable fonts (`--font-sans`, `--font-mono`), and `suppressHydrationWarning`.
2. **Schema.org:** Embeds JSON-LD graph with `@type: WebSite` and `@type: Person` linking to GitHub and LinkedIn profiles.
3. **Provider:** Wraps all tree elements in `ThemeProvider` (`attribute="class"`, `defaultTheme="system"`).
4. **Skip Link:** A high-contrast accessible skip button (`#main-content`) hidden offscreen until focused.
5. **Navbar:** Fixed at top, height `3.5rem` (`h-14`), with blurred background.
6. **Main Landmark:** `<main id="main-content" className="pt-14 w-full min-w-0 flex-1">`
7. **Footer:** Anchored at bottom with identity info, quote, and social links.
8. **Floating Actions Wrapper:** Fixed at bottom-right viewport (`floating-actions`), holding the `TerminalButton`.
9. **Analytics:** `@vercel/analytics` and `@vercel/speed-insights` injected prior to `</body>`.

### Layout Primitives & Utilities (`app/globals.css`)
* `.site-shell`: Fluid, bounded page container:
  ```css
  width: 100%;
  max-width: var(--wide-max); /* 120rem / 1920px */
  margin-inline: auto;
  padding-left: max(var(--site-gutter), env(safe-area-inset-left));
  padding-right: max(var(--site-gutter), env(safe-area-inset-right));
  ```
* `.reading-measure`: Maximum reading width for prose (`72ch`).
* `.glass`: Frosted glass surface using `backdrop-filter: blur(24px)` and variable border colors.

---

## 7. Design System Audit

### Color Palette & Design Tokens
The design system operates on custom CSS variables mapped in `app/globals.css` with dark mode toggled by the `.dark` class on `<html>`:

| Token Name | Light Mode Value | Dark Mode Value | Usage |
|---|---|---|---|
| `--black` | `#f8f8f6` (warm white) | `#0a0a0a` (true dark) | Main document canvas background |
| `--surface` | `#ffffff` | `#111111` | Primary card / container background |
| `--surface-2` | `#f0f0ed` | `#161616` | Secondary / nested surface |
| `--border-subtle`| `rgba(0, 0, 0, 0.07)` | `rgba(255, 255, 255, 0.05)` | Card and section divider borders |
| `--border-hover` | `rgba(0, 0, 0, 0.18)` | `rgba(255, 255, 255, 0.15)` | Hover state borders |
| `--text-primary` | `#0f0f0e` | `#f5f5f5` | Headings and primary text |
| `--text-secondary`| `#4a4a46` | `#a3a3a3` | Body copy and descriptions |
| `--text-muted` | `#5c5c57` | `#8a8a8a` | Captions, metadata, and labels |
| `--emerald` | `#047857` | `#10B981` | Brand accent and active indicators |
| `--emerald-dim` | `rgba(5, 150, 105, 0.08)` | `rgba(16, 185, 129, 0.1)` | Tinted background washes |
| `--emerald-border`| `rgba(5, 150, 105, 0.25)` | `rgba(16, 185, 129, 0.3)` | Brand borders and rings |
| `--emerald-glow` | `rgba(5, 150, 105, 0.12)` | `rgba(16, 185, 129, 0.15)` | Glow effects |

### Status Tokens
* **Active:** `#059669` (Light) / `#10B981` (Dark)
* **Stable / Maintained:** `#2563EB` (Light) / `#3B82F6` (Dark)
* **Paused / In-Progress:** `#D97706` (Light) / `#F59E0B` (Dark)
* **Archived / Planned:** `#6B7280`
* **Critical:** `#DC2626` (Light) / `#EF4444` (Dark)

### Typography
* **Sans Font:** `Geist` (`var(--font-sans)`), fallback: `system-ui, sans-serif`. Used for general layout text.
* **Mono Font:** `Geist_Mono` (`var(--font-mono)`), fallback: `'Courier New', monospace`. Used extensively for headings, labels, dates, telemetry, code, and terminal.
* **Label Mono Pattern:** `.label-mono` (`text-[0.6875rem] font-medium tracking-[0.1em] uppercase text-muted-custom`).

### Inconsistencies & Duplications
1. **Ad-Hoc Inline Heading Styles:** Four pages (`projects/page.tsx`, `certs/page.tsx`, `contact/page.tsx`, `journal/page.tsx`) apply `style={{ color: 'var(--text-primary)' }}` directly to `<h1>` elements instead of using CSS utility classes (`text-primary`).
2. **Tailwind Palette vs. Custom Tokens:** `tailwind.config.ts` assigns `brand` to `var(--emerald)`. However, multiple components (`FeaturedCard`, `OperatorPortrait`, `VisualGallery`, `StatusBadge`) use hardcoded Tailwind classes like `text-emerald-400`, `text-emerald-500`, `bg-emerald-500/10`, `text-emerald-600`, creating slight shade inconsistencies between light and dark modes.
3. **Contrast Ratios on Small Text:** Small mono metadata (`text-[9px]`, `text-[10px]`) utilizing `text-muted-custom` (`#8a8a8a` on `#111111`) falls near the 4.5:1 minimum contrast threshold in dark mode.

---

## 8. Component Inventory

| Category | Component Name | File Path | Primary Responsibility | Usages | Reusability | Notes / Debt |
|---|---|---|---|---|---|---|
| **Layout** | `Navbar` | `components/layout/Navbar.tsx` | Site navigation, brand link, uptime badge, theme toggle, mobile menu | `app/layout.tsx` | Low (shell-specific) | Client component (`use client`) |
| **Layout** | `Footer` | `components/layout/Footer.tsx` | Site footer with identity, philosophy quote, copyright | `app/layout.tsx` | Low (shell-specific) | Server component compatible |
| **Navigation** | `ModeToggle` | `components/ui/theme-toggle.tsx` | 3-way segmented control (Light / System / Dark) | `Navbar.tsx` | High | Accessible (`aria-pressed`, role="group") |
| **Terminal** | `Terminal` | `components/ui/terminal.tsx` | kOS interactive simulated command-line dialog | `TerminalButton` | High | Fully isolated modal with mock FS |
| **Terminal** | `TerminalButton` | `components/ui/terminal.tsx` | Floating launcher button and backdrop controller | `app/layout.tsx` | Medium | Fixed at bottom right |
| **Home** | `IdentityBlock` | `components/home/IdentityBlock.tsx` | Hero banner displaying name, alias, sub-roles, links | `app/page.tsx` | Low (Home-specific) | Motion animations on load |
| **Home** | `CurrentOps` | `components/home/CurrentOps.tsx` | Live operational status card with uptime dot | `app/page.tsx` | Low (Home-specific) | Backed by `status.json` |
| **Projects** | `FeaturedCard` | `components/projects/FeaturedCard.tsx` | High-prominence card for featured workloads | `app/projects/page.tsx` | Medium | Embedded P/S/I grid and gallery |
| **Projects** | `HorizontalTimeline` | `components/projects/HorizontalTimeline.tsx` | Expandable horizontal timeline grouped by year & month | `app/projects/page.tsx` | Medium | Handles horizontal drag/scroll |
| **Projects** | `VisualGallery` | `components/projects/VisualGallery.tsx` | Image strip/grid with full-screen lightbox modal | `FeaturedCard`, `ProjectPage` | High | Supports keyboard navigation |
| **Projects** | `TimelineEntryItem` | `components/projects/TimelineEntry.tsx` | Vertical timeline node with spine | `TimelineSpine.tsx` | Low | **Orphaned / Unused** |
| **Projects** | `TimelineSpine` | `components/projects/TimelineSpine.tsx` | Vertical timeline list grouped by year | None | Low | **Orphaned / Unused** (replaced by HorizontalTimeline) |
| **Certs** | `CredentialCard` | `components/certs/CredentialCard.tsx` | Status card for credentials with Credly links | `app/certs/page.tsx` | High | Dynamic styling based on status |
| **Contact** | `ContactForm` | `components/contact/ContactForm.tsx` | Direct message form submitting to `/api/contact` | `app/contact/page.tsx` | Medium | Honeypot + Resend integration |
| **About** | `OperatorPortrait` | `components/about/OperatorPortrait.tsx` | Framed founder portrait with telemetry borders | `app/about/page.tsx` | Low | Untracked file in git |
| **Whoami** | `SingularityPortrait` | `components/whoami/SingularityPortrait.tsx` | 3D CSS accretion disk and ray field scene | `app/sandbox/page.tsx` | Low | Heavy CSS keyframes, untracked |
| **UI Primitive** | `StatusBadge` | `components/ui/status-badge.tsx` | Pill badge with colored dot for project/cert status | Throughout app | High | Clean, comprehensive status mapper |
| **UI Primitive** | `GlassCard` | `components/ui/glass-card.tsx` | Frosted container card with header slot | `CurrentOps.tsx` | High | Under-utilized |
| **UI Primitive** | `Button` | `components/ui/button.tsx` | Radix Slot + CVA button primitive | **None** | High | **Dead code** (never imported) |

---

## 9. Content & Data Architecture

### Data Storage Architecture
Public data is completely file-driven. No runtime database exists. Content lives in:

1. **`content/profile.json`**: Operator personal data (`name`, `alias`, `avatar`, `handles`, `role`, `subRoles`, `location`, `timezone`, `tagline`, `philosophy`, `machine`, `openTo`).
2. **`content/status.json`**: Live machine status (`operation`, `secondaryOp`, `machine`, `uptime`, `lastUpdated`).
3. **`content/certs.json`**: Array of credentials (`id`, `title`, `issuer`, `status`, `score`, `date`, `deadline`, `credlyUrl`, `notes`).
4. **`content/timeline.json`**: Chronological milestone and project log entries (`id`, `date`, `year`, `title`, `type`, `summary`, `projectId`, `highlight`).
5. **`content/projects/*.json`** (14 active files): Structured project records with problem, solution, impact, workflow, stack, links, platforms, and visuals.
6. **`content/journal/*.md`** (1 file: `otdt-solo-deploy.md`): Markdown posts with YAML frontmatter parsed via `gray-matter`.
7. **`content/unknowns.json`**: Incubating/quarantined project entries (`wisdomai`, `grove-vision`, `raia`, `no-shit`, `axa`).

### Competing Sources of Truth & Content Drift
* **Email Address Discrepancy:**
  * `content/profile.json`: `wisdomkinoti@proton.me`
  * `components/ui/terminal.tsx`: `wisdomkinoti@proton.me`
  * `README.md`: `wisdomkinoti001@gmail.com`
  * Git commit history: `wisdomkinoti001@gmail.com`
* **Hardcoded Biography & Experience:** `app/about/page.tsx` hardcodes the `EXPERIENCE` and `CAREER_ARC` arrays inside the page component instead of loading them from a data file.
* **Terminal Hardcoding:** `components/ui/terminal.tsx` contains an embedded in-memory simulated file system (`FS`) and command returns (`projects`, `skills`, `certs`) that are completely disconnected from the JSON loaders in `lib/content/`. For example, the terminal still lists `WisdomAI` as an active project even though it was removed from `content/projects/`.
* **Featured Projects Ordering:** `content/projects/haki.json` has `featured: false` but still holds a residual `featuredOrder: 3`.

---

## 10. Media Inventory

### Complete File Inventory (`public/` and `app/`)
| File Path | Dimensions / Type | Size | Purpose / Usage | Optimization Status |
|---|---|---|---|---|
| `public/brand/kwaix-logo.png` | 300×300 PNG | 39.0 KB | Primary logo mark in Navbar | Uncompressed raster (not vector) |
| `public/icons/kwaix-icon-192.png` | 300×300 PNG | 39.0 KB | PWA icon 192px | Binary duplicate of `kwaix-logo.png` |
| `public/icons/kwaix-icon-512.png` | 300×300 PNG | 39.0 KB | PWA icon 512px | Binary duplicate of `kwaix-logo.png` |
| `app/icon.png` | 300×300 PNG | 39.0 KB | App Router favicon | Binary duplicate of `kwaix-logo.png` |
| `app/apple-icon.png` | 300×300 PNG | 39.0 KB | Apple touch icon | Binary duplicate of `kwaix-logo.png` |
| `public/images/founder.jpeg` | 768×1024 JPEG | 60.7 KB | Photograph of Wisdom Kinoti | Real photo; ready for v3 reuse |
| `public/images/Mr.Roboto/Mr.Roboto Default View.png` | 1920×1080 PNG | **1.93 MB** | Project screenshot for Mr. Roboto | **Severe bottleneck; uncompressed PNG with spaces in filename** |
| `public/screenshots/aegis.svg` | SVG vector | 1.9 KB | Simulated terminal mockup for AEGIS | Vector; reusable |
| `public/screenshots/haki.svg` | SVG vector | 1.6 KB | Simulated terminal mockup for HAKI | Vector; reusable |
| `public/screenshots/otdt.svg` | SVG vector | 2.3 KB | Architecture mockup for OTDT | Vector; reusable |
| `public/screenshots/vulai.svg` | SVG vector | 2.0 KB | Workflow mockup for vulai | Vector; reusable |
| `public/screenshots/wisdomai.svg` | SVG vector | 2.2 KB | Diagram for WisdomAI (Quarantined) | Vector; orphaned |
| `public/wallpaper.svg` | SVG vector | 1.7 KB | Background grid wallpaper | Vector; unreferenced |

### Media Reusability Assessment for v3
1. **Preserve & Reuse:** `public/images/founder.jpeg` is authentic and high quality.
2. **Needs Conversion:** `Mr.Roboto Default View.png` must be converted to WebP/AVIF (should drop from 1.93 MB to <120 KB) and renamed to eliminate spaces in the URI.
3. **Needs Vector Creation:** `kwaix-logo.png` is currently a low-resolution raster. A crisp SVG vector lockup is urgently needed for hero scaling.

---

## 11. Terminal Audit

* **Implementation:** `components/ui/terminal.tsx` (Client component using React state and Framer Motion).
* **Parser:** Simple space-delimited string tokenization (`raw.toLowerCase().split(/\s+/)`).
* **Command Set (25 commands):**
  * *Navigation:* `ls`, `pwd`, `cd` (limited to `~`, `..`, `Documents`, `Downloads`)
  * *Files:* `cat` (reads simulated `FS`), `file`
  * *System:* `uname` (`-a`), `whoami`, `id`, `uptime`
  * *Network:* `ifconfig`, `ip` (`addr`), `ping`
  * *Security:* `nmap` (`-sV`), `whois`
  * *Info:* `ps`, `top`, `env`, `history`, `man`
  * *Portfolio Links:* `projects`, `skills`, `certs`, `contact`
  * *Terminal Controls:* `clear`, `exit`, `help`
* **Functional vs. Decorative:** **Primarily decorative.** Commands simulate Linux outputs (`kOS Rolling 2026.1`), but do not execute real code, trigger actual route changes, or read from live application state.
* **Keyboard & Accessibility:**
  * Focus trap implemented via native keydown event listener.
  * Closes on `Escape` key.
  * Focus returns to trigger button on dismiss.
  * ARIA attributes present: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="kos-terminal-title"`, `role="log"`, `aria-live="polite"`.
* **Mobile Behavior:** Insets dynamically on mobile screens (`inset-4`). However, when the on-screen software keyboard opens on iOS/Android, the viewport height shrinks, frequently pushing the command input behind the virtual keyboard.

---

## 12. `/core` Audit

### Current Status
**Route is intentionally absent and returns a 404.** There is no `app/core/` folder, no navbar link, and no core metadata.

### Ground Truth Context (`docs/plans/core-page-deferred.md`)
`/core` is conceived as the hidden inner layer of KWAIX.dev—revealing the person, operational philosophy, connected technical direction, and execution evidence behind the public record. It is intended to reward intentional exploration (accessed by clicking the KWAIX brand mark rather than a navbar link).

### Prior Failed Attempts & Rationale for Deletion
1. **Attempt One (Centered Card):** Created a standard `max-w-5xl` card in the viewport center. Rejected because on desktop displays (1920px), it created a narrow "letter in the middle of the screen" with 446px of unused whitespace on each side.
2. **Attempt Two (Full-Bleed Dossier Scene):** Expanded to full viewport width with system coordinates, signals, and trace regions. Rejected because it invented a fictional "cyber-dossier" aesthetic rather than executing the spatial geometry requested by Wisdom.
3. **Rollback Decision (2026-07-12):** All code was deleted to prevent compounding technical debt.

### Restart Requirements Before Building v3 Core
* Do **NOT** write code for `/core` without an approved desktop wireframe/sketch.
* Geometry must feature:
  1. Full-width horizontal KWAIX brand mark across the top canvas.
  2. Real human portrait of Wisdom anchored on the left.
  3. Defensible derived metrics anchored beneath the mark.
  4. Career activity summary on the lower right.
  5. Intentional negative space and asymmetric balance.
* Data must be derived directly from `getProjects()` and `getProfile()`, never hardcoded.
* Must include `robots: { index: false, follow: true }`.

---

## 13. SEO & Metadata Audit

### Metadata Configuration
* **Base URL:** `https://kwaix.dev` configured in root `generateMetadata()`.
* **Title Template:** `%s | KWAIX Hub` (default: `KWAIX Hub`).
* **Canonical Alternates:** Present on root, `/projects`, `/about`, `/certs`, `/contact`, `/journal`.
* **OpenGraph & Twitter Cards:** Configured on root, `/projects/[id]`, and `/journal/[slug]`.
* **Dynamic OG Image:** `app/opengraph-image.tsx` generates dynamic 1200×630 cards with Satori using the Edge runtime.
* **Structured Data:** Root layout injects Schema.org JSON-LD with WebSite and Person schemas.

### Pre-existing SEO Issues
1. **Robots Exclusion Oversight:** `app/robots.ts` excludes `/private/`, `/api/`, and `/unknowns`, but fails to exclude `/admin/` or `/sandbox`.
2. **Redundant Post Load:** In `app/sitemap.ts`, `getAllPosts()` is called twice (lines 6 and 54), causing redundant filesystem parsing during sitemap compilation.
3. **Edge Runtime Build Warning:** Next.js build issues a warning: `⚠ Using edge runtime on a page currently disables static generation for that page` due to `export const runtime = 'edge'` in `app/opengraph-image.tsx`.

---

## 14. Responsive & Accessibility Audit

### 1. Repository Observations (Code & Static Structure) [Repository Observation]
* **Layout Structure:** Handled via `.site-shell` (`clamp(1rem, 3vw, 4rem)` padding) and `.reading-measure` (`72ch`).
* **Semantic HTML Landmarks:** Found `<nav>`, `<main id="main-content">`, `<footer>`, `<header>`, `<article>`, and `<section>` throughout all root and detail pages.
* **Skip Link:** Accessible skip link implemented at the top of `RootLayout` targeting `#main-content`.
* **Reduced Motion Declarations:** Global CSS `@media (prefers-reduced-motion: reduce)` block disables animation durations and transitions; `useReducedMotion()` is consumed in `components/ui/terminal.tsx`.
* **Dialog & ARIA Semantics:**
  * Terminal uses `role="dialog"`, `aria-modal="true"`, `aria-labelledby="kos-terminal-title"`, `role="log"`, and `aria-live="polite"`.
  * Mode toggle uses `role="group"` with `aria-pressed` states on each button.
* **Code-Level Deficits:**
  * VisualGallery thumbnail buttons lack unique labels (e.g. `aria-label="Go to visual 1"`).
  * Terminal input field lacks an associated visual or screen-reader `<label>` element (relies solely on `aria-label`).
  * `button.tsx` exists with CVA variants but is never instantiated.

### 2. Executed Verification Results [Executed Verification Result]
* **CSS Compilation:** `app/globals.css` and Tailwind classes compile cleanly under PostCSS without syntax errors.
* **Static HTML Output:** All 21 public pages prerender complete HTML landmark structures in production build without client-only markup voids.
* **HTML Lang & Hydration:** `<html lang="en">` is explicitly set with `suppressHydrationWarning`.

### 3. Issues Requiring Browser Testing & Physical Device Validation [Requires Browser Testing]
* **Mobile Viewport Virtual Keyboard Collision:** When the floating terminal modal is launched on mobile devices (`inset-4`), opening the software keyboard shrinks the viewport height; manual browser testing is required to verify if the input field is obscured by the on-screen keyboard.
* **Touch Momentum & Scrollbar Usability:** `HorizontalTimeline` relies on `-webkit-overflow-scrolling: touch` and a custom 4px scrollbar; physical touch gesture testing is required to verify swipe velocity and axis locking on iOS Safari and Android Chrome.
* **Color Contrast on Real Hardware:** Subtle border tokens (`--border-subtle: rgba(255,255,255,0.05)` in dark mode and `rgba(0,0,0,0.07)` in light mode) and small mono metadata (`text-[9px]`, `text-[10px]` with `--text-muted: #8a8a8a`) need browser contrast verification on budget TN/IPS panels where low-contrast borders may disappear entirely.
* **Screen Reader Announcement Verification:** NVDA/VoiceOver browser testing is required to confirm that the terminal output log (`aria-live="polite"`) announces command results sequentially without stutter or repeating the full history buffer on each keystroke.
* **Roving Tabindex on Horizontal Timeline:** Browser keyboard testing is required to ensure users navigating via `Tab` can reach year nodes and individual project chips without being trapped inside the horizontal scroll area.

---

## 15. Performance & Dependency Audit

### Dependency Analysis
* **Core Dependencies:** Next.js 16, React 18, Tailwind CSS, Framer Motion, Lucide React, Zod.
* **Orphaned / Unused Dependencies:**
  * `@radix-ui/react-slot` (`^1.2.4`): Only imported in `components/ui/button.tsx`, which is never used in the application.
  * `class-variance-authority` (`^0.7.1`): Only imported in `components/ui/button.tsx`.
* **Asset Payload Bottlenecks:**
  * `public/images/Mr.Roboto/Mr.Roboto Default View.png` is **1.93 MB**, representing >85% of total media weight.
  * 5 identical copies of the 39 KB raster icon exist across `app/` and `public/`.
* **Client vs. Server Component Split:**
  * Pages (`page.tsx`, `projects/page.tsx`, `about/page.tsx`, etc.) are Server Components.
  * Interactive controls (`Navbar`, `FeaturedCard`, `HorizontalTimeline`, `VisualGallery`, `Terminal`, `ModeToggle`) are marked `'use client'`.

---

## 16. Technical Debt

### 1. Preserve
* **Zod Content Loaders:** `lib/content/loaders.ts` and `schemas.ts` are robust, strict, and protect the build from malformed content.
* **Hardened OAuth Handshake:** `app/api/auth/` and `app/api/callback/` implement industry-grade PKCE, CSRF tokens, CSP nonces, and token revocation.
* **Accessible Shell Foundation:** Skip link, semantic landmarks, reduced-motion controls, and keyboard handling are well designed.
* **Static Build Pipeline:** Prerendering 31 pages statically in <1 second via Turbopack ensures fast loading and high reliability.

### 2. Rework
* **Terminal Emulator:** Move simulated file system (`FS`) and command definitions to loader-backed content files so terminal data does not drift from actual projects/certs.
* **Design Token Consistency:** Unify hardcoded Tailwind colors (`text-emerald-500`) with custom CSS theme variables (`var(--emerald)`).
* **About Page Content Model:** Extract `EXPERIENCE` and `CAREER_ARC` out of `app/about/page.tsx` and into `content/profile.json` or `content/experience.json`.
* **Timeline Architecture:** Retire unused `TimelineSpine.tsx` / `TimelineEntry.tsx` in favor of a single consolidated timeline component.

### 3. Replace
* **Unused UI Primitives:** Remove `components/ui/button.tsx` or adopt it universally to eliminate ad-hoc button styling.
* **Uncompressed Media:** Replace 1.93 MB PNG with compressed WebP/AVIF.
* **Raster Logo:** Replace low-resolution 300px `kwaix-logo.png` with a scalable SVG vector asset.
* **Broken Lint Script:** Fix `"lint": "next lint"` in `package.json`.

---

## 17. Preserve / Rework / Replace Table

| System / Component | Action | Classification | Rationale & v3 Impact |
|---|---|---|---|
| `lib/content/loaders.ts` & `schemas.ts` | **Preserve** | Architecture | Solid type-safe validation; easily extended for v3 content models. |
| `app/api/contact/route.ts` & Resend | **Preserve** | Backend / API | Clean, serverless, honeypot-protected communication pipeline. |
| `app/api/auth/` & `callback/` | **Preserve** | Security | RFC 7636 PKCE compliant OAuth handshake for Decap CMS. |
| Skip link & reduced motion rules | **Preserve** | Accessibility | High-quality accessibility baseline that meets WCAG standards. |
| `components/ui/terminal.tsx` | **Rework** | Feature / UI | Conceptually central to KWAIX, but needs dynamic loader-backed data. |
| `app/about/page.tsx` hardcoded arrays | **Rework** | Content | Move `EXPERIENCE` and `CAREER_ARC` into Zod-validated JSON files. |
| Tailwind emerald token usage | **Rework** | Design System | Eliminate raw `emerald-500` classes in favor of `var(--emerald)` tokens. |
| `public/images/Mr.Roboto/` screenshot | **Rework** | Performance | Compress 1.93 MB PNG to WebP (<100 KB); normalize filename. |
| `components/projects/TimelineSpine.tsx` | **Replace** | Dead Code | Unused vertical timeline superseded by `HorizontalTimeline.tsx`. |
| `components/ui/button.tsx` | **Replace** | Dead Code | Never used; pulling in `@radix-ui/react-slot` and `cva` needlessly. |
| `package.json` `"lint": "next lint"` | **Replace** | Tooling | Broken under Next.js 16; needs standard ESLint config or replacement. |
| `public/brand/kwaix-logo.png` | **Replace** | Assets | Low-resolution raster inadequate for full-screen hero scaling in `/core`. |

---

## 18. Build, Lint & Test Status

Verification commands executed in order:

### 1. TypeScript Validation (`tsc --noEmit`)
* **Command:** `node_modules/.bin/tsc.cmd --noEmit`
* **Exit Code:** `0` (Success)
* **Output:** Clean pass. No type errors across any route, component, or schema.

### 2. Linting (`npm run lint` / `next lint`)
* **Command:** `node ./node_modules/next/dist/bin/next lint`
* **Exit Code:** `1` (Failed)
* **Error Output:**
  ```text
  Invalid project directory provided, no such directory: Q:\KWAIX\tjowk\lint
  ```
* **Diagnosis:** Next.js 16 CLI no longer bundles `next lint` as a default top-level CLI command without explicit setup. Additionally, neither `eslint` nor `eslint-config-next` is present in `devDependencies`.

### 3. Automated Tests
* **Status:** **No test framework installed.** No test scripts exist in `package.json`, and no `*.test.ts` or `*.spec.ts` files exist in the repository.

### 4. Production Build (`next build`)
* **Command:** `node ./node_modules/next/dist/bin/next build`
* **Exit Code:** `0` (Success)
* **Build Time:** Compiled in 10.9s (Turbopack), page generation completed in 724ms.
* **Generated Static Routes (31 pages):**
  * `○ /` (Static)
  * `○ /about` (Static)
  * `○ /certs` (Static)
  * `○ /contact` (Static)
  * `○ /journal` (Static)
  * `● /journal/otdt-solo-deploy` (SSG)
  * `○ /projects` (Static)
  * `● /projects/[id]` (14 SSG project pages: `aegis`, `ai-athena`, `mr-roboto`, `otdt`, `vulai`, etc.)
  * `ƒ /api/auth`, `/api/callback`, `/api/contact` (Dynamic serverless endpoints)
  * `ƒ /sandbox`, `/unknowns` (Dynamic, development-guarded)
* **Compiler Warning:**
  ```text
  ⚠ Using edge runtime on a page currently disables static generation for that page
  ```
  *(Originating from `app/opengraph-image.tsx`)*

---

## 19. Major Risks for the v3 Redesign

1. **Uncommitted Work Overwrite:** The working tree on branch `ion` has deleted project files (`wisdomai.json`, `grove-vision.json`) and added new untracked components. If an automated git checkout or reset is performed, uncommitted work could be lost.
2. **Premature Implementation of `/core`:** Attempting to build `/core` before receiving an approved desktop wireframe from Wisdom Kinoti will replicate the failures of Attempts 1 and 2.
3. **Data Drift & Desynchronization:** Hardcoding content in components (terminal mock, about experience) will cause public information to drift from JSON records.
4. **Absence of Automated Regression Testing:** Without unit tests or Playwright end-to-end tests, changes to Zod schemas or loaders during v3 could silently break page generation.
5. **Asset Weight Impact on Core Web Vitals:** Uncompressed PNG assets (such as the 1.93 MB screenshot) will severely degrade Largest Contentful Paint (LCP) if featured prominently in v3 hero views.

---

## 20. Recommended Next Phase

### Phase 0: Baseline Protection & Branch Creation (Immediate)
* Commit current Project ION staging updates to branch `ion`.
* Create tag `v2-baseline`.
* Branch to `redesign/kwaix-v3`.

### Phase 1: Planning & Information Architecture Alignment
* Conduct user interview / review on desired v3 aesthetic and narrative direction.
* Resolve status of quarantined workloads (`wisdomai`, `grove-vision`, `ai-athena`).
* Request and review the annotated geometric wireframe for `/core`.

### Phase 2: Design Token & Media System Setup
* Refine design tokens in `globals.css` (harmonized emerald & dark surface HSL scales).
* Convert media assets to WebP/AVIF and acquire vector SVG for the KWAIX mark.
* Clean up orphaned components (`button.tsx`, `TimelineSpine.tsx`).

### Phase 3: Incremental Route-by-Route Redesign
* Execute v3 layouts starting from the global shell (Navbar, Footer, SiteShell).
* Migrate routes in order: `/` → `/projects` → `/about` → `/certs` → `/journal` → `/contact`.

### Phase 4: `/core` Execution & Verification
* Build `/core` strictly against the approved geometric wireframe.
* Run full verification (`tsc`, linting repair, build, accessibility checks).
