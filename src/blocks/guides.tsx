import { ArrowUpRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { SectionHeader } from '@/components/section-header';
import { getGuides } from '@/content/guides';

export function Guides() {
  const guides = getGuides(getLocale());
  return (
    <section id="guides" className="border-border border-t py-20 sm:py-28">
      <div className="wc-container">
        <p className="text-redline mb-4 font-mono text-xs tracking-wider uppercase">
          {m['wc.guides.kicker']()}
        </p>
        <SectionHeader
          title={m['wc.guides.title']()}
          description={m['wc.guides.description']()}
        />
        <div className="grid gap-x-10 sm:grid-cols-2">
          {guides.map((guide, index) => (
            <Link
              key={guide.slug}
              href={`/${guide.slug}`}
              className="group border-border grid grid-cols-[48px_1fr] gap-4 border-t py-7 sm:grid-cols-[64px_1fr]"
            >
              <span className="text-redline font-display text-4xl">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <div className="text-muted-foreground mb-3 flex items-center gap-2 text-xs">
                  <span>{guide.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {m['wc.guides.reading_time']({
                      minutes: guide.readingMinutes,
                    })}
                  </span>
                </div>
                <h3 className="group-hover:text-redline font-display text-2xl leading-tight transition-colors">
                  {guide.title}
                </h3>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {guide.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium">
                  {m['wc.guides.read']()}
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
