import { lazy, type ComponentType } from 'react';

import { baseLocale } from '@/paraglide/runtime.js';

/**
 * Local blog posts written as MDX files in this directory.
 * File naming: `<slug>.<locale>.mdx` (falls back to the base locale).
 * Register every local post slug here — it drives loading and the sitemap.
 *
 * This module is isomorphic (safe in client bundles). Database posts are
 * fetched through the server functions in ./server.ts and merged with the
 * local posts via the pure helpers below.
 */
export const BLOG_POST_SLUGS = [
  'wordcraft-tables-formulas-quotation',
  'wordcraft-comments-track-changes',
  'wordcraft-font-substitution-layout',
  'wordcraft-pdf-vs-docx',
  'wordcraft-docx-garbled-blank-pages',
  'install-wordcraft-linux',
  'wordcraft-headers-footers-page-numbers',
  'wordcraft-image-text-wrapping',
  'wordcraft-mail-merge-letters',
  'wordcraft-vs-google-docs',
  'wordcraft-vs-libreoffice',
  'wordcraft-automatic-table-of-contents',
] as const;

export type BlogPostMeta = {
  title: string;
  description: string;
  created_at: string;
  author_name?: string;
  author_image?: string;
  image?: string;
};

type PostModule = {
  default: ComponentType;
  meta: BlogPostMeta;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  image?: string;
  /** ISO date string — serializable across loader/server-fn boundaries */
  createdAt: string;
  authorName?: string;
  authorImage?: string;
  source: 'local' | 'db';
};

export type BlogPostDetail = BlogPost & {
  /** Raw markdown — set for database posts */
  content?: string;
};

// Only metadata belongs in list/homepage bundles. Article bodies load on demand.
const postMetas = import.meta.glob<BlogPostMeta>('/src/content/posts/*.mdx', {
  eager: true,
  import: 'meta',
});
const postBodies = import.meta.glob<ComponentType>('/src/content/posts/*.mdx', {
  import: 'default',
});
const lazyBodies = new Map<string, ComponentType>();

export function loadLocalPost(slug: string, locale: string): PostModule | null {
  if (!BLOG_POST_SLUGS.includes(slug as (typeof BLOG_POST_SLUGS)[number])) {
    return null;
  }
  const own = `/src/content/posts/${slug}.${locale}.mdx`;
  const key = postMetas[own]
    ? own
    : `/src/content/posts/${slug}.${baseLocale}.mdx`;
  if (!postMetas[key]) return null;
  let Body = lazyBodies.get(key);
  if (!Body) {
    Body = lazy(async () => ({ default: await postBodies[key]() }));
    lazyBodies.set(key, Body);
  }
  return { meta: postMetas[key], default: Body };
}

function localPostToItem(slug: string, meta: BlogPostMeta): BlogPost {
  return {
    slug,
    title: meta.title,
    description: meta.description,
    image: meta.image,
    createdAt: new Date(meta.created_at).toISOString(),
    authorName: meta.author_name,
    authorImage: meta.author_image,
    source: 'local',
  };
}

export function getLocalPosts(locale: string): BlogPost[] {
  return BLOG_POST_SLUGS.map((slug) => ({
    slug: slug as string,
    mod: loadLocalPost(slug, locale),
  }))
    .filter((m): m is { slug: string; mod: PostModule } => m.mod !== null)
    .map(({ slug, mod }) => localPostToItem(slug, mod.meta));
}

/**
 * Merge database posts with local MDX posts, deduped by slug
 * (database wins), newest first.
 */
export function mergePosts(
  dbPosts: BlogPost[],
  localPosts: BlogPost[],
  options: { limit?: number } = {}
): BlogPost[] {
  const dbSlugs = new Set(dbPosts.map((p) => p.slug));
  const merged = [
    ...dbPosts,
    ...localPosts.filter((p) => !dbSlugs.has(p.slug)),
  ].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return options.limit ? merged.slice(0, options.limit) : merged;
}

export function formatPostDate(dateIso: string, locale: string): string {
  return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: locale === 'zh' ? 'long' : 'short',
    day: 'numeric',
  }).format(new Date(dateIso));
}
