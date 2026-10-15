import { createFileRoute } from '@tanstack/react-router';

import { pageHead } from '@/lib/page-head';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { Footer } from '@/blocks/footer';
import { Header } from '@/blocks/header';
import { Tutorial } from '@/blocks/tutorial';

export const Route = createFileRoute('/tutorials')({
  loader: () => {
    const locale = getLocale();
    return {
      locale,
      title: m['wc.tut.meta_title']({}, { locale }),
      description: m['wc.tut.meta_desc']({}, { locale }),
    };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead(
          '/tutorials',
          loaderData.locale,
          loaderData.title,
          loaderData.description
        )
      : {},
  component: TutorialsPage,
});

function TutorialsPage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Tutorial />
      </main>
      <Footer />
    </div>
  );
}
