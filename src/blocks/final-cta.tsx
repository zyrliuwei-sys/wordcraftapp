import { Download, MousePointerClick } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { m } from '@/paraglide/messages.js';
import { Reveal } from '@/components/reveal';

/** A blank sheet of paper as the last call to action. */
export function FinalCta() {
  return (
    <section className="bg-wash border-border border-t pt-20 sm:pt-24">
      <Reveal className="wc-container">
        <div className="sheet border-border mx-auto max-w-[860px] border border-b-0 px-6 pt-16 pb-24 text-center sm:px-16 sm:pt-20 sm:pb-32">
          <h2 className="font-display text-foreground text-[44px] leading-[1.05] sm:text-[64px]">
            {m['wc.final.h']()}
            <span
              aria-hidden
              className="bg-redline ml-1 inline-block h-[0.8em] w-[3px] translate-y-[0.1em] animate-pulse motion-reduce:animate-none"
            />
          </h2>
          <p className="text-muted-foreground mx-auto mt-5 max-w-[46ch] text-[16px] leading-relaxed">
            {m['wc.final.sub']()}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href="#wordcraft-editor" className="wc-btn wc-btn-primary">
              <MousePointerClick className="size-4" />
              {m['wc.cta.online']()}
            </a>
            <Link href="/download" className="wc-btn wc-btn-secondary">
              <Download className="size-4" />
              {m['wc.cta.download']()}
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
