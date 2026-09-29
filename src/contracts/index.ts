import { z } from 'zod';

const id = z.string().min(1);
const timestamp = z.iso.datetime({ offset: true });
export const supportLevelSchema = z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4)]);
export const originSchema = z.enum(['demo_seed', 'session']);
export const scenarioIdSchema = z.enum(['start-from-zero', 'growth-checkpoint', 'support-restoration']);
export const roleSchema = z.enum(['junior', 'mentor']);
export const caseTypeSchema = z.enum(['demonstration', 'practice', 'regular', 'transfer', 'retention', 'insufficient_information']);
export const confidenceSchema = z.union([z.literal(0.5), z.literal(0.75), z.literal(0.9)]);
export const reviewDecisionSchema = z.enum(['accept', 'correct', 'need_info']);
export const answerSchema = z.discriminatedUnion('action', [
  z.object({ action: z.literal('amount'), amount: z.number().finite(), evidenceIds: z.array(id), rationaleId: id }),
  z.object({ action: z.literal('need_info'), amount: z.null(), evidenceIds: z.array(id), rationaleId: id }),
]);
const statement = z.object({ id, text: z.string() });
export const caseSchema = z.object({
  id, version: z.number().int().positive(), skillId: id, type: caseTypeSchema, title: z.string(),
  facts: z.array(statement), allowedActions: z.array(z.enum(['amount', 'need_info'])),
  acceptedAnswers: z.array(answerSchema), evidence: z.array(statement), rationales: z.array(statement),
  hints: z.object({ L1: z.string(), L2: z.string(), L3: z.string(), L4: z.string() }),
  aiDraft: z.object({ text: z.string(), answer: answerSchema, isCorrect: z.boolean() }).nullable(),
  draftOrigin: z.string(),
});
export const taskSchema = z.object({
  id, caseId: id, skillId: id, learningValue: z.enum(['low', 'high']), deliveryRisk: z.enum(['low', 'high']),
  recommendedRoute: z.enum(['learner', 'ai', 'mentor']), routeReason: z.string(),
});
export const eligibilitySchema = z.discriminatedUnion('eligible', [
  z.object({ eligible: z.literal(true), reason: z.null() }),
  z.object({ eligible: z.literal(false), reason: z.string().min(1) }),
]);
export const attemptSchema = z.object({
  id, caseId: id, caseVersion: z.number().int().positive(), skillId: id, stageId: id,
  mode: z.enum(['practice', 'check']), answer: answerSchema.nullable(), confidence: confidenceSchema.nullable(),
  maxHelpUsed: supportLevelSchema, answerRevealed: z.boolean(), draftRevealed: z.boolean(),
  aiReviewDecision: reviewDecisionSchema.nullable(),
  status: z.enum(['in_progress', 'submitted', 'assisted', 'needs_review']),
  correctness: z.boolean().nullable(), eligibility: eligibilitySchema.nullable(),
  createdAt: timestamp, submittedAt: timestamp.nullable(),
  teachingAttemptId: id.nullable(), checkedAt: timestamp.nullable(), origin: originSchema,
});
export const teachingAttemptSchema = z.object({ id, caseId: id, caseVersion: z.number().int().positive(), skillId: id, stageId: id, taughtAt: timestamp, origin: originSchema });
export const exposureSchema = z.object({ caseId: id, attemptId: id, exposedAt: timestamp, reason: z.enum(['help', 'draft', 'answer', 'feedback']) });
export const aiReviewEventSchema = z.object({ id, attemptId: id, caseId: id, draftIsCorrect: z.boolean(), revealedAt: timestamp, decision: reviewDecisionSchema.nullable(), origin: originSchema });
export const evidenceSchema = z.object({
  status: z.enum(['pending', 'passed', 'needs_review']), attemptIds: z.array(id), explanation: z.string(),
});
export const evidenceStatesSchema = z.object({ E1: evidenceSchema, E2: evidenceSchema, E3: evidenceSchema, E4: evidenceSchema, E5: evidenceSchema });
export const transitionSchema = z.object({
  id, skillId: id, fromLevel: supportLevelSchema, toLevel: supportLevelSchema, fromStageId: id, toStageId: id,
  triggerAttemptId: id.nullable(), contributingEvidenceIds: z.array(id), origins: z.array(originSchema),
  explanation: z.string(), closedStageEvidence: evidenceStatesSchema, createdAt: timestamp,
});
const concernBase = { id, skillId: id, stageId: id, triggerAttemptId: id, reason: z.string() };
export const reviewConcernSchema = z.discriminatedUnion('status', [
  z.object({ ...concernBase, status: z.literal('unresolved'), resolution: z.null() }),
  z.object({ ...concernBase, status: z.literal('resolved'), resolution: z.object({ actor: id, resolvedAt: timestamp, reason: z.string().min(1) }) }),
]);
export const helpRequestSchema = z.object({
  id, selectedContext: z.array(statement), previewText: z.string(), question: z.string(),
  status: z.enum(['draft', 'sent', 'answered', 'cancelled']),
  reply: z.object({ text: z.string(), author: id }).nullable(), createdAt: timestamp, repliedAt: timestamp.nullable(),
});
export const experienceCardSchema = z.object({
  id, skillId: id, cue: z.string(), principle: z.string(), applicability: z.string(), exception: z.string(),
  sourceAttemptId: id, sourceAttribution: z.string(), author: id,
  status: z.enum(['draft', 'published', 'disputed', 'retired']), version: z.number().int().positive(),
  approvedAt: timestamp.nullable(), origin: originSchema,
});
export const skillStateSchema = z.object({
  skillId: id, stageId: id, supportLevel: supportLevelSchema, evidenceStates: evidenceStatesSchema,
  lastTransition: transitionSchema.nullable(), unresolvedReviewIds: z.array(id),
});
export const learningStateSchema = z.object({
  attempts: z.array(attemptSchema), teachingAttempts: z.array(teachingAttemptSchema),
  exposures: z.array(exposureSchema), aiReviewEvents: z.array(aiReviewEventSchema), activeAttemptId: id.nullable(),
});
export const mentoringStateSchema = z.object({ requests: z.array(helpRequestSchema), experienceCards: z.array(experienceCardSchema) });
export const progressStateSchema = z.object({ skills: z.array(skillStateSchema), transitions: z.array(transitionSchema), reviewConcerns: z.array(reviewConcernSchema) });
export const scenarioSchema = z.object({
  id: scenarioIdSchema, label: z.string(), skillId: id, stageId: id, supportLevel: supportLevelSchema,
  teachingAttempts: z.array(teachingAttemptSchema), attempts: z.array(attemptSchema),
  aiReviewEvents: z.array(aiReviewEventSchema), experienceCards: z.array(experienceCardSchema), reviewConcerns: z.array(reviewConcernSchema),
});
export const snapshotSchema = z.object({
  schemaVersion: z.literal(1), runId: id, scenario: scenarioIdSchema, scenarioLabel: z.string(),
  scenarioContentStatus: z.enum(['pending_content', 'loaded']), role: roleSchema,
  learning: learningStateSchema, mentoring: mentoringStateSchema, progress: progressStateSchema,
}).strict();

