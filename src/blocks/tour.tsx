import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { SCREENSHOTS, shotSrcSet } from '@/config/wordcraft';
import { m } from '@/paraglide/messages.js';
import { Reveal } from '@/components/reveal';
import { SectionHeader } from '@/components/section-header';

export function Tour() {
  const rail = useRef<HTMLDivElement>(null);
  const shots = [
    {
      base: SCREENSHOTS.hero,
      title: m['wc.tour.home.title'](),
      desc: m['wc.tour.home.desc'](),
    },
    {
      base: SCREENSHOTS.review,
      title: m['wc.tour.review.title'](),
      desc: m['wc.tour.review.desc'](),
    },
    {
      base: SCREENSHOTS.references,
      title: m['wc.tour.references.title'](),
      desc: m['wc.tour.references.desc'](),
    },
    {
      base: SCREENSHOTS.design,
      title: m['wc.tour.design.title'](),
      desc: m['wc.tour.design.desc'](),
    },
    {
      base: SCREENSHOTS.layout,
      title: m['wc.tour.layout.title'](),
      desc: m['wc.tour.layout.desc'](),
    },
    {
      base: SCREENSHOTS.dark,
      title: m['wc.tour.dark.title'](),
      desc: m['wc.tour.dark.desc'](),
    },
  ];
  const scroll = (dir: 1 | -1) => {
    const el = rail.current;
    if (el)
      el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <Reveal as="section" className="py-24 sm:py-32">
      <div className="wc-container flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader
          className="mb-0"
          title={m['wc.tourh.h']()}
          description={m['wc.tourh.sub']()}
        />
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scroll(-1)}
            className="wc-btn wc-btn-secondary size-11 px-0"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scroll(1)}
            className="wc-btn wc-btn-secondary size-11 px-0"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
      <div
        ref={rail}
        className="wc-scroll-x mt-10 flex snap-x snap-mandatory [scroll-padding-inline:max(16px,calc((100vw-1200px)/2))] gap-6 overflow-x-auto [padding-inline:max(16px,calc((100vw-1200px)/2))] pb-6"
      >
        {shots.map((shot) => (
          <figure
            key={shot.title}
            className="w-[84%] flex-none snap-start sm:w-[58%] lg:w-[46%]"
          >
            <div className="border-border bg-sheet overflow-hidden border">
              <img
                src={`${shot.base}-800.webp`}
                srcSet={shotSrcSet(shot.base)}
                sizes="(min-width: 1024px) 560px, 84vw"
                width={800}
                height={500}
                alt={`WordCraft ${shot.title}`}
                loading="lazy"
                className="block aspect-[16/10] h-auto w-full object-cover"
              />
            </div>
            <figcaption className="mt-4">
              <span className="text-foreground text-[15px] font-semibold">
                {shot.title}
              </span>
              <span className="text-muted-foreground mt-1 block text-[14px] leading-relaxed">
                {shot.desc}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Reveal>
  );
}
