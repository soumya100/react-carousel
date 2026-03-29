// Components
export { default } from './components/Carousel';
export { default as AccordionCarousel } from './components/AccordionCarousel';
export { NavButton } from './components/NavButton';
export { CarouselDots } from './components/CarouselDots';
export { LazySlide } from './components/LazySlide';
export { SlideErrorBoundary } from './components/SlideErrorBoundary';
export { CarouselSkeleton } from './components/CarouselSkeleton';
export { CarouselEmpty } from './components/CarouselEmpty';

// Hooks
export { useCarouselState } from './hooks/useCarouselState';
export { useVisibleSlides } from './hooks/useVisibleSlides';

// Utils
export { cn } from './utils/cn';

// CSS — consuming app imports once: import '@your-org/carousel/styles'
import './styles/carousel.css';
