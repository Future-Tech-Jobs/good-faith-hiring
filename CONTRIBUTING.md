# Contributing

Thanks for helping. There are two kinds of change, and they work differently.

## Changing the commitments

The wording and figures of the commitments are the standard itself, so changes go slowly and in the open.

1. **Propose it** in [Discussions](https://github.com/Future-Tech-Jobs/good-faith-hiring/discussions) under "Proposals". Say which commitment (for example GFH-E4), what you'd change, and why. If you're not on GitHub, email hello@goodfaithhiring.co.uk.
2. **Discuss it.** Maintainers and anyone else can comment.
3. **A maintainer opens a pull request** for agreed proposals. Cloudflare posts a preview link on it.
4. **A reviewer approves it.** Changes to commitment wording or figures need one outside reviewer's approval.
5. **It's merged and listed** in `content/changes.yaml`, which deploys the site.

Rules every change must keep:

- **IDs are permanent.** `GFH-E1`–`GFH-E8` and `GFH-C1`–`GFH-C8` never change or get reused.
- **Disability and adjustments.** No candidate commitment may ask someone to rule themselves out because of a disability or health condition. Keep the reasonable-adjustments wording.
- **No nationality wording.** Right to work is always "the right to work in the UK by the start date".
- **Plain UK English.** Short, active sentences; a reading age of about 12.

Once version 1.0 is published, its text is frozen at `/v1/`. Wording fixes become 1.x. Changed figures or new commitments become 2.0.

## Fixing the site

Bugs, typos, accessibility and layout fixes are welcome as issues or pull requests. CI builds the site and runs link, accessibility (axe, WCAG 2.2 AA) and Lighthouse checks; keep them green.

The site has no tracking, no cookies and no third-party requests. Please keep it that way: no analytics scripts, embeds, web fonts from a CDN or external images.

## Please don't post personal data

Don't name or describe employers, recruiters, candidates or anyone else in issues, discussions or pull requests. We'll remove posts that do. To report an employer on the adopters list, email reports@goodfaithhiring.co.uk.
