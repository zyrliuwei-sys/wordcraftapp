import { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import { buttonVariants } from '@/components/ui/button';

export interface NavLink {
  href: string;
  label: string;
  /** Open in a new tab. Off-site (http) hrefs always open in a new tab. */
  external?: boolean;
}

export interface HeaderCta {
  href: string;
  label: string;
}

/** Off-site URLs render as plain <a>; internal paths use the locale-aware Link. */
const isExternalHref = (href: string) => /^https?:\/\//.test(href);
/** Static files under public/ (e.g. /app/index.html) are not router routes. */
const isStaticFileHref = (href: string) => /\.[a-z0-9]+$/i.test(href);

export function SiteHeader({
  navLinks,
  logoAlt,
  cta,
  secondaryCta,
}: {
  navLinks?: NavLink[];
  logoAlt: string;
  /** Primary public action, such as opening the editor. */
  cta?: HeaderCta;
  secondaryCta?: HeaderCta;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-background/95 border-border sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1264px] items-center justify-between px-4 sm:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <img
            src={envConfigs.app_logo}
            alt={logoAlt}
            width={512}
            height={512}
            className="size-8"
          />
          <span className="font-display text-[21px] leading-none">
            {envConfigs.app_name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-4 xl:flex"
          aria-label="Main navigation"
        >
          {navLinks?.map((link) =>
            isExternalHref(link.href) || isStaticFileHref(link.href) ? (
              <a
                key={link.href}
                href={link.href}
                target={isExternalHref(link.href) ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 xl:flex">
          <ThemeToggle />
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className={buttonVariants({ variant: 'ghost' })}
            >
              {secondaryCta.label}
            </Link>
          )}
          {cta && (
            <a href={cta.href} className={cn(buttonVariants(), 'gap-1.5')}>
              {cta.label}
              <ArrowRight className="size-4" />
            </a>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="p-2 xl:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-border max-h-[calc(100dvh-4rem)] overflow-y-auto border-t px-4 pt-2 pb-4 xl:hidden">
          <nav className="flex flex-col gap-2" aria-label="Main navigation">
            {navLinks?.map((link) =>
              isExternalHref(link.href) || isStaticFileHref(link.href) ? (
                <a
                  key={link.href}
                  href={link.href}
                  target={isExternalHref(link.href) ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md px-3 py-2 text-sm transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md px-3 py-2 text-sm transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
          <div className="border-border mt-3 border-t pt-3">
            <div className="flex items-center justify-between gap-2">
              <ThemeToggle />
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className={buttonVariants({ variant: 'ghost' })}
                  onClick={() => setMobileOpen(false)}
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
            {cta && (
              <a
                href={cta.href}
                className={cn(buttonVariants(), 'mt-3 w-full gap-1.5')}
                onClick={() => setMobileOpen(false)}
              >
                {cta.label}
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
