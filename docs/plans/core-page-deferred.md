# `/core` Deferred Feature Record and Restart Specification

**Status:** Deferred — documentation only  
**Implementation state:** Intentionally absent  
**Route state:** `/core` must not exist until the design is re-approved  
**Last updated:** 2026-07-12  
**Owner decision:** Remove the rejected implementation and preserve enough context to restart correctly later

This document is the source of truth for the deferred `/core` feature. It records the original intent, the two rejected implementation attempts, verified audit findings, the removal decision, and the gates that must be passed before anyone writes a third implementation.

Do not treat this document as authorization to rebuild `/core`. It is a restart specification. The feature remains paused until Wisdom explicitly reopens it.

---

## 1. Current Repository Rule

While this feature is deferred:

- There is no `app/core/` route.
- The KWAIX brand links to `/`, not `/core`.
- `/core` is not a normal navigation item.
- There is no Core-specific component, stylesheet, shell, placeholder image, metric array, or route metadata.
- No sitemap, navigation, or public copy should suggest that `/core` is available.
- All future work starts from this document and a newly approved visual reference.

The absence of a route is intentional. A `404` at `/core` is the correct behaviour until the feature is approved and rebuilt.

---

## 2. Original Purpose

`/core` was conceived as the hidden inner layer of KWAIX.dev: the material behind the normal public interface.

The normal website is the public technical record. `/core` is meant to reveal the person, operating philosophy, connected technical direction, practical systems, and evidence behind that record.

It should feel like opening a technical notebook, system cover, dossier, blueprint, or personal archive. It should reward deliberate exploration without pretending to be secret or protected.

It must not become:

- another homepage;
- a conventional biography page;
- a project-card grid;
- a dashboard;
- a generic Bento layout;
- an AI-invented “cyber” interface;
- a decorative scene that reproduces the information but misses the intended spatial relationship.

The value of `/core` must come from composition, relationship, and personal context—not from adding more prose.

---

## 3. The User's Visual Direction

The clearest retained description is:

1. The upper portion is dominated by the full KWAIX logo or brand artwork, spanning the available width like a fullscreen image.
2. A real, public-safe human image of Wisdom is positioned on the left side of, or anchored into, the logo composition.
3. Below the logo, the middle area contains interesting, defensible metrics and numbers.
4. Below the logo, the right area explains the major activities of Wisdom's technical career in a nutshell.
5. The page uses the screen rather than presenting a narrow “letter” in the middle with large unused side areas.
6. The composition is asymmetric and intentionally placed. It is not a set of equal cards.
7. The wider website may use fuller visual surfaces, but readable prose must still retain an appropriate reading measure.

The exact geometry is not fully recoverable from text alone. The original sketches or a newly annotated replacement are required before another build.

### Spatial principle

Rejected model:

```text
container
└── neat grid
    └── cards
```

Required model:

```text
viewport canvas
└── primary logo/frame geometry
    ├── portrait anchored to the left relationship
    ├── metrics anchored beneath the mark
    ├── career activity summary on the lower right
    ├── supporting journey/evidence artefacts
    └── deliberate overlap, depth, and negative space
```

The next attempt must begin with geometry, not content components.

---

## 4. Intended Discovery and Functional Behaviour

These requirements were considered sound, but they are not currently implemented:

- The complete KWAIX brand area can become the intentional entry point after `/core` is approved.
- `/core` should not appear as a standard navbar item.
- The page should contain an explicit return control such as `Return to public interface`.
- Page metadata should use:

  ```ts
  robots: {
    index: false,
    follow: true,
  }
  ```

- `noindex` is not privacy or access control. All rendered content remains public.
- The page must work in Light, System, and Dark themes.
- Keyboard operation, focus visibility, semantic headings, sufficient contrast, and reduced-motion behaviour are required.
- No private client, employer, credential, infrastructure, or security-sensitive details may be exposed.

These mechanics must be reintroduced only after the visual composition is accepted.

---

## 5. Intended Information Zones

The following content categories remain valid. Their presentation is unresolved.

### Identity

- Wisdom Kinoti
- Junior Cybersecurity Analyst
- Nairobi, Kenya
- UTC+3
- `φιλόσοφος`
- “I blueprint things before they escape.”
- Current direction: Cybersecurity × AI Systems

Canonical profile copy must come from `content/profile.json` through `getProfile()` rather than being duplicated inside a page.

### Technical direction

The conceptual path is:

```text
Computer Science
→ Cybersecurity
→ Secure Systems
→ Automation
→ AI-assisted Defence
```

This is not a chronological CV. It explains how the work connects.

### Practical systems

Possible public systems include:

- AEGIS
- Mr. Roboto
- AI-ATHENA / the approved public name for local AI work
- KWAIX-EYES only after sufficient public evidence exists

Systems must come from `getProjects()` and existing project data. Names, statuses, descriptions, and links must not be maintained a second time in `/core`.

### Execution evidence

Metrics must be defensible and derived. Candidate sources include:

- number of public project records;
- number of dated timeline entries;
- span of the public technical record;
- active or maintained public systems;
- completed, active, and planned learning records, clearly separated;
- recent verified releases or public logs.

