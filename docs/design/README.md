# KWAIX.dev — Design System Documentation

> **Project ION** — Phase 1: The System  
> Branch: `ion` | Recovery: `pre-ion`

This directory is the single source of truth for the KWAIX.dev design system.

Everything in this directory describes the **system** — not a specific page, not a specific feature. Pages are composed from this system. Features inherit from this system. When this system is complete, building any page becomes assembly rather than invention.

---

## Document Index

| Document | Purpose |
|---|---|
| [vision.md](./vision.md) | Identity, mission, philosophy, audience, experience goals |
| [principles.md](./principles.md) | Visual language vocabulary — desired vs. avoided qualities |
| [typography.md](./typography.md) | Font families, type scale, line heights, letter spacing |
| [colors.md](./colors.md) | Semantic color tokens, palette, light/dark mapping |
| [spacing.md](./spacing.md) | Spacing scale, layout rhythm, radius, shadows |
| [surfaces.md](./surfaces.md) | Surface hierarchy, elevation, glass, borders |
| [motion.md](./motion.md) | Animation tokens, durations, easing, reduced-motion |
| [media.md](./media.md) | Screenshot, terminal, diagram, gallery, lightbox, video standards |
| [components.md](./components.md) | Component inventory and implementation backlog |
| [accessibility.md](./accessibility.md) | Interaction targets, focus, landmarks, ARIA, contrast |
| [ai-collaboration.md](./ai-collaboration.md) | Multi-AI workflow, roles, responsibilities |
| [decisions.md](./decisions.md) | Design decision log with rationale |

---

## How to Use This Directory

1. **Before building a new component** — check `components.md` for whether it already exists or is planned.
2. **Before choosing a color** — check `colors.md` for the semantic token.
3. **Before adding an animation** — check `motion.md` for approved durations and curves.
4. **Before making a design choice** — record it in `decisions.md` with rationale.
5. **Before any implementation** — verify against `principles.md`.

## Relationship to Other Documents

- **Charter**: [docs/plans/project-ion-charter.md](../plans/project-ion-charter.md) — the north star and phasing roadmap.
- **Workstreams**: [docs/plans/tjowk-workstreams.md](../plans/tjowk-workstreams.md) — active and queued work.
- **Deferred `/core`**: [docs/plans/core-page-deferred.md](../plans/core-page-deferred.md) — restart specification.
