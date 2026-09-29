import { existsSync, readFileSync, readdirSync, appendFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { checkDocs } from './check-docs.mjs';
import { validateBacklog } from './check-backlog.mjs';

function run(command, args, shell = false) {
  const result = spawnSync(command, args, { stdio: 'inherit', shell });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(command + ' ' + args.join(' ') + ' failed.');
}

const docs = checkDocs(process.cwd());
const backlog = validateBacklog(JSON.parse(readFileSync('docs/backlog.json', 'utf8')));
console.log('Passed ' + docs.links + ' local links and ' + backlog.stories + ' story definitions.');
const tests = readdirSync('scripts/tests').filter(file => file.endsWith('.test.mjs')).map(file => 'scripts/tests/' + file);
run(process.execPath, ['--test', ...tests]);

if (existsSync('content')) {
  if (!existsSync('scripts/check-content.mjs')) throw new Error('Content requires scripts/check-content.mjs.');
  run(process.execPath, ['scripts/check-content.mjs']);
}

if (existsSync('package.json')) {
  if (!existsSync('package-lock.json')) throw new Error('Commit package-lock.json with the app manifest.');
  const manifest = JSON.parse(readFileSync('package.json', 'utf8'));
  for (const script of ['typecheck', 'lint', 'test', 'build']) {
    if (!manifest.scripts?.[script]) throw new Error('The app must provide npm run ' + script + '.');
  }
  run('npm', ['ci'], process.platform === 'win32');
  for (const script of ['typecheck', 'lint', 'test', 'build']) run('npm', ['run', script], process.platform === 'win32');
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, 'Documentation, backlog, tooling tests, type checking, lint, app tests, and build passed.\n');
} else {
  if (existsSync('src') || existsSync('index.html')) throw new Error('Application files require a package manifest and all application gates.');
  console.log('Documentation/tooling checks passed. The application has not been scaffolded; no app tests or build are claimed.');
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, 'Documentation, backlog, and tooling tests passed. No application scaffold exists yet.\n');
}
