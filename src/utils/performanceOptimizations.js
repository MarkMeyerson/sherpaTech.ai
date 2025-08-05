/**
 * Performance optimization utilities for the application
 */

class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    // Preload critical resources
    this.preloadCriticalResources();
    
    // Initialize lazy loading for images
    this.initLazyLoading();
    
    // Setup performance monitoring
    this.setupPerformanceMonitoring();
  }

  preloadCriticalResources() {
    // Preload critical images
    const criticalImages = [
      '/sherpa-logo.svg',
      '/mountain-ai.jpg',
      '/ai-serpa.jpg'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  initLazyLoading() {
    // Use Intersection Observer for lazy loading images
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          }
        });
      });

      // Observe all lazy load images
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  setupPerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
      // This would require web-vitals library, but we'll keep it simple
      console.log('Performance monitoring initialized');
    }

    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
              console.warn('Long task detected:', entry.duration, 'ms');
            }
          }
        });
        observer.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        console.log('Long task monitoring not supported');
      }
    }
  }

  // Debounce utility for performance-sensitive operations
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Throttle utility for scroll/resize events
  static throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Initialize performance optimizations
new PerformanceOptimizer();

export default PerformanceOptimizer;
