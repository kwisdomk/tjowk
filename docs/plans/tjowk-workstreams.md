# tjowk Workstreams

## Locked Decisions

- The systems/operator visual identity and naming are intentional and retained.
- The CMS is the approved editing workflow for maintaining portfolio content.
- The chosen canonical public domain is `https://kwaix.dev`.
- `https://www.kwaix.dev` should later permanently redirect to the apex domain.
- The CV is private reference material only and must never be committed or published.

## Active Workstream

### CMS Production Authentication

Status:
- Planning under security review.

Current blocker:
- Production OAuth implementation is not yet approved.
- Canonical-domain configuration must settle on `https://kwaix.dev` before OAuth App registration.

Next approval gate:
- Codex review of the revised authentication plan.
- Wisdom approval of the final authentication approach, access policy, OAuth scope, and production testing method.

Expected later implementation files:
- `app/api/auth/route.ts`
- `app/api/callback/route.ts`
- `public/admin/config.yml`
- `public/admin/index.html`
- existing CMS/deployment documentation under `docs/`

## Queued Workstreams

### Canonical Domain Migration

- Make `https://kwaix.dev` the Vercel primary production domain.
- Permanently redirect `https://www.kwaix.dev` to the apex domain.
- Audit metadata, sitemap, robots, CMS URLs, OAuth URLs, and shared links afterward.

### Portfolio Truth Review

- Use private CV evidence only after the CMS workflow is working.
- Correct internship relationship wording.
- Verify education, credentials, project claims, and public contact details.
- Publish only claims approved by Wisdom and supported by evidence.

### Project Evidence Consolidation

- Gather actual screenshots, repository links, deployment notes, demos, and short technical case studies.
- Add evidence after the CMS editing workflow is operational.

### Timeline Accessibility Follow-Up

- Address existing automated review findings in an isolated PR.
- Do not mix timeline changes into CMS authentication work.

### Search And Distribution

- Configure Search Console after the canonical domain is finalized.
- Submit the sitemap after public URLs consistently use `https://kwaix.dev`.
- Use UTM-tagged links when intentionally distributing the portfolio.

## Privacy Rules

- The CV remains local-only private reference material.
- No private reference details are added to public content without explicit approval.
- No OAuth secrets or other credentials enter source control.
- No unsupported career, certification, employment, or project-outcome claims are published.

## Working Rule

Capture decisions in documentation before implementation, then keep each implementation PR narrowly scoped to one workstream.
