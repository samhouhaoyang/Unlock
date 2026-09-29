import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { loadContent, validateContent } from '../check-content.mjs';

test('the six fictional interactive cases contain the accepted P0 judgments', () => {
  const content = loadContent();
  assert.equal(validateContent(content).interactiveCases, 6);
  const expected = { 'EX-01': 300, 'WK-01': 400, 'CK-01': 100, 'TR-01': 0, 'UN-01': null, 'RT-01': 500 };
  for (const [id, amount] of Object.entries(expected)) {
    assert.equal(content.cases.find(record => record.id === id).acceptedAnswers[0].amount, amount, id);
  }
  assert.equal(content.cases.find(record => record.id === 'UN-01').acceptedAnswers[0].action, 'need_info');
});

test('four opportunity quadrants preserve mentor delivery and one complete skill', () => {
  const content = loadContent();
  const summary = validateContent(content);
  assert.equal(summary.tasks, 4);
  assert.equal(summary.skills, 3);
  assert.equal(content.tasks.filter(task => task.interaction === 'practice')[0].caseId, 'WK-01');
  const unsafe = structuredClone(content);
  unsafe.tasks.find(task => task.deliveryRisk === 'high').recommendedRoute = 'learner';
  assert.throws(() => validateContent(unsafe), /mentor/);
  const overclaimed = structuredClone(content);
  overclaimed.skills[0].illustrative = false;
  assert.throws(() => validateContent(overclaimed), /illustrative/);
});

test('the growth seed reserves transfer and reproduces the documented confidence scores', () => {
  const summary = validateContent(loadContent());
  assert.equal(summary.growth.eligibleChecks, 8);
  assert.equal(summary.growth.regularPasses, 6);
  assert.equal(summary.growth.retentionPasses, 2);
  assert.equal(summary.growth.transferPasses, 0);
  assert.equal(summary.growth.brier, 0.109375);
  assert.ok(Math.abs(summary.growth.brierAfterTransfer75 - 0.10416666666666667) < 1e-12);
  assert.equal(summary.growth.brierAfterTransfer50, 0.125);
  const seed = loadContent().scenarios.find(record => record.id === 'start-from-zero');
  assert.deepEqual(seed.attempts, []);
  assert.deepEqual(seed.teachingAttempts, []);
});

test('historical wrong-draft acceptance is one of four revealed reviews, separate from eight checks', () => {
  const content = loadContent();
  const summary = validateContent(content);
  assert.deepEqual(summary.growth.wrongDraftAcceptance, { accepted: 1, revealed: 4 });
  assert.equal(summary.growth.eligibleChecks, 8);
  const duplicate = structuredClone(content);
  const events = duplicate.scenarios.find(record => record.id === 'growth-checkpoint').aiReviewEvents;
  events[1].revealId = events[0].revealId;
  assert.throws(() => validateContent(duplicate), /duplicate reveal/);
});

test('a historical demonstration cannot be relabelled as a fresh independent check', () => {
  const content = loadContent();
  const growth = content.scenarios.find(record => record.id === 'growth-checkpoint');
  const demonstrated = content.historicalCases.find(record => record.id === 'HIS-RG-01');
  growth.teachingAttempts[0].caseId = demonstrated.id;
  growth.teachingAttempts[0].answer = structuredClone(demonstrated.acceptedAnswers[0]);
  assert.throws(() => validateContent(content), /exposure/);
});

test('retention accepts exactly 72 hours and rejects an earlier or missing teaching link', () => {
  const content = loadContent();
  const retention = content.scenarios.find(record => record.id === 'growth-checkpoint').attempts.find(record => record.caseId === 'HIS-RT-01');
  retention.createdAt = '2026-09-13T09:00:00.000Z';
  retention.submittedAt = '2026-09-13T09:05:00.000Z';
  assert.equal(validateContent(content).growth.retentionPasses, 2);
  retention.submittedAt = '2026-09-13T09:04:59.000Z';
  assert.throws(() => validateContent(content), /72 hours/);
  retention.submittedAt = '2026-09-13T09:05:00.000Z';
  retention.teachingAttemptId = 'missing-teaching';
  assert.throws(() => validateContent(content), /linked teaching/);
});

test('restoration reserves RT-01 and has a valid historical lesson without a prewritten failure', () => {
  const content = loadContent();
  const restoration = content.scenarios.find(record => record.id === 'support-restoration');
  assert.equal(restoration.retentionCaseId, 'RT-01');
  assert.equal(restoration.teachingAttempts[0].origin, 'demo_seed');
  assert.deepEqual(restoration.attempts, []);
  restoration.retentionAvailableAt = '2026-09-23T09:04:59.000Z';
  assert.throws(() => validateContent(content), /72 hours/);
  restoration.retentionAvailableAt = '2026-09-23T09:05:00.000Z';
  restoration.retentionTeachingAttemptId = 'missing-teaching';
  assert.throws(() => validateContent(content), /simulated teaching/);
});

test('wrong evidence cannot be recorded as a correct structured judgment', () => {
  const content = loadContent();
  const attempt = content.scenarios.find(record => record.id === 'growth-checkpoint').attempts[0];
  attempt.answer.evidenceIds = ['total'];
  assert.throws(() => validateContent(content), /correctness disagrees/);
});

