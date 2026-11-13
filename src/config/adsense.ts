// Public publisher identifiers shared by the page tags and /ads.txt.
const DEFAULT_ADSENSE_CLIENT = 'ca-pub-2841223102464177';
export const ADSENSE_CERTIFICATION_ID = 'f08c47fec0942fa0';

// Keep the admin publisher setting usable, with this site's account as the
// default when the setting is empty, malformed or unavailable.
export function resolveAdsenseClient(configured?: string): string {
  const publisher = configured?.trim().replace(/^ca-/, '') ?? '';
  return /^pub-\d{16}$/.test(publisher)
    ? `ca-${publisher}`
    : DEFAULT_ADSENSE_CLIENT;
}
