# Guide 04 — Data Layer
> The Journey · Engineering Guides

---

## Philosophy

All content lives in `/lib/content/`. The UI consumes it. The UI never writes to it.

```
lib/content/
├── _rules.ts       ← data integrity contract
├── projects.ts     ← project records
├── timeline.ts     ← full chronological history
├── certs.ts        ← certifications
├── profile.ts      ← identity data
├── status.ts       ← current operation (update manually)
└── ui-state.ts     ← UI behavior config
```

**Rule: One source of truth. No duplication across files.**

If the same data appears in two files, one of them is wrong.

---

## `_rules.ts` — Data Integrity Contract

```typescript
// lib/content/_rules.ts
// This file is internal. It is never imported by UI components.
// It documents the rules that govern all other data files.

export const RULES = {
  // Every project must have a phase classification
  projects_must_have_phase: true,

  // Every build activity must appear in the timeline
  all_activity_must_exist_in_timeline: true,

  // Inactive projects are archived, not deleted
  inactive_projects_must_be_archived_not_deleted: true,

  // Impact fields are optional — only populate if real and measurable
  no_fake_metrics: true,

  // Status must reflect actual current activity
  status_must_reflect_real_activity: true,
} as const;

// Data integrity checklist (run mentally before pushing content changes):
// ✅ Does every project have a matching timeline entry?
// ✅ Are archived projects marked archived (not deleted)?
// ✅ Is every impact claim something you actually measured?
// ✅ Does status.ts reflect what you're actually working on?
// ✅ Are there any placeholder values (example.com, lorem ipsum)?
```

---

## `projects.ts` — Project Records

