import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const skillId = 'cross-period-expense-allocation';
const caseTypes = new Set(['demonstration', 'practice', 'regular', 'transfer', 'retention', 'insufficient_information']);
const expectedCases = new Map([
  ['EX-01', { type: 'demonstration', amount: 300, evidenceIds: ['service', 'total'], rationaleId: 'uniform-service' }],
  ['WK-01', { type: 'practice', amount: 400, evidenceIds: ['service', 'total', 'prior-accruals'], rationaleId: 'service-not-invoice' }],
  ['CK-01', { type: 'practice', amount: 100, evidenceIds: ['service', 'total'], rationaleId: 'uniform-service' }],
  ['TR-01', { type: 'transfer', amount: 0, evidenceIds: ['service', 'target'], rationaleId: 'service-not-started' }],
  ['UN-01', { type: 'insufficient_information', amount: null, evidenceIds: ['milestones', 'missing-performance'], rationaleId: 'need-performance' }],
  ['RT-01', { type: 'retention', amount: 500, evidenceIds: ['service', 'total', 'target'], rationaleId: 'uniform-service' }]
]);
const expectedDrafts = new Map([['WK-01', [1200, false]], ['CK-01', [100, true]], ['UN-01', [400, false]]]);

function requireContent(condition, message) {
  if (!condition) throw new Error(message);
}

function text(value, label) {
  requireContent(typeof value === 'string' && value.trim().length > 0, label + ' must be nonempty text.');
}

function records(values, label, allowEmpty = false) {
  requireContent(Array.isArray(values) && (allowEmpty || values.length > 0), label + ' must be an array' + (allowEmpty ? '.' : ' with records.'));
  const byId = new Map();
  for (const value of values) {
    requireContent(value && typeof value === 'object', label + ' has an invalid record.');
    text(value.id, label + ' id');
    requireContent(!byId.has(value.id), label + ' has duplicate id ' + value.id + '.');
    byId.set(value.id, value);
  }
  return byId;
}

function sameIds(a, b) {
  return a.length === b.length && new Set(a).size === a.length && a.every(id => b.includes(id));
}

function answerMatches(answer, definition) {
  return definition.acceptedAnswers.some(accepted => answer.action === accepted.action && answer.amount === accepted.amount &&
    answer.rationaleId === accepted.rationaleId && sameIds(answer.evidenceIds, accepted.evidenceIds));
}

function validateAnswer(answer, definition, label) {
  requireContent(answer && typeof answer === 'object', label + ' requires a structured answer.');
  requireContent(definition.allowedActions.includes(answer.action), label + ' has an unsupported action.');
  requireContent(answer.action === 'amount' ? Number.isFinite(answer.amount) && answer.amount >= 0 : answer.amount === null,
    label + ' requires a finite nonnegative amount or null for need_info.');
  requireContent(Array.isArray(answer.evidenceIds) && answer.evidenceIds.length > 0 && new Set(answer.evidenceIds).size === answer.evidenceIds.length,
    label + ' requires unique evidence IDs.');
  requireContent(answer.evidenceIds.every(id => definition.evidence.some(choice => choice.id === id)), label + ' references unknown evidence.');
  requireContent(definition.rationales.some(choice => choice.id === answer.rationaleId), label + ' references an unknown rationale.');
}

function validateCase(definition, skills) {
  const label = definition.id;
  requireContent(Number.isInteger(definition.version) && definition.version > 0, label + ' requires a positive case version.');
  requireContent(skills.has(definition.skillId), label + ' references an unknown skill.');
  requireContent(caseTypes.has(definition.type), label + ' has an unknown case type.');
  text(definition.title, label + ' title');
  text(definition.unit, label + ' monetary unit');
  requireContent(/^\d{4}-(0[1-9]|1[0-2])$/.test(definition.targetPeriod), label + ' requires a target month.');
  const facts = records(definition.facts, label + ' facts');
  for (const field of ['facts', 'evidence', 'rationales']) {
    records(definition[field], label + ' ' + field);
    for (const choice of definition[field]) text(choice.text, label + ' ' + field + ' text');
  }
  requireContent(Array.isArray(definition.allowedActions) && definition.allowedActions.length > 0 &&
    new Set(definition.allowedActions).size === definition.allowedActions.length &&
    definition.allowedActions.every(action => ['amount', 'need_info'].includes(action)), label + ' requires valid actions.');
  requireContent(Array.isArray(definition.acceptedAnswers) && definition.acceptedAnswers.length > 0, label + ' needs an accepted answer.');
  for (const answer of definition.acceptedAnswers) {
    validateAnswer(answer, definition, label + ' accepted answer');
    requireContent(answer.evidenceIds.every(id => facts.has(id)), label + ' accepted evidence must reference supplied facts.');
  }
  for (const level of ['L1', 'L2', 'L3', 'L4']) text(definition.hints?.[level], label + ' hint ' + level);
  if (definition.aiDraft === null) {
    requireContent(definition.draftOrigin === null, label + ' has draft provenance without a draft.');
  } else {
    text(definition.aiDraft?.text, label + ' draft text');
    requireContent(definition.draftOrigin === 'preset_training_example', label + ' must label its preset draft.');
    validateAnswer(definition.aiDraft.answer, definition, label + ' draft');
    requireContent(typeof definition.aiDraft.isCorrect === 'boolean' && definition.aiDraft.isCorrect === answerMatches(definition.aiDraft.answer, definition),
      label + ' draft truth disagrees with the reviewed structured answer.');
  }
}

