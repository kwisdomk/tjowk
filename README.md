# The Journey — v2.0
**Operator**: Wisdom Kinoti
**Role**: Junior Cybersecurity Analyst | CS Student | IBM i3 Intern
**Location**: Nairobi, Kenya

A personal, modular operational log built with Next.js 16, Tailwind CSS, and Framer Motion.
This is not a template.

---

## Architecture & Design (v2.0)

### Data-Driven Architecture (`lib/content/`)
The UI is strictly separated from the data. All content lives in typed TypeScript files:
- `projects.ts` — The operational log (active and archived systems)
- `certs.ts` — The capability register
- `timeline.ts` — Chronological history
- `profile.ts` & `status.ts` — Centralized identity and current status

### Multi-Page Routing
- `/` — **System**: Identity and compact operations preview
- `/projects` — **Operations Log**: Featured systems and chronological timeline
- `/certs` — **Credentials**: Acquired and pending capabilities
- `/about` — **The Operator**: Context and approach
- `/contact` — **Signal**: Resend-powered secure contact form
- `/journal` — **Journal**: Field notes and thinking (coming)

### kOS Terminal
A globally available interactive terminal (`wisdom@kOS:~$`) with simulated Linux commands
and portfolio-specific commands (`projects`, `skills`, `certs`, `contact`).
Full command history via arrow keys.

### Design System
- **Emerald Accent** `#10B981` — all active states and highlights
- **Glassmorphism** — GlassCard primitives with backdrop blur
- **Full Light/Dark Mode** — no hardcoded dark overrides

---

## UI Truth Rule

> The UI must never invent meaning.
> If data is missing: show nothing. Never fake metrics. Never hallucinate outcomes.

All status indicators, uptime, and project data reflect real operator state.

---

## Tech Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript
- **Email**: Resend

---

## Notice

The source is open for inspection. The product is for visitors only.
Recruiters, peers, and clients access the live site.
The data layer reflects one operator reality and is not designed for replication.

---

## Operator
**Wisdom Kinoti**
- **GitHub**: [kwisdomk](https://github.com/kwisdomk)
- **LinkedIn**: [kwisdomk](https://linkedin.com/in/kwisdomk)
- **Email**: wisdomkinoti@proton.me