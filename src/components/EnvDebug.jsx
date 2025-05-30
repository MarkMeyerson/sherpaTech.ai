// Debug component to check environment variables in development
import React from 'react';

const EnvDebug = () => {
  // Only show in development
  if (import.meta.env.PROD) {
    return null;
  }

  const envVars = {
    'VITE_SUPABASE_URL': import.meta.env.VITE_SUPABASE_URL,
    'VITE_SUPABASE_ANON_KEY': import.meta.env.VITE_SUPABASE_ANON_KEY,
    'REACT_APP_SUPABASE_URL': import.meta.env.REACT_APP_SUPABASE_URL,
    'REACT_APP_SUPABASE_ANON_KEY': import.meta.env.REACT_APP_SUPABASE_ANON_KEY,
  };

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '10px', 
      right: '10px', 
      background: 'rgba(0,0,0,0.8)', 
      color: 'white', 
      padding: '10px', 
      borderRadius: '5px', 
      fontSize: '12px',
      maxWidth: '300px',
      zIndex: 9999 
    }}>
      <h4>Environment Variables (Dev Only)</h4>
      {Object.entries(envVars).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong> {value ? '✅ Set' : '❌ Not set'}
        </div>
      ))}
    </div>
  );
};

export default EnvDebug;
