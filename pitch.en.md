# Unlock — independent judgment, earned step by step

**Hackathon pitch brief | Three-day demo | Future Work: “If AI does the beginner work, where does expertise come from?”**

AI can finish a junior's first tasks. Those tasks were also where the junior learned to notice what matters, make a low-stakes call, and have an expert correct it. **Unlock means unlocking independent judgment:** it routes a useful judgment to the junior, lets them commit before seeing AI's answer, offers support that fades with evidence, and turns a mentor's correction into feedback a learner can use next time.

**The outcome we would test in a pilot:** on unseen cases, does Unlock reduce the share of *incorrect AI drafts accepted by juniors*? We would also track acceptance of correct drafts, independent judgment accuracy, delayed performance, and total mentor time. A three-day demo shows the workflow, not a measured learning effect.

## Why it should work

The learner makes a judgment before reveal, receives limited help while practicing, and then faces a changed case without hints. Unlock makes this sequence routine and records whether the person can act independently. Research on adaptive fading and guided AI practice supports testing this approach; the exact Unlock rules still need workplace validation. [Adaptive fading study](https://onlinelibrary.wiley.com/doi/full/10.1111/j.1756-8765.2008.01011.x) · [AI learning study](https://scale.stanford.edu/ai/repository/generative-ai-can-harm-learning)

## The product loop judges will see

| Moment | What happens | Why it matters |
| --- | --- | --- |
| **Route** | A visible learning-value × delivery-risk grid sends a low-risk, useful judgment to the junior; high-risk delivery stays with the senior. | Automation no longer erases every practice opportunity. |
| **Judge first** | Lin, a junior finance employee, decides how much of a service cost belongs to December and rates her confidence before seeing AI's draft. | Her own judgment becomes observable. |
| **Review AI** | The labeled synthetic training draft says **1,200**. October and November were already accrued; December's share is **400**. A control case also has a correct AI draft. | Lin learns to correct a wrong answer and accept a right one. |
| **Pass expertise forward** | Supervisor Chen gives one reason for the correction, reviews an experience card, and publishes it for post-submission feedback on TR-01. | A specific explanation is reused without asking Chen to author a course. |
| **Check transfer** | A new case asks about **900 paid in December for service next January–March**. Lin answers **0 for December** without a hint. | The test changes the decisive condition. |
| **Fade help** | Five evidence cards update; labeled simulated history plus the live transfer check moves this skill from **L2 to L1**. The next practice task no longer offers the L2 principle hint; the L1 direction hint remains. Chen's card appears in feedback **after** Lin submits TR-01. | The change affects Lin's next attempt without hiding the reviewed explanation afterward. |

The next case asks for a different kind of expertise: when a milestone contract lacks acceptance or performance evidence, Lin must choose **“need more information”** even if AI confidently supplies an amount. That is the direction for extending the product beyond arithmetic allocation.

## One skill, five support levels

The ladder grows upward from **L4** at the bottom to **L0** at the top as support decreases.

| Level | Help available in practice |
| --- | --- |
| L4 | Reviewed full demonstration and reason |
| L3 | Partial demonstration with the key judgment left to Lin |
| L2 | Relevant principle, without the result |
| L1 | Direction toward the clue to inspect |
| L0 | Independent attempt; feedback after submission |

At L2, Lin may open L1 or L2 directly. Requiring every intermediate click would slow the task without proving learning. A hint makes the current attempt assisted; independent checks reveal no hint or answer before submission. Support moves one step only after evidence of independent success, delayed retention, changed-context transfer, explanation, and a confidence check. A failed retention or transfer check restores one step of support. These are transparent demo rules, not a claim that one short test proves expertise.

## The three-day build

Build one finance judgment skill, six interactive fictional cases, four screens, and one live L2→L1 transition: a task router, junior judgment workbench, growth view, and mentor workbench. Use reviewed case content and a small rule engine so the full path works without a model call. The growth checkpoint includes **eight clearly labeled simulated historical checks**, seeded with room below the confidence threshold; Lin selects **75% confidence** on the live transfer check. The mentor view shows **incorrect AI drafts accepted**, with session and simulated counts separated. Chen's new card is actually published and cited in TR-01's post-submission feedback.

**Three-minute story:** route the task → Lin predicts and corrects AI → Chen publishes one reason → Lin solves the new case unaided and sees Chen's card in feedback → support changes visibly → preview the missing-information case. Keep the materials pre-positioned and rehearse role switching; if time runs short, show the final preview in ten seconds.

This scope addresses the judging criteria directly: **effectiveness 40%** through independent AI review and transfer; **feasibility 30%** through fixed cases and explicit rules; **uptake 10%** through limited mentor work; **originality 15%** through routing, fading, and experience reuse in one workflow; and **presentation 5%** through one observable learner journey.

Full workflow, case data, evidence rules, and implementation plan: [English build spec](product.en.md). Chinese companion: [Chinese pitch brief](pitch.md).

**Three-sentence summary.** Unlock preserves useful beginner judgments as AI automates routine work, giving juniors a chance to decide before seeing AI's answer. Its support fades only when independent checks show the learner can handle the skill in a changed context, and returns when they struggle. A mentor's reviewed correction becomes feedback that helps unlock the next independent judgment.
