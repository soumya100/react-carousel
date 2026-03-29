import type { Preview } from '@storybook/react-vite';
import '../src/styles/carousel.css';

const preview: Preview = {
  parameters: {
    layout: 'padded',
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
      },
    },
    docs: {
      source: {
        state: 'open',
      },
    },
    options: {
      storySort: {
        order: ['Getting Started', 'Carousel', 'AccordionCarousel', 'Primitives'],
      },
    },
  },
};

export default preview;
