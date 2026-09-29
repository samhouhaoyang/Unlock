import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve, relative, dirname, extname } from 'node:path';
import { pathToFileURL } from 'node:url';

const excluded = new Set(['.git', 'node_modules', 'dist', 'coverage', '.scratch', 'playwright-report', 'test-results']);

export function markdownFiles(root) {
  const files = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (excluded.has(entry.name) || entry.isSymbolicLink()) continue;
    const path = resolve(root, entry.name);
    if (entry.isDirectory()) files.push(...markdownFiles(path));
    else if (extname(path) === '.md') files.push(path);
  }
  return files;
}

export function checkDocs(root) {
  let checked = 0;
  const failures = [];
  const files = markdownFiles(root);
  for (const file of files) {
    const text = readFileSync(file, 'utf8').replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm, '');
    for (const match of text.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
      const href = match[1].trim().replace(/^<|>$/g, '');
      if (/^(?:https?:|mailto:|data:|#)/i.test(href)) continue;
      const target = href.split('#')[0];
      if (!target) continue;
      checked++;
      const path = resolve(dirname(file), decodeURIComponent(target));
      if (!existsSync(path)) failures.push(relative(root, file) + ' -> ' + href);
    }
  }
  if (failures.length) throw new Error('Broken local links:\n' + failures.join('\n'));
  return { files: files.length, links: checked };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const result = checkDocs(process.cwd());
  console.log('Documentation: ' + result.links + ' local links across ' + result.files + ' files passed.');
}
