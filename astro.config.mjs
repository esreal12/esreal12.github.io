import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://work.soluciondigital.cr',
  trailingSlash: 'always',
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
