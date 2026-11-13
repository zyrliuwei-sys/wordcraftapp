import { createFileRoute } from '@tanstack/react-router';

import {
  ADSENSE_CERTIFICATION_ID,
  resolveAdsenseClient,
} from '@/config/adsense';
import { getConfig } from '@/modules/config/service';

export const Route = createFileRoute('/ads.txt')({
  server: {
    handlers: {
      GET: async () => {
        // The publisher ID carries a "ca-" prefix in the AdSense UI, but
        // ads.txt wants the bare "pub-…" form.
        const code = resolveAdsenseClient(await getConfig('adsense_code'));
        const pubId = code.replace(/^ca-/, '');
        const body = `google.com, ${pubId}, DIRECT, ${ADSENSE_CERTIFICATION_ID}\n`;
        return new Response(body, {
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
      },
    },
  },
});
