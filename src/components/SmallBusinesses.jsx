import React from 'react';

const SmallBusinesses = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Small Business Solutions</h1>
      <div className="max-w-4xl text-center">
        <p className="text-xl mb-6">
          Empower your small business with AI-driven solutions that drive growth and efficiency
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Business Analytics</h3>
            <p>Transform your data into actionable insights with our AI-powered analytics tools</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Customer Insights</h3>
            <p>Understand your customers better with advanced pattern recognition and behavior analysis</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallBusinesses;