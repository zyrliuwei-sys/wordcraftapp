/** Monospace snippet on an ink panel (stays dark in both themes). */
export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="dark:border-border my-5 overflow-x-auto rounded-[2px] bg-[oklch(0.2_0.025_262)] px-5 py-4 font-mono text-[13px] leading-relaxed text-[oklch(0.92_0.01_255)] dark:border">
      <code>{code}</code>
    </pre>
  );
}
