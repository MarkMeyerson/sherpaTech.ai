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
    sourcemap: false,
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor';
            if (id.includes('styled-components')) return 'styled';
            if (id.includes('react-router')) return 'router';
            return 'vendor';
          }
          // Split large components
          if (id.includes('SherpaSkill') || id.includes('FiveWeekJourney') || 
              id.includes('WhoIsThisFor') || id.includes('SignatureOutcomes')) {
            return 'components';
          }
        }
      }
    },
    chunkSizeWarningLimit: 500 // Stricter limit
  },
  optimizeDeps: {
    force: true,
    include: ['react', 'react-dom', 'react-router-dom', 'styled-components']
  },
  esbuild: {
    drop: ['console', 'debugger'],
    legalComments: 'none'
  }
});
