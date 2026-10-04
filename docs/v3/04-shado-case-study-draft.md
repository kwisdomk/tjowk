# SHADO: explaining suspicious messages with local rules

Editorial draft — 2026-09-07. Not approved public copy.
Source revision: `b2ae3372852e673faef9b3d196e57bc804339fd6`.
Evidence register: [03-shado-evidence-review.md](03-shado-evidence-review.md).

## Card copy

**SHADO**

A browser-based prototype that explains warning signs in suspicious Kenyan messages, with editable masking and local rule-based analysis.

Security · TypeScript · Privacy

Maturity: prototype. Portfolio verification: pending local checks.

## Overview

A message that mentions M-PESA or KRA is not necessarily fraudulent. Urgency, credential requests, repayment instructions, and links can change its meaning. SHADO explores how to explain those warning signs without sending the message to an AI service for analysis.

The current implementation uses deterministic TypeScript rules in the browser. Users paste a message, review an editable masked version, and receive an indicator report with supporting evidence and limitations. The score is a rule-derived indicator, not a probability of fraud.

## The problem

Suspicious messages can combine familiar service names with pressure to act. A useful checker needs to distinguish the evidence it found from conclusions it cannot justify. It also needs to consider the personal details someone might paste while asking for help.

SHADO makes both concerns visible: a review step for the text being analysed, followed by an explanation of matched warning signs.

## What the prototype implements

The application normalizes input and masks supported sensitive formats, including selected phone numbers, references, and URL parameters. Users can edit the preview to remove details the masker misses. Masking runs again before the analysis proceeds, with additional defensive handling inside the engine.

The engine extracts signals, calculates a score, applies safety floors, and selects a likely family and relevant actions. A strict report schema validates the structure before rendering. Empty or oversized input produces an uncertain report rather than an ordinary assessment.

The interface presents evidence and limitations alongside the result. It does not block a sender, report a message, or take transaction actions.

## Technical decisions worth explaining

### Keep the analysis local

The inspected analysis path calls the engine directly from the client. There is no implemented message-analysis API or runtime model call. This gives the case study a concrete boundary to explain and verify in the browser. It does not establish a complete offline application or eliminate every privacy consideration.

### Make masking reviewable

Pattern matching cannot reliably remove every name or unfamiliar identifier. The editable preview gives users a chance to correct the text before analysis. Raw input is retained in intermediate application states to support navigation; the implementation does not promise immediate memory erasure.

### Explain a score without pretending it is a probability

The report includes matched evidence and a bounded indicator score. Its contract explicitly marks that score as non-probabilistic. A low result means the rules found few strong indicators, not that the message is safe.

### Test ambiguous and benign cases

The repository contains regression cases for benign service messages, credential requests, ambiguous family assignment, invalid input, and a contextual financial-lure regression. These tests describe intended behaviour and provide useful examples of the boundaries being maintained. Their presence does not establish population-level detection accuracy.

## Proof section — awaiting local evidence

Before publication, replace this editorial section with:

1. An actual screenshot of synthetic input and its editable masked preview.
2. An actual result screenshot showing evidence and limitations together.
3. The explanatory architecture diagram from the evidence register.
4. A concise verification table containing tested revision, environment, commands and outcomes.

Do not substitute the logo image, fabricated terminal output, or an unexecuted checklist for runtime evidence. Keep test results and observed browser behaviour separate.

## Current limitations

- Rules can miss unfamiliar or context-dependent patterns and can flag benign wording.
- Masking covers selected formats and requires user review.
- The indicator is not a fraud probability or a guarantee of safety.
- No runtime AI analysis, inbox integration, automatic reporting, or completed PWA is established at this revision.
- Regression tests are prototype evidence, not a measured accuracy evaluation.

## Contribution and AI assistance — attribution to confirm

The repository documents Codex/GPT assistance with architecture, implementation, review, tests and UI iteration. That describes the development workflow, not the message-analysis runtime.

Before changing this draft into first-person copy, confirm Wisdom's specific design decisions, implementation contributions, verification work, and any inherited material. Do not infer individual authorship solely from repository ownership.

## Next steps

Record fresh runtime evidence, exercise the browser privacy boundary, and verify mobile and keyboard behaviour. Future pattern expansion should preserve benign controls and make uncertainty visible.

[Inspect the reviewed source](https://github.com/kwisdomk/shado/tree/b2ae3372852e673faef9b3d196e57bc804339fd6)
