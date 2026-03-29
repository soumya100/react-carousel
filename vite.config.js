import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const config = defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'Carousel',
      formats: ['es', 'cjs'],
      fileName: (format) =>
        format === 'es' ? 'index.esm.js' : 'index.cjs.js',
    },

    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'ReactJSXRuntime',
        },
        assetFileNames: (assetInfo) =>
          assetInfo.name === 'style.css' ? 'carousel.css' : assetInfo.name,
      },
    },

    sourcemap: true,
    minify: false,
  },
});

export default config;