Avoid “Generated Pages,” “Search Console Verified,” “Contact Form Hardened,” or similar implementation trivia as career metrics unless the context genuinely makes them meaningful.

A future metric should follow a structure such as:

```ts
type CoreMetric = {
  label: string;
  value: string;
  explanation: string;
  evidenceHref?: string;
  asOf: string;
};
```

### Recent signals

Recent activity should be derived from public timeline and journal data, not manually copied. Suitable sources are `getTimeline()` and `getAllPosts()`.

---

## 6. Attempt One — Centered Card

### What was built

The first implementation created:

- an App Router `/core` route;
- `noindex, follow` metadata;
- a KWAIX brand link to `/core`;
- Light/System/Dark controls;
- a portrait placeholder;
- a boxed square logo;
- hardcoded metrics;
- a “Me in 30 seconds” biography list;
- interests rendered as pills;
- a conventional responsive flex/grid layout.

The page hierarchy was effectively:

```text
viewport
└── centered max-w-5xl card
    ├── portrait + logo + biography row
    └── metrics + details grid
```

### What was technically correct

- The route existed.
- Metadata was correct.
- The navbar discovery path existed.
- The theme selector worked.
- The layout stacked without horizontal overflow.
- The project built successfully at the time it was reviewed.

### Why it was rejected

The implementation reproduced information, not the intended composition.

The verified width cap was `max-w-5xl`, or 1024 pixels. At a 1920-pixel viewport, the live page left approximately 446 pixels unused on each side. This created the exact “letter in the middle of the screen” appearance that Wisdom did not want.

It also relied on:

- a missing `/images/core-bg-placeholder.jpg` request;
- a portrait placeholder instead of a human image;
- a square logo declared with incorrect horizontal dimensions;
- hardcoded identity and metrics that could drift from canonical data;
- generic cards and equal regions rather than anchored objects.

The first attempt was not a slightly inaccurate version. It used the wrong composition model.

---

## 7. Audit Between Attempts

The read-only audit established:

- The root layout did not impose the 1024-pixel cap; the Core page imposed it locally.
- The route mechanics were mostly implemented correctly.
- The page did not contain the intended technical journey or connected systems.
- The current KWAIX logo asset was a small square raster, unsuitable as a sharp fullscreen horizontal lockup.
- No public portrait existed under `public/`.
- Existing profile, project, timeline, certification, and journal loaders were available and should have been reused.
- The standard footer margin contributed to unnecessary vertical dead space.
- Theme controls lacked active-state semantics and adequate touch targets.
- Reduced-motion behaviour and floating-control collision rules required attention.

The audit recommended rebuilding from geometry and validating temporary labelled zones before adding final content.

---

## 8. Attempt Two — Full-Bleed Dossier Scene

### What was built

The second implementation replaced the narrow card with:

- a route-specific fullscreen shell;
- a full-width cropped KWAIX artwork field;
- a `WK` monogram portrait fallback;
- anchored identity, metrics, and career activity regions;
- a technical journey trace;
- loader-backed selected systems;
- loader-backed recent public signals;
- personal metadata fragments;
- explicit Core exit controls;
- responsive desktop, tablet, and mobile arrangements;
- accessibility and reduced-motion improvements;
- a wider general site shell.

It passed TypeScript and production builds and was checked at several viewport sizes without horizontal overflow.

### Why it was rejected

The confirmed reason is simple: it still did not reflect Wisdom's intended design.

The following are likely contributors, but they must be validated with Wisdom before being treated as final diagnoses:

- The scene invented a dossier/system aesthetic instead of reconstructing the exact intended frame.
- The implementation advanced too far before an approved low-fidelity geometry existed.
- The `WK` fallback was structurally useful but not the requested real human image.
- The small square logo had to be enlarged and cropped, so the visual could not match a true horizontal hero asset.
- Additional journey, systems, signals, coordinates, and metadata may have competed with the simpler logo/portrait/metrics/activity hierarchy.
- The implementation remained an AI interpretation of the written brief rather than a faithful translation of an approved sketch.

The technical quality of the implementation did not compensate for the mismatch in visual intent.

---

## 9. Removal Decision

On 2026-07-12, Wisdom directed that the Core implementation be deleted and that only sufficient written context remain for a later restart.

The rollback removed:

- `app/core/page.tsx`;
- `app/core/core.module.css`;
- the Core-specific route/shell branch;
- the navigation link to `/core`;
- the Core-only timeline anchor introduced for metric evidence;
- all Core placeholders, metrics, activity zones, journey regions, systems lists, and signals markup.

The KWAIX brand now links to `/`.

General site-wide improvements that do not implement or expose `/core` were retained as independent work, including the wider normal site shell, theme/accessibility improvements, reduced-motion rules, and terminal dialog fixes.

---

## 10. Required Assets Before a Third Attempt

Do not begin the third implementation without:

1. **An approved visual reference**
   - preferably the original sketch;
   - otherwise a new annotated desktop wireframe;
   - it must identify the outer frame, logo bounds, portrait bounds, metric baseline, activity zone, overlaps, and intended empty space.

