# Appendix A: Complete Repository File Map

This map inventories every key file in the repository and describes its exact role.

---

## 1. Application Layer (`app/`)

| File Path | Role |
|---|---|
| `app/layout.tsx` | Global HTML shell, font declarations, ThemeProvider, Navbar, Footer, and Terminal |
| `app/globals.css` | Global CSS design tokens, CSS variables, `.glass`, `.label-mono`, `.pulse-dot` |
| `app/page.tsx` | Transmission (Homepage) — Hero, live status, featured projects preview |
| `app/projects/page.tsx` | Operations Log — Featured workloads grid + full chronological timeline spine |
| `app/projects/[id]/page.tsx` | Workload deep-dive case study with architecture, problem, solution, and links |
| `app/about/page.tsx` | Operator background, three-phase career trajectory, and workstation specs |
| `app/certs/page.tsx` | Verified certifications and active credential tracks |
| `app/contact/page.tsx` | Contact channels, verified PGP keys, and direct message form |
| `app/journal/page.tsx` | Field notes and technical dispatches index |
| `app/journal/[slug]/page.tsx` | Markdown journal post reader with prose styling |
| `app/not-found.tsx` | "Process Terminated" 404 error page |
| `app/manifest.ts` | Progressive Web App (PWA) configuration |
| `app/sitemap.ts` | Dynamic search engine sitemap generator |
| `app/robots.ts` | Search engine crawler rules |
| `app/opengraph-image.tsx` | Edge-generated dynamic social media preview card |

---

## 2. API Serverless Endpoints (`app/api/`)

| File Path | Role |
|---|---|
| `app/api/contact/route.ts` | POST endpoint to validate submissions, run honeypot check, and send email via Resend |
| `app/api/auth/route.ts` | GET endpoint to initiate GitHub OAuth 2.0 PKCE login |
| `app/api/callback/route.ts` | GET endpoint for OAuth callback, token exchange, user check, and CSP nonce injection |

---

## 3. Component Layer (`components/`)

| File Path | Role |
|---|---|
| `components/layout/Navbar.tsx` | Top navigation bar with active route highlight and live status dot |
| `components/layout/Footer.tsx` | Bottom footer with timezone, copyright, and social links |
| `components/home/IdentityBlock.tsx` | Hero block with name, Greek alias, tagline quote, and social action buttons |
| `components/home/CurrentOps.tsx` | Terminal-styled operations block displaying live focus |
| `components/projects/FeaturedCard.tsx` | Flagship project card with three-pillar problem/solution/impact layout |
| `components/projects/HorizontalTimeline.tsx` | Horizontal milestone timeline |
| `components/projects/TimelineEntry.tsx` | Compact timeline row entry |
| `components/projects/TimelineSpine.tsx` | Vertical chronological timeline spine |
| `components/projects/VisualGallery.tsx` | Architecture diagram lightbox and gallery |
| `components/certs/CredentialCard.tsx` | Certification status card with scores and Credly links |
| `components/contact/ContactForm.tsx` | Client-side form with honeypot spam protection |
| `components/ui/status-badge.tsx` | Standardized status pill component |
| `components/ui/glass-card.tsx` | Glassmorphism container component |
| `components/ui/button.tsx` | Reusable button primitive |
| `components/ui/theme-toggle.tsx` | Dark / Light theme switcher dropdown |
| `components/ui/theme-provider.tsx` | next-themes wrapper |
| `components/ui/terminal.tsx` | Interactive kOS terminal emulator |

---

## 4. Content & Data Layer (`content/` and `lib/`)

| File Path | Role |
|---|---|
| `content/profile.json` | Master identity file (name, alias, handles, quote, philosophy) |
| `content/status.json` | Live operational status (operation, secondaryOp, machine, uptime) |
| `content/certs.json` | 12 verified certifications and study tracks |
| `content/timeline.json` | 19 chronological timeline records (2024–2026) |
| `content/projects/*.json` | 16 individual workload records |
| `content/journal/*.md` | Markdown dispatches with YAML frontmatter |
| `lib/content/schemas.ts` | Zod structural contracts for all data models |
| `lib/content/loaders.ts` | Server-only disk reader and validation engine |
| `lib/content/_rules.ts` | Data integrity contract (10 non-negotiables) |
| `lib/content/ui-state.ts` | UI behavior and animation settings |
| `lib/utils.ts` | Tailwind class merging utility (`cn`) |

---

## 5. Configuration & Build Files

| File Path | Role |
|---|---|
| `package.json` | Project dependencies, scripts, and package metadata |
| `tsconfig.json` | TypeScript compiler configuration and path aliases (`@/*`) |
| `tailwind.config.ts` | Tailwind design tokens, custom colors, and extended font families |
| `next.config.ts` | Next.js image optimization, headers, and compression settings |
