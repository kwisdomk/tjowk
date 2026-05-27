# Guide 09 - CMS: Private Portfolio Operations Editor

> Product boundary and delivery sequence for TJOWK CMS v1. This guide defines
> the approved feature scope; existing configuration is not proof that a
> capability is approved or production-ready.

## Purpose

TJOWK is a living CV and operations dashboard. The CMS is a private,
owner-only editing interface for updating the public portfolio data without
manually editing repository files.

The CMS exists to make accurate updates practical. It must not grow into a
general application backend, public account system, or unreviewed content
platform.

## Source Of Truth

- Public content remains repository-tracked JSON or Markdown under `content/`.
- The CMS publishes changes back to that Git-backed content source.
- The public UI reads validated content through the existing server-only
  loaders and schemas.
- CMS editing does not weaken the content integrity rules in
  `lib/content/_rules.ts`.
- The UI must not invent claims, outcomes, metrics, or activity.

## Product Boundary: v1

| Content Area | v1 Actions | Removal Behavior |
|---|---|---|
| Current operation/status | Edit existing | No deletion |
| Profile/about | Edit existing | No deletion |
| Projects | Create, edit, archive/unarchive | Never hard delete; archive instead |
| Certifications | Create, edit, hide/show | Never hard delete in v1 |
| Timeline/operations log | Create, edit, hide/show | Never hard delete in v1 |

## Explicitly Out Of Scope

- Journal posts
- Permanent deletion
- Multi-user roles
- Draft/review publishing workflow
- Complex media uploads
- Comments
- Analytics features specific to the CMS
- An external CMS database
- A custom admin dashboard while Decap satisfies the requirement

## Publishing Model

The CMS uses the Git-backed production flow:

```text
CMS publish -> GitHub content commit -> Vercel production deployment -> updated public site
```

For v1, changes should publish directly when saved. "Go live immediately"
means the GitHub and Vercel flow starts automatically after publication; it
does not mean a direct database mutation or an update with zero deploy time.

The status-seed implementation uses direct publishing by omitting Decap's
editorial workflow. Later phases must preserve this model unless the product
boundary is explicitly revised.

## Existing Architecture Direction

Verified repository direction:

- Decap CMS is the intended admin interface at `/admin`.
- Public content is stored in `content/` and validated from `lib/content/`.
- The canonical production origin is `https://kwaix.dev`.
- `public/admin/config.yml` contains GitHub backend configuration targeting
  `kwisdomk/tjowk`.
- Candidate Next.js OAuth routes exist in the working tree at `/api/auth` and
  `/api/callback`; they are candidate implementation work until deployed and
  production-tested.

The status-seed candidate restricts Decap to status editing and direct
publishing, pending production validation.

Decap requires a global `media_folder` configuration to load. The status-seed
retains `public/uploads` only as required platform configuration; no media
field or media-management workflow is exposed in the v1 status editor.

## Admin And Authentication Boundary

- `/admin` is the v1 editing interface.
- `/api/auth` and `/api/callback` exist only to authenticate the private CMS
  workflow.
- Only GitHub identity `kwisdomk` may complete CMS authentication.
- The OAuth callback origin is `https://kwaix.dev/api/callback`.
- OAuth scope remains `public_repo` while the repository remains public.
- `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` remain server-side Vercel
  Production environment variables.
- Tokens issued to rejected identities must be revoked server-side where
  possible.
- No public login, general user accounts, roles, or comment authentication
  belong in this feature.

## Minimal Data Lifecycle Rules

- Status and profile are singleton records: editable, not creatable or
  deletable.
- Projects are historical records. Removal from active display uses an
  archived state; project files are never hard deleted through v1 CMS.
- Certifications are removed from public display by hide/show behavior in
  v1, not deletion.
- Timeline entries are removed from public display by hide/show behavior in
  v1, not deletion.
- Visibility fields for certifications or timeline entries must only be added
  after checking whether an equivalent verified schema and render behavior
  already exists.

## Implementation Sequence

CMS v1 is built and reviewed as small phases, not one implementation pass.

| Phase | Capability | Completion Proof |
|---|---|---|
| 0 | Confirm existing model mapping | Schemas and Decap collections reviewed; no code built from assumptions |
| 1 | Owner login seed | `kwisdomk` can access `/admin`; other identities cannot |
| 2 | Current operation edit seed | Status is edited from CMS and the updated operation appears on the homepage after deployment |
| 3 | Profile editing | Existing profile/about content can be changed safely |
| 4 | Project management | Projects can be created, edited, and archived without deletion |
| 5 | Certification management | Certifications can be created, edited, and hidden without deletion |
| 6 | Timeline management | Timeline entries can be created, edited, and hidden without deletion |
| 7 | Production QA and security review | Authentication, content integrity, and publishing flow are verified |

Each phase requires review before the next capability is enabled. Later v1
capabilities must not be exposed in the admin interface merely because their
content files already exist.

## First Acceptance Test

The first successful CMS workflow is limited to current status:

1. Open `https://kwaix.dev/admin`.
2. Authenticate as `kwisdomk`.
3. Edit only the existing current operation/status record.
4. Publish the change.
5. Confirm the repository content commit is correct.
6. Wait for the Vercel production deployment to complete.
7. Confirm the updated operation appears on `https://kwaix.dev`.

No project, certification, timeline, profile, or journal editing is part of
this first acceptance test.

## Guardrails For AI-Assisted Development

- Do not build the entire CMS in one change.
- Do not add or expose journal support in v1.
- Do not enable permanent deletion.
- Do not build custom admin screens while Decap meets the requirement.
- Do not refactor the content architecture as part of authentication work.
- Do not combine unrelated documentation, design, SEO, or portfolio-content
  changes with CMS implementation commits.
- Do not publish unsupported claims through an editing workflow.
- Each implementation phase must return an explicit diff and verification
  result for review before deployment.

## Current Implementation Status

| State | Item |
|---|---|
| Verified in repository | JSON/Markdown public content exists under `content/` and Decap configuration exists at `public/admin/config.yml` |
| Verified in repository | CMS config identifies GitHub backend, `https://kwaix.dev`, `/api/auth`, and `public_repo` in the inspected working tree |
| Included in status-seed candidate | Next.js CMS OAuth routes at `app/api/auth/route.ts` and `app/api/callback/route.ts` |
| Configured externally by owner | GitHub OAuth App and Vercel Production environment variables have been created; credential values are not documented here |
| Not yet tested in production | Owner login through the custom OAuth bridge |
| Not yet tested in production | CMS publication of a status change and resulting homepage update |
| Included in status-seed candidate | Decap configuration restricted to status editing and direct publishing |

## Open Questions

- Whether certifications already have a suitable visibility field or need a
  minimal schema and rendering change in Phase 5.
- Whether timeline entries already have a suitable visibility field or need a
  minimal schema and rendering change in Phase 6.
- Which exact Decap collection restrictions are required in each phase so
  unimplemented capabilities are not exposed early.
- Whether the candidate OAuth callback handshake behaves correctly with the
  reviewed Decap client version in production.
