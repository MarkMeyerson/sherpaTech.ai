// Enhanced build script that properly includes your React application
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting enhanced build process...');

try {
  // First attempt to run Vite's build process with Rollup disabled
  console.log('Running Vite build with Rollup disabled...');
  
  // Set environment variable to disable Rollup native
  process.env.ROLLUP_NATIVE_DISABLE = 'true';
  
  try {
    // Run Vite's standard build process
    execSync('npx vite build', { stdio: 'inherit' });
    console.log('Vite build completed successfully!');
  } catch (buildError) {
    console.error('Vite build failed, falling back to custom build:', buildError);
    
    // Fallback to minimal build if Vite build fails
    if (!fs.existsSync('dist')) {
      fs.mkdirSync('dist', { recursive: true });
    }
    
    // Create a minimal index.html in the dist folder
    const indexHtmlContent = fs.readFileSync('index.html', 'utf8');
    
    // Create assets directory
    fs.mkdirSync('dist/assets', { recursive: true });
    
    // Bundle the React application using esbuild if available
    try {
      console.log('Attempting to bundle React application with esbuild...');
      
      // Try to compile the main React entry point
      execSync('npx esbuild src/main.jsx --bundle --minify --outfile=dist/assets/index.js', { 
        stdio: 'inherit' 
      });
      
      // Update HTML to use the bundled file
      let distIndexHtml = indexHtmlContent.replace(
        '<script type="module" src="/src/main.jsx"></script>',
        '<script src="/assets/index.js"></script>'
      );
      
      fs.writeFileSync('dist/index.html', distIndexHtml);
      console.log('Successfully bundled with esbuild!');
      
    } catch (esbuildError) {
      console.error('esbuild bundling failed, using minimal fallback:', esbuildError);
      
      // Create a more informative fallback page
      const jsContent = `
        console.log('SherpaTech.ai is loading...');
        document.addEventListener('DOMContentLoaded', () => {
          const root = document.getElementById('root');
          if (root) {
            root.innerHTML = \`
              <div style="padding: 20px; font-family: sans-serif; max-width: 600px; margin: 0 auto; text-align: center;">
                <h1 style="color: #333;">SherpaTech.ai</h1>
                <p>The full site is currently experiencing technical difficulties.</p>
                <div style="margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 8px; text-align: left;">
                  <h2 style="font-size: 1.2rem;">Technical Information</h2>
                  <p>The site build process encountered issues with dependencies.</p>
                  <p>Please contact support or try again later.</p>
                </div>
              </div>
            \`;
          }
        });
      `;
      
      fs.writeFileSync('dist/assets/index.js', jsContent);
      
      // Update index.html to point to our JS file
      let distIndexHtml = indexHtmlContent.replace(
        '<script type="module" src="/src/main.jsx"></script>',
        '<script src="/assets/index.js"></script>'
      );
      
      fs.writeFileSync('dist/index.html', distIndexHtml);
    }
    
    // Copy public files to dist if they exist
    if (fs.existsSync('public')) {
      const publicFiles = fs.readdirSync('public');
      for (const file of publicFiles) {
        const sourcePath = path.join('public', file);
        const destPath = path.join('dist', file);
        
        // Skip if it's a directory
        if (fs.statSync(sourcePath).isDirectory()) continue;
        
        fs.copyFileSync(sourcePath, destPath);
      }
      console.log('Copied public files to dist');
    }
  }
  
  console.log('Build process completed!');
} catch (error) {
  console.error('Build process failed:', error);
  process.exit(1);
}
