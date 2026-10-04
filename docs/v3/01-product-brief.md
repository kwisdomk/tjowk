# KWAIX.dev v3 — Product Brief & Strategic Specification

**Document:** `docs/v3/01-product-brief.md`  
**Date:** September 7, 2026  
**Status:** Approved for Baseline Planning  
**Target Platform:** KWAIX.dev (`kwisdomk/tjowk`)  
**Author:** Antigravity AI (Pair Programmer) with Wisdom Kinoti (`φιλόσοφος`)

---

## 1. Executive Summary & North Star

KWAIX.dev is the canonical digital presence and technical operating system of **Wisdom Kinoti** (`φιλόσοφος`), a Junior Cybersecurity Analyst, CS student, and practical systems builder based in Nairobi, Kenya.

### The North Star
> **"Transform KWAIX.dev from a technically correct portfolio into a premium, evidence-first engineering platform that proves capability, systems discipline, and technical progression."**

KWAIX.dev v3 is not a generic personal website, a vanity resume, or a visual template. It is an **authentic technical record**. Every claim must be supported by inspectable evidence: code repositories, executable scripts, architecture diagrams, verified credentials, real screenshots, and reproducible field notes.

---

## 2. Background & Strategic Context

### Evolution from v2 to v3
* **v1 (Initial Build):** Early experiments, foundational web presence.
* **v2 ("The Journey" / Current Base):** Established the data-driven architecture using Next.js 16, TypeScript, Zod loaders, and the Linux-inspired terminal metaphor (`kOS`). While structurally functional, v2 accumulated technical debt:
  * Competing sources of truth between JSON files and hardcoded components.
  * Incomplete project claims without public sanitized code.
  * Two failed visual attempts at the `/core` interface resulting in feature deferral.
  * Broken linting scripts in Next.js 16.
  * Heavy uncompressed media payload (1.93 MB screenshot).
* **Project ION (Internal Staging):** Initiated to establish an "Evidence Over Aesthetics" charter, introduce a dev-only quarantine HUD (`/unknowns`), and integrate an authentic operator photograph (`public/images/founder.jpeg`).
* **v3 Objective:** Execute a disciplined, phased redesign that unifies the visual language, eliminates data drift, establishes clean evidence thresholds for featured projects, and delivers a blisteringly fast, accessible web application.

---

## 3. Target Audiences & User Personas

| Persona | Role / Context | What They Look For | How KWAIX v3 Wins |
|---|---|---|---|
| **1. Technical Recruiter & Talent Partner** | Sourcing for Junior SOC Analysts, Security Engineers, and Cloud Infrastructure roles in East Africa and globally. | Clear role classification, verified certifications (QRadar, ISC2 CC, CompTIA), location/availability, and contact routes. | Immediate identity clarity in hero view; scannable credentials register with Credly verification; direct signal form with instant Resend confirmation. |
| **2. Senior Security Architect & Engineering Lead** | Technical interviewers evaluating depth, honesty, and problem-solving methodology. | "Can this person actually think through failure?" Wants to see real architectures, stateless diagnostic tools, hands-on Linux/SIEM exposure, and authentic technical constraints. | Deep-dive case studies (e.g. Mr. Roboto, AEGIS); transparent P/S/I (Problem, Solution, Impact) breakdowns; AI-assisted development workflow disclosures; absence of buzzwords. |
| **3. Peer Builder & Open-Source Collaborator** | Fellow developers and students in AI, cybersecurity, and automation. | Practical tools, terminal utilities, prompt frameworks, and field notes they can learn from or run locally. | Direct GitHub repository links; runnable scripts (PowerShell / Bash); technical dispatches in `/journal`; interactive terminal experience. |
| **4. Academic & Industry Evaluator** | Zetech University assessors, IBM program mentors, conference organizers (e.g. EAAAIW). | Structured technical progression, adherence to ethics, and evidence of applied coursework. | Chronological project timeline (2024 → present); verified bootcamp and academic milestones; clear separation of completed vs. planned capabilities. |

---

## 4. Core Product Philosophy & Preserved Decisions

### The Core Decision Test (from Project ION Charter)
Whenever evaluating an architectural, layout, or visual design decision, the team must ask:
> **"Does this make the engineering evidence clearer?"**  
> * If **yes** → Keep it and refine it.  
> * If it is **only prettier** → Question it, simplify it, or discard it.

