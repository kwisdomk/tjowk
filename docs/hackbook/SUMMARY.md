# Table of Contents

* [Introduction](README.md)
* [Glossary of Terms](glossary.md)

---

### Core Concepts
* [Chapter 1: What is KWAIX?](chapters/01-what-is-kwaix.md)
  * [The Mission & Purpose](chapters/01-what-is-kwaix.md#the-mission--purpose)
  * [The Operator (Wisdom Kinoti)](chapters/01-what-is-kwaix.md#the-operator-wisdom-kinoti)
  * [What φιλόσοφος Means](chapters/01-what-is-kwaix.md#what-φιλόσοφος-means)
  * [Project ION](chapters/01-what-is-kwaix.md#project-ion)
  * [Collaborative Engineering Model](chapters/01-what-is-kwaix.md#collaborative-engineering-model)

* [Chapter 2: Architecture](chapters/02-architecture.md)
  * [Next.js App Router for Systems Engineers](chapters/02-architecture.md#nextjs-app-router-for-systems-engineers)
  * [Server Components vs Client Components](chapters/02-architecture.md#server-components-vs-client-components)
  * [The Rendering Pipeline](chapters/02-architecture.md#the-rendering-pipeline)
  * [Data Flow Diagram](chapters/02-architecture.md#data-flow-diagram)

* [Chapter 3: Data Layer](chapters/03-data-layer.md)
  * [Why Flat Files Over a Database?](chapters/03-data-layer.md#why-flat-files-over-a-database)
  * [profile.json (Identity & Bio)](chapters/03-data-layer.md#profilejson-identity--bio)
  * [status.json (Live Operations)](chapters/03-data-layer.md#statusjson-live-operations)
  * [certs.json (Capability Register)](chapters/03-data-layer.md#certsjson-capability-register)
  * [timeline.json (Chronological Proof)](chapters/03-data-layer.md#timelinejson-chronological-proof)
  * [projects/*.json (Workload Records)](chapters/03-data-layer.md#projectsjson-workload-records)
  * [journal/*.md (Dispatches & Field Notes)](chapters/03-data-layer.md#journalmd-dispatches--field-notes)
  * [Zod Schemas & Type Safety](chapters/03-data-layer.md#zod-schemas--type-safety)
  * [Content Loaders (loaders.ts)](chapters/03-data-layer.md#content-loaders-loadersts)

---

### Implementation Details
* [Chapter 4: Pages](chapters/04-pages.md)
  * [Root Layout (app/layout.tsx)](chapters/04-pages.md#root-layout-applayouttsx)
  * [Home / Transmission (app/page.tsx)](chapters/04-pages.md#home--transmission-apppagetsx)
  * [Workloads Index (app/projects/page.tsx)](chapters/04-pages.md#workloads-index-appprojectspagetsx)
  * [Workload Detail (app/projects/[id]/page.tsx)](chapters/04-pages.md#workload-detail-appprojectsidpagetsx)
  * [Operator / About (app/about/page.tsx)](chapters/04-pages.md#operator--about-appaboutpagetsx)
  * [Credentials (app/certs/page.tsx)](chapters/04-pages.md#credentials-appcertspagetsx)
  * [Signal / Contact (app/contact/page.tsx)](chapters/04-pages.md#signal--contact-appcontactpagetsx)
  * [Journal / Logs (app/journal/page.tsx)](chapters/04-pages.md#journal--logs-appjournalpagetsx)
  * [404 Process Terminated (app/not-found.tsx)](chapters/04-pages.md#404-process-terminated-appnot-foundtsx)

* [Chapter 5: Components](chapters/05-components.md)
  * [Component Directory Structure](chapters/05-components.md#component-directory-structure)
  * [Layout: Navbar](chapters/05-components.md#navbar)
  * [Layout: Footer](chapters/05-components.md#footer)
  * [Home: IdentityBlock](chapters/05-components.md#identityblock)
  * [Home: CurrentOps](chapters/05-components.md#currentops)
  * [Projects: FeaturedCard](chapters/05-components.md#featuredcard)
  * [Projects: HorizontalTimeline & TimelineSpine](chapters/05-components.md#horizontaltimeline--timelinespine)
  * [Projects: VisualGallery](chapters/05-components.md#visualgallery)
  * [Certs: CredentialCard](chapters/05-components.md#credentialcard)
  * [Contact: ContactForm](chapters/05-components.md#contactform)
  * [UI Primitives: GlassCard, StatusBadge, Button, ThemeToggle](chapters/05-components.md#ui-primitives)

* [Chapter 6: Design System](chapters/06-design-system.md)
  * [What is a Design Token?](chapters/06-design-system.md#what-is-a-design-token)
  * [The Single Accent Rule (Emerald)](chapters/06-design-system.md#the-single-accent-rule-emerald)
  * [Surface Levels & Elevation](chapters/06-design-system.md#surface-levels--elevation)
  * [Typography & Fonts (Geist & Geist Mono)](chapters/06-design-system.md#typography--fonts)
  * [The Site Shell & Responsive Gutters](chapters/06-design-system.md#the-site-shell--responsive-gutters)
  * [Motion & Reduced Motion Support](chapters/06-design-system.md#motion--reduced-motion-support)

---

### Operations & Guides
* [Chapter 7: Content Guide](chapters/07-content-guide.md)
  * [How to Update Your Live Status](chapters/07-content-guide.md#how-to-update-your-live-status)
  * [How to Add a New Project](chapters/07-content-guide.md#how-to-add-a-new-project)
  * [How to Add a Certification](chapters/07-content-guide.md#how-to-add-a-certification)
  * [How to Add a Timeline Entry](chapters/07-content-guide.md#how-to-add-a-timeline-entry)
  * [How to Publish a Journal Post](chapters/07-content-guide.md#how-to-publish-a-journal-post)
  * [Common Mistakes & Validation Errors](chapters/07-content-guide.md#common-mistakes--validation-errors)

* [Chapter 8: API & Backend](chapters/08-api-and-backend.md)
  * [Serverless Architecture](chapters/08-api-and-backend.md#serverless-architecture)
  * [Contact API & Resend Email Delivery](chapters/08-api-and-backend.md#contact-api--resend-email-delivery)
  * [Security Controls: Honeypot, HTML Escaping, Rate Limits](chapters/08-api-and-backend.md#security-controls)
  * [GitHub OAuth PKCE Authentication Flow](chapters/08-api-and-backend.md#github-oauth-pkce-authentication-flow)

* [Chapter 9: SEO & Infrastructure](chapters/09-seo-and-infra.md)
  * [Metadata Generation (Static & Dynamic)](chapters/09-seo-and-infra.md#metadata-generation)
  * [Dynamic Sitemap & Robots Rules](chapters/09-seo-and-infra.md#dynamic-sitemap--robots-rules)
  * [Edge OpenGraph Image Generation](chapters/09-seo-and-infra.md#edge-opengraph-image-generation)
  * [Vercel Deployment & Web Analytics](chapters/09-seo-and-infra.md#vercel-deployment--web-analytics)

* [Chapter 10: The kOS Terminal](chapters/10-terminal.md)
  * [Why a Terminal Emulator Exists](chapters/10-terminal.md#why-a-terminal-emulator-exists)
  * [Virtual File System & State Machine](chapters/10-terminal.md#virtual-file-system--state-machine)
  * [Supported Commands Reference](chapters/10-terminal.md#supported-commands-reference)
  * [Accessibility & Dialog Focus Trapping](chapters/10-terminal.md#accessibility--dialog-focus-trapping)

* [Chapter 11: Rules & Philosophy](chapters/11-rules-and-philosophy.md)
  * [The 10 Non-Negotiable Data Rules](chapters/11-rules-and-philosophy.md#the-10-non-negotiable-data-rules)
  * [Evidence-First vs Aesthetics-First](chapters/11-rules-and-philosophy.md#evidence-first-vs-aesthetics-first)
  * [What Never to Put in This Repository](chapters/11-rules-and-philosophy.md#what-never-to-put-in-this-repository)

---

### Reference
* [Appendix A: File Map](appendices/file-map.md)
* [Appendix B: Dependency Map](appendices/dependency-map.md)
* [Appendix C: Environment Variables](appendices/environment-variables.md)

---

### Architecture Decision Records (ADR)
* [ADR 001: Choice of Next.js App Router](adr/001-why-nextjs.md)
* [ADR 002: Flat JSON Files Instead of a Database](adr/002-why-json-not-database.md)
* [ADR 003: Single Emerald Accent Color](adr/003-why-one-accent-color.md)
* [ADR 004: Terminal & Systems Metaphor](adr/004-why-terminal-language.md)
* [ADR 005: Strict Schema Validation with Zod](adr/005-why-zod-validation.md)
