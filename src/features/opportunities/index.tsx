import { FeaturePlaceholder } from '../../app/FeaturePlaceholder';
import type { Task } from '../../contracts';
import type { FeatureResult, OpportunitiesPageProps } from '../../contracts/features';

export function OpportunitiesPage(props: OpportunitiesPageProps) {
  void props;
  return <FeaturePlaceholder title="Today's growth opportunities" description="Work opportunities and their learning value and delivery risk will appear here." issue={9} />;
}
export function selectOpportunities(tasks: readonly Task[]): FeatureResult<readonly Task[]> {
  void tasks;
  return { status: 'unavailable', reason: 'Opportunity routing is not implemented.' };
}
