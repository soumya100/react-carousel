import type { StorybookConfig } from '@storybook/react-vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('..', import.meta.url));

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    defaultName: 'Docs',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  async viteFinal(baseConfig) {
    return {
      ...baseConfig,
      resolve: {
        ...baseConfig.resolve,
        alias: {
          ...(baseConfig.resolve?.alias ?? {}),
          '@react/carousel': resolve(rootDir, 'src/index.ts'),
        },
      },
    };
  },
};

export default config;
