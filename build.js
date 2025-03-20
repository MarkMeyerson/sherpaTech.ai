// Custom build script to bypass Rollup optional dependency issues
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting custom build process...');

// Make sure the output directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

try {
  // Use Vite directly bypassing Rollup native dependencies
  console.log('Running Vite build with specific options...');
  
  // Set environment variable to disable Rollup native dependencies
  process.env.ROLLUP_NATIVE_DISABLE = 'true';
  
  execSync('npx vite build --force', { 
    stdio: 'inherit'
  });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
