# Accepted implementation decisions — junior SWE v2.1

These decisions clarify [product.md](../product.md) and its [English counterpart](../product.en.md). The product owns P0 scope and acceptance. They replace the finance-specific E1–E5, Brier-score, React, and simulated-growth decisions.

## Routing and delivery

Authored tasks carry high/low learning value and high/low real-delivery risk, a target sub-skill, route, and reason. Routing assigns real delivery ownership; support levels assign help in a practice attempt. The high-learning/high-risk route gives the junior a separate fictional practice copy, while the senior retains real delivery. The scored practice copy contains no customer material; explicit real editor context stays local and unscored. The extension never merges a change. Gate completion cannot override this boundary.

A senior records risk facts: affected system, customer/security/data impact, blast radius, ability to verify, and ability to roll back. Any consequential impact or uncertain verification/rollback is high risk. Low risk needs a bounded, testable, reversible change under normal review. Missing facts remain `needs_senior_triage` rather than a forced quadrant. Learning is high for this learner only when an approved target sub-skill is still developing and the task offers a prediction/test/review decision with feedback. The senior confirms or records an override. A code selection or LLM output cannot determine delivery ownership.

## Editor context and mentor handoff

`Unlock: Help me with this code` reads an explicit, bounded active-editor selection only after showing the excerpt. The host may attach language/file label and nearby existing diagnostics; it does not scan the workspace, persist raw code in a learner attempt, upload it, execute it, or infer that a small selection is safe. Empty/oversized selections and unavailable editors produce a visible fallback. Workspace Trust gates any later execution of workspace-controlled commands. Real code help is local and unscored; P0 gates use reviewed synthetic cases only.

The mentor can ship a versioned `*.unlock.json` lesson through an existing team-controlled channel. It declares reviewer/source, target sub-skill IDs, routing facts, snippet/reference diff, applicability/exception, test prompt, structured answers, and L1–L4 hints. Import validates content and displays the snippet for read-only comparison without applying it. Local validation cannot authenticate a reviewer; real use relies on the team's access-controlled review channel. A live mentor service and model-generated hints are outside P0. If no reviewed lesson matches the selection, show an unscored question or local help-request preview rather than fabricate an answer.

## Attempts and exposure

Record a first prediction before preset-patch reveal, actual maximum hint depth, answer/patch disclosure, case identity and version, subsequent patch decision, time, and eligibility at submission. Relevant pre-submission help or prior case-specific exposure makes the attempt practice. General teaching on a different case is allowed. Exposure survives refresh, retries, and case-version changes. Feedback after a valid submission does not retroactively invalidate it. Exiting a challenge or asking for help produces no scored failure. Repeated submission cannot create another observation.

## Separate assessment and gates

Assess contract interpretation, discriminating test design, and patch judgment separately with reviewed structured choices. A mentor chooses IDs from a reviewed catalog containing an observable response, accepted evidence, common failure, and transfer variant. Free text can be shown to a person but is not automatically graded. For one target sub-skill, G1 is a correct fresh regular check, G2 is a correct fresh changed-condition transfer, and G3 is a correct unseen check at least 72 hours after an identified stored teaching attempt. Other sub-skills retain separate pending states until eligible checks exist. A correct patch decision with the wrong invariant or a test that cannot distinguish the unsafe patch is not a correct full judgment.

All G1–G3 passes must belong to the current stage. Every actual L0–L4 change closes a stage and starts a new one pending. Fading is one step only; failed transfer or retention restores one step only, including a single recorded failure at L4 where no further restoration is possible. An unresolved content/review concern blocks fading. A reviewer may resolve the concern with a reason but cannot change an incorrect recorded answer to a pass. If a suitable unseen case or the 72-hour delay is unavailable, the gate stays pending. No presentation seed or clock adjustment counts as a learner attempt. Controlled clocks are for tests only.

## Sharing and persistence

P0 stores fictional local attempt state in VS Code `workspaceState`. The conceptual sharing transition is private attempt → learner-previewed selected help request → independently approved teaching copy. A static pre-reviewed fictional card supplies P0 feedback after submission; the extension does not claim live multi-user approval or privacy isolation. Unreviewed notes and private transcripts cannot become shared advice automatically.

The extension host owns one versioned snapshot and commits grading, exposure, gates, and level transition together. Persistence failure leaves the previously committed state and a visible error. Unknown schema versions require an explicit reset path. Keep case provenance and transition evidence; never infer learning from a click or a synthetic patch alone.

## Verification examples for implementation

- The unsafe P-01 patch changes an event ID on retry: a discriminating test and rejection pass their respective assessments; a happy-path-only test does not.
- The correct C-01 patch can be accepted with evidence; blanket rejection is not rewarded.
- T-01 changes timeout retry to re-trigger after downtime and keeps its answer hidden until independent submission. Reopening an exposed case is practice.
- R-01 at 71 hours remains pending; at 72 hours it is eligible only with a stored teaching link and no prior exposure or hint.
- One valid transition changes the next default hint depth exactly once and opens a new stage with all gates pending. Refresh and duplicate submission preserve that result.
- A failed G2 or G3 restores one step and never leaves that gate passed. Help seeking is not a failed gate.
- Post-submission feedback can cite only an approved teaching card. Private attempt content is not published by that display.

These are requirements for future tests, not test results.
