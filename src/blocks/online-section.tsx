import { ArrowRight, MousePointerClick } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { SCREENSHOTS, shotSrcSet } from '@/config/wordcraft';
import { m } from '@/paraglide/messages.js';
import { Reveal } from '@/components/reveal';

export function OnlineSection() {
  return (
    <section className="bg-wash border-border overflow-hidden border-y">
      <Reveal className="wc-container grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div>
          <h2 className="font-display text-foreground text-[36px] leading-[1.1] sm:text-[48px]">
            {m['wc.onh.h']()}
          </h2>
          <p className="text-muted-foreground mt-5 max-w-[52ch] text-[16px] leading-relaxed">
            {m['wc.onh.p']()}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href="#wordcraft-editor" className="wc-btn wc-btn-primary">
              <MousePointerClick className="size-4" />
              {m['wc.cta.online']()}
            </a>
            <Link
              href="/online"
              className="wc-link inline-flex items-center gap-1 text-[14px]"
            >
              {m['wc.onh.more']()}
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
        <figure className="sheet border-border border lg:-mr-[12vw]">
          <img
            src={`${SCREENSHOTS.references}-1600.webp`}
            srcSet={shotSrcSet(SCREENSHOTS.references)}
            sizes="(min-width: 1024px) 760px, 100vw"
            width={1600}
            height={1000}
            alt="WordCraft References tab with a table of contents"
            loading="lazy"
            className="block h-auto w-full"
          />
        </figure>
      </Reveal>
    </section>
  );
}
