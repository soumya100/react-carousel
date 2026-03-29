import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import {
  AccordionCarousel,
  Carousel,
  CarouselEmpty,
  type AccordionCarouselProps,
  type CarouselProps,
} from '@react/carousel';

export interface SampleItem {
  id: number;
  title: string;
  image: string;
  description: string;
  accent: string;
  broken?: boolean;
}

export const sampleItems: SampleItem[] = [
  {
    id: 1,
    title: 'Mountain View',
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    description: 'Crisp air, long shadows, and a dramatic ridgeline.',
    accent: '#1d4ed8',
  },
  {
    id: 2,
    title: 'Ocean Sunset',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
    description: 'Warm horizon gradients with gentle ocean texture.',
    accent: '#ea580c',
  },
  {
    id: 3,
    title: 'Forest Path',
    image:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
    description: 'Dense greens and a winding path through the trees.',
    accent: '#15803d',
  },
  {
    id: 4,
    title: 'City Lights',
    image:
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop',
    description: 'High-contrast architecture with glowing windows.',
    accent: '#7c3aed',
  },
  {
    id: 5,
    title: 'Desert Dunes',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=600&fit=crop',
    description: 'Soft, repeating curves and a warm sand palette.',
    accent: '#b45309',
  },
  {
    id: 6,
    title: 'Snowy Peaks',
    image:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop',
    description: 'Sharp alpine silhouettes against a cold sky.',
    accent: '#0f766e',
  },
];

export const carouselArgDescriptions = {
  items: 'Array of slide data passed into the carousel.',
  renderItem: 'Required renderer used for each item. ReactNode controls are story-driven rather than interactive.',
  getItemKey: 'Stable key generator for each slide item.',
  status: 'Switches between success, loading, and error rendering states.',
  errorMessage: 'Message shown by the default empty/error component.',
  customLoader: 'Custom loading UI shown when status is loading.',
  customError: 'Custom error UI shown when status is error.',
  responsiveSlides: 'Responsive slide counts for xs, sm, md, lg, and xl breakpoints.',
  infinite: 'Enables looping behavior with cloned slides.',
  showDots: 'Shows page indicator dots when the content is scrollable.',
  showNavigation: 'Shows previous and next navigation buttons when the content is scrollable.',
  onSlideError: 'Callback fired when a slide throws during render.',
  slideFallback: 'Fallback UI for an individual slide render failure.',
  className: 'Classes applied to the carousel root.',
  viewportClassName: 'Classes applied to the overflow viewport.',
  trackClassName: 'Classes applied to the sliding flex track.',
  slideClassName: 'Classes applied to each slide wrapper.',
  prevButtonClassName: 'Classes applied to the default previous button.',
  nextButtonClassName: 'Classes applied to the default next button.',
  dotsContainerClassName: 'Classes applied to the default dots wrapper.',
  dotClassName: 'Classes applied to each inactive dot.',
  activeDotClassName: 'Classes applied to the active dot.',
  renderPrevButton: 'Slot for replacing the previous button implementation.',
  renderNextButton: 'Slot for replacing the next button implementation.',
  renderDots: 'Slot for replacing the dots implementation.',
  page: 'Current page in server pagination mode.',
  pageSize: 'Number of items represented by a server page.',
  totalCount: 'Total number of items available on the server.',
  onPageChange: 'Callback used to request a different server page.',
} as const;

export const accordionArgDescriptions = {
  items: 'Array of slide data passed into the accordion carousel.',
  renderItem: 'Required renderer used for each item.',
  getItemKey: 'Stable key generator for each slide item.',
  status: 'Switches between success, loading, and error rendering states.',
  errorMessage: 'Message shown by the default empty/error component.',
  customLoader: 'Custom loading UI shown when status is loading.',
  customError: 'Custom error UI shown when status is error.',
  responsiveSlides: 'Responsive slide counts for xs, sm, md, lg, and xl breakpoints.',
  infinite: 'Enables looping behavior while collapsed.',
  showDots: 'Shows page indicator dots while collapsed.',
  onSlideError: 'Callback fired when a slide throws during render.',
  slideFallback: 'Fallback UI for an individual slide render failure.',
  expanded: 'Controlled expanded state.',
  onExpandChange: 'Callback fired when expanded state changes in controlled mode.',
  className: 'Classes applied to the accordion root.',
  viewportClassName: 'Classes applied to the viewport wrapper.',
  trackClassName: 'Classes applied to the slide track.',
  slideClassName: 'Classes applied to each slide wrapper.',
  expandButtonClassName: 'Classes applied to the default expand button.',
  dotsContainerClassName: 'Classes applied to the default dots wrapper.',
  dotClassName: 'Classes applied to each inactive dot.',
  activeDotClassName: 'Classes applied to the active dot.',
  renderExpandButton: 'Slot for replacing the expand button implementation.',
  renderDots: 'Slot for replacing the dots implementation.',
} as const;

