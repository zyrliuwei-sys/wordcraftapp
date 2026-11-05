import { lazy, Suspense, type ComponentType } from 'react';
import { notFound, useLoaderData } from '@tanstack/react-router';

import { envConfigs } from '@/config';
import { pageHead } from '@/lib/page-head';
import { m } from '@/paraglide/messages.js';
import {
  baseLocale,
  getLocale,
  locales,
  localizeUrl,
} from '@/paraglide/runtime.js';
import { GuideContents, GuideNextSteps } from '@/blocks/guide-reading';
import type { GuideMeta } from '@/content/guides';

type PageMeta =
  | {
      title: string;
      description: string;
      updated_at: string;
      guide?: false;
    }
  | GuideMeta;

// Page metadata is bundled eagerly (loader/head need it synchronously); the
// MDX bodies are split into their own chunks and loaded on demand, so the
// legal text isn't part of every page's entry JS. Keys are absolute from the
// project root.
const metas = import.meta.glob<PageMeta>('/src/content/pages/*.mdx', {
  eager: true,
  import: 'meta',
});
const bodies = import.meta.glob<ComponentType>('/src/content/pages/*.mdx', {
  import: 'default',
});

function pageKey(slug: string, locale: string): string | null {
  const own = `/src/content/pages/${slug}.${locale}.mdx`;
  if (metas[own]) return own;
  const base = `/src/content/pages/${slug}.${baseLocale}.mdx`;
  return metas[base] ? base : null;
}

const lazyBodies = new Map<string, ComponentType>();
function pageBody(key: string): ComponentType {
  let Body = lazyBodies.get(key);
  if (!Body) {
    Body = lazy(async () => ({ default: await bodies[key]() }));
    lazyBodies.set(key, Body);
  }
  return Body;
}

type LoaderData = { meta: PageMeta; slug: string; locale: string };

// Shared route options for static MDX pages. Each page gets its own
// explicit route file (e.g. privacy-policy.tsx) so static segments
// always outrank dynamic ones — add a new page by creating the MDX
// content plus a thin route file using this factory.
export function staticPageRouteOptions(slug: string) {
  return {
    loader: (): LoaderData => {
      const locale = getLocale();
      const key = pageKey(slug, locale);
      if (!key) throw notFound();
      return { meta: metas[key], slug, locale };
    },
    head: ({ loaderData }: { loaderData?: LoaderData }) => {
      if (!loaderData) return {};
      const { meta, locale } = loaderData;
      const canonical = localizeUrl(`${envConfigs.app_url}/${slug}`, {
        locale: locale as ReturnType<typeof getLocale>,
      }).href;
      if (meta.guide) {
        const head = pageHead(`/${slug}`, locale, meta.title, meta.description);
        const image = `${envConfigs.app_url}${meta.image}-1600.webp`;
        return {
          ...head,
          meta: [
            ...head.meta.map((tag) =>
              tag.property === 'og:type'
                ? { ...tag, content: 'article' }
                : tag.property === 'og:image'
                  ? { ...tag, content: image }
                  : tag
            ),
            { property: 'og:image:alt', content: meta.imageAlt },
          ],
          scripts: [
            {
              type: 'application/ld+json',
              children: JSON.stringify({
                '@context': 'https://schema.org',
                '@graph': [
                  {
                    '@type': 'Article',
                    headline: meta.title,
                    description: meta.description,
                    image,
                    datePublished: meta.updated_at,
                    dateModified: meta.updated_at,
                    inLanguage: locale,
                    mainEntityOfPage: canonical,
                    author: {
                      '@type': 'Organization',
                      name: envConfigs.app_name,
                      url: envConfigs.app_url,
                    },
                    publisher: {
                      '@type': 'Organization',
                      name: envConfigs.app_name,
                      url: envConfigs.app_url,
                    },
                  },
                  {
                    '@type': 'BreadcrumbList',
                    itemListElement: [
                      {
                        '@type': 'ListItem',
                        position: 1,
                        name: envConfigs.app_name,
                        item: localizeUrl(`${envConfigs.app_url}/`, {
                          locale: locale as ReturnType<typeof getLocale>,
                        }).href,
                      },
                      {
                        '@type': 'ListItem',
                        position: 2,
                        name: meta.title,
                        item: canonical,
                      },
                    ],
                  },
                ],
              }).replace(/</g, '\\u003c'),
            },
          ],
        };
      }
      return {
        meta: [
          { title: meta.title },
          { name: 'description', content: meta.description },
        ],
        links: [
          { rel: 'canonical', href: canonical },
          ...locales.map((loc) => ({
            rel: 'alternate',
            hrefLang: loc,
            href: localizeUrl(`${envConfigs.app_url}/${slug}`, { locale: loc })
              .href,
          })),
        ],
      };
    },
    component: StaticPage,
  };
}

function StaticPage() {
  const { meta, slug, locale } = useLoaderData({
    strict: false,
  }) as LoaderData;

  const Content = pageBody(pageKey(slug, locale)!);

  return (
    <article>
      <header className="border-border mb-6 border-b pb-5">
        {meta.guide && (
          <p className="text-redline mb-4 font-mono text-xs uppercase">
            {meta.category}
          </p>
        )}
        <h1
          className={
            meta.guide
              ? 'font-display text-foreground text-4xl leading-[1.1] md:text-5xl'
              : 'text-foreground text-3xl font-semibold tracking-tight md:text-4xl'
          }
        >
          {meta.title}
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">{meta.description}</p>
        <p className="text-muted-foreground mt-2 text-xs">
          {m['common.pages.last_updated']()}: {meta.updated_at}
          {meta.guide && (
            <>
              {' '}
              · {m['wc.guides.reading_time']({ minutes: meta.readingMinutes })}
            </>
          )}
        </p>
      </header>
      {meta.guide && <GuideContents meta={meta} />}
      <div
        className={
          meta.guide
            ? 'wc-prose [&_h2]:scroll-mt-24 [&_h3]:scroll-mt-24'
            : 'text-foreground/90 text-[15px] leading-7'
        }
      >
        <Suspense fallback={null}>
          <Content />
        </Suspense>
      </div>
      {meta.guide && <GuideNextSteps slug={slug} />}
    </article>
  );
}
