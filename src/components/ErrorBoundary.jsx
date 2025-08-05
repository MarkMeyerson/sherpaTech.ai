import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // In production, you might want to send this to an error reporting service
    if (import.meta.env.PROD) {
      // Send to error tracking service
      console.error('Production error:', { error, errorInfo });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md mx-auto text-center p-6">
            <div className="text-6xl mb-4">🚧</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We apologize for the inconvenience. Please refresh the page or try again later.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Refresh Page
              </button>
              <a
                href="/"
                className="block w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Go to Homepage
              </a>
            </div>
            {import.meta.env.DEV && (
              <details className="mt-4 text-left text-sm text-gray-500">
                <summary className="cursor-pointer">Error details (dev only)</summary>
                <pre className="mt-2 whitespace-pre-wrap">
                  {this.state.error && this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;