import { createFileRoute } from '@tanstack/react-router';

import { pageHead } from '@/lib/page-head';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { Footer } from '@/blocks/footer';
import { Header } from '@/blocks/header';
import { OnlineApp } from '@/blocks/online-app';

export const Route = createFileRoute('/online')({
  loader: () => {
    const locale = getLocale();
    return {
      locale,
      title: m['wc.on.meta_title']({}, { locale }),
      description: m['wc.on.meta_desc']({}, { locale }),
    };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead(
          '/online',
          loaderData.locale,
          loaderData.title,
          loaderData.description
        )
      : {},
  component: OnlinePage,
});

function OnlinePage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <OnlineApp />
      </main>
      <Footer />
    </div>
  );
}
