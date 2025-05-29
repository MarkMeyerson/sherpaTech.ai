import React from 'react';

const TestApp = () => {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f0f0f0', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#1B2A4A', marginBottom: '20px' }}>
        🚀 SherpaTech.AI Test Page
      </h1>
      <p style={{ fontSize: '18px', marginBottom: '15px' }}>
        ✅ React is working!
      </p>
      <p style={{ fontSize: '16px', marginBottom: '15px' }}>
        ✅ Vite development server is running!
      </p>
      <p style={{ fontSize: '16px', marginBottom: '15px' }}>
        ✅ Basic styling is applied!
      </p>
      <div style={{ 
        backgroundColor: '#1B2A4A', 
        color: 'white', 
        padding: '15px', 
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <strong>Next Step:</strong> Test the main App.jsx components
      </div>
    </div>
  );
};

export default TestApp;