### Preserved Project ION Decisions
1. **Evidence Over Aesthetics:** Design serves clarity and credibility. No decorative filler or fictional "cyber" HUD animations.
2. **Media as Documentation:** Screenshots, diagrams, and terminal recordings are engineering artifacts that validate claims.
3. **Hierarchy Over Density:** Information-rich technical content must be structured with deliberate typographical hierarchy and generous spacing rhythm.
4. **Motion Serves Understanding:** Subtle micro-interactions only; complete respect for `prefers-reduced-motion`.
5. **Authentic Human Imagery:** Preserve and feature the authentic founder photograph (`public/images/founder.jpeg`) in the operator section via `OperatorPortrait`.
6. **Hardened Backend Infrastructure:** Preserve the RFC 7636 PKCE OAuth implementation (`/api/auth`, `/api/callback`) and Resend email handling (`/api/contact`).
7. **Strict Privacy Boundaries:**
   * Private CV and employer infrastructure specifics must **never** be committed or exposed.
   * Enterprise work (such as OTDT MAS 9.1 deployment) remains strictly summarized.
   * No unsupported career or outcome claims.

### Quarantined Content Policy
Per `content/unknowns.json` and the Project ION charter, projects failing the **5-Point Portfolio-Ready Threshold** are strictly quarantined and barred from public `/projects` and `content/timeline.json`:
* **5-Point Threshold:**
  1. Public, sanitized GitHub repository with clear setup instructions.
  2. Inspectable, runnable code or deployment script in the workspace.
  3. Documented, reproducible test cases or telemetry.
  4. Photographic, video, or diagrammatic proof of real execution.
  5. Clear, defensible problem/solution narrative without speculative AI claims.
* **Currently Quarantined Workloads:**
  * `wisdomai`: Quarantined due to missing public repo and unverified 78 test cases claim.
  * `grove-vision`: Quarantined due to early hardware phase without inspectable scripts or media proof.
  * `raia`, `no-shit`, `axa`: Held in dev R&D status until functional prototypes mature.

### Unresolved Strategic Decisions & Design Gates
1. **Navigation Terminology:** Final decision pending between purely technical labels (`root`, `workloads`, `whoami`, `certifications`, `ping`, `logs`) versus industry-standard hybrid labels (`Home`, `Workloads`, `Identity`, `Credentials`, `Signal`, `Research`).
2. **Terminal Role:** Decision required whether the floating terminal should remain a purely decorative mock or be upgraded into a functional client CLI that executes genuine site navigation and content filtering.
3. **`/core` Design Approval:** The `/core` feature remains paused until Wisdom Kinoti provides an annotated desktop wireframe.

---

## 5. Launch Scope & Phased Implementation

### In Scope (v3 Baseline Deliverables)
* **Design Token & Global Shell Upgrade:** Harmonized dark/light palette, responsive site shell, fluid container gutters, accessible contrast, and skip-link landmarks.
* **Consolidated Data Layer:** Unified Zod schemas with zero component-level data drift (moving hardcoded `about` experience arrays into JSON).
* **Workloads Index & Deep-Dive:** Filterable project catalog with live status pills, platform compatibility tags, and dedicated case-study layout.
* **First Complete Case Study:** Full case-study implementation of **Mr. Roboto** featuring real screenshot artifacts, code links, and AI-assisted workflow transparency.
* **Capability Register (`/certs`):** Structured, verified credentials display with Credly badges and transparent status (complete, in-progress, planned).
* **Research / Journal:** Markdown dispatch reader with syntax highlighting, metadata headers, and reading-measure prose.
* **Hardened Signal Route (`/contact`):** Verified direct communication links and honeypot-guarded contact form with Resend integration.
* **Tooling Repair:** Replacement of broken `next lint` with a configured ESLint standard; TypeScript strictness maintenance.

### Out of Scope / Explicitly Deferred
* Re-implementing `/core` during initial phases (deferred until wireframe gate is met).
* Introducing external relational databases (Supabase, PostgreSQL) — site remains file-driven.
* Building custom analytics engines — Vercel Analytics and Speed Insights remain the standard.
* Adding complex authentication gates to public pages.

---

## 6. Featured Project Evidence Inventory & Recommendation

### Project Evidence Inventory

| Project Codename | Category / Status | Public Repo Evidence | Visual Artifacts | Execution Scripts | Verification Verdict |
|---|---|---|---|---|---|
| **Mr. Roboto** | Automation / Maintained | `kwisdomk/Mr.Roboto` (Active) | 1920×1080 Real Screenshot (`Mr.Roboto Default View.png`) | `roboto.ps1` (Windows), `roboto.sh` (Linux) | **Complete & Verified** |
| **AEGIS** | Tools / Active | `kwisdomk/aegis` (Active) | Simulated SVG terminal diagram (`aegis.svg`) | PowerShell diagnostic script | Moderate (Needs real console recording) |
| **vulai** | Tools / Active | `kwisdomk/vulai` (Active) | Simulated SVG diagram (`vulai.svg`) | Markdown prompt framework | Moderate (Prompt framework only) |
| **OTDT** | Infra / Paused | Private enterprise work | Simulated SVG diagram (`otdt.svg`) | MAS 9.1 / OpenShift ROKS | Summarized Only (Strict privacy constraint) |
| **HAKI** | AI / Paused | `kwisdomk/haki` (Hackathon) | Simulated SVG diagram (`haki.svg`) | Team prototype | Legacy (DevDay 2026 hackathon) |
| **ai-athena** | Exploration / Active | Local workstation only | None | Local Ollama / CUDA configs | Early R&D (No public artifacts) |

