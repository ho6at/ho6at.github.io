import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ho6at.github.io',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en', 'fa'],
    routing: { prefixDefaultLocale: false },
  },
});
