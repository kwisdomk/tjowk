# Accessibility

> Accessibility is not a feature. It is a quality standard.

---

## Current State (Pre-ION Audit)

### What Already Exists (Checkpointed)

| Area | Implementation | Status |
|---|---|---|
| **Skip link** | `.skip-link` → `#main-content` | ✅ Done |
| **Main landmark** | `<main id="main-content">` | ✅ Done |
| **Terminal dialog** | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` | ✅ Done |
| **Terminal focus trap** | Tab/Shift+Tab cycling, Escape to close | ✅ Done |
| **Terminal trigger** | `aria-haspopup="dialog"`, `aria-expanded`, `aria-controls` | ✅ Done |
| **Terminal log** | `role="log"`, `aria-live="polite"` | ✅ Done |
| **Theme toggle** | `role="group"`, `aria-label`, `aria-pressed` per button | ✅ Done |
| **Focus-visible** | Global `outline: 2px solid var(--emerald)` with `3px` offset | ✅ Done |
| **Reduced motion** | Global `prefers-reduced-motion` override + `useReducedMotion()` hook | ✅ Done |
| **Semantic headings** | Homepage sections use `<h2>` | ✅ Done |
| **Close button** | Terminal close: `aria-label="Close terminal"` with 44px touch target | ✅ Done |
| **Decorative icons** | `aria-hidden="true"` on non-functional icons | ✅ Done |

### What Needs Attention

| Area | Issue | Priority |
|---|---|---|
| **Gallery images** | `alt` text falls back to generic pattern. Could be more descriptive per-image. | Medium |
| **Heading hierarchy** | Some pages may skip heading levels (h1 → h3). Full audit needed per page. | High |
| **Color contrast** | Emerald (`#047857` light / `#10B981` dark) on surfaces needs WCAG AA verification. | High |
| **Muted text contrast** | `--text-muted` (`#5c5c57` light / `#8a8a8a` dark) on backgrounds needs verification. | High |
| **Card click targets** | Some cards use `onClick` without keyboard equivalent. | Medium |
| **Form validation** | Contact form needs `aria-describedby` for error messages. | Medium |
| **Footer links** | External links have `target="_blank"` without informing screen readers. | Low |

---

## ION Accessibility Standards

### Minimum Requirements (Non-Negotiable)

| Standard | Requirement |
|---|---|
| **WCAG Level** | AA compliance minimum. AAA where practical. |
| **Touch targets** | ≥ 44 × 44 CSS pixels for all interactive elements |
| **Focus visibility** | All interactive elements must show a visible focus indicator |
| **Keyboard operation** | Every feature must be operable without a mouse |
| **Color independence** | Information must not be conveyed by color alone (pair with icons, text, or patterns) |
| **Text contrast** | Normal text: ≥ 4.5:1. Large text (≥18px or ≥14px bold): ≥ 3:1 |
| **Heading structure** | One `<h1>` per page. No skipped levels. Logical hierarchy. |
| **Alt text** | Every informational image has descriptive alt text. Decorative images use `alt=""`. |
| **Reduced motion** | All animations respect `prefers-reduced-motion: reduce` |
| **Screen reader** | Content order matches visual order. Hidden elements are properly hidden (`aria-hidden`). |
| **Language** | `<html lang="en">` is set |

### Component-Level Requirements

| Component | ARIA Pattern | Notes |
|---|---|---|
| **Navbar** | `<nav aria-label="Primary navigation">` | Landmark role |
| **Terminal** | Dialog pattern with focus trap | Already implemented |
| **Lightbox** | Dialog pattern with focus trap | Needs implementation |
| **Gallery** | Grid of buttons with `aria-label` per item | Partially implemented |
| **Status badges** | Text content is sufficient | No ARIA needed |
| **Cards (clickable)** | `role="link"` or use `<a>` wrapping | Review needed |
| **Theme toggle** | Group with `aria-pressed` | Already implemented |
| **Timeline** | `<ol>` with `<li>` entries | Semantic list |
| **Contact form** | Labels, `aria-required`, `aria-describedby` for errors | Review needed |
| **Footer** | `<footer>` landmark | Already implemented |

### Media Accessibility

| Media Type | Requirement |
|---|---|
| **Screenshots** | Descriptive `alt` text explaining what the viewer should notice |
| **Diagrams** | `alt` text describing the architecture or a `<figcaption>` |
| **Terminal blocks** | Selectable text (not images). Screen readers can access content. |
| **Videos** | Captions when narration exists. Poster image with alt. |
| **Galleries** | Each item has `aria-label`. Lightbox is keyboard-navigable. |

---

## Verification Checklist (Per Page)

Use this checklist when implementing or reviewing any ION page:

- [ ] Single `<h1>`, no skipped heading levels
- [ ] All interactive elements keyboard-accessible
- [ ] All interactive elements have visible focus state
- [ ] All touch targets ≥ 44px
- [ ] All images have appropriate `alt` text
- [ ] Color contrast passes WCAG AA (verify with DevTools)
- [ ] Reduced motion: all animations disabled or simplified
- [ ] `aria-label` on icon-only buttons
- [ ] `aria-hidden="true"` on decorative elements
- [ ] No content relying on color alone
- [ ] Forms have labels, required indicators, and error descriptions
- [ ] DOM order matches visual reading order
- [ ] No horizontal overflow at 320px viewport width

---

## Open Questions

- [ ] Should a formal accessibility audit tool (e.g., axe-core) be integrated into the CI/CD pipeline?
- [ ] Should automated Lighthouse accessibility scores be tracked per deployment?
- [ ] Is the current focus ring style (`2px solid emerald, 3px offset`) sufficient for all background contexts?
