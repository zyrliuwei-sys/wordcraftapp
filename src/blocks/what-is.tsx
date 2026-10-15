import { ArrowUpRight } from 'lucide-react';

import { WORDCRAFT_OFFICIAL, WORDCRAFT_REPO } from '@/config/wordcraft';
import { m } from '@/paraglide/messages.js';
import { Reveal } from '@/components/reveal';

export function WhatIs() {
  return (
    <Reveal as="section" className="wc-container py-24 sm:py-32">
      <article className="mx-auto max-w-[68ch]">
        <h2 className="font-display text-foreground text-[38px] leading-[1.1] sm:text-[52px]">
          {m['wc.what.h']()}
        </h2>
        <div className="text-muted-foreground mt-8 space-y-5 text-[17px] leading-[1.8]">
          <p className="wc-dropcap text-foreground">{m['wc.what.p1']()}</p>
          <p>{m['wc.what.p2']()}</p>
          <p>{m['wc.what.p3']()}</p>
          <p>{m['wc.what.p4']()}</p>
        </div>
        <div className="border-border mt-9 flex flex-wrap gap-x-7 gap-y-3 border-t pt-6 text-[14px]">
          <a
            href={WORDCRAFT_OFFICIAL}
            target="_blank"
            rel="noopener noreferrer"
            className="wc-link inline-flex items-center gap-1"
          >
            getartcraft.com/apps/wordcraft
            <ArrowUpRight className="size-3.5" />
          </a>
          <a
            href={WORDCRAFT_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="wc-link inline-flex items-center gap-1"
          >
            github.com/storytold/wordcraft
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </article>
    </Reveal>
  );
}
