# Unlock — junior SWE apprenticeship

Unlock is a planned VS Code extension that protects learning opportunities for junior software engineers when AI drafts code. It routes work by learning value and delivery risk, asks the junior to judge before seeing a preset patch, and changes L0–L4 help only after independent evidence. Airwallex is a design benchmark; the product is for teams at any company.

**Status:** product specification and repository planning only. No SWE extension, VSIX, user study, or deployed app exists in this branch. Old finance PRs and issues describe a superseded design and do not validate this product.

## Project documents

- [Product specification — 中文](product.md) and [English](product.en.md): scope, user journey, case pack, and acceptance.
- [Implementation decisions](docs/implementation-decisions.md): accepted boundary clarifications.
- [Pitch — 中文](pitch.md) and [English](pitch.en.md): presentation narrative.
- [Plan](PLAN.md), [glossary](CONTEXT.md), [shared contract](docs/contracts.md), [parallel delivery](docs/parallel-delivery.md), and [decision records](docs/adr/README.md): implementation guidance.
- [Junior SWE evidence memo](docs/research-junior-swe-evidence.md): research and assumptions. Earlier finance research is historical only.
- [VS Code contextual-help research](docs/research-vscode-contextual-help.md): official API capabilities, mentor lesson handoff, and model boundaries.
- [Backlog](docs/backlog.json): approved SWE issue graph, owners, blockers, and allowed paths.

## Intended P0

Two explicit TypeScript/Node 24 desktop VS Code commands open a compact webview and preview a bounded active-editor selection. Four authored task cards cover the learning-value × delivery-risk quadrants with an explicit senior-triage state for missing facts. One fictional webhook-retry case pack supports contract interpretation, discriminating test design, and patch judgment. It includes an unsafe preset patch, a correct control, fresh transfer, and delayed retention case. A versioned local mentor lesson bundle supplies reviewed snippets and L1–L4 hints for selection-linked help; a junior can import a bundle through an existing team-controlled file handoff. The extension uses reviewed JSON, deterministic grading, and VS Code workspaceState without retaining raw selected code. Real-code help is unscored; the high-risk synthetic practice copy cannot affect real delivery. No model, backend, broad repository scan, live mentor service, or production write is required.

The learner sees L0–L4 hints in practice. G1 independent check, G2 changed-condition transfer, and G3 unseen check at least 72 hours after a linked teaching attempt govern a one-step help change per sub-skill. If the delayed check has not happened, G3 remains pending. Private attempts are not shared; a learner-previewed help request and independently approved teaching copy are separate states.

## Verification

With Node.js 24 (see `.nvmrc`), run:

```bash
node scripts/check-project.mjs
```

This currently checks documentation links, the backlog shape, and tooling tests. Once an extension package exists, the same command also requires the committed lockfile and typecheck, lint, test, and build scripts. A green tooling check does **not** mean the SWE extension works. Add the actual Extension Development Host launch, fixture test, and packaging commands only after they run successfully. PRs require a peer review and green checks; agents do not merge them.
