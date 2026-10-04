# Design Decisions

> Every important decision gets recorded.  
> Future changes are easier and more consistent when the reasoning is preserved.

---

## Format

Each decision follows this structure:

```
### Decision NNN — [Title]

**Date**: YYYY-MM-DD  
**Status**: Approved / Proposed / Superseded  
**Context**: Why this decision was needed  
**Decision**: What was decided  
**Rationale**: Why this option was chosen over alternatives  
**Alternatives considered**: What else was evaluated  
```

---

## Decisions

### Decision 001 — Use Geist as primary typeface

**Date**: 2026-08-04  
**Status**: Approved (pre-existing)  
**Context**: The platform needed a primary sans-serif typeface that works for both UI elements and longer reading passages on a technical platform.  
**Decision**: Retain Geist (via `next/font/google`).  
**Rationale**: Excellent readability at all sizes. Variable font with smooth weight interpolation. Modern geometric-humanist design that feels technical without being cold. Already integrated and tested. Vercel's design system uses it, which means ongoing maintenance and quality assurance.  
**Alternatives considered**: Inter (too ubiquitous, less distinctive), Outfit (more playful than appropriate), system fonts (inconsistent cross-platform).

---

### Decision 002 — Use Geist Mono for monospace contexts

**Date**: 2026-08-04  
**Status**: Approved (pre-existing)  
**Context**: Code blocks, labels, status indicators, terminal output, and timestamps all require a monospace typeface.  
**Decision**: Retain Geist Mono (via `next/font/google`).  
**Rationale**: Companion to Geist — same design family ensures visual harmony. Clean, readable, professional. Already integrated.  
**Alternatives considered**: JetBrains Mono (excellent for extended code reading, but adds a second font download and breaks the single-family consistency). Deferred as a possible enhancement for terminal/code-specific use.

---

### Decision 003 — No neon or cyberpunk aesthetics

**Date**: 2026-08-04  
**Status**: Approved  
**Context**: The platform sits in the cybersecurity × AI space, which is culturally adjacent to cyberpunk aesthetics in popular culture.  
**Decision**: The platform will never adopt neon glows, cyberpunk color schemes, Matrix-style effects, or "hacker" visual clichés.  
**Rationale**: These aesthetics undermine professional credibility with the primary audience (technical evaluators, hiring managers, engineers). The brand communicates competence through precision and clarity, not through performative darkness. Emerald as a single, restrained accent is sufficient.  
**Alternatives considered**: None seriously — this was a product owner directive reinforced by independent design reviews.

---

### Decision 004 — Emerald as the single brand accent

**Date**: 2026-08-04  
**Status**: Approved (pre-existing)  
**Context**: A disciplined color palette needs clear accent rules.  
**Decision**: Emerald green (`#047857` light / `#10B981` dark) is the sole brand accent. All other colors serve functional/status roles only.  
**Rationale**: A single accent color creates a strong, recognizable visual identity. Multiple accent colors dilute recognition and create hierarchy confusion. Emerald connotes growth, precision, and system health — appropriate for a cybersecurity × AI platform.  
**Alternatives considered**: Dual accent (emerald + blue), gradient accents. Rejected for complexity and reduced clarity.

---

### Decision 005 — Three-state theme toggle (Light / System / Dark)

**Date**: 2026-08-04  
**Status**: Approved (recently implemented)  
**Context**: The previous toggle was a binary light/dark switch. Users whose system preference was "dark" could not distinguish between "I chose dark" and "the system chose dark."  
**Decision**: Segmented control with three options: Light, System, Dark. `aria-pressed` states. 44px minimum touch targets.  
**Rationale**: Respects user agency and system preferences. Segmented controls are more discoverable than cycling toggles. Touch targets meet accessibility requirements.  
**Alternatives considered**: Dropdown menu (less discoverable, more interaction cost), cycling icon button (ambiguous state).

---

### Decision 006 — `.snapshots/` stays local-only

**Date**: 2026-08-04  
**Status**: Approved  
**Context**: A `.snapshots/` directory with recovery patches from a prior contrast fix existed as an untracked directory.  
**Decision**: Do not commit `.snapshots/` to repository history.  
**Rationale**: These are ephemeral local recovery artifacts from a completed, merged fix. Committing them pollutes history with large binary patches that have no future utility. The merged commit and the `pre-ion` tag provide sufficient recovery.  
**Alternatives considered**: Commit as part of checkpoint (rejected — unnecessary history bloat).

---

### Decision 007 — Kierkegaard tagline replaces original

**Date**: 2026-08-04  
**Status**: Approved (product owner directive)  
**Context**: The original tagline ("I blueprint things before they escape. Most of them turn into something real.") was replaced by product owner request.  
**Decision**: Tagline changed to *"Now, with God's help, I shall become myself."* — Søren Kierkegaard. Author attribution rendered in monospace, separated from the quoted text.  
**Rationale**: Product owner's personal philosophical alignment. The quote connects to the `φιλόσοφος` identity and the platform's intersection of technical work and philosophical inquiry.  
**Alternatives considered**: None — direct product owner instruction.

---

### Decision 008 — Design system documentation before implementation

**Date**: 2026-08-04  
**Status**: Approved  
**Context**: ION Phase 1 could begin with token implementation directly, or with documentation first.  
**Decision**: Create the complete `docs/design/` documentation workspace before writing any implementation code.  
**Rationale**: Documentation-first ensures that token naming, semantic roles, component responsibilities, and visual rules are agreed upon before code encodes them. Changing documentation is cheap; refactoring token names across a codebase is expensive. This also gives the product owner a review surface before implementation begins.  
**Alternatives considered**: Implement tokens directly (faster start, but higher risk of rework when naming doesn't survive review).

---

*New decisions should be appended below this line.*
