// Runs axe (WCAG 2.2 AA) on every page in the sitemap, in light and dark mode, at phone and
// desktop widths, and fails on any violation or sideways scrolling. Run after `npm run build`.
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const DIST = new URL('../dist/', import.meta.url).pathname;
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.json': 'application/json', '.xml': 'application/xml' };

const server = createServer((req, res) => {
  let p = join(DIST, decodeURI(new URL(req.url, 'http://x').pathname));
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
  if (!existsSync(p)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': TYPES[extname(p)] ?? 'application/octet-stream' });
  res.end(readFileSync(p));
}).listen(0);
const base = `http://localhost:${server.address().port}`;

const sitemap = readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8');
const paths = [...sitemap.matchAll(/<loc>https:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map((m) => m[1]).concat('/404.html');

const browser = await chromium.launch();
const failures = [];
for (const colorScheme of ['light', 'dark']) {
  for (const width of [320, 1280]) {
    const context = await browser.newContext({ colorScheme, viewport: { width, height: 900 } });
    const page = await context.newPage();
    for (const path of paths) {
      await page.goto(base + path);
      const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
      for (const v of violations) failures.push(`${path} [${colorScheme} ${width}px] ${v.id}: ${v.help} (${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(', ')})`);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 0) failures.push(`${path} [${colorScheme} ${width}px] scrolls sideways by ${overflow}px`);
    }
    await context.close();
  }
}
await browser.close();
server.close();

if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log(`Accessibility OK: ${paths.length} pages, light and dark, 320px and 1280px.`);
