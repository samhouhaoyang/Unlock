import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createRuntime, browserPersistence } from '../runtime';
import { App } from './App';

const runtime = createRuntime({ storage: browserPersistence() });
createRoot(document.getElementById('root')!).render(<StrictMode><App runtime={runtime} /></StrictMode>);
