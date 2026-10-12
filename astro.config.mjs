import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.SITE_URL ?? 'https://esreal12.github.io';
const base = process.env.BASE_PATH;

export default defineConfig({
  output: 'static',
  site,
  integrations: [sitemap()],
  ...(base ? { base } : {}),
  trailingSlash: 'always',
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
