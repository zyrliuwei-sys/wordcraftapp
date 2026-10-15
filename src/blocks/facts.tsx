import { m } from '@/paraglide/messages.js';

export function Facts() {
  const facts = [
    [m['wc.fact.price'](), m['wc.fact.price_l']()],
    [m['wc.fact.license'](), m['wc.fact.license_l']()],
    [m['wc.fact.commands'](), m['wc.fact.commands_l']()],
    [m['wc.fact.ribbon'](), m['wc.fact.ribbon_l']()],
  ];
  return (
    <section className="border-border border-y">
      <dl className="wc-container bg-border grid grid-cols-2 gap-px lg:grid-cols-4">
        {facts.map(([value, label]) => (
          <div key={label} className="bg-background px-1 py-8 sm:px-6 sm:py-10">
            <dt className="font-display text-foreground text-[34px] leading-none tabular-nums sm:text-[44px]">
              {value}
            </dt>
            <dd className="text-muted-foreground mt-3 max-w-[230px] text-[13.5px] leading-snug">
              {label}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
