import { envConfigs } from '@/config';
import { SCREENSHOTS } from '@/config/wordcraft';
import { locales, localizeUrl } from '@/paraglide/runtime.js';

/** Title/description/canonical/hreflang/OG tags for a public marketing page. */
export function pageHead(
  path: string,
  locale: string,
  title: string,
  description: string
) {
  const urlFor = (loc: string) =>
    localizeUrl(`${envConfigs.app_url}${path}`, {
      locale: loc as (typeof locales)[number],
    }).href;
  const image = `${envConfigs.app_url}${SCREENSHOTS.hero}-1600.webp`;
  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: image },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'canonical', href: urlFor(locale) },
      ...locales.map((loc) => ({
        rel: 'alternate',
        hrefLang: loc,
        href: urlFor(loc),
      })),
      { rel: 'alternate', hrefLang: 'x-default', href: urlFor('en') },
    ],
  };
}
