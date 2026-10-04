# Motion

> Animations should reveal structure, indicate state, or improve orientation — not exist to impress.

---

## Current State (Pre-ION Audit)

### CSS Animations

| Animation | Duration | Easing | Use |
|---|---|---|---|
| `fade-in` | 0.5s | ease | General entrance |
| `fade-in-left` | 0.4s | ease | Timeline entries |
| `ping` | 1.5s | cubic-bezier(0,0,0.2,1) | Pulse dot (status indicator) |
| `accordion-down` | 0.2s | ease-out | Accordion expand |
| `accordion-up` | 0.2s | ease-out | Accordion collapse |

### Framer Motion Usage

Components using `motion.*`:
- `IdentityBlock` — staggered reveal (`opacity: 0 → 1`, durations 0.4–0.6s)
- `Terminal` — dialog open/close (`scale: 0.96 → 1`, `y: 12 → 0`, 0.2s)
- `VisualGallery` (Lightbox) — image slide transitions (0.25s)

### Reduced Motion

A global `@media (prefers-reduced-motion: reduce)` block exists:
- Sets `animation-duration: 0.01ms` and `transition-duration: 0.01ms` for all elements
- Disables `scroll-behavior: smooth`
- Hides pulse-dot animation

The terminal also uses a `useReducedMotion()` hook for scroll behavior.

---

## ION Motion Tokens

### Duration Scale

| Token | Value | Use Case |
|---|---|---|
| `--duration-instant` | 100ms | Micro-interactions: toggles, color changes |
| `--duration-fast` | 150ms | Hover states, border transitions |
| `--duration-normal` | 200ms | Standard component transitions |
| `--duration-moderate` | 300ms | Panel reveals, card entrance |
| `--duration-slow` | 500ms | Page-level transitions, staggered lists |

### Easing Curves

| Token | Value | When to Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Elements entering the viewport (appear) |
| `--ease-in` | `cubic-bezier(0.5, 0, 0.7, 0)` | Elements leaving the viewport (disappear) |
| `--ease-in-out` | `cubic-bezier(0.45, 0, 0.55, 1)` | Continuous state changes (slides, toggles) |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful micro-feedback (rare, deliberate) |

### Motion Patterns

| Pattern | Duration | Easing | Transform | Context |
|---|---|---|---|---|
| **Hover lift** | `--duration-fast` | `--ease-out` | `translateY(-2px)` | Cards, interactive elements |
| **Hover border** | `--duration-fast` | linear | `border-color` change | All bordered elements |
| **Entrance fade** | `--duration-moderate` | `--ease-out` | `opacity 0→1, translateY(8px→0)` | Content appearing on scroll |
| **Stagger reveal** | `--duration-slow` | `--ease-out` | Sequential delay per item | Lists, card grids, badge groups |
| **Dialog open** | `--duration-normal` | `--ease-out` | `scale(0.96→1), opacity 0→1` | Terminal, lightbox |
| **Dialog close** | `--duration-normal` | `--ease-in` | `scale(1→0.96), opacity 1→0` | Terminal, lightbox |
| **Slide** | `--duration-normal` | `--ease-in-out` | `translateX(±100%)` | Gallery images, tab content |
| **Pulse** | 1.5s | `cubic-bezier(0,0,0.2,1)` | `scale(2), opacity 0` | Status dot (active state only) |

### Reduced Motion Rules

**Non-negotiable**: All motion must degrade gracefully when `prefers-reduced-motion: reduce` is active.

| Behavior | Normal | Reduced Motion |
|---|---|---|
| Entrance animations | Translate + fade | Instant `opacity: 1` |
| Hover transforms | `translateY(-2px)` | Border color change only |
| Dialog transitions | Scale + fade | Instant show/hide |
| Gallery slides | Animated slide | Instant swap |
| Pulse dot | Continuous ping | Static dot, no pulse |
| Scroll behavior | `smooth` | `auto` |
| Page transitions | Fade | Instant |

### Implementation Note

The current global reduced-motion override (`animation-duration: 0.01ms !important`) is aggressive but effective. For ION, consider per-component `motion.reduce` variants for finer control through Framer Motion's `useReducedMotion()`.

---

## Forbidden Motion

These motion patterns are explicitly prohibited:

- **Parallax scrolling** — Distracting, accessibility concern, performance cost
- **Continuous background animations** — Canvas/WebGL effects, particle systems
- **Auto-playing carousels** — User agency violation
- **Bouncing elements** — Unprofessional, attention-seeking
- **Infinite scroll loaders** — Full pages should load; galleries may lazy-load
- **Motion for motion's sake** — If removing the animation changes nothing about understanding, remove it

---

## Open Questions

- [ ] Should Framer Motion's `layout` animations be used for card reflows during filtering?
- [ ] Should page transitions (App Router navigation) have a subtle cross-fade, or remain instant?
- [ ] Is the stagger delay (currently hardcoded per component, e.g., `delay: 0.1`, `delay: 0.2`) worth standardizing as tokens?
