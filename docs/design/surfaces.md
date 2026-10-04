# Surfaces

> How visual layers stack. Where content sits. What elevation communicates.

---

## Current State (Pre-ION Audit)

### Surface Levels

| Level | Token | Light | Dark | Usage |
|---|---|---|---|---|
| Canvas | `--black` | `#f8f8f6` | `#0a0a0a` | `body` background |
| Surface 1 | `--surface` | `#ffffff` | `#111111` | Cards, elevated areas |
| Surface 2 | `--surface-2` | `#f0f0ed` | `#161616` | Recessed areas, grouped content |
| Glass | `--glass-bg` | `rgba(255,255,255,0.75)` | `rgba(17,17,17,0.6)` | Floating UI: terminal, navbar |

### Glass Component

The `.glass` class in `globals.css` combines:
- Semi-transparent background
- 24px blur
- Subtle border
- Hover border transition

Used by: Navbar, Terminal dialog, TerminalButton, floating controls.

### Border System

| Token | Light | Dark | Purpose |
|---|---|---|---|
| `--border-subtle` | `rgba(0,0,0,0.07)` | `rgba(255,255,255,0.05)` | Default structural separation |
| `--border-hover` | `rgba(0,0,0,0.18)` | `rgba(255,255,255,0.15)` | Interactive/hover state |
| `--emerald-border` | `rgba(5,150,105,0.25)` | `rgba(16,185,129,0.3)` | Accent borders |

---

## ION Surface System

### Elevation Model

The platform uses **four** surface levels, ordered from deepest to highest:

```
┌─────────────────────────────────────────┐
│  OVERLAY (z-60+)                        │  Modals, lightbox, terminal
│  ┌───────────────────────────────────┐  │
│  │  FLOATING (z-30–50)               │  │  Dropdowns, tooltips, floating actions
│  │  ┌─────────────────────────────┐  │  │
│  │  │  RAISED (z-0)               │  │  │  Cards, panels, interactive areas
│  │  │  ┌───────────────────────┐  │  │  │
│  │  │  │  INSET               │  │  │  │  Code blocks, input fields
│  │  │  └───────────────────────┘  │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
│  CANVAS (base)                          │  Page background
└─────────────────────────────────────────┘
```

### Surface Token Mapping

| Level | ION Token | Background | Border | Shadow | z-index Range |
|---|---|---|---|---|---|
| **Canvas** | `--surface-canvas` | `--color-canvas` | None | None | — |
| **Inset** | `--surface-inset` | `--color-surface-inset` | `--color-border` | None | — |
| **Raised** | `--surface-raised` | `--color-surface` | `--color-border` | `--shadow-soft` | 0 |
| **Floating** | `--surface-floating` | `--color-surface-raised` | `--color-border-hover` | `--shadow-floating` | 30–50 |
| **Overlay** | `--surface-overlay` | `--color-glass` + blur | `--color-border` | `--shadow-overlay` | 60+ |

### Glass Usage Rules

Glass (backdrop-filter) should only be used for:
1. **Navbar** — maintains context while scrolling
2. **Terminal dialog** — floating operational interface
3. **Floating action buttons** — persistent controls

Glass should NOT be used for:
- Cards (use solid surface + border)
- Page sections (use canvas or surface)
- Decorative backgrounds

### Border Patterns

| Pattern | When to Use | Style |
|---|---|---|
| **Structural** | Card edges, section dividers | `1px solid var(--color-border)` |
| **Interactive** | Hover states on cards/buttons | `1px solid var(--color-border-hover)` |
| **Accent** | Active states, selected items, blockquotes | `2px solid var(--color-accent)` or `var(--color-accent-border)` |
| **Gradient fade** | Timeline connectors, section transitions | `linear-gradient(...)` on a 1px element |
| **None** | Inset surfaces, glass surfaces | Background contrast provides separation |

---

## z-index Scale

| Token | Value | Layer |
|---|---|---|
| `--z-below` | -1 | Decorative backgrounds |
| `--z-base` | 0 | Default content |
| `--z-raised` | 10 | Sticky elements within content |
| `--z-nav` | 20 | Primary navigation |
| `--z-floating` | 30 | Floating controls (terminal button, theme toggle) |
| `--z-dropdown` | 40 | Dropdowns, popovers |
| `--z-backdrop` | 60 | Modal/dialog backdrop |
| `--z-modal` | 70 | Modal/dialog content (terminal uses 70 currently) |
| `--z-toast` | 80 | Notifications |
| `--z-skip` | 100 | Skip link (highest priority) |

---

## Open Questions

- [ ] Should glass blur be reduced from `24px` to `16px` for better performance on mobile?
- [ ] Is a third solid surface level (`--color-surface-raised`) necessary, or do two levels + glass cover all cases?
- [ ] Should the gradient wash on `GlassCard` (`from-foreground/5 to-transparent`) be standardized as a surface token?
