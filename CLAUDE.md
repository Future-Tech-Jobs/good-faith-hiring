# Good Faith Hiring

A voluntary, two-sided hiring standard: eight paired commitments for employers and candidates, published as a static Astro site at goodfaithhiring.co.uk on Cloudflare (a Worker serving static assets). Founded and maintained by Future Tech Jobs, and built separately from its job boards so it stands on its own.

**This repo is public.** Commercial plans, legal analysis and anything about Future Tech Jobs' own business stay out of it, including commit messages and PR descriptions. Maintainers with access will find the internal plan and legal review in the private `future-tech-jobs-app` repo under `docs/plans/good-faith-hiring*.md`.

## Rules

- **Commitment IDs are permanent.** `GFH-E1`–`GFH-E8` and `GFH-C1`–`GFH-C8` never change or get reused, even when wording does. Job boards store them. The content schema enforces that IDs match the number.
- **One source for commitment text**: `content/commitments/*.md`. The homepage, commitment pages, checklists and `/commitments.json` all read from there; never copy the text into templates.
- **Changes to commitment wording or figures** get a line in `content/changes.yaml`. Once 1.0 is out, the `/v1/` copy is frozen.
- **No tracking, cookies or storage.** No analytics script (Cloudflare's server-side analytics only), no localStorage, no third-party requests. Fonts come from the `@fontsource` packages and are bundled.
- **Hosting** is a Cloudflare Worker serving static assets (`wrangler.jsonc`), deployed by Workers Builds from `main`; other branches get preview URLs and a `noindex` tag.
- **CSP is strict** (`public/_headers`): no inline scripts, styles or `style=""` attributes. JSON-LD blocks are fine.
- **No public complaints about named employers or people**: not on the site, not in GitHub. Reports go to reports@ privately.
- **Copy:** plain UK English, reading age about 12, short active sentences. Candidate commitments never ask anyone to rule themselves out because of a disability or health condition; keep the reasonable-adjustments wording. Never use nationality wording; right to work is always "the right to work in the UK by the start date".
- **Future Tech Jobs is credited, not branded.** Named as founder and maintainer in the footer and About page; no Future Tech Jobs logo or colours.
- **Accessibility:** WCAG 2.2 AA. Run `npm run build && npm run check:links && npm run check:a11y` before pushing; CI also runs Lighthouse (95+ in every category).
- **JavaScript:** only `src/scripts/view.ts` (homepage view toggle and copy-link). Pages must read fully without it.
