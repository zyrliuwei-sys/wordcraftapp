import { createFileRoute } from '@tanstack/react-router';

import { Link } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';
import { pageHead } from '@/lib/page-head';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { Footer } from '@/blocks/footer';
import { Header } from '@/blocks/header';
import { BlogCard } from '@/components/blog-card';
import { getGuides } from '@/content/guides';
import { formatPostDate } from '@/content/posts';
import { getBlogPostsFn } from '@/content/posts/server';

export const Route = createFileRoute('/blog/')({
  loader: async () => {
    const locale = getLocale();
    const posts = await getBlogPostsFn({ data: { locale } });
    return { locale, posts };
  },
  head: ({ loaderData }) => {
    const locale = loaderData?.locale;
    return pageHead(
      '/blog',
      locale ?? 'en',
      `${m['blog.title']({}, { locale })} | ${envConfigs.app_name}`,
      m['blog.description']({}, { locale })
    );
  },
  component: BlogPage,
});

function BlogPage() {
  const { locale, posts } = Route.useLoaderData();

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12">
            <p className="text-redline mb-4 font-mono text-xs uppercase">
              {m['wc.guides.kicker']()}
            </p>
            <h1 className="font-display text-4xl font-normal tracking-tight sm:text-6xl">
              {m['blog.title']()}
            </h1>
            <p className="text-muted-foreground mt-5 max-w-2xl leading-relaxed">
              {m['blog.description']()}
            </p>
          </div>
          <section className="mb-14" aria-labelledby="complete-guides">
            <h2 id="complete-guides" className="font-display mb-6 text-3xl">
              {m['wc.blog.guide_intro']()}
            </h2>
            <div className="grid gap-x-10 sm:grid-cols-2">
              {getGuides(locale).map((guide, i) => (
                <Link
                  key={guide.slug}
                  href={`/${guide.slug}`}
                  className="group border-border flex gap-5 border-t py-6"
                >
                  <span className="text-redline font-mono text-sm">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="group-hover:text-redline font-display text-2xl">
                      {guide.title}
                    </h3>
                    <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                      {guide.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
          <h2 className="font-display mb-6 text-3xl">
            {m['wc.blog.practical']()}
          </h2>
          {posts.length === 0 ? (
            <p className="text-muted-foreground text-center">
              {m['blog.no_posts']()}
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  title={post.title}
                  description={post.description}
                  image={post.image}
                  date={formatPostDate(post.createdAt, locale)}
                  authorName={post.authorName}
                  authorImage={post.authorImage}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
