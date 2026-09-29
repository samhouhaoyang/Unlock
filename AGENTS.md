# Unlock agent instructions

## Project authority

This repository is Unlock, the product selected in `PLAN.md`. Read `README.md`, `PLAN.md`, `CONTEXT.md`, `product.md`, and `docs/implementation-decisions.md` before changing behavior. Read relevant records in `docs/adr/` when working on their boundaries.

`product.md` owns scope, flows, cases, and acceptance criteria; `docs/implementation-decisions.md` records the accepted clarifications. Keep `product.en.md` aligned with product changes. `pitch.md` owns narrative wording and `pitch.en.md` is its English counterpart. `CONTEXT.md` is a glossary only. The research report is historical background, and the ancestor FirstVisit material describes a superseded candidate.

The app is not implemented yet. Use real commands from the README when they exist; document intended behavior and completed work distinctly. Preserve the fixed P0 scope, the simulation labels, and the boundary between private attempts and approved shared experience.

## Parallel implementation

Read `docs/parallel-delivery.md` and `docs/contracts.md` before taking a story. Find its owner, reviewer, branch, allowed paths, and blockers in `docs/backlog.json` and the linked GitHub issue. Start only when prerequisites are merged and closed. One owner implements each story; the other developer reviews it. Do not expand across another active story's files.

After foundation, `@samhouhaoyang` is the integrator for `src/contracts/`, `src/runtime/`, `src/app/`, package/lockfile, and CI. Agree shared-contract changes with both developers before modifying them. Keep feature implementations in their assigned directories and use the shared persistence interface. Run `node scripts/check-project.mjs` and the issue's meaningful validation. PRs target `main`, link their issue with `Closes #<number>`, and need green checks and peer review; agents do not merge PRs.

## Agent skills

### Issue tracker

Issues and specs live in this repository’s GitHub Issues. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the five default triage labels. See `docs/agents/triage-labels.md`.

### Domain docs

Use a single root `CONTEXT.md` and root `docs/adr/`. See `docs/agents/domain.md`.
