import { m } from '@/paraglide/messages.js';
import { SiteHeader } from '@/components/site-header';

export function Header() {
  const navLinks = [
    { href: '/download', label: m['wc.nav.download']() },
    { href: '/online', label: m['wc.nav.online']() },
    { href: '/tutorials', label: m['wc.nav.tutorials']() },
    { href: '/blog', label: m['wc.nav.blog']() },
    { href: '/wordcraft-vs-microsoft-word', label: m['wc.nav.compare']() },
    { href: '/#faq', label: m['wc.nav.faq']() },
    { href: '/about', label: m['wc.nav.about']() },
    { href: '/contact', label: m['wc.nav.contact']() },
  ];

  return (
    <SiteHeader
      navLinks={navLinks}
      logoAlt={m['wc.logo_alt']()}
      cta={{ href: '/#wordcraft-editor', label: m['wc.cta.online']() }}
    />
  );
}
