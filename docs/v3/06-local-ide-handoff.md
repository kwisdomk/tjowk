# Local IDE handoff — SHADO evidence and planning corrections

Date: 2026-09-07
Status: ready to execute local verification; no publication or redesign authorised by this document alone

## Work already completed here

- Independent source review: [03-shado-evidence-review.md](03-shado-evidence-review.md).
- Case-study draft: [04-shado-case-study-draft.md](04-shado-case-study-draft.md).
- Next-candidate review: [05-next-project-evidence-review.md](05-next-project-evidence-review.md).

Do not repeat the broad GitHub audit or rewrite the narrative from scratch. Concentrate on missing execution evidence and report discrepancies.

## Immediate local assignment

1. Locate SHADO, inspect its Git state, and use a separate checkout. Preserve existing local changes. Record the exact tested revision; reconcile differences from `b2ae3372852e673faef9b3d196e57bc804339fd6`.
2. Inspect scripts, then run the documented clean install, tests, lint and build. README records Node 24.12.0/npm 11.6.2 for historical reproduction; record actual versions and deviations. Capture exit codes and concise results. Do not silently repair failures.
3. Use synthetic examples for the input → masking review → results journey. Include a benign message, credential request, manually edited preview, empty input and oversized input. Verify keyboard operation and a narrow mobile viewport.
4. Observe network, storage and URL behaviour during analysis. Separate initial page assets from message transport. Report the boundary actually checked, not a blanket privacy certification.
5. Capture real screenshots of the editable review and results, plus a concise run log. Use a new evidence directory in the isolated checkout. Record commit, example and viewport for each image. Do not use the screenshot-named logo file as runtime evidence.
6. Return a verification report listing passes, failures, blockers and evidence paths. Review personal contribution with Wisdom before turning the draft into first-person public copy.

Suggested commands, only after inspecting the scripts:

```text
npm ci --no-audit --no-fund
npm test
npm run lint
npm run build
```

No website application changes, project promotion, Git staging/committing in `tjowk`, or deployment are part of this verification assignment.

## Corrections needed before freezing the existing specification

The existing `01` and `02` documents were read but left untouched to avoid concurrent edits with the local IDE. They still contain stale or unsupported planning statements:

- Treat them as drafts until review is complete; “Approved for Baseline Planning” should not imply approval of every statement.
- Replace Mr. Roboto's “Complete & Verified” verdict with source-inspected/runtime-unverified. SHADO is now the provisional first case study.
- Correct `ai-athena`: the reviewed GitHub project is a Gemini/Vite hardware-advice app, not evidence of the earlier local Ollama/CUDA agent description. Establish project identity before reusing that name.
- A diagram explains design; it does not independently prove execution. “14 verified JSON files” conflates schema-valid content with verified project claims.
- Preserve backend functionality but qualify “hardened” security language until supported by relevant verification.
- Remove the blanket `git add .` and “guarantees zero data loss” recommendation. Review and stage deliberately; a same-directory branch switch is not a separate checkout. Worktrees created from a commit do not inherit uncommitted changes.
- Reconcile route choices: the earlier plan proposed `/work` and `/credentials`; the documents retain `/projects` and `/certs` without explaining that change. Keep current routes until a final migration map is settled; do not switch URLs implicitly.
- Preserve terminal vocabulary with visible human meanings. The invented Identity/Signal/Research labels were not a settled replacement. Functional alternate navigation is the agreed direction, with implementation staged after the ordinary site works.
- Avoid fictional uptime telemetry from static JSON. Define what a status actually measures.
- Remove arbitrary hardware-dependent build-time acceptance. Define browser performance test conditions and distinguish lab measurements from field data. Lighthouse scores alone do not establish accessibility compliance.
- Clarify keyboard requirements: modal focus containment is appropriate; an inescapable keyboard trap is not.
- Preserve `/core` as deferred. Do not require new wireframe work for the current SHADO milestone.
- Keep DeepSeek Harness solely as an external AxA learning reference.

## Next checkpoint

Once local evidence is returned, reconcile the draft with the tested revision and choose actual media. Then implement one SHADO case-study layout and its homepage card. Broad page migration and extra visual effects follow only after that example is reviewed.
