# Unlock — junior software engineer apprenticeship

**Product specification v2.0 | 30 September 2026 | Intended behaviour; not implemented**

Challenge: **Future Work — “If AI does the beginner work, where does expertise come from?”** This file mirrors [product.md](product.md). Together they replace the accountant scenario. Older finance issues, PRs, and fixtures remain historical; their passing checks do not verify this SWE product.

## 1. Positioning, audience, and outcome

**Unlock is a VS Code apprenticeship extension for junior software engineers across companies.** It reserves valuable judgments even when AI drafts code, separates practice from risky delivery, offers L0–L4 help for specific sub-skills, and reduces that help only when independent evidence supports a change. Airwallex is a demanding design benchmark, not the only customer or a required integration. The MVP requires no company AI reviewer, source-code connection, hosted model, or backend.

**Main selling point:** route work by learning value and delivery risk → let the junior predict and test before seeing an AI-authored patch → verify independent transfer and retention before fading help. The pilot outcome is the proportion of known-unsafe AI patches accepted on unseen cases. Also measure correct-patch acceptance, test quality, delayed performance, junior time, mentor time, case difficulty, and sample size. Completing the workflow alone does not establish improved workplace performance or confer a competence certificate.

The learner is a junior SWE working on bounded changes; the mentor is a qualified reviewer who can explain a decision; the team lead selects reviewed learning opportunities; the ordinary team process retains production ownership, CI, and peer review. Unlock does not rank employees, grant permissions, or merge code.

## 2. Four-quadrant opportunity routing

Each task has a reviewed target sub-skill, `learningValue` and `deliveryRisk` (`high` or `low`), route, and one-sentence reason. Risk is the consequence of incorrect **real delivery**, not exercise difficulty. Learning value is relevance to this learner's current growth, not a universal task property. P0 uses authored labels and deterministic rules, not automatic AI risk classification.

1. **High learning, low risk → junior does it with support.** Example: an internal webhook test or example-code change. The junior predicts, tests, and reviews AI; normal team delivery review still applies.
2. **Low learning, low risk → AI handles it.** Example: a routine fixture update. P0 displays an authored AI-handled result; actual autonomous production action is outside this scope.
3. **High learning, high risk → senior delivers; junior practises on a copy.** Example: customer-visible retry behaviour. Real delivery stays with a senior or the team's ordinary AI-plus-senior flow. The junior receives a **separate synthetic practice case** that cannot affect production or reveal customer data. The reviewed senior decision is revealed after submission.
4. **Low learning, high risk → senior owns it.** Example: a sensitive migration outside this junior's learning edge. Explain the route; offer no fake completion action.

Routing chooses delivery ownership and whether practice is created. A support level chooses help within that practice. Passing learning gates never overrides a high-risk route. L0 does not mean universal mastery or authorization. The MVP shows four fixed cards, one per quadrant; only routes 1 and 3 open a full learning exercise.

## 3. First skill, sub-skills, and case pack

