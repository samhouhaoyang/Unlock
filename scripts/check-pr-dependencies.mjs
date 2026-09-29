import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export function closingIssues(body, repository) {
  const text = (body || '').replace(/<!--[\s\S]*?-->/g, '').replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '');
  const pattern = /\b(?:close[sd]?|fix(?:es|ed)?|resolve[sd]?)\s+(?:https:\/\/github\.com\/([\w.-]+\/[\w.-]+)\/issues\/(\d+)|(?:([\w.-]+\/[\w.-]+))?#(\d+))/gi;
  const numbers = new Set();
  for (const match of text.matchAll(pattern)) {
    const targetRepo = match[1] || match[3] || repository;
    if (targetRepo.toLowerCase() !== repository.toLowerCase()) throw new Error('Closing issue must belong to ' + repository + '.');
    numbers.add(Number(match[2] || match[4]));
  }
  if (!numbers.size) throw new Error('Link the work with Closes #<issue> in the PR body.');
  return [...numbers];
}

export async function checkDependencies({ body, repository, getIssue, getBlockers, plannedStories = [] }) {
  const numbers = closingIssues(body, repository);
  const plannedByNumber = new Map(plannedStories.filter(s => s.number).map(s => [s.number, s]));
  const plannedById = new Map(plannedStories.map(s => [s.id, s]));
  for (const number of numbers) {
    const issue = await getIssue(number);
    if (issue.pull_request) throw new Error('#' + number + ' is a pull request, not a work issue.');
    const blockers = new Map((await getBlockers(number)).map(blocker => [blocker.number, blocker]));
    // The committed graph is a second check if native links were accidentally removed.
    for (const id of plannedByNumber.get(number)?.dependsOn || []) {
      const planned = plannedById.get(id);
      if (!planned?.number) throw new Error('Missing published dependency: ' + id);
      if (!blockers.has(planned.number)) blockers.set(planned.number, await getIssue(planned.number));
    }
    const open = [...blockers.values()].filter(blocker => blocker.state !== 'closed');
    if (open.length) throw new Error('#' + number + ' is blocked by ' + open.map(b => '#' + b.number).join(', ') + '. Merge and close prerequisites first.');
    if (!issue.assignees?.length) throw new Error('#' + number + ' needs an assigned owner.');
  }
  return numbers;
}

async function main() {
  const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  if (!event.pull_request) throw new Error('A pull_request event is required.');
  const repository = process.env.GITHUB_REPOSITORY;
  if (!repository || !process.env.GH_TOKEN) throw new Error('GitHub repository/token context is required.');
  const api = process.env.GITHUB_API_URL || 'https://api.github.com';
  async function get(path) {
    const response = await fetch(api + path, {
      headers: { Accept: 'application/vnd.github+json', Authorization: 'Bearer ' + process.env.GH_TOKEN, 'X-GitHub-Api-Version': '2026-03-10' }
    });
    if (!response.ok) throw new Error('GitHub API ' + response.status + ' for ' + path);
    return response.json();
  }
  const prefix = '/repos/' + repository + '/issues/';
  const numbers = await checkDependencies({
    body: event.pull_request.body,
    repository,
    getIssue: number => get(prefix + number),
    getBlockers: async number => {
      const all = [];
      for (let page = 1; ; page++) {
        const items = await get(prefix + number + '/dependencies/blocked_by?per_page=100&page=' + page);
        all.push(...items);
        if (items.length < 100) return all;
      }
    },
    plannedStories: JSON.parse(readFileSync('docs/backlog.json', 'utf8')).stories
  });
  console.log('Prerequisites are closed for ' + numbers.map(n => '#' + n).join(', ') + '.');
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