```typescript
// lib/content/projects.ts

export type ProjectPhase =
  | "exploration"   // learning, experiments, early prototypes
  | "systems"       // real architecture, multi-component builds
  | "production";   // shipped, deployed, presented

export type ProjectStatus =
  | "active"        // currently being worked on
  | "paused"        // not being worked on but not abandoned
  | "archived";     // done or abandoned — still on timeline

export type ProjectCategory =
  | "ai"
  | "security"
  | "web"
  | "infra"
  | "tools";

export type Project = {
  id: string;                     // kebab-case, unique: "otdt", "wisdom-ai"
  name: string;                   // display name: "OTDT"
  fullTitle: string;              // full title: "OT Digital Twin"
  codename: string;               // uppercase short: "OTDT"
  phase: ProjectPhase;
  status: ProjectStatus;
  date: string;                   // "Mar 2026"
  description: string;            // one paragraph, plain English
  problem: string;                // what was missing or broken
  solution: string;               // what you actually built
  impact?: string;                // ONLY if measured. omit if not.
  stack: string[];                // tech used, concise labels
  category: ProjectCategory;
  links?: {
    github?: string;              // full URL
    live?: string;                // full URL
  };
};

export const projects: Project[] = [
  {
    id:        "otdt",
    name:      "OTDT",
    fullTitle: "OT Digital Twin",
    codename:  "OTDT",
    phase:     "production",
    status:    "active",
    date:      "Mar 2026",
    description:
      "Real-time industrial digital twin for geothermal plant operations. Solo deployment of IBM Maximo Application Suite 9.1 on a 6-node OpenShift ROKS cluster.",
    problem:
      "No affordable, remotely accessible monitoring solution for industrial OT environments in East Africa. Equipment failures go undetected until they become critical.",
    solution:
      "Solo-deployed IBM MAS 9.1 on OpenShift 4.19 ROKS (Frankfurt). Integrated Monte Carlo failure prediction, LSTM anomaly detection, and Unity XR visualisation. Fixed stuck namespace finalizers blocking cluster teardown under production pressure.",
    impact:
      "Presented at EAAAIW 2026 (CUEA, March 30). Validated by Oil & Gas engineer for remote equipment monitoring use case. Philip Mukiti (i3 Technologies) flagged 30% PoC as sufficient to pitch IBM Research Africa.",
    stack:    ["IBM MAS 9.1", "OpenShift 4.19", "IBM Cloud ROKS", "watsonx.ai", "Python", "Unity XR"],
    category: "infra",
    links: {
      github: "https://github.com/kwisdomk/OTDT",
    },
  },
  {
    id:        "wisdom-ai",
    name:      "WisdomAI",
    fullTitle: "WisdomAI — Multi-Agent Health Navigation",
    codename:  "WISDOMAI",
    phase:     "systems",
    status:    "active",
    date:      "Feb 2026",
    description:
      "Multi-agent WhatsApp health navigation system targeting Kenya's county-level healthcare gap. Six specialized agents communicating via a LangGraph orchestration layer.",
    problem:
      "Rural healthcare access in Kenya is fragmented. Patients can't navigate the system without help. Most AI health solutions ignore local language and context.",
    solution:
      "Built six agents: triage (symptom intake), lugha (Swahili translation), daktari (diagnosis assist), chemist (medication guidance), referral (facility routing), mshauri (health counselling). WhatsApp Cloud API verified end-to-end. 78 automated tests.",
    stack:    ["Python", "LangGraph", "WhatsApp Cloud API", "watsonx.ai", "Granite"],
    category: "ai",
    links: {
      github: "https://github.com/kwisdomk/wkAI",
    },
  },
  {
    id:        "haki",
    name:      "HAKI",
    fullTitle: "HAKI — AI-Powered Telemedicine Platform",
    codename:  "HAKI",
    phase:     "production",
    status:    "archived",
    date:      "Jan 2026",
    description:
      "AI-powered telemedicine platform for rural healthcare, built for IBM DevDay 2026. Team lead role.",
    problem:
      "Rural regions face critical shortages of diagnostic capacity. Doctor-to-patient ratios in rural Kenya make real-time consultation impossible at scale.",
    solution:
      "Agentic AI triage using IBM Granite and watsonx Orchestrate. Multi-agent architecture routes patients to appropriate care pathways autonomously.",
    stack:    ["IBM Granite", "watsonx", "IBM Maximo", "Python", "Next.js"],
    category: "ai",
    links: {
      github: "https://github.com/kwisdomk/HAKI",
    },
  },
  {
    id:        "vulai",
    name:      "vulai",
    fullTitle: "vulai — LinkedIn Optimization Framework",
    codename:  "VULAI",
    phase:     "production",
    status:    "active",
    date:      "Apr 2026",
    description:
      "Open-source AI prompt framework that kills corporate buzzwords and rewrites LinkedIn profiles into high-signal, data-driven presence. 'Mambo ni vulai' — it's happening live.",
    problem:
      "LinkedIn profiles are plagued with hollow language. Most professionals cannot articulate their actual impact in writing.",
    solution:
      "Structured prompt framework and rewrite templates. Full open-source release with CONTRIBUTING.md, case studies, Shields.io badges, v0.1.0 release. Distributed across LinkedIn, WhatsApp groups, DigitalLeap.Africa.",
    stack:    ["Prompt Engineering", "Markdown", "GitHub"],
    category: "tools",
    links: {
      github: "https://github.com/kwisdomk/vulai",
      live:   "https://github.com/kwisdomk/vulai",
    },
  },
  {
    id:        "aegis",
    name:      "AEGIS",
    fullTitle: "AEGIS — System Diagnostics Framework",
    codename:  "AEGIS",
    phase:     "systems",
    status:    "active",
    date:      "Apr 2026",
    description:
      "Portable Windows system diagnostics framework. Baseline collection, hardware analysis, comparison layer.",
    problem:
      "No lightweight, portable tool for establishing and comparing system baselines on Windows without installing heavy monitoring software.",
    solution:
      "PowerShell-based framework: baseline collection → hardware analysis → comparison. Designed for reliability, clarity, and extensibility.",
    stack:    ["PowerShell", "Windows", "WMI"],
    category: "tools",
    links: {
      github: "https://github.com/kwisdomk/AEGIS",
    },
  },
];
```

---

## `timeline.ts` — Full History