The first complete pathway is **stable event identity across webhook retries**. Public [Airwallex webhook documentation](https://www.airwallex.com/docs/developer-tools/webhooks/webhooks-overview) grounds the fictional contract: retry and duplicate delivery can occur, and one logical event retains its ID. This is not Airwallex internal code. Other companies can later load their own reviewed case packs.

Assess these sub-skills separately against reviewed structured choices:

- **Contract interpretation:** identify the relevant invariant and supporting evidence.
- **Discriminating test design:** identify an assertion that would fail for an unsafe patch, beyond a happy-path test.
- **Patch judgment:** accept, reject/correct, or request information with the test result or missing evidence that justifies the choice.

A correct decision with the wrong invariant or non-discriminating test is not a correct full judgment. An optional free-text explanation is stored for human review and is not automatically graded. P0 implements the complete evidence and transition rules for one target sub-skill; the others have separate assessment states and can remain pending.

Reviewed fictional content has stable IDs and versions:

- **P-01:** high-risk practice copy; a preset AI patch incorrectly gives a new ID on retry after timeout.
- **C-01:** low-risk correct-patch control; the patch keeps the event ID stable and should be accepted with evidence.
- **T-01:** fresh transfer; re-trigger after downtime rather than immediate timeout retry, applying the same stable-ID principle.
- **R-01:** unseen retention variation, eligible only after a real qualifying delay.
- **Two explanatory task cards:** AI-handled low-learning/low-risk and senior-owned low-learning/high-risk, without fake completion actions.

T-01 facts may be viewed for the attempt, but its answer, case-specific hint, AI patch, and explanatory feedback must stay hidden before a valid independent submission. Rewording or revising a previously exposed case never makes it fresh.

## 4. L0–L4 help and attempt integrity

- **L4:** full reviewed demonstration, test, and reason.
- **L3:** partial test/reasoning scaffold with the decisive judgment blank.
- **L2:** relevant contract principle without the result.
- **L1:** direction toward the code, log, or specification clue.
- **L0:** no relevant pre-submission help; ordinary feedback afterward.

The current level is the deepest help offered **by default** for one sub-skill. At L2, the learner may use L1 or L2 directly. They can request a deeper demonstration during practice; that attempt is assisted and does not count for an independent gate. A change L2→L1 withdraws the L2 principle from the next default practice while L1 remains. The level is neither an employee grade nor a delivery permission.

Save actual maximum help seen, answer/patch disclosure, case/version, learner prediction, submission time, and eligibility at submission. A check is independent **under in-app conditions** only if no relevant help or earlier answer/draft exposure occurred. An answer-informed retry remains practice across refresh and stage changes; general teaching from another case is allowed. The extension cannot rule out external help.

Every actual support change closes the current learning stage and starts a new stage with fresh evidence pending. Old evidence and exposure stay in history; one success cannot trigger repeated fades. Repeated submission and refresh must not duplicate a check or transition. If a persisted write fails, the UI must not show a half-committed result.

## 5. Three evidence gates per sub-skill

These are transparent **MVP product rules**, not proven learning-science thresholds.

- **G1 Independent check:** a correct attempt on a fresh regular case, with no relevant in-app hint. The target sub-skill's structured answer must be correct. Save the first prediction before the preset patch is revealed and the later patch decision separately.
- **G2 Transfer:** a correct no-hint attempt on a fresh case with a changed decision-relevant condition requiring the same principle. T-01 changes timeout retry to re-trigger after downtime; cosmetic renaming is insufficient.
- **G3 Delayed retention:** a correct no-hint attempt on an unseen case at least **72 hours after a stored, identified teaching attempt** for that sub-skill. Keep the teaching link and timestamps. This timing is a revisable pilot assumption, not proof of durable expertise.

All three gates must pass in the **current stage**, with no unresolved content/review concern, before help fades one step toward L0. A failed transfer or retention check restores one step toward L4 for the next practice, only once per attempt; call it support reinforcement. Help seeking, exiting a challenge, or an interrupted run produces no scored failure. If no suitable fresh case remains, the gate stays pending. Human review cannot rewrite a wrong structured answer into a pass.

G3 stays pending until an actual eligible check occurs at least 72 hours after its linked teaching attempt. No seed records, clock manipulation, or scripted checkpoint may satisfy a learner's gates. Tests may use a controlled clock and authored fixtures, but production progress is based only on recorded eligible attempts. A new stage starts pending after every real level change.

## 6. End-to-end experience and shared knowledge

1. The junior invokes `Unlock: Explore work` and sees the four route cards and reasons.
2. They open the high-risk **synthetic practice copy** beside the code. They can inspect facts and contract, while the answer and preset AI patch remain hidden.
3. They select the invariant and discriminating assertion and may add a short reason. If stuck, they request L1–L4 help. The first submitted prediction and help exposure are saved before reveal.
4. They run the deterministic fixture test in VS Code's normal terminal and record/select the observed result. The MVP does not claim generic test-runner integration.
5. They reveal the clearly labelled **preset AI patch**, then accept, reject/correct, or request more information with evidence. Include wrong and correct patches so blanket rejection is not rewarded.
6. After submission, they see feedback and a reviewed experience card: cue, principle, applicability, exception, and source. A pre-reviewed card is enough for P0; live mentor authoring/approval is optional later work unless actually delivered.
7. They try a different, unseen transfer case without hints. Only after submission do they see its answer and relevant card. The progress view shows separate G1–G3 states, case identities, help exposure, and dates.
8. The next practice uses the new default help when a gate-driven change truly occurred. The four-quadrant router still keeps high-risk real delivery with a senior.

The formal sharing boundary is **private attempt → learner-previewed help request → independently approved shared teaching copy**. P0 uses fictional local cases and does not establish real multi-user privacy isolation. Unreviewed notes and private transcripts cannot become shared advice automatically.

## 7. Technical format and MVP boundaries

P0 is a **desktop VS Code extension** using TypeScript, Node.js 24, one explicit command, and one compact webview with semantic HTML, VS Code theme CSS, and vanilla TypeScript. The extension host owns the finite-step reducer, deterministic grader, and state. Versioned local JSON holds tasks, cases, hints, and preset AI patches. Save small run state in VS Code `workspaceState`; reopening a view restores it. A synthetic JS/TS fixture uses deterministic Node tests in the ordinary terminal. Build with `esbuild`, typecheck with `tsc --noEmit`, run Node unit tests, and package a local VSIX only after the Extension Development Host path works. Check Workspace Trust before executing workspace-controlled code.

P0 has no hosted model, backend, database, login, telemetry, company-repo scanning, automatic risk classifier, arbitrary test-runner integration, GitHub/GitLab connection, or production write. A future company pilot may add approved diff import, reviewed case authoring, and real mentor workflow. The product's first source of correctness remains reviewed case content and deterministic rules.

## 8. P0 acceptance and verification

The repository's main product must deliver one integrated workflow: **route an opportunity → open the appropriate real-work or practice boundary → record the learner's first judgment and help exposure → reveal and review the preset patch → assess the relevant sub-skills → update evidence gates and support state**. The entry boundary is the VS Code command and reviewed case data. Test the workflow through its user-visible outcomes and persisted state; keep pure grading and transition rules separately testable. Both assigned developers agreed to replace the prior finance-specific feature interfaces and records.

Acceptance requires four correctly explained routes; a high-risk practice copy that cannot affect delivery; L0–L4 hint depth; three separately assessed sub-skills; G1–G3 with real exposure and time rules; one-step fading/restoration without duplicate transitions; incorrect and correct preset patches; a fresh transfer; post-submission reviewed feedback; local persistence, refresh, and reset; and keyboard-visible focus. A retention gate without an eligible delayed case remains pending. Live mentor authoring, model calls, rich charts, company integrations, and VSIX publication are outside P0.

Meaningful tests cover the complete route-to-support workflow, independent-check eligibility, answer leakage, wrong/correct patch decisions, case-version exposure, linked retention timing, one-step transitions, storage failure, and privacy of unshared attempts. Use authored fixtures and a controlled clock to test timing, never fabricated learner progress. Rehearse the full path twice in the Extension Development Host and record actual results. The current `node scripts/check-project.mjs` validates documents and tooling only until the SWE extension and its app gates are implemented.

## 9. Product claims and evaluation

Pilot evaluation should compare matched unseen wrong and correct patches and report both acceptance rates, independent test quality, delayed performance, junior time, mentor time, and case difficulty. Do not claim measured learning gains, guaranteed production safety, automatic task-risk discovery, universal engineering mastery, or superiority over a company's existing reviewer without evidence. The product's contribution is a visible, bounded practice and evidence loop inside engineering work.
