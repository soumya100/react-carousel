import type { Meta, StoryObj } from '@storybook/react-vite';
import { Carousel, type CarouselProps } from '@react/carousel';
import {
  CustomStatusBlock,
  ServerPaginationExample,
  SlideFallbackCard,
  StoryFrame,
  carouselArgDescriptions,
  renderDetailCard,
  renderImageCard,
  renderPossiblyBrokenCard,
  sampleItems,
  type SampleItem,
} from './story-data';

function CarouselStory(props: CarouselProps<SampleItem>) {
  return (
    <StoryFrame>
      <Carousel<SampleItem> {...props} />
    </StoryFrame>
  );
}

const meta = {
  title: 'Carousel/Carousel',
  component: CarouselStory,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Primary responsive carousel for the package. These stories cover the full prop surface and the most common customization patterns you would want to host as docs.',
      },
    },
  },
  args: {
    items: sampleItems,
    renderItem: renderImageCard,
    getItemKey: (item: SampleItem) => item.id,
    status: 'success',
    responsiveSlides: { xs: 1, sm: 2, md: 3, lg: 4, xl: 4 },
    infinite: true,
    showDots: true,
    showNavigation: true,
    errorMessage: 'No items found',
  },
  argTypes: {
    items: { description: carouselArgDescriptions.items, control: 'object' },
    renderItem: { description: carouselArgDescriptions.renderItem, control: false },
    getItemKey: { description: carouselArgDescriptions.getItemKey, control: false },
    status: {
      description: carouselArgDescriptions.status,
      control: 'inline-radio',
      options: ['success', 'loading', 'error'],
    },
    errorMessage: { description: carouselArgDescriptions.errorMessage, control: 'text' },
    customLoader: { description: carouselArgDescriptions.customLoader, control: false },
    customError: { description: carouselArgDescriptions.customError, control: false },
    responsiveSlides: {
      description: carouselArgDescriptions.responsiveSlides,
      control: 'object',
    },
    infinite: { description: carouselArgDescriptions.infinite, control: 'boolean' },
    showDots: { description: carouselArgDescriptions.showDots, control: 'boolean' },
    showNavigation: {
      description: carouselArgDescriptions.showNavigation,
      control: 'boolean',
    },
    onSlideError: { description: carouselArgDescriptions.onSlideError, control: false },
    slideFallback: { description: carouselArgDescriptions.slideFallback, control: false },
    className: { description: carouselArgDescriptions.className, control: 'text' },
    viewportClassName: {
      description: carouselArgDescriptions.viewportClassName,
      control: 'text',
    },
    trackClassName: {
      description: carouselArgDescriptions.trackClassName,
      control: 'text',
    },
    slideClassName: {
      description: carouselArgDescriptions.slideClassName,
      control: 'text',
    },
    prevButtonClassName: {
      description: carouselArgDescriptions.prevButtonClassName,
      control: 'text',
    },
    nextButtonClassName: {
      description: carouselArgDescriptions.nextButtonClassName,
      control: 'text',
    },
    dotsContainerClassName: {
      description: carouselArgDescriptions.dotsContainerClassName,
      control: 'text',
    },
    dotClassName: { description: carouselArgDescriptions.dotClassName, control: 'text' },
    activeDotClassName: {
      description: carouselArgDescriptions.activeDotClassName,
      control: 'text',
    },
    renderPrevButton: {
      description: carouselArgDescriptions.renderPrevButton,
      control: false,
    },
    renderNextButton: {
      description: carouselArgDescriptions.renderNextButton,
      control: false,
    },
    renderDots: { description: carouselArgDescriptions.renderDots, control: false },
    page: { description: carouselArgDescriptions.page, control: false },
    pageSize: { description: carouselArgDescriptions.pageSize, control: false },
    totalCount: { description: carouselArgDescriptions.totalCount, control: false },
    onPageChange: {
      description: carouselArgDescriptions.onPageChange,
      control: false,
    },
  },
} satisfies Meta<typeof CarouselStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const LoadingState: Story = {
  args: {
    status: 'loading',
  },
};

export const ErrorState: Story = {
  args: {
    status: 'error',
    errorMessage: 'Something went wrong while loading carousel data.',
  },
};

export const CustomStatuses: Story = {
  args: {
    status: 'loading',
    customLoader: (
      <CustomStatusBlock
        title="Loading"
        body="Use customLoader when your product needs branded loading UI instead of the default skeleton."
      />
    ),
    customError: (
      <CustomStatusBlock
        title="Error"
        body="Use customError when package consumers need a product-specific recovery state."
      />
    ),
  },
  render: (args) => (
    <div className="space-y-6">
      <StoryFrame>
        <Carousel<SampleItem> {...args} status="loading" />
      </StoryFrame>
      <StoryFrame>
        <Carousel<SampleItem>
          {...args}
          status="error"
          errorMessage="Custom error messaging still flows through."
        />
      </StoryFrame>
    </div>
  ),
};

export const CustomClassNames: Story = {
  args: {
    renderItem: renderDetailCard,
    className: 'rounded-[32px] bg-slate-950 px-6 py-8 text-white',
    viewportClassName: 'px-4',
    slideClassName: 'px-2',
    prevButtonClassName:
      'left-4 border-slate-700 bg-slate-900 text-white shadow-lg shadow-black/30',
    nextButtonClassName:
      'right-4 border-slate-700 bg-slate-900 text-white shadow-lg shadow-black/30',
    dotsContainerClassName: 'mt-8',
    dotClassName: 'bg-slate-700',
    activeDotClassName: 'bg-cyan-400 scale-150',
  },
};

export const CustomSlots: Story = {
  args: {
    renderItem: renderDetailCard,
    renderPrevButton: ({ onClick, disabled }) => (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="absolute left-4 top-4 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm disabled:opacity-40"
      >
        Back
      </button>
    ),
    renderNextButton: ({ onClick, disabled }) => (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="absolute right-4 top-4 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
      >
        Next
      </button>
    ),
    renderDots: ({ totalPages, activePage, onPageChange }) => (
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onPageChange(index)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              activePage === index
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-500'
            }`}
          >
            Panel {index + 1}
          </button>
        ))}
      </div>
    ),
  },
};

export const SlideErrorFallback: Story = {
  args: {
    items: sampleItems.map((item, index) => ({
      ...item,
      broken: index === 2,
    })),
    renderItem: renderPossiblyBrokenCard,
    slideFallback: <SlideFallbackCard />,
  },
};

export const ServerPagination: Story = {
  args: {
    renderItem: renderDetailCard,
    infinite: false,
  },
  render: (args) => <ServerPaginationExample {...args} />,
};
