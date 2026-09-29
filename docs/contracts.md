# Shared contract v1

This is the initial interface agreement for the two development tracks. It refines product section 12 without implementing a feature. The FOUNDATION story turns it into TypeScript types and a small runnable shell; CONTENT can prepare JSON against it at the same time. Both consume the same definitions rather than waiting for one feature's internals.

## Ownership and changes

`@samhouhaoyang` owns the shared types, runtime, app shell, package/lockfile, and integration. `@RankiiJ` reviews them. After FOUNDATION merges, feature stories edit only their assigned directories. A shared-contract change is coordinated with both developers and merged before dependent feature changes. Prefer additive changes; migrate callers before removing a field or export.

## Content agreement

Content is plain JSON under `content/` and has a top-level `schemaVersion: 1`. Identifiers are stable strings; case versions are positive integers; timestamps are ISO 8601 UTC strings; levels are integers 0–4; confidence is 0.5, 0.75, or 0.9; monetary values in this demo are finite numbers in the case's stated unit. The illustrative skill uses the stable ID `cross-period-expense-allocation`.

| Record | Required content |
| --- | --- |
| Case | `id`, `version`, `skillId`, `type`, `title`, `facts`, `allowedActions`, `acceptedAnswers`, `evidence`, `rationales`, `hints`, `aiDraft`, `draftOrigin` |
| Task | `id`, `caseId`, `skillId`, `learningValue`, `deliveryRisk`, `recommendedRoute`, `routeReason` |
| Scenario | `id`, `label`, `skillId`, `stageId`, `supportLevel`, `teachingAttempts`, `attempts`, `aiReviewEvents`, `experienceCards`, `reviewConcerns` |

- Case `type` is `demonstration`, `practice`, `regular`, `transfer`, `retention`, or `insufficient_information`. Attempt mode, exposure, and eligibility also matter; case type alone never proves independence.
- `facts`, `evidence`, and `rationales` are arrays of `{ id, text }`. Choices can contain distractors; only combinations in `acceptedAnswers` pass.
- An accepted structured answer is `{ action, amount, evidenceIds, rationaleId }`. `action` is `amount` or `need_info`; `amount` is a number for the former and null for the latter. Evidence selection matches a reviewed set, not incidental ordering.
- `hints` has string entries `L1`, `L2`, `L3`, `L4`. These are reviewed authored content, never an assumed model response.
- `aiDraft` is null or `{ text, answer, isCorrect }`; `draftOrigin` identifies a preset example. The known truth is content metadata, not disclosed to the learner before the appropriate reveal.
- Task `learningValue` and `deliveryRisk` are `low` or `high`; route is `learner`, `ai`, or `mentor`.
- Scenario IDs are `start-from-zero`, `growth-checkpoint`, and `support-restoration`. Empty arrays are explicit. Seed observations carry `origin: demo_seed`.
- Historical checks refer to reviewed historical case definitions outside the six interactive cases. They are not selectable interactive tasks. Preserve enough versioned facts/rubrics to validate seed correctness and the retention teaching link.
- Skill/card configuration marks the other two skills as illustrative. Publishing a new card is performed by the live mentor feature, not faked by a seed.

CONTENT adds a dependency-free `scripts/check-content.mjs` and its tests, so content validation can run before the npm app exists. The project check automatically requires this validator when `content/` appears.

## Shared observations

Types in `src/contracts/` express the product records plus these required distinctions:

