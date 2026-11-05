import { Link } from '@/core/i18n/navigation';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { getGuides, type GuideMeta } from '@/content/guides';

export function GuideContents({ meta }: { meta: GuideMeta }) {
  return (
    <nav
      aria-label={m['wc.common.on_this_page']()}
      className="bg-wash border-border my-8 border-y px-5 py-6"
    >
      <p className="text-redline mb-4 font-mono text-xs uppercase">
        {m['wc.common.on_this_page']()}
      </p>
      <ol className="grid gap-3 text-sm sm:grid-cols-2">
        {meta.toc.map((item, index) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="hover:text-redline flex gap-3">
              <span className="text-muted-foreground font-mono text-xs">
                {String(index + 1).padStart(2, '0')}
              </span>
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function GuideNextSteps({ slug }: { slug: string }) {
  return (
    <aside className="border-border mt-14 border-t pt-8">
      <h2 className="font-display text-3xl">{m['wc.guides.related']()}</h2>
      <ul className="my-6 grid gap-4">
        {getGuides(getLocale())
          .filter((guide) => guide.slug !== slug)
          .map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/${guide.slug}`}
                className="hover:text-redline text-sm underline underline-offset-4"
              >
                {guide.title}
              </Link>
            </li>
          ))}
      </ul>
      <div className="bg-wash p-6">
        <p className="text-muted-foreground mb-5 text-sm leading-relaxed">
          {m['wc.guides.next_description']()}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="wc-btn wc-btn-secondary">
            {m['common.pages.back_to_home']()}
          </Link>
          <Link href="/online" className="wc-btn wc-btn-primary">
            {m['wc.cta.online']()}
          </Link>
        </div>
      </div>
    </aside>
  );
}
