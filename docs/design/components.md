# Component Inventory

> Don't build. List.  
> These become the implementation backlog.

---

## Inventory Method

Every component is categorized by:

| Field | Description |
|---|---|
| **Name** | Component name |
| **Status** | `EXISTS` (already built), `EVOLVE` (needs ION refinement), `NEW` (does not exist yet) |
| **File** | Current file path (if exists) |
| **Category** | Layout / Navigation / Content / Interactive / Media / Feedback |

---

## Layout Components

| Component | Status | File | Notes |
|---|---|---|---|
| **SiteShell** | EXISTS | CSS class in `globals.css` | `.site-shell` — bounded full-width container with fluid gutters |
| **ReadingMeasure** | EXISTS | CSS class in `globals.css` | `.reading-measure` — 72ch prose constraint |
| **ContentWide** | NEW | — | ~1280px container for structured content (grids, cards) |
| **ContentNarrow** | NEW | — | ~1024px container for focused content (forms, articles) |
| **Section** | EXISTS | CSS class in `globals.css` | `.section` — 6rem vertical padding. Needs semantic variants. |

## Navigation Components

| Component | Status | File | Notes |
|---|---|---|---|
| **Navbar** | EVOLVE | `components/layout/Navbar.tsx` | Needs ION token integration, consistent spacing |
| **Footer** | EVOLVE | `components/layout/Footer.tsx` | Tagline attribution rendering added. Needs ION surface treatment. |
| **SkipLink** | EXISTS | CSS class in `globals.css` | `.skip-link` — keyboard accessibility |
| **FloatingActions** | EXISTS | CSS class in `globals.css` | `.floating-actions` — fixed position container |
| **Breadcrumb** | NEW | — | Path context for nested pages (e.g., `/projects/aegis`) |

## Content Components

| Component | Status | File | Notes |
|---|---|---|---|
| **IdentityBlock** | EVOLVE | `components/home/IdentityBlock.tsx` | Name, role, sub-roles, tagline, location, links |
| **CurrentOps** | EVOLVE | `components/home/CurrentOps.tsx` | System status display |
| **FeaturedCard** | EVOLVE | `components/projects/FeaturedCard.tsx` | Project card with visual gallery strip, tags, status |
| **CredentialCard** | EVOLVE | `components/certs/CredentialCard.tsx` | Certification/learning display |
| **TimelineEntry** | EVOLVE | `components/projects/TimelineEntry.tsx` | Individual timeline item |
| **TimelineSpine** | EVOLVE | `components/projects/TimelineSpine.tsx` | Vertical timeline connector |
| **HorizontalTimeline** | EVOLVE | `components/projects/HorizontalTimeline.tsx` | Scrollable horizontal timeline |
| **ContactForm** | EVOLVE | `components/contact/ContactForm.tsx` | Hardened contact form |
| **ProjectHeader** | NEW | — | Standardized project page hero: title, status, tags, date range |
| **EvidenceCard** | NEW | — | Unified display for technical evidence: screenshot + caption + context |
| **MetricCard** | NEW | — | Single defensible metric with label, value, evidence link, `asOf` |
| **TechStackBar** | NEW | — | Horizontal display of project technologies with icons |

## Interactive Components

| Component | Status | File | Notes |
|---|---|---|---|
| **Button** | EXISTS | `components/ui/button.tsx` | shadcn variant system (default, destructive, outline, secondary, ghost, link) |
| **GlassCard** | EVOLVE | `components/ui/glass-card.tsx` | Needs: surface token alignment, focus states, semantic variants |
| **StatusBadge** | EVOLVE | `components/ui/status-badge.tsx` | 10 variants. Needs: ION color tokens, consistent sizing |
| **Terminal** | EVOLVE | `components/ui/terminal.tsx` | Full interactive terminal. Accessibility improvements checkpointed. |
| **TerminalButton** | EXISTS | `components/ui/terminal.tsx` | Floating trigger button for terminal dialog |
| **ThemeToggle** | EVOLVE | `components/ui/theme-toggle.tsx` | 3-state segmented control. Recently rebuilt. |
| **ThemeProvider** | EXISTS | `components/ui/theme-provider.tsx` | next-themes wrapper |
| **LabelMono** | EXISTS | CSS class in `globals.css` | `.label-mono` — uppercase monospace section label |
| **PulseDot** | EXISTS | CSS class in `globals.css` | `.pulse-dot` — animated status indicator |
| **Tag / Chip** | NEW | — | Reusable pill for tech stacks, categories, filters |
| **Tooltip** | NEW | — | Contextual information on hover/focus |

## Media Components

| Component | Status | File | Notes |
|---|---|---|---|
| **VisualGallery** | EVOLVE | `components/projects/VisualGallery.tsx` | Strip + grid layouts. Lightbox integrated. Needs: ION media standards. |
| **Lightbox** | EXISTS | `components/projects/VisualGallery.tsx` | Embedded in VisualGallery. Full keyboard/swipe support. |
| **MediaFrame** | NEW | — | Standardized border + background + caption wrapper for any image/diagram |
| **TerminalBlock** | NEW | — | Static code/terminal output with chrome, syntax coloring, copy button |
| **ComparisonView** | NEW | — | Before/after side-by-side or slider |

## Feedback Components

| Component | Status | File | Notes |
|---|---|---|---|
| **Toast / Notification** | NEW | — | Form submission confirmation, error feedback |
| **EmptyState** | NEW | — | "No results" or "Coming soon" placeholder |
| **LoadingSkeleton** | NEW | — | Content loading placeholder matching card/image aspect ratios |

---

## Implementation Priority (Recommended)

### Phase 1 — Foundations (Design Tokens)
No new components. Establish tokens and migrate existing components to use them.

### Phase 2 — Shell & Navigation
- Navbar (evolve)
- Footer (evolve)
- Breadcrumb (new)
- FloatingActions (evolve)

### Phase 3 — Primitives
- MediaFrame (new)
- TerminalBlock (new)
- Tag/Chip (new)
- EvidenceCard (new)
- MetricCard (new)
- VisualGallery (evolve)
- StatusBadge (evolve)
- GlassCard (evolve)

### Phase 4 — Page Composition
Compose pages from the above primitives. No new invention at this stage.

### Phase 5 — `/core`
- Any Core-specific components deferred until Core is reopened.

---

## Open Questions

- [ ] Should `GlassCard` be merged with a generic `Card` primitive, or remain separate for glass-specific contexts?
- [ ] Should `StatusBadge` variants be expanded or consolidated? (10 variants is high — some overlap)
- [ ] Should `Button` be rebuilt from the ION token system or continue inheriting shadcn patterns?
- [ ] Is a `Toast` component needed for Phase 1, or can it wait until the contact form is revisited?
