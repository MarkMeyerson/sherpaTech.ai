import React from 'react';

const FallbackUI = ({ currentWeek }) => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🚧 Training Content Not Available</h1>
      <p>Please check if the content repository has data for Week {currentWeek}.</p>
    </div>
  );
};

export default FallbackUI;
