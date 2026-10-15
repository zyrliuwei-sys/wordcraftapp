import { useEffect, useState } from 'react';

export type DesktopOS = 'windows' | 'macos' | 'linux';

/** Best-effort desktop OS from the browser (null during SSR / on mobile). */
export function useDetectedOS(): DesktopOS | null {
  const [os, setOs] = useState<DesktopOS | null>(null);

  useEffect(() => {
    const nav = navigator as Navigator & {
      userAgentData?: { platform?: string; mobile?: boolean };
    };
    const ua = nav.userAgent.toLowerCase();
    if (nav.userAgentData?.mobile || /android|iphone|ipad|ipod/.test(ua)) {
      return;
    }
    const platform = (nav.userAgentData?.platform || ua).toLowerCase();
    if (platform.includes('win')) setOs('windows');
    else if (platform.includes('mac')) setOs('macos');
    else if (platform.includes('linux') || platform.includes('x11')) {
      setOs('linux');
    }
  }, []);

  return os;
}
