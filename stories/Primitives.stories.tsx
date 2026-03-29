import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  CarouselDots,
  CarouselEmpty,
  CarouselSkeleton,
  LazySlide,
  NavButton,
  SlideErrorBoundary,
} from '@react/carousel';
import { PrimitiveStage, StoryFrame } from './story-data';

function DotsDemo() {
  const [page, setPage] = useState(1);

  return (
    <PrimitiveStage>
      <div className="w-full">
        <CarouselDots
          totalPages={5}
          activePage={page}
          onPageChange={setPage}
          itemCount={15}
          visibleSlides={3}
        />
      </div>
    </PrimitiveStage>
  );
}

function ThrowingSlide() {
  throw new Error('Intentional Storybook failure');
}

const meta = {
  title: 'Primitives/Exported Components',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Smaller exported building blocks that package consumers can compose or theme independently.',
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const NavigationButtons: Story = {
  render: () => (
    <PrimitiveStage>
      <div className="relative h-16 w-full">
        <NavButton direction="prev" onClick={() => undefined} />
        <NavButton direction="next" onClick={() => undefined} />
      </div>
    </PrimitiveStage>
  ),
};

export const DotPagination: Story = {
  render: () => <DotsDemo />,
};

export const SkeletonLoader: Story = {
  render: () => (
    <StoryFrame>
      <CarouselSkeleton count={4} />
    </StoryFrame>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <StoryFrame>
      <CarouselEmpty message="No product cards are available yet." />
    </StoryFrame>
  ),
};

export const LazySlideExample: Story = {
  render: () => (
    <StoryFrame>
      <LazySlide>
        <div className="flex h-40 items-center justify-center rounded-[--radius-carousel] border border-slate-200 bg-white text-sm text-slate-600 shadow-sm">
          This content is wrapped in LazySlide and renders when visible.
        </div>
      </LazySlide>
    </StoryFrame>
  ),
};

export const SlideBoundaryFallback: Story = {
  render: () => (
    <StoryFrame>
      <SlideErrorBoundary
        fallback={
          <div className="flex h-40 items-center justify-center rounded-[--radius-carousel] border border-rose-200 bg-rose-50 text-sm font-medium text-rose-700">
            The slide boundary caught the render error.
          </div>
        }
      >
        <ThrowingSlide />
      </SlideErrorBoundary>
    </StoryFrame>
  ),
};
