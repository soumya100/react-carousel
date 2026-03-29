import { useState } from 'react';
import { AccordionCarousel, Carousel } from '@react/carousel';

// Sample data type
interface SampleItem {
  id: number;
  title: string;
  image: string;
}

// Sample data
const sampleItems: SampleItem[] = [
  { id: 1, title: 'Mountain View', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' },
  { id: 2, title: 'Ocean Sunset', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop' },
  { id: 3, title: 'Forest Path', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop' },
  { id: 4, title: 'City Lights', image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=300&fit=crop' },
  { id: 5, title: 'Desert Dunes', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' },
  { id: 6, title: 'Snowy Peaks', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' },
  { id: 7, title: 'Tropical Beach', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop' },
  { id: 8, title: 'Autumn Forest', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop' },
];

function App() {
  const [status, setStatus] = useState<'success' | 'loading' | 'error'>('success');
  const [expanded, setExpanded] = useState(false);

  const renderItem = (item: SampleItem) => (
    <div className="relative group cursor-pointer">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-48 object-cover rounded-lg transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
        <h3 className="text-white font-semibold text-lg">{item.title}</h3>
      </div>
    </div>
  );

  const renderCardItem = (item: SampleItem) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-32 object-cover rounded mb-4"
      />
      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
      <p className="text-gray-600 text-sm">
        Beautiful landscape photography showcasing nature&apos;s wonders.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">@react/carousel Demo</h1>
          <p className="text-gray-600 mt-2">
            Production-grade responsive carousel - React 19 + Tailwind v4 + Radix UI
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Controls */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Demo Controls</h2>
          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                checked={status === 'success'}
                onChange={() => setStatus('success')}
              />
              Success
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                checked={status === 'loading'}
                onChange={() => setStatus('loading')}
              />
              Loading
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                checked={status === 'error'}
                onChange={() => setStatus('error')}
              />
              Error
            </label>
          </div>
        </div>

        {/* Basic Carousel */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Basic Carousel</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Carousel<SampleItem>
              items={sampleItems}
              renderItem={renderItem}
              getItemKey={(item) => item.id}
              status={status}
              responsiveSlides={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
              infinite
              showDots
              showNavigation
            />
          </div>
        </section>

        {/* Card Carousel */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Card Carousel</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Carousel<SampleItem>
              items={sampleItems}
              renderItem={renderCardItem}
              getItemKey={(item) => item.id}
              status={status}
              responsiveSlides={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
              infinite
              showDots
              showNavigation
            />
          </div>
        </section>

        {/* Accordion Carousel */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Accordion Carousel</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={expanded}
                  onChange={(event) => setExpanded(event.target.checked)}
                />
                Controlled Expanded State
              </label>
            </div>
            <AccordionCarousel<SampleItem>
              items={sampleItems}
              renderItem={renderCardItem}
              getItemKey={(item) => item.id}
              status={status}
              responsiveSlides={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
              infinite
              showDots
              expanded={expanded}
              onExpandChange={setExpanded}
            />
          </div>
        </section>

        {/* Custom Styling */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Custom Styling</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Carousel<SampleItem>
              items={sampleItems.slice(0, 4)}
              renderItem={renderItem}
              getItemKey={(item) => item.id}
              status={status}
              responsiveSlides={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
              infinite
              showDots
              showNavigation
              className="border-2 border-blue-500 rounded-xl"
              viewportClassName="p-8"
              slideClassName="mx-2"
              prevButtonClassName="bg-blue-500 hover:bg-blue-600 text-white"
              nextButtonClassName="bg-blue-500 hover:bg-blue-600 text-white"
              dotsContainerClassName="mt-8"
              dotClassName="bg-blue-200"
              activeDotClassName="bg-blue-500 scale-125"
            />
          </div>
        </section>

        {/* Empty State */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Empty State</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Carousel<SampleItem>
              items={[]}
              renderItem={renderItem}
              getItemKey={(item) => item.id}
              status="success"
              responsiveSlides={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">Built with love using @react/carousel</p>
            <p className="text-sm">
              <a href="https://github.com/soumya100/react-carousel" className="text-blue-500 hover:underline">
                View on GitHub
              </a>
              {' | '}
              <a href="https://www.npmjs.com/package/@react/carousel" className="text-blue-500 hover:underline">
                View on npm
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
