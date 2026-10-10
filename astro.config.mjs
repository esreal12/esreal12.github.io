import { defineConfig } from 'astro/config';

const site = process.env.SITE_URL ?? 'https://work.soluciondigital.cr';
const base = process.env.BASE_PATH;

export default defineConfig({
  output: 'static',
  site,
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
