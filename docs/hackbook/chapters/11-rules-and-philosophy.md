# Chapter 11: Rules & Philosophy

> *"Rules exist to protect the signal from the noise."*

---

## 1. Purpose

This chapter documents the **10 Non-Negotiable Rules** of KWAIX.dev and the engineering philosophy behind Project ION.

Every contributor—whether Wisdom, a human developer, or an AI assistant—must adhere to these rules. Code or content that violates these laws must be rejected.

---

## 2. The 10 Non-Negotiable Data & Design Rules

### Rule 1: No Stock Images. No AI-Generated Art.
- **The Rule:** Never use generic stock photography (e.g. smiling corporate models, generic server racks, glowing blue circuit boards) or AI-generated fantasy graphics.
- **The Rationale:** KWAIX is a proof engine. Media items are **engineering artifacts** (real screenshots of terminal outputs, verified architecture diagrams, genuine test runs).

### Rule 2: No Fake Metrics.
- **The Rule:** If you did not measure a metric in a benchmark or test run, do not write it down.
- **The Rationale:** Saying *"Improved performance by 400%"* without methodology destroys credibility. If an impact metric is not verified, omit it or describe the qualitative outcome.

### Rule 3: No Typewriter Hero Text.
- **The Rule:** Do not add animated typing effects to the hero header.
- **The Rationale:** Typewriter text is an overused cliché that slows down human reading speed and hurts accessibility. Present identity clearly and immediately.

### Rule 4: No Skill Progress Bars.
- **The Rule:** Never create percentage bars for skills (e.g. *"Python: 90%", "Cybersecurity: 85%"*).
- **The Rationale:** Arbitrary skill percentages are meaningless in professional engineering. Competence is demonstrated through shipped workloads, certifications, and technical dispatches.

### Rule 5: One Accent Color (Emerald `#10B981`).
- **The Rule:** The only allowed accent color across the entire site is Emerald Green.
- **The Rationale:** A single accent color maintains visual discipline, evokes telemetry/radar phosphors, and prevents visual chaos.

### Rule 6: `status.json` Stays Current.
- **The Rule:** Whenever your active daily focus or study track changes, update `content/status.json`.
- **The Rationale:** The live status indicator is a promise to the visitor that the system is active and monitored.

### Rule 7: Dead Projects Go on the Timeline (Never Deleted).
- **The Rule:** Abandoned prototypes, coursework labs, and superseded projects must be marked as `archived` in their metadata—never deleted from Git or the timeline.
- **The Rationale:** Progression requires an honest map of the entire journey. Hiding mistakes or early steps creates a dishonest facade.

### Rule 8: No Placeholder Content in Production.
- **The Rule:** No `Lorem Ipsum`, no `"Coming Soon"`, and no draft stubs visible on public routes.
- **The Rationale:** Either a piece of content is ready to be published, or it stays on a private branch.

### Rule 9: No Secrets in Frontend Code. Ever.
- **The Rule:** Never put API tokens, private keys, or passwords inside client-side components or commit them to Git.
- **The Rationale:** All secret operations must remain isolated inside serverless backend functions (`/api/*`).

### Rule 10: Content First, UI Second.
- **The Rule:** The UI is a servant to the content. Never bend the truth of the content to fit a flashy visual layout.
- **The Rationale:** A plain, legible document with high technical signal is vastly superior to a beautiful website with empty content.

---

## 3. The Project ION Charter & Core Decision Test

Whenever you evaluate a new feature, component, or design proposal, ask:

> **"Does this make the engineering evidence clearer?"**  
> - If **yes** → Keep it and refine it.  
> - If it is **only prettier** without adding clarity → Question it, simplify it, or discard it.

---

## 4. What Never to Put in this Repository

| Item | Why it is Forbidden |
|---|---|
| Private API keys & `.env.local` | Security risk; credentials leak |
| Proprietary enterprise code | Violates employer/client confidentiality |
| Stock photography | Violates Rule 1 (Evidence over decoration) |
| Fake certification badges | Violates Rule 2 (Authenticity) |

---

## 5. Related Chapters

- [Chapter 1: What is KWAIX?](01-what-is-kwaix.md) — The mission and philosophy.
- [Chapter 3: Data Layer](03-data-layer.md) — How `_rules.ts` enforces these principles.
- [Chapter 6: Design System](06-design-system.md) — The visual tokens upholding these rules.
