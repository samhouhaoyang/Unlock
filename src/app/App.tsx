import { useRef, useState, useSyncExternalStore } from 'react';
import type { Role, ScenarioId } from '../contracts';
import { scenarios, type Runtime } from '../runtime';
import { OpportunitiesPage } from '../features/opportunities';
import { LearningPage } from '../features/learning';
import { GrowthPage } from '../features/progress';
import { MentorPage } from '../features/mentoring';
import { MetricsPanel } from '../features/insights';
import { FeaturePlaceholder } from './FeaturePlaceholder';
import './styles.css';

const pages = [
  { id: 'opportunities', title: 'Opportunities', subtitle: 'Find a judgment worth practising.' },
  { id: 'learning', title: 'Judgment workbench', subtitle: 'Make your judgment before reviewing AI.' },
  { id: 'growth', title: 'My growth', subtitle: 'Understand the evidence behind your support.' },
  { id: 'mentor', title: 'Mentor workbench', subtitle: 'Turn a useful explanation into shared experience.' },
] as const;
type Page = typeof pages[number]['id'];

export function App({ runtime }: { runtime: Runtime }) {
  const { snapshot, error } = useSyncExternalStore(runtime.subscribe, runtime.read);
  const [page, setPage] = useState<Page>('opportunities');
  const [selectedScenario, setSelectedScenario] = useState<ScenarioId>(snapshot?.scenario ?? 'start-from-zero');
  const [notice, setNotice] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  const activePage = pages.find(item => item.id === page)!;
  function navigate(next: Page) {
    setPage(next);
    requestAnimationFrame(() => heading.current?.focus());
  }
  function switchRole(role: Role) {
    const result = runtime.transact(current => ({ ...current, role }));
    if (result.ok) {
      setNotice(`Simulated role changed to ${role}.`);
      navigate(role === 'mentor' ? 'mentor' : 'opportunities');
    } else setNotice('');
  }
  function reset() {
    const result = runtime.reset(selectedScenario);
    if (result.ok) { setNotice('A fresh demo run has started. Previous local activity was cleared.'); navigate('opportunities'); }
    else setNotice('');
  }
  return <div className="app-shell">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="topbar">
      <a className="brand" href="#main" aria-label="Unlock home">Unlock<span>AI apprenticeship</span></a>
      <div className="simulation-label">Fictional training · same-browser simulation</div>
      <div className="role-control" role="group" aria-label="Simulated role">
        <button disabled={!snapshot} aria-pressed={snapshot?.role === 'junior'} onClick={() => switchRole('junior')}>Junior</button>
        <button disabled={!snapshot} aria-pressed={snapshot?.role === 'mentor'} onClick={() => switchRole('mentor')}>Mentor</button>
      </div>
    </header>
    <div className="workspace">
      <aside className="sidebar">
        <p className="eyebrow">Workspace</p>
        <nav aria-label="Main pages">{pages.map((item, index) =>
          <button key={item.id} aria-current={page === item.id ? 'page' : undefined} onClick={() => navigate(item.id)}>
            <span className="nav-number">0{index + 1}</span>{item.title}
          </button>)}</nav>
        <section className="scenario-controls" aria-labelledby="scenario-heading">
          <h2 id="scenario-heading">Demo scenario</h2>
          <label htmlFor="scenario">Choose a scenario to reset into</label>
          <select id="scenario" value={selectedScenario} onChange={event => setSelectedScenario(event.target.value as ScenarioId)}>
            {scenarios.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
          <p>{scenarios.find(item => item.id === selectedScenario)?.description}</p>
          <button className="reset-button" onClick={reset}>Reset and load scenario</button>
          <p className="muted">Reset clears this run's local attempts, requests, progress and session cards.</p>
        </section>
      </aside>
      <main id="main" tabIndex={-1}>
        <div role="status" className="notice">{notice}</div>
        {error && <div role="alert" className="error"><strong>Demo could not be updated</strong><p>{error}</p></div>}
        <p className="eyebrow">Cross-period expense allocation</p>
        <h1 ref={heading} tabIndex={-1}>{activePage.title}</h1>
        <p className="page-intro">{activePage.subtitle}</p>
        {snapshot ? <>
          <section className="run-banner" aria-label="Current demo run">
            <div><span className="eyebrow">Active scenario</span><strong>{snapshot.scenarioLabel}</strong><span>Viewing as {snapshot.role}</span></div>
            <div><span className="status-label">Foundation only</span><p>Scenario content is pending. No simulated history or learning evidence has been loaded.</p></div>
          </section>
          {page === 'opportunities' && <OpportunitiesPage tasks={[]} />}
          {page === 'learning' && <LearningPage state={snapshot.learning} cases={[]} supportLevel={null} />}
          {page === 'growth' && <GrowthPage state={snapshot.progress} />}
          {page === 'mentor' && <MentorPage state={snapshot.mentoring}
            metricsSlot={<MetricsPanel observations={snapshot} />}
            reviewConcernsSlot={<FeaturePlaceholder title="Review concerns" description="Mentor review of evidence concerns will be connected here." issue={8} />} />}
          <footer>Saved locally in this browser · Run <span className="run-id">{snapshot.runId}</span></footer>
        </> : <section className="feature-placeholder"><h2>Saved demo unavailable</h2><p>Use the reset control to explicitly replace unsupported data, or allow browser storage and reload.</p></section>}
      </main>
    </div>
  </div>;
}
