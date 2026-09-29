import type { Snapshot } from '../contracts';

/** Authored test data only; never imported by the demo or presented as learning evidence. */
export function withRecordedActivity(snapshot: Snapshot): Snapshot {
  const at = '2026-09-29T12:00:00Z';
  const pending = { status: 'pending' as const, attemptIds: [], explanation: 'Insufficient evidence' };
  return {
    ...snapshot,
    learning: {
      activeAttemptId: 'test-attempt',
      attempts: [{
        id: 'test-attempt', caseId: 'test-case', caseVersion: 1, skillId: 'test-skill', stageId: 'test-stage',
        mode: 'check', answer: { action: 'amount', amount: 0, evidenceIds: ['service-date'], rationaleId: 'future-service' },
        confidence: 0.75, maxHelpUsed: 0, answerRevealed: false, draftRevealed: false, aiReviewDecision: null,
        status: 'submitted', correctness: true, eligibility: { eligible: true, reason: null },
        createdAt: at, submittedAt: at, teachingAttemptId: 'test-teaching', checkedAt: at, origin: 'session',
      }],
      teachingAttempts: [{ id: 'test-teaching', caseId: 'test-demo', caseVersion: 1, skillId: 'test-skill', stageId: 'test-stage', taughtAt: '2026-09-20T12:00:00Z', origin: 'demo_seed' }],
      exposures: [{ caseId: 'test-demo', attemptId: 'test-teaching', exposedAt: at, reason: 'help' }],
      aiReviewEvents: [{ id: 'test-review', attemptId: 'test-attempt', caseId: 'test-case', draftIsCorrect: false, revealedAt: at, decision: 'correct', origin: 'demo_seed' }],
    },
    mentoring: {
      requests: [{ id: 'test-request', selectedContext: [{ id: 'context', text: 'Only selected context' }], previewText: 'Selected context', question: 'Which service date?', status: 'answered', reply: { text: 'Check the service period', author: 'test-mentor' }, createdAt: at, repliedAt: at }],
      experienceCards: [{ id: 'test-card', skillId: 'test-skill', cue: 'Date mismatch', principle: 'Inspect service dates', applicability: 'Uniform service', exception: 'Milestones', sourceAttemptId: 'test-attempt', sourceAttribution: 'Reviewed explanation', author: 'test-mentor', status: 'published', version: 1, approvedAt: at, origin: 'session' }],
    },
    progress: {
      skills: [{ skillId: 'test-skill', stageId: 'test-stage', supportLevel: 2, evidenceStates: { E1: pending, E2: pending, E3: pending, E4: pending, E5: pending }, lastTransition: null, unresolvedReviewIds: ['test-concern'] }],
      transitions: [],
      reviewConcerns: [{ id: 'test-concern', skillId: 'test-skill', stageId: 'test-stage', triggerAttemptId: 'test-attempt', reason: 'Test concern', status: 'unresolved', resolution: null }],
    },
  };
}
