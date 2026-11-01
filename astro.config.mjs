import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://goodfaithhiring.co.uk',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // The CSP allows no inline styles or scripts, so everything ships as a file.
    inlineStylesheets: 'never',
  },
  vite: {
    build: { assetsInlineLimit: 0 },
  },
  integrations: [
    sitemap({ filter: (page) => !page.includes('/404') }),
  ],
});