```typescript
// lib/content/timeline.ts
// Every build activity goes here. Including abandoned and experimental work.
// This is the truth layer. Nothing is removed.

export type TimelineEntryType =
  | "project"       // intentional build
  | "experiment"    // exploratory work
  | "milestone";    // career/learning event

export type TimelineEntry = {
  id: string;
  date: string;          // "Mar 2026" or "Q4 2025"
  title: string;
  type: TimelineEntryType;
  summary: string;       // one line, plain truth
  projectId?: string;    // links to projects.ts id if exists
};

export const timeline: TimelineEntry[] = [
  // 2024
  { id: "oop1",       date: "Sep 2024",  type: "experiment",  title: "OOP1 / OOP-bcs",       summary: "CS coursework. C++ and Java fundamentals.",                            },
  { id: "compsvision",date: "Oct 2024",  type: "experiment",  title: "compsvision",           summary: "Computer vision experiments. Python, OpenCV.",                        },
  { id: "ensp",       date: "2024",      type: "milestone",   title: "eNSP Networking Labs",  summary: "Huawei network simulation labs. VLAN, routing, switching.",            },

  // 2025
  { id: "zurvan",     date: "Nov 2025",  type: "project",     title: "zurvan-tracker",        summary: "Personal learning command center. Apache License.",                   },
  { id: "miniazon",   date: "Nov 2025",  type: "experiment",  title: "Miniazon",              summary: "DSA implementation via e-commerce simulation. Python.",               },
  { id: "bootcamp",   date: "Sep 2025",  type: "milestone",   title: "IBM i3 Bootcamp Begins",summary: "QRadar SIEM, Guardium, Verify Identity. RHSA I/II track.",           },
  { id: "genesis",    date: "Oct 2025",  type: "project",     title: "genesis",               summary: "GitLab AI Hackathon. Senior dev mentor agent. Claude Sonnet engine.", },
  { id: "eye-of-odin",date: "Feb 2026",  type: "project",     title: "Eye-of-Odin",           summary: "MLH Gemini Hackathon. Agentic cybersecurity platform. LangGraph.",    },
  { id: "ibm-review", date: "Mar 2026",  type: "milestone",   title: "IBM Technical Review",  summary: "Scored 9.0/10. Highest IBM Security credential holder in junior cohort."},

  // 2026
  { id: "haki-tl",    date: "Jan 2026",  type: "project",     title: "HAKI",                  summary: "IBM DevDay 2026. AI telemedicine. Team lead.",                         projectId: "haki",      },
  { id: "wisdomai-tl",date: "Feb 2026",  type: "project",     title: "WisdomAI",              summary: "6-agent WhatsApp health system. 78 tests. watsonx.ai.",               projectId: "wisdom-ai"  },
  { id: "otdt-tl",    date: "Mar 2026",  type: "project",     title: "OTDT",                  summary: "Solo MAS 9.1 on OpenShift ROKS. Presented at EAAAIW.",                projectId: "otdt"       },
  { id: "vulai-tl",   date: "Apr 2026",  type: "project",     title: "vulai",                 summary: "Open-source LinkedIn framework. Full release cycle. Distributed.",    projectId: "vulai"      },
  { id: "wisevoido",  date: "Mar 2026",  type: "project",     title: "Wisevoido",             summary: "RAG document intelligence system. FastAPI, Supabase, Ollama.",        },
  { id: "aegis-tl",   date: "Apr 2026",  type: "project",     title: "AEGIS",                 summary: "Portable Windows diagnostics framework. PowerShell.",                 projectId: "aegis"      },
  { id: "ai-athena",  date: "Apr 2026",  type: "experiment",  title: "ai-athena",             summary: "TypeScript AI system experiment. Active.",                            },
  { id: "journey",    date: "Apr 2026",  type: "project",     title: "The Journey",           summary: "This site. Being built right now.",                                   },
];
```

---

## `profile.ts` — Identity

```typescript
// lib/content/profile.ts

export type Profile = {
  name: string;
  alias: string;
  handles: string[];
  role: string;
  location: string;
  timezone: string;
  philosophy: string;
  machine: {
    name: string;
    cpu: string;
    gpu: string;
    ram: string;
  };
  handles_social: {
    github_primary:   string;
    github_secondary: string;
    linkedin:         string;
    email:            string;
  };
};

export const profile: Profile = {
  name:      "Wisdom Kinoti",
  alias:     "φιλόσοφος",
  handles:   ["6ofHertz", "kwisdomk"],
  role:      "Junior Cybersecurity Analyst · CS Student · IBM i3 Intern",
  location:  "Nairobi, Kenya",
  timezone:  "UTC+3",
  philosophy: "I blueprint things before they escape. Most of them turn into something real.",
  machine: {
    name: "Athena",
    cpu:  "Intel Core i5-13420H",
    gpu:  "NVIDIA RTX 3050 6GB",
    ram:  "8GB DDR4-3200",
  },
  handles_social: {
    github_primary:   "https://github.com/kwisdomk",
    github_secondary: "https://github.com/6ofHertz",
    linkedin:         "https://linkedin.com/in/kwisdomk",
    email:            "",  // fill in with real email
  },
};
```

---

## `status.ts` — Live State

```typescript
// lib/content/status.ts
// UPDATE THIS MANUALLY whenever your focus changes.
// This powers the "Currently Building" block on the landing page.
// Takes 30 seconds to update. Do it.

export const currentStatus = {
  primaryOp:     "Building The Journey portfolio",
  secondaryOp:   "RHSA I — RH124 Ch9 I/O Redirection",
  machine:       "Athena (HP Victus 15)",
  uptime:        "ACTIVE" as const,
  lastUpdated:   "Apr 2026",
};
```

---

## `certs.ts` — Certifications

