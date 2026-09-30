# Shared contract v2 — VS Code apprenticeship

Both developers agreed to replace the finance contract. This document refines [product.md](../product.md) without claiming implementation. The extension's public boundary is one workflow: route an authored task, record an attempt, reveal/review a preset patch, assess sub-skills and gates, then persist the support state. Keep internal modules behind this boundary.

## Ownership

After the first runnable slice, `@samhouhaoyang` integrates shared contracts, runtime, app composition, package/lockfile, and CI; `@RankiiJ` reviews. Feature owners stay within assigned paths in [backlog.json](backlog.json). Both developers agree on subsequent shared-contract changes before editing. Merge blockers before dependent work.

## Reviewed content, schema version 2

Versioned JSON contains stable task and case IDs, positive case versions, reviewed source/status, and no customer data. A task has target sub-skill, high/low learning value, high/low delivery risk, route, and one-sentence reason. The four routes are `junior_supported`, `ai_handled`, `senior_with_practice_copy`, and `senior_owned`. AI-handled and senior-owned task cards explain ownership without pretending to execute real work.

The case pack has P-01 unsafe retry patch, C-01 correct control, T-01 changed-condition transfer, and R-01 unseen delayed retention. Cases contain facts, contract excerpts, invariant choices, test choices with discriminating outcomes, preset patch and provenance, patch-decision choices, L1–L4 reviewed hints, accepted structured answers, teaching linkage, and post-submission feedback. The unsafe and correct patches are clearly labelled synthetic. Content validation rejects unknown IDs/versions, missing review status, contradictory truth metadata, and answer leakage into pre-submission fields. Case revisions retain stable identity for exposure.

## Persisted run

The extension host owns a versioned workspace snapshot. It includes run ID, per-sub-skill current L0–L4 stage, attempts, exposure history, gate evidence, transitions, review concerns, and local help-request drafts. Each attempt stores stable ID, case/version, target sub-skill, first prediction, actual maximum help, answer/patch reveal events, test choice/result, patch judgment, submitted time, eligibility at submission, outcome, and origin. A G3 observation links to a teaching attempt and its timestamp. Simulated fixtures used in tests are never persisted as real learner evidence.

The runtime provides read, subscribe, and atomic commit/reset operations over VS Code `workspaceState`. It reports a failed write without changing committed UI state. Duplicate attempt/event IDs are idempotent. Unknown snapshot schema versions are visible and resettable; they are not silently graded. Feature code does not write arbitrary storage keys.

## State and assessment

A finite-step reducer permits facts → first prediction → deterministic test → preset patch reveal → patch judgment → post-submission feedback. Relevant case hints/draft/answer remain hidden before a valid independent check. The grader produces separate contract, test, and patch-judgment outcomes from reviewed choices. Eligibility depends on actual in-app help and persistent case exposure, not the displayed level alone. G1/G2/G3 selectors use current-stage eligible observations; G3 requires a linked teaching attempt and 72-hour delay. Passing all three with no unresolved concern fades one help level; failed G2/G3 restores one level. A support change starts a fresh stage. A gate never changes task route.

A teaching card is a separate reviewed content copy. The local help-request draft exposes only learner-previewed selected context; submission to a real mentor service is outside P0. Feedback selectors reveal approved cards after submission only. Private attempt transcripts are not card content.

## Verification

The first slice must run in the Extension Development Host and persist a complete P-01 attempt. Later vertical slices add other routes/cases, gates, sharing boundary, and final acceptance. Pure rules need focused tests; the complete command-to-support path needs an integration test with reviewed fixtures and a controlled test clock. Rehearse user-visible paths and report actual results. The repository check is `node scripts/check-project.mjs`; once a package exists it requires typecheck, lint, test, and build plus a committed lockfile.
