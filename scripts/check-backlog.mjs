import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

function overlaps(a, b) {
  return a === b || (a.endsWith('/') && b.startsWith(a)) || (b.endsWith('/') && a.startsWith(b));
}

export function validateBacklog(backlog) {
  const stories = backlog.stories;
  if (!Array.isArray(stories) || !stories.length) throw new Error('The story list must not be empty.');
  const byId = new Map();
  const branches = new Set();
  const numbers = new Set();
  for (const story of stories) {
    if (!story.id || byId.has(story.id)) throw new Error('Duplicate or missing story ID: ' + story.id);
    byId.set(story.id, story);
    if (!backlog.owners.includes(story.owner) || !backlog.owners.includes(story.reviewer) || story.owner === story.reviewer) {
      throw new Error(story.id + ': choose one owner and a different peer reviewer.');
    }
    if (!story.branch || branches.has(story.branch)) throw new Error('Duplicate or missing branch: ' + story.id);
    branches.add(story.branch);
    if (!story.paths?.length || !story.acceptance?.length || !Array.isArray(story.dependsOn)) throw new Error('Incomplete story: ' + story.id);
    if (story.paths.some(path => path.startsWith('/') || path.includes('..') || path.includes('\\'))) throw new Error('Invalid ownership path: ' + story.id);
    if (story.number !== undefined) {
      if (!Number.isInteger(story.number) || story.number <= 0 || numbers.has(story.number)) throw new Error('Invalid/duplicate issue number: ' + story.id);
      numbers.add(story.number);
    }
  }
  const visiting = new Set();
  const ancestors = new Map();
  function visit(id) {
    if (!byId.has(id)) throw new Error('Unknown dependency: ' + id);
    if (visiting.has(id)) throw new Error('Dependency cycle at ' + id);
    if (ancestors.has(id)) return ancestors.get(id);
    visiting.add(id);
    const result = new Set();
    for (const dep of byId.get(id).dependsOn) {
      result.add(dep);
      for (const ancestor of visit(dep)) result.add(ancestor);
    }
    visiting.delete(id);
    ancestors.set(id, result);
    return result;
  }
  for (const story of stories) visit(story.id);
  for (let i = 0; i < stories.length; i++) {
    for (const other of stories.slice(i + 1)) {
      const story = stories[i];
      if (story.owner === other.owner || ancestors.get(story.id).has(other.id) || ancestors.get(other.id).has(story.id)) continue;
      if (story.paths.some(a => other.paths.some(b => overlaps(a, b)))) {
        throw new Error('Unordered work shares paths across owners: ' + story.id + ' / ' + other.id);
      }
    }
  }
  return { stories: stories.length, edges: stories.reduce((n, s) => n + s.dependsOn.length, 0) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const result = validateBacklog(JSON.parse(readFileSync('docs/backlog.json', 'utf8')));
  console.log('Backlog: ' + result.stories + ' stories and ' + result.edges + ' edges passed; no unordered cross-owner file overlap.');
}
