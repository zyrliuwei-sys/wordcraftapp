export const GUIDE_SLUGS = [
  'wordcraft-app-guide',
  'wordcraft-guide',
  'wordcraft-online-guide',
  'wordcraft-web-version-guide',
] as const;

export type GuideMeta = {
  title: string;
  description: string;
  updated_at: string;
  guide: true;
  image: string;
  imageAlt: string;
  category: string;
  readingMinutes: number;
  toc: { id: string; title: string }[];
};

const metadata = import.meta.glob<GuideMeta>(
  '/src/content/pages/*guide.*.mdx',
  {
    eager: true,
    import: 'meta',
  }
);

export function getGuides(locale: string) {
  return GUIDE_SLUGS.flatMap((slug) => {
    const meta = metadata[`/src/content/pages/${slug}.${locale}.mdx`];
    return meta ? [{ slug, ...meta }] : [];
  });
}
