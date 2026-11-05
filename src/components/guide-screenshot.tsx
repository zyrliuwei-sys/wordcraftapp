import { shotSrcSet } from '@/config/wordcraft';

/** Upstream product screenshots, with descriptive, localized captions. */
export function GuideScreenshot({
  base,
  alt,
  caption,
}: {
  base: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="my-9">
      <a href={`${base}-1600.webp`} target="_blank" rel="noopener noreferrer">
        <img
          src={`${base}-800.webp`}
          srcSet={shotSrcSet(base)}
          sizes="(min-width: 768px) 704px, calc(100vw - 48px)"
          width={1600}
          height={1000}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="border-border block h-auto w-full border"
        />
      </a>
      <figcaption className="text-muted-foreground mt-3 text-xs leading-relaxed">
        {caption}
      </figcaption>
    </figure>
  );
}
