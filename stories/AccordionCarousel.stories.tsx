import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  AccordionCarousel,
  type AccordionCarouselProps,
} from '@react/carousel';
import {
  ControlledAccordionExample,
  CustomStatusBlock,
  StoryFrame,
  accordionArgDescriptions,
  renderDetailCard,
  sampleItems,
  type SampleItem,
} from './story-data';

function AccordionStory(props: AccordionCarouselProps<SampleItem>) {
  return (
    <StoryFrame>
      <AccordionCarousel<SampleItem> {...props} />
    </StoryFrame>
  );
}

const meta = {
  title: 'AccordionCarousel/AccordionCarousel',
  component: AccordionStory,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Expandable carousel variant for layouts that need a compact scroller and an expanded overview mode.',
      },
    },
  },
  args: {
    items: sampleItems,
    renderItem: renderDetailCard,
    getItemKey: (item: SampleItem) => item.id,
    status: 'success',
    responsiveSlides: { xs: 1, sm: 2, md: 3, lg: 4, xl: 4 },
    infinite: true,
    showDots: true,
    errorMessage: 'No items found',
  },
  argTypes: {
    items: { description: accordionArgDescriptions.items, control: 'object' },
    renderItem: { description: accordionArgDescriptions.renderItem, control: false },
    getItemKey: {
      description: accordionArgDescriptions.getItemKey,
      control: false,
    },
    status: {
      description: accordionArgDescriptions.status,
      control: 'inline-radio',
      options: ['success', 'loading', 'error'],
    },
    errorMessage: {
      description: accordionArgDescriptions.errorMessage,
      control: 'text',
    },
    customLoader: {
      description: accordionArgDescriptions.customLoader,
      control: false,
    },
    customError: {
      description: accordionArgDescriptions.customError,
      control: false,
    },
    responsiveSlides: {
      description: accordionArgDescriptions.responsiveSlides,
      control: 'object',
    },
    infinite: { description: accordionArgDescriptions.infinite, control: 'boolean' },
    showDots: { description: accordionArgDescriptions.showDots, control: 'boolean' },
    onSlideError: {
      description: accordionArgDescriptions.onSlideError,
      control: false,
    },
    slideFallback: {
      description: accordionArgDescriptions.slideFallback,
      control: false,
    },
    expanded: { description: accordionArgDescriptions.expanded, control: 'boolean' },
    onExpandChange: {
      description: accordionArgDescriptions.onExpandChange,
      control: false,
    },
    className: { description: accordionArgDescriptions.className, control: 'text' },
    viewportClassName: {
      description: accordionArgDescriptions.viewportClassName,
      control: 'text',
    },
    trackClassName: {
      description: accordionArgDescriptions.trackClassName,
      control: 'text',
    },
    slideClassName: {
      description: accordionArgDescriptions.slideClassName,
      control: 'text',
    },
    expandButtonClassName: {
      description: accordionArgDescriptions.expandButtonClassName,
      control: 'text',
    },
    dotsContainerClassName: {
      description: accordionArgDescriptions.dotsContainerClassName,
      control: 'text',
    },
    dotClassName: { description: accordionArgDescriptions.dotClassName, control: 'text' },
    activeDotClassName: {
      description: accordionArgDescriptions.activeDotClassName,
      control: 'text',
    },
    renderExpandButton: {
      description: accordionArgDescriptions.renderExpandButton,
      control: false,
    },
    renderDots: { description: accordionArgDescriptions.renderDots, control: false },
  },
} satisfies Meta<typeof AccordionStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ControlledExpandedState: Story = {
  render: (args) => <ControlledAccordionExample {...args} />,
};

export const CustomExpandButton: Story = {
  args: {
    renderExpandButton: ({ isExpanded, onClick }) => (
      <button
        type="button"
        onClick={onClick}
        className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm"
      >
        {isExpanded ? 'Collapse grid' : 'Expand grid'}
      </button>
    ),
  },
};

export const CustomDots: Story = {
  args: {
    renderDots: ({ totalPages, activePage, onPageChange }) => (
      <div className="mt-6 flex justify-center gap-3">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onPageChange(index)}
            className={`h-2 rounded-full transition-all ${
              activePage === index ? 'w-10 bg-sky-500' : 'w-4 bg-slate-300'
            }`}
          />
        ))}
      </div>
    ),
  },
};

export const LoadingAndErrorStates: Story = {
  args: {
    customLoader: (
      <CustomStatusBlock
        title="Loading"
        body="Accordion mode can use the same custom branded status blocks as the base carousel."
      />
    ),
    customError: (
      <CustomStatusBlock
        title="Error"
        body="The expanded view keeps the same status API as the base carousel."
      />
    ),
  },
  render: (args) => (
    <div className="space-y-6">
      <StoryFrame>
        <AccordionCarousel<SampleItem> {...args} status="loading" />
      </StoryFrame>
      <StoryFrame>
        <AccordionCarousel<SampleItem>
          {...args}
          status="error"
          errorMessage="Accordion content could not be loaded."
        />
      </StoryFrame>
    </div>
  ),
};