```typescript
// lib/content/certs.ts

export type CertStatus = "complete" | "in-progress" | "planned";

export type Cert = {
  title:      string;
  issuer:     string;
  status:     CertStatus;
  score?:     string;
  date?:      string;
  deadline?:  string;
  credlyUrl?: string;
};

export const certs: Cert[] = [
  { title: "IBM QRadar SIEM L2",              issuer: "IBM",         status: "complete",     score: "88%"            },
  { title: "IBM QRadar SIEM L3 Tech Sales",   issuer: "IBM",         status: "complete",     score: "100%"           },
  { title: "IBM QRadar Architecture & Sizing",issuer: "IBM",         status: "complete",     score: "90%"            },
  { title: "IBM Agentic AI Hands-On",         issuer: "IBM",         status: "complete",     date: "Mar 2026"        },
  { title: "Anthropic Claude 101",            issuer: "Anthropic",   status: "complete",     score: "100%", date: "Mar 2026" },
  { title: "ISC2 Candidate",                  issuer: "ISC2",        status: "complete"                              },
  { title: "ISC2 CC",                         issuer: "ISC2",        status: "in-progress",  deadline: "Sep 2026"    },
  { title: "CompTIA Security+",               issuer: "CompTIA",     status: "in-progress"                           },
  { title: "CEH",                             issuer: "EC-Council",  status: "in-progress"                           },
  { title: "RHSA I (RH124)",                  issuer: "Red Hat",     status: "in-progress",  date: "Apr 2026"        },
];
```

---

## `ui-state.ts` — UI Config

```typescript
// lib/content/ui-state.ts
// Controls UI behavior globally. Change here, affects everywhere.

export const uiState = {
  theme:          "dark"        as const,
  accent:         "emerald"     as const,
  density:        "comfortable" as const,   // future: "compact"
  animationLevel: "subtle"      as const,   // future: "reduced" for accessibility
  timelineMode:   "spine"       as const,   // future: "grid"
} as const;
```

---

## How to Add a New Project

1. Add entry to `projects.ts`:
```typescript
{
  id:        "new-project",
  name:      "ProjectName",
  fullTitle: "Full Project Title",
  codename:  "PROJECTNAME",
  phase:     "exploration",  // or systems / production
  status:    "active",
  date:      "May 2026",
  description: "One paragraph.",
  problem:   "What was missing.",
  solution:  "What you built.",
  // impact: only if measured
  stack:     ["Tech1", "Tech2"],
  category:  "ai",  // or security / web / infra / tools
  links: { github: "https://github.com/kwisdomk/repo" },
}
```

2. Add corresponding entry to `timeline.ts`:
```typescript
{
  id:        "new-project-tl",
  date:      "May 2026",
  type:      "project",
  title:     "ProjectName",
  summary:   "One line of what this actually was.",
  projectId: "new-project",  // links back to projects.ts
}
```

3. Push. Done.

---

## How to Archive a Project

Do NOT delete it. Change `status` to `"archived"`:

```typescript
// Before
status: "active",

// After
status: "archived",
```

It stays in the timeline. It disappears from the featured section (UI filters by phase/status). The journey is honest.

---

## CMS Editing via `/admin`

Decap CMS is configured at `/admin` (static files in `public/admin/`).
It provides a browser-based editing UI that commits directly to GitHub.

### Setup Requirements

**`/admin` is configured in code, but authentication requires external OAuth setup.** 
The GitHub backend requires an OAuth proxy because this is hosted on Vercel (not Netlify).

To make it work, you must set up an external OAuth application (e.g. GitHub OAuth App + an OAuth proxy like `decap-server`). 
Once set up, you specify the `base_url` in `config.yml`. Until then, local development can be tested via `npx decap-server` and `local_backend: true`.

> [!WARNING]
> CMS content publishing triggers Git commits to `main`, and therefore **Vercel deployments** after publication. 
> We use `publish_mode: editorial_workflow` to allow draft review before publishing, but a broken publish will fail the Vercel build.

### Collection → File Mapping

| CMS Collection | Content File |
|---|---|
| Profile | `content/profile.json` |
| Status | `content/status.json` |
| Certifications | `content/certs.json` |
| Timeline | `content/timeline.json` |
| Projects | `content/projects/{id}.json` |
| Journal | `content/journal/{slug}.md` |

> [!IMPORTANT]
> **Project IDs are Immutable:** The project `id` is part of the URL contract and serves as the JSON filename. It **should not be changed** after creation. Changing it via CMS will update the JSON field but won't rename the file, breaking the build.

---

## Current vs Target Architecture

To avoid confusion during future refactoring, here is the exact state of the data layer:

### Current Architecture (Implemented)
- **Source:** TypeScript files (`lib/content/*.ts`) and Markdown files (`lib/content/journal/*.md`).
- **Validation:** Type checking only via TS compiler and basic frontmatter checks.
- **Workflow:** Edit `.ts` or `.md` files directly. Commits trigger static rebuilds.

### Target Architecture (Future CMS Refactor)
- **Source:** JSON files (`content/*.json`) and Markdown files (`content/journal/*.md`).
- **Validation:** Strict runtime validation via Zod schemas during build.
- **Workflow:** A local headless CMS or structured form edits the JSON/MD files automatically.

*Do not begin the Target Architecture refactor assuming it is already in place. The Current Architecture is what is running in production.*
