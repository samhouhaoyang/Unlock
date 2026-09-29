import type { ReactNode } from 'react';
import type {
  Attempt, Case, Confidence, ExperienceCard, HelpRequest, LearningState, MentoringState, Origin, ProgressState, ReviewDecision,
  Snapshot, StructuredAnswer, SupportLevel, Task,
} from './index';

/** Unavailable placeholders cannot be mistaken for successfully executed commands. */
export type FeatureResult<T> = { status: 'ready'; value: T } | { status: 'unavailable'; reason: string };
export type LearningCommand =
  | { type: 'open'; attempt: Attempt }
  | { type: 'resume'; attemptId: string }
  | { type: 'disclose-help'; attemptId: string; level: SupportLevel }
  | { type: 'submit'; attemptId: string; answer: StructuredAnswer; confidence: Confidence }
  | { type: 'reveal-draft'; attemptId: string }
  | { type: 'review-draft'; attemptId: string; decision: ReviewDecision }
  | { type: 'exit-check'; attemptId: string }
  | { type: 'record-exposure'; exposure: LearningState['exposures'][number] };
export type MentoringCommand =
  | { type: 'draft-request'; request: HelpRequest }
  | { type: 'preview-request' | 'send-request' | 'cancel-request'; requestId: string }
  | { type: 'reply'; requestId: string; text: string; author: string }
  | { type: 'edit-card'; card: ExperienceCard }
  | { type: 'publish-card'; cardId: string };
export type ProgressCommand =
  | { type: 'evaluate'; attempt: Attempt }
  | { type: 'restore'; skillId: string; level: SupportLevel; actor: string; reason: string }
  | { type: 'resolve-concern'; concernId: string; actor: string; reason: string };

export interface LearningPageProps {
  state: Readonly<LearningState>;
  cases: readonly Case[];
  supportLevel: SupportLevel | null;
  onCommand?: (command: LearningCommand) => void;
  onHelpRequest?: (attemptId: string) => void;
  feedbackSlot?: ReactNode;
}
export interface MentorPageProps {
  state: Readonly<MentoringState>;
  onCommand?: (command: MentoringCommand) => void;
  metricsSlot?: ReactNode;
  reviewConcernsSlot?: ReactNode;
}
export interface HelpRequestComposerProps {
  selectedContext: HelpRequest['selectedContext'];
  onCommand?: (command: MentoringCommand) => void;
  onClose?: () => void;
}
export interface GrowthPageProps {
  state: Readonly<ProgressState>;
  onCommand?: (command: ProgressCommand) => void;
}
export interface OpportunitiesPageProps {
  tasks: readonly Task[];
  onOpenCase?: (caseId: string) => void;
}
export interface MetricsPanelProps { observations: Pick<Snapshot, 'learning' | 'progress'> }
export interface LearningView { activeAttempt: Attempt | null }
export interface MentoringView { requests: readonly HelpRequest[]; cards: readonly ExperienceCard[] }
export interface MetricsView { incorrectDraftAcceptance: { accepted: number; revealed: number; origin: Origin }[] }
