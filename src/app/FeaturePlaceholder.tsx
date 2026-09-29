export function FeaturePlaceholder({ title, description, issue }: { title: string; description: string; issue: number }) {
  return <section className="feature-placeholder" aria-label={title}>
    <span className="status-label">Not implemented</span>
    <h2>{title}</h2>
    <p>{description}</p>
    <p className="muted">Planned in issue #{issue}. No learning activity or evidence is recorded here.</p>
  </section>;
}
