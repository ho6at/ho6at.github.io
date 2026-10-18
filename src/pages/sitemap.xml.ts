import type { APIRoute } from 'astro';
import { languages } from '../i18n/languages';
import { landingIds, landingHref } from '../i18n/landings';

// The three language versions of the home page, each listing the others (hreflang), plus the legal page.
export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => new URL(path, site).href;
  const today = new Date().toISOString().slice(0, 10);
  const alternates = [
    ...languages.map((l) => `    <xhtml:link rel="alternate" hreflang="${l.code}" href="${url(l.href)}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${url('/')}"/>`,
  ].join('\n');
  const homes = languages
    .map(
      (l) => `  <url>
    <loc>${url(l.href)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${l.code === 'fr' ? '1.0' : '0.9'}</priority>
${alternates}
  </url>`,
    )
    .join('\n');
  const guides = landingIds
    .flatMap((id) => {
      const alt = [
        ...languages.map((l) => `    <xhtml:link rel="alternate" hreflang="${l.code}" href="${url(landingHref(id, l.code))}"/>`),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${url(landingHref(id, 'fr'))}"/>`,
      ].join('\n');
      return languages.map(
        (l) => `  <url>
    <loc>${url(landingHref(id, l.code))}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
${alt}
  </url>`,
      );
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${homes}
${guides}
  <url>
    <loc>${url('/mentions-legales/')}</loc>
    <lastmod>${today}</lastmod>
    <priority>0.2</priority>
  </url>
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
