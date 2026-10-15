import { ArrowRight, Download, FileOutput, FolderOpen } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { m } from '@/paraglide/messages.js';
import { Reveal } from '@/components/reveal';

export function StartSteps() {
  const steps = [
    { icon: Download, t: m['wc.start.a_t'](), d: m['wc.start.a_d']() },
    { icon: FolderOpen, t: m['wc.start.b_t'](), d: m['wc.start.b_d']() },
    { icon: FileOutput, t: m['wc.start.c_t'](), d: m['wc.start.c_d']() },
  ];
  return (
    <section className="bg-wash border-border border-y">
      <Reveal className="wc-container py-20 sm:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-foreground text-[36px] leading-[1.1] sm:text-[48px]">
            {m['wc.start.h']()}
          </h2>
          <Link
            href="/tutorials"
            className="wc-link inline-flex items-center gap-1.5 text-[15px]"
          >
            {m['wc.start.link']()}
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <ol className="border-border mt-12 grid border-t md:grid-cols-[1.15fr_1fr_1fr]">
          {steps.map((s, i) => (
            <li
              key={s.t}
              className={
                'border-border py-8 md:px-8 md:first:pl-0 ' +
                (i > 0 ? 'border-t md:border-t-0 md:border-l' : '')
              }
            >
              <s.icon className="text-redline size-6" strokeWidth={1.5} />
              <h3 className="text-foreground mt-5 text-[17px] font-semibold">
                {s.t}
              </h3>
              <p className="text-muted-foreground mt-2 max-w-[38ch] text-[15px] leading-relaxed">
                {s.d}
              </p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
