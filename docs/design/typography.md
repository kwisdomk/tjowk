# Typography

> The most impactful design lever. Get this right and everything improves.

---

## Current State (Pre-ION Audit)

| Role | Current Font | Variable | Source |
|---|---|---|---|
| **Primary (sans)** | Geist | `--font-sans` | `next/font/google` in `layout.tsx` |
| **Monospace** | Geist Mono | `--font-mono` | `next/font/google` in `layout.tsx` |

Both are loaded via `next/font/google` with `display: 'swap'` and `subsets: ['latin']`.

### Observations

- Geist is clean, modern, and technically appropriate.
- Geist Mono integrates naturally with Geist — same family, consistent metrics.
- The current type scale is **ad hoc** — sizes are chosen per-component (`text-xs`, `text-sm`, `text-lg`, etc.) without a defined scale.
- Line heights vary between `1.6` (body default) and `leading-relaxed` (1.625) with no explicit scale.
- Letter spacing is only defined for `.label-mono` (`0.1em`).
- Heading hierarchy is inconsistent — some sections use `<p>` tags styled to look like labels.

---

## ION Type System

### Font Stack

| Role | Font | Rationale | Needs Approval |
|---|---|---|---|
| **Primary** | **Geist** | Already in use. Excellent readability, variable font, modern geometric humanist design. Works beautifully with technical content. | ✅ Retain |
| **Monospace** | **Geist Mono** | Companion to Geist. Clean, readable, professional. Used for labels, code, terminal, status indicators. | ✅ Retain |
| **Alternative consideration** | **JetBrains Mono** | Could replace Geist Mono for terminal/code blocks specifically. Wider character set, ligatures, designed for extended code reading. | ⏳ Deferred decision |

### Type Scale (Proposed)

A modular scale based on a 1.25 ratio (Major Third), anchored at `1rem` (16px body):

| Token | Size | rem | Use Case |
|---|---|---|---|
| `--text-xs` | 11px | 0.6875 | Status badges, micro-labels, timestamps |
| `--text-sm` | 13px | 0.8125 | Captions, secondary text, card metadata |
| `--text-base` | 16px | 1 | Body text, paragraphs, descriptions |
| `--text-lg` | 20px | 1.25 | Section introductions, lead paragraphs |
| `--text-xl` | 25px | 1.5625 | Page subtitles, section headings |
| `--text-2xl` | 31px | 1.9375 | Page titles |
| `--text-3xl` | 39px | 2.4375 | Hero headlines, major page titles |
| `--text-4xl` | 49px | 3.0625 | Display text (rare, hero-only) |

### Line Heights

| Token | Value | Use Case |
|---|---|---|
| `--leading-tight` | 1.2 | Headings, display text |
| `--leading-snug` | 1.35 | Subheadings, card titles |
| `--leading-normal` | 1.5 | Short paragraphs, UI text |
| `--leading-relaxed` | 1.7 | Body text, long-form reading |
| `--leading-loose` | 1.8 | Journal prose, editorial content |

### Letter Spacing

| Token | Value | Use Case |
|---|---|---|
| `--tracking-tight` | -0.02em | Large headings (2xl+) |
| `--tracking-normal` | 0 | Body text |
| `--tracking-wide` | 0.05em | Buttons, navigation |
| `--tracking-mono` | 0.1em | Mono labels (`.label-mono`) |

### Font Weights

| Token | Weight | Use Case |
|---|---|---|
| `--font-normal` | 400 | Body text |
| `--font-medium` | 500 | Labels, card titles, navigation |
| `--font-semibold` | 600 | Section headings, emphasis |
| `--font-bold` | 700 | Page titles, hero text |

---

## Heading Hierarchy

| Level | Font | Size Token | Weight | Tracking | Additional |
|---|---|---|---|---|---|
| `h1` | Geist | `--text-3xl` | 700 | `--tracking-tight` | One per page. Page identity. |
| `h2` | Geist | `--text-xl` | 600 | `--tracking-tight` | Major sections. |
| `h3` | Geist Mono | `--text-lg` | 500 | `--tracking-normal` | Sub-sections, card groups. |
| `h4` | Geist Mono | `--text-base` | 500 | `--tracking-wide` | Card titles, detail headers. |
| Label | Geist Mono | `--text-xs` | 500 | `--tracking-mono` | `.label-mono` — uppercase section markers. |

---

## Reading Measure

Already defined: `--reading-measure: 72ch`.

This is appropriate. Long-form prose (journal entries, project descriptions) should always be constrained to this measure. Full-width surfaces can extend beyond it for visual elements like galleries and architecture diagrams, but readable text must not.

---

## Open Questions

- [ ] Should `JetBrains Mono` be introduced for terminal and code-heavy contexts, or is Geist Mono sufficient everywhere?
- [ ] Should the type scale be implemented as CSS custom properties or Tailwind `theme.extend.fontSize`?
- [ ] Does the proposed scale work well at mobile sizes, or do certain steps need fluid (`clamp()`) scaling?
