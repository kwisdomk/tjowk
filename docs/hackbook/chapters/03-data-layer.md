# Chapter 3: Data Layer

> *"Data is the source of truth; code is merely the lens through which it is viewed."*

---

## 1. Purpose

This chapter documents every data file in KWAIX.dev. It explains where information is stored, who reads it, how it is validated, and what breaks if a field is modified or corrupted.

If you are looking for where a specific quote, project description, certification, or social handle is stored, this chapter contains the exact answers.

---

## 2. Why Flat Files Instead of a Database?

KWAIX.dev uses **flat JSON and Markdown files** located inside the `content/` folder instead of an SQL or NoSQL database (like PostgreSQL, MySQL, or MongoDB).

| Criteria | Traditional Database | Flat Files (`content/*.json`) | Why KWAIX Chose Flat Files |
|---|---|---|---|
| **Version Control** | Migrations and database dumps | Git commits and PRs | Every change to your bio or projects is tracked in Git history with exact diffs. |
| **Attack Surface** | SQL injection, exposed ports, connection strings | Zero network surface | Data is read locally from disk during build time; no database server to breach. |
| **Cost & Hosting** | Monthly database hosting fees | $0 (included in repo) | No database server to keep alive or pay for. |
| **Speed** | Network round-trips to DB server | Instant filesystem read | Sub-millisecond reads; compiled into static HTML. |

---

## 3. Data File Inventory & Mapping

```
content/
├── profile.json            → Personal identity, handles, quote, philosophy
├── status.json             → Live operational focus, current build, machine
├── certs.json              → Certifications (complete, in-progress, planned)
├── timeline.json           → Full chronological engineering history (2024–2026)
├── projects/               → Detailed workload files (1 JSON per project)
│   ├── otdt.json
│   ├── wisdomai.json
│   ├── vulai.json
│   ├── haki.json
│   └── ... (16 total)
└── journal/                → Technical field notes (1 Markdown file per dispatch)
    └── 2026-04-12-aegis-diagnostics.md
```

---

## 4. Deep Dive into Every Data File

### A. `content/profile.json` (Identity & Bio)

This is the master identity file.

#### File Contents:
```json
{
  "name": "Wisdom Kinoti",
  "alias": "φιλόσοφος",
  "role": "Junior Cybersecurity Analyst · CS Student",
  "subRoles": [
    "Security Operations",
    "Systems Architecture",
    "Applied Cryptography",
    "Agentic AI Systems"
  ],
  "location": "Nairobi, Kenya",
  "timezone": "UTC+3",
  "tagline": "I blueprint things before they escape. Most of them turn into something real.",
  "philosophy": "Every system has a shape. Security is the discipline of knowing that shape better than anyone who wants to break it. I work at the boundary where systems, automation, and threat defense meet.",
  "handles": {
    "github_primary": "https://github.com/kwisdomk",
    "github_secondary": "https://github.com/6ofHertz",
    "linkedin": "https://www.linkedin.com/in/kwaix",
    "email": "wisdom@kwaix.dev"
  },
  "machine": {
    "name": "Athena",
    "specs": "HP Victus 15 · AMD Ryzen 5 · 16GB RAM · RTX 3050"
  }
}
```

#### Consumers (Who reads this?):
1. **`components/home/IdentityBlock.tsx`** — Renders your name, alias, sub-roles, tagline quote, and social links on the homepage.
2. **`app/about/page.tsx`** — Displays your biography, philosophy, workstation details (`Athena`), and timezone.
3. **`components/layout/Footer.tsx`** — Displays your copyright, handles, and location.
4. **`app/layout.tsx`** — Injects OpenGraph SEO metadata and site author tags.
5. **`app/opengraph-image.tsx`** — Generates the social sharing preview image dynamically.

> **What breaks if this file is broken?**  
> If `profile.json` is missing a required field (like `name` or `tagline`), the Next.js build will fail immediately due to Zod validation in `lib/content/schemas.ts`.

---

### B. `content/status.json` (Live Operations)

This file represents your real-time operational status. Whenever your day-to-day focus shifts, update this file.

#### File Contents:
```json
{
  "operation": "Building The Journey portfolio (KWAIX v2.0)",
  "secondaryOp": "RHSA I — RH124 Ch9 I/O Redirection & Pipelines",
  "machine": "Athena (HP Victus 15)",
  "uptime": "ACTIVE",
  "lastUpdated": "Apr 2026"
}
```

#### Consumers:
1. **`components/home/CurrentOps.tsx`** — Displays the terminal-styled "CURRENT OPERATION" card on the homepage.
2. **`components/layout/Navbar.tsx`** — Renders the green pulsing status indicator in the top header.

---

### C. `content/certs.json` (Capability Register)

Stores verified credentials and active study tracks.

#### Key Fields:
- `title` (string): Official name of the certificate.
- `issuer` (string): Organization (e.g. `IBM`, `ISC2`, `CompTIA`, `Red Hat`, `Anthropic`).
- `status` (`complete` | `in-progress` | `planned`): Drives the badge color on the UI.
- `score` (optional string): Exam or review score (e.g. `88%`, `100%`).
- `date` (optional string): Date achieved (e.g. `Mar 2026`).
- `deadline` (optional string): Target completion date for in-progress certs (e.g. `Sep 2026`).
- `credlyUrl` (optional string): Direct link to the digital verification badge.

#### Consumers:
- **`app/certs/page.tsx`** and **`components/certs/CredentialCard.tsx`**

---

### D. `content/timeline.json` (Chronological Proof)

A complete chronological record of every milestone, project, and experiment since 2024.

