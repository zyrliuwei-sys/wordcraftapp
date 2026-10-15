import type { ComponentType, SVGProps } from 'react';
import { Download, ExternalLink, Globe, Package, Play } from 'lucide-react';

import {
  CHECKSUMS_URL,
  DOWNLOADS,
  PRIMARY_DOWNLOAD,
  releaseAsset,
  WORDCRAFT_RELEASE_DATE,
  WORDCRAFT_RELEASES,
  WORDCRAFT_VERSION,
  WORDCRAFT_WEB_APP,
  type PlatformId,
} from '@/config/wordcraft';
import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { useDetectedOS } from '@/hooks/use-detected-os';
import { CodeBlock } from '@/components/code-block';
import { AppleIcon, LinuxIcon, WindowsIcon } from '@/components/os-icons';
import { PageHero } from '@/components/page-hero';

const OS_LABEL = { windows: 'Windows', macos: 'macOS', linux: 'Linux' };

export function DownloadGuide() {
  const os = useDetectedOS();
  const v = WORDCRAFT_VERSION;

  return (
    <>
      <PageHero
        kicker={`v${v} · ${m['wc.common.released']()} ${WORDCRAFT_RELEASE_DATE}`}
        title={m['wc.dl.title']()}
        subtitle={m['wc.dl.subtitle']()}
      >
        <div className="flex flex-wrap items-center gap-3">
          {os ? (
            <a href={PRIMARY_DOWNLOAD[os]} className="wc-btn wc-btn-primary">
              <Download className="size-4" />
              {m['wc.dl.for_you']()} · {OS_LABEL[os]}
            </a>
          ) : (
            <a href="#windows" className="wc-btn wc-btn-primary">
              <Download className="size-4" />
              {m['wc.cta.download']()}
            </a>
          )}
          <a href={WORDCRAFT_WEB_APP} className="wc-btn wc-btn-secondary">
            <Play className="size-4" />
            {m['wc.cta.online']()}
          </a>
        </div>
        <p className="text-muted-foreground mt-4 text-[13px]">
          {m['wc.dl.not_sure']()}
        </p>
      </PageHero>

      <div className="wc-container grid gap-14 py-16 lg:grid-cols-[220px_1fr] lg:gap-16 lg:py-20">
        <nav className="hidden lg:block">
          <div className="sticky top-24 grid gap-2 text-[13px]">
            <p className="text-muted-foreground mb-1 text-[11px] font-semibold tracking-[0.12em] uppercase">
              {m['wc.common.on_this_page']()}
            </p>
            {[
              ['#windows', 'Windows'],
              ['#macos', 'macOS'],
              ['#linux', 'Linux'],
              ['#other', m['wc.dl.other']()],
              ['#verify', m['wc.dl.verify_title']()],
              ['#troubleshooting', m['wc.dl.trouble_title']()],
              ['#source', m['wc.dl.source_title']()],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="text-muted-foreground hover:text-redline"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        <div className="min-w-0">
          <Platform
            id="windows"
            name="Windows"
            icon={WindowsIcon}
            highlight={os === 'windows'}
            steps={[
              m['wc.dl.win.s1'](),
              m['wc.dl.win.s2'](),
              m['wc.dl.win.s3'](),
            ]}
          />
          <Platform
            id="macos"
            name="macOS"
            icon={AppleIcon}
            highlight={os === 'macos'}
            steps={[
              m['wc.dl.mac.s1'](),
              m['wc.dl.mac.s2'](),
              m['wc.dl.mac.s3'](),
            ]}
          />
          <Platform
            id="linux"
            name="Linux"
            icon={LinuxIcon}
            highlight={os === 'linux'}
            steps={[
              m['wc.dl.linux.s1'](),
              m['wc.dl.linux.s2'](),
              m['wc.dl.linux.s3'](),
            ]}
            code={[
              `chmod +x wordcraft-${v}-linux-x86_64.AppImage`,
              `./wordcraft-${v}-linux-x86_64.AppImage`,
              '',
              `sudo apt install ./wordcraft-${v}-linux-x86_64.deb`,
              `sudo dnf install ./wordcraft-${v}-linux-x86_64.rpm`,
              `flatpak install --user ./wordcraft-${v}-linux-x86_64.flatpak`,
            ].join('\n')}
          />
          <Platform id="other" name={m['wc.dl.other']()} icon={Package} />

          <section
            id="verify"
            className="wc-prose border-border scroll-mt-24 border-t pt-4"
          >
            <h2>{m['wc.dl.verify_title']()}</h2>
            <p>{m['wc.dl.verify_desc']()}</p>
            <CodeBlock
              code={[
                '# macOS / Linux',
                `shasum -a 256 wordcraft-${v}-macos-universal.dmg`,
                '# Windows (PowerShell)',
                `Get-FileHash .\\wordcraft-${v}-windows-x64.msi -Algorithm SHA256`,
              ].join('\n')}
            />
            <a href={CHECKSUMS_URL} className="wc-link text-[14px]">
              {m['wc.dl.checksums']()}
            </a>
          </section>

          <section
            id="troubleshooting"
            className="wc-prose border-border mt-14 scroll-mt-24 border-t pt-4"
          >
            <h2>{m['wc.dl.trouble_title']()}</h2>
            <h3>{m['wc.dl.trouble.win_gpu.q']()}</h3>
            <p>{m['wc.dl.trouble.win_gpu.a']()}</p>
            <CodeBlock
              code={[
                '$env:WGPU_BACKEND = "vulkan"',
                '& .\\wordcraft.exe',
                'Remove-Item Env:WGPU_BACKEND',
              ].join('\n')}
            />
            <h3>{m['wc.dl.trouble.old_pc.q']()}</h3>
            <p>{m['wc.dl.trouble.old_pc.a']()}</p>
            <h3>{m['wc.dl.trouble.logs.q']()}</h3>
            <p>{m['wc.dl.trouble.logs.a']()}</p>
          </section>

          <section
            id="source"
            className="wc-prose border-border mt-14 scroll-mt-24 border-t pt-4"
          >
            <h2>{m['wc.dl.source_title']()}</h2>
            <p>{m['wc.dl.source_desc']()}</p>
            <CodeBlock
              code={[
                'git clone https://github.com/storytold/wordcraft',
                'cd wordcraft',
                'cargo run --release -p wordcraft -- --sample',
              ].join('\n')}
            />
            <p>
              <a
                href={WORDCRAFT_RELEASES}
                target="_blank"
                rel="noopener noreferrer"
                className="wc-link inline-flex items-center gap-1"
              >
                {m['wc.dl.older']()}
                <ExternalLink className="size-3.5" />
              </a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

function Platform({
  id,
  name,
  icon: Icon,
  highlight,
  steps,
  code,
}: {
  id: PlatformId;
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  highlight?: boolean;
  steps?: string[];
  code?: string;
}) {
  return (
    <section id={id} className="mb-14 scroll-mt-24">
      <div className="mb-6 flex items-center gap-3">
        <Icon className="text-foreground size-7" />
        <h2 className="font-display text-foreground text-[30px]">{name}</h2>
        {highlight && (
          <span className="bg-redline text-background px-2 py-0.5 text-[11px] font-semibold">
            {m['wc.hero.detected']()}
          </span>
        )}
      </div>

      <div className="border-border divide-border divide-y border">
        {DOWNLOADS[id].map((group) => (
          <div
            key={group.title}
            className="grid gap-3 px-5 py-4 sm:grid-cols-[230px_1fr] sm:items-center"
          >
            <p className="text-foreground text-[13px] font-semibold">
              {group.title}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.files.map((f) => (
                <a
                  key={f.file}
                  href={releaseAsset(f.file)}
                  title={f.file.replaceAll('<ver>', WORDCRAFT_VERSION)}
                  className={cn(
                    'wc-btn min-h-9 px-3.5 text-[13px]',
                    f.recommended ? 'wc-btn-primary' : 'wc-btn-secondary'
                  )}
                >
                  {f.file.startsWith('wordcraft-web') ? (
                    <Globe className="size-3.5" />
                  ) : (
                    <Download className="size-3.5" />
                  )}
                  {f.label}
                  {f.recommended && (
                    <span className="text-[10px] font-semibold tracking-wide uppercase opacity-70">
                      · {m['wc.common.recommended']()}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {steps && (
        <div className="mt-6">
          <h3 className="text-foreground mb-3 text-[15px] font-semibold">
            {m['wc.dl.install_title']()}
          </h3>
          <ol className="grid gap-3">
            {steps.map((step, i) => (
              <li key={step} className="flex gap-3 text-[14px] leading-relaxed">
                <span className="bg-redline-wash text-redline grid size-6 flex-none place-items-center font-mono text-xs">
                  {i + 1}
                </span>
                <span className="text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
          {code && <CodeBlock code={code} />}
        </div>
      )}
    </section>
  );
}