function timestamp(value, label) {
  const parsed = Date.parse(value);
  requireContent(typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value) &&
    Number.isFinite(parsed) && new Date(parsed).toISOString().replace('.000Z', 'Z') === value.replace('.000Z', 'Z'), label + ' must be a valid ISO UTC timestamp.');
  return parsed;
}

function validateAttempt(attempt, scenario, definitions) {
  const label = attempt.id;
  const definition = definitions.get(attempt.caseId);
  requireContent(definition && definition.interactive === false && attempt.caseVersion === definition.version,
    label + ' must reference a known historical case version; interactive cases stay fresh.');
  requireContent(attempt.skillId === scenario.skillId && attempt.skillId === definition.skillId && attempt.stageId === scenario.stageId,
    label + ' has an inconsistent skill or stage.');
  requireContent(attempt.origin === 'demo_seed', label + ' must label simulated history as demo_seed.');
  requireContent(attempt.status === 'submitted' && ['practice', 'check'].includes(attempt.mode), label + ' needs an explicit submitted attempt mode.');
  requireContent([0.5, 0.75, 0.9].includes(attempt.confidence), label + ' has an invalid prior confidence.');
  requireContent(Number.isInteger(attempt.maxHelpUsed) && attempt.maxHelpUsed >= 0 && attempt.maxHelpUsed <= 4, label + ' has invalid actual help.');
  for (const flag of ['answerRevealed', 'aiDraftRevealed', 'priorExposure', 'eligible', 'correct']) {
    requireContent(typeof attempt[flag] === 'boolean', label + ' requires explicit ' + flag + '.');
  }
  requireContent(typeof attempt.disclosureAtSubmission?.answer === 'boolean' && typeof attempt.disclosureAtSubmission?.aiDraft === 'boolean',
    label + ' requires submission-time disclosure flags.');
  validateAnswer(attempt.answer, definition, label);
  requireContent(attempt.correct === answerMatches(attempt.answer, definition), label + ' correctness disagrees with the structured judgment.');
  requireContent(timestamp(attempt.createdAt, label + ' creation') <= timestamp(attempt.submittedAt, label + ' submission'), label + ' submission precedes creation.');
  const eligible = attempt.mode === 'check' && ['regular', 'transfer', 'retention'].includes(definition.type) &&
    attempt.maxHelpUsed === 0 && !attempt.priorExposure && !attempt.disclosureAtSubmission.answer && !attempt.disclosureAtSubmission.aiDraft;
  requireContent(attempt.eligible === eligible, label + ' has inconsistent independent eligibility.');
  requireContent(eligible ? attempt.ineligibleReason === null : typeof attempt.ineligibleReason === 'string' && attempt.ineligibleReason.length > 0,
    label + ' needs an eligibility reason consistent with its status.');
}

