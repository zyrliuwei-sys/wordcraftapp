import {
  Bot,
  FileText,
  Keyboard,
  MonitorSmartphone,
  ShieldCheck,
  Zap,
} from 'lucide-react';

import { m } from '@/paraglide/messages.js';
import { Reveal } from '@/components/reveal';

export function Why() {
  const items = [
    {
      icon: Keyboard,
      t: m['wc.why.familiar.title'](),
      d: m['wc.why.familiar.desc'](),
    },
    {
      icon: FileText,
      t: m['wc.why.files.title'](),
      d: m['wc.why.files.desc'](),
    },
    { icon: Zap, t: m['wc.why.fast.title'](), d: m['wc.why.fast.desc']() },
    {
      icon: MonitorSmartphone,
      t: m['wc.why.everywhere.title'](),
      d: m['wc.why.everywhere.desc'](),
    },
    { icon: Bot, t: m['wc.why.agents.title'](), d: m['wc.why.agents.desc']() },
    {
      icon: ShieldCheck,
      t: m['wc.why.private.title'](),
      d: m['wc.why.private.desc'](),
    },
  ];

  return (
    <section className="wc-container grid gap-12 pb-24 sm:pb-32 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <h2 className="font-display text-foreground text-[36px] leading-[1.1] sm:text-[48px]">
          {m['wc.whyh.h']()}
        </h2>
        <p className="text-muted-foreground mt-5 max-w-[44ch] text-[16px] leading-relaxed">
          {m['wc.whyh.sub']()}
        </p>
      </div>
      <Reveal className="grid gap-x-10 sm:grid-cols-2">
        {items.map((item) => (
          <article key={item.t} className="border-border border-t py-7">
            <item.icon className="text-redline size-6" strokeWidth={1.5} />
            <h3 className="font-display text-foreground mt-5 text-[24px] leading-tight">
              {item.t}
            </h3>
            <p className="text-muted-foreground mt-2.5 text-[15px] leading-relaxed">
              {item.d}
            </p>
          </article>
        ))}
      </Reveal>
    </section>
  );
}
