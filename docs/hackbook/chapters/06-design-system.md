# Chapter 6: Design System

> *"A design token is a single source of visual truth. If you change the token, the entire world updates with it."*

---

## 1. Purpose

This chapter explains the visual design system of KWAIX.dev. It breaks down how colors, surfaces, typography, glass effects, layout containers, and animations work.

If you want to know what CSS class to use, how dark mode works under the hood, or why a specific color was chosen, this chapter is your guide.

---

## 2. What is a Design Token?

In plain English:

> **A design token is a reusable named value.**

Instead of typing `#10B981` in twenty different files, we define a token called `--emerald`. Every button, status light, and link references that token.

If we ever decide to adjust the shade of emerald, we change it in **one place** (`app/globals.css`), and every single component updates instantly.

---

## 3. The Core Laws of the Design System

### A. The Single Accent Law: Emerald (`#10B981`)
KWAIX.dev enforces a strict rule: **There is only ONE accent color.**

- **The Accent:** Emerald Green (`#10B981` / `rgb(16, 185, 129)`)
- **Why Emerald?** Emerald evokes classic terminal phosphors, telemetry systems, radar monitors, and positive operational status.
- **Why only ONE accent?** Multi-colored websites look like marketing brochures or toy apps. A single accent creates focused visual hierarchy and signals serious engineering discipline.

```
Token:               Value:         Visual Meaning:
--emerald            #10B981        Active links, key highlights, success states
--emerald-dim        #059669        Muted green borders and inactive indicators
--emerald-glow       rgba(...)      Subtle glowing background behind buttons/cards
```

### B. Surface Levels & Dark/Light Hierarchy

Instead of flat black, KWAIX uses a three-tier elevation model:

```
┌────────────────────────────────────────────────────────┐
│ Level 3: Overlay / Popups / Terminal / Lightbox        │
│ CSS: bg-surface-2 / border-border                      │
├────────────────────────────────────────────────────────┤
│ Level 2: Cards & Interactive Containers                │
│ CSS: bg-surface (.glass) / border-border-subtle        │
├────────────────────────────────────────────────────────┤
│ Level 1: Page Background                               │
│ CSS: bg-primary (Dark: #09090b / Light: #f8fafc)       │
└────────────────────────────────────────────────────────┘
```

#### Token Mapping:
| Design Token | Dark Mode Value | Light Mode Value | Used For |
|---|---|---|---|
| `--bg-primary` | `#09090b` (Deep Zinc) | `#f8fafc` (Clean Slate) | Global page background |
| `--bg-surface` | `#111115` | `#ffffff` | Standard card containers |
| `--bg-surface-2`| `#18181f` | `#f1f5f9` | Elevated cards, dropdowns, code blocks |
| `--border-subtle`| `rgba(255, 255, 255, 0.08)` | `rgba(0, 0, 0, 0.08)` | Delicate dividing lines |
| `--text-primary` | `#fafafa` | `#0f172a` | Main headings and body titles |
| `--text-secondary`| `#a1a1aa` | `#475569` | Descriptions and body text |
| `--text-muted`   | `#71717a` | `#64748b` | Captions, dates, and metadata |

---

## 4. Typography & Fonts

KWAIX uses two typography families provided by Vercel:

1. **Geist (Sans-Serif):** Used for human-readable headings, body paragraphs, and long-form journal articles. Clean, modern, highly legible at all sizes.
2. **Geist Mono (Monospace):** Used for codenames, technical metadata, labels, status chips, and the terminal.

```
Classes:
font-sans          → Geist Sans
font-mono          → Geist Mono (Standard monospaced)
font-mono-custom   → Geist Mono with tight letter spacing for titles
```

---

## 5. Reusable Utility Classes (`app/globals.css`)

### A. `.glass` (Glassmorphism Container)
Creates a modern frosted-glass appearance over any background:
```css
.glass {
  background: var(--bg-surface);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-subtle);
  border-radius: 1rem;
}
```

### B. `.label-mono` (Technical Metadata Heading)
Used for small uppercase metadata tags above titles (e.g. `INFRA // SYSTEMS`):
```css
.label-mono {
  font-family: var(--font-geist-mono);
  font-size: 0.6875rem; /* 11px */
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}
```

### C. `.pulse-dot` (Live Radar Indicator)
A small glowing green dot that gently pulses to indicate live operations:
```css
.pulse-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background-color: var(--emerald);
  box-shadow: 0 0 8px var(--emerald);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

### D. `.site-shell` (Global Layout Container)
Wraps every page view to maintain consistent margins and prevent content from stretching too wide on ultrawide monitors:
```css
.site-shell {
  width: 100%;
  max-width: var(--wide-max, 120rem);
  margin-left: auto;
  margin-right: auto;
  padding-left: clamp(1rem, 4vw, 3rem);
  padding-right: clamp(1rem, 4vw, 3rem);
}
```

---

## 6. Motion & Accessibility

### Principles of Motion:
1. **Restrained Durations:** Animations should be fast and crisp (between `150ms` and `250ms`).
2. **Spatial Continuity:** Dialogs fade in while subtly scaling (`scale: 0.98` → `scale: 1.0`).
3. **Zero Motion for Decoration:** Animations only run to communicate state changes or reveal loaded data.

### Reduced Motion Support:
Every Framer Motion component and CSS transition automatically respects visitors who have enabled `prefers-reduced-motion` in their operating system settings.

---

## 7. Common Mistakes

- **Mistake:** Using random arbitrary Tailwind color classes like `text-blue-400` or `bg-purple-600` for general UI elements.  
  *Fix:* Stick strictly to the defined tokens: `text-primary`, `text-secondary`, `text-muted`, and `text-emerald`.
- **Mistake:** Hardcoding pixel widths like `w-[1400px]` on page containers.  
  *Fix:* Always wrap page content in the `.site-shell` container class.

---

## 8. Related Chapters

- [Chapter 5: Components](05-components.md) — How components consume these tokens.
- [Chapter 11: Rules & Philosophy](11-rules-and-philosophy.md) — Why the single accent rule is non-negotiable.
