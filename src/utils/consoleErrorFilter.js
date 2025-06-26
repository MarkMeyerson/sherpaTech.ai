// Error boundary and console error suppression for external scripts
class ConsoleErrorFilter {
  constructor() {
    this.originalConsoleError = console.error;
    this.init();
  }

  init() {
    // Filter out known external script errors
    console.error = (...args) => {
      const message = args[0];
      
      // Skip ChatGPT extension errors
      if (typeof message === 'string' && 
          (message.includes('chatgpt.com') || 
           message.includes('duplicate id') && message.includes('LastPass') ||
           message.includes('Invalid frameId') ||
           message.includes('background-redux-new'))) {
        return; // Suppress these errors
      }
      
      // Skip browser extension errors
      if (typeof message === 'string' && 
          (message.includes('extension') ||
           message.includes('chrome-extension') ||
           message.includes('moz-extension'))) {
        return;
      }
      
      // Log all other errors normally
      this.originalConsoleError.apply(console, args);
    };
  }

  restore() {
    console.error = this.originalConsoleError;
  }
}

// Initialize in development mode only
if (import.meta.env.DEV) {
  new ConsoleErrorFilter();
}

export default ConsoleErrorFilter;
