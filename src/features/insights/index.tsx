import { FeaturePlaceholder } from '../../app/FeaturePlaceholder';
import type { FeatureResult, MetricsPanelProps, MetricsView } from '../../contracts/features';

export function MetricsPanel(props: MetricsPanelProps) {
  void props;
  return <FeaturePlaceholder title="Mentor metrics" description="Metrics will distinguish live observations from labelled simulated history. No rates have been calculated yet." issue={10} />;
}
export function selectMetrics(observations: MetricsPanelProps['observations']): FeatureResult<MetricsView> {
  void observations;
  return { status: 'unavailable', reason: 'Metrics are not implemented.' };
}