function validateReviews(scenario, definitions) {
  const attempts = new Map(scenario.attempts.map(attempt => [attempt.id, attempt]));
  const events = records(scenario.aiReviewEvents, scenario.id + ' AI reviews', true);
  const reveals = new Set();
  const reviewedAttempts = new Set();
  for (const event of events.values()) {
    text(event.revealId, event.id + ' reveal identity');
    requireContent(!reveals.has(event.revealId) && !reviewedAttempts.has(event.attemptId), event.id + ' has a duplicate reveal or reviewed attempt.');
    reveals.add(event.revealId);
    reviewedAttempts.add(event.attemptId);
    const attempt = attempts.get(event.attemptId);
    const definition = definitions.get(event.caseId);
    requireContent(attempt && definition?.aiDraft && event.caseId === attempt.caseId && event.caseVersion === attempt.caseVersion &&
      attempt.mode === 'practice' && !attempt.eligible && attempt.aiDraftRevealed, event.id + ' must reference an actually revealed practice draft.');
    requireContent(event.origin === 'demo_seed' && event.draftIsCorrect === definition.aiDraft.isCorrect, event.id + ' has incorrect draft truth or source.');
    requireContent(timestamp(event.revealedAt, event.id + ' reveal') >= timestamp(attempt.submittedAt, attempt.id), event.id + ' reveals a draft before judgment submission.');
    requireContent(['accept', 'correct', 'need_info'].includes(event.decision), event.id + ' needs a valid review decision.');
    requireContent(timestamp(event.decidedAt, event.id + ' decision') >= timestamp(event.revealedAt, event.id), event.id + ' decision precedes its reveal.');
  }
  requireContent(scenario.attempts.every(attempt => attempt.aiDraftRevealed === reviewedAttempts.has(attempt.id)), scenario.id + ' disclosed drafts must have exactly one review event.');
  const wrong = [...events.values()].filter(event => !event.draftIsCorrect);
  return { accepted: wrong.filter(event => event.decision === 'accept').length, revealed: wrong.length };
}

