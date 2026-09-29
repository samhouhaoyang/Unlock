import { snapshotSchema, type ScenarioId, type Snapshot } from '../contracts';

export interface Persistence { read(): string | null; write(value: string): void }
export interface RuntimeView { snapshot: Snapshot | null; error: string | null }
export type TransactionResult = { ok: true } | { ok: false; error: string };
export interface Runtime {
  read(): RuntimeView;
  subscribe(listener: () => void): () => void;
  transact(update: (snapshot: Snapshot) => Snapshot): TransactionResult;
  reset(scenario: ScenarioId): TransactionResult;
}
export const scenarios: ReadonlyArray<{ id: ScenarioId; label: string; description: string }> = [
  { id: 'start-from-zero', label: 'Start from zero', description: 'A fresh run with no historical evidence.' },
  { id: 'growth-checkpoint', label: 'Growth checkpoint', description: 'Reserved for the labelled simulated history and live transfer demonstration.' },
  { id: 'support-restoration', label: 'Support restoration', description: 'Reserved for the separate simulated retention and restoration demonstration.' },
];

function freeze<T>(value: T): T {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
}

function freshSnapshot(scenario: ScenarioId): Snapshot {
  return {
    schemaVersion: 1, runId: crypto.randomUUID(), scenario,
    scenarioLabel: scenarios.find(item => item.id === scenario)!.label,
    scenarioContentStatus: 'pending_content', role: 'junior',
    learning: { attempts: [], teachingAttempts: [], exposures: [], aiReviewEvents: [], activeAttemptId: null },
    mentoring: { requests: [], experienceCards: [] },
    progress: { skills: [], transitions: [], reviewConcerns: [] },
  };
}

export function createRuntime({ storage }: { storage: Persistence }): Runtime {
  const listeners = new Set<() => void>();
  let view: RuntimeView = { snapshot: null, error: null };
  function reject(error: string): TransactionResult {
    view = freeze({ ...view, error });
    listeners.forEach(listener => listener());
    return { ok: false, error };
  }
  function commit(snapshot: Snapshot): TransactionResult {
    const parsed = snapshotSchema.safeParse(snapshot);
    if (!parsed.success) return reject('This change does not match the supported data format. Your last saved state is unchanged.');
    snapshot = parsed.data;
    try { storage.write(JSON.stringify(snapshot)); }
    catch { return reject('Could not save this change. Your last saved state is unchanged. Free browser storage or allow site storage, then retry.'); }
    view = freeze({ snapshot, error: null });
    listeners.forEach(listener => listener());
    return { ok: true };
  }
  try {
    const saved = storage.read();
    if (saved === null) commit(freshSnapshot('start-from-zero'));
    else {
      try { view = freeze({ snapshot: snapshotSchema.parse(JSON.parse(saved)), error: null }); }
      catch { reject('Your saved data is unsupported or damaged. Reset explicitly to start a new demo run.'); }
    }
  } catch { reject('Could not read saved data. Allow browser storage and reload, or explicitly reset the demo.'); }
  return {
    read: () => view,
    subscribe(listener) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    transact(update) {
      if (!view.snapshot) return reject('No saved data is available. Reset the demo before continuing.');
      let next: Snapshot;
      try { next = update(structuredClone(view.snapshot)); }
      catch { return reject('Could not complete this change. Your last saved state is unchanged.'); }
      return commit(next);
    },
    reset(scenario) { return commit(freshSnapshot(scenario)); },
  };
}

export function browserPersistence(): Persistence {
  const key = 'unlock.snapshot.v1';
  return { read: () => window.localStorage.getItem(key), write: value => window.localStorage.setItem(key, value) };
}
