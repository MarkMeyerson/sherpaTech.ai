// Enhanced Mobile Testing Component
import React from 'react';
import useMobileOptimizations from '../hooks/useMobileOptimizations';

const MobileTestShowcase = () => {
  const {
    deviceInfo,
    performanceMetrics,
    userPreferences,
    gestureState,
    showToast,
    hapticFeedback,
    optimizedImageUrl,
    isSupported
  } = useMobileOptimizations();

  const handleFeatureTest = (feature) => {
    hapticFeedback('medium');
    showToast(`Testing ${feature}`, 'info');
  };

  return (
    <div className="p-4 space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-ice-blue">
        <h2 className="text-xl font-bold text-navy-blue mb-4">Mobile Optimization Showcase</h2>
        
        {/* Device Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Device Info</h3>
            <div className="text-sm space-y-1">
              <div>Type: {deviceInfo.isMobile ? 'Mobile' : 'Desktop'}</div>
              <div>Screen: {deviceInfo.screenWidth}×{deviceInfo.screenHeight}</div>
              <div>Pixel Ratio: {deviceInfo.pixelRatio}</div>
              <div>Touch: {deviceInfo.touchSupport ? '✓' : '✗'}</div>
              <div>Orientation: {deviceInfo.orientation}</div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">User Preferences</h3>
            <div className="text-sm space-y-1">
              <div>Reduced Motion: {userPreferences.reducedMotion ? '✓' : '✗'}</div>
              <div>High Contrast: {userPreferences.highContrast ? '✓' : '✗'}</div>
              <div>Font Size: {userPreferences.fontSize}</div>
            </div>
          </div>
        </div>

        {/* Feature Tests */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => handleFeatureTest('Haptic Feedback')}
            className="touch-target-large bg-navy-blue text-white p-4 rounded-lg hover:bg-mountain-blue transition-colors focus-enhanced"
            disabled={!isSupported('vibration')}
          >
            {isSupported('vibration') ? '📳 Test Haptics' : '📳 Haptics N/A'}
          </button>
          
          <button
            onClick={() => showToast('Toast notification test!', 'success')}
            className="touch-target-large bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors focus-enhanced"
          >
            🔔 Show Toast
          </button>
          
          <button
            onClick={() => handleFeatureTest('Gesture Detection')}
            className="touch-target-large bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors focus-enhanced"
            {...gestureState.touchHandlers}
          >
            👆 Test Gestures
          </button>
        </div>

        {/* Performance Metrics */}
        {Object.keys(performanceMetrics).length > 0 && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Performance Metrics</h3>
            <div className="text-sm space-y-1">
              {performanceMetrics.firstContentfulPaint && (
                <div>First Contentful Paint: {Math.round(performanceMetrics.firstContentfulPaint)}ms</div>
              )}
              {performanceMetrics.largestContentfulPaint && (
                <div>Largest Contentful Paint: {Math.round(performanceMetrics.largestContentfulPaint)}ms</div>
              )}
              {performanceMetrics.memoryUsage && (
                <div>Memory Usage: {Math.round(performanceMetrics.memoryUsage / 1024 / 1024)}MB</div>
              )}
            </div>
          </div>
        )}

        {/* Responsive Design Tests */}
        <div className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-4">Responsive Design Tests</h3>
          
          {/* Fluid Typography */}
          <div className="space-y-2 mb-4">
            <div className="text-fluid-sm bg-gray-100 p-2 rounded">Fluid Small Text</div>
            <div className="text-fluid-base bg-gray-100 p-2 rounded">Fluid Base Text</div>
            <div className="text-fluid-lg bg-gray-100 p-2 rounded">Fluid Large Text</div>
            <div className="text-fluid-xl bg-gray-100 p-2 rounded">Fluid XL Text</div>
          </div>
          
          {/* Auto-fit Grid */}
          <div className="grid grid-auto-fit gap-4 mb-4">
            <div className="bg-navy-blue text-white p-4 rounded-lg text-center">Auto-fit 1</div>
            <div className="bg-mountain-blue text-white p-4 rounded-lg text-center">Auto-fit 2</div>
            <div className="bg-ice-blue text-navy-blue p-4 rounded-lg text-center">Auto-fit 3</div>
          </div>
          
          {/* Aspect Ratio Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="aspect-card bg-gradient-to-br from-navy-blue to-mountain-blue rounded-lg flex items-center justify-center text-white font-semibold">
              3:2 Aspect
            </div>
            <div className="aspect-square bg-gradient-to-br from-mountain-blue to-ice-blue rounded-lg flex items-center justify-center text-navy-blue font-semibold">
              Square
            </div>
            <div className="aspect-hero bg-gradient-to-br from-ice-blue to-pearl-white rounded-lg flex items-center justify-center text-navy-blue font-semibold">
              16:9 Hero
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileTestShowcase;
