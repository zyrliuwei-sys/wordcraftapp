import {
  Bot,
  Check,
  Gauge,
  Lock,
  Minus,
  Terminal,
  Unlock,
  Wallet,
} from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import {
  MS_WORD_URL,
  WORDCRAFT_OFFICIAL,
  WORDCRAFT_WEB_APP,
} from '@/config/wordcraft';
import { m } from '@/paraglide/messages.js';
import { PageHero } from '@/components/page-hero';
import { SectionHeader } from '@/components/section-header';

import { CompareTableBody } from './compare-table';

export function Versus() {
  const wins = [
    { icon: Wallet, t: m['wc.vs.win1.t'](), d: m['wc.vs.win1.d']() },
    { icon: Unlock, t: m['wc.vs.win2.t'](), d: m['wc.vs.win2.d']() },
    { icon: Terminal, t: m['wc.vs.win3.t'](), d: m['wc.vs.win3.d']() },
    { icon: Lock, t: m['wc.vs.win4.t'](), d: m['wc.vs.win4.d']() },
    { icon: Gauge, t: m['wc.vs.win5.t'](), d: m['wc.vs.win5.d']() },
    { icon: Bot, t: m['wc.vs.win6.t'](), d: m['wc.vs.win6.d']() },
  ];
  const wordWins = [
    m['wc.vs.word1'](),
    m['wc.vs.word2'](),
    m['wc.vs.word3'](),
    m['wc.vs.word4'](),
    m['wc.vs.word5'](),
  ];
  const whoWc = [
    m['wc.vs.who_wc1'](),
    m['wc.vs.who_wc2'](),
    m['wc.vs.who_wc3'](),
    m['wc.vs.who_wc4'](),
  ];
  const whoWord = [
    m['wc.vs.who_word1'](),
    m['wc.vs.who_word2'](),
    m['wc.vs.who_word3'](),
  ];
  const tips = [
    m['wc.vs.migrate1'](),
    m['wc.vs.migrate2'](),
    m['wc.vs.migrate3'](),
  ];

  return (
    <>
      <PageHero
        kicker="WordCraft / Microsoft Word"
        title={m['wc.vs.title']()}
        subtitle={m['wc.vs.subtitle']()}
      >
        <div className="flex flex-wrap gap-3">
          <a href={WORDCRAFT_WEB_APP} className="wc-btn wc-btn-primary">
            {m['wc.cta.online']()}
          </a>
          <Link href="/download" className="wc-btn wc-btn-secondary">
            {m['wc.cta.download']()}
          </Link>
        </div>
      </PageHero>

      <section className="wc-container py-16 sm:py-20">
        <SectionHeader title={m['wc.vs.glance']()} />
        <CompareTableBody />
      </section>

      <section className="bg-wash border-border border-y py-20 sm:py-24">
        <div className="wc-container">
          <SectionHeader title={m['wc.vs.wins_title']()} />
          <div className="grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">
            {wins.map((w) => (
              <article key={w.t} className="border-border border-t py-7">
                <w.icon className="text-redline size-6" strokeWidth={1.5} />
                <h3 className="font-display text-foreground mt-5 text-[24px] leading-tight">
                  {w.t}
                </h3>
                <p className="text-muted-foreground mt-2.5 text-[15px] leading-relaxed">
                  {w.d}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wc-container grid gap-12 py-20 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="font-display text-foreground text-[32px] leading-tight sm:text-[38px]">
            {m['wc.vs.word_title']()}
          </h2>
          <ul className="mt-6 grid gap-3">
            {wordWins.map((w) => (
              <li
                key={w}
                className="border-border flex gap-3 border-b pb-3 text-[15px] leading-relaxed"
              >
                <Minus className="text-muted-foreground mt-1 size-4 flex-none" />
                <span className="text-muted-foreground">{w}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-foreground text-[32px] leading-tight sm:text-[38px]">
            {m['wc.vs.who_title']()}
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <WhoCard title={m['wc.vs.who_wc']()} items={whoWc} accent />
            <WhoCard title={m['wc.vs.who_word']()} items={whoWord} />
          </div>
        </div>
      </section>

      <section className="wc-container pb-24">
        <div className="bg-wash grid gap-8 px-6 py-10 sm:px-10 md:grid-cols-[1fr_1.4fr] md:items-start">
          <h2 className="font-display text-foreground text-[30px] leading-tight sm:text-[36px]">
            {m['wc.vs.migrate_title']()}
          </h2>
          <ol className="grid gap-4">
            {tips.map((tip, i) => (
              <li key={tip} className="flex gap-3 text-[15px] leading-relaxed">
                <span className="bg-redline text-background grid size-7 flex-none place-items-center font-mono text-xs">
                  {i + 1}
                </span>
                <span className="text-foreground">{tip}</span>
              </li>
            ))}
          </ol>
        </div>
        <p className="text-muted-foreground mt-6 text-xs leading-relaxed">
          {m['wc.vs.sources']()}{' '}
          <a
            href={WORDCRAFT_OFFICIAL}
            target="_blank"
            rel="noopener noreferrer"
            className="wc-link"
          >
            getartcraft.com
          </a>{' '}
          ·{' '}
          <a
            href={MS_WORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="wc-link"
          >
            microsoft.com
          </a>
        </p>
      </section>
    </>
  );
}

function WhoCard({
  title,
  items,
  accent,
}: {
  title: string;
  items: string[];
  accent?: boolean;
}) {
  return (
    <article
      className={`bg-card border p-6 ${accent ? 'border-redline' : 'border-border'}`}
    >
      <h3
        className={`text-[15px] font-semibold ${accent ? 'text-redline' : 'text-foreground'}`}
      >
        {title}
      </h3>
      <ul className="mt-4 grid gap-2.5">
        {items.map((it) => (
          <li key={it} className="flex gap-2 text-[14px] leading-relaxed">
            <Check
              className={`mt-1 size-3.5 flex-none ${accent ? 'text-redline' : 'text-muted-foreground'}`}
            />
            <span className="text-muted-foreground">{it}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
