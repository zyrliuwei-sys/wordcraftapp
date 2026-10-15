import { useRef, useState } from 'react';
import { Download, MessageSquareText, MousePointerClick } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import {
  PRIMARY_DOWNLOAD,
  SCREENSHOTS,
  shotSrcSet,
  WORDCRAFT_WEB_APP,
} from '@/config/wordcraft';
import { m } from '@/paraglide/messages.js';
import { useDetectedOS } from '@/hooks/use-detected-os';
import { BrowserEditor } from '@/components/browser-editor';

const OS_LABEL = { windows: 'Windows', macos: 'macOS', linux: 'Linux' };

export function Hero() {
  const os = useDetectedOS();
  const [editorActive, setEditorActive] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const startEditor = () => {
    setEditorActive(true);
    editorRef.current?.scrollIntoView({ block: 'start' });
    editorRef.current?.querySelector('iframe')?.focus();
  };

  return (
    <section className="relative overflow-hidden">
      <div className="wc-container grid gap-10 pt-14 pb-14 sm:pt-20 lg:grid-cols-[minmax(0,1fr)_250px] lg:gap-14 lg:pt-24">
        <div className="min-w-0">
          <h1 className="font-display text-foreground text-[44px] leading-[1.06] sm:text-[62px] lg:text-[78px]">
            {m['wc.home.h1']()}
          </h1>
          <p className="text-muted-foreground mt-7 max-w-[540px] text-lg leading-relaxed">
            {m['wc.home.sub']()}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={startEditor}
              aria-controls="wordcraft-editor"
              className="wc-btn wc-btn-primary"
            >
              <MousePointerClick className="size-4" />
              {editorActive
                ? m['wc.home.editor_return']()
                : m['wc.home.editor_start']()}
            </button>
            {os ? (
              <a
                href={PRIMARY_DOWNLOAD[os]}
                className="wc-btn wc-btn-secondary"
              >
                <Download className="size-4" />
                {m['wc.cta.download']()}
                <span className="text-muted-foreground font-normal">
                  {OS_LABEL[os]}
                </span>
              </a>
            ) : (
              <Link href="/download" className="wc-btn wc-btn-secondary">
                <Download className="size-4" />
                {m['wc.cta.download']()}
              </Link>
            )}
          </div>
        </div>

        {/* Margin comment, like WordCraft's Review pane. */}
        <aside
          aria-hidden
          className="redline-anim-comment relative hidden self-start lg:mt-6 lg:block"
        >
          <span className="border-redline absolute top-5 -left-14 w-14 border-t border-dashed" />
          <div className="border-redline bg-redline-wash border-l-2 px-4 py-3.5">
            <p className="text-redline flex items-center gap-1.5 text-[12px] font-semibold">
              <MessageSquareText className="size-3.5" />
              {m['wc.home.comment_author']()}
            </p>
            <p className="text-foreground mt-1.5 text-[14px] leading-snug">
              {m['wc.home.comment']()}
            </p>
          </div>
        </aside>
      </div>

      <div className="wc-container pb-8">
        <div ref={editorRef} className="scroll-mt-20">
          <BrowserEditor
            id="wordcraft-editor"
            src={WORDCRAFT_WEB_APP}
            title={m['wc.on.title']()}
            active={editorActive}
            onActivate={startEditor}
            loadLabel={m['wc.on.preview_load']()}
            poster={{
              src: `${SCREENSHOTS.hero}-1600.webp`,
              srcSet: shotSrcSet(SCREENSHOTS.hero),
              sizes: '(min-width: 1264px) 1200px, 100vw',
              width: 1600,
              height: 1000,
              alt: m['wc.home.shot_alt'](),
            }}
            priority
          />
        </div>
        <div className="text-muted-foreground mt-4 flex flex-col gap-2 text-[13px] leading-relaxed sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <p className="max-w-[75ch]">{m['wc.home.editor_hint']()}</p>
          <a
            href={WORDCRAFT_WEB_APP}
            target="_blank"
            rel="noopener noreferrer"
            className="wc-link shrink-0"
          >
            {m['wc.on.open_tab']()} ↗
          </a>
        </div>
      </div>
    </section>
  );
}
