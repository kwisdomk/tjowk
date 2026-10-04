# Colors

> Not just colors. Define their jobs.

---

## Current State (Pre-ION Audit)

The existing palette lives in `app/globals.css` as CSS custom properties, with two complete themes (`:root` for light, `.dark` for dark).

### Existing Token Map

| Token | Light Value | Dark Value | Current Role |
|---|---|---|---|
| `--black` | `#f8f8f6` | `#0a0a0a` | Application background (page canvas) |
| `--surface` | `#ffffff` | `#111111` | Card/elevated surface |
| `--surface-2` | `#f0f0ed` | `#161616` | Recessed or grouped surface |
| `--border-subtle` | `rgba(0,0,0,0.07)` | `rgba(255,255,255,0.05)` | Default borders |
| `--border-hover` | `rgba(0,0,0,0.18)` | `rgba(255,255,255,0.15)` | Interactive border state |
| `--text-primary` | `#0f0f0e` | `#f5f5f5` | Primary reading text |
| `--text-secondary` | `#4a4a46` | `#a3a3a3` | Supporting text |
| `--text-muted` | `#5c5c57` | `#8a8a8a` | De-emphasized text, labels |
| `--glass-bg` | `rgba(255,255,255,0.75)` | `rgba(17,17,17,0.6)` | Glass card background |
| `--emerald` | `#047857` | `#10B981` | Brand accent |
| `--emerald-dim` | `rgba(5,150,105,0.08)` | `rgba(16,185,129,0.1)` | Selection, subtle backgrounds |
| `--emerald-border` | `rgba(5,150,105,0.25)` | `rgba(16,185,129,0.3)` | Accent borders |
| `--emerald-glow` | `rgba(5,150,105,0.12)` | `rgba(16,185,129,0.15)` | Hover glows |

### Status Colors

| Token | Light | Dark | Semantic Role |
|---|---|---|---|
| `--status-active` | `#059669` | `#10B981` | Active / running systems |
| `--status-stable` | `#2563EB` | `#3B82F6` | Stable / maintained |
| `--status-paused` | `#D97706` | `#F59E0B` | Paused / on hold |
| `--status-archived` | `#6B7280` | `#6B7280` | Archived / historical |
| `--status-critical` | `#DC2626` | `#EF4444` | Critical / attention required |

### shadcn/ui Tokens

A parallel set of HSL-based tokens exists for shadcn/ui compatibility (`--background`, `--foreground`, `--primary`, `--secondary`, etc.). These are mapped through Tailwind's `hsl(var(...))` pattern.

---

## Observations

1. **Naming inconsistency**: `--black` is `#f8f8f6` in light mode — semantically misleading. Should be renamed to `--app-bg` or `--canvas`.
2. **Dual token systems**: Custom tokens (`--surface`, `--emerald`) coexist with shadcn tokens (`--primary`, `--muted`). This creates ambiguity about which to use.
3. **No intermediate surface level**: Only two surface levels exist (`--surface`, `--surface-2`). A third level (`--surface-3`) would help with nested card contexts.
4. **Status colors are well-defined** and semantically clear.
5. **The brand is emerald** — a single, disciplined accent color. This is a strength. ION should preserve this constraint.

---

## ION Color System (Proposed)

### Design Principle

Every color has a **job**. If you can't name the job, the color shouldn't exist.

### Semantic Color Roles

| Role | Token | Job |
|---|---|---|
| **Canvas** | `--color-canvas` | Page-level background. The outermost surface. |
| **Surface** | `--color-surface` | Primary card/container background. |
| **Surface Raised** | `--color-surface-raised` | Elevated elements: popovers, floating cards, modals. |
| **Surface Inset** | `--color-surface-inset` | Recessed areas: code blocks, input fields, grouped content. |
| **Border Default** | `--color-border` | Standard structural borders. |
| **Border Interactive** | `--color-border-hover` | Borders on hover/focus. |
| **Border Accent** | `--color-border-accent` | Borders indicating active/selected state. |
| **Text Primary** | `--color-text` | Main readable text. |
| **Text Secondary** | `--color-text-secondary` | Supporting descriptions, metadata. |
| **Text Muted** | `--color-text-muted` | Timestamps, labels, disabled states. |
| **Text Inverse** | `--color-text-inverse` | Text on accent backgrounds. |
| **Accent** | `--color-accent` | Brand emerald. Links, active indicators, highlights. |
| **Accent Subtle** | `--color-accent-subtle` | Accent at low opacity for backgrounds. |
| **Accent Border** | `--color-accent-border` | Accent-tinted borders. |
| **Glass** | `--color-glass` | Semi-transparent surface with backdrop-filter. |

### Semantic Status Roles

| Role | Token | Job |
|---|---|---|
| **Active** | `--status-active` | Running, operational, live. Emerald family. |
| **Stable** | `--status-stable` | Maintained, production-ready. Blue family. |
| **Paused** | `--status-paused` | On hold, deferred. Amber family. |
| **Archived** | `--status-archived` | Historical, no longer maintained. Neutral. |
| **Critical** | `--status-critical` | Error, requires attention. Red family. |
| **Info** | `--status-info` | Informational notices. Blue/cyan family. |
| **Exploring** | `--status-exploring` | Experimental, in research. Cyan family. |

### Functional Colors (Future)

These may be introduced as the platform matures:

| Role | Token | Context |
|---|---|---|
| **AI** | `--color-ai` | AI-related features, agent indicators |
| **Research** | `--color-research` | Research/journal contexts |
| **Cyber** | `--color-cyber` | Security-specific interfaces |

---

## Migration Path

The rename from current tokens to the ION system should be done as a single, isolated commit:

1. Introduce new tokens alongside existing ones.
2. Gradually migrate components to new tokens.
3. Remove old tokens when nothing references them.

This avoids a destructive big-bang rename.

---

## Open Questions

- [ ] Should `--black` be renamed to `--color-canvas` now, or deferred to avoid noise?
- [ ] Should shadcn tokens be consolidated into the ION token system, or maintained as a separate compatibility layer?
- [ ] Should functional colors (`--color-ai`, `--color-research`, `--color-cyber`) be defined now or introduced when pages need them?
- [ ] Are the current emerald values providing sufficient contrast in both themes? (WCAG AA verification needed)