#### Structure of an Entry:
```json
{
  "id": "MAS-MAS9",
  "date": "2026",
  "title": "OTDT — OpenShift & MAS 9.1",
  "type": "project",
  "summary": "Full deployment of Maximo Application Suite 9.1 on Red Hat OpenShift, single-handedly configured.",
  "projectId": "otdt"
}
```

- If `projectId` is provided, clicking the timeline entry navigates directly to that project's deep-dive page (`/projects/otdt`).

#### Consumers:
- **`components/projects/HorizontalTimeline.tsx`** and **`components/projects/TimelineSpine.tsx`** on the `/projects` page.

---

### E. `content/projects/*.json` (Workload Records)

Each major engineering build has its own dedicated JSON file in `content/projects/` (e.g. `otdt.json`, `wisdomai.json`, `haki.json`, `vulai.json`, `aegis.json`).

#### Complete Field Reference:
| Field | Type | Description |
|---|---|---|
| `id` | `string` | URL slug (e.g. `"otdt"` → `/projects/otdt`) |
| `codename` | `string` | System codename (e.g. `"MAS-MAS9"`, `"HAKI"`) |
| `title` | `string` | Full human-readable system name |
| `tagline` | `string` | 1-2 sentence executive summary |
| `category` | `string` | Category (`ai`, `security`, `infra`, `tools`, `web`) |
| `phase` | `string` | Maturity level (`exploration`, `systems`, `production`) |
| `status` | `string` | Operational state (`active`, `paused`, `archived`) |
| `date` | `string` | Release/build date (e.g. `"Apr 2026"`) |
| `problem` | `string` | The real engineering challenge addressed |
| `solution` | `string` | The architecture and technical implementation |
| `workflow` | `string?` | Description of human + AI pair engineering process |
| `impact` | `string?` | Measurable outcomes or benchmarks |
| `stack` | `string[]` | List of technologies used (`["OpenShift", "MAS 9.1", "Python"]`) |
| `visuals` | `object[]?`| Array of architecture diagrams or terminal logs |
| `links` | `object?` | URLs for `github`, `live`, `windowsScript`, `linuxScript` |
| `featured` | `boolean` | If `true`, rendered on the homepage and at the top of `/projects` |

---

### F. `content/journal/*.md` (Field Notes)

Each journal post is a standard Markdown file with YAML frontmatter at the top:

```markdown
---
title: "AEGIS — Windows Diagnostics Framework"
date: "2026-04-12"
tag: "Systems"
summary: "Why I wrote a zero-dependency portable PowerShell diagnostics tool for enterprise triage."
---

# AEGIS Architecture

Field notes content goes here...
```

---

## 5. Schema Validation with Zod (`lib/content/schemas.ts`)

To ensure data integrity, KWAIX uses **Zod**. Every file read from disk is verified against a strict schema.

```typescript
// Example from lib/content/schemas.ts
export const projectSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  codename: z.string(),
  title: z.string(),
  tagline: z.string(),
  category: z.enum(['ai', 'security', 'web', 'infra', 'tools']),
  phase: z.enum(['exploration', 'systems', 'production']),
  status: z.enum(['active', 'paused', 'archived']),
  date: z.string(),
  problem: z.string().optional(),
  solution: z.string().optional(),
  workflow: z.string().optional(),
  impact: z.string().optional(),
  stack: z.array(z.string()),
  featured: z.boolean().default(false),
  // ... visuals and links schemas
});
```

### Why this is critical:
If someone misspells `"category": "securityy"` or forgets a required field, Zod catches it instantly and prints:
```
[loaders.ts] Project schema validation failed: [ { "path": ["category"], "message": "Invalid enum value" } ]
```
This prevents silent bugs or broken HTML from reaching production.

---

## 6. Content Loaders (`lib/content/loaders.ts`)

Loaders are helper functions that safely read disk files and parse them:

| Loader Function | Returns | Description |
|---|---|---|
| `getProfile()` | `Profile` | Validated object from `content/profile.json` |
| `getStatus()` | `SystemStatus` | Validated object from `content/status.json` |
| `getCerts()` | `Cert[]` | Array of validated credentials from `content/certs.json` |
| `getTimeline()` | `TimelineEntry[]` | Chronologically sorted timeline items |
| `getProjects()` | `Project[]` | All validated project JSON files |
| `getFeaturedProjects()`| `Project[]` | Only projects where `featured === true` |
| `getProjectById(id)` | `Project | undefined` | Single project matching the URL parameter |
| `getAllPosts()` | `JournalPost[]` | All Markdown posts parsed with frontmatter |
| `getPostBySlug(slug)` | `JournalPost` | Single post matching slug |
| `renderMarkdown(md)` | `Promise<string>` | Converts Markdown into sanitized HTML |

---

## 7. Common Mistakes

- **Mistake:** Editing a project's `id` property in JSON without realizing it changes the live URL.  
  *Consequence:* Any external link to `/projects/old-id` will return a 404 error.
- **Mistake:** Adding a new category not defined in the enum (`ai`, `security`, `web`, `infra`, `tools`).  
  *Fix:* Either use one of the 5 valid categories or update `projectSchema` in `lib/content/schemas.ts`.
- **Mistake:** Using invalid date formats in Markdown frontmatter.  
  *Fix:* Always use `YYYY-MM-DD` (e.g. `"2026-04-12"`).

---

## 8. Related Chapters

- [Chapter 7: Content Guide](07-content-guide.md) — Step-by-step instructions for adding new content.
- [Chapter 11: Rules & Philosophy](11-rules-and-philosophy.md) — Integrity rules governing data.
- [Appendix B: Dependency Map](../appendices/dependency-map.md) — What breaks when each file changes.