2. **A public-safe portrait**
   - recommended crop: 4:5;
   - recommended future path: `public/images/core/portrait.webp`;
   - the chosen photograph and crop must be approved by Wisdom.

3. **A suitable brand asset**
   - preferably an SVG or high-resolution horizontal lockup;
   - the current small square PNG must not be treated as a final fullscreen hero;
   - desktop and mobile crops may need separate art direction.

4. **Approved metric definitions**
   - exact labels;
   - derivation rules;
   - evidence links;
   - update ownership;
   - `asOf` dates where appropriate.

---

## 11. Open Decisions

These questions must be answered before implementation:

1. Does the portrait overlap the logo field, sit beside it, or attach to its lower-left seam?
2. How much of the first viewport is occupied by the logo?
3. Is the logo a background/atmosphere or a discrete complete mark that must remain fully visible?
4. Which exact metrics belong in the centre?
5. Which career activities belong on the right, and how short should each be?
6. Are journey, systems, recent signals, and personal fragments required, optional, or out of scope?
7. Should all important content fit in the first viewport, or should the first viewport lead into a continuation?
8. Should `/core` retain the normal navbar or use a separate minimal shell?
9. What is the accepted light-mode treatment for the black-to-white logo artwork?
10. Is the wider/fullscreen treatment for the rest of the site part of this feature or a separate workstream?

No implementer should answer these questions by invention.

---

## 12. Mandatory Restart Process

### Gate 0 — Reopen the feature

Wisdom explicitly changes the status from Deferred to Active.

### Gate 1 — Approve geometry before code

Create one annotated desktop wireframe showing only:

- viewport boundary;
- primary frame;
- logo bounds;
- portrait bounds;
- metric baseline;
- career activity zone;
- overlap/depth notes;
- intended negative space.

Do not add final content, effects, animations, or cards. Wisdom must approve this geometry.

### Gate 2 — Approve responsive transformations

Produce tablet and mobile wireframes.

Mobile should be a deliberate transformed composition, not a squeezed desktop canvas. The likely reading order is:

```text
brand
portrait + identity
metrics
career activity summary
optional supporting evidence
exit
```

Wisdom must approve the hierarchy before code.

### Gate 3 — Approve content mapping

Map every visible field to a canonical source:

- `getProfile()`
- `getProjects()`
- `getTimeline()`
- `getCerts()` if approved
- `getAllPosts()` if approved

Identify any editorial text that cannot be derived and obtain approval for it.

### Gate 4 — Build a geometry-only prototype

Implement labelled boxes or neutral blocks matching the approved wireframes. Do not add final imagery or decorative effects yet.

Validate at:

- 1920 × 1080;
- 1440 × 900;
- 1280 × 720;
- 768 × 1024;
- 390 × 844;
- 320 × 568.

Wisdom must approve the spatial result in the browser.

### Gate 5 — Add assets and content

Only after geometry approval:

- install the approved portrait;
- install the approved horizontal logo/hero asset;
- connect canonical data;
- add final copy;
- add subtle visual treatment.

### Gate 6 — Accessibility and production verification

Required checks:

- a single logical `h1`;
- semantic section headings;
- correct alt text;
- 44-pixel interactive targets;
- visible keyboard focus;
- logical DOM and focus order;
- reduced-motion support;
- no horizontal overflow;
- sufficient contrast in all themes;
- `noindex, follow` rendered correctly;
- no missing asset requests;
- successful TypeScript and production build.

---

## 13. Definition of Done

The future `/core` feature is complete only when:

- Wisdom confirms that the spatial design matches the intended composition;
- the logo, portrait, metrics, and career activity hierarchy is immediately recognizable;
- the page uses the viewport without becoming visually noisy;
- no generic dashboard/card-grid interpretation has returned;
- content is public-safe and traceable to canonical data;
- desktop, tablet, and mobile are intentionally designed;
- the entry and exit paths are clear;
- accessibility and reduced-motion requirements pass;
- production build and visual QA pass;
- documentation is updated to reflect the implemented state.

Technical correctness alone is not acceptance.

---

## 14. Paste-Ready Restart Instruction

Use this only after Wisdom reopens the feature:

```text
Read docs/plans/core-page-deferred.md completely.

Do not implement /core yet. First produce an annotated low-fidelity desktop wireframe from the approved visual reference. It must show the viewport, primary frame, full-width KWAIX mark, portrait anchor, metric baseline, career activity zone, overlap relationships, and intentional negative space.

Do not invent missing geometry. Do not create cards, a dashboard, a Bento grid, a biography layout, or a generic cyber/dossier interface. Do not add final content or effects.

Stop after the wireframe and wait for Wisdom's approval. Only proceed through the documented gates after each approval.
```

---

## 15. Removal Verification Record

Verified on 2026-07-12:

- [x] `app/core/` is absent.
- [x] no source file links to `/core`.
- [x] the KWAIX brand returns to `/`.
- [x] `/core` is absent from the generated route list.
- [x] the production build passes and generated 33 application pages/routes.
- [x] this document remains discoverable from `docs/plans/tjowk-workstreams.md`.
