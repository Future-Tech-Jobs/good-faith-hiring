# Good Faith Hiring

Eight simple commitments for employers, and eight for the people applying to them. Free to adopt, written in the open.

**[goodfaithhiring.co.uk](https://goodfaithhiring.co.uk)** · Draft 1, published for comment

Good Faith Hiring is founded and maintained by [Future Tech Jobs](https://futuretechjobs.co.uk).

## Suggest a change

- **Wording or figures:** start a thread in [Discussions](https://github.com/Future-Tech-Jobs/good-faith-hiring/discussions). See [CONTRIBUTING.md](CONTRIBUTING.md).
- **Something broken on the site:** open an [issue](https://github.com/Future-Tech-Jobs/good-faith-hiring/issues/new/choose).
- **Not on GitHub:** email hello@goodfaithhiring.co.uk.

Please don't name employers, recruiters or candidates anywhere on GitHub. To report an employer on the adopters list, email reports@goodfaithhiring.co.uk.

## How it's built

A static [Astro](https://astro.build) site, deployed to Cloudflare Pages from `main`.

| Where | What |
| --- | --- |
| `content/commitments/` | One file per commitment pair: the only copy of the commitment text. Every page, checklist and `/commitments.json` reads from here. |
| `content/pages/` | About, adopt, privacy and the two guides |
| `content/changes.yaml` | Version history |
| `content/adopters.yaml` | The adopters list |
| `src/` | Layouts, components, styles and routes |
| `public/` | Headers, robots.txt, favicon, badges |
| `scripts/` | Link and accessibility checks |

```sh
npm install
npm run dev          # http://localhost:4321
npm run build        # outputs dist/
npm run check:links  # after a build
npx playwright install chromium && npm run check:a11y  # after a build
```

Needs Node 22.23 or later (see `.nvmrc`).

## Licence

- The text of the standard (`content/`) is licensed under [CC BY 4.0](LICENSE-CONTENT).
- The code is licensed under [MIT](LICENSE).
- The name "Good Faith Hiring" and the badge are not covered by either licence. See [NOTICE](NOTICE).
