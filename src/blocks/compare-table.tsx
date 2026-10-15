import { ArrowRight, Check, Minus } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { m } from '@/paraglide/messages.js';
import { Reveal } from '@/components/reveal';
import { SectionHeader } from '@/components/section-header';

/** Rows: label, WordCraft, Word, and which side has the edge. */
function rows(): [string, string, string, 'wc' | 'word' | 'tie'][] {
  return [
    [
      m['wc.cmp.price'](),
      m['wc.cmp.price_wc'](),
      m['wc.cmp.price_word'](),
      'wc',
    ],
    [
      m['wc.cmp.license'](),
      m['wc.cmp.license_wc'](),
      m['wc.cmp.license_word'](),
      'wc',
    ],
    [
      m['wc.cmp.account'](),
      m['wc.cmp.account_wc'](),
      m['wc.cmp.account_word'](),
      'wc',
    ],
    [
      m['wc.cmp.platforms'](),
      m['wc.cmp.platforms_wc'](),
      m['wc.cmp.platforms_word'](),
      'tie',
    ],
    [
      m['wc.cmp.docx'](),
      m['wc.cmp.docx_wc'](),
      m['wc.cmp.docx_word'](),
      'word',
    ],
    [
      m['wc.cmp.offline'](),
      m['wc.cmp.offline_wc'](),
      m['wc.cmp.offline_word'](),
      'wc',
    ],
    [m['wc.cmp.ai'](), m['wc.cmp.ai_wc'](), m['wc.cmp.ai_word'](), 'tie'],
    [
      m['wc.cmp.collab'](),
      m['wc.cmp.collab_wc'](),
      m['wc.cmp.collab_word'](),
      'word',
    ],
    [
      m['wc.cmp.maturity'](),
      m['wc.cmp.maturity_wc'](),
      m['wc.cmp.maturity_word'](),
      'word',
    ],
  ];
}

export function CompareTableBody() {
  return (
    <div className="border-border bg-sheet overflow-x-auto border">
      <table className="w-full min-w-[680px] border-collapse text-left text-[14.5px]">
        <thead>
          <tr className="border-border border-b">
            <th className="w-[24%] px-6 py-5" />
            <th className="bg-redline-wash font-display text-redline px-6 py-5 text-[22px] font-normal">
              {m['wc.cmp.col_wordcraft']()}
            </th>
            <th className="font-display text-foreground px-6 py-5 text-[22px] font-normal">
              {m['wc.cmp.col_word']()}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows().map(([label, wc, word, edge]) => (
            <tr key={label} className="even:bg-wash/60 align-top">
              <th className="text-foreground px-6 py-4 font-medium">{label}</th>
              <td className="bg-redline-wash/40 px-6 py-4">
                <Cell text={wc} win={edge === 'wc'} />
              </td>
              <td className="px-6 py-4">
                <Cell text={word} win={edge === 'word'} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Cell({ text, win }: { text: string; win: boolean }) {
  return (
    <span className="flex gap-2.5">
      {win ? (
        <Check className="text-redline mt-1 size-4 flex-none" />
      ) : (
        <Minus className="text-muted-foreground/50 mt-1 size-4 flex-none" />
      )}
      <span className={win ? 'text-foreground' : 'text-muted-foreground'}>
        {text}
      </span>
    </span>
  );
}

export function ComparePreview() {
  return (
    <Reveal as="section" className="wc-container pb-24 sm:pb-32">
      <SectionHeader
        title={m['wc.cmph.h']()}
        description={m['wc.cmph.sub']()}
      />
      <CompareTableBody />
      <Link
        href="/wordcraft-vs-microsoft-word"
        className="wc-link mt-8 inline-flex items-center gap-1.5 text-[15px]"
      >
        {m['wc.common.read_compare']()}
        <ArrowRight className="size-4" />
      </Link>
    </Reveal>
  );
}
