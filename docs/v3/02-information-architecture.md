# KWAIX.dev v3 — Information Architecture & Structural Blueprint

**Document:** `docs/v3/02-information-architecture.md`  
**Date:** September 7, 2026  
**Status:** Approved for Baseline Planning  
**Target Platform:** KWAIX.dev (`kwisdomk/tjowk`)  
**Author:** Antigravity AI (Pair Programmer) with Wisdom Kinoti (`φιλόσοφος`)

---

## 1. System Metaphor: The Engineering Operating System

KWAIX.dev v3 organizes its digital presence around the metaphor of a **transparent, highly disciplined technical operating system**:
* The **Shell** is the user environment: keyboard-first, responsive, accessible, with instant visual feedback and operational status telemetry.
* The **Workloads** are the running systems: containerized projects, diagnostic scripts, automation tools, and learning experiments.
* The **Capabilities** are the verified registers: certifications, academic grounding, and technical proficiencies.
* The **Logs & Dispatches** are the field notes: post-mortems, deployment chronicles, and technical learnings.
* The **Signal** is the communications bus: direct, verified, and encrypted channels for collaboration.
* The **Core** is the hidden operational inner layer: blueprint, geometry, and personal context behind the public record (deferred feature).

---

## 2. Navigation Taxonomy & Label Strategy

### Label Comparison & Strategic Alignment
The v2 navigation used raw terminal/systems terminology (`root`, `workloads`, `whoami`, `certifications`, `ping`, `logs`). While technically authentic, terms like `ping` and `logs` occasionally confused technical recruiters and mobile visitors seeking direct contact or deep technical articles.

For v3, we evaluate two naming options and recommend the **Hybrid Engineering Model**:

| Section / Destination | v2 Label | v3 Option A (Strict Terminal) | v3 Option B (Standard Web) | **v3 Recommended (Hybrid Model)** | Accessibility `aria-label` |
|---|---|---|---|---|---|
| Homepage | `root` | `root` | `Home` | **`System` / `Root`** | `System Overview` |
| Projects & Builds | `workloads` | `workloads` | `Projects` | **`Workloads`** | `Engineering Workloads` |
| Biography & Philosophy | `whoami` | `whoami` | `About` | **`Identity` / `Operator`** | `Operator Identity` |
| Certifications & Credentials | `certifications` | `certs` | `Credentials` | **`Credentials`** | `Capability Register` |
| Field Notes & Articles | `logs` | `logs` | `Journal` | **`Research` / `Dispatches`** | `Technical Dispatches` |
| Contact & Communication | `ping` | `ping` | `Contact` | **`Signal`** | `Direct Communication` |

### Primary Navigation Bar Composition
The v3 Navbar preserves the top fixed bar (`h-14` / `3.5rem`), blurred surface, and fluid `.site-shell` gutters, displaying:
1. **Left Brand Mark:** Scalable KWAIX monogram linking to `/` (and serving as the hidden click target for `/core` once approved).
2. **Center Desktop Links (6 items):**
   * `/` → `Root`
   * `/projects` → `Workloads`
   * `/about` → `Identity`
   * `/certs` → `Credentials`
   * `/journal` → `Dispatches`
   * `/contact` → `Signal`
3. **Right Controls:**
   * Live Uptime Pill (`pulse-dot` + `ACTIVE`) backed by `content/status.json`.
   * Accessible 3-way Theme Toggle (Light / System / Dark).
   * Mobile Hamburger Menu button with full-screen slide/fade overlay.

---

## 3. Explicit Old-to-New Route Map

The following map governs the structural evolution from v2 to v3:

| v2 URL | v3 URL | Status | Layout Pattern | Content Source | Changes & Migration Rules |
|---|---|---|---|---|---|
| `/` | `/` | **Retained** | Root `site-shell` | `profile.json`, `status.json`, `projects/*.json` | Reorganize hero: emphasize identity, telemetry, current focus, and premier case-study preview. |
| `/projects` | `/projects` | **Retained** | Root `site-shell` | `getFeaturedProjects()`, `getTimeline()` | Introduce phase filters (Systems, Production, Exploration); refine horizontal timeline with roving tabindex. |
| `/projects/[id]` | `/projects/[id]` | **Retained** | Immersive Case Study | `content/projects/{id}.json` | Upgrade layout: full artifact viewer, problem/solution/architecture breakdown, multi-OS badges, live repository links. |
| `/about` | `/about` | **Retained** | Root `site-shell` | `profile.json` + *new* `content/experience.json` | Extract hardcoded `EXPERIENCE` and `CAREER_ARC` out of page file; feature `OperatorPortrait` with authentic founder photo. |
| `/certs` | `/certs` | **Retained** | Root `site-shell` | `content/certs.json` | Capability register: separate into Complete, In-Progress, and Planned tracks with verified Credly link badges. |
| `/contact` | `/contact` | **Retained** | Root `site-shell` | `profile.json` + Resend API | Modernized signal layer: verified PGP / GitHub / LinkedIn channels + honeypot-protected direct message form. |
| `/journal` | `/journal` | **Retained** | Root `site-shell` | `content/journal/*.md` | Clean field notes index with reading time, tag pills, and chronological numbering. |
| `/journal/[slug]` | `/journal/[slug]` | **Retained** | Reading Measure (`72ch`) | `content/journal/{slug}.md` | Editorial prose layout with code syntax highlighting, copy-code buttons, and back-to-dispatches navigation. |
| `/unknowns` | `/unknowns` | **Retained (Internal)** | Isolated Dev HUD | `content/unknowns.json` | Strictly dev-only incubator staging; hard 404 in production via runtime killswitch. |
| `/sandbox` | `/sandbox` | **Retained (Internal)** | Isolated Dev Scene | Standalone component | Test scene for `SingularityPortrait`; hard 404 in production. |
| `/admin` | `/admin` | **Retained (Internal)** | Decap CMS SPA | GitHub commit API via OAuth PKCE | Exclude explicitly from `robots.txt` and `sitemap.ts`. |
| `/_not-found` | `/_not-found` | **Retained** | Centered Terminal Box | Hardcoded simulated response | Retain terminal-style 404 with home return action. |
| `/core` | `/core` | **Deferred** | Fullscreen Canvas | `docs/plans/core-page-deferred.md` | Returns 404 until desktop wireframe is signed off by Wisdom Kinoti. |

