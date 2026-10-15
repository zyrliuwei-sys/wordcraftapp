import type { SVGProps } from 'react';

export function WindowsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M3 5.1 10.4 4v7.1H3V5.1Zm0 13.8 7.4 1.1v-7H3v5.9ZM11.3 3.9 21 2.5v8.6h-9.7V3.9Zm0 16.2 9.7 1.4v-8.5h-9.7v7.1Z" />
    </svg>
  );
}

export function AppleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.87-.76-1.47.02-2.83.86-3.59 2.18-1.53 2.66-.39 6.6 1.1 8.76.73 1.06 1.6 2.24 2.73 2.2 1.1-.04 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.14.84-1.23 1.18-2.42 1.2-2.48-.03-.01-2.3-.88-2.32-3.5h.03ZM14.2 6.13c.6-.73 1.01-1.75.9-2.76-.87.04-1.92.58-2.54 1.31-.56.65-1.05 1.68-.92 2.67.97.08 1.96-.49 2.56-1.22Z" />
    </svg>
  );
}

export function LinuxIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M12 2.8c-2.2 0-3.4 1.8-3.4 4.1 0 1.4-.4 2.3-1.3 3.6-1.2 1.7-2.5 3.8-2.5 6.1 0 .8.2 1.5.5 2" />
      <path d="M12 2.8c2.2 0 3.4 1.8 3.4 4.1 0 1.4.4 2.3 1.3 3.6 1.2 1.7 2.5 3.8 2.5 6.1 0 .8-.2 1.5-.5 2" />
      <path d="M5.4 18.6c-.9.3-1.4.9-1.1 1.6.4.9 2.4.9 3.9 1.6 1.1.5 2-.1 2-1.2 0-1-.7-2.5-1.6-3.1-.9-.6-2.1.7-3.2 1.1Z" />
      <path d="M18.6 18.6c.9.3 1.4.9 1.1 1.6-.4.9-2.4.9-3.9 1.6-1.1.5-2-.1-2-1.2 0-1 .7-2.5 1.6-3.1.9-.6 2.1.7 3.2 1.1Z" />
      <path d="M10 20.5h4" />
      <circle cx="10.6" cy="7" r=".6" fill="currentColor" />
      <circle cx="13.4" cy="7" r=".6" fill="currentColor" />
      <path d="M11 9.2c.6.5 1.4.5 2 0" />
    </svg>
  );
}
