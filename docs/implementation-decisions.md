# Accepted implementation decisions

These clarifications were accepted by the user in the product-documentation interview after [product v1.3](../product.md) was finalised. They resolve choices left open in sections 5, 6, and 12 and supplement the [English specification](../product.en.md). The product remains the authority for the six cases, thresholds, P0/P1 scope, and demonstration script.

## 1. A level change starts a fresh stage

Each learner skill has one current stage. An actual support-level change closes that stage and opens another, whether the change fades support, restores support after failure, or follows a mentor's reasoned exception. Merely requesting help, acknowledging a concern, refreshing, or submitting twice does not create a stage. The level remains within L0–L4; an attempted change beyond either endpoint is not an actual level change.

E1–E5 for the next reduction use eligible evidence from the new stage. Prior attempts, evidence, teaching links, confidence, and transitions remain historical records; they cannot satisfy the new stage's gates. The same case does not become fresh merely because the stage changed. Historical teaching links remain fixed; any new retention evidence must satisfy the product's teaching-link and 72-hour requirements.

Compute a transition from the completed stage's evidence, preserve that evidence with the transition, and begin the next stage with evidence pending. The success view can show why L2 → L1 happened while separately showing that the new stage needs fresh evidence. It must not present the old five passes as current-stage passes.

A failed transfer or retention check cannot leave that gate marked as passed, including at L4 where support cannot increase further.

An unresolved review concern survives a stage change. The new stage does not remove the need for mentor resolution.

## 2. Exposure persists across attempts and stages

An eligible independent check has not used relevant in-app help before submission and has not previously exposed the learner to that case's help, AI draft, answer, or explanatory feedback. Reading the case's facts to make the judgment is allowed. Learning a general principle through a different case or a mentor response is also allowed; transfer is meant to test that learning on different facts.

Track prior exposure across retries, refreshes, and stage changes. Reopening a case or revising its wording/version does not make it unseen. A genuinely different reviewed case needs a distinct identity; the demo does not generate extra cases to fill missing evidence. Unknown versions remain ungraded, as required by the product specification.

Classify and retain independence as it was at submission. Feedback shown after a valid independent submission does not invalidate that submitted check; it makes later attempts at that case practice only. A challenge exited to obtain help does not produce a scored independent failure and does not restore support.

Opening an independent check, interrupting it, and returning without any answer/help exposure may resume the same attempt. It must not create duplicate independent observations.

If no fresh suitable case remains, show the relevant evidence as pending and allow practice. Reset starts a new explicitly labelled demonstration run and reloads the selected seed scenario. It is not evidence that the same person has forgotten an answer, and runs must not be pooled as longitudinal learning results.

## 3. P0 grades structured judgments

P0 assesses the answer amount or action, selected evidence, and selected rationale against the reviewed case definition. A correct amount with an unacceptable rationale is not a correct structured judgment. The resulting correctness is the outcome used for the associated independent-check metrics and confidence calculation.

Free text belongs to the optional help request. It is not an essay answer, an automatic grading input, or evidence that an independent explanation was generated. E4 keeps the product label “structured rationale recognition.” The optional free-text assessment branch described in product section 6.1 is not selected for P0.

The reviewer cannot turn an incorrect recorded judgment into a pass by acknowledging it. Correctness, eligibility, concern status, and workflow status remain separate concepts.

## 4. A high-confidence concern needs explicit resolution

An eligible incorrect check submitted with 90% prior confidence creates a review concern and pauses further fading. If the check also fails transfer or retention, restore support only once. Keep the original result, confidence, and reason for the concern.

The mentor can mark the concern reviewed with a short reason. Preserve who resolved it, when, and the reason. Resolution removes that concern's administrative block; it neither edits the learner's answer nor grants evidence or triggers a level change by itself.

Further fading requires no unresolved concerns and all current-stage E1–E5 gates to pass. E5 uses at least eight eligible current-stage independent checks, Brier score ≤ 0.20, and no 90%-confidence error among its latest three eligible checks, as specified in the product. A resolved error still contributes to the stage's score and recent-check rule if it belongs to that stage. Historical concerns cannot be silently cleared by opening a new stage.

The fixed demo may lack enough fresh cases to demonstrate full recovery after review; in that situation it honestly stays pending. Mentor review is not a bypass for missing content or evidence.

## 5. Boundary cases to verify during implementation

These are acceptance examples for the eventual application, not tests that have already run.

| Scenario | Required result |
| --- | --- |
| Growth seed plus a correct, unassisted TR-01 at 75% confidence | Evaluate the ninth record in the original stage, preserve its Brier score of about 0.1042, fade L2 → L1 exactly once, then start the new stage with pending evidence |
| Refresh or repeat the same submission after that transition | Restore the saved result and transition; do not create a second transition or observation |
| Retry TR-01 after seeing its feedback | Allow practice; add no independent E1–E5 evidence from the retry |
| Change a previously exposed case's wording/version | Keep its exposure history; do not treat it as a fresh case |
| Fail transfer or retention at L2 | Restore to L3 once, close the stage, and require fresh evidence in the next stage |
| Fail transfer or retention at L4 | Stay at L4, record the failure, and keep the corresponding gate failed rather than reusing an older pass |
| Submit a 90%-confidence transfer failure | Restore support once and retain one unresolved concern; a new stage does not clear it |
| Mentor resolves the concern while evidence is insufficient | Retain the error and resolution; keep progress pending |
| Exit a challenge to view a demonstration | Record assisted learning, no independent pass or scored failure, and no automatic restoration |
| Submit a valid independent check, then view a published experience card | Keep that check's submission-time independence; the same case's later attempts are practice |
| Give the correct amount with the wrong evidence or reason | Record an incorrect structured judgment rather than awarding an independent pass |
| Exhaust the available fresh cases | Show missing evidence and permit practice; do not invent new checks, reuse seed passes, or claim another stage is complete |

## Related rationale

- [Stage evidence and case exposure](adr/0001-stage-evidence-and-exposure.md)
- [Private attempts and published experience](adr/0002-private-attempts-and-published-experience.md)
