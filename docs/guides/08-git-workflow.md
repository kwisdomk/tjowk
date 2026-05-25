# Guide 08 — Git Workflow
> The Journey · Engineering Guides

---

## Branch Strategy (Solo Dev)

Simple. Two branches:

```
main        ← production. what's live on Vercel. always deployable.
dev         ← active development. merge to main when ready.
```

Feature branches for anything that takes more than one session:
```
feature/timeline-component
feature/contact-form
fix/navbar-mobile
content/update-project-data
```

---

## Commit Message Format

```
type(scope): short description

Types:
feat     → new feature or page
fix      → bug fix
content  → data file updates (projects, timeline, certs)
style    → visual changes, no logic change
refactor → code reorganization, no behavior change
docs     → documentation changes
chore    → config, deps, tooling
```

### Examples
```bash
feat(projects): add timeline spine component
feat(landing): build identity block with status
fix(contact): handle empty message field validation
content(projects): add OTDT and WisdomAI project records
content(timeline): populate full 2024-2026 history
content(status): update current operation to RH124 Ch10
style(navbar): tighten mobile spacing
refactor(glass-card): extract to shared ui component
chore(deps): add resend package
docs: add security guide
```

---

## Daily Workflow

```bash
# Start a session
git checkout dev
git pull origin dev     # if collaborating — solo this is optional

# Work, save, commit often
git add .
git commit -m "feat(projects): add featured card component"

# When a feature is complete and tested
git checkout main
git merge dev
git push origin main    # triggers Vercel auto-deploy

# Back to dev for next thing
git checkout dev
```

---

## When to Deploy (Push to Main)

Push to `main` when:
- A page is complete and working
- Content updates are ready
- Bug fixes are confirmed working

**Do NOT push to main when:**
- Components are half-built
- Data files have placeholder content (`example.com`, `lorem ipsum`)
- `npm run build` fails
- TypeScript errors exist

```bash
# Always run before merging to main
npm run build
npx tsc --noEmit
npm run lint
```

---

## Content Updates (Fastest Path)

When you just need to update data (no code changes):

```bash
# Update lib/content/status.ts or projects.ts
git add lib/content/status.ts
git commit -m "content(status): update to RHSA Ch10"
git push origin main   # deploys in ~30 seconds on Vercel
```

This is the update path you'll use most often. Keep it fast.

---

## What Never Goes in Git

```gitignore
.env
.env.local
.env*.local
node_modules/
.next/
*.log
```

Mental check before every push:
- No API keys
- No personal passwords
- No `.env` files
- No `node_modules`

---

## GitHub Repository Settings

On `kwisdomk/port-wk`:

1. **Branch protection on main:**
   - Settings → Branches → Add rule → `main`
   - Enable: "Require status checks before merging" (optional for solo)
   - Enable: "Restrict pushes that create files" → off for solo

2. **Repo description:** Set to "The Journey — φιλόσοφος"

3. **Topics:** Add: `nextjs`, `portfolio`, `typescript`, `tailwindcss`

4. **Make public:** When the site is live and you're ready

---

## Recovery Commands

```bash
# Undo last commit (keeps changes)
git reset --soft HEAD~1

# Undo last commit (discards changes — careful)
git reset --hard HEAD~1

# Discard all unstaged changes
git checkout .

# See what changed
git diff
git log --oneline -10

# Go back to a specific commit (temporary look)
git checkout abc1234

# Return to current state
git checkout main
```
