# tjowk Workstreams

## Locked Decisions

- The systems/operator visual identity and naming are intentional and retained.
- The CMS is the approved editing workflow for maintaining portfolio content.
- The chosen canonical public domain is `https://kwaix.dev`.
- `https://www.kwaix.dev` should later permanently redirect to the apex domain.
- The CV is private reference material only and must never be committed or published.

## Active Workstream

### CMS Operations

Status:
- Phase 1 owner login seed: complete.
- Phase 2 current operation edit seed: complete.
- Phase 7 production QA: active.
- Next CMS phase: Profile/About editing.

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
