# Chapter 4: Pages

> *"A web page is not a document; it is an interactive viewport into a structured system."*

---

## 1. Purpose

This chapter documents every page and route in KWAIX.dev. It explains what each route displays, where its code lives, what data sources it reads, what components it renders, and how it handles SEO metadata.

---

## 2. Route Matrix

| Route | File Path | Type | Primary Data Source | Purpose |
|---|---|---|---|---|
| **Root Shell** | `app/layout.tsx` | Layout | `content/profile.json`, `status.json` | Global frame, fonts, ThemeProvider, Navbar, Footer, Terminal |
| `/` | `app/page.tsx` | Static Page | `profile.json`, `status.json`, `projects/*.json` | Transmission (Hero, live status, featured builds preview) |
| `/projects` | `app/projects/page.tsx` | Static Page | `projects/*.json`, `timeline.json` | Operations Log (Featured systems + full timeline history) |
| `/projects/[id]` | `app/projects/[id]/page.tsx` | Dynamic SSG | `content/projects/[id].json` | Deep-dive case study with architecture, problem, solution, & code links |
| `/about` | `app/about/page.tsx` | Static Page | `content/profile.json` | The Operator narrative, career arc, workstation specs, philosophy |
| `/certs` | `app/certs/page.tsx` | Static Page | `content/certs.json` | Capability register (complete, in-progress, planned credentials) |
| `/contact` | `app/contact/page.tsx` | Static Page | `content/profile.json` | Signal layer (direct email, verified keys, PGP, Resend contact form) |
| `/journal` | `app/journal/page.tsx` | Static Page | `content/journal/*.md` | Dispatches index (engineering field notes and research write-ups) |
| `/journal/[slug]` | `app/journal/[slug]/page.tsx` | Dynamic SSG | `content/journal/[slug].md` | Full article view with prose typography and syntax highlighting |
| `404` | `app/not-found.tsx` | Error Page | None | "Process Terminated" system error page with terminal prompt |

---

## 3. Deep Dive into Each Page

---

### A. Root Layout (`app/layout.tsx`)

#### What it is:
The Root Layout is the **outer frame** of the entire application. Every page sits inside it. It never re-renders when navigating between pages.

#### What it does:
1. Loads the **Geist** and **Geist Mono** web fonts.
2. Injects global CSS (`app/globals.css`).
3. Wraps the site in the `ThemeProvider` to enable dark/light mode.
4. Renders the top `Navbar` and bottom `Footer`.
5. Renders the floating `TerminalButton` and interactive `Terminal` modal.
6. Sets global HTML metadata (page title, description, keywords, OpenGraph card, Twitter cards, favicon).

---

### B. Transmission / Homepage (`app/page.tsx`)

#### Route: `/`
#### Purpose:
To provide an immediate, authoritative view of who Wisdom is, what he is currently building, and his primary engineering achievements.

#### Layout Sections:
1. **`IdentityBlock`**: Top hero section displaying name, Greek alias (`φιλόσοφος`), sub-role tags, location/timezone, tagline quote, and social buttons.
2. **`CurrentOps`**: Terminal-styled card displaying live operational status, secondary study task, workstation name (`Athena`), and active uptime indicator.
3. **Featured Systems Preview**: A curated grid of the top engineering builds (OTDT, WisdomAI, HAKI, vulai) loaded via `getFeaturedProjects()`.
4. **Navigation Matrix**: Quick links to deep dive into `/projects`, `/certs`, `/about`, and `/contact`.

---

### C. Operations Log / Workloads (`app/projects/page.tsx`)

#### Route: `/projects`
#### Purpose:
The master engineering registry. Contains two simultaneous layers of evidence:

```
┌──────────────────────────────────────────────────────────┐
│ LAYER A: Featured Workloads (Top Grid)                   │
│ High-fidelity cards with Problem / Solution / Impact     │
├──────────────────────────────────────────────────────────┤
│ LAYER B: Timeline Spine / Horizontal Matrix (Bottom)     │
│ Chronological proof of all builds, coursework, and labs  │
└──────────────────────────────────────────────────────────┘
```

#### Key Components:
- **`FeaturedCard`**: Detailed cards for flagship builds.
- **`HorizontalTimeline`** & **`TimelineSpine`**: Full timeline from 2024 to present day.

