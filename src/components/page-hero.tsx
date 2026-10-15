import type { ReactNode } from 'react';

/** Inner-page header: paper wash, serif title, optional actions. */
export function PageHero({
  kicker,
  title,
  subtitle,
  children,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-wash border-border border-b">
      <div className="wc-container py-16 sm:py-20">
        {kicker && (
          <p className="text-redline mb-5 font-mono text-[12.5px]">{kicker}</p>
        )}
        <h1 className="font-display text-foreground max-w-[18ch] text-[44px] leading-[1.05] sm:text-[64px]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted-foreground mt-6 max-w-[60ch] text-[17px] leading-relaxed">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-9">{children}</div>}
      </div>
    </section>
  );
}
