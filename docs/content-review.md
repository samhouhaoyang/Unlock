# P0 content and review record

Issue [#4](https://github.com/samhouhaoyang/Unlock/issues/4), owned by `@RankiiJ` and reviewed by `@samhouhaoyang`, supplies authored JSON and a standalone validator. This implements the content slice of [specification #13](https://github.com/samhouhaoyang/Unlock/issues/13), [product section 8](../product.md), and [contract v1](contracts.md). It does not implement application grading, persistence, progression, or browser flows.

## Review status

- Authored on 2026-09-30 by Codex acting for the authenticated issue owner, `@RankiiJ`, against the accepted specification.
- Codex checked consistency against the six specified judgments, authored evidence/rationale combinations, uniform-service assumptions, and seed rules. Automated standards and specification review results are recorded below.
- Human peer/content review by `@samhouhaoyang` is pending on the PR. Do not describe the material as human-approved until that review is complete. Any review limited to the developers is team-only.
- No external accountant has reviewed these materials, and no participant or delayed learning study has been conducted. All companies, contracts, drafts, and historical observations are fictional.

## Files and consumption

Every file has `schemaVersion: 1`. The collections are plain JSON:

- [cases.json](../content/cases.json): `cases`, the six selectable case definitions.
- [historical-cases.json](../content/historical-cases.json): `historicalCases`, thirteen noninteractive versioned definitions. Eight support ordinary/retention checks, one supports teaching, and four support historical AI review practice.
- [tasks.json](../content/tasks.json): `tasks`, one card per learning-value/delivery-risk quadrant. Only WK-01 has the main `practice` entry; other cards are explanatory examples. High-risk delivery belongs to the mentor. CK-01 remains available as the separately exposed correct-draft contrast in its feature story.
- [skills.json](../content/skills.json): `skills`, the complete `cross-period-expense-allocation` path and two explicitly illustrative skill cards.
- [scenarios.json](../content/scenarios.json): `scenarios`, the start-from-zero, growth-checkpoint, and support-restoration fixtures.

The integrator can import these JSON collections without adding dependencies. `loadContent(root)` in [check-content.mjs](../scripts/check-content.mjs) reloads all five documents; `validateContent(content)` validates the assembled bundle and returns counts and the growth fixture's diagnostic scores. These exports are the agreed standalone authored-content test boundary; the live application uses its own shared interfaces. No shared TypeScript contract, package, runtime, shell, or workflow file was changed.

An attempt's `caseVersion`, `answer`, `confidence`, `maxHelpUsed`, `status`, `correct`, and `eligible` preserve separate conditions. `priorExposure` records earlier case exposure; `disclosureAtSubmission` preserves whether an answer or draft had been disclosed when the judgment was submitted. Current `answerRevealed` can become true after feedback without rewriting a valid submission. An ineligible practice record has an explicit `ineligibleReason`. All seeded teaching, practice, check, and AI-review observations carry `origin: demo_seed`.

Teaching records are in `teachingAttempts`, separately from `attempts`. Retention observations store their immutable `teachingAttemptId`. The restoration scenario provides `retentionTeachingAttemptId` for the live RT-01 attempt and `retentionAvailableAt`, the earliest valid time at least 72 hours after that lesson. Its fixed lesson predates delivery; the application must record the actual live submission time rather than move a clock. The 2026–2027 service dates inside RT-01 are fictional business facts, not observation timestamps.

## Judgments and disclosure

The accepted judgments are EX-01 = 300, WK-01 = 400, CK-01 = 100, TR-01 = 0, UN-01 = `need_info` with a null amount, and RT-01 = 500, all monetary amounts in AUD. Numeric allocation cases state equal monthly service explicitly. UN-01 is milestone-based and deliberately lacks performance/acceptance evidence, so equal allocation and a guessed zero are unsupported.

WK-01's incorrect preset draft is 1,200; October and November were already correctly accrued. CK-01's draft is correct and should be accepted with its supporting evidence. UN-01's preset uniform allocation is incorrect. The content's truth metadata is for grading and review; its presence in local JSON is not a security boundary. The learner interface must hide drafts until judgment submission and hide TR-01/RT-01 hints, answers, and feedback during an independent challenge. No task card or seed pre-exposes those checks. Evidence selections match sets; their ordering is irrelevant.

## Scenario checks

Start-from-zero begins at L4 with no historical teaching, attempts, AI reviews, cards, or concerns. It cannot invent a support transition.

Growth-checkpoint begins at L2 in `growth-stage-1`. Eight distinct eligible historical checks are correct: six at 75% confidence and two at 50%. Six ordinary cases supply E1; two retention cases refer to the 2026-09-10 teaching record, more than 72 hours earlier, and supply E2. Their evidence/rationale choices supply E4. No transfer check is seeded, so E3 remains missing and TR-01 stays fresh. E5's Brier score is 0.109375; adding a correct 75%-confidence TR-01 yields 0.10416666666666667, and using 50% yields 0.125. These diagnostics do not execute a support transition.

Four distinct historical practice attempts supply four revealed incorrect-draft review events: one `accept` and three `correct`. Historical wrong-draft acceptance is therefore 1/4. These practice/review observations do not enter the eight-check E5 denominator. Event/reveal/attempt identities are unique. There is no seeded experience card standing in for the card a mentor must publish live.

Support-restoration begins at L2 with a simulated assisted lesson on 2026-09-20. RT-01 is reserved for a live check linked to that lesson; no result or failure is prewritten. It is eligible by the delivery date without changing the system clock. This fixture illustrates a rule response, not a real delayed-retention experiment.

Keep source labels visible when these fixtures reach the application. Mixed historical/live evidence must remain labelled as a demonstration result containing simulated history. Runs must not be pooled into a claimed longitudinal study. Private attempts, deliberately shared requests, and approved experience cards remain separate records.

## Verification evidence

Validation is performed at the public content-loader/validator interface and the standalone CLI. Tests cover the six judgments, draft truth, opportunity routing, illustrative skills, Brier diagnostics, separate review denominators, exposure, structured evidence, exactly-72-hour retention, restoration linkage, bad references/versions/timestamps, duplicate identities, source labels, and reloading corrupted JSON from disk.

Commands for this content-only story:

```bash
node scripts/check-content.mjs
node --test scripts/tests/content.test.mjs
node scripts/check-project.mjs
```

Observed on 2026-09-30 using Node.js 24.20.0: the standalone validator passed all five documents, and the content suite passed 14 tests. `node scripts/check-project.mjs` passed 55 local documentation links, eleven story definitions, all 24 tooling/content tests, and the content validator. `git diff --check` reported no whitespace errors.

Automated reviews compare this story against baseline `92b17c748929b2abc8243fc9c78cd0f237753203`:

- Standards: no findings against documented ownership, JSON/validator boundaries, glossary, simulation provenance, private/shared experience rules, or the review skill's code-smell baseline.
- Specification: two validator gaps were reproduced and corrected. Fixed-case guards now require WK-01's incorrect 1,200 draft and CK-01's correct 100 contrast, and protect the authored accepted evidence/rationale combinations instead of checking only the numeric answer. Regression tests first failed for both gaps, then passed with the fixes. Evidence set ordering remains irrelevant.

Application typechecking, builds, browser persistence, and the complete demonstration have not been run because no application scaffold exists in this baseline. Human content approval remains a PR review task.
