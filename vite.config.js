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
    sourcemap: false, // Disable sourcemaps in production for smaller bundles
    commonjsOptions: {
      cache: false
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          styled: ['styled-components'],
          utils: ['prop-types']
        }
      }
    },
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    force: true,
    include: ['react', 'react-dom', 'react-router-dom', 'styled-components']
  },
  // Add performance optimizations
  esbuild: {
    drop: ['console', 'debugger'] // Remove console logs in production
  }
});