---

## 4. Canonical Content Models & Data Sources to Retain

To eliminate the data drift identified in the technical audit, v3 establishes strict **single sources of truth**:

```text
content/
├── profile.json            ← Canonical identity, handles, location, tagline, philosophy
├── status.json             ← Operational status, current machine, uptime, last updated
├── certs.json              ← Capability register (complete, in-progress, planned)
├── timeline.json           ← Chronological milestone and build history (2024 → present)
├── experience.json         ← [NEW] Extracted career arc and employment/infrastructure background
├── unknowns.json           ← Quarantined R&D projects failing the 5-point threshold
├── projects/               ← Active public projects (14 verified JSON files)
│   ├── mr-roboto.json      ← [PREMIER CASE STUDY] Multi-platform media downloader
│   ├── aegis.json          ← Stateless PowerShell forensic diagnostics
│   ├── vulai.json          ← Open-source LinkedIn optimization framework
│   └── ... (11 other active project records)
└── journal/                ← Technical field notes in Markdown
    └── otdt-solo-deploy.md ← Enterprise infrastructure field note
```

### Data Sanitation & Schema Rules
1. **Email Standardization:** The canonical email is defined in `content/profile.json` (`wisdomkinoti@proton.me`). The terminal, footer, and contact page must read this token dynamically; no hardcoded addresses are permitted.
2. **Experience Extraction:** `EXPERIENCE` and `CAREER_ARC` arrays currently hardcoded inside `app/about/page.tsx` will be migrated into a Zod-validated `content/experience.json` schema.
3. **Dynamic Terminal Data:** `components/ui/terminal.tsx` must consume project names, skills, and certs from the Zod loaders (`getProjects()`, `getCerts()`) rather than maintaining its own disconnected static mock array.

---

## 5. Quarantined Content Architecture

### The Quarantine Staging Buffer (`content/unknowns.json`)
Projects that do not meet the **5-Point Portfolio-Ready Threshold** are isolated from public routes:

```text
[Idea / Experiment]
        ↓
Does it have public sanitized code, runnable script, test proof, visual evidence, and clear narrative?
        ↓
   NO → Quarantine in content/unknowns.json (Accessible only at localhost:3000/unknowns)
        ↓
  YES → Promote to content/projects/*.json (Published on public /projects and timeline)
```

### Quarantined Items Inventory
* **WisdomAI (`wisdomai`):** Multi-agent WhatsApp triage. Quarantined until public sanitized repository and test reproduction harness are available.
* **Grove Vision AI V2 (`grove-vision`):** Edge computer vision. Quarantined until on-device deployment scripts and photographic/video operational proof are documented.
* **Raphael (`raia`):** Local assistant prototype on Athena. Held in R&D staging.
* **No-Shit (`no-shit`):** Zero-dependency CLI utility. Held in concept phase until cross-platform scripts are consolidated.
* **AxA (`axa`):** Experimental agentic workflow. Held in concept phase.

---

## 6. The `/core` Interface Architecture (Deferred Feature)

### Strategic Role
`/core` is the hidden operational dossier of KWAIX.dev—intended to feel like opening a system blueprint, engineering notebook, or personal archive. It is not an unguided secret, but rewards deliberate exploration.

### Architectural & Access Rules (Per `docs/plans/core-page-deferred.md`)
1. **Route State:** `/core` must strictly return a `404` until the new visual geometry is approved.
2. **Access Point:** When implemented, `/core` will be accessed by clicking the primary KWAIX brand mark in the navbar, **not** as a standard navigation link.
3. **Return Control:** Must provide an explicit, visible exit control (e.g. `Return to public interface`).
4. **SEO & Indexing:** Configured with `robots: { index: false, follow: true }`.

