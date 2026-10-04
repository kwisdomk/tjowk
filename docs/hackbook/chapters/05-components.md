# Chapter 5: Components

> *"A good component does one thing well, communicates its state clearly, and never hides its dependencies."*

---

## 1. Purpose

This chapter is the technical reference for every React component in the repository. For each component, it details its location, props, data source, rendering mode (Client vs Server), accessibility features, animations, and known limitations.

---

## 2. Component Directory Map

```
components/
├── layout/
│   ├── Navbar.tsx            → Site navigation header & live status indicator
│   └── Footer.tsx            → Site footer, operational metrics, & social links
├── home/
│   ├── IdentityBlock.tsx     → Hero identity, alias, quote, & social buttons
│   └── CurrentOps.tsx        → Terminal-styled active operations block
├── projects/
│   ├── FeaturedCard.tsx      → Flagship workload showcase card
│   ├── HorizontalTimeline.tsx→ Horizontal scrollable milestone timeline
│   ├── TimelineEntry.tsx     → Compact row entry in timeline
│   ├── TimelineSpine.tsx     → Vertical chronological spine
│   └── VisualGallery.tsx     → Architecture diagram & screenshot lightbox
├── certs/
│   └── CredentialCard.tsx    → Certification badge & progress card
├── contact/
│   └── ContactForm.tsx       → Interactive contact form with honeypot
└── ui/
    ├── status-badge.tsx      → Standardized status chip
    ├── glass-card.tsx        → Frosted glass container primitive
    ├── button.tsx            → Design system button primitive
    ├── theme-toggle.tsx      → Dark / Light mode switcher
    ├── theme-provider.tsx    → next-themes context wrapper
    └── terminal.tsx          → kOS interactive terminal emulator
```

---

## 3. Detailed Component Reference

---

### `IdentityBlock`
- **Location:** `components/home/IdentityBlock.tsx`
- **Type:** Client Component (`'use client'`)
- **Purpose:** Primary homepage hero. Establishes Wisdom's identity, philosophy, and focus.
- **Props:**
  ```typescript
  interface IdentityBlockProps {
    profile: Profile; // Loaded from content/profile.json
  }
  ```
- **Used by:** `app/page.tsx`
- **Data Source:** `content/profile.json`
- **Key Features:**
  - Displays name, Greek handle (`φιλόσοφος`), and timezone (`Nairobi, Kenya · UTC+3`).
  - Renders sub-role tags with subtle borders.
  - Displays the famous tagline quote: *"I blueprint things before they escape..."*
  - Interactive social action buttons (GitHub, LinkedIn, Email).
- **Animations:** Framer Motion staggered fade-in (`y: 20` → `y: 0`, delay `0.05s`).

---

### `CurrentOps`
- **Location:** `components/home/CurrentOps.tsx`
- **Type:** Client Component (`'use client'`)
- **Purpose:** Terminal-styled operations block showing active real-time builds.
- **Props:**
  ```typescript
  interface CurrentOpsProps {
    status: SystemStatus; // Loaded from content/status.json
  }
  ```
- **Used by:** `app/page.tsx`
- **Data Source:** `content/status.json`
- **Key Features:**
  - Styled with `.glass` backdrop blur and emerald accents.
  - Displays primary focus (`operation`), study track (`secondaryOp`), workstation (`Athena`), and `ACTIVE` uptime pill.

---

### `Navbar`
- **Location:** `components/layout/Navbar.tsx`
- **Type:** Client Component (`'use client'`)
- **Purpose:** Persistent site-wide top header.
- **Props:**
  ```typescript
  interface NavbarProps {
    uptime?: string; // e.g. "ACTIVE"
  }
  ```
- **Used by:** `app/layout.tsx` (present on every single page)
- **Key Features:**
  - Sticky header with `backdrop-blur-md` glass styling.
  - Active route highlighting (active navigation links turn emerald).
  - Live status indicator (pulsing green dot).
  - Integrated `ModeToggle` (Dark/Light mode).
  - Responsive mobile drawer navigation menu.

---

### `Footer`
- **Location:** `components/layout/Footer.tsx`
- **Type:** Server Component
- **Purpose:** Site-wide bottom footer.
- **Props:** None (Reads directly or accepts static data).
- **Used by:** `app/layout.tsx`
- **Key Features:**
  - Displays system metadata, timezone (`Nairobi · UTC+3`), and copyright.
  - Quick links to GitHub, LinkedIn, and RSS/Signal feeds.

---

### `FeaturedCard`
- **Location:** `components/projects/FeaturedCard.tsx`
- **Type:** Client Component (`'use client'`)
- **Purpose:** High-density case study card for flagship engineering projects.
- **Props:**
  ```typescript
  interface FeaturedCardProps {
    project: Project;
    index: number;
  }
  ```
