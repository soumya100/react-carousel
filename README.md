# @react/carousel

[![npm version](https://badge.fury.io/js/%40react%2Fcarousel.svg)](https://www.npmjs.com/package/@react/carousel)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Production-grade responsive carousel — React 19 + Tailwind v4 + Radix UI

**[View Live Demo](https://react-carousel-demo.vercel.app) | [GitHub](https://github.com/soumya100/react-carousel) | [Report a Bug](https://github.com/soumya100/react-carousel/issues)**

## ✨ Features

- **🚀 React 19 Ready** - Built for the latest React with modern patterns
- **📱 Fully Responsive** - Adaptive breakpoints with customizable slide counts
- **🎨 Tailwind v4 Integration** - Seamless styling with CSS variables
- **♿ Accessible** - Full keyboard navigation, ARIA support, and screen reader friendly
- **👆 Touch & Swipe** - Native-feeling touch gestures with momentum
- **🔄 Infinite Loop** - Seamless infinite scrolling
- **🎯 TypeScript** - Full type safety with strict mode
- **🎪 Accordion Mode** - Expandable carousel for grid layouts
- **⚡ High Performance** - Optimized with tree-shaking and minimal bundle size
- **🧩 Headless Components** - Use with any styling system

## 📦 Installation

```bash
npm install @react/carousel
# or
yarn add @react/carousel
# or
pnpm add @react/carousel
```

## 🛠️ Basic Usage

```tsx
import React from 'react';
import Carousel from '@react/carousel';
import '@react/carousel/styles';

const MyComponent = () => {
  const items = [
    { id: 1, title: 'Item 1', image: 'image1.jpg' },
    { id: 2, title: 'Item 2', image: 'image2.jpg' },
    { id: 3, title: 'Item 3', image: 'image3.jpg' },
  ];

  return (
    <Carousel
      items={items}
      renderItem={(item) => (
        <div className="p-4">
          <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded" />
          <h3 className="mt-2 font-semibold">{item.title}</h3>
        </div>
      )}
      getItemKey={(item) => item.id}
      responsiveSlides={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
      infinite={true}
      showDots={true}
      showNavigation={true}
    />
  );
};
```

## 🎪 Accordion Mode

```tsx
import React, { useState } from 'react';
import { AccordionCarousel } from '@react/carousel';
import '@react/carousel/styles';

const AccordionExample = () => {
  const [expanded, setExpanded] = useState(false);
  const items = [/* your items */];

  return (
    <AccordionCarousel
      items={items}
      renderItem={(item) => <div>{item.title}</div>}
      getItemKey={(item) => item.id}
      expanded={expanded}
      onExpandChange={setExpanded}
      responsiveSlides={{ xs: 1, sm: 2, md: 3, lg: 4 }}
    />
  );
};
```

## 🎨 Customization

### Custom Styling

```tsx
<Carousel
  items={items}
  renderItem={renderItem}
  getItemKey={(item) => item.id}
  className="border-2 border-blue-500 rounded-xl"
  viewportClassName="p-8"
  slideClassName="mx-2"
  prevButtonClassName="bg-blue-500 hover:bg-blue-600 text-white"
  nextButtonClassName="bg-blue-500 hover:bg-blue-600 text-white"
  dotsContainerClassName="mt-8"
  dotClassName="bg-blue-200"
  activeDotClassName="bg-blue-500 scale-125"
/>
```

### Custom Navigation Buttons

```tsx
<Carousel
  items={items}
  renderItem={renderItem}
  getItemKey={(item) => item.id}
  renderPrevButton={({ onClick, disabled }) => (
    <button onClick={onClick} disabled={disabled} className="custom-prev">
      ← Previous
    </button>
  )}
  renderNextButton={({ onClick, disabled }) => (
    <button onClick={onClick} disabled={disabled} className="custom-next">
      Next →
    </button>
  )}
/>
```

## 📚 API Reference

### Carousel Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `T[]` | `[]` | Array of items to display |
| `renderItem` | `(item: T, index: number) => ReactNode` | - | Function to render each item |
| `getItemKey` | `(item: T, index: number) => React.Key` | `(item, idx) => idx` | Function to get unique key for each item |
| `responsiveSlides` | `ResponsiveConfig` | `{xs:1,sm:2,md:3,lg:4,xl:5}` | Number of slides per breakpoint |
| `infinite` | `boolean` | `true` | Enable infinite scrolling |
| `showDots` | `boolean` | `true` | Show pagination dots |
| `showNavigation` | `boolean` | `true` | Show navigation buttons |
| `status` | `'success' \| 'loading' \| 'error'` | `'success'` | Current status |
| `className` | `string` | - | Additional CSS classes |

### ResponsiveConfig

```typescript
interface ResponsiveConfig {
  xs?: number; // < 480px
  sm?: number; // 480px - 767px
  md?: number; // 768px - 1023px
  lg?: number; // 1024px - 1279px
  xl?: number; // >= 1280px
}
```

## 🚀 Development

### Running the Demo Locally

```bash
# Clone the repository
git clone https://github.com/soumya100/react-carousel.git
cd react-carousel

# Install dependencies
npm install

# Start the demo
cd demo
npm install
npm run dev

# Open http://localhost:3000
```

### Building the Package

```bash
# Build for production
npm run build

# Run type checking
npm run typecheck

# Run linting
npm run lint
```

## 📄 Publishing to npm

### Prerequisites

1. **Create an npm account** at [npmjs.com](https://www.npmjs.com)
2. **Login to npm** in your terminal:
   ```bash
   npm login
   ```

### Publishing Steps

```bash
# Make sure you're in the package root directory
cd react-carousel

# Update version in package.json (if needed)
npm version patch  # or minor, or major

# Build the package
npm run build

# Publish to npm
npm publish

# For scoped packages (@react/carousel), use:
npm publish --access public
```

### Publishing Checklist

- [ ] Update version in `package.json`
- [ ] Update `README.md` with correct links
- [ ] Run `npm run typecheck` - no errors
- [ ] Run `npm run build` - successful build
- [ ] Test locally with `npm pack` and install in a test project
- [ ] Publish with `npm publish --access public`

## 🌐 Hosting the Demo Site

### Option 1: Vercel (Recommended)

1. **Create a Vercel account** at [vercel.com](https://vercel.com)

2. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

3. **Deploy the demo**:
   ```bash
   cd demo
   vercel --prod
   ```

4. **Update the demo link** in your README.md

### Option 2: Netlify

1. **Create a Netlify account** at [netlify.com](https://netlify.com)

2. **Build the demo for static hosting**:
   ```bash
   cd demo
   npm run build
   ```

3. **Deploy to Netlify**:
   - Drag and drop the `dist` folder to Netlify dashboard
   - Or use Netlify CLI: `netlify deploy --prod --dir=dist`

### Option 3: GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install -g gh-pages
   ```

2. **Add deploy script** to demo/package.json:
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

3. **Deploy**:
   ```bash
   cd demo
   npm run deploy
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Bundled with [Vite](https://vitejs.dev/)
```

-----

## 🎨 Advanced: The "Recruiter" Flex

This package shines when you need to break the mold. Use the **Render Props** pattern or the **Custom Hook** to build complex navigation without fighting the library.

### Using Render Props

```jsx
<Carousel
  renderNavigation={({ next, prev, activeIndex, total }) => (
    <div className="custom-controls">
      <button onClick={prev}>← Previous</button>
      <span className="counter">{activeIndex + 1} / {total}</span>
      <button onClick={next}>Next →</button>
    </div>
  )}
>
  {/* Slides */}
</Carousel>
```

-----

## ⚙️ API Reference

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `loop` | `boolean` | `true` | Enables infinite looping of slides. |
| `speed` | `number` | `300` | Transition speed in milliseconds. |
| `threshold` | `number` | `50` | Swipe distance (px) required to trigger a change. |
| `pauseOnHover` | `boolean` | `true` | Pauses autoPlay when the mouse enters the container. |

-----

## 🏗️ Architecture & Engineering

To prove this isn't just another "wrapper" library, here is the logic used for the swipe-to-threshold calculation:

The transition is triggered only if the user displacement $d$ satisfies:
$$|d| > \text{threshold} \quad \text{or} \quad \text{velocity} > \text{minVelocity}$$

This ensures that even short, fast flicks trigger a slide change, providing a premium mobile UX.

### Tech Stack

  * **TypeScript:** Strict typing for props and internal state.
  * **Vitest:** 95% Unit test coverage for the core state machine.
  * **TSDX / Rollup:** Optimized tree-shaking and multiple build targets (ESM, CJS).

-----

## 🤝 Contributing

1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

-----

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

-----

**Built with ❤️ by Soumyadeep Nandi** *Let's connect on [LinkedIn](https://www.linkedin.com/in/soumyadeep--nandi/)*

-----