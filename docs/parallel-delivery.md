# Parallel delivery — junior SWE P0

The accepted product is the desktop VS Code workflow in [product.md](../product.md). The old finance issue graph, React branches, and fixtures are superseded. [Backlog](backlog.json) records the approved SWE ticket graph, issue numbers, ownership, and paths. GitHub Issues is the live tracker.

Both developers agreed to replace the finance contract and backlog and to add bounded editor selection plus local mentor lesson bundles to P0. `@samhouhaoyang` integrates shared contracts, runtime, app composition, package/lockfile, and CI after the first runnable slice; `@RankiiJ` implements assigned content and feature slices. Each reviews the other's PR. The same person does not approve their own work.

## Delivery sequence

After documentation issue [#17](https://github.com/samhouhaoyang/Unlock/issues/17) merges and closes, start [#19](https://github.com/samhouhaoyang/Unlock/issues/19): a runnable vertical path through the VS Code commands, explicit bounded selection preview, synthetic P-01 practice, prediction, hint exposure, preset patch review, assessment, and persistence. After #19 merges, [#20](https://github.com/samhouhaoyang/Unlock/issues/20) adds the routing rubric/control, [#21](https://github.com/samhouhaoyang/Unlock/issues/21) adds evidence gates, and [#22](https://github.com/samhouhaoyang/Unlock/issues/22) adds reviewed mentor snippet display/feedback/privacy within separate owned files. Final integration [#23](https://github.com/samhouhaoyang/Unlock/issues/23) wires local lesson import and verifies the whole editor-to-support path after all three. The exact branch names and allowed paths are in the backlog.

The local presentation mockup is outside the GitHub implementation and cannot close a SWE ticket. The older finance foundation/content PRs remain separate until their owners decide their disposition; their green checks do not demonstrate the extension.

## Branch and review rules

1. Take only an assigned ticket whose blockers are merged into `main` and closed. The `ready-for-agent` label means specified, not unblocked.
2. Branch from current `origin/main`, use the ticket's branch and allowed paths, and do not edit another active story's files. A shared-contract change requires both developers' agreement.
3. Run `node scripts/check-project.mjs` and the issue's meaningful Extension Development Host or state-rule checks. Record commands and actual outcomes.
4. Open a PR targeting `main`, with `Closes #<number>`, green checks, and the other developer's review. Agents do not merge PRs.
5. Refresh from `main` after a merge. Update both GitHub issue relationships and the backlog when an approved dependency changes.

## CI and current enforcement

`verify` checks local links, backlog ownership/dependencies, tooling tests, and, when an app manifest exists, typecheck, lint, tests, and build. Content validation applies only when the SWE case pack and validator exist. `issue-dependencies` checks the linked issue and open blockers. These checks do not prove the extension has been run.

GitHub branch-protection enforcement is unavailable on the current private-repository plan; the prepared rule is in [branch-protection.json](../.github/branch-protection.json). Both developers must manually honor green checks, peer approval, and no direct or force pushes. Do not claim protection is active. The repository's historical setup issue and finance tickets remain visible but are not prerequisites for the new SWE graph unless a new ticket explicitly says so.
