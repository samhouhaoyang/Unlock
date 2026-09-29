# Unlock

Unlock is an AI apprenticeship demo: a junior makes a workplace judgment, receives appropriate support, reviews an AI draft, and demonstrates independent judgment in a changed case. A mentor's reviewed explanation becomes feedback for subsequent learning.

This repository is the canonical home of the project. The current deliverable is the finalised product specification and its supporting documentation; the application has not been implemented. The planned stack is React, TypeScript, and Vite, with local persistence in one browser.

## Read the project

| Document | Purpose and authority |
| --- | --- |
| [Product specification — 中文](product.md) | Authoritative v1.3 scope, user flows, cases, evidence rules, demo script, and acceptance criteria |
| [Product specification — English](product.en.md) | English counterpart of the product specification |
| [Accepted implementation decisions](docs/implementation-decisions.md) | Clarifications accepted after v1.3: stages, exposed cases, structured grading, and review resolution |
| [Pitch — 中文](pitch.md) / [English](pitch.en.md) | Authoritative narrative and presentation wording |
| [Domain glossary](CONTEXT.md) | Shared terminology; no implementation specification |
| [Project plan](PLAN.md) | Selected concept, delivery scope, and handoff status |
| [Parallel delivery](docs/parallel-delivery.md) | Two-developer ownership, issue dependencies, branch/merge rules, and CI |
| [Shared contract v1](docs/contracts.md) | Stable content, persistence, and feature interfaces for parallel implementation |
| [Decision records](docs/adr/README.md) | Rationale for consequential domain and data boundaries |
| [Research background](docs/future-work-research-and-recommendations.md) | Earlier research and historical design alternatives; does not override the selected product |
| [Agent instructions](AGENTS.md) | How engineering work uses these documents and GitHub Issues |

Read the product specification and accepted decisions together. Product and implementation decisions govern behavior; the pitch governs narrative; the glossary governs terminology. Keep the two product language versions aligned when changing requirements. Earlier research proposals are historical context.

## Intended demonstration

The P0 build covers one finance judgment skill, six fictional interactive cases, and four pages. Its main path is WK-01 practice → mentor reply and published experience card → unassisted TR-01 → one L2-to-L1 transition using clearly labelled simulated history plus the live check. RT-01 is a separate support-restoration demonstration. UN-01 previews the need for more information.

See product sections 11, 13, and 14 for the three-minute script, three-day delivery plan, and acceptance criteria. The accepted decisions add concrete edge cases without adding another feature track.

## Development status

There is no application scaffold, package manifest, or deployed demo yet. Repository tooling is available with Node.js 24 (see `.nvmrc`):

```bash
node scripts/check-project.mjs
```

This verifies local documentation links, the assigned story/dependency graph, and the repository tooling tests. It requires no npm installation while the repository contains documentation/tooling only. If `content/` exists, its validator must pass. When the foundation story adds `package.json`, this same command requires a committed lockfile and runs `npm ci`, `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build`; missing gates fail.

GitHub Actions runs `verify` on pushes and PRs, and `issue-dependencies` on PRs. Follow the [parallel delivery guide](docs/parallel-delivery.md) and link each PR to its assigned issue. Add actual app startup, preview, and deployment instructions here as implementation proceeds. The specification still describes intended application behavior, not completed implementation or measured learning outcomes.

GitHub currently blocks branch-protection enforcement for this private repository's plan. The checks run, but both developers must manually honor green checks and peer approval before merging. The delivery guide records the limitation and the prepared rule for a future plan upgrade.