- **Used by:** `app/projects/page.tsx` and `app/page.tsx`
- **Key Features:**
  - Category and maturity phase tags (`INFRA // SYSTEMS`).
  - Codename and `StatusBadge`.
  - Embedded `VisualGallery` preview when diagrams are available.
  - Three-column structured problem/solution/result summary.
  - Tech stack tag cloud.
  - Direct links to GitHub source code, live URLs, and `/projects/[id]` deep dive.

---

### `VisualGallery`
- **Location:** `components/projects/VisualGallery.tsx`
- **Type:** Client Component (`'use client'`)
- **Purpose:** Presents architecture diagrams and terminal screenshots with full-screen lightbox inspection.
- **Props:**
  ```typescript
  interface VisualGalleryProps {
    visuals: ProjectVisual[];
    projectName: string;
    layout?: 'carousel' | 'grid';
  }
  ```
- **Key Features:**
  - Keyboard navigation (Arrow keys, Escape to close lightbox).
  - High-resolution image zoom and metadata caption overlay.
  - Zero stock photos—only authentic engineering artifacts.

---

### `HorizontalTimeline` & `TimelineSpine`
- **Location:** `components/projects/HorizontalTimeline.tsx` & `TimelineSpine.tsx`
- **Type:** Client Component (`'use client'`)
- **Purpose:** Visual representation of chronological engineering progression from 2024 to present.
- **Props:**
  ```typescript
  interface HorizontalTimelineProps {
    entries: TimelineEntry[];
  }
  ```
- **Used by:** `app/projects/page.tsx`
- **Data Source:** `content/timeline.json`

---

### `CredentialCard`
- **Location:** `components/certs/CredentialCard.tsx`
- **Type:** Client Component (`'use client'`)
- **Purpose:** Displays individual certification status, scores, and verification links.
- **Props:**
  ```typescript
  interface CredentialCardProps {
    cert: Cert;
    index: number;
  }
  ```
- **Used by:** `app/certs/page.tsx`
- **Data Source:** `content/certs.json`
- **Key Features:**
  - Visual status differentiation (Completed = green border, In-Progress = amber background).
  - Score badge (e.g., `88%`, `100%`) and Credly outbound icon.

---

### `ContactForm`
- **Location:** `components/contact/ContactForm.tsx`
- **Type:** Client Component (`'use client'`)
- **Purpose:** Hardened contact form with spam protection.
- **Props:** None.
- **Used by:** `app/contact/page.tsx`
- **Key Features:**
  - Honeypot anti-spam field (`website` input hidden via CSS and `aria-hidden`).
  - Real-time form validation and loading spinners.
  - Direct async POST to `/api/contact`.

---

### `Terminal` & `TerminalButton`
- **Location:** `components/ui/terminal.tsx`
- **Type:** Client Component (`'use client'`)
- **Purpose:** Interactive browser-based terminal emulator providing an authentic command-line interface.
- **Used by:** `app/layout.tsx` (accessible from any page via the bottom-right floating icon).
- *(See [Chapter 10: The kOS Terminal](10-terminal.md) for full command reference and architecture).*

---

### UI Primitives (`components/ui/`)

| Component | Location | Role |
|---|---|---|
| `StatusBadge` | `components/ui/status-badge.tsx` | Standardized colored status chip (`ACTIVE`, `COMPLETE`, `PAUSED`, `ARCHIVED`, `IN PROGRESS`). |
| `GlassCard` | `components/ui/glass-card.tsx` | Reusable container featuring `.glass` CSS styling, backdrop blur, and rounded borders. |
| `Button` | `components/ui/button.tsx` | Accessible button primitive with variants (`primary`, `outline`, `ghost`, `terminal`). |
| `ModeToggle` | `components/ui/theme-toggle.tsx` | Dropdown/toggle button for switching between Dark, Light, and System themes. |
| `ThemeProvider` | `components/ui/theme-provider.tsx` | Wraps the application in `next-themes` context. |

---

## 4. Common Mistakes

- **Mistake:** Recreating custom badge styles in a page instead of using `<StatusBadge status={...} />`.  
  *Fix:* Always reuse `StatusBadge` to maintain consistent colors across the site.
- **Mistake:** Adding heavy JavaScript libraries to components that only render static text.  
  *Fix:* Keep components as Server Components unless user interactivity (click/hover/state) is required.

---

## 5. Related Chapters

- [Chapter 4: Pages](04-pages.md) — Where these components are mounted.
- [Chapter 6: Design System](06-design-system.md) — The styling and tokens powering these components.
- [Chapter 10: The kOS Terminal](10-terminal.md) — Technical details of the terminal component.
