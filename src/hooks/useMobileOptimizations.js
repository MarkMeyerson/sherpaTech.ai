import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  detectMobileCapabilities, 
  createGestureDetector, 
  createHapticFeedback,
  createAccessibilityHelpers 
} from '../utils/mobileOptimizations';

/**
 * Custom hook for mobile optimizations and responsive behavior
 */
export const useMobileOptimizations = (options = {}) => {
  const {
    enableGestures = true,
    enableHaptics = true,
    enablePerformanceMonitoring = false,
    swipeThreshold = 50
  } = options;

  // Device capabilities
  const [deviceInfo, setDeviceInfo] = useState(() => detectMobileCapabilities());
  const [isMobile, setIsMobile] = useState(deviceInfo.isMobile);
  
  // Performance states
  const [performanceMetrics, setPerformanceMetrics] = useState({});
  const [connectionStatus, setConnectionStatus] = useState('online');
  
  // User preferences
  const [userPreferences, setUserPreferences] = useState({
    reducedMotion: false,
    highContrast: false,
    fontSize: 'medium'
  });
  
  // Gesture states
  const [gestureState, setGestureState] = useState(null);
  const gestureDetector = useRef(null);
  
  // Accessibility helpers
  const accessibilityHelpers = useRef(createAccessibilityHelpers());
  
  // Initialize device detection and monitoring
  useEffect(() => {
    const updateDeviceInfo = () => {
      const newDeviceInfo = detectMobileCapabilities();
      if (newDeviceInfo) {
        setDeviceInfo(newDeviceInfo);
        setIsMobile(newDeviceInfo.isMobile);
      } else {
        console.error('Failed to detect mobile capabilities');
      }
    };
    
    const handleOnline = () => setConnectionStatus('online');
    const handleOffline = () => setConnectionStatus('offline');
    
    // Initial setup
    updateDeviceInfo();
    setConnectionStatus(navigator.onLine ? 'online' : 'offline');
    
    // Event listeners
    window.addEventListener('resize', updateDeviceInfo);
    window.addEventListener('orientationchange', updateDeviceInfo);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
      window.removeEventListener('orientationchange', updateDeviceInfo);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Update user preferences
  useEffect(() => {
    const { checkReducedMotion, checkHighContrast, getFontSizePreference } = 
          accessibilityHelpers.current;
    
    setUserPreferences({
      reducedMotion: checkReducedMotion(),
      highContrast: checkHighContrast(),
      fontSize: getFontSizePreference()
    });
    
    // Listen for preference changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    
    const handleMotionChange = (e) => {
      setUserPreferences(prev => ({ ...prev, reducedMotion: e.matches }));
    };
    
    const handleContrastChange = (e) => {
      setUserPreferences(prev => ({ ...prev, highContrast: e.matches }));
    };
    
    motionQuery.addEventListener('change', handleMotionChange);
    contrastQuery.addEventListener('change', handleContrastChange);
    
    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      contrastQuery.removeEventListener('change', handleContrastChange);
    };
  }, []);
  
  // Initialize gesture detection
  useEffect(() => {
    if (enableGestures && isMobile) {
      gestureDetector.current = createGestureDetector({
        minSwipeDistance: swipeThreshold,
        maxSwipeTime: 300
      });
    }
  }, [enableGestures, isMobile, swipeThreshold]);
  
  // Performance monitoring
  useEffect(() => {
    if (!enablePerformanceMonitoring || !isMobile) return;
    
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const metrics = {};
      
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          metrics.firstContentfulPaint = entry.startTime;
        }
        if (entry.entryType === 'largest-contentful-paint') {
          metrics.largestContentfulPaint = entry.startTime;
        }
        if (entry.entryType === 'navigation') {
          metrics.navigationStart = entry.startTime;
          metrics.loadComplete = entry.loadEventEnd;
        }
      });
      
      setPerformanceMetrics(prev => ({ ...prev, ...metrics }));
    });
    
    try {
      observer.observe({ 
        entryTypes: ['paint', 'largest-contentful-paint', 'navigation'] 
      });
    } catch (e) {
      console.warn('Performance Observer not supported');
    }
    
    return () => observer.disconnect();
  }, [enablePerformanceMonitoring, isMobile]);
  
  // Haptic feedback function
  const triggerHaptic = useCallback((type = 'light') => {
    if (enableHaptics && deviceInfo.supportsVibration) {
      createHapticFeedback(type)();
    }
  }, [enableHaptics, deviceInfo.supportsVibration]);
  
  // Screen reader announcement
  const announceToScreenReader = useCallback((message) => {
    accessibilityHelpers.current.announceToScreenReader(message);
  }, []);
  
  // Touch event handlers
  const handleTouchStart = useCallback((e) => {
    if (!gestureDetector.current) return;
    
    gestureDetector.current.onTouchStart(e);
    
    // Trigger light haptic feedback on touch
    triggerHaptic('light');
  }, [triggerHaptic]);
  
  const handleTouchEnd = useCallback((e) => {
    if (!gestureDetector.current) return;
    
    const gesture = gestureDetector.current.onTouchEnd(e);
    if (gesture) {
      setGestureState(gesture);
      
      // Trigger feedback based on gesture
      triggerHaptic('medium');
      
      // Clear gesture state after a delay
      setTimeout(() => setGestureState(null), 300);
      
      return gesture;
    }
    return null;
  }, [triggerHaptic]);
  
  // Optimized scroll handler
  const createOptimizedScrollHandler = useCallback((callback) => {
    let ticking = false;
    
    return () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          callback();
          ticking = false;
        });
        ticking = true;
      }
    };
  }, []);
  
  // Toast notification with haptics
  const showToastWithHaptics = useCallback((message, type = 'info', duration = 3000) => {
    // Trigger appropriate haptic feedback
    const hapticType = {
      success: 'success',
      error: 'error',
      warning: 'warning',
      info: 'light'
    }[type] || 'light';
    
    triggerHaptic(hapticType);
    
    return {
      message,
      type,
      timestamp: Date.now(),
      duration
    };
  }, [triggerHaptic]);
  
  // Check if device supports a specific feature
  const checkFeatureSupport = useCallback((feature) => {
    const supportMap = {
      vibration: deviceInfo.supportsVibration,
      touch: deviceInfo.hasTouch,
      retina: deviceInfo.isRetinaDisplay,
      deviceMemory: deviceInfo.deviceMemory !== null,
      hardwareConcurrency: deviceInfo.hardwareConcurrency !== null,
      performanceObserver: 'PerformanceObserver' in window,
      intersectionObserver: 'IntersectionObserver' in window,
      webgl: (() => {
        try {
          const canvas = document.createElement('canvas');
          return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
        } catch (e) {
          return false;
        }
      })()
    };
    
    return supportMap[feature] || false;
  }, [deviceInfo]);
  
  // Get responsive breakpoint
  const getBreakpoint = useCallback(() => {
    const width = deviceInfo.screenWidth;
    if (width < 640) return 'xs';
    if (width < 768) return 'sm';
    if (width < 1024) return 'md';
    if (width < 1280) return 'lg';
    return 'xl';
  }, [deviceInfo.screenWidth]);
  
  // Check if current view is in landscape mode
  const isLandscape = deviceInfo.screenWidth > deviceInfo.screenHeight;
  
  return {
    // Device information
    deviceInfo,
    isMobile,
    isLandscape,
    breakpoint: getBreakpoint(),
    
    // Performance and connectivity
    performanceMetrics,
    connectionStatus,
    
    // User preferences
    userPreferences,
    
    // Gesture handling
    gestureState,
    handleTouchStart,
    handleTouchEnd,
    
    // Utility functions
    triggerHaptic,
    announceToScreenReader,
    createOptimizedScrollHandler,
    showToastWithHaptics,
    checkFeatureSupport,
    
    // Helper booleans
    supportsVibration: deviceInfo.supportsVibration,
    hasTouch: deviceInfo.hasTouch,
    isRetinaDisplay: deviceInfo.isRetinaDisplay,
    isOnline: connectionStatus === 'online',
    prefersReducedMotion: userPreferences.reducedMotion,
    prefersHighContrast: userPreferences.highContrast
  };
};

export default useMobileOptimizations;
