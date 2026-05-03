export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-[--color-carousel-accent]',
    'text-[--color-carousel-accent-fg]',
    'border-[--color-carousel-border]',
    'focus-visible:outline-[--color-carousel-accent]',
    'bg-[--color-carousel-border]',
  ],
};
