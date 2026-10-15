import { ExternalLink } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import {
  ARTCRAFT_DISCORD,
  SCREENSHOTS,
  shotSrcSet,
  WORDCRAFT_REPO,
  WORDCRAFT_WEB_APP,
} from '@/config/wordcraft';
import { m } from '@/paraglide/messages.js';
import { CodeBlock } from '@/components/code-block';
import { PageHero } from '@/components/page-hero';

function Shot({ base, alt }: { base: string; alt: string }) {
  return (
    <figure className="border-border my-6 overflow-hidden border">
      <img
        src={`${base}-1600.webp`}
        srcSet={shotSrcSet(base)}
        sizes="(min-width: 1024px) 780px, 100vw"
        width={1600}
        height={1000}
        alt={alt}
        loading="lazy"
        className="block h-auto w-full"
      />
    </figure>
  );
}

export function Tutorial() {
  const sections = [
    { id: 'start', h: m['wc.tut.start.h']() },
    { id: 'ribbon', h: m['wc.tut.ui.h']() },
    { id: 'format', h: m['wc.tut.format.h']() },
    { id: 'tables', h: m['wc.tut.tables.h']() },
    { id: 'review', h: m['wc.tut.review.h']() },
    { id: 'references', h: m['wc.tut.refs.h']() },
    { id: 'save', h: m['wc.tut.save.h']() },
    { id: 'shortcuts', h: m['wc.tut.keys.h']() },
    { id: 'cli', h: m['wc.tut.cli.h']() },
  ];
  const keys: [string, string][] = [
    ['Ctrl + B', m['wc.tut.keys.bold']()],
    ['Ctrl + I', m['wc.tut.keys.italic']()],
    ['Ctrl + U', m['wc.tut.keys.underline']()],
    ['Ctrl + S', m['wc.tut.keys.save']()],
    ['Ctrl + Z / Ctrl + Y', m['wc.tut.keys.undo']()],
    ['Ctrl + F / Ctrl + H', m['wc.tut.keys.find']()],
    ['F4', m['wc.tut.keys.f4']()],
    ['F7', m['wc.tut.keys.f7']()],
    ['F8', m['wc.tut.keys.f8']()],
    ['Tab / Shift + Tab', m['wc.tut.keys.tab']()],
  ];

  return (
    <>
      <PageHero
        kicker={m['wc.nav.tutorials']()}
        title={m['wc.tut.title']()}
        subtitle={m['wc.tut.subtitle']()}
      >
        <div className="flex flex-wrap gap-3">
          <a href={WORDCRAFT_WEB_APP} className="wc-btn wc-btn-primary">
            {m['wc.cta.online']()}
          </a>
          <Link href="/download" className="wc-btn wc-btn-secondary">
            {m['wc.cta.download']()}
          </Link>
        </div>
      </PageHero>

      <div className="wc-container grid gap-14 py-16 lg:grid-cols-[240px_1fr] lg:gap-16 lg:py-20">
        <nav className="hidden lg:block">
          <div className="sticky top-24 grid gap-2 text-[13px]">
            <p className="text-muted-foreground mb-1 text-[11px] font-semibold tracking-[0.12em] uppercase">
              {m['wc.common.on_this_page']()}
            </p>
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-muted-foreground hover:text-redline"
              >
                {s.h}
              </a>
            ))}
          </div>
        </nav>

        <article className="wc-prose max-w-[780px] min-w-0 [&>section]:scroll-mt-24 [&>section:first-child>h2]:mt-0">
          <section id="start">
            <h2>{m['wc.tut.start.h']()}</h2>
            <p>{m['wc.tut.start.p1']()}</p>
            <ul>
              <li>{m['wc.tut.start.l1']()}</li>
              <li>{m['wc.tut.start.l2']()}</li>
              <li>{m['wc.tut.start.l3']()}</li>
            </ul>
            <Shot base={SCREENSHOTS.backstage} alt={m['wc.tut.start.h']()} />
          </section>

          <section id="ribbon">
            <h2>{m['wc.tut.ui.h']()}</h2>
            <p>{m['wc.tut.ui.p1']()}</p>
            <ul>
              <li>{m['wc.tut.ui.file']()}</li>
              <li>{m['wc.tut.ui.home']()}</li>
              <li>{m['wc.tut.ui.insert']()}</li>
              <li>{m['wc.tut.ui.design']()}</li>
              <li>{m['wc.tut.ui.refs']()}</li>
              <li>{m['wc.tut.ui.review']()}</li>
            </ul>
            <p>{m['wc.tut.ui.p2']()}</p>
          </section>

          <section id="format">
            <h2>{m['wc.tut.format.h']()}</h2>
            <p>{m['wc.tut.format.p1']()}</p>
            <p>{m['wc.tut.format.p2']()}</p>
            <Shot base={SCREENSHOTS.hero} alt={m['wc.tour.home.title']()} />
            <p>{m['wc.tut.format.p3']()}</p>
          </section>

          <section id="tables">
            <h2>{m['wc.tut.tables.h']()}</h2>
            <p>{m['wc.tut.tables.p1']()}</p>
            <p>{m['wc.tut.tables.p2']()}</p>
            <p>{m['wc.tut.tables.p3']()}</p>
            <Shot base={SCREENSHOTS.layout} alt={m['wc.tour.layout.title']()} />
          </section>

          <section id="review">
            <h2>{m['wc.tut.review.h']()}</h2>
            <p>{m['wc.tut.review.p1']()}</p>
            <p>{m['wc.tut.review.p2']()}</p>
            <p>{m['wc.tut.review.p3']()}</p>
            <Shot base={SCREENSHOTS.review} alt={m['wc.tour.review.title']()} />
          </section>

          <section id="references">
            <h2>{m['wc.tut.refs.h']()}</h2>
            <p>{m['wc.tut.refs.p1']()}</p>
            <p>{m['wc.tut.refs.p2']()}</p>
            <Shot
              base={SCREENSHOTS.references}
              alt={m['wc.tour.references.title']()}
            />
          </section>

          <section id="save">
            <h2>{m['wc.tut.save.h']()}</h2>
            <p>{m['wc.tut.save.p1']()}</p>
            <p>{m['wc.tut.save.p2']()}</p>
            <p>
              <strong>{m['wc.tut.save.p3']()}</strong>
            </p>
          </section>

          <section id="shortcuts">
            <h2>{m['wc.tut.keys.h']()}</h2>
            <p>{m['wc.tut.keys.p1']()}</p>
            <div className="border-border mt-4 overflow-x-auto border">
              <table className="w-full border-collapse text-left text-[14px]">
                <thead>
                  <tr className="bg-wash">
                    <th className="px-4 py-3 font-semibold">
                      {m['wc.tut.keys.col_key']()}
                    </th>
                    <th className="px-4 py-3 font-semibold">
                      {m['wc.tut.keys.col_action']()}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {keys.map(([k, action]) => (
                    <tr key={k} className="border-border border-t">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="wc-kbd">{k}</span>
                      </td>
                      <td className="text-muted-foreground px-4 py-3">
                        {action}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="cli">
            <h2>{m['wc.tut.cli.h']()}</h2>
            <p>{m['wc.tut.cli.p1']()}</p>
            <CodeBlock
              code={[
                'wordcraft-cli convert report.docx report.pdf   # docx, pdf, odt, rtf, html, md, tex, txt, png',
                'wordcraft-cli text report.docx                 # plain text',
                'wordcraft-cli inspect report.docx              # structure as JSON',
              ].join('\n')}
            />
            <p>{m['wc.tut.cli.p2']()}</p>
            <CodeBlock code="claude mcp add wordcraft -- wordcraft-cli mcp" />
          </section>

          <section className="bg-wash mt-14 p-7">
            <h2 className="!mt-0">{m['wc.tut.next_title']()}</h2>
            <p>{m['wc.tut.next_desc']()}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={ARTCRAFT_DISCORD}
                target="_blank"
                rel="noopener noreferrer"
                className="wc-btn wc-btn-primary"
              >
                Discord <ExternalLink className="size-3.5" />
              </a>
              <a
                href={`${WORDCRAFT_REPO}/issues`}
                target="_blank"
                rel="noopener noreferrer"
                className="wc-btn wc-btn-secondary"
              >
                GitHub Issues <ExternalLink className="size-3.5" />
              </a>
              <Link
                href="/wordcraft-vs-microsoft-word"
                className="wc-btn wc-btn-secondary"
              >
                {m['wc.nav.compare']()}
              </Link>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
