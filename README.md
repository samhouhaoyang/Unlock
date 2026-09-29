# Unlock

Unlock is an AI apprenticeship demo: a junior makes a workplace judgment, receives appropriate support, reviews an AI draft, and demonstrates independent judgment in a changed case. A mentor's reviewed explanation becomes feedback for subsequent learning.

This repository is the canonical home of the project. The React, TypeScript, and Vite foundation provides four page slots, simulated role switching, scenario selection, and local persistence in one browser. Learning, mentoring, evidence evaluation, reviewed scenario content, and metrics remain unimplemented placeholders.

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

Use Node.js 24 (see `.nvmrc`) and npm. Install the locked dependencies and start the local app:

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. The four navigation buttons open the page slots. Junior/Mentor changes the simulated role and persists it. Choose a scenario and press **Reset and load scenario** to create a fresh run. Choosing an option alone does not discard the current run. Refresh preserves the saved role, scenario, run identity, and feature records. Navigation starts at Opportunities after refresh.

All three scenarios are selectable, but reviewed seed content is pending issue #4 and its later integration. The shell labels this explicitly and loads no historical checks, support levels, or passed evidence. Reset clears attempts, exposures, requests, cards, and progress from the previous run. This is a same-browser simulation using fictional data, not multi-user access control.

Validate or preview a production build:

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

The complete repository gate installs dependencies and runs all required checks:

```bash
node scripts/check-project.mjs
```

This verifies local documentation links, the assigned story/dependency graph, repository tooling tests, and the app's typecheck, lint, tests, and build. If content exists, its standalone validator must also pass. App tests exercise the public runtime and visible shell: recovery after refresh, reset isolation, storage failures, unsupported data, role switching, and all four page slots.

## Foundation interfaces

- [Shared record schemas and types](src/contracts/index.ts) implement contract v1. [Feature interfaces](src/contracts/features.ts) define typed state, commands, callbacks, and slots. Feature placeholders report unavailable operations; they do not fabricate successful learning events.
- [Runtime](src/runtime/index.ts) owns browser storage. Create it with a persistence adapter, use `read()` and `subscribe()` for committed state, and use `transact()` to update a cloned complete snapshot. A transaction validates and saves the next snapshot before publishing it. Failed writes preserve the previous committed snapshot; callers receive an error result and the shell shows an alert.
- `reset(scenario)` replaces the snapshot in one write and creates a new run identity. Unsupported or damaged saved data is left intact until an explicit reset succeeds. If browser storage is blocked, enable storage and reload or retry the action; no unsaved run is reported as committed.
- The future integration coordinator must update submitted attempts and progress in the same transaction. Content and feature rules belong to their existing assigned issues. Additions to these concrete type interfaces require the coordination described in the [delivery guide](docs/parallel-delivery.md).

GitHub Actions runs `verify` on pushes and PRs, and `issue-dependencies` on PRs. Follow the [parallel delivery guide](docs/parallel-delivery.md) and link each PR to its assigned issue. No deployed demo or measured learning outcome is claimed by this foundation.

GitHub currently blocks branch-protection enforcement for this private repository's plan. The checks run, but both developers must manually honor green checks and peer approval before merging. The delivery guide records the limitation and the prepared rule for a future plan upgrade.
