// Client reviews for the home page. The section stays hidden until there is at least one; add real reviews only,
// in the client's own words (with their agreement), in the language they wrote them in.
// e.g. { name: 'Sara & Adam', from: 'Toronto', text: '…', lang: 'en' }

export interface Review {
  name: string;
  from: string; // where they came from
  text: string;
  lang: 'fr' | 'en' | 'fa';
}

export const reviews: Review[] = [];

export const reviewsTitle = { fr: 'Ils ont été repérés', en: 'They were spotted', fa: 'دیده‌شده‌ها' };
