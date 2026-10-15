import {
  ARTCRAFT_DISCORD,
  WORDCRAFT_OFFICIAL,
  WORDCRAFT_RELEASES,
  WORDCRAFT_REPO,
} from '@/config/wordcraft';
import { m } from '@/paraglide/messages.js';
import { FooterBadgeList } from '@/components/footer-badge-list';
import { SiteFooter, type FooterColumn } from '@/components/site-footer';

export function Footer() {
  const supportEmail = m['wc.footer.support_email']();
  const columns: FooterColumn[] = [
    {
      title: m['wc.footer.explore'](),
      links: [
        { label: m['wc.nav.download'](), href: '/download' },
        { label: m['wc.nav.online'](), href: '/online' },
        { label: m['wc.nav.tutorials'](), href: '/tutorials' },
        {
          label: m['wc.vs.title'](),
          href: '/wordcraft-vs-microsoft-word',
        },
      ],
    },
    {
      title: m['wc.footer.official'](),
      links: [
        { label: m['wc.footer.official_site'](), href: WORDCRAFT_OFFICIAL },
        { label: m['wc.footer.source'](), href: WORDCRAFT_REPO },
        { label: m['wc.footer.releases'](), href: WORDCRAFT_RELEASES },
        { label: m['wc.footer.discord'](), href: ARTCRAFT_DISCORD },
      ],
    },
    {
      title: m['wc.footer.legal'](),
      links: [
        { label: supportEmail, href: `mailto:${supportEmail}` },
        { label: m['wc.footer.privacy'](), href: '/privacy-policy' },
        { label: m['wc.footer.terms'](), href: '/terms-of-service' },
      ],
    },
  ];

  return (
    <SiteFooter
      tagline={m['wc.footer.tagline']()}
      columns={columns}
      badges={
        <>
          <p className="text-muted-foreground mt-10 max-w-3xl text-xs leading-relaxed">
            {m['wc.footer.disclaimer']()}
          </p>
          <FooterBadgeList className="mt-8" />
        </>
      }
    />
  );
}
