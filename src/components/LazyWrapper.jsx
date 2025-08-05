import React, { Suspense } from 'react';

/**
 * Lazy loading wrapper component for code splitting
 * @param {Object} props
 * @param {React.ComponentType} props.component - The component to lazy load
 * @param {React.ReactNode} props.fallback - Loading fallback UI
 * @param {React.ReactNode} props.children - Child components
 */
const LazyWrapper = ({ 
  component: Component, 
  fallback = <div className="flex justify-center items-center h-32"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>,
  children,
  ...props 
}) => {
  if (Component) {
    return (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

export default LazyWrapper;
