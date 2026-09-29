// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRuntime, type Persistence } from '../runtime';
import { App } from './App';

afterEach(cleanup);
function storage(): Persistence {
  let data: string | null = null;
  return { read: () => data, write(value) { data = value; } };
}
describe('foundation shell', () => {
  it('opens all four page slots with truthful placeholders', async () => {
    const user = userEvent.setup();
    render(<App runtime={createRuntime({ storage: storage() })} />);
    expect(screen.getByText(/Fictional training/)).toBeVisible();
    const nav = screen.getByRole('navigation', { name: 'Main pages' });
    for (const name of ['Opportunities', 'Judgment workbench', 'My growth', 'Mentor workbench']) {
      await user.click(within(nav).getByRole('button', { name: new RegExp(name) }));
      expect(screen.getByRole('heading', { level: 1, name })).toBeVisible();
      expect(screen.getAllByText('Not implemented').length).toBeGreaterThan(0);
    }
    expect(screen.queryByRole('button', { name: /submit|publish|complete/i })).not.toBeInTheDocument();
  });
  it('persists role switching and activates the selected scenario only when reset is requested', async () => {
    const user = userEvent.setup();
    const backing = storage();
    const view = render(<App runtime={createRuntime({ storage: backing })} />);
    await user.click(screen.getByRole('button', { name: 'Mentor' }));
    expect(screen.getByText('Viewing as mentor')).toBeVisible();
    view.unmount();
    render(<App runtime={createRuntime({ storage: backing })} />);
    expect(screen.getByRole('button', { name: 'Mentor' })).toHaveAttribute('aria-pressed', 'true');
    await user.selectOptions(screen.getByLabelText('Choose a scenario to reset into'), 'growth-checkpoint');
    expect(within(screen.getByRole('region', { name: 'Current demo run' })).getByText('Start from zero')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Reset and load scenario' }));
    expect(within(screen.getByRole('region', { name: 'Current demo run' })).getByText('Growth checkpoint')).toBeVisible();
    expect(screen.getByText(/No simulated history or learning evidence has been loaded/)).toBeVisible();
    expect(screen.getByRole('status')).toHaveTextContent('fresh demo run');
  });
  it('shows a save failure while retaining the previous role and allows retry', async () => {
    const user = userEvent.setup();
    const backing = storage();
    let fail = false;
    render(<App runtime={createRuntime({ storage: { read: backing.read, write(value) { if (fail) throw new Error('Quota'); backing.write(value); } } })} />);
    fail = true;
    await user.click(screen.getByRole('button', { name: 'Mentor' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Could not save');
    expect(screen.getByRole('button', { name: 'Junior' })).toHaveAttribute('aria-pressed', 'true');
    fail = false;
    await user.click(screen.getByRole('button', { name: 'Mentor' }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByText('Viewing as mentor')).toBeVisible();
  });
  it('offers explicit recovery for unsupported saved data', async () => {
    const user = userEvent.setup();
    const backing = storage();
    backing.write('{"schemaVersion":99}');
    render(<App runtime={createRuntime({ storage: backing })} />);
    expect(screen.getByRole('alert')).toHaveTextContent('unsupported');
    expect(screen.getByRole('button', { name: 'Junior' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Reset and load scenario' }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByText('Viewing as junior')).toBeVisible();
  });
});
