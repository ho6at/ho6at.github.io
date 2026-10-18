import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://luminoor.studio',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en', 'fa'],
    routing: { prefixDefaultLocale: false },
  },
});
