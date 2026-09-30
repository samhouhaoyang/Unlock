# Unlock agent instructions

## Project authority

This repository is Unlock, the junior SWE VS Code apprenticeship product selected in `PLAN.md`. Read `README.md`, `PLAN.md`, `CONTEXT.md`, `product.md`, and `docs/implementation-decisions.md` before changing behavior. Read relevant records in `docs/adr/` when working on their boundaries.

`product.md` owns scope, flows, cases, and acceptance criteria; `docs/implementation-decisions.md` records accepted clarifications. Keep `product.en.md` aligned with product changes. `pitch.md` owns narrative wording and `pitch.en.md` is its English counterpart. `CONTEXT.md` is a glossary only. The junior SWE evidence memo supports the design; the earlier finance research and ancestor FirstVisit material are historical.

The app is not implemented yet. Use real commands from the README when they exist; document intended behavior and completed work distinctly. Preserve the fixed P0 scope, synthetic-material labels, four delivery routes, and the boundary between private attempts and approved teaching copies. Do not treat the old finance PRs or checks as SWE implementation.

## Parallel implementation

Read `docs/parallel-delivery.md` and `docs/contracts.md` before taking a story. Find its owner, reviewer, branch, allowed paths, and blockers in `docs/backlog.json` and the linked GitHub issue. The old finance issues and PRs are superseded; the SWE graph starts at #19 after docs issue #17 merges and closes. Start only when prerequisites are merged and closed. One owner implements each story; the other developer reviews it. Do not expand across another active story's files.

After the first runnable slice, `@samhouhaoyang` is the integrator for `src/contracts/`, `src/runtime/`, `src/app/`, package/lockfile, and CI. Both developers agreed to replace the finance shared contract and backlog; agree later shared-contract changes with both developers before modifying them. Keep feature implementations in assigned directories and use the shared persistence interface. Run `node scripts/check-project.mjs` and the issue's meaningful validation. PRs target `main`, link their issue with `Closes #<number>`, and need green checks and peer review; agents do not merge PRs.

## Agent skills

### Issue tracker

Issues and specs live in this repository's GitHub Issues. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the five default triage labels. See `docs/agents/triage-labels.md`.

### Domain docs

Use a single root `CONTEXT.md` and root `docs/adr/`. See `docs/agents/domain.md`.
