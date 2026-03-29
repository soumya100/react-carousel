import React, { ReactNode, JSX } from 'react';

interface LazySlideProps {
  children: ReactNode;
}

/**
 * Component that lazily renders its children when they become visible in viewport
 */
export function LazySlide({ children }: LazySlideProps): JSX.Element {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return <div ref={ref}>{visible ? children : null}</div>;
}
