import { Play } from 'lucide-react';

interface BrowserEditorProps {
  id: string;
  src: string;
  title: string;
  active: boolean;
  onActivate: () => void;
  loadLabel: string;
  poster: {
    src: string;
    srcSet?: string;
    sizes?: string;
    width: number;
    height: number;
    alt: string;
  };
  priority?: boolean;
}

/** Keep the editor download behind an explicit action, with an SSR poster. */
export function BrowserEditor({
  id,
  src,
  title,
  active,
  onActivate,
  loadLabel,
  poster,
  priority = false,
}: BrowserEditorProps) {
  return (
    <div
      id={id}
      className="sheet border-border bg-wash relative aspect-[16/10] min-h-[440px] w-full scroll-mt-20 overflow-hidden border sm:min-h-[520px]"
    >
      {active ? (
        <iframe
          src={src}
          title={title}
          allow="fullscreen; clipboard-read; clipboard-write"
          allowFullScreen
          onLoad={(event) => event.currentTarget.focus()}
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <>
          <img
            {...poster}
            fetchPriority={priority ? 'high' : undefined}
            loading={priority ? 'eager' : 'lazy'}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="bg-background/35 absolute inset-0 grid place-items-center p-6">
            <button
              type="button"
              onClick={onActivate}
              className="wc-btn wc-btn-primary min-h-12 px-6 text-[15px] shadow-lg"
            >
              <Play className="size-4" aria-hidden="true" />
              {loadLabel}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