test('feedback disclosed after submission preserves the check submission eligibility', () => {
  const content = loadContent();
  content.scenarios.find(record => record.id === 'growth-checkpoint').attempts[0].answerRevealed = true;
  assert.equal(validateContent(content).growth.eligibleChecks, 8);
});

test('known-correct drafts and known-incorrect drafts retain their authored truth', () => {
  const content = loadContent();
  assert.equal(content.cases.find(record => record.id === 'WK-01').aiDraft.answer.amount, 1200);
  assert.equal(content.cases.find(record => record.id === 'CK-01').aiDraft.isCorrect, true);
  content.cases.find(record => record.id === 'CK-01').aiDraft.isCorrect = false;
  assert.throws(() => validateContent(content), /draft truth/);
});

test('the required WK and CK draft contrast cannot be removed or silently corrected', () => {
  for (const id of ['WK-01', 'CK-01']) {
    const content = loadContent();
    const definition = content.cases.find(record => record.id === id);
    definition.aiDraft = null;
    definition.draftOrigin = null;
    assert.throws(() => validateContent(content), /required preset draft/);
  }
  const content = loadContent();
  const work = content.cases.find(record => record.id === 'WK-01');
  work.aiDraft.answer = structuredClone(work.acceptedAnswers[0]);
  work.aiDraft.isCorrect = true;
  assert.throws(() => validateContent(content), /required preset draft/);
});

test('the accepted work judgment cannot teach that the invoice determines the expense period', () => {
  const content = loadContent();
  const work = content.cases.find(record => record.id === 'WK-01');
  work.acceptedAnswers[0].evidenceIds.reverse();
  assert.equal(validateContent(content).interactiveCases, 6);
  work.acceptedAnswers[0].evidenceIds = ['invoice'];
  work.acceptedAnswers[0].rationaleId = 'invoice-controls';
  assert.throws(() => validateContent(content), /reviewed evidence and rationale/);
});

test('invalid references, versions, identities, source labels and timestamps fail closed', () => {
  const changes = [
    [content => { content.cases[0].acceptedAnswers[0].evidenceIds = ['missing-evidence']; }, /unknown evidence/],
    [content => { content.cases[0].hints.L4 = ''; }, /hint L4/],
    [content => { content.cases[0].acceptedAnswers[0].amount = 600; }, /P0 judgment/],
    [content => { content.tasks[0].caseId = 'HIS-RG-01'; }, /unknown case/],
    [content => { content.tasks[0].skillId = 'service-period-recognition'; }, /skill must agree/],
    [content => { content.historicalCases[0].id = 'TR-01'; }, /distinct from interactive/],
    [content => { content.historicalCases[0].allocation.total = 900; }, /authored service allocation/],
    [content => { content.scenarios[1].attempts[0].caseVersion = 999; }, /known historical case version/],
    [content => { content.scenarios[1].attempts[1].id = content.scenarios[1].attempts[0].id; }, /duplicate id/],
    [content => { content.scenarios[1].attempts[0].origin = 'session'; }, /demo_seed/],
    [content => { content.scenarios[1].attempts[0].stageId = 'another-stage'; }, /skill or stage/],
    [content => { content.scenarios[1].attempts[0].maxHelpUsed = 1; }, /independent eligibility/],
    [content => { content.scenarios[1].attempts[0].disclosureAtSubmission.aiDraft = true; }, /independent eligibility/],
    [content => { content.scenarios[1].attempts[0].confidence = 0.8; }, /prior confidence/],
    [content => { content.scenarios[1].attempts[0].submittedAt = '2026-02-30T09:05:00.000Z'; }, /ISO UTC/],
    [content => { content.scenarios[1].aiReviewEvents[0].revealedAt = '2026-09-21T09:04:00.000Z'; }, /before judgment/],
    [content => { content.scenarios[1].aiReviewEvents[0].draftIsCorrect = true; }, /draft truth or source/],
    [content => { content.scenarios[1].aiReviewEvents[0].attemptId = 'GROWTH-CHECK-01'; }, /revealed practice draft/],
    [content => { content.scenarios[1].experienceCards.push({ id: 'fake-live-card' }); }, /prepublish/]
  ];
  for (const [change, error] of changes) {
    const content = loadContent();
    change(content);
    assert.throws(() => validateContent(content), error);
  }
});

test('the standalone CLI reloads authored files and returns a failure for corrupted content', () => {
  const root = mkdtempSync(join(tmpdir(), 'unlock-content-'));
  mkdirSync(join(root, 'content'));
  for (const filename of ['cases.json', 'historical-cases.json', 'skills.json', 'tasks.json', 'scenarios.json']) {
    writeFileSync(join(root, 'content', filename), readFileSync(join('content', filename)));
  }
  const script = resolve('scripts/check-content.mjs');
  const run = () => spawnSync(process.execPath, [script, root], { encoding: 'utf8' });
  assert.equal(run().status, 0);
  const filename = join(root, 'content', 'scenarios.json');
  const document = JSON.parse(readFileSync(filename, 'utf8'));
  document.schemaVersion = 999;
  writeFileSync(filename, JSON.stringify(document));
  const failure = run();
  assert.equal(failure.status, 1);
  assert.match(failure.stderr, /unsupported schemaVersion/);
});
