# React-Carousel

[](https://www.google.com/search?q=https://www.npmjs.com/package/react-carousel)
[](https://bundlephobia.com)
[](https://opensource.org/licenses/MIT)

A lightweight, **headless-first**, and zero-dependency carousel component for React. Built with performance, accessibility, and extreme developer flexibility in mind.

**[View Live Demo](https://your-demo-link.com) | [Report a Bug](https://www.google.com/search?q=https://github.com/soumya100/react-carousel/issues)**

-----

## 🚀 Why This Carousel?

Most React carousels are either too bloated or too rigid. **React-Ultimate-Carousel** uses a composable pattern that gives you full control over the UI while handling the complex logic of touch gestures, transitions, and state under the hood.

  * **⚡ High Performance:** Hardware-accelerated transitions ($60$fps) with CSS variables.
  * **🧩 Headless Hooks:** Use our logic with your own custom UI components via `useCarousel`.
  * **📱 Touch & Swipe:** Native-feeling touch support with configurable friction and velocity.
  * **♿ Accessible:** Full keyboard navigation, ARIA-live regions, and focus management.
  * **📦 Tiny Footprint:** Under **5kB** gzipped. Zero external dependencies.

-----

## 📦 Installation

```bash
npm install react-ultimate-carousel
# or
yarn add react-ultimate-carousel
```

-----

## 🛠️ Basic Usage

```jsx
import { Carousel, Slide } from 'react-ultimate-carousel';

const MyComponent = () => (
  <Carousel autoPlay interval={3000} loop>
    <Slide>
      <img src="landscape-1.jpg" alt="Nature" />
    </Slide>
    <Slide>
      <div className="custom-card">Custom Content Works Too!</div>
    </Slide>
  </Carousel>
);
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