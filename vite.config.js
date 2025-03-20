import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Disable native modules in Rollup
    rollupOptions: {
      // Force commonjs build to avoid native dependencies
      output: {
        format: 'cjs'
      },
      // Explicitly tell rollup to use null instead of native deps
      context: 'globalThis',
      treeshake: {
        moduleSideEffects: false,
      },
    },
    // Use esbuild (faster and more reliable) for minification
    minify: 'esbuild',
  },
});
