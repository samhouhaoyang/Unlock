# Future Work: research, solutions and a candidate demonstration

> **Historical research — superseded design proposals.** The user has since finalised Unlock's finance scenario and six-case P0. Use the [final product specification](../product.md) and [accepted implementation decisions](implementation-decisions.md) for behavior, and the [pitch brief](../pitch.md) for narrative. The SQL example, three-case recommendations, and selection questions below document earlier alternatives; they are not current implementation requirements. Findings and citations are preserved as research background. Statements about repository status describe the report's preparation time; this file now lives in the canonical Unlock repository.

Prepared 29 September 2026. The user confirmed in this conversation that the problem statement has been released and the official work period has started. This report evaluates the junior–senior learning concept. It is a proposal for human selection, not an approved implementation specification. The earlier FirstVisit documents describe a different candidate and have not been rewritten. No app, deployment, interviews or measured learning results are claimed. This folder is not currently a Git repository; no branch, commit or PR was created.

The research separates empirical findings, established practice, documented product capabilities and our design hypotheses. Recommended mechanisms below are hypotheses to test; citations support the underlying mechanism or concern, not the effectiveness of this proposed product. The competitor review is selective and cannot establish global novelty.

## Recommendation

Retain the ambition to develop expertise and preserve expert judgment. Replace the global AI-capability ladder with assistance that adapts to a specific skill. Turn the experience pool into reviewed explanations of decisions, including when the advice does not apply. Connect those explanations to practice on a materially changed case.

Candidate proposition: **Turn one expert intervention into reusable practice that helps another person handle the next unfamiliar case, while making the time cost visible to both people.**

The core loop is:

> Real or realistic decision → relevant evidence and optional help → concise expert correction when needed → reviewed explanation and its limits → changed-case practice → dated evidence of what the learner demonstrated.

The strongest potential distinction is the integration of workplace-specific judgment, legitimate access to full help, limited mentor capacity and observed transfer. Hints, knowledge repositories, adaptive learning and quizzes are established ideas.

## What the evidence supports

