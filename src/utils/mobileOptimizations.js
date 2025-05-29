// Mobile optimization utilities for SherpaTech.AI Training App

/**
 * Detect mobile device capabilities and characteristics
 */
export const detectMobileCapabilities = () => {
  const isMobile = window.innerWidth <= 768;
  const hasTouch = 'ontouchstart' in window;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  const supportsVibration = 'vibrate' in navigator;
  const pixelRatio = window.devicePixelRatio || 1;
  const isRetinaDisplay = pixelRatio >= 2;
  
  return {
    isMobile,
    hasTouch,
    isIOS,
    isAndroid,
    supportsVibration,
    pixelRatio,
    isRetinaDisplay,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    orientation: window.screen?.orientation?.type || 'unknown',
    connectionType: navigator.connection?.effectiveType || 'unknown',
    deviceMemory: navigator.deviceMemory || null,
    hardwareConcurrency: navigator.hardwareConcurrency || null
  };
};

/**
 * Optimize touch events for better mobile performance
 */
export const optimizeTouchEvent = (callback, options = {}) => {
  const { passive = true, capture = false } = options;
  
  return (event) => {
    // Prevent default only when necessary
    if (!passive && event.cancelable) {
      event.preventDefault();
    }
    
    // Throttle touch events for performance
    if (event.type === 'touchmove') {
      requestAnimationFrame(() => callback(event));
    } else {
      callback(event);
    }
  };
};

/**
 * Create haptic feedback patterns
 */
export const createHapticFeedback = (type = 'light') => {
  if (!navigator.vibrate) return () => {};
  
  const patterns = {
    light: [10],
    medium: [50],
    heavy: [100],
    success: [50, 50, 50],
    error: [100, 50, 100],
    warning: [75, 25, 75],
    notification: [25, 25, 25, 25, 25]
  };
  
  return () => {
    navigator.vibrate(patterns[type] || patterns.light);
  };
};

/**
 * Manage mobile loading states with performance optimization
 */
export const createLoadingManager = () => {
  let isLoading = false;
  let loadingType = '';
  
  const setLoading = (loading, type = '') => {
    isLoading = loading;
    loadingType = type;
    
    // Prevent body scroll during loading
    if (loading) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('loading-active');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('loading-active');
    }
    
    return { isLoading, loadingType };
  };
  
  return { setLoading, getLoading: () => ({ isLoading, loadingType }) };
};

/**
 * Create optimized toast notification system
 */
export const createToastManager = () => {
  const toasts = new Map();
  
  const showToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    const toast = { id, message, type, timestamp: id };
    
    toasts.set(id, toast);
    
    // Trigger haptic feedback
    createHapticFeedback(type)();
    
    // Auto-remove after duration
    setTimeout(() => {
      toasts.delete(id);
    }, duration);
    
    return toast;
  };
  
  const removeToast = (id) => {
    toasts.delete(id);
  };
  
  return { showToast, removeToast, getToasts: () => Array.from(toasts.values()) };
};

/**
 * Optimize images for mobile devices
 */
export const optimizeImageForMobile = (src, options = {}) => {
  const { width, quality = 0.8, format = 'webp' } = options;
  const deviceCapabilities = detectMobileCapabilities();
  
  // For high DPI displays, use 2x images
  const scaleFactor = deviceCapabilities.isRetinaDisplay ? 2 : 1;
  const optimizedWidth = width ? width * scaleFactor : null;
  
  // Create optimized image URL (this would typically involve a service)
  const params = new URLSearchParams();
  if (optimizedWidth) params.append('w', optimizedWidth);
  params.append('q', Math.round(quality * 100));
  params.append('f', format);
  
  return `${src}?${params.toString()}`;
};

/**
 * Create gesture detection utility
 */
export const createGestureDetector = (options = {}) => {
  const { 
    minSwipeDistance = 50,
    maxSwipeTime = 300,
    preventScroll = false 
  } = options;
  
  let startTouch = null;
  let startTime = null;
  
  const onTouchStart = (e) => {
    const touch = e.touches[0];
    startTouch = {
      x: touch.clientX,
      y: touch.clientY
    };
    startTime = Date.now();
  };
  
  const onTouchEnd = (e) => {
    if (!startTouch || !startTime) return null;
    
    const touch = e.changedTouches[0];
    const endTouch = {
      x: touch.clientX,
      y: touch.clientY
    };
    
    const deltaTime = Date.now() - startTime;
    const deltaX = endTouch.x - startTouch.x;
    const deltaY = endTouch.y - startTouch.y;
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const isQuickEnough = deltaTime < maxSwipeTime;
    const isLongEnough = distance > minSwipeDistance;
    
    if (isQuickEnough && isLongEnough) {
      const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
      let direction = null;
      
      if (Math.abs(angle) < 45) direction = 'right';
      else if (Math.abs(angle) > 135) direction = 'left';
      else if (angle > 45 && angle < 135) direction = 'down';
      else if (angle < -45 && angle > -135) direction = 'up';
      
      if (preventScroll && (direction === 'up' || direction === 'down')) {
        e.preventDefault();
      }
      
      return {
        direction,
        distance,
        deltaTime,
        startTouch,
        endTouch
      };
    }
    
    return null;
  };
  
  return { onTouchStart, onTouchEnd };
};

/**
 * Monitor mobile performance metrics
 */
export const createPerformanceMonitor = () => {
  const metrics = {};
  
  const startMeasurement = (name) => {
    metrics[name] = { start: performance.now() };
  };
  
  const endMeasurement = (name) => {
    if (metrics[name]) {
      metrics[name].end = performance.now();
      metrics[name].duration = metrics[name].end - metrics[name].start;
    }
  };
  
  const getMetrics = () => ({ ...metrics });
  
  const observePerformance = (callback) => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        callback(entries);
      });
      
      try {
        observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'navigation'] });
        return observer;
      } catch (e) {
        console.warn('Performance Observer not supported', e);
        return null;
      }
    }
    return null;
  };
  
  return { startMeasurement, endMeasurement, getMetrics, observePerformance };
};

/**
 * Create mobile-optimized scroll handler
 */
export const createMobileScrollHandler = (options = {}) => {
  const { throttleMs = 16 } = options;
  let ticking = false;
  
  const handleScroll = (callback) => {
    return () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          callback();
          ticking = false;
        });
        ticking = true;
      }
    };
  };
  
  return { handleScroll };
};

/**
 * Accessibility helpers for mobile
 */
export const createAccessibilityHelpers = () => {
  const announceToScreenReader = (message) => {
    const announcer = document.getElementById('mobile-announcer') || 
                    document.querySelector('[aria-live]');
    
    if (announcer) {
      announcer.textContent = message;
      // Clear after announcement
      setTimeout(() => {
        announcer.textContent = '';
      }, 1000);
    }
  };
  
  const checkReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };
  
  const checkHighContrast = () => {
    return window.matchMedia('(prefers-contrast: high)').matches;
  };
  
  const getFontSizePreference = () => {
    return localStorage.getItem('fontSizePreference') || 'medium';
  };
  
  return {
    announceToScreenReader,
    checkReducedMotion,
    checkHighContrast,
    getFontSizePreference
  };
};

export default {
  detectMobileCapabilities,
  optimizeTouchEvent,
  createHapticFeedback,
  createLoadingManager,
  createToastManager,
  optimizeImageForMobile,
  createGestureDetector,
  createPerformanceMonitor,
  createMobileScrollHandler,
  createAccessibilityHelpers
};
