import { Download, MessageSquareText, MousePointerClick } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import {
  PRIMARY_DOWNLOAD,
  SCREENSHOTS,
  shotSrcSet,
  WORDCRAFT_WEB_APP,
} from '@/config/wordcraft';
import { m } from '@/paraglide/messages.js';
import { useDetectedOS } from '@/hooks/use-detected-os';

const OS_LABEL = { windows: 'Windows', macos: 'macOS', linux: 'Linux' };

export function Hero() {
  const os = useDetectedOS();

  return (
    <section className="relative overflow-hidden">
      <div className="wc-container grid gap-10 pt-14 pb-14 sm:pt-20 lg:grid-cols-[minmax(0,1fr)_250px] lg:gap-14 lg:pt-24">
        <div className="min-w-0">
          <h1 className="font-display text-foreground text-[44px] leading-[1.06] sm:text-[62px] lg:text-[78px]">
            {m['wc.home.h1_a']()}{' '}
            <del className="redline-anim-del no-underline">
              {m['wc.home.h1_del']()}
            </del>
            <br className="hidden sm:block" /> {m['wc.home.h1_b']()}{' '}
            <ins className="redline-anim-ins no-underline">
              {m['wc.home.h1_ins']()}
            </ins>
            .
          </h1>
          <p className="text-muted-foreground mt-7 max-w-[540px] text-lg leading-relaxed">
            {m['wc.home.sub']()}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            {os ? (
              <a href={PRIMARY_DOWNLOAD[os]} className="wc-btn wc-btn-primary">
                <Download className="size-4" />
                {m['wc.cta.download']()}
                <span className="text-primary-foreground/60 font-normal">
                  {OS_LABEL[os]}
                </span>
              </a>
            ) : (
              <Link href="/download" className="wc-btn wc-btn-primary">
                <Download className="size-4" />
                {m['wc.cta.download']()}
              </Link>
            )}
            <a href={WORDCRAFT_WEB_APP} className="wc-btn wc-btn-secondary">
              <MousePointerClick className="size-4" />
              {m['wc.cta.online']()}
            </a>
          </div>
        </div>

        {/* Margin comment, like WordCraft's Review pane. */}
        <aside
          aria-hidden
          className="redline-anim-comment relative hidden self-start lg:mt-6 lg:block"
        >
          <span className="border-redline absolute top-5 -left-14 w-14 border-t border-dashed" />
          <div className="border-redline bg-redline-wash border-l-2 px-4 py-3.5">
            <p className="text-redline flex items-center gap-1.5 text-[12px] font-semibold">
              <MessageSquareText className="size-3.5" />
              {m['wc.home.comment_author']()}
            </p>
            <p className="text-foreground mt-1.5 text-[14px] leading-snug">
              {m['wc.home.comment']()}
            </p>
          </div>
        </aside>
      </div>

      <div className="wc-container">
        <figure className="sheet border-border relative -mb-px border">
          <img
            src={`${SCREENSHOTS.hero}-1600.webp`}
            srcSet={shotSrcSet(SCREENSHOTS.hero)}
            sizes="(min-width: 1264px) 1200px, 100vw"
            width={1600}
            height={1000}
            alt={m['wc.home.shot_alt']()}
            fetchPriority="high"
            className="block h-auto w-full"
          />
        </figure>
      </div>
    </section>
  );
}
