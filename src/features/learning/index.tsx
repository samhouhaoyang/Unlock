import { FeaturePlaceholder } from '../../app/FeaturePlaceholder';
import type { LearningState } from '../../contracts';
import type { FeatureResult, LearningCommand, LearningPageProps, LearningView } from '../../contracts/features';

export function LearningPage({ feedbackSlot }: LearningPageProps) {
  return <><FeaturePlaceholder title="Judgment workbench" description="Your judgment, confidence and chosen help will appear here before you review the AI draft." issue={5} />{feedbackSlot}</>;
}
export function learningReducer(state: LearningState, command: LearningCommand): FeatureResult<LearningState> {
  void state; void command;
  return { status: 'unavailable', reason: 'Learning commands are not implemented (issues #5 and #7).' };
}
export function selectLearning(state: LearningState): FeatureResult<LearningView> {
  void state;
  return { status: 'unavailable', reason: 'Learning views are not implemented.' };
}
