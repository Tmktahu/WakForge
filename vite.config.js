import { fileURLToPath, URL } from 'node:url';
import { polyfillNode } from 'esbuild-plugin-polyfill-node';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/WakfuWizard/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      zlib: 'rollup-plugin-node-polyfills/polyfills/zlib',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      // Enable esbuild polyfill plugins
      plugins: [
        polyfillNode({
          // process: true,
          // buffer: true,
        }),
      ],
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        // Enable rollup polyfills plugin
        // used during production bundling
        rollupNodePolyFill(),
      ],
    },
  },
});
