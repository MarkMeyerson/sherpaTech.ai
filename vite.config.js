import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    middleware: () => {
      return [
        (req, res, next) => {
          // Handle static assets normally
          if (req.url.includes('.')) return next();
          
          // For all other requests, serve index.html
          const indexHtml = fs.readFileSync(
            path.resolve(__dirname, 'index.html'),
            'utf-8'
          );
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(indexHtml);
        },
      ];
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
