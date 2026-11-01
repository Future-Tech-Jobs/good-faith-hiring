// Checks every internal link and #anchor in the built site resolves. Run after `npm run build`.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const SITE = 'https://goodfaithhiring.co.uk';

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
  });

const pages = walk(DIST);
const ids = new Map(pages.map((p) => [p, new Set([...readFileSync(p, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))]));

const resolve = (path) => {
  const clean = decodeURI(path.split('?')[0]);
  const candidates = clean.endsWith('/') ? [join(DIST, clean, 'index.html')] : [join(DIST, clean), join(DIST, clean, 'index.html')];
  return candidates.find((c) => existsSync(c) && statSync(c).isFile());
};

const errors = [];
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const from = '/' + relative(DIST, page);
  for (const [, raw] of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    let url = raw.replaceAll('&amp;', '&');
    if (url.startsWith(SITE)) url = url.slice(SITE.length) || '/';
    if (/^(https?:|mailto:|data:)/.test(url)) continue;
    const [path, hash] = url.split('#');
    const target = path === '' ? page : resolve(path.startsWith('/') ? path : join('/', relative(DIST, page), '..', path));
    if (!target) { errors.push(`${from}: missing ${url}`); continue; }
    if (path && !path.endsWith('/') && target.endsWith('index.html') && !path.includes('.')) errors.push(`${from}: no trailing slash on ${url}`);
    if (hash && target.endsWith('.html') && !['hiring', 'applying'].includes(hash) && !ids.get(target)?.has(hash)) errors.push(`${from}: missing anchor ${url}`);
  }
}

if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Links OK across ${pages.length} pages.`);
