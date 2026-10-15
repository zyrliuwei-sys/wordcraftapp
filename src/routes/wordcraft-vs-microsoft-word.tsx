import { createFileRoute } from '@tanstack/react-router';

import { pageHead } from '@/lib/page-head';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { Footer } from '@/blocks/footer';
import { Header } from '@/blocks/header';
import { Versus } from '@/blocks/versus';

export const Route = createFileRoute('/wordcraft-vs-microsoft-word')({
  loader: () => {
    const locale = getLocale();
    return {
      locale,
      title: m['wc.vs.meta_title']({}, { locale }),
      description: m['wc.vs.meta_desc']({}, { locale }),
    };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead(
          '/wordcraft-vs-microsoft-word',
          loaderData.locale,
          loaderData.title,
          loaderData.description
        )
      : {},
  component: VersusPage,
});

function VersusPage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Versus />
      </main>
      <Footer />
    </div>
  );
}
