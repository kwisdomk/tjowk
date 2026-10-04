# Appendix B: Dependency & Impact Map

> *"Before you touch a file, know what is connected to it."*

---

## 1. Purpose

This dependency map documents **what breaks if a specific file is changed, moved, or deleted**. Use this as a pre-flight checklist before making structural refactors.

---

## 2. Impact Matrix

### If you modify `content/profile.json`:
- **Direct Consumers:**
  - `components/home/IdentityBlock.tsx` (Hero name, alias, subroles, tagline quote, social buttons)
  - `app/about/page.tsx` (Bio narrative, philosophy, machine specs)
  - `components/layout/Footer.tsx` (Copyright and social links)
  - `app/layout.tsx` (Root SEO metadata, site author tags)
  - `app/opengraph-image.tsx` (Social preview card text)
- **Potential Failure:** If required fields like `name` or `tagline` are missing, build fails at Zod validation (`profileSchema`).

---

### If you modify `content/status.json`:
- **Direct Consumers:**
  - `components/home/CurrentOps.tsx` (Active operation display on homepage)
  - `components/layout/Navbar.tsx` (Uptime dot and status pill)
- **Potential Failure:** If `uptime` or `operation` is removed, Zod validation fails (`statusSchema`).

---

### If you modify `lib/content/schemas.ts`:
- **Direct Consumers:**
  - `lib/content/loaders.ts` (Validates every JSON read from disk)
  - All TypeScript types (`Profile`, `Project`, `Cert`, `TimelineEntry`, `SystemStatus`) exported across the entire app.
- **Potential Failure:** Changing a property name in a schema without updating the JSON files will immediately cause `npm run build` to fail across all pages.

---

### If you modify `app/globals.css`:
- **Direct Consumers:**
  - Every page and component using CSS variables (`--bg-primary`, `--emerald`, `--border-subtle`, `.glass`, `.site-shell`, `.label-mono`).
- **Potential Failure:** Renaming a CSS token without updating `tailwind.config.ts` will lead to invisible borders or missing background colors.

---

### If you rename a project file in `content/projects/`:
- **Example:** Renaming `otdt.json` → `maximo.json` (and changing `"id": "maximo"`).
- **Direct Impact:**
  - The URL `/projects/otdt` will now return a **404 Not Found**.
  - Any reference in `content/timeline.json` with `"projectId": "otdt"` will fail to link.
- **Rule:** Do not rename project IDs once published without setting up redirects.

---

### If you modify `lib/content/loaders.ts`:
- **Direct Consumers:**
  - `app/page.tsx`, `app/projects/page.tsx`, `app/projects/[id]/page.tsx`, `app/certs/page.tsx`, `app/journal/page.tsx`, `app/sitemap.ts`.
- **Potential Failure:** A breaking bug in a loader function takes down the entire site build.

---

## 3. Safe Refactoring Checklist

Before merging a pull request or pushing to `main`:
1. Run `npm run build` locally to ensure static generation and Zod validation pass 100%.
2. Run `npm run lint` to verify TypeScript and ESLint compliance.
3. Check that `.env.local` was not accidentally staged in git (`git status`).
