import { useState } from 'react';
import {
  Check,
  Download,
  Maximize2,
  MonitorSmartphone,
  ShieldCheck,
} from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import {
  SCREENSHOTS,
  WORDCRAFT_VERSION,
  WORDCRAFT_WEB_APP,
} from '@/config/wordcraft';
import { m } from '@/paraglide/messages.js';
import { BrowserEditor } from '@/components/browser-editor';
import { PageHero } from '@/components/page-hero';

export function OnlineApp() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <PageHero
        kicker={`WebAssembly · v${WORDCRAFT_VERSION}`}
        title={m['wc.on.title']()}
        subtitle={m['wc.on.subtitle']()}
      >
        <a
          href={WORDCRAFT_WEB_APP}
          className="wc-btn wc-btn-primary min-h-12 px-6 text-[15px]"
        >
          <Maximize2 className="size-4" />
          {m['wc.cta.online']()}
        </a>
        <p className="text-muted-foreground mt-3 text-[13px]">
          {m['wc.on.size_note']()}
        </p>
      </PageHero>

      <section className="wc-container py-16 sm:py-20">
        <h2 className="font-display text-foreground mb-6 text-[30px] sm:text-[36px]">
          {m['wc.on.preview_title']()}
        </h2>
        <BrowserEditor
          id="online-editor"
          src={WORDCRAFT_WEB_APP}
          title={m['wc.on.title']()}
          active={loaded}
          onActivate={() => setLoaded(true)}
          loadLabel={m['wc.on.preview_load']()}
          poster={{
            src: `${SCREENSHOTS.backstage}-1600.webp`,
            alt: m['wc.on.poster_alt'](),
            width: 1600,
            height: 1000,
          }}
        />
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[13px]">
          <a
            href={WORDCRAFT_WEB_APP}
            target="_blank"
            rel="noopener noreferrer"
            className="wc-link"
          >
            {m['wc.on.open_tab']()} ↗
          </a>
          <a
            href={`${WORDCRAFT_WEB_APP}?webgl`}
            target="_blank"
            rel="noopener noreferrer"
            className="wc-link"
          >
            {m['wc.on.compatibility']()} ↗
          </a>
        </div>
        <div className="text-muted-foreground mt-4 grid gap-2 text-[13px] leading-relaxed">
          <p>{m['wc.on.preview_hint']()}</p>
          <p>{m['wc.on.fonts_hint']()}</p>
          <p>{m['wc.on.save_hint']()}</p>
        </div>
      </section>

      <section className="wc-container grid gap-5 pb-24 md:grid-cols-3">
        <InfoCard icon={MonitorSmartphone} title={m['wc.on.req_title']()}>
          <ul className="grid gap-2.5">
            {[m['wc.on.req1'](), m['wc.on.req2'](), m['wc.on.req3']()].map(
              (r) => (
                <li key={r} className="flex gap-2">
                  <Check className="text-redline mt-1 size-3.5 flex-none" />
                  <span>{r}</span>
                </li>
              )
            )}
          </ul>
        </InfoCard>
        <InfoCard icon={ShieldCheck} title={m['wc.on.privacy_title']()}>
          <p>{m['wc.on.privacy_desc']()}</p>
        </InfoCard>
        <InfoCard icon={Download} title={m['wc.on.vs_desktop_title']()}>
          <p>{m['wc.on.vs_desktop_desc']()}</p>
          <Link href="/download" className="wc-link mt-4 inline-block">
            {m['wc.common.full_guide']()} →
          </Link>
        </InfoCard>
      </section>
    </>
  );
}

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Check;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="bg-card border-border border p-7">
      <Icon className="text-redline mb-6 size-7" strokeWidth={1.6} />
      <h3 className="font-display text-foreground text-[22px]">{title}</h3>
      <div className="text-muted-foreground mt-3 text-[14px] leading-relaxed">
        {children}
      </div>
    </article>
  );
}