function validateScenarios(scenarios, definitions) {
  const byId = records(scenarios, 'scenarios');
  requireContent(byId.size === 3 && ['start-from-zero', 'growth-checkpoint', 'support-restoration'].every(id => byId.has(id)), 'Exactly the three P0 scenarios are required.');
  let wrongDraftAcceptance;
  for (const scenario of scenarios) {
    text(scenario.label, scenario.id + ' label');
    text(scenario.stageId, scenario.id + ' stage');
    requireContent(scenario.skillId === skillId, scenario.id + ' must use the complete P0 skill.');
    requireContent(Number.isInteger(scenario.supportLevel) && scenario.supportLevel >= 0 && scenario.supportLevel <= 4, scenario.id + ' has an invalid support level.');
    const teaching = records(scenario.teachingAttempts, scenario.id + ' teaching attempts', true);
    records(scenario.attempts, scenario.id + ' attempts', true);
    records([...scenario.teachingAttempts, ...scenario.attempts], scenario.id + ' observation identities', true);
    for (const attempt of [...scenario.teachingAttempts, ...scenario.attempts]) validateAttempt(attempt, scenario, definitions);
    const exposedCases = new Set();
    const chronological = [...scenario.teachingAttempts, ...scenario.attempts].sort((a, b) => Date.parse(a.submittedAt) - Date.parse(b.submittedAt));
    for (const attempt of chronological) {
      requireContent(attempt.priorExposure === exposedCases.has(attempt.caseId), attempt.id + ' prior exposure disagrees with earlier historical disclosures.');
      if (attempt.maxHelpUsed > 0 || attempt.answerRevealed || attempt.aiDraftRevealed) exposedCases.add(attempt.caseId);
    }
    for (const attempt of teaching.values()) requireContent(attempt.mode === 'practice' && attempt.maxHelpUsed > 0, attempt.id + ' must record actual teaching assistance.');
    for (const attempt of scenario.attempts) {
      if (definitions.get(attempt.caseId).type !== 'retention' || !attempt.eligible) continue;
      const lesson = teaching.get(attempt.teachingAttemptId);
      requireContent(lesson && lesson.skillId === attempt.skillId, attempt.id + ' needs its linked teaching attempt.');
      requireContent(timestamp(attempt.submittedAt, attempt.id) - timestamp(lesson.submittedAt, lesson.id) >= 72 * 60 * 60 * 1000,
        attempt.id + ' retention needs at least 72 hours after its linked teaching.');
    }
    for (const field of ['aiReviewEvents', 'experienceCards', 'reviewConcerns']) requireContent(Array.isArray(scenario[field]), scenario.id + ' requires explicit ' + field + '.');
    const reviews = validateReviews(scenario, definitions);
    if (scenario.id === 'growth-checkpoint') wrongDraftAcceptance = reviews;
    requireContent(scenario.experienceCards.length === 0 && scenario.reviewConcerns.length === 0, scenario.id + ' must not prepublish live experience or invent review concerns.');
    requireContent(/simulated/i.test(scenario.label), scenario.id + ' must explain its simulated-history status.');
  }
  const zero = byId.get('start-from-zero');
  requireContent(zero.supportLevel === 4 && ['teachingAttempts', 'attempts', 'aiReviewEvents'].every(field => zero[field].length === 0),
    'start-from-zero must start at L4 with no historical observations.');
  const growth = byId.get('growth-checkpoint');
  const checks = growth.attempts.filter(attempt => attempt.eligible);
  requireContent(growth.supportLevel === 2 && checks.length === 8 && checks.every(attempt => attempt.correct) &&
    checks.filter(attempt => attempt.confidence === 0.75).length === 6 && checks.filter(attempt => attempt.confidence === 0.5).length === 2,
    'Growth needs eight correct independent checks: six at 75% and two at 50%, all in its L2 stage.');
  requireContent(new Set(checks.map(attempt => attempt.caseId)).size === checks.length, 'Growth must not reuse an exposed historical case as independent evidence.');
  const regularPasses = new Set(checks.filter(attempt => definitions.get(attempt.caseId).type === 'regular').map(attempt => attempt.caseId)).size;
  const retentionPasses = checks.filter(attempt => definitions.get(attempt.caseId).type === 'retention').length;
  const transferPasses = checks.filter(attempt => definitions.get(attempt.caseId).type === 'transfer').length;
  requireContent(regularPasses >= 2 && retentionPasses >= 1 && transferPasses === 0, 'Growth must satisfy regular/retention evidence and leave transfer missing.');
  const squaredError = checks.reduce((sum, attempt) => sum + (attempt.confidence - Number(attempt.correct)) ** 2, 0);
  const brier = squaredError / checks.length;
  requireContent(brier === 0.109375, 'Growth Brier must equal 0.109375.');
  requireContent(growth.aiReviewEvents.length === 4 && wrongDraftAcceptance.accepted === 1 && wrongDraftAcceptance.revealed === 4,
    'Growth requires four revealed wrong drafts with exactly one accepted; reviews remain separate from E5 checks.');
  const restoration = byId.get('support-restoration');
  const lesson = restoration.teachingAttempts.find(attempt => attempt.id === restoration.retentionTeachingAttemptId);
  requireContent(restoration.supportLevel === 2 && restoration.retentionCaseId === 'RT-01' && lesson && restoration.attempts.length === 0 && restoration.aiReviewEvents.length === 0,
    'Restoration must reserve RT-01 and identify its simulated teaching at L2.');
  requireContent(timestamp(restoration.retentionAvailableAt, 'restoration availability') - timestamp(lesson.submittedAt, lesson.id) >= 72 * 60 * 60 * 1000,
    'Restoration retention needs at least 72 hours after its linked teaching.');
  return { eligibleChecks: checks.length, regularPasses, retentionPasses, transferPasses, brier, wrongDraftAcceptance,
    brierAfterTransfer75: (squaredError + 0.0625) / 9, brierAfterTransfer50: (squaredError + 0.25) / 9 };
}

export function loadContent(root = process.cwd()) {
  const content = { schemaVersion: 1 };
  for (const [collection, basename] of [['cases', 'cases'], ['skills', 'skills'], ['tasks', 'tasks'], ['historicalCases', 'historical-cases'], ['scenarios', 'scenarios']]) {
    const filename = resolve(root, 'content', basename + '.json');
    const document = JSON.parse(readFileSync(filename, 'utf8'));
    requireContent(document.schemaVersion === 1, collection + ' has an unsupported schemaVersion.');
    content[collection] = document[collection];
  }
  return content;
}

