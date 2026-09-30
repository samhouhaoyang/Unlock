# Accepted implementation decisions — junior SWE v2

These decisions clarify [product.md](../product.md) and its [English counterpart](../product.en.md). The product owns P0 scope and acceptance. They replace the finance-specific E1–E5, Brier-score, React, and simulated-growth decisions.

## Routing and delivery

Authored tasks carry high/low learning value and high/low real-delivery risk, a target sub-skill, route, and reason. Routing assigns real delivery ownership; support levels assign help in a practice attempt. The high-learning/high-risk route gives the junior a separate fictional practice copy, while the senior retains real delivery. The P0 extension never imports customer material or merges a change. Gate completion cannot override this boundary.

## Attempts and exposure

Record a first prediction before preset-patch reveal, actual maximum hint depth, answer/patch disclosure, case identity and version, subsequent patch decision, time, and eligibility at submission. Relevant pre-submission help or prior case-specific exposure makes the attempt practice. General teaching on a different case is allowed. Exposure survives refresh, retries, and case-version changes. Feedback after a valid submission does not retroactively invalidate it. Exiting a challenge or asking for help produces no scored failure. Repeated submission cannot create another observation.

## Separate assessment and gates

Assess contract interpretation, discriminating test design, and patch judgment separately with reviewed structured choices. Free text can be shown to a person but is not automatically graded. For one target sub-skill, G1 is a correct fresh regular check, G2 is a correct fresh changed-condition transfer, and G3 is a correct unseen check at least 72 hours after an identified stored teaching attempt. Other sub-skills retain separate pending states until eligible checks exist. A correct patch decision with the wrong invariant or a test that cannot distinguish the unsafe patch is not a correct full judgment.

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
