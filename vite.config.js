import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    headers: {
      'Cache-Control': 'no-store'
    }
  },
  build: {
    manifest: true,
    commonjsOptions: {
      cache: false
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['prop-types']
        }
      }
    }
  },
  optimizeDeps: {
    force: true
  }
});
