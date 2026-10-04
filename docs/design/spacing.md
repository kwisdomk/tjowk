# Spacing

> Choose one scale. Then never invent spacing values.

---

## Current State (Pre-ION Audit)

Spacing in the current codebase is **Tailwind-default with ad hoc overrides**:

- Container padding: `2rem` (via Tailwind `container`)
- Section padding: `6rem` top/bottom (via `.section` class)
- Site shell gutters: `clamp(1rem, 3vw, 4rem)` (via `--site-gutter`)
- Card internal padding: `p-6` (1.5rem)
- Gaps: Mixed `gap-2`, `gap-3`, `gap-4`, `gap-6` without a governing scale
- Margins: Various `mb-4`, `mb-5`, `mb-6`, `mb-12` without consistent rhythm

The site shell is well-considered (`--wide-max: 120rem` with fluid gutters), but component-level spacing is inconsistent.

---

## ION Spacing Scale

### Base Unit: 4px

All spacing derives from a 4px base. No arbitrary values.

| Token | Value | px | Use Case |
|---|---|---|---|
| `--space-0` | 0 | 0 | Reset |
| `--space-1` | 0.25rem | 4 | Inline icon gaps, micro-adjustments |
| `--space-2` | 0.5rem | 8 | Badge padding, tight gaps |
| `--space-3` | 0.75rem | 12 | Small card gaps, label spacing |
| `--space-4` | 1rem | 16 | Standard element spacing |
| `--space-5` | 1.25rem | 20 | Card group gaps |
| `--space-6` | 1.5rem | 24 | Card internal padding, section sub-gaps |
| `--space-8` | 2rem | 32 | Section internal padding |
| `--space-10` | 2.5rem | 40 | Major component separation |
| `--space-12` | 3rem | 48 | Section spacing (related sections) |
| `--space-16` | 4rem | 64 | Section spacing (distinct sections) |
| `--space-20` | 5rem | 80 | Page-level vertical rhythm |
| `--space-24` | 6rem | 96 | Hero spacing, major landmarks |

### Usage Guidelines

- **Within components**: `space-2` through `space-6`
- **Between components**: `space-6` through `space-12`
- **Between sections**: `space-12` through `space-24`
- **Page padding (top)**: `space-20` (matches current `py-20`)
- **Card padding**: `space-6` (matches current `p-6`)

---

## Border Radius

| Token | Value | Use Case |
|---|---|---|
| `--radius-sm` | 0.375rem (6px) | Inline code, small badges |
| `--radius-md` | 0.5rem (8px) | Buttons, inputs, small cards |
| `--radius-lg` | 0.75rem (12px) | Cards, dialogs, panels (current `--radius`) |
| `--radius-xl` | 1rem (16px) | Large cards, hero elements |
| `--radius-full` | 9999px | Pills, avatar circles, status dots |

**Current state**: Single `--radius: 0.75rem` with derived `md` and `sm`. The ION system makes this explicit.

---

## Shadows / Elevation

| Token | Value | Use Case |
|---|---|---|
| `--shadow-none` | `none` | Flat surfaces, borders-only |
| `--shadow-soft` | `0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)` | Subtle card lift |
| `--shadow-card` | `0 4px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.08)` | Standard card elevation |
| `--shadow-floating` | `0 8px 24px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)` | Popovers, dropdowns, floating controls |
| `--shadow-overlay` | `0 16px 48px rgba(0,0,0,0.16), 0 4px 12px rgba(0,0,0,0.08)` | Modals, lightbox, dialogs |

**Dark mode note**: Shadow opacity should be slightly increased in dark mode where ambient contrast is lower. Consider adjusting `rgba` alpha values in `.dark`.

---

## Layout Containers

### Already Defined (Retain)

| Class | Max Width | Purpose |
|---|---|---|
| `.site-shell` | `120rem` (1920px) | Full-width bounded shell with fluid gutters |
| `.reading-measure` | `72ch` | Prose content constraint |

### ION Additions (Proposed)

| Class | Max Width | Purpose |
|---|---|---|
| `.content-wide` | `80rem` (1280px) | Standard content area (project grids, card layouts) |
| `.content-narrow` | `64rem` (1024px) | Focused content (single-column pages, forms) |

---

## Open Questions

- [ ] Should spacing tokens be implemented as CSS custom properties, Tailwind `theme.extend.spacing`, or both?
- [ ] Should dark-mode shadow values be separate tokens or use a single set with `color-mix()` adjustments?
- [ ] Is the current site shell max-width (120rem / 1920px) appropriate, or should it be tightened for non-media content?