### Geometric Pre-conditions for Third Implementation
Previous implementations were rejected because:
* Attempt 1 used a narrow `max-w-5xl` card with large dead space.
* Attempt 2 invented a fictional "cyber-dossier" aesthetic.

Before any code is written for v3 Core, an approved low-fidelity desktop wireframe must demonstrate:
* Viewport-wide canvas utilization without letterboxing.
* Top area dominated by the full horizontal KWAIX brand mark.
* Authentic human portrait of Wisdom anchored on the left.
* Derived, defensible metrics anchored beneath the mark (number of projects, span of record, active systems).
* Career activity summary on the lower right.
* Asymmetric visual balance and intentional negative space.

---

## 7. Page-by-Page Composition Specifications

### 1. Root (`/`) — System Overview
* **Identity Block:** Clean typography featuring name, alias (`φιλόσοφος`), sub-roles, and location/timezone telemetry.
* **Operational Status:** Live status card displaying current focus, secondary operations, machine (`Athena`), and uptime.
* **Featured Workloads Showcase:** High-impact cards for verified systems, leading with the **Mr. Roboto** premier case study.
* **Quick Navigation Matrix:** Direct links to Workloads, Credentials, Identity, and Signal.

### 2. Workloads (`/projects`) — Build History
* **Header & Scope:** Clear declaration of projects, experiments, and summarized private work.
* **Filter Matrix:** Quick toggles for categories (`Tools`, `AI`, `Security`, `Infra`, `Automation`) and phases (`Production`, `Systems`, `Exploration`).
* **Featured Showcase:** Expandable `FeaturedCard` components with architecture diagrams and P/S/I breakdowns.
* **Horizontal Timeline:** Chronological interactive timeline (2024 → present) with horizontal scroll and year expansion nodes.

### 3. Workload Detail (`/projects/[id]`) — Deep-Dive Case Study
* **Header Telemetry:** Category, Phase, Status badge, Date, and multi-OS platform compatibility tags (Windows stable, Linux beta).
* **Engineering Artifact Inspection:** `VisualGallery` featuring high-resolution screenshots and architecture SVGs with full-screen lightbox modal.
* **P/S/I Grid:** Structured sections for The Problem, The Solution, and The Result/Impact.
* **AI-Assisted Workflow Transparency:** Dedicated section describing pair-programming methods, testing rigor, and human maintenance boundaries.
* **Tech Stack & Repositories:** Categorized technology pills, direct GitHub repository links, and direct script download links.

### 4. Identity (`/about`) — Operator Context
* **Header with Operator Portrait:** Left-aligned identity narrative paired with `OperatorPortrait` displaying the authentic founder photograph.
* **Experience & Foundation:** Verified operational tracks (i3 Technologies, Infrastructure Operations, Zetech University) loaded from canonical JSON.
* **On φιλόσοφος:** Genuine philosophical disposition: understanding systems deeply over using them quickly.
* **Career Direction:** Phased progression (Phase 1: Technical Depth → Phase 2: Growth & Specialization).

### 5. Credentials (`/certs`) — Capability Register
* **Structure:** Separated into three transparent sections:
  1. *Complete:* Verified certifications with Credly links (IBM QRadar SIEM L2, L3, Anthropic Claude 101).
  2. *In Progress:* Active candidate tracks with target exam dates (ISC2 CC Sep 2026, CompTIA Security+, RHSA I).
  3. *Planned:* Future technical milestones (OSCP, CySA+).
* **Badge Primitives:** High-contrast status chips displaying verification links and issuing organizations.

### 6. Signal (`/contact`) — Direct Communication
* **Direct Channels:** Direct email link, GitHub profiles (`kwisdomk`, `6ofHertz`), and LinkedIn (`kwaix`).
* **Message Transmission:** Honeypot-guarded contact form connected to `/api/contact` delivering directly to Wisdom's inbox via Resend.
* **Security Notice:** Clear statement of availability for serious technical collaborations.

### 7. Research & Dispatches (`/journal` & `/journal/[slug]`)
* **Index (`/journal`):** Chronologically numbered dispatches (e.g. `01`, `02`) with date, tag, and summary.
* **Post Reader (`/journal/[slug]`):** Editorial reading layout adhering to the `72ch` reading measure, featuring syntax-highlighted code blocks, blockquotes, and return navigation.

---

## 8. Proposed Git Preservation & Clean Checkout Strategy

*Note: This sequence is proposed for user review and will not be executed automatically.*

```powershell
# 1. Stage and commit the in-progress Project ION changes on branch 'ion'
git add .
git commit -m "checkpoint(ion): stage Project ION quarantine HUD, founder portrait, and content updates"

# 2. Tag the clean v2 baseline
git tag -a v2-baseline -m "KWAIX.dev v2 baseline snapshot before v3 redesign"

# 3. Create and switch to the dedicated v3 redesign branch
git checkout -b redesign/kwaix-v3

# 4. Verify that the working directory is clean and ready for Phase 1
git status
```

This ensures full historical continuity, protects in-progress staging experiments, and isolates the v3 redesign cleanly.
