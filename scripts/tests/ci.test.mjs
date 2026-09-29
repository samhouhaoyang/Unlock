import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync, rmdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { validateBacklog } from '../check-backlog.mjs';
import { checkDocs } from '../check-docs.mjs';
import { closingIssues, checkDependencies } from '../check-pr-dependencies.mjs';

function story(id, owner, dependsOn = [], paths = [id + '/']) {
  return { id, owner, reviewer: owner === 'a' ? 'b' : 'a', branch: 'feat/' + id, dependsOn, paths, acceptance: ['Observable behavior'] };
}
function backlog(stories) { return { owners: ['a', 'b'], stories }; }

test('independent owners with disjoint paths can start in parallel', () => {
  assert.equal(validateBacklog(backlog([story('one', 'a'), story('two', 'b')])).edges, 0);
});
test('unknown prerequisites and dependency cycles fail', () => {
  assert.throws(() => validateBacklog(backlog([story('one', 'a', ['missing'])])), /Unknown dependency/);
  assert.throws(() => validateBacklog(backlog([story('one', 'a', ['two']), story('two', 'b', ['one'])])), /cycle/);
});
test('unordered cross-owner file overlap fails; a genuine prerequisite permits shared evolution', () => {
  const a = story('one', 'a', [], ['src/shared/']);
  const b = story('two', 'b', [], ['src/shared/types.ts']);
  assert.throws(() => validateBacklog(backlog([a, b])), /shares paths/);
  b.dependsOn = ['one'];
  assert.equal(validateBacklog(backlog([a, b])).edges, 1);
});
test('a story cannot review itself', () => {
  const a = story('one', 'a');
  a.reviewer = 'a';
  assert.throws(() => validateBacklog(backlog([a])), /different peer/);
});
test('local documentation links must resolve, while external links require no network', () => {
  const dir = mkdtempSync(join(tmpdir(), 'unlock-docs-'));
  try {
    writeFileSync(join(dir, 'README.md'), '[guide](guide.md) [external](https://example.org/page)');
    assert.throws(() => checkDocs(dir), /Broken local links/);
    writeFileSync(join(dir, 'guide.md'), '# Guide');
    assert.equal(checkDocs(dir).links, 1);
  } finally {
    rmSync(join(dir, 'README.md'), { force: true });
    rmSync(join(dir, 'guide.md'), { force: true });
    rmdirSync(dir);
  }
});
test('closing references accept local numbers or same-repo URLs but reject other repositories', () => {
  assert.deepEqual(closingIssues('Closes #3\nFixes https://github.com/a/b/issues/4\nResolves a/b#3', 'a/b'), [3, 4]);
  assert.throws(() => closingIssues('Closes other/repo#3', 'a/b'), /must belong/);
  assert.throws(() => closingIssues('<!-- Closes #3 -->\n`Closes #4`', 'a/b'), /Link the work/);
});
test('an open prerequisite blocks a PR even when the body attempts to close both together', async () => {
  await assert.rejects(checkDependencies({
    body: 'Closes #2\nCloses #1', repository: 'a/b',
    getIssue: async number => ({ number, assignees: [{ login: 'a' }] }),
    getBlockers: async number => number === 2 ? [{ number: 1, state: 'open' }] : []
  }), /blocked by #1/);
});
test('closed prerequisites pass; missing assignee and PR-as-issue fail', async () => {
  const base = { body: 'Closes #2', repository: 'a/b', getBlockers: async () => [{ number: 1, state: 'closed' }] };
  assert.deepEqual(await checkDependencies({ ...base, getIssue: async () => ({ assignees: [{ login: 'a' }] }) }), [2]);
  await assert.rejects(checkDependencies({ ...base, getIssue: async () => ({ assignees: [] }) }), /assigned owner/);
  await assert.rejects(checkDependencies({ ...base, getIssue: async () => ({ pull_request: {} }) }), /not a work issue/);
});
test('committed prerequisites still block if their native GitHub relationship is removed', async () => {
  await assert.rejects(checkDependencies({
    body: 'Closes #2', repository: 'a/b', getBlockers: async () => [],
    getIssue: async number => ({ number, state: 'open', assignees: [{ login: 'a' }] }),
    plannedStories: [{ id: 'first', number: 1, dependsOn: [] }, { id: 'second', number: 2, dependsOn: ['first'] }]
  }), /blocked by #1/);
});
test('an API error fails closed rather than treating unknown dependencies as ready', async () => {
  await assert.rejects(checkDependencies({
    body: 'Closes #2', repository: 'a/b', getIssue: async () => { throw new Error('API unavailable'); },
    getBlockers: async () => []
  }), /API unavailable/);
});