export function renderImageCard(item: SampleItem) {
  return (
    <article className="group relative overflow-hidden rounded-[--radius-carousel] border border-slate-200 bg-white shadow-sm">
      <img
        src={item.image}
        alt={item.title}
        className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-24"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${item.accent}cc 100%)`,
        }}
      />
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <p className="text-xs uppercase tracking-[0.2em] opacity-80">Feature</p>
        <h3 className="text-lg font-semibold">{item.title}</h3>
      </div>
    </article>
  );
}

export function renderDetailCard(item: SampleItem) {
  return (
    <article className="h-full rounded-[--radius-carousel] border border-slate-200 bg-white p-4 shadow-sm">
      <img
        src={item.image}
        alt={item.title}
        className="mb-4 h-36 w-full rounded-xl object-cover"
      />
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
        <span
          className="inline-flex size-3 shrink-0 rounded-full"
          style={{ backgroundColor: item.accent }}
        />
      </div>
      <p className="text-sm leading-6 text-slate-600">{item.description}</p>
    </article>
  );
}

export function renderPossiblyBrokenCard(item: SampleItem) {
  if (item.broken) {
    throw new Error(`Could not render ${item.title}`);
  }

  return renderDetailCard(item);
}

export function StoryFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-[0_30px_120px_-60px_rgba(15,23,42,0.4)]">
      {children}
    </div>
  );
}

export function ServerPaginationExample(
  args: Omit<CarouselProps<SampleItem>, 'page' | 'pageSize' | 'totalCount' | 'onPageChange'>
) {
  const serverPages = useMemo(
    () => [
      sampleItems.slice(0, 3),
      sampleItems.slice(3, 6),
      sampleItems.slice(0, 3).map((item) => ({
        ...item,
        id: item.id + 100,
        title: `${item.title} Encore`,
      })),
    ],
    []
  );
  const [page, setPage] = useState(0);

  return (
    <StoryFrame>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Server pagination example
          </h3>
          <p className="text-sm text-slate-600">
            The carousel requests pages instead of looping through a single in-memory list.
          </p>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500 shadow-sm">
          Page {page + 1} / {serverPages.length}
        </span>
      </div>
      <Carousel<SampleItem>
        {...args}
        items={serverPages[page] ?? []}
        page={page}
        pageSize={3}
        totalCount={serverPages.length * 3}
        onPageChange={(nextPage) => {
          if (nextPage >= 0 && nextPage < serverPages.length) {
            setPage(nextPage);
          }
        }}
      />
    </StoryFrame>
  );
}

export function ControlledAccordionExample(
  args: Omit<AccordionCarouselProps<SampleItem>, 'expanded' | 'onExpandChange'>
) {
  const [expanded, setExpanded] = useState(false);

  return (
    <StoryFrame>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Controlled accordion state
          </h3>
          <p className="text-sm text-slate-600">
            Use your own state when the expanded mode needs to sync with the rest of your UI.
          </p>
        </div>
        <button
          type="button"
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      <AccordionCarousel<SampleItem>
        {...args}
        expanded={expanded}
        onExpandChange={setExpanded}
      />
    </StoryFrame>
  );
}

export function CustomStatusBlock({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center rounded-[--radius-carousel] border border-dashed border-slate-300 bg-white text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
        {title}
      </p>
      <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">{body}</p>
    </div>
  );
}

export function SlideFallbackCard() {
  return (
    <div className="flex h-56 items-center justify-center rounded-[--radius-carousel] border border-amber-200 bg-amber-50 text-center text-sm font-medium text-amber-900">
      This slide failed gracefully.
    </div>
  );
}

export function PrimitiveStage({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 p-8">
      {children}
    </div>
  );
}

export function EmptyCollectionExample() {
  return (
    <StoryFrame>
      <CarouselEmpty message="No marketing panels were returned from the CMS." />
    </StoryFrame>
  );
}