- An Attempt has a stable identity, case ID/version, skill, stage, mode (`practice` or `check`), structured answer, prior confidence, maximum actual help, answer/draft disclosure, timestamps, workflow status, correctness, and origin (`demo_seed` or `session`). Keep correctness separate from workflow and review status.
- A submitted check records eligibility at submission and the reason when ineligible. Post-submission feedback does not rewrite that eligibility.
- Case exposure is stored per learner/run and case identity across attempts and stages; a new case version does not erase exposure.
- A retention check stores its linked teaching attempt ID and the time of the check. A subsequent lesson does not rewrite that relationship.
- An AI review event records a unique reveal/attempt identity, known draft correctness, reveal time, optional accept/correct/need_info decision, and origin. It is distinct from an independent-check observation.
- A Transition records from/to level and stage, trigger attempt, contributing evidence IDs, source provenance, and the closed stage's explanation. A new stage begins pending.
- A ReviewConcern preserves its triggering attempt, reason, resolution actor/time/reason, and unresolved/resolved status. Stage changes do not clear it.
- A HelpRequest stores only its previewed shared content and its own reply/workflow state. An ExperienceCard is an independently approved shared copy with author, applicability, exception, source attribution, version, and draft/published/disputed/retired status.

Do not collapse these records into a single generic score or use UI clicks as learning evidence.

## Runtime interface

The app owns one versioned persisted snapshot with `runId`, selected scenario, simulated role, and separate learning, mentoring, and progress feature state. Only `src/runtime/` reads or writes browser persistence. Feature modules do not invent storage keys or write directly to localStorage.

The runtime exposes reading the snapshot, subscribing to changes, and a synchronous transaction that computes a complete next snapshot. Persistence succeeds before the committed snapshot is reported as updated. On storage failure it returns a visible error and leaves the committed state unchanged. Unknown schema/version data is reported explicitly and can be reset by the user.

Feature reducers and selectors are pure. Standalone routes can commit changes to their own slice through the runtime. The final integration coordinator applies learner submission and progress evaluation in one transaction; it does not persist one feature and hope the second write succeeds. Idempotency is based on saved attempt/event IDs.

The foundation's meaningful tests cover persistence, reset, schema handling, and write failures. It must not invent passed learning evidence just to demonstrate the shell.

## Feature exports and composition

The foundation creates these entry placeholders with stable interfaces. A placeholder visibly says that its feature is not implemented. Each subsequent owner replaces its own entry; app wiring remains with the integrator.

| Feature directory | Owner | Public exports and responsibility |
| --- | --- | --- |
| `src/features/learning/` | `@RankiiJ` | `LearningPage`, learning reducer/selectors: open/resume attempt, disclose help, submit judgment, reveal/review draft, exit check, record exposure |
| `src/features/mentoring/` | `@samhouhaoyang` | `MentorPage`, `HelpRequestComposer`, mentoring reducer/selectors: draft/preview/send/cancel request, reply, edit/publish card, select published feedback |
| `src/features/progress/` | `@samhouhaoyang` | `GrowthPage`, progress evaluator/reducer: evidence, stage changes, restoration, concerns and mentor resolution |
| `src/features/opportunities/` | `@RankiiJ` | `OpportunitiesPage`, routing selectors, navigation through a supplied callback |
| `src/features/insights/` | `@RankiiJ` | `MetricsPanel`, read-only metrics selectors over agreed observations |

Pages receive typed state and callbacks from the shell. They do not import another feature's private reducer or write another feature's state. The mentor page has slots for the metrics and review-concern panels; the learner page has a help-composer callback and post-submission feedback slot. Until connected, unavailable actions are clearly disabled rather than fabricated.

The INTEGRATION story supplies the real cross-feature callbacks: selected attempt → previewed request; published card → feedback after submission; submitted independent check → evidence transition; agreed observations → mentor metrics. The feedback selector returns no cards without a submitted attempt. Teaching on WK-01 may inform a fresh TR-01, but TR-01's own answer or hints must not be revealed early.

## Verification contract

Feature completion means a real, locally persisted behavior can be demonstrated through its route with truthful fixtures and tested at its public interface. Final acceptance additionally requires the integrated live path. Tests remain beside the owning feature; final cross-feature checks live in `tests/integration/`, and release walkthroughs in `tests/e2e/` and the release checklist.

Once the app scaffold is introduced, it supplies non-watching `typecheck`, `lint`, `test`, and `build` scripts and a committed npm lockfile. Missing scripts fail CI. Build and lint alone do not substitute for the meaningful state-rule tests specified in the issues.