export type SupportLevel = z.infer<typeof supportLevelSchema>;
export type Origin = z.infer<typeof originSchema>;
export type ScenarioId = z.infer<typeof scenarioIdSchema>;
export type Role = z.infer<typeof roleSchema>;
export type StructuredAnswer = z.infer<typeof answerSchema>;
export type Case = z.infer<typeof caseSchema>;
export type Task = z.infer<typeof taskSchema>;
export type Attempt = z.infer<typeof attemptSchema>;
export type TeachingAttempt = z.infer<typeof teachingAttemptSchema>;
export type CaseExposure = z.infer<typeof exposureSchema>;
export type AIReviewEvent = z.infer<typeof aiReviewEventSchema>;
export type Transition = z.infer<typeof transitionSchema>;
export type ReviewConcern = z.infer<typeof reviewConcernSchema>;
export type HelpRequest = z.infer<typeof helpRequestSchema>;
export type ExperienceCard = z.infer<typeof experienceCardSchema>;
export type SkillState = z.infer<typeof skillStateSchema>;
export type LearningState = z.infer<typeof learningStateSchema>;
export type MentoringState = z.infer<typeof mentoringStateSchema>;
export type ProgressState = z.infer<typeof progressStateSchema>;
export type Scenario = z.infer<typeof scenarioSchema>;
export type Snapshot = z.infer<typeof snapshotSchema>;