| Source and evidence type | Relevant finding | Boundary on the claim |
| --- | --- | --- |
| [Generative AI at Work, QJE 2025](https://academic.oup.com/qje/article/140/2/889/7990658), workplace deployment | Among 5,172 customer-support agents, productivity rose around 15% overall. The authors also found evidence consistent with learning. | One company's workflow. AI can help novices; restricting it universally is not supported. Learning observations are not equivalent to broad professional expertise. |
| [Shen and Tamkin, 2026](https://www.anthropic.com/research/AI-assistance-coding-skills), small randomized experiment | Developers learning an unfamiliar library averaged 50% versus 67% on an immediate unaided quiz with versus without AI; 52 participants were analysed. | A 17-percentage-point difference in this experiment, not a predicted effect for this product or all developers. Long-term retention was not established. |
| [Bastani et al., PNAS 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC12232635/), randomized classroom experiment | Unrestricted AI assistance improved practice but harmed subsequent unaided performance. A teacher-informed tutor mitigated that harm. | The guarded tutor did not show superior unaided performance to the control. Its task-specific material required substantial teacher input. |
| [Salden et al., 2009](https://onlinelibrary.wiley.com/doi/full/10.1111/j.1756-8765.2008.01011.x), geometry experiments | Worked steps were faded separately for individual skills as understanding improved; adaptive fading supported delayed transfer. | Authored geometry tasks and constrained explanations. Classroom findings were less uniformly strong than laboratory findings. This does not validate an AI classifier of workplace mastery. |
| [Kapur, 2014](https://onlinelibrary.wiley.com/doi/10.1111/cogs.12107), productive-failure experiments | Attempting an appropriate problem before explicit instruction improved conceptual understanding and transfer in the studied mathematics setting. | Productive failure includes consolidation and instruction. It does not mean withholding help indefinitely or using live customers as practice. |
| [Karpicke and Blunt, 2011](https://learninglab.psych.purdue.edu/downloads/2011/2011_Karpicke_Blunt_Science.pdf), retrieval experiment | Reconstructing learned science material supported later comprehension and inference performance. | Supports checking learning after assistance; not a validation of a particular workplace test or interval. |
| [Buçinca et al., 2021](https://arxiv.org/abs/2102.09692), AI decision experiment, N=199 | Cognitive forcing reduced overreliance, but stronger interventions received worse subjective ratings and benefits differed between participants. | Added friction has costs. A mandatory explanation before every action is not automatically beneficial or equitable. |
| [Microsoft onboarding study](https://arxiv.org/abs/2103.05055), interviews and surveys | Onboarding tasks support learning, confidence and socialisation. | Learning is also a relationship and workflow problem; content alone is insufficient. |
| [Microsoft onboarding guidance](https://www.microsoft.com/en-us/research/articles/advice-for-remote-onboarding-of-new-hires/), research-based guidance | Persistent records can discourage questions; explicit buddy and technical-mentor roles clarify support. | A private interface cannot by itself make a punitive workplace psychologically safe. |
| [Critical Decision Method](https://researchoutput.csu.edu.au/en/publications/capturing-cognition-using-the-critical-decision-method/), established elicitation method | Incident-based probes elicit goals, cues and strategies behind expert decisions. | Our proposed short capture is an adaptation, not a validated replacement for a full cognitive task analysis. |
| [KCS Solve Loop](https://library.serviceinnovation.org/KCS/KCS_v6/KCS_v6_Practices_Guide/030/030), practitioner methodology | Capture context during problem solving; reuse and improve knowledge. Excessive structure can disrupt work. | Supports embedding capture in existing work; does not prove this implementation will save mentor time. |
| [LLM-as-a-judge study](https://arxiv.org/abs/2306.05685), model evaluation | Identified position, verbosity and self-enhancement biases in model judgments. | Chatbot preference evaluation is not employee competence assessment. Fluent prose is weak evidence of mastery. |

## Root causes and the corresponding intervention

The five-whys hypotheses from the earlier analysis produce three intervention points. Validate them with actual workplace incidents before choosing a target organisation.

| Hypothesised chain | Intervention to test | What would falsify the diagnosis? |
| --- | --- | --- |
| Weak transfer → solution copied → reasoning never elicited → review checks output → learning has no protected time or owner | A short, paid practice episode targeting one consequential decision, followed by a changed case | Learners already reason independently; the main obstacle is missing permissions, poor requirements or an unfamiliar tool interface |
| Repeated interruptions → prior answers hard to reuse → missing context → capture creates extra work → no ownership | Draft from an existing help exchange, preserve applicability and assign maintenance ownership | Most questions are novel or interpersonal; capture and retrieval cost more than direct conversation |
| Junior stays silent → asking feels risky → uncertainty is visible → records may influence progression | Separate private practice, selected help requests and approved shared knowledge | Juniors understand the privacy boundary but still avoid asking because management penalises uncertainty |

The fishbone branches are work allocation, feedback, incentives, relationships, knowledge quality, and tools/measurement. The app can influence each, but only the employer can allocate protected learning time and change performance expectations.

## Concern-by-concern responses

### A. Learning, capability and progression

| Concern | Proposed response | Distinctive application and test |
| --- | --- | --- |
| A1. Does limiting AI produce learning? | Use a capable model with different forms of assistance: cue, comparison, worked explanation or full solution. Explicitly name the judgment the learner is practising. | Vary what the learner does, rather than deliberately degrading answer quality. Compare changed-case performance against normal AI assistance. Basis: adaptive fading and the mixed AI-learning evidence above. |
| A2. Beginners lack suitable work | Use a synthetic or sanitised replay of a resolved workplace decision in a sandbox. Preserve ambiguity and relevant evidence while removing operational consequences. | A case can be easy to run but still require a meaningful decision. Have a domain expert check whether it represents real work; reject contrived puzzles. |
| A3. Less help might overwhelm novices | Offer a worked example first when prerequisites are missing, an independent attempt for prepared learners, and more support after errors. | Start with a simple learner choice; postpone automatic adaptation until it can be validated. Measure abandonment and misunderstanding as well as correctness. |
| A4. Repetition may teach memorisation | Pair practice with a case where a relevant condition changes. Ask the learner to choose evidence or the next diagnostic action before showing feedback. | Include a case where applying the previous fix is wrong. Renaming people or changing numbers alone is not a meaningful transfer test. |
| A5. One level hides uneven abilities | Keep dated evidence by skill: problem framing, evidence selection, diagnosis and validation. | Say “demonstrated on this case” rather than “level-4 employee.” Evidence for SQL diagnosis says nothing about leadership or architecture. Component-level modelling has precedent in [knowledge tracing](https://link.springer.com/article/10.1007/BF01099821). |
| A6. Senior unlocks become arbitrary | Publish observable criteria; allow retries and a second reviewer for disputed judgments. Reserve human approval for changes in actual responsibility. | The learning tool recommends support. It does not automatically promote, demote or restrict a person's job. Compare two reviewers on the same sample to improve the rubric. |
| A7. Polished AI writing looks like expertise | Prefer a decision plus selected evidence and a short rationale. Check a fresh case or demonstration as well. | Accept concise bullets or an explained action. Test equivalent answers with different verbosity and names; the assessment should remain consistent. |
| A8. The learner needs help immediately | Keep full explanation and the existing human-help route available. Mark the resulting attempt as assisted. | “Show me how” is legitimate; it supplies no evidence of independent performance on that attempt. Avoid a mandatory number of failures or a countdown before help. |
| A9. Practice competes with deadlines | Separate delivery from practice. Let the person finish urgent work, then choose a relevant replay during agreed learning time. | No compulsory accumulating homework debt. Proposed pilot allowance: two ten-minute sessions per week, adjustable with the team; this is a burden budget to test, not an optimum. |
| A10. Learners can use outside AI | Make evaluation low stakes and transparent; use observation for any pilot labelled unaided. Record only what the app actually knows. | “No in-app hint used” is different from “verified independent.” Avoid invasive monitoring and claims to detect all AI use. |

The ladder can therefore become a progression in demonstrated judgment: **study an example → attempt with support → demonstrate on a fresh case → demonstrate again after a delay**. People can return to an earlier support mode without losing status. Research on [cognitive apprenticeship](https://www.aft.org/ae/winter1991/collins_brown_holum) provides a conceptual basis for making reasoning visible and gradually removing scaffolding; this exact product sequence remains untested.

### B. Senior burden and the experience pool

| Concern | Proposed response | Distinctive application and test |
| --- | --- | --- |
| B1. Seniors must write a course | Start from a real answer or correction. AI drafts a compact case; the senior corrects the deciding cue and boundary. Allow “answer only; do not publish.” | Capture value from a moment already occurring. Measure reading and checking time, not just the final click. |
| B2. Every question interrupts a senior | Search reviewed cases first, then offer an editable concise request. Group genuinely equivalent unanswered questions for one response. | Display differences between grouped requests; never silently merge opposite conditions because wording is similar. |
| B3. A senior becomes an approval queue | Set explicit availability and a queue capacity. Batch non-urgent review; retain the team's normal escalation route for blocked work. | Pilot target: twenty mentor minutes per week for five learners, then measure actual demand. Overflow is visible rather than disguised as “AI handling it.” |
| B4. Junior cannot formulate a good question | Prefill goal, evidence and attempted checks from information the user chooses to include. Permit “I don't know what to check.” | The help form must not require a polished hypothesis before permitting human help. Test a genuinely confused first-time user. |
| B5. Answers omit tacit reasoning | Ask one missing probe: “What did you notice?” or “What change would reverse your decision?” | Capture the distinction between plausible options, not an exhaustive transcript of a career. Based on Critical Decision Method; the short version is a hypothesis. |
| B6. Similar questions require different answers | Each case carries its context, version, objective and boundary. Retrieval shows why the case might apply and what differs. | Seed similar symptoms with different causes; reject a match when key facts conflict. A similarity score is not applicability proof. |
| B7. The pool becomes stale | Store owner, source/version, checked date and review status. Flag contradiction or source changes; suspend disputed advice pending review. | A normalised state such as draft/reviewed/disputed/retired avoids claiming every stored item is trusted. Review triggered by actual use limits maintenance, following [KCS demand-driven practice](https://library.serviceinnovation.org/KCS/Principles_and_Core_Concepts/101-Principles/Demand_Driven). |
| B8. The expert leaves | Assign team ownership with a current reviewer; prioritise frequently needed consequential decisions and arrange successor practice. | The handover is successful when another person can use the knowledge. File count is insufficient. [NASA's lessons system](https://llis.nasa.gov/) illustrates retaining event context and recommendations, not proof that this app prevents knowledge loss. |
| B9. Cold start requires an enormous library | Begin with three reviewed cases in one task family: normal, misleading resemblance and insufficient information. | “Three” is a scope choice. Avoid importing a whole wiki before verifying one learning loop. |
| B10. Expert advice may itself be wrong | Preserve uncertainty, alternative valid reasoning and outcome evidence. Permit reporting a failed recommendation and requesting another reviewer. | Authority is not correctness. A disputed case stops being treated as reviewed guidance; its historical assessment results retain their original source version. |

Recommended case content: the situation, decisive evidence, proposed action, reason, rejected alternative, condition that reverses the advice, known outcome, source/version, reviewer and review status. Most fields should be drafted from the chosen context, with human review of meaning. Do not burden the senior with a long form at every interaction.

### C. Trust, fairness, adoption and privacy

| Concern | Proposed response | Distinctive application and test |
| --- | --- | --- |
| C1. Recorded questions discourage asking | Separate a private scratch area, a chosen help request and an approved shared case. Show an audience preview before each share. | Share the useful decision, not the junior's full struggle history. Test whether users can correctly explain who sees what. |
| C2. Practice becomes surveillance | Default to developmental use. Learners select evidence for a portfolio; managers see operational programme costs and agreed team outcomes. | Small groups are not automatically anonymous. Avoid individual confusion rankings and public hint counts. Organisational commitments are necessary alongside access controls. |
| C3. Assessment favours fluent writers | Score evidence and decisions; accept brief text, evidence selection and accessible alternatives. | Compare semantically equivalent answers in terse and polished forms. Make any observed disparity a reason to revise, not penalise the learner. |
| C4. Timers and restrictions exclude people | Make pace adjustable; support keyboard access, zoom, readable text and clear focus. Offer help without a speed penalty. | [W3C timing guidance](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable) supports adjustable timing. Speed should not proxy for competence unless speed itself is the validated skill. |
| C5. Confidential work enters the pool | Use synthetic data in the demonstration. In a later deployment, apply source permissions before retrieval and require a publishable preview with human redaction review. | A frontend role selector is a simulation, not authorisation. Test fake identifiers and cross-role retrieval; do not claim automated redaction is complete. |
| C6. The company wants output, not learning time | Secure a small, paid time allocation and a named mentor budget. Report work quality, delay, transfer and effort separately. | [OECD workplace surveys](https://www.oecd.org/en/publications/the-impact-of-ai-on-the-workplace-main-findings-from-the-oecd-ai-surveys-of-employers-and-workers_ea0a0fe1-en.html) associate consultation/training with better experiences; they do not establish causality. A product cannot guarantee adoption without those conditions. |
| C7. Seniors feel their knowledge is extracted | Let contributors choose what to publish, retain attribution and record mentoring contribution in agreed workload planning. | Recognise useful, maintained contributions rather than raw article counts. Discuss ownership and permitted use before importing real work. |
| C8. Customers bear the cost of junior practice | Use resolved or synthetic training cases and preserve ordinary production review requirements. | Passing one practice item cannot grant production access. Validate the learning mechanism before involving consequential live work. |

Ethical evaluation should balance autonomy, fairness, care and the distribution of work. Maximising learning by forcing unlimited effort would fail that balance. So would minimising mentor effort by leaving confused learners without human support. The proposed product should make that trade-off observable and adjustable.

### D. Technical credibility and originality

| Concern | Proposed response | Verification |
| --- | --- | --- |
| D1. A prompt cannot reliably cap “intelligence” | Call the mechanism assistance/disclosure control. In the MVP, use reviewed hint layers selected by the app. | Full help remains explicit. If free-form generation is used, test leakage and misleading hints; do not claim a guaranteed capability cap. |
| D2. AI fabricates expertise or citations | Ground draft feedback in selected reviewed cases, link to the actual source and say when it does not cover the situation. | Seed an irrelevant source and a missing-source case. Source presence alone does not establish that the generated claim follows from it. NIST identifies confabulation and human–AI configuration as distinct risks in its [GenAI profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence). |
| D3. AI evaluates its own preferred answer | Use an expert-authored reference and acceptable alternatives; deterministic checks for constrained tasks; human review for ambiguous judgments. | Test correct short answers, fluent wrong answers, alternative solutions and instructions embedded in a submission. An AI feedback draft never independently certifies career readiness. |
| D4. The proposal duplicates existing products | Treat contextual tutoring and knowledge management as established components. Differentiate through local decision boundaries, changed-case performance and transparent burden. | Compare against a wiki plus ordinary AI plus an existing mentor. The combination is a candidate distinction, not a claim to be first. |
| D5. Too much scope weakens feasibility | Demonstrate one task family, one learner flow, one mentor correction and three reviewed cases. | Complete the uncertain and failure paths before adding integrations, model routing, rich analytics or organisational accounts. |
| D6. A good demo is mistaken for effectiveness | Demonstrate behaviour, then present observed pilot findings and unresolved causal questions separately. | A scripted correct response is a demonstration; it is not a participant result. |

## Existing products and what the workflow review establishes

| Product/practice | Inspected workflow and evidence | Implication |
| --- | --- | --- |
| [CodeSignal Learn](https://codesignal.com/learn/courses/programming-foundations-with-python) | Direct browser walkthrough in this conversation: path catalogue → beginner Python path → first course → lesson preview → Start learning → account creation. Public exercises describe modifying, fixing and writing code. Interactive practice was not tested behind authentication. | Progressive practice already exists. There is no basis to claim the proposed ladder is novel. |
| [Cosmo](https://codesignal.com/cosmo/) | Vendor documentation describes context-aware hints, personalised paths and mastery checks. | These are documented capabilities; vendor efficacy claims were not independently verified. |
| [Khanmigo product experiments, May 2026](https://blog.khanacademy.org/how-khan-academy-is-building-a-better-ai-tutor-our-most-recent-learnings/) | The provider reports measuring next-item correctness without tutor help, latency and engagement; structured learning history was useful in product tests. | Even an immediate independent next-item measure is established. Our distinction needs workplace context, senior effort and changed conditions; longer-term outcomes remain separate. |
| [Guru verification workflow](https://help.getguru.com/docs/verifying-and-unverifying-cards) | Official documentation shows responsible verifiers, review status and queues for content needing attention. No authenticated walkthrough performed. | Verification and ownership are established. They still require meaningful checking work. |
| [Stack Internal](https://stackoverflow.co/internal/features) | Official features describe trusted knowledge, expert validation, Q&A and delivery into existing tools. No authenticated walkthrough performed. | An experience pool and expert routing substantially overlap existing knowledge products. |
| [KCS value assessment](https://library.serviceinnovation.org/KCS/KCS_v6/KCS_v6_Practices_Guide/030/040/030/Technique_7.3:_Assessing_the_Creation_of_Value_(CSC)) | Guidance warns against treating activity targets as value. | Cards created, hints used and time on platform are poor headline success measures. |

## Originality through a small number of connected choices

Three proposed design choices deserve exploration together:

1. **Every useful answer carries a boundary.** Alongside what to do, the case records which fact would change that decision. This makes context inspectable and gives the practice generator something meaningful to vary.
2. **Learning is demonstrated on the variation.** The next case can look similar while requiring a different action. Learners must identify the changed condition. A short explanation without a changed decision is insufficient evidence.
3. **The mentor's capacity constrains the system.** Capture, review and maintenance are budgeted together. The interface asks for one missing expert distinction and permits declining publication. Practice volume cannot silently manufacture unlimited expert obligations.

These choices combine established pedagogy and knowledge-management methods. Their value must be demonstrated. A novelty search here did not establish that no other product combines them.

Reverse brainstorming makes the trade-offs concrete:

| To make the product fail, we would… | Proposed reversal |
| --- | --- |
| Reward long answers and high completion counts | Observe decisions and transfer; report assistance honestly |
| Hide what managers can see | Explicit audience boundaries and learner-selected sharing |
| Make novices use a worse model | High-quality explanations with adjustable disclosure |
| Make experts approve everything | Review disputed content and meaningful decisions within capacity |
| Store an answer without its conditions | Preserve evidence, context and the boundary where advice fails |
| Make practice an obstacle to urgent work | Legitimate full-help route and separately allocated practice time |
| Publish AI summaries automatically | Human review before shared authoritative status |
| Claim success from a badge | Show a changed case, an observed decision and actual time costs |

## Historical alternative: analyst app run-through

This is a design walkthrough, not an implemented or usability-tested application. Because no target workplace has been confirmed, the example uses a junior data analyst in a fictional software-support team. A team with better access to another profession should replace the scenario while retaining the learning mechanism.

**Target judgment:** determine what one row represents and choose evidence that reveals whether a join has incorrectly multiplied records. This is one narrow skill, not a claim to assess general analytical ability.

**Scenario A — practice.** A report should contain one row per support ticket. It shows 260 rows after joining 200 tickets to assignment history. The junior's tempting shortcut is to remove duplicates. The underlying issue is multiple history matches; the intended time rule must be understood before changing the join.

| Screen and action | What the learner or senior sees | Observable outcome |
| --- | --- | --- |
| 1. Learner opens a practice case | The report's intended unit, synthetic tables, task, and assistance choices: Try it / Show an example / Get full help | Person understands the goal and can obtain help immediately |
| 2. Learner chooses a next check | “What would you inspect first?” Options include counts by ticket ID before/after the join and checking assignment-history matches; short rationale optional for initial help | The app records a concrete decision, not just page viewing |
| 3. Learner requests a hint | Reviewed cue: inspect which ticket IDs acquire extra matches after joining; an example is available | Learner can distinguish source duplication from join multiplication |
| 4. Learner finds a missing assumption | The case needs the team's rule for whether the report uses current ownership or ownership at the reporting date | Asking for clarification counts as appropriate judgment |
| 5. Learner previews a human request | Goal, selected evidence, checks already performed and the unresolved rule; every field editable, “unknown” allowed | Only approved context is shared into the demo mentor view |
| 6. Senior answers | A compact request with expandable evidence. Senior clarifies the reporting rule and notes why blind deduplication is unsafe | The learner receives a substantive correction; sent and answered are distinct |
| 7. Senior reviews the reusable draft | Situation, decisive cue, reason and exception. One missing field is highlighted; Approve / Edit / Answer only | No generated wording becomes reviewed knowledge before a human acts |
| 8. Learner opens a fresh case | Scenario B now concerns one row per ticket event; repeated ticket IDs are expected and event IDs differ | Memorising “remove repeated ticket IDs” leads to the wrong answer |
| 9. Learner demonstrates transfer | Select the intended grain, identify relevant identifiers and explain why repeated ticket IDs can be valid | The record says exactly what was demonstrated and whether in-app help was used |
| 10. Learner sees progress | “Compared row counts with support”; “recognised valid repeated IDs on a different case”; source and date available | Specific evidence appears; no universal employee score or promotion claim |

**Scenario C — uncertainty.** The data contain two rows both labelled current assignment and no authoritative selection rule. The appropriate action is to flag ambiguity and ask the owner; arbitrarily choosing a row should not pass.

The case's correct interpretation and acceptable answers must be reviewed by someone competent in the domain. This example is synthetic and has not been tested with learners. A later fresh case should test retention; replaying Scenario B immediately only checks short-term performance and may teach the answer.

The senior's actual workflow is availability → concise request → deciding clarification → optional draft review → occasional disputed/reused-case maintenance. The junior's actual workflow is understand task → select evidence → obtain appropriate help → complete work → practise a changed decision. Both include an exit; neither should require navigating a large course catalogue to resolve the current need.

### Failure paths that belong in the demonstration

- No relevant case: display missing coverage and permit a human request; do not invent an expert precedent.
- Mentor unavailable: show the real queue state, retain existing guidance and point to the team's normal help route; no fabricated acknowledgement or response-time promise.
- Request cancelled: nothing is shared.
- Case disputed or outdated: mark it visibly and exclude it from authoritative guidance until reviewed.
- AI unavailable: preserve the reviewed case, hint sequence and learner progress; label any fallback as authored content.
- Learner selects full help: show it immediately and mark the attempt assisted.
- Evaluation uncertain: show “needs review”; do not invent a mastery percentage.

## Historical scope proposal: smallest credible implementation

This is a scope recommendation for approval, not an instruction to build now. Use exactly three capabilities:

1. **Guided practice:** one fictional scenario family, three reviewed cases, adjustable help and a meaningful next action.
2. **Human correction into shared knowledge:** preview a concise request, answer it, edit and approve one reusable decision explanation.
3. **Transfer evidence:** a changed case, explicit rubric, assistance status and dated results for the target skill.

Use one familiar web stack. A same-browser role switch is sufficient for a truthful demonstration. It cannot demonstrate real private multi-user access or cross-device collaboration. A later deployment needs actual authentication, source-level authorisation, retention decisions and secure backend handling before real workplace data enter the system.

One model can draft a concise explanation or help-request summary from chosen context. The app can select authored hints and apply deterministic checks to constrained answers. Training multiple models, fine-tuning, automatic expertise scoring and a large vector database are unnecessary to demonstrate the central hypothesis. API credentials, if used, stay server-side.

Candidate records to agree before coding: Case, Skill, Attempt, HelpRequest and Review. A Case needs a source/version and review status; an Attempt needs its case version, observed action and assistance used; a HelpRequest needs an explicit audience and real status. These are discussion points, not an agreed data contract.

Keep these out of the initial build: arbitrary company document ingestion, automatic permissions to perform live work, promotion recommendations, model intelligence tiers, all-profession support, passive employee monitoring, multiple integrations and gamified rankings. A future scope decision should be recorded in PLAN.md by the human lead, with actual owners and permitted files, before implementation begins.

## Evaluation that tests the claim

### First: establish a real workflow

Recruit a small convenience sample of juniors and seniors with direct experience of the chosen task. Ask each to reconstruct one recent incident using permitted or sanitised material. Do not send invitations or contact anyone without the user's instruction.

Junior prompts: What was the assignment? What did you try? What evidence was missing? When did you ask? What made asking difficult? What did you understand afterwards? What happened on the next related task?

Senior prompts: What did you notice that the junior missed? What would change your advice? Which questions repeat? What work would you refuse to maintain? What review time would fit your actual week?

Manager prompts: What learning time is genuinely protected? What would make this worth continuing? What information should stay outside performance management?

Use concrete incidents and observed tasks to check idealised accounts. This follows established [critical-incident interview guidance](https://www.nngroup.com/articles/critical-incident-technique/). A few interviews identify design problems; they do not establish prevalence or causal impact.

### Second: test usability and burden

Observe a small number of representative users completing the full flow. Record where they need facilitator help, whether they understand visibility, whether the case seems authentic, how easily they obtain support and how long the senior spends reading and correcting. Include all maintenance or clarification time exposed by the test.

Provisional targets for discussion: a useful practice episode within ten minutes; ordinary senior correction within two minutes; a weekly mentor budget agreed with the team. These are targets, not established research thresholds or results. A twenty-minute queue budget does not guarantee all requests can be answered.

Stop or simplify if learners cannot explain the value, if seniors must rewrite most generated content, if required reviews exceed capacity, or if the workflow encourages hiding uncertainty.

### Third: test learning against a baseline

Compare ordinary AI plus the existing knowledge/mentor workflow against the proposed loop. Provide the same relevant material and comparable time opportunities. Use matched but different case sets; counterbalance order for a within-person pilot and acknowledge carryover, or randomise groups when the sample permits. Do not reuse a case already shown as the test of transfer.

Assess with an agreed rubric, ideally by a reviewer who does not know the assistance condition. Later follow-up needs a fresh case. A small hackathon sample can expose feasibility and obvious failure; it is not adequately powered proof of sustained learning efficacy.

| Outcome | Measure | Misleading substitute to avoid |
| --- | --- | --- |
| Assisted work performance | Correctness, task completion and time while tools are available | Treating a completed task as proof of learning |
| Immediate transfer | Evidence selected, decision and rationale on an unseen variation | The same question with changed names |
| Retention | Performance on a fresh case after an agreed delay | Immediate repetition of the taught answer |
| Mentor burden | Total answering, authoring, reviewing, clarifying and maintenance minutes | Only the time to click Approve |
| Learner burden | Practice time, disruption, abandonment and perceived control | Time spent on platform as an automatic positive |
| Trust | Understanding of audiences, willingness to ask, reported mistakes and disputed feedback | An unqualified claim that the app creates psychological safety |
| Quality | Misleading hints, invalid case matches and mistaken positive assessments | A model's self-reported confidence |

Rubric for the synthetic example: identify intended row grain; select evidence that can distinguish alternatives; choose a justified action or request necessary clarification; state what changed in the variation. Mark each as demonstrated / partial / not yet demonstrated, with evidence. Do not aggregate into an employee ranking.

Report counts and examples honestly. “Three of five participants recognised the changed condition” would be a descriptive pilot result if observed; it would not mean a proven 60% success rate in the target workforce. Report assisted attempts, withdrawals and ambiguous results too.

## Uptake and economics

Initial user: a junior doing recurring diagnostic work. Immediate beneficiary: the senior repeatedly explaining similar distinctions. Potential buyer: a team or onboarding owner with a real learning-time budget. These roles are hypotheses until interviews confirm them.

Calculate mentor effort as baseline time spent on comparable help minus new time spent answering, capturing, reviewing, correcting and maintaining knowledge. Report learner practice time and delivery delay separately; these are real costs even when mentor time falls. Avoid a single efficiency ratio that looks excellent simply because only easy learners or cases were counted.

A viable pilot requires sufficiently recurring decisions, expert access, representative cases and permission to practise. If cases seldom recur, if no expert can check them, or if the team will not allocate learning time, an ordinary mentoring conversation or existing documentation may be the better choice. Adoption depends on those conditions, not merely a more attractive interface.

## How to make the judging case

The supplied rubric allocates 40% to potential effectiveness, 30% to technical feasibility, 10% to business/social uptake, 15% to originality and 5% to presentation.

| Criterion | Concrete evidence to present |
| --- | --- |
| Effectiveness, 40% | One authentic skill, explicit mechanism, a changed-case demonstration and honest pilot observations |
| Feasibility, 30% | A working end-to-end loop with uncertain states, deterministic fallback and truthful limits |
| Uptake, 10% | Observed junior/senior workflow, complete human time accounting and an identified buyer/time budget |
| Originality, 15% | Show the link from the expert's boundary condition to the learner's different decision; acknowledge existing tutors and knowledge tools |
| Presentation, 5% | Tell one person's story, demonstrate the change in judgment, show the mentor's contribution and state what remains unproven |

Suggested short demo: show the misleading quick fix; reveal the expert's decisive distinction; approve its reusable explanation; give a similar-looking case where that shortcut fails; show the learner choosing differently. Close with actual observed costs and limits. If the learner is role-played, label it a demonstration rather than a measured outcome.

Historical pitch suggestion (use the [final pitch brief](../pitch.md) for current wording): **We help teams preserve how experts decide, then let juniors practise those decisions on changed cases and show what they can do—with the mentor's time cost visible.**

Claims to avoid: prevents workforce deskilling; solves retirement; proves promotion readiness; guarantees privacy or fair assessment; saves a stated percentage without measurement; first platform to offer AI hints, knowledge pools or transfer testing.

The highest-priority decisions for the team are the accessible target workplace, the single judgment to practise, the person who can validate cases, the actual time budget and the three-capability scope. The research supplies defensible options; the next evidence must come from those people's work.
