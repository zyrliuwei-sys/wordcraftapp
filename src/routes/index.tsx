import { createFileRoute } from '@tanstack/react-router';

import { envConfigs } from '@/config';
import { SCREENSHOTS, WORDCRAFT_OFFICIAL } from '@/config/wordcraft';
import { m } from '@/paraglide/messages.js';
import { getLocale, locales, localizeUrl } from '@/paraglide/runtime.js';
import { ComparePreview } from '@/blocks/compare-table';
import { DownloadBento } from '@/blocks/download-bento';
import { Facts } from '@/blocks/facts';
import { FAQ, faqItems } from '@/blocks/faq';
import { FinalCta } from '@/blocks/final-cta';
import { Footer } from '@/blocks/footer';
import { Header } from '@/blocks/header';
import { Hero } from '@/blocks/hero';
import { OnlineSection } from '@/blocks/online-section';
import { StartSteps } from '@/blocks/start-steps';
import { Tour } from '@/blocks/tour';
import { WhatIs } from '@/blocks/what-is';
import { Why } from '@/blocks/why';

export const Route = createFileRoute('/')({
  loader: () => ({ locale: getLocale() }),
  head: ({ loaderData }) => {
    const locale = (loaderData?.locale ?? 'en') as (typeof locales)[number];
    const title = m['common.metadata.title']({}, { locale });
    const description = m['common.metadata.description']({}, { locale });
    const urlFor = (loc: string) =>
      localizeUrl(`${envConfigs.app_url}/`, { locale: loc as any }).href;
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
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: envConfigs.app_name,
            inLanguage: locale,
            publisher: {
              '@type': 'Organization',
              name: envConfigs.app_name,
              url: envConfigs.app_url,
              email: m['wc.footer.support_email'](),
            },
            about: {
              '@type': 'SoftwareApplication',
              name: 'WordCraft',
              url: WORDCRAFT_OFFICIAL,
            },
            url: urlFor(locale),
            image,
            description,
          }),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems().map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          }),
        },
      ],
    };
  },
  component: HomePage,
});

function HomePage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Facts />
        <WhatIs />
        <DownloadBento />
        <OnlineSection />
        <Tour />
        <Why />
        <ComparePreview />
        <StartSteps />
        <FAQ />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
