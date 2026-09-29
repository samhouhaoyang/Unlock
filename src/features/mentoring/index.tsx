import { FeaturePlaceholder } from '../../app/FeaturePlaceholder';
import type { Attempt, ExperienceCard, MentoringState } from '../../contracts';
import type { FeatureResult, HelpRequestComposerProps, MentoringCommand, MentoringView, MentorPageProps } from '../../contracts/features';

export function MentorPage({ metricsSlot, reviewConcernsSlot }: MentorPageProps) {
  return <><FeaturePlaceholder title="Mentor workbench" description="Previewed requests, replies and approved experience cards will appear here." issue={6} />{metricsSlot}{reviewConcernsSlot}</>;
}
export function HelpRequestComposer(props: HelpRequestComposerProps) {
  void props;
  return <FeaturePlaceholder title="Help request preview" description="Selecting and sharing context with a mentor is not connected yet." issue={6} />;
}
export function mentoringReducer(state: MentoringState, command: MentoringCommand): FeatureResult<MentoringState> {
  void state; void command;
  return { status: 'unavailable', reason: 'Mentoring commands are not implemented.' };
}
export function selectMentoring(state: MentoringState): FeatureResult<MentoringView> {
  void state;
  return { status: 'unavailable', reason: 'Mentoring views are not implemented.' };
}
export function selectPublishedFeedback(state: MentoringState, attempt: Attempt | null): readonly ExperienceCard[] {
  void state; void attempt;
  // Safe placeholder: no shared content is disclosed before real eligibility selection exists.
  return [];
}