### Case Study Recommendation: Mr. Roboto
**Mr. Roboto** is the primary recommendation for the first complete v3 case study.

**Rationale:**
1. **Concrete Engineering Proof:** It has a verified public GitHub repository (`kwisdomk/Mr.Roboto`) with dual platform support (Windows PowerShell launcher and native Linux Bash launcher).
2. **Authentic Visual Artifact:** It possesses a genuine, full-resolution screenshot (`public/images/Mr.Roboto/Mr.Roboto Default View.png`) showing actual terminal output, option menus, and dependency validation.
3. **Mature Engineering Narrative:** The project documents genuine engineering progression: moving from risky media download websites to a safe, controlled local terminal workflow using `yt-dlp` and `FFmpeg`.
4. **AI-Assisted Workflow Transparency:** It provides a clear, defensible example of pair-programming with AI while maintaining human maintainer judgment, edge-case testing, and code hygiene.

---

## 7. Measurable Acceptance Criteria

To ensure KWAIX.dev v3 meets production standards, the build must pass the following verifiable gates:

### 1. Performance & Core Web Vitals
* **Google Lighthouse (Desktop):** Performance ≥ 95, Accessibility = 100, Best Practices = 100, SEO = 100.
* **Core Web Vitals:**
  * Largest Contentful Paint (LCP) < 1.5s
  * Cumulative Layout Shift (CLS) < 0.05
  * Interaction to Next Paint (INP) < 100ms
* **Payload Limits:** Initial JS bundle transfer size < 180 KB; total initial page payload < 500 KB on all public routes.
* **Media Optimization:** All raster images converted to WebP/AVIF format; no single image asset exceeding 150 KB.

### 2. Code Quality & Build Verification
* **TypeScript:** `tsc --noEmit` exits with code `0` and zero type warnings.
* **Linting:** ESLint configured and passing with zero errors and zero warnings.
* **Production Build:** `next build` completes with Turbopack in < 15 seconds, successfully generating all static and dynamic routes.

### 3. Accessibility & Usability (WCAG 2.1 AA)
* Complete keyboard navigability: focus indicators visible on every interactive element with zero focus traps.
* Working skip link (`#main-content`) on every page.
* Color contrast ratio ≥ 4.5:1 for normal text and ≥ 3:1 for large text across both light and dark themes.
* Full support for `prefers-reduced-motion` disabling non-essential transitions and animations.

### 4. Content Integrity
* Zero data drift: no hardcoded email addresses, outdated project lists, or conflicting status claims across components.
* All public project cards link to valid repositories or explicit case-study subpages.
* `/unknowns` and `/sandbox` strictly return 404 in production environments.
* `/core` strictly returns 404 until wireframe sign-off.

---

## 8. Proposed Git Preservation & Checkout Strategy

*Note: This strategy is proposed for future execution upon user instruction. No Git operations are executed at this stage.*

### Problem Statement
The current repository working tree on branch `ion` contains 16 modified/deleted files and 7 untracked directories. Direct switching of branches (`git checkout main` or `git checkout -b redesign/kwaix-v3`) risks file collision, untracked file loss, or merge conflicts.

### Proposed 4-Step Execution Sequence

```powershell
# Step 1: Checkpoint current Project ION uncommitted work on branch 'ion'
# Captures all current modifications, deletions (quarantined projects), and untracked files safely.
git add .
git commit -m "checkpoint(ion): stage Project ION quarantine HUD, founder portrait, and content updates"

# Step 2: Establish the permanent pre-v3 baseline tag
# Tags the exact commit as the reference baseline before any v3 changes occur.
git tag -a v2-baseline -m "KWAIX.dev v2 baseline snapshot before v3 redesign"

# Step 3: Create and switch to the official v3 redesign branch
# Isolates all v3 design system, component, and page changes on a dedicated branch.
git checkout -b redesign/kwaix-v3

# Step 4: Verify working tree cleanliness
git status
# Expected output: On branch redesign/kwaix-v3, nothing to commit, working tree clean
```

This procedure guarantees zero data loss, preserves the experimental Project ION changes on its own branch, and establishes a clean, auditable starting point for the v3 redesign.
