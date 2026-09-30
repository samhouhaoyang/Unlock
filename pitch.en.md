# Unlock — earn independent engineering judgment

**Hackathon pitch | Planned VS Code MVP | Future Work: “If AI does the beginner work, where does expertise come from?”**

AI can produce a junior engineer's first patch. The junior still needs to learn which contract matters, which test would expose a dangerous change, and when a patch deserves acceptance. Unlock makes that judgment visible inside VS Code and changes help only when the junior demonstrates it independently.

**Main selling point:** route by learning value and delivery risk, ask for a prediction before revealing a preset AI patch, and fade L0–L4 help per sub-skill only after G1 independent check, G2 changed-condition transfer, and G3 unseen delayed retention. A failure on transfer or retention restores one level of help.

## What judges will see

1. Four authored route cards: a useful low-risk task goes to the junior; a routine low-risk task goes to AI; a useful high-risk task stays with a senior while the junior receives a separate synthetic practice copy; high-risk work outside the learning edge stays with the senior. A passed learning gate never changes delivery ownership.
2. A junior opens the fictional webhook-retry case in VS Code. Before seeing the clearly labelled preset patch, they identify the stable event-ID invariant and choose a test that would catch a changed ID on retry. They may request L1–L4 help, which marks the attempt assisted.
3. A deterministic fixture test and the revealed unsafe patch let the junior reject it with evidence. A correct-patch control checks that the learner can also accept justified AI work.
4. A fresh re-trigger-after-downtime case tests transfer. A distinct unseen case at least 72 hours after a linked teaching attempt tests retention. G3 remains visibly pending until that real check occurs; a presentation cannot manufacture a pass.
5. Progress shows separate contract, test, and patch-judgment states, actual help exposure, each gate, and any one-step level change. A reviewed teaching card appears only after submission. Private attempts never automatically become shared advice.

The first pathway uses fictional webhook events grounded in public [Airwallex webhook documentation](https://www.airwallex.com/docs/developer-tools/webhooks/webhooks-overview). Airwallex is a benchmark, not a required integration. Unlock is designed for engineering teams across companies and does not depend on an AirCheck-like reviewer.

## MVP implementation and honest claim

One desktop VS Code extension uses TypeScript, Node 24, a command and webview, versioned reviewed JSON, deterministic grading, `workspaceState`, a small JS/TS fixture, `esbuild`, `tsc`, and Node tests. There is no backend, model call, source scan, or production write. The extension and user outcomes are not implemented or measured yet. A pilot would compare unsafe-patch acceptance on unseen cases, correct-patch acceptance, test quality, delayed performance, and junior/mentor time.

[Full English product specification](product.en.md) · [中文简报](pitch.md).
