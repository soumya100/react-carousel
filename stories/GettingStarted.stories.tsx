import type { Meta, StoryObj } from '@storybook/react-vite';

function GettingStartedPage() {
  return (
    <div className="mx-auto grid w-full max-w-5xl gap-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_30px_120px_-60px_rgba(15,23,42,0.35)]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">
          Package docs
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">
          Storybook for @react/carousel
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          This Storybook is separate from the demo app. Use it to document the npm
          package API, customization hooks, and exported building blocks, then host
          the generated `storybook-static` output wherever you publish component docs.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-lg font-semibold text-slate-900">Run locally</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Start the package docs with <code>npm run storybook</code>.
          </p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-lg font-semibold text-slate-900">Build static docs</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Generate hostable docs with <code>npm run build-storybook</code>.
          </p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-lg font-semibold text-slate-900">Package-first</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Stories resolve <code>@react/carousel</code> to local source so docs stay
            accurate while you build the npm package.
          </p>
        </section>
      </div>
    </div>
  );
}

const meta = {
  title: 'Getting Started/Package Docs',
  component: GettingStartedPage,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Overview page for the standalone Storybook that documents the npm package outside the demo application.',
      },
    },
  },
} satisfies Meta<typeof GettingStartedPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