export function validateContent(content) {
  requireContent(content?.schemaVersion === 1, 'Unsupported content schemaVersion.');
  const skills = records(content.skills, 'skills');
  requireContent(skills.size === 3 && skills.has(skillId), 'Three skill cards including the complete P0 skill are required.');
  for (const skill of skills.values()) {
    text(skill.title, skill.id + ' title');
    text(skill.label, skill.id + ' label');
    requireContent(skill.illustrative === (skill.id !== skillId) && skill.learningPath === (skill.id === skillId ? 'complete' : 'example'),
      skill.id + ': only the P0 skill is complete; the other two must be illustrative.');
  }
  const cases = records(content.cases, 'interactive cases');
  requireContent(cases.size === 6 && [...expectedCases.keys()].every(id => cases.has(id)), 'Exactly the six P0 interactive cases are required.');
  for (const definition of cases.values()) {
    validateCase(definition, skills);
    const expected = expectedCases.get(definition.id);
    const { type, amount } = expected;
    requireContent(definition.skillId === skillId && definition.type === type && definition.acceptedAnswers.every(answer =>
      answer.amount === amount && answer.action === (amount === null ? 'need_info' : 'amount')), definition.id + ' disagrees with the accepted P0 judgment.');
    requireContent(definition.acceptedAnswers.every(answer => answer.rationaleId === expected.rationaleId && sameIds(answer.evidenceIds, expected.evidenceIds)),
      definition.id + ' disagrees with its reviewed evidence and rationale combination.');
    const draft = expectedDrafts.get(definition.id);
    requireContent(draft ? definition.aiDraft && definition.aiDraft.answer.action === 'amount' && definition.aiDraft.answer.amount === draft[0] &&
      definition.aiDraft.isCorrect === draft[1] : definition.aiDraft === null, definition.id + ' disagrees with its required preset draft or independent-check disclosure design.');
  }
  const historical = records(content.historicalCases, 'historical cases');
  for (const definition of historical.values()) {
    requireContent(!cases.has(definition.id) && definition.interactive === false, definition.id + ' must remain distinct from interactive cases.');
    validateCase(definition, skills);
    const allocation = definition.allocation;
    requireContent(allocation && allocation.uniformMonthlyValue === true && Number.isFinite(allocation.total) && allocation.total > 0 &&
      Array.isArray(allocation.serviceMonths) && allocation.serviceMonths.length > 0 &&
      allocation.serviceMonths.every(month => /^\d{4}-(0[1-9]|1[0-2])$/.test(month)) && new Set(allocation.serviceMonths).size === allocation.serviceMonths.length,
      definition.id + ' requires explicit uniform-service facts.');
    const amount = allocation.serviceMonths.includes(definition.targetPeriod) ? allocation.total / allocation.serviceMonths.length : 0;
    requireContent(definition.acceptedAnswers.every(answer => answer.action === 'amount' && answer.amount === amount), definition.id + ' disagrees with its authored service allocation.');
    requireContent(definition.acceptedAnswers.every(answer => answer.rationaleId === (amount === 0 ? 'service-not-started' : 'uniform-service') &&
      sameIds(answer.evidenceIds, ['service', 'total', 'target'])), definition.id + ' disagrees with its reviewed evidence and rationale combination.');
  }
  const tasks = records(content.tasks, 'tasks');
  requireContent(tasks.size === 4, 'Four task cards are required.');
  const quadrants = new Set();
  for (const task of tasks.values()) {
    requireContent(cases.has(task.caseId) && skills.has(task.skillId), task.id + ' references an unknown case or skill.');
    requireContent(cases.get(task.caseId).skillId === task.skillId, task.id + ' skill must agree with its case.');
    for (const field of ['title', 'routeReason', 'label']) text(task[field], task.id + ' ' + field);
    requireContent(['low', 'high'].includes(task.learningValue) && ['low', 'high'].includes(task.deliveryRisk), task.id + ' has invalid opportunity tags.');
    const expectedRoute = task.deliveryRisk === 'high' ? 'mentor' : task.learningValue === 'high' ? 'learner' : 'ai';
    requireContent(task.recommendedRoute === expectedRoute, task.id + ': high risk requires mentor delivery; low risk follows learning value.');
    requireContent(task.interaction === (task.caseId === 'WK-01' ? 'practice' : 'example'), task.id + ' cannot offer a fake completion action.');
    requireContent(task.caseId !== 'TR-01' && task.caseId !== 'RT-01', task.id + ' must not expose a reserved independent check.');
    quadrants.add(task.learningValue + '/' + task.deliveryRisk);
  }
  requireContent(quadrants.size === 4 && [...tasks.values()].filter(task => task.interaction === 'practice').length === 1,
    'Task cards must cover four quadrants with only WK-01 as the main practice entry.');
  const growth = validateScenarios(content.scenarios, new Map([...cases, ...historical]));
  return { interactiveCases: cases.size, historicalCases: historical.size, tasks: tasks.size, skills: skills.size, scenarios: content.scenarios.length, growth };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    console.log('Content passed: ' + JSON.stringify(validateContent(loadContent(process.argv[2]))));
  } catch (error) {
    console.error('Content validation failed: ' + error.message);
    process.exitCode = 1;
  }
}
