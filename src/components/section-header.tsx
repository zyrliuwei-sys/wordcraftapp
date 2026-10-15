import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/** Serif section title with an optional body line and action, stacked. */
export function SectionHeader({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mb-12 max-w-[720px]', className)}>
      <h2 className="font-display text-foreground text-[36px] leading-[1.1] sm:text-[48px]">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground mt-4 max-w-[62ch] text-[16px] leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
