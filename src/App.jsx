import React from 'react';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <nav className="border-b bg-white/50 backdrop-blur-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-2xl font-bold text-blue-600">4SMB.ai</div>
            <div className="flex gap-4">
              <button className="px-4 py-2 hover:bg-gray-100 rounded-md">About</button>
              <button className="px-4 py-2 hover:bg-gray-100 rounded-md">Services</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Contact Us</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              AI Solutions for Small Business
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Empowering small businesses with intelligent automation and AI-driven insights to grow and succeed in the digital age.
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-lg">
                Get Started
              </button>
              <button className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 text-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg border shadow-sm">
              <h3 className="text-xl font-semibold mb-3">AI-Powered Analytics</h3>
              <p className="text-gray-600">Get actionable insights from your business data with our advanced analytics solutions.</p>
            </div>
            <div className="p-6 bg-white rounded-lg border shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Process Automation</h3>
              <p className="text-gray-600">Streamline your operations with intelligent automation tools designed for small businesses.</p>
            </div>
            <div className="p-6 bg-white rounded-lg border shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Customer Intelligence</h3>
              <p className="text-gray-600">Understand and serve your customers better with AI-driven customer insights.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-600">
            © 2025 4SMB.ai. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;