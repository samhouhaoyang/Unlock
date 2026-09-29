import { FeaturePlaceholder } from '../../app/FeaturePlaceholder';
import type { LearningState, ProgressState } from '../../contracts';
import type { FeatureResult, GrowthPageProps, ProgressCommand } from '../../contracts/features';

export function GrowthPage(props: GrowthPageProps) {
  void props;
  return <FeaturePlaceholder title="My growth" description="Evidence and explained support changes will appear here. No evidence has been evaluated by this foundation." issue={8} />;
}
export function progressReducer(state: ProgressState, command: ProgressCommand): FeatureResult<ProgressState> {
  void state; void command;
  return { status: 'unavailable', reason: 'Progress commands are not implemented.' };
}
export function evaluateProgress(state: ProgressState, learning: LearningState): FeatureResult<ProgressState> {
  void state; void learning;
  return { status: 'unavailable', reason: 'Evidence evaluation is not implemented.' };
}