---

### D. Workload Deep-Dive (`app/projects/[id]/page.tsx`)

#### Route: `/projects/[id]` (e.g. `/projects/otdt`)
#### Purpose:
An exhaustive case study for a specific engineering workload.

#### What it displays:
- Codename (e.g., `MAS-MAS9`), Category tag, Maturity phase badge, Status badge.
- Tagline & Executive summary.
- **Platform Badges**: Live indicators of supported platforms (e.g., `Linux: stable`, `Windows: beta`).
- **`VisualGallery`**: Interactive visual gallery for architecture diagrams and terminal captures.
- **Three-Pillar Analysis**: Structured sections for *The Problem*, *The Solution*, and *Impact & Results*.
- **Workflow Section**: Explicit explanation of how AI tools and humans paired to design and test the workload.
- **Tech Stack Chips**: Filterable tag list.
- **External Action Links**: Direct links to GitHub repositories, live deployments, and installation scripts.

#### Static Generation (`generateStaticParams`):
During build time, Next.js calls `getProjects()` and pre-renders static HTML for all 16 projects automatically.

---

### E. The Operator / About (`app/about/page.tsx`)

#### Route: `/about`
#### Purpose:
Presents the human, philosophy, and background behind the code without corporate fluff.

#### Sections:
1. **Background & Infrastructure Roots**: Moving from hardware, network operations (Kenya Power, RK Shah, Close the Gap), and Linux systems into cybersecurity and AI.
2. **Three-Phase Career Arc**:
   - *Phase 1 (Now):* Technical Depth (ISC2 CC, Security+, CEH, IBM i3, hands-on SOC/infrastructure).
   - *Phase 2 (Mid):* Offensive & Defensive Mastery (OSCP, CySA+, CASP+, senior analyst).
   - *Phase 3 (Long-term):* Executive Leadership (CISSP, CISM, ISO 27001 Lead Implementer, CISO).
3. **The Machine (Athena)**: Workstation specs, OS configurations, and toolchain.

---

### F. Credentials Register (`app/certs/page.tsx`)

#### Route: `/certs`
#### Purpose:
Verified capability register proving continuous technical learning.

#### Sections:
1. **Completed Credentials**: Displays score (e.g. `100%`, `88%`), issue date, and direct Credly verification badge links.
2. **In-Progress Tracks**: Displays current study chapter (e.g. `RHSA I ~46% Ch9`) and target exam deadline.
3. **Planned Roadmap**: Upcoming industry certifications.

---

### G. Signal / Contact (`app/contact/page.tsx`)

#### Route: `/contact`
#### Purpose:
Secure and direct communication portal.

#### What it contains:
- Copy-to-clipboard direct email button.
- Direct links to GitHub and LinkedIn profiles.
- Verified PGP key / encryption fingerprints (for secure disclosure).
- **`ContactForm`**: Client-side form protected by honeypot spam detection and backed by the Resend email API.

---

### H. Dispatches / Journal (`app/journal/page.tsx` & `[slug]`)

#### Route: `/journal` and `/journal/[slug]`
#### Purpose:
Engineering field notes, post-mortems, and technical write-ups.

#### How it works:
1. Reads all Markdown files from `content/journal/*.md`.
2. Sorts them in descending chronological order by date.
3. Renders clean, high-readability typography using the `.journal-prose` styling class.

---

### I. 404 Process Terminated (`app/not-found.tsx`)

#### Route: Any invalid URL
#### Purpose:
Custom error view styled like a terminated Unix terminal process with a direct link back to `/`.

---

## 4. Common Mistakes

- **Mistake:** Hardcoding metadata strings inside page components instead of using the `generateMetadata` function.  
  *Fix:* Export a dedicated `generateMetadata()` function from the page file so Next.js can generate correct SEO tags dynamically.
- **Mistake:** Creating a new page folder without a `page.tsx` file inside it.  
  *Consequence:* Next.js will not recognize the route and will return a 404 error.

---

## 5. Related Chapters

- [Chapter 2: Architecture](02-architecture.md) — How the App Router works.
- [Chapter 5: Components](05-components.md) — Detailed documentation of components used on these pages.
- [Chapter 9: SEO & Infrastructure](09-seo-and-infra.md) — Metadata and OpenGraph image handling.
