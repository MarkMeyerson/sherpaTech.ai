import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    middleware: () => {
      return [
        (req, res, next) => {
          if (req.url.includes('.')) return next();
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(fs.readFileSync('index.html'));
        },
      ];
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
