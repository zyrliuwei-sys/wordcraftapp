import type { ComponentType, SVGProps } from 'react';
import { ArrowRight, Download } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { PRIMARY_DOWNLOAD, SCREENSHOTS, shotSrcSet } from '@/config/wordcraft';
import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { useDetectedOS, type DesktopOS } from '@/hooks/use-detected-os';
import { AppleIcon, LinuxIcon, WindowsIcon } from '@/components/os-icons';
import { Reveal } from '@/components/reveal';
import { SectionHeader } from '@/components/section-header';

interface Tile {
  id: DesktopOS;
  name: string;
  desc: string;
  file: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export function DownloadBento() {
  const os = useDetectedOS();
  const tiles: Tile[] = [
    {
      id: 'windows',
      name: 'Windows',
      desc: m['wc.dlh.windows'](),
      file: '.msi  x64',
      icon: WindowsIcon,
    },
    {
      id: 'macos',
      name: 'macOS',
      desc: m['wc.dlh.macos'](),
      file: '.dmg  Universal',
      icon: AppleIcon,
    },
    {
      id: 'linux',
      name: 'Linux',
      desc: m['wc.dlh.linux'](),
      file: '.AppImage  x86_64',
      icon: LinuxIcon,
    },
  ];

  return (
    <Reveal as="section" className="wc-container pb-24 sm:pb-32">
      <div id="download" className="scroll-mt-24" />
      <SectionHeader title={m['wc.dlh.h']()} description={m['wc.dlh.sub']()} />

      <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
        {tiles.map((t, i) => {
          const featured = i === 0;
          const mine = os === t.id;
          return (
            <article
              key={t.id}
              className={cn(
                'relative flex flex-col overflow-hidden border p-7 transition-colors',
                featured
                  ? 'bg-sheet sheet lg:col-span-2 lg:row-span-2 lg:p-9'
                  : i === 1
                    ? 'bg-wash'
                    : 'bg-sheet',
                mine ? 'border-redline' : 'border-border'
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <t.icon className="text-foreground size-7" />
                {mine && (
                  <span className="text-redline text-[12px] font-semibold">
                    {m['wc.dlh.detected']()}
                  </span>
                )}
              </div>
              <h3
                className={cn(
                  'font-display text-foreground mt-6',
                  featured ? 'text-[40px]' : 'text-[30px]'
                )}
              >
                {t.name}
              </h3>
              <p className="text-muted-foreground mt-2 max-w-[44ch] text-[14.5px] leading-relaxed">
                {t.desc}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                <a
                  href={PRIMARY_DOWNLOAD[t.id]}
                  className={cn(
                    'wc-btn',
                    featured || mine ? 'wc-btn-primary' : 'wc-btn-secondary'
                  )}
                >
                  <Download className="size-4" />
                  {m['wc.cta.download']()}
                </a>
                <span className="text-muted-foreground font-mono text-[12px] whitespace-pre">
                  {t.file}
                </span>
              </div>
              {featured && (
                <div className="border-border mt-9 -mr-9 -mb-9 hidden flex-1 overflow-hidden border-t border-l lg:block">
                  <img
                    src={`${SCREENSHOTS.dark}-1600.webp`}
                    srcSet={shotSrcSet(SCREENSHOTS.dark)}
                    sizes="800px"
                    width={1600}
                    height={1000}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover object-left-top"
                  />
                </div>
              )}
            </article>
          );
        })}
      </div>

      <Link
        href="/download"
        className="wc-link mt-8 inline-flex items-center gap-1.5 text-[15px]"
      >
        {m['wc.dlh.all']()}
        <ArrowRight className="size-4" />
      </Link>
    </Reveal>
  );
}
