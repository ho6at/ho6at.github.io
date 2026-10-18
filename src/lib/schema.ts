// Structured data (schema.org JSON-LD) for a home page: who Luminoor is, what it offers and at what price,
// and its frequently asked questions. Search engines read this to show rich results.
import { site } from '../site';
import type fr from '../i18n/fr';

export function homeSchema(t: typeof fr, pageUrl: string, siteUrl: string) {
  const business = {
    '@type': ['ProfessionalService', 'LocalBusiness'],
    '@id': `${siteUrl}#business`,
    name: 'Luminoor Paris',
    alternateName: 'Luminoor',
    description: t.meta.description,
    url: pageUrl,
    logo: `${siteUrl}brand/luminoor-logo.png`,
    image: `${siteUrl}og.jpg`,
    email: site.email,
    sameAs: [site.instagram],
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    address: { '@type': 'PostalAddress', addressLocality: 'Paris', addressCountry: 'FR' },
    areaServed: { '@type': 'City', name: 'Paris' },
    knowsLanguage: ['fr', 'en', 'fa'],
    founder: { '@type': 'Person', name: t.about.people[0]?.name, jobTitle: t.about.people[0]?.role },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t.sessions.title,
      itemListElement: t.sessions.packages.map((p) => ({
        '@type': 'Offer',
        name: `${p.name} — ${p.duration}`,
        description: [p.places, p.photos, p.bonus, p.style].filter(Boolean).join('. '),
        price: p.price,
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        itemOffered: { '@type': 'Service', name: `${t.sessions.title} — ${p.name}`, areaServed: 'Paris' },
      })),
    },
  };
  const faq = {
    '@type': 'FAQPage',
    mainEntity: t.faq.items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
  const website = {
    '@type': 'WebSite',
    '@id': `${siteUrl}#website`,
    name: 'Luminoor Paris',
    url: siteUrl,
    inLanguage: t.lang,
    publisher: { '@id': `${siteUrl}#business` },
  };
  return { '@context': 'https://schema.org', '@graph': [business, website, faq] };
}
