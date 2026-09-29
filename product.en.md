# Unlock

> Turning the beginner work that AI takes over back into a ladder for human growth.
>
> **Support fades step by step, growth leaves evidence, and experience is passed on.**

Version: Hackathon Build Specification v1.3 (final)  
Date: 2026-09-29  
Delivery period: three days  
Product status: planned three-day demo. This document defines intended behavior.  
Challenge: Future Work — Getting good: If AI does the beginner work, where does expertise come from?

The [Unlock pitch brief](pitch.en.md) is the source of truth for narrative wording; this build spec is the source of truth for workflow, rules, cases, implementation scope, and validation. Sections 1.2, 1.3, 16, and 18 summarize the brief and should be updated whenever its story changes.

The post-finalisation interview settled stage transitions, exposed cases, structured grading, and review resolution; see the [accepted implementation decisions](docs/implementation-decisions.md). Shared terms are defined in the [domain glossary](CONTEXT.md).

## 1. Product Positioning And Core Narrative

### 1.1 One-Sentence Positioning

**Unlock is an AI apprenticeship system for junior employees: it selects the judgments that should stay human, helps juniors complete them with staged support, and uses evidence from independent performance, transfer, and retention to decide when that support should fade.** The name means unlocking independent judgment, one evidenced step at a time.

It turns a senior's short reason for correcting AI into reusable learning material, so expertise enters the next junior's workflow.

**Headline outcome to test:** on unseen review cases, reduce the share of incorrect AI drafts that juniors accept. Report the number accepted over the number of incorrect drafts shown, alongside independent judgment accuracy, case difficulty, and sample size. The demo shows this behavior once; it does not establish an effect size.

Why this should work: a junior commits to a judgment before seeing AI's answer, receives limited support for practice, and then faces a changed case without hints. The product makes all three steps part of the same work loop, giving mentors evidence of judgment beyond assisted task completion.

### 1.2 Pitch Causal Chain

1. AI is completing more and more of the basic work that juniors used to do.
2. That work was also where juniors practiced judgment, made low-stakes mistakes, and received correction.
3. Companies need both AI output and human growth. Training cannot be left to chance.
4. Unlock deliberately preserves key judgments inside the workflow: try first, receive the right amount of support, then verify in a new context.
5. As evidence accumulates, support fades. When a senior or more mature junior corrects AI, that experience helps unlock the next independent judgment.

**The image judges should remember: the same junior faces a new situation, uses less help, and still makes the right judgment; one senior correction is actually reused in the next learning moment.**

### 1.3 Three Main Selling Points

| Selling point | What judges see | What users get |
| --- | --- | --- |
| Preserve the growth ladder | A task list explains why one judgment goes to the junior, another to AI, and another to a senior | Even after beginner work is automated, juniors still get relevant, low-risk practice |
| Let AI fade as people grow | An L4-L0 ladder, five evidence types, one live state change from L2 to L1, and support restoration after failure | Support matches specific skills, and progress has visible evidence |
| Pass experience forward | A senior edits one reason, reviews an experience card, and TR-01 cites it in post-submission feedback | One explanation can help the next learner, reducing repeated mentor explanations |

These three selling points form one product loop. The ten design features sit inside this loop rather than becoming ten separate product entrances.

### 1.4 Business And Social Value Hypotheses

The first users are teams with structured junior training needs and repeated judgment tasks. The likely buyer is a team lead or learning owner. Expected value includes more reliable independent judgment, stronger AI review ability, reusable organizational knowledge, and more controlled mentor effort.

These are value hypotheses to test. A pilot must record junior time, mentor total time, work quality, and independent performance. It cannot only show fewer mentor answers. Retirement, transfer, and turnover can all create expertise gaps, so "senior" does not mean older, and age is not treated as evidence of expertise.

## 2. Three Days, One Persuasive Vertical Scenario

### 2.1 Chosen Scenario

**A junior finance employee reviews an AI-generated monthly expense allocation recommendation.**

The core skill is "judging which period an expense belongs to based on the service period and performance evidence," not complete accounting treatment. This scenario is easy for non-technical judges to understand: payment date, invoice date, and service period may differ, and an AI answer that looks plausible can still miss the key condition.

The demo uses a fictional company, structured contract/invoice cards, and explicit teaching assumptions. It only asks the user to judge expense allocation, amount, and whether more information is needed. It does not generate full debit/credit journal entries, handle tax, capitalization, foreign exchange, material accounting estimates, or post to a real accounting system. Prepayments and accrued liabilities are different situations, so the interface consistently uses "expense allocation judgment" instead of mixing them into one entry type.

