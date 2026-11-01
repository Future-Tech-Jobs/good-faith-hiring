import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

// Satori can't read woff2, so share images use the static woff builds of the same fonts.
const require = createRequire(import.meta.url);
const font = (pkg: string, file: string) => readFileSync(require.resolve(`${pkg}/files/${file}`));

const fonts = [
  { name: 'Bricolage', data: font('@fontsource/bricolage-grotesque', 'bricolage-grotesque-latin-700-normal.woff'), weight: 700 as const, style: 'normal' as const },
  { name: 'Figtree', data: font('@fontsource/figtree', 'figtree-latin-400-normal.woff'), weight: 400 as const, style: 'normal' as const },
  { name: 'Figtree', data: font('@fontsource/figtree', 'figtree-latin-600-normal.woff'), weight: 600 as const, style: 'normal' as const },
];

const C = { bg: '#FBFCFD', ink: '#1D2433', muted: '#5E6878', emp: '#1B6E5C', empTint: '#EAF6F2', cand: '#6650C8', candTint: '#F1EEFC' };

type Node = { type: string; props: Record<string, unknown> & { style?: Record<string, unknown>; children?: unknown } };
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}): Node => ({
  type,
  props: { style, children, ...extra },
});

const markSvg = (size: number) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 30 30"><circle cx="11" cy="15" r="9" fill="${C.emp}" opacity=".85"/><circle cx="19" cy="15" r="9" fill="${C.cand}" opacity=".85"/></svg>`,
  )}`;

export async function shareImage(title: string, kicker: string): Promise<Buffer> {
  const tree = h(
    'div',
    { width: 1200, height: 630, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: C.bg, position: 'relative', fontFamily: 'Figtree' },
    [
      h('div', { position: 'absolute', top: 0, left: 0, width: 600, height: 14, background: C.emp }),
      h('div', { position: 'absolute', top: 0, left: 600, width: 600, height: 14, background: C.cand }),
      h('div', { display: 'flex', alignItems: 'center', gap: 16 }, [
        h('img', { width: 56, height: 56 }, undefined, { src: markSvg(56), width: 56, height: 56 }),
        h('div', { fontFamily: 'Bricolage', fontSize: 34, color: C.ink }, 'Good Faith Hiring'),
      ]),
      h('div', { display: 'flex', flexDirection: 'column', gap: 20 }, [
        h('div', { fontSize: 30, fontWeight: 600, color: C.cand }, kicker),
        h('div', { fontFamily: 'Bricolage', fontSize: title.length > 48 ? 64 : 76, lineHeight: 1.08, color: C.ink, letterSpacing: -1.5, maxWidth: 1000 }, title),
      ]),
      h('div', { fontSize: 26, color: C.muted }, 'goodfaithhiring.co.uk'),
    ],
  );
  const svg = await satori(tree as never, { width: 1200, height: 630, fonts });
  return new Resvg(svg).render().asPng();
}

export function iconPng(size: number, padded = false): Buffer {
  const bg = padded ? `<rect width="30" height="30" fill="${C.bg}"/>` : '';
  const scale = padded ? 'transform="translate(3 3) scale(.8)"' : '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">${bg}<g ${scale}><circle cx="11" cy="15" r="9" fill="${C.emp}" opacity=".85"/><circle cx="19" cy="15" r="9" fill="${C.cand}" opacity=".85"/></g></svg>`;
  return new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();
}
