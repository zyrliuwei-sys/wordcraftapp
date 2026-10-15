import { useState } from 'react';
import { Plus } from 'lucide-react';

import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';

export function faqItems() {
  return [
    { q: m['wc.faq.site.q'](), a: m['wc.faq.site.a']() },
    { q: m['wc.faq.free.q'](), a: m['wc.faq.free.a']() },
    { q: m['wc.faq.artcraft.q'](), a: m['wc.faq.artcraft.a']() },
    { q: m['wc.faq.who.q'](), a: m['wc.faq.who.a']() },
    { q: m['wc.faq.docx.q'](), a: m['wc.faq.docx.a']() },
    { q: m['wc.faq.ready.q'](), a: m['wc.faq.ready.a']() },
    { q: m['wc.faq.safe.q'](), a: m['wc.faq.safe.a']() },
    { q: m['wc.faq.online.q'](), a: m['wc.faq.online.a']() },
    { q: m['wc.faq.req.q'](), a: m['wc.faq.req.a']() },
    { q: m['wc.faq.ai.q'](), a: m['wc.faq.ai.a']() },
    { q: m['wc.faq.support.q'](), a: m['wc.faq.support.a']() },
  ];
}

export function FAQ() {
  const items = faqItems();
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="wc-container scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-[780px]">
        <h2 className="font-display text-foreground text-center text-[36px] leading-[1.1] sm:text-[48px]">
          {m['wc.faq.title']()}
        </h2>
        <div className="border-border mt-12 border-t">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-border border-b">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="text-foreground hover:text-redline flex w-full items-center justify-between gap-6 py-6 text-left text-[17px] font-medium transition-colors"
                  >
                    {item.q}
                    <Plus
                      className={cn(
                        'text-redline size-5 flex-none transition-transform duration-200',
                        isOpen && 'rotate-45'
                      )}
                    />
                  </button>
                </h3>
                <div
                  className={cn(
                    'grid transition-[grid-template-rows] duration-200',
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  )}
                >
                  <p className="text-muted-foreground overflow-hidden pr-10 text-[15.5px] leading-relaxed">
                    <span className="block pb-6">{item.a}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
