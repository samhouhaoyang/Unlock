import { describe, expect, it } from 'vitest';
import { createRuntime, type Persistence } from './index';
import { withRecordedActivity } from './fixtures.test-support';

function memoryStorage(): Persistence {
  let saved: string | null = null;
  return { read: () => saved, write: value => { saved = value; } };
}

describe('persisted demo workflow', () => {
  it('can persist a failed retention gate at L4 without fabricating another stage', () => {
    const storage = memoryStorage();
    const runtime = createRuntime({ storage });
    const result = runtime.transact(snapshot => {
      const next = withRecordedActivity(snapshot);
      const skill = next.progress.skills[0]!;
      skill.supportLevel = 4;
      skill.evidenceStates.E2 = { status: 'failed', attemptIds: ['test-attempt'], explanation: 'Retention check failed; support is already L4.' };
      return next;
    });
    expect(result.ok).toBe(true);
    expect(createRuntime({ storage }).read().snapshot?.progress.skills[0]).toMatchObject({
      stageId: 'test-stage', supportLevel: 4, evidenceStates: { E2: { status: 'failed' } },
    });
  });
  it('recovers all feature records together with confidence, disclosure, exposure, and provenance intact', () => {
    const storage = memoryStorage();
    const runtime = createRuntime({ storage });
    expect(runtime.transact(withRecordedActivity).ok).toBe(true);
    const recovered = createRuntime({ storage }).read().snapshot!;
    expect(recovered).toEqual(runtime.read().snapshot);
    expect(recovered.learning.attempts[0]).toMatchObject({ confidence: 0.75, answerRevealed: false, draftRevealed: false, origin: 'session' });
    expect(recovered.learning.teachingAttempts[0]?.origin).toBe('demo_seed');
    expect(recovered.mentoring.requests[0]?.previewText).toBe('Selected context');
    expect(recovered.progress.reviewConcerns[0]?.status).toBe('unresolved');
  });
  it.each(['start-from-zero', 'growth-checkpoint', 'support-restoration'] as const)('reset to %s clears all prior activity and creates a persistent distinct run', scenario => {
    const storage = memoryStorage();
    const runtime = createRuntime({ storage });
    runtime.transact(withRecordedActivity);
    const oldRun = runtime.read().snapshot!.runId;
    expect(runtime.reset(scenario).ok).toBe(true);
    const fresh = createRuntime({ storage }).read().snapshot!;
    expect(fresh.runId).not.toBe(oldRun);
    expect(fresh.scenario).toBe(scenario);
    expect(fresh.scenarioContentStatus).toBe('pending_content');
    expect(fresh.learning).toEqual({ attempts: [], teachingAttempts: [], exposures: [], aiReviewEvents: [], activeAttemptId: null });
    expect(fresh.mentoring).toEqual({ requests: [], experienceCards: [] });
    expect(fresh.progress).toEqual({ skills: [], transitions: [], reviewConcerns: [] });
  });
  it('a failed reset preserves every feature slice and the previous run', () => {
    const backing = memoryStorage();
    let fail = false;
    const runtime = createRuntime({ storage: { read: backing.read, write(value) { if (fail) throw new Error('Quota'); backing.write(value); } } });
    runtime.transact(withRecordedActivity);
    const previous = runtime.read().snapshot;
    fail = true;
    expect(runtime.reset('growth-checkpoint').ok).toBe(false);
    expect(runtime.read().snapshot).toEqual(previous);
    expect(createRuntime({ storage: backing }).read().snapshot).toEqual(previous);
  });
  it('read errors and first-write errors are recoverable rather than showing an unsaved run', () => {
    const denied = createRuntime({ storage: { read() { throw new Error('Denied'); }, write() { throw new Error('Denied'); } } });
    expect(denied.read().snapshot).toBeNull();
    expect(denied.read().error).toContain('read');
    expect(denied.reset('start-from-zero').ok).toBe(false);
    const firstWrite = createRuntime({ storage: { read: () => null, write() { throw new Error('Quota'); } } });
    expect(firstWrite.read().snapshot).toBeNull();
    expect(firstWrite.read().error).toContain('save');
  });
  it('notifies subscribers of persisted changes and supports unsubscribing', () => {
    const storage = memoryStorage();
    const runtime = createRuntime({ storage });
    const observed: string[] = [];
    const unsubscribe = runtime.subscribe(() => {
      observed.push(createRuntime({ storage }).read().snapshot!.role);
    });
    runtime.transact(snapshot => ({ ...snapshot, role: 'mentor' }));
    unsubscribe();
    runtime.transact(snapshot => ({ ...snapshot, role: 'junior' }));
    expect(observed).toEqual(['mentor']);
  });
  it('prevents consumers from mutating committed data outside a transaction', () => {
    const runtime = createRuntime({ storage: memoryStorage() });
    expect(() => { runtime.read().snapshot!.role = 'mentor'; }).toThrow();
    expect(() => { runtime.read().snapshot!.learning.activeAttemptId = 'unsaved'; }).toThrow();
    expect(() => { runtime.read().snapshot = null; }).toThrow();
  });
  it('rejects invalid changes and thrown operations without corrupting the saved run', () => {
    const storage = memoryStorage();
    const runtime = createRuntime({ storage });
    const before = structuredClone(runtime.read().snapshot);
    expect(runtime.transact(snapshot => ({ ...snapshot, schemaVersion: 2 } as unknown as typeof snapshot)).ok).toBe(false);
    expect(runtime.transact(snapshot => { snapshot.role = 'mentor'; throw new Error('Incomplete operation'); }).ok).toBe(false);
    expect(runtime.read().snapshot).toEqual(before);
    expect(createRuntime({ storage }).read().snapshot).toEqual(before);
  });
  it.each(['{"schemaVersion":2}', '{bad-json', '{"schemaVersion":1,"runId":"old"}'])('surfaces unsupported or damaged saved data without replacing it: %s', saved => {
    const storage = memoryStorage();
    storage.write(saved);
    const runtime = createRuntime({ storage });
    expect(runtime.read().snapshot).toBeNull();
    expect(runtime.read().error).toContain('saved data');
    expect(storage.read()).toBe(saved);
    expect(runtime.transact(snapshot => snapshot).ok).toBe(false);
    expect(runtime.reset('start-from-zero').ok).toBe(true);
    expect(runtime.read().snapshot?.scenario).toBe('start-from-zero');
    expect(runtime.read().error).toBeNull();
  });
  it('recovers the same run and simulated role after refresh', () => {
    const storage = memoryStorage();
    const runtime = createRuntime({ storage });
    runtime.transact(snapshot => ({ ...snapshot, role: 'mentor' }));
    const refreshed = createRuntime({ storage });
    expect(refreshed.read().snapshot).toEqual(runtime.read().snapshot);
    expect(refreshed.read().snapshot?.role).toBe('mentor');
    expect(refreshed.read().snapshot?.learning.attempts).toEqual([]);
  });
  it('reports a failed write and preserves the previous committed state in memory and after refresh', () => {
    const backing = memoryStorage();
    let fail = false;
    const runtime = createRuntime({ storage: {
      read: backing.read,
      write(value) { if (fail) throw new Error('Disk full'); backing.write(value); },
    } });
    const before = structuredClone(runtime.read().snapshot);
    fail = true;
    const result = runtime.transact(snapshot => { snapshot.role = 'mentor'; return snapshot; });
    expect(result.ok).toBe(false);
    expect(runtime.read().error).toContain('save');
    expect(runtime.read().snapshot).toEqual(before);
    expect(createRuntime({ storage: backing }).read().snapshot).toEqual(before);
    fail = false;
    expect(runtime.transact(snapshot => ({ ...snapshot, role: 'mentor' })).ok).toBe(true);
    expect(runtime.read().error).toBeNull();
  });
});
