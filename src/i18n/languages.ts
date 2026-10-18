// The site's languages, in the order the language picker and switch show them.
export const languages = [
  { code: 'fr', href: '/', short: 'FR', name: 'Français', cta: 'Continuer en français', dir: 'ltr' },
  { code: 'en', href: '/en/', short: 'EN', name: 'English', cta: 'Continue in English', dir: 'ltr' },
  { code: 'fa', href: '/fa/', short: 'فا', name: 'فارسی', cta: 'ادامه با زبان فارسی', dir: 'rtl' },
] as const;

export type LangCode = (typeof languages)[number]['code'];
