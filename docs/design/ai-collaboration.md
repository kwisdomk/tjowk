# AI Collaboration Workflow

> Formalized roles. Clear boundaries. One coherent design language.

---

## Participants

### Product Owner — Wisdom (KWAIX)

| Responsibility | Authority |
|---|---|
| Defines vision, identity, and priorities | **Final decision-maker** on all architectural, design, and product questions |
| Approves or rejects design concepts | No implementation proceeds without approval |
| Provides design references, sketches, and direction | Source of truth for "what this should feel like" |
| Reviews all work before merge | Quality gate |

### Local AI IDE — Implementation Engine

| Responsibility | Scope |
|---|---|
| Repository inspection and Git operations | Branches, commits, tags, merges |
| Code implementation | Components, styles, tokens, pages |
| Refactoring and migration | Token adoption, component evolution |
| Architecture support | Data flow, loader patterns, schema validation |
| Verification | TypeScript checks, build validation, accessibility audits |
| Documentation | Design system docs, decision logs, implementation notes |

**Rules**:
- Never implements without an approved plan or explicit instruction
- Documents decisions with rationale
- Treats every Git operation as deliberate and reversible
- Does not invent visual styles — derives from approved references and principles

### Gemini — Visual Research & Asset Creation

| Responsibility | Output |
|---|---|
| Logo exploration and refinement | SVG concepts, lockup variations |
| Brand asset creation | Icons, illustrations, social cards |
| Interface mockups and concepts | Visual explorations as design references |
| Hero compositions | Layout concepts for key pages |
| Motion concepts | Animation direction, timing references |
| Iconography | Custom icon sets, visual metaphors |

**Rules**:
- Visual outputs are **references**, not specifications
- Every concept must be evaluated for usability, accessibility, performance, and feasibility before implementation
- Must work within the established ION design language (emerald accent, Geist typography, evidence-first)
- No cyberpunk, neon, gaming, or "hacker" aesthetics

### ChatGPT — Review & Critique

| Responsibility | Evaluation Areas |
|---|---|
| UX review | Information hierarchy, scanning paths, cognitive load |
| Accessibility critique | WCAG compliance, keyboard operation, screen reader experience |
| Architecture review | Component structure, data flow, performance implications |
| Consistency audit | Cross-page visual consistency, token adherence |
| Information design | Content hierarchy, evidence presentation effectiveness |
| Implementation review | Code quality, maintainability, best practices |

**Rules**:
- Reviews are advisory, not authoritative
- Conflicting recommendations are resolved by the Product Owner
- Must understand the existing codebase context before suggesting changes

---

## Workflow

### Design Phase

```
Wisdom (direction / sketches / references)
    ↓
Gemini (visual exploration)
    ↓
Wisdom (approve / reject / iterate)
    ↓
ChatGPT (UX / accessibility / hierarchy review)
    ↓
Wisdom (final approval of direction)
```

### Implementation Phase

```
Approved design direction
    ↓
Local AI IDE (implement on ion branch)
    ↓
ChatGPT (code review / accessibility audit)
    ↓
Local AI IDE (address feedback)
    ↓
Wisdom (final review)
    ↓
Merge / deploy
```

### Conflict Resolution

When AI collaborators disagree:

1. Both perspectives are documented in `decisions.md`
2. Wisdom evaluates against the ION principles
3. The decision is recorded with rationale
4. All collaborators adopt the decision going forward

---

## Communication Standards

### What the Local AI IDE needs from Wisdom

- Clear approval or rejection (not ambiguous)
- Design references or sketches when visual direction is uncertain
- Priority guidance when multiple workstreams compete
- Confirmation that changes match intent ("is this what you meant?")

### What Wisdom needs from the Local AI IDE

- Honest assessment of feasibility and trade-offs
- Explanation before any destructive operation
- Verification results (builds, type checks, accessibility)
- Documentation of what was changed and why

### What goes in the repository

- Approved design documentation → `docs/design/`
- Implementation plans → `docs/plans/`
- Decision records → `docs/design/decisions.md`
- Code changes → committed to `ion` branch with descriptive messages

### What stays outside the repository

- Draft visual concepts (until approved)
- Chat transcripts (reference only)
- Personal notes (unless formalized)

---

## Quality Gates

Before any ION change is merged:

1. ✅ TypeScript compilation passes (`tsc --noEmit`)
2. ✅ Production build succeeds (`next build`)
3. ✅ No accessibility regressions (manual checklist or tooling)
4. ✅ Consistent with ION design tokens
5. ✅ Documented in decision log if it involves a design choice
6. ✅ Wisdom has reviewed and approved
