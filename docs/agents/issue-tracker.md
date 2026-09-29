# Issue tracker: GitHub

Issues and specs for this repo live as GitHub issues. Use the `gh` CLI from this repository so it selects `samhouhaoyang/Unlock`.

## Conventions

- Create: `gh issue create --title "..." --body-file <file>`
- Read: `gh issue view <number> --comments`
- List: `gh issue list --state open --json number,title,body,labels,comments`
- Comment: `gh issue comment <number> --body-file <file>`
- Label: `gh issue edit <number> --add-label "..."` or `--remove-label "..."`
- Close: `gh issue close <number> --comment "..."`

Use the label names in `docs/agents/triage-labels.md`.

## Pull requests as a triage surface

**PRs as a request surface: no.** Set this to `yes` if external PRs should enter the triage queue. GitHub shares issue and PR numbers; check the item type when a reference is ambiguous.

## Skill operations

- “Publish to the issue tracker” means create a GitHub issue.
- “Fetch the relevant ticket” means read it with `gh issue view <number> --comments`.

## Wayfinding

A wayfinding map is one issue labelled `wayfinder:map`; child tickets are sub-issues where supported, or links in the map’s task list. Child tickets use `wayfinder:<type>` labels. Record blockers with GitHub issue dependencies where available, otherwise with `Blocked by: #<number>` in the ticket body. Claim a ticket by assigning it to the current developer; resolve it by commenting with the answer, closing it, and linking the result from the map.