AASB Conceptual Framework 1.17 supports distinguishing the period in which economic events occur from the period in which cash is received or paid. Equal allocation in this document comes from explicit case assumptions and does not imply every contract should be allocated evenly. [AASB Conceptual Framework](https://standards.aasb.gov.au/conceptual-framework-dec-2021)

### 2.2 Personas

| Persona | Current reality | Action in this demo |
| --- | --- | --- |
| Lin, junior finance employee | Can operate the software, but may treat invoice date as the expense allocation basis | Review a draft, identify evidence, and make an independent judgment in a new context |
| Supervisor Chen, domain mentor | Wants the junior to gradually review AI independently, but cannot coach constantly | Respond to a specific question, correct one key reason, and choose whether to publish it |
| Team lead | Needs to know whether training is creating value and how much time it uses | View skill evidence and limited workload summaries |

In a real product, the mentor and team lead may be different roles. In the demo, they are combined into one mentor view to reduce interface and permission complexity.

### 2.3 Sub-Skill Scope

The interface shows three skill cards: identifying the service period, allocating expenses across periods, and detecting insufficient information. **The complete fading and regression loop is implemented only for "expense allocation across periods."** The other two are marked as example states, so judges do not assume that three complete learning paths have been built.

Three roles, multiple skills, and weeks of growth are the product vision. The three-day delivery validates one role pair, one skill, and one loop.

## 3. Scope: Three P0 Modules

### P0-A: Learning Opportunity Router And Judgment Workbench

- Four fixed task cards show the task, skill, learning value, risk, and recommended route.
- Routing uses explicit rules and manually preset labels, not a trained automatic scoring model.
- Low risk and high learning value: the junior judges first, then receives feedback.
- Low risk and low learning value: marked as AI-handled, with a prepared example result available.
- High risk: shown as senior-owned for delivery, with a possible de-identified practice copy. Practice and delivery are separated.
- The workbench supports predict-before-reveal, confidence selection, five-level support, and accepting, correcting, or requesting more information about the AI draft.
- WK-01 is the clearly labeled planted-error review case; CK-01 shows a correct draft that should be accepted. Both are synthetic training cases.

"AI-handled" in the demo is a prepared workflow state, not an external business operation. Risk is judged by real-world consequences; a simple exercise does not mean the real task is low risk.

### P0-B: Evidence-Driven Growth Ladder

- One skill has an L4-L0 support state.
- Five evidence cards: unassisted success, delayed retention, transfer, explanation, and confidence check.
- Defined rules compute "hold / fade one level / restore support / needs review."
- One live new-context case supplies the missing demo evidence and triggers L2 to L1.
- A separately resettable failure branch shows support restoration.
- The mentor view shows the incorrect-AI-draft acceptance tile, two curves, sample size, data source, and high-confidence error flags.

### P0-C: Senior Correction And Experience Relay

- The junior previews and submits a concise help request, containing only the materials and question they choose to share.
- The senior gives one "why" reason. The system generates an experience card draft from a fixed structure.
- The senior edits, publishes, or chooses "reply only, do not publish."
- The published card is cited in post-submission feedback on a linked exercise, with source and applicability boundaries shown. This works at every support level and never exposes the principle before an independent check is submitted.
- In P0, the card draft is filled from a fixed template using the senior's own words. AI rewriting into a clearer hint draft is P1 (see below). Either way, unreviewed text never becomes authoritative content automatically.

### P1: Only After The Core Loop Is Stable

1. A server-side model endpoint for summarizing help requests, rewriting hints from approved cards, and drafting experience cards.
2. A junior submits an experience-card draft after correcting AI, with mentor approval, to demonstrate the next generation contributing.
3. A due-review entry point and real time-based due logic, without integrating push platforms.

### Explicitly Out Of Scope For Three Days

Company email, ERP, or Slack integrations; OCR; automatic risk detection; an open professional knowledge base; arbitrary case generation; multi-model switching or training; multi-tenant administration; a real performance management system; automatic promotion; screen recording surveillance; voice input; leaderboards; and complete business billing.

**Cut order: remove model integration and new case generation first, then reduce rich chart animation. Preserve the rule ladder, changed-context verification, experience-card reuse, and complete demo path.**

## 4. What Happens To The Ten Design Ideas

| Idea | Decision | Three-day implementation |
| --- | --- | --- |
| Learning-aware task routing | Keep, simplified into rule routing | Four fixed tasks + learning value/risk labels + explainable result |
| Five-level fading scaffold | Core feature | One set of reviewed hints per case, disclosed at five depths, implemented for one skill |
| Five evidence gates | Core feature, with weaker claims | Implement rules and evidence states; call them learning evidence, not scientific proof of competence |
| Automatic regression | Keep | Restore one support level after transfer/retention failure; UI says "reinforce support" |
| One new task after every hint | Adjust | At most one verification task per completed task; multiple hints are merged into one verification |
| Predict, then reveal | Core feature | Hide the prepared AI draft until the junior submits judgment and confidence |
| Planted-error review | Keep | Only in clearly labeled training that may contain preset mistakes; the case library also includes correct drafts |
| Confidence calibration | Keep a lightweight version | 50% / 75% / 90% choices, high-confidence errors, and sample insufficiency shown |
| Passive expertise capture | Rename to "correction becomes material" | One senior reason + structured draft + publish confirmation; no zero-cost or guaranteed ten-second claim |
| Self-growing ladder and privacy | Show experience reuse as core; next-generation contribution as P1 | Reviewed reuse; junior raw attempts are not shown by default on the mentor homepage; help request content is previewed by the junior |

## 5. Five Support Levels: Clear Definitions, No Traps

| Level | What the junior receives | Example in this scenario |
| --- | --- | --- |
| L4 Full demonstration | Full answer, auditable business reason, and evidence mapping | Shows month and amount, and explains why the service period controls allocation |
| L3 Partial demonstration | A usable structure with the key judgment left blank | Shows a month table and asks the junior to choose which months bear the expense |
| L2 Principle hint | States the relevant principle without filling in the result | "Judge expense allocation based on the service delivery period in this case" |
| L1 Direction hint | Points to the material or clue to inspect | "Compare the service start date with the end of this month" |
| L0 Independent attempt | No relevant hint, example, or AI answer before submission; normal feedback after submission | The junior independently submits amount, evidence, and reason |

The L4 "reason" is a reviewed, explainable basis, not a model's hidden chain of thought. The five levels are not five models with different intelligence, and they are not five levels of employee value.

### 5.1 Meaning Of The Current Support Level

The current support level means **the deepest help available by default in this training attempt**. At L2, the learner can request L1 or L2. After the evidence rules are met, support moves to L1: the principle hint disappears, leaving only the direction hint before Lin must attempt. The visual ladder places L4 at the bottom and L0 at the top, so progress moves upward as support decreases.

In a practice attempt, the learner can still go deeper than the current level by choosing "view demonstration" (L3/L4). The attempt is then recorded as demonstration-assisted, and the default level does not change.

When the learner needs more help during a challenge, they can choose "leave independent challenge and view demonstration." That ends the current independent check and records it as assisted learning. They can then see L3/L4 or ask the mentor. The system keeps the challenge evidence clean while still letting the learner actually receive help.

Support level does not change real system permissions, employee treatment, or delivery responsibility.

### 5.2 Usage Rules

1. The system recommends the smallest hint that may be enough. The junior can directly select any currently allowed depth; requiring a click through every lower level would add friction without proving learning. Every disclosed hint still counts as assisted practice.
2. L4 is explicitly available in learning mode, so the contradictory rule "never give the full answer" is not used.
3. A task where the answer has been seen or a hint has been used cannot count as unassisted success. Using less help than the current support level is still assisted.
4. At most one new task is scheduled after each task ends. It can be completed later and shows the evidence still pending. Clicking multiple hints does not create a queue of new exercises.
5. The system does not use timers, repeated-failure locks, or shaming copy to restrict asking for help.
6. Confidence is selected before reveal and cannot overwrite the original record after submission. Reflection after feedback can be recorded separately, but it is not disguised as prior confidence.

## 6. Evidence Types And State Rules

### 6.1 Demo Rules For Five Evidence Types

The following thresholds are **demonstrable product rules that should be revised in pilots**, not universal standards from learning science. All thresholds are calculated for one skill and the current caseVersion scope.

| Evidence | P0 rule | If not satisfied |
| --- | --- | --- |
| E1 Unassisted success | Two different regular check cases in the current stage are passed independently | Show what is missing without creating infinite drilling |
| E2 Delayed retention | At the time of the check, at least 72 hours have passed since the linked teaching attempt for this skill; the learner passes one unseen retention case with no help; linked teaching ID is stored | Pending if not due; changing the date cannot fabricate real evidence |
| E3 Transfer | One pre-marked changed-condition case is passed without help; the case changes a decision-relevant fact | If failed, restore one support level and explain the reinforcement reason |
| E4 Explanation | The learner selects the correct evidence and an accepted rationale code; if free text contradicts structured choices, mark as needs review | Give feedback; open-text disagreement goes to human review |
| E5 Confidence check | At least eight independently scored check records, Brier score <= 0.20, and no 90%-confidence error in the last three checks | Sample insufficiency is pending; high-confidence error is needs_review |

For E5, Brier = mean((p - y)^2), where p is prior confidence 0.50/0.75/0.90 and y is the structured outcome, 1 for correct and 0 for incorrect. It measures the overall quality of probability predictions, not pure calibration. The eight-sample requirement and 0.20 threshold are demo rules, so they cannot prove statistically that someone "knows what they know." The mentor view uses "confidence check" and sample size, and treats "calibration" as a direction for longer-term validation. Paused or corrupted cases are not counted as errors in the denominator.

E4 uses pre-reviewed rationale codes in a limited case library, not large-model grading of essays. Arbitrary free text cannot be approved through simple keyword matching. If contradictory text cannot be reliably checked, it goes to human review and blocks automatic fading for this stage. P0 can limit input to evidence selection, rationale selection, and optional help-message text to control this complexity.

Rationale selection is a proxy for explanation understanding, not the same as generating an explanation independently. The demo explanation card is labeled "structured rationale recognition." A later pilot should add a short self-generated explanation or oral follow-up to check true understanding. Completed retention checks keep the teaching link they had at the time; later practice does not rewrite historical timing. Each new stage needs new evidence, so the same retention record cannot be reused to fade support repeatedly.

A retention check passed in the current stage stays valid for that stage. Later teaching attempts in the same stage, including WK-01, do not reset its 72-hour clock or replace its linked teaching attempt. A new stage requires fresh evidence.

### 6.2 Fading And Regression

- If E1-E5 are all passed and there are no unresolved reviews, the current skill's support level moves one step toward L0.
- The same evidence set can trigger only one fade. A stageId is recorded, and the next stage needs new evidence so one success cannot drop multiple levels.
- If retention or transfer fails, the support level for subsequent training moves one step back toward L4 after feedback.
- A high-confidence error marks the reason and pauses further fading. If it is also a retention/transfer failure, support rises only once.
- Interruption, network failure, skipping, or requesting a demonstration is not treated as an incorrect test answer and does not trigger automatic regression. It simply adds no independent evidence.
- Re-submitting the same attempt cannot update the level repeatedly.
- A senior can restore more support as an exception, but must record a short reason. They cannot silently fabricate passing evidence.

UI copy example: "Cross-period allocation: L2 to L1. You independently identified that the service had not yet started in a new context; all five evidence types meet the demo rule." On failure: "This skill needs more support for the next round, so training returns to L2. We will reinforce service-period judgment."

### 6.3 Showing Weeks Of Growth In Three Days

Three days cannot produce weeks of real retention data. The demo has two clearly labeled entry points:

- **Start from zero:** no history. The junior receives demonstration and completes an attempt. Retention and sample size remain pending, and no fictional progress occurs.
- **Growth checkpoint:** load Lin's record labeled "simulated history." Lin starts at L2 with E1/E2/E4/E5 ready and E3 missing. When the judge completes a new-context case live, the rule engine really computes the transition from L2 to L1.

The checkpoint fixture contains eight historical independent check records at the same skill stage, including two distinct regular checks for E1 and one linked delayed retention check for E2. These use historical case IDs outside the six interactive demo cases; TR-01 is reserved for the live transfer check. Each fixture record carries its own case ID/version, timestamp, result, prior confidence, and `demo_seed` origin. For a repeatable demo, all eight are correct: six have prior confidence 0.75 and two have 0.50, giving Brier = 0.109375. The live TR-01 check recomputes E5 from nine records; a correct answer at the scripted 0.75 confidence yields Brier ≈ 0.1042, safely below 0.20. Even a correct 0.50-confidence answer would yield 0.125. The six-case library is the interactive experience, not the total number of seeded observations.

Simulated history and live input are labeled as demo_seed and session. Any fade triggered by mixed evidence is always labeled "demo result, includes simulated history." The product must not graph historical data as unmarked real experiment data, and it must not move the demo clock forward as if real delayed retention occurred.

Independent means "this check did not use in-app hints or revealed answers." The demo cannot rule out external assistance. A formal pilot that claims unassisted performance must define the observation conditions.

## 7. Complete User Workflow

### 7.1 Initial Setup

The team chooses a skill template, reviews cases, answers, and hints, and configures mentors and support rules. The demo already contains fictional materials, so the user does not need to fill in an org chart, upload documents, or configure a model.

### 7.2 Junior Daily Path

1. **See today's tasks.** Lin sees tasks that AI can handle and one judgment worth practicing. The task card gives the recommendation reason.
2. **Judge first.** She opens the source materials, enters the amount/action, selects evidence and rationale, and chooses prior confidence. The AI draft is not visible yet.
3. **Get support when needed.** If stuck, she can view hints within the current support level or leave the challenge to see a full demonstration. Each use records disclosure depth. At L1, she can see the direction hint but no longer the L2 principle hint.
4. **Reveal and review AI.** She sees the prepared draft, compares it with her judgment, and chooses accept, correct, or insufficient information. Training may include preset mistakes and correct drafts.
5. **Ask a precise question.** If there is disagreement or remaining uncertainty (for example, she corrected the AI but relied on the L2 hint and is unsure when invoice timing could ever be the right basis), she previews "materials + my judgment + what I am unsure about" before sending. The system does not automatically share her full history.
6. **Receive senior correction.** She reads the key reason and its applicability conditions, then completes the task.
7. **Do one new-context verification.** A case with a different key condition checks the same principle; no answer is revealed before submission. If she needs help, she switches back to learning mode.
8. **See growth update.** She sees the new evidence, what is still missing, and whether support changed. Due reviews can enter the flow later.

"Predict first" has two timings. In low-risk practice, the junior can judge before reveal. In urgent real delivery, a future product can let AI or a senior complete the work first and schedule a learning copy separately. The claim is that learning can avoid blocking the original delivery flow, not that learning takes no time.

### 7.3 Senior Path

1. Open a request, read the short summary, and expand the materials the junior agreed to share only if needed.
2. Correct the conclusion or add the key judgment, leaving one auditable reason.
3. The system generates an experience card draft: cue, principle, applicability, exception, source.
4. The senior chooses "publish and use for practice," "edit," or "reply only." Publishing handles one card; the senior does not need to write an entire course.
5. In the skill overview, the senior sees evidence and a few exceptions, not every hint approval.

### 7.4 Experience Relay

After an experience card is published, explicit caseId/skillId relationships connect it to **post-submission feedback** on TR-01. Lin sees the cited, reviewed principle only after submitting the independent check; the feedback shows its source and applicability boundary. This works at L1 because support level controls help *before* submission, not feedback afterward. The original help request and private attempt remain separate. The demo does not need semantic search.

Later, juniors can submit their own effective corrections as drafts, but they still require review before entering the shared pool. The three-day P0 demonstrates the senior-to-experience-card-to-new-exercise-feedback loop; the same approved card can serve a future junior's feedback. "Mature juniors contribute material for the next cohort" remains P1 or closing vision, not a claim that the system grows without maintenance.

## 8. Case Library: Six Fictional Cases Are Enough For The Loop

All amounts are in dollars. Cases state that tax, financing, and capitalization are out of scope. Cases that require equal allocation explicitly state that service is performed evenly each month. All cases and hints should be checked by someone with domain knowledge before formal testing. If the team only self-reviews them, disclose that limitation.

| ID | Type | Materials and goal | Acceptable result |
| --- | --- | --- | --- |
| EX-01 | L4 demonstration | Service is provided evenly over two months, total 600; ask for one service month's expense | 300, citing the service period |
| WK-01 | Main task / planted-error AI review | Service is provided evenly from Oct-Dec, total 1,200; Oct and Nov were correctly accrued in their own months; invoice is issued in Dec. Ask how much cost belongs to December's service. The labeled preset AI draft incorrectly gives 1,200 | 400; point out that the invoice month does not replace the service period; correct AI |
| CK-01 | Correct AI control | Service is provided evenly over six months, total 600; ask for one service month's expense; AI gives 100 | Accept 100 and explain from the materials; avoid training users to always reject AI |
| TR-01 | Transfer check | 900 paid in Dec; service will be provided evenly Jan-Mar next year; ask for current-year December expense | 0; point out that service has not occurred, instead of mechanically allocating to payment month |
| UN-01 | Insufficient information | Milestone-based contract, total 1,200, missing acceptance/performance progress; AI averages directly | Choose need more information; explain that current materials cannot determine the amount |
| RT-01 | Retention/regression branch | Service runs 1 Dec 2026–28 Feb 2027, evenly across the three months, total 1,500; ask for January 2027's expense | 500; wrong answer can demonstrate support reinforcement, but not a real delayed-retention result |

TR-01's full materials and answer must not be leaked through the workbench or hints before the independent check. Simulated historical data should refer to other historical case IDs, not mark the judge's live case as already completed. Every seed record states source, case type, and version.

UN-01 is the next expertise test shown at the end of the pitch: the useful judgment is to stop and request missing acceptance or performance evidence when the AI confidently proposes an amount. It is previewed, not rushed through as a second graded live task.

## 9. Screens And Interaction

### Screen 1: Today's Growth Opportunities

Four task cards plus the current target skill at L2. Above them, show a compact learning-value × delivery-risk grid with the cards placed in cells and the route rule visible: high learning/low risk → junior practice; low learning/low risk → AI; high risk → senior delivery, with a separate practice copy if useful. Cards show one-line route reasons. Only the main task enters full interaction; the others explain the rules and must not offer fake completion actions.

### Screen 2: Judgment Workbench

Desktop layout: materials on the left, judgment area in the center, five-level ladder and hints on the right. Narrow screens use this order: goal, materials, judgment, hints/help. The top bar shows training environment and current skill.

Key controls: submit judgment, choose confidence, request hint, view demonstration, reveal draft, accept/correct/need information, and preview help request. The app state enforces submit-before-reveal, and refresh does not leak the answer. Success feedback shows the basis, not only a green check.

### Screen 3: My Growth

The top area highlights current support level and the reason for the most recent change. Five evidence cards below show passed / pending / needs review. Opening a card shows date, case type, and source. Independent verification and due review are combined into one entry point, not a separate course marketplace.

### Screen 4: Mentor Workbench

The top area shows a small set of pending replies/reviews and a headline tile: **"Incorrect AI drafts accepted: 0/1 session; 1/4 simulated history"** after WK-01. Its denominator is incorrect drafts actually revealed for review; its numerator is explicit "accept" decisions. These review events are separate from the eight historical E5 checks, and each source and small sample size is labeled. The middle shows the two curves for the current skill. The bottom shows one experience-card draft and publish actions. The demo uses a top role switch and continuously states that this is simulated in one browser.

### Visual Language

The ladder is the main visual. L4 sits at the bottom and L0 at the top; nearby copy says "grow upward as support decreases" so smaller numbers are not read as demotion. Colors are secondary; every level always has text. Copy is mature and specific, not childish rewards or competitive ranking.

The main interface should not show ten features at once. Evidence details expand on demand. Judges should first understand "how much help this person currently needs, and why that changed."

## 10. Defining Two Curves Without Misleading People

| Curve | Calculation and display | Limits |
| --- | --- | --- |
| Support use trend | Group submitted practice attempts for this skill over time and average the highest actual disclosure level used; no hint = 0, full demonstration = 4 | Use actual use, not configured support level; separate practice and check attempts so changing the level itself is not treated as ability growth |
| Independent check accuracy | Correct no-hint check submissions / scorable submissions; split regular, transfer, and retention; show n for each group | Incomplete, help-requested, and interrupted attempts are counted separately, not silently dropped before claiming overall success; small samples do not support statistical confidence claims |

The two curves use different attempt types, and the denominator is written below the chart. A single point is only an observation at that time. The curves must not directly accuse someone of "copying." If support use falls but independent performance does not improve, the copy says "review practice difficulty and support design," not a judgment about motivation.

Overconfidence cannot be inferred directly from these two curves. A separate "high-confidence errors" count and confidence-check card are shown. When retention items are insufficient, the UI says "not enough retention evidence yet." Simulated history uses dashed lines or shading, live records use solid points, and both have text labels rather than relying only on color.

By default, mentors see evidence summaries, not private word-for-word logs. For help requests that juniors actively send, mentors see the previewed shared content. This is separate from the default rule that raw practice logs are not exposed.

## 11. Three-Minute Pitch Demo Script

| Time | Purpose | Live action |
| --- | --- | --- |
| 0:00-0:20 | Show why a junior receives this judgment | Show the learning-value × risk grid and open WK-01, already positioned on the materials view |
| 0:20-0:55 | Junior thinks first, then reviews AI | Choose the prepared judgment and confidence, request L2 hint, submit; reveal and correct the labeled planted-error draft |
| 0:55-1:30 | Senior contributes one useful reason | Lin asks the prepared question "I used the principle hint; when, if ever, does the invoice date decide the period?" Preview it, switch to mentor, add one reason ("Only when it matches the service period; always check the contract's service dates first"), review and publish the experience card |
| 1:30-2:15 | Turn explanation into testable growth | Switch back to junior, enter TR-01; pre-select 75% confidence, use no hint, judge December expense as 0, submit, then show Chen's card in feedback |
| 2:15-2:40 | Make the change in help concrete | Evidence cards update, L2 to L1; open the next practice view to show that L2's principle hint is gone and L1's direction hint remains |
| 2:40-3:00 | Point to the next expert judgment | Glance at UN-01's "need more information" decision; remind judges that Chen's card appeared only after the independent submission |

This script assumes the "growth checkpoint" entry point, and the page always shows the simulated-history label. Pre-position the materials view and keep prepared inputs one click away; rehearse the entire role switch. If the run is long, compress the final UN-01 and reuse glance to ten seconds. The live sequence demonstrates the rules, not long-term competence.

Optional 30-second backup: load the separate regression scenario, intentionally submit a wrong answer on RT-01, and show support restoration. Its `demo_seed` fixture includes a linked teaching attempt timestamped more than 72 hours earlier, so RT-01 counts as a valid retention check under E2 without moving the clock. This demonstrates how the system responds to mistakes, not a user research result.

Memorable line: **"One senior correction unlocks the next independent judgment; every step toward less AI help has evidence attached."**

## 12. Technical Plan And Data Contract

### 12.1 Minimum Implementation

Use the team's familiar React + TypeScript + Vite stack, with a single-page app, local persistence in the same browser, a fixed case library, and a finite state machine. Model integration is P1 if deployment conditions allow it. The demo does not need model training, multiple agents, or a vector database.

The three-day technical highlight is: explainable task rules, reproducible five-level hint state, growth state that changes from evidence rather than clicks, and one correction written into and read back from reusable experience content.

If a model is connected, it only handles bounded tasks: summarizing help requests, rewriting approved hints, and drafting experience cards. Case answers, grading rules, permissions, and progression rules are controlled by the app. Keys stay server-side. If network or model calls fail, the app continues with reviewed static content and labels its source.

### 12.2 Core Records

| Record | Minimum fields |
| --- | --- |
| Task | id, caseId, skillId, learningValue, deliveryRisk, recommendedRoute, routeReason |
| Case | id, version, type, facts, allowedActions, acceptedAnswers, evidenceIds, rationaleIds, hints L1-L4, aiDraft, draftOrigin |
| Attempt | id, caseId/version, skillId, stageId, mode, answer, evidenceIds, rationaleId, confidence, maxHelpUsed, answerRevealed, aiReviewDecision, result, createdAt, submittedAt, origin |
| SkillState | skillId, stageId, supportLevel, evidenceStates, lastTransition, unresolvedReviewIds |
| HelpRequest | id, selectedContext, previewText, status, reply, createdAt, repliedAt |
| ExperienceCard | id, skillId, cue, principle, applicability, exception, sourceAttemptId, author, status, version, approvedAt |

Suggested states: Attempt as in_progress/submitted/assisted/needs_review; HelpRequest as draft/sent/answered/cancelled; ExperienceCard as draft/published/disputed/retired. Correctness and workflow state should be stored separately. Progression creates a Transition event with evidence IDs, making the result explainable and preventing repeated updates.

origin should at least distinguish demo_seed and session. `aiReviewDecision` is accept/correct/need_info after draft reveal; the headline tile counts only cases whose reviewed draft is known to be incorrect. The four simulated review events for the tile are separate from the eight E5 check records. Publishing an experience card creates a separate public content copy; the private help-request text is not linked to everyone by default. Reset deletes local attempts, help requests, derived progress, and current-session cards, then reloads labeled seed data.

### 12.3 Behaviors That Must Be Verifiable

Refresh restores the prior state; refreshing an independent challenge does not reveal the answer early; practice attempts such as WK-01 never enter E1 or E5, which count only independent checks; hint use is recorded correctly; repeated submission does not lower the level repeatedly; cancelling a request creates no shared record; unpublished experience is not cited in practice; insufficient data does not pass automatically; unknown caseVersion is not auto-graded; simulated-history labels do not disappear after refresh.

## 13. Three-Day Development Plan

Assume two developers and a third teammate for content and pitch. If the team size differs, reduce interface richness and P1 scope before adding parallel scope. This is a suggested split, not an actual assignment.

| Time | Output | Exit condition |
| --- | --- | --- |
| Day 1 morning | Freeze one skill, six cases, answers, and evidence rules; build workbench and seed data | WK-01 can submit judgment, reveal draft, and receive correct feedback |
| Day 1 afternoon | Five-level hints, independent checks, persistence, stage state, growth-checkpoint seed | TR-01 can trigger one L2 to L1 transition; insufficient-data branch does not pass |
| Day 2 morning | Help preview, mentor reply, experience-card draft/publish/reuse | A newly published card appears in TR-01 feedback only after submission |
| Day 2 afternoon | Task rule cards, two curves, source labels, regression path | Success and failure loops can be reliably reproduced from reset |
| Day 3 morning | Observe target users or close proxies using the flow; revise copy and tasks | Record actual sample, confusion points, and time cost; distinguish team roleplay from real participants |
| Day 3 afternoon | Stop new features, fix blockers, rehearse, record backup, check deployment | The same demo path succeeds twice in a row, and a local backup runs |

Developer A: state rules, data, mentor flow, deployment. Developer B: junior workbench, five-level ladder, growth view. Content/product: case and evidence review, observation sessions, three-minute narrative. Agree on shared types early so both sides do not invent different state strings.

**If independent case to ladder transition is not working by the end of Day 1, remove model integration and extra animation. If experience reuse is still not working by the end of Day 2, use a fixed template for the draft but keep real editing, approval, and citation.**

## 14. Acceptance And Minimum Evaluation

### Functional Acceptance

- The six cases have consistent amounts, periods, standard answers, rationales, and boundaries.
- The main task supports predict-before-reveal, and the correct-AI control case is not automatically marked wrong.
- Requesting L1/L2 and leaving the challenge to view L4 are recorded separately; the latter cannot generate unassisted success.
- E1-E5 are explainable; retention not due or insufficient confidence samples show pending.
- The level drops by exactly one only when full demo conditions are met; the same evidence does not drop multiple levels.
- Retention/transfer error restores support; interruption and network error do not punish the learner.
- A new experience card must be published by the senior; TR-01 feedback cites the latest published version only after submission and does not reveal it during the independent check.
- The eight seeded checks start E5 at Brier 0.109375; a correct live TR-01 response at 75% confidence leaves E5 passed and fades exactly once.
- The wrong-draft acceptance tile separates session from simulated review events and uses only revealed incorrect drafts in its denominator.
- The mentor sees content that matches the junior's sharing preview.
- Curves show sample size, source, and type; simulated history and live data are distinguishable.
- Desktop and narrow screens can complete the core flow; keyboard focus is clear; enlarged text still allows operation.
- The full static-content demo works without external APIs; reset and local backup are available.

### What Three Days Can Measure

Observe a small number of target users or close proxies. Record whether they understand the materials, find help, identify the changed context, how long the mentor action takes, and whether both sides understand sharing boundaries. Report results by participant count and case. Do not claim general effectiveness from a small sample.

The live demo can prove that the state and workflow were implemented. Small-scale observation can reveal usability issues. Truly validating retention, transfer, and net mentor burden requires later pilots against ordinary AI use or existing training processes. Comparison should keep materials and time opportunity similar, use different cases, and record dropouts and failures instead of counting only successful participants.

Long-term target metrics: incorrect AI drafts accepted / incorrect AI drafts shown on unseen cases, independent judgment quality, delayed-check performance, total mentor effort, junior practice time, and delivery time. Compare the wrong-draft acceptance rate with the current AI-plus-training workflow on matched cases; report correct-draft acceptance too, so blanket rejection cannot appear successful. Support reduction itself is not the success metric.

## 15. Privacy, Burden, And Honest Presentation

1. P0 uses fictional data and same-browser role switching. It does not claim real cross-user privacy isolation.
2. The formal product's default boundary has three layers: private attempts, previewed help requests, and approved shared experience. The mentor homepage shows summaries and does not expose word-for-word activity logs.
3. "Juniors own their raw data" is first implemented as product controls to view, export, and delete. Legal ownership, employer retention duties, and shared copies must be agreed during deployment and cannot be promised unconditionally in the demo.
4. The product does not rank people for performance, and AI does not automatically decide promotion, pay, or real work permissions. Competency curves are not anonymous data by default.
5. A "ten-second reason" is an interaction goal for reducing burden. Actual time must be measured; review and maintenance are still costs.
6. Planted errors are used only in clearly labeled synthetic training. They are not put into real customer work or accounting records. If the AI draft is prewritten, label it "preset AI output example" and do not dress it up as live generation.
7. Do not promise zero extra time, full elimination of retirement-related knowledge loss, or final proof of competence from one transfer success.

## 16. Why This Version Fits The Rubric And The Narrative

| Criterion | How this version presents it |
| --- | --- |
| Potential effectiveness 40% | Targets an understandable judgment skill, shows the difference between assisted completion and independent transfer, and explains later retention validation |
| Technical feasibility 30% | Fixed cases, explicit rules, one skill loop; demo works even if network fails; real state change rather than fake animation |
| Business/social uptake 10% | Learning is embedded in tasks, mentors only handle key corrections, and workload plus sharing boundaries are clear |
| Originality 15% | Task-opportunity routing, evidence-based fading, and correction relay are connected in one work chain; shows combination value without claiming each individual feature is globally first |
| Presentation 5% | Junior reviews AI -> senior gives one sentence -> junior succeeds independently in a new context -> support changes; the story fits in three minutes |

The evidence metrics and hint system have precedents in existing products. The differentiation is how the workflow turns "AI already did the task" into "a person still gained experience," plus the visible evidence-driven state change in the demo.

## 17. Research Basis And Boundaries

- Adaptive fading examples support structured skill learning, but the research does not validate this document's five levels, 72-hour delay, eight-item sample, or threshold combination: [Salden et al., 2009](https://onlinelibrary.wiley.com/doi/full/10.1111/j.1756-8765.2008.01011.x).
- AI-assisted completion and independent understanding should be measured separately. One small-scale programming experiment found a difference between groups on an immediate unaided test; it does not generalize to every industry or long-term outcome: [Shen and Tamkin, 2026](https://www.anthropic.com/research/AI-assistance-coding-skills).
- A field experiment in high-school mathematics found that unrestricted AI help could impair unassisted performance, while instructional safeguards mitigated that effect; this does not establish the effect of Unlock in workplaces: [Bastani et al., 2025, Stanford study record](https://scale.stanford.edu/ai/repository/generative-ai-can-harm-learning).
- Practical help records, workflow burden, knowledge maintenance, and competitor comparisons are covered in the [research report](docs/future-work-research-and-recommendations.md).

The product promise in this document is: "make support changes evidence-visible, and make experience usable in the next practice moment." Effect size, long-term competence, and business savings must be validated in real teams.

## 18. Three-Sentence Product Summary

Unlock preserves useful beginner judgments as AI automates routine work, giving juniors a chance to decide before seeing AI's answer.
Its support fades only when independent checks show the learner can handle the skill in a changed context, and returns when they struggle.
A mentor's reviewed correction becomes feedback that helps unlock the next independent judgment.
