import { createFileRoute } from '@tanstack/react-router';

import { pageHead } from '@/lib/page-head';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { DownloadGuide } from '@/blocks/download-guide';
import { Footer } from '@/blocks/footer';
import { Header } from '@/blocks/header';

export const Route = createFileRoute('/download')({
  loader: () => {
    const locale = getLocale();
    return {
      locale,
      title: m['wc.dl.meta_title']({}, { locale }),
      description: m['wc.dl.meta_desc']({}, { locale }),
    };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead(
          '/download',
          loaderData.locale,
          loaderData.title,
          loaderData.description
        )
      : {},
  component: DownloadPage,
});

function DownloadPage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <DownloadGuide />
      </main>
      <Footer />
    </div>
  );
}
