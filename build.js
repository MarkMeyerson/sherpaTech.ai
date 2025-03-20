// Custom build script to bypass Rollup optional dependency issues
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Starting custom build process...');

// Make sure the output directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

try {
  // Use Vite directly bypassing Rollup native dependencies
  console.log('Running Vite build with specific options...');
  execSync('npx vite build --force', { 
    env: { ...process.env, ROLLUP_NATIVE_DISABLE: 'true' },
    stdio: 'inherit'
  });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
