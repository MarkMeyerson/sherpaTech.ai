import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
