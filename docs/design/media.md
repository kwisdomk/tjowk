# Media System

> The biggest identified weakness: tiny screenshots.  
> Solve this before any page is built.

---

## Why This Matters

KWAIX.dev is an evidence-first platform. The primary evidence is technical artifacts:

- Screenshots of systems in operation
- Terminal output showing real commands and results
- Architecture diagrams explaining system design
- Galleries of visual progression
- Before/after comparisons

If these artifacts are too small to read, too poorly framed to inspect, or too generic to feel real — the platform's core promise fails.

Every media presentation decision should answer: **"Can the viewer actually examine this evidence?"**

---

## Media Types & Presentation Standards

### 1. Screenshots

**Purpose**: Prove that something works. Show the real UI, real data, real output.

| Property | Standard |
|---|---|
| **Minimum display width** | 100% of content container (never thumbnail-only) |
| **Aspect ratio** | Preserve original. Common: 16:9, 16:10, 4:3 |
| **Border** | `1px solid var(--color-border)` with `--radius-lg` |
| **Background** | `var(--color-surface-inset)` behind the image (prevents flash during load) |
| **Zoom** | Clickable → lightbox at full resolution |
| **Caption** | Optional. Below image. Mono font, muted text. Describes what the viewer should notice. |
| **Loading** | Skeleton placeholder matching aspect ratio. `loading="lazy"` for below-fold. |
| **Format** | WebP preferred. PNG fallback for diagrams with text. |

### 2. Terminal Output

**Purpose**: Show real command execution, build output, diagnostic results.

| Property | Standard |
|---|---|
| **Container** | Dark surface (`#09090b`) regardless of theme. Monospace font. |
| **Chrome** | macOS-style window controls (red/yellow/green dots). Title bar showing shell context. |
| **Font** | Geist Mono at `--text-xs` (0.6875rem) |
| **Line numbers** | Optional. Muted text. |
| **Scroll** | Horizontal scroll for long lines. No word wrap. |
| **Copy button** | Top-right, subtle, appears on hover. |
| **Max height** | Collapsible if longer than 24 lines. "Show more" pattern. |
| **Syntax** | ANSI-like coloring: green for success, red for errors, yellow for warnings, cyan for info. |

### 3. Architecture Diagrams

**Purpose**: Explain system structure, data flow, component relationships.

| Property | Standard |
|---|---|
| **Style** | Clean, technical. No decorative gradients or 3D effects. |
| **Colors** | Use semantic palette: emerald for active paths, neutral for structure, status colors for state. |
| **Text** | Readable at displayed size. Minimum 11px effective. |
| **Background** | Transparent or surface-level, adapting to light/dark theme. |
| **Format** | SVG strongly preferred. Mermaid for generated diagrams. |
| **Zoom** | Clickable → lightbox. Pinch-to-zoom on mobile. |
| **Fallback** | `alt` text describing the architecture in words. |

### 4. Gallery

**Purpose**: Present multiple related artifacts (e.g., different views of the same project).

| Property | Standard |
|---|---|
| **Strip layout** | 3 thumbnails in a row. Aspect-video (16:9). Click → lightbox. |
| **Grid layout** | Responsive grid: 1 col (mobile), 2 col (tablet), 3 col (desktop). |
| **Overflow indicator** | "+N more" badge on the last visible thumbnail when items exceed the display count. |
| **Hover** | Subtle scale (1.05) + overlay with zoom icon. |
| **Lightbox trigger** | Any thumbnail click opens fullscreen view starting at that index. |
| **Type badge** | Bottom-right label showing `screenshot`, `diagram`, `demo`, etc. |

### 5. Lightbox

**Purpose**: Full-resolution examination of any media artifact.

| Property | Standard |
|---|---|
| **Backdrop** | `bg-black/45 backdrop-blur-sm` |
| **Container** | Centered, max 90vh height, 90vw width. |
| **Navigation** | Arrow keys + click arrows + swipe on mobile. |
| **Counter** | "3 / 7" indicator, mono font, muted. |
| **Caption** | Below image. Alt text + type label. |
| **Close** | X button (top-right) + Escape key + backdrop click. |
| **Animation** | Slide transition between images (0.25s). Fade in/out for open/close. |
| **Keyboard** | ← → for navigation, Escape to close, Tab cycles through controls. |
| **Reduced motion** | Instant image swap, instant open/close. |

### 6. Videos / Demonstrations

**Purpose**: Show systems in operation over time — deployments, interactions, test runs.

| Property | Standard |
|---|---|
| **Player** | Native `<video>` or embedded (YouTube/Loom). No autoplay. |
| **Poster** | Custom thumbnail, not a random frame. |
| **Controls** | Visible. Play/pause, progress, fullscreen, volume. |
| **Aspect ratio** | Preserve original. Container prevents layout shift. |
| **Captions** | Provide when narration exists. |
| **Format** | MP4 (H.264) for self-hosted. WebM alternative. |

### 7. Comparison View (Before/After)

**Purpose**: Show the impact of a change, fix, or improvement.

| Property | Standard |
|---|---|
| **Layout** | Side-by-side on desktop. Stacked on mobile. |
| **Labels** | "Before" / "After" badges. Clear visual separation. |
| **Alignment** | Images should align vertically so the viewer can scan horizontally. |
| **Optional** | Slider overlay (drag handle to reveal before/after). Future enhancement. |

---

## Image Sizing Rules

### The Core Problem

Current project pages display screenshots at thumbnail size within card components. At typical card widths (300–400px), a 1920×1080 screenshot is shrunk to ~30% of readable resolution. Terminal text, UI labels, and data are illegible.

### The Fix

| Context | Minimum Display Width | Max Display Width |
|---|---|---|
| **Card thumbnail** | 100% of card width | Card width |
| **Inline evidence** | 100% of content container | Content container width |
| **Hero/showcase** | 100vw (full bleed) | `--wide-max` |
| **Lightbox** | Image native resolution | 90vw × 90vh |
| **Gallery grid item** | 100% of grid cell | Grid cell width |

### `next/image` Configuration

All images should specify:
- `sizes` attribute matching container widths at breakpoints
- `quality={85}` for photographs, `quality={95}` for screenshots with text
- `priority` for above-fold hero images
- `placeholder="blur"` where possible

---

## Open Questions

- [ ] Should terminal output blocks be interactive (selectable text) or static images?
- [ ] Should a comparison slider component be built for Phase 1, or deferred?
- [ ] Should Mermaid diagrams render client-side or be pre-rendered to SVG at build time?
- [ ] What maximum file size is acceptable for self-hosted videos?
