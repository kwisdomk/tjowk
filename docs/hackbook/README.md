# KWAIX Hackbook

> **The Living Technical Handbook for [KWAIX.dev](https://kwaix.dev)**  
> Built for Wisdom Kinoti, future collaborators, and AI assistants.

---

## What is this book?

This is **not a README**.  
This is **not marketing documentation**.  

The **KWAIX Hackbook** is the technical instruction manual for the entire KWAIX.dev platform. It explains how the code works, why each part exists, where data lives, and what happens when things change.

If you step away from this project for six months, you should be able to open this book and immediately understand the codebase without guessing or reverse engineering.

---

## Who is this written for?

This book is written with a specific reader in mind:

1. **Wisdom (Product Owner & Cybersecurity Engineer):** An engineer who understands security, Linux, protocols, and systems deeply, but does not specialize in modern frontend frameworks.
2. **AI Assistants (Local & Cloud):** Contextual handbook to ensure changes respect the architecture, design system, and data flow.
3. **Future Developers & Collaborators:** Anyone joining the project to review, audit, or build features.

---

## Two ways to read this book

### Mode 1: Learning (Front to Back)

If you want to understand how the entire system is built, read the chapters in order:

1. **[Chapter 1: What is KWAIX?](chapters/01-what-is-kwaix.md)** — The mission, philosophy, and purpose.
2. **[Chapter 2: Architecture](chapters/02-architecture.md)** — How the system is wired together.
3. **[Chapter 3: Data Layer](chapters/03-data-layer.md)** — The JSON files and schemas that power the site.
4. **[Chapter 4: Pages](chapters/04-pages.md)** — Every URL route and what it does.
5. **[Chapter 5: Components](chapters/05-components.md)** — The visual building blocks.
6. **[Chapter 6: Design System](chapters/06-design-system.md)** — Colors, surfaces, typography, and motion.
7. **[Chapter 7: Content Guide](chapters/07-content-guide.md)** — Step-by-step instructions for adding content.
8. **[Chapter 8: API & Backend](chapters/08-api-and-backend.md)** — Serverless functions, forms, and auth.
9. **[Chapter 9: SEO & Infrastructure](chapters/09-seo-and-infra.md)** — Deployment, metadata, and analytics.
10. **[Chapter 10: The kOS Terminal](chapters/10-terminal.md)** — The interactive terminal emulator.
11. **[Chapter 11: Rules & Philosophy](chapters/11-rules-and-philosophy.md)** — Non-negotiable engineering rules.

### Mode 2: Quick Reference (Lookups)

Need to know where something is right now?

- **Where is my quote stored?** → See [Chapter 3: Data Layer](chapters/03-data-layer.md#profilejson) (`content/profile.json`).
- **What breaks if I change a schema?** → See [Appendix B: Dependency Map](appendices/dependency-map.md).
- **Don't know what a word means?** → Check the **[Glossary](glossary.md)**.

---

## Core Rule of the Hackbook

> **Rule #1:** If a future version of yourself cannot understand a page after six months away from the project, the Hackbook is not finished.
