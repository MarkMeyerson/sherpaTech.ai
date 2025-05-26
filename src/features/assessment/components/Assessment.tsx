import React from 'react';
import { INITIAL_QUESTIONS } from '../constants/questions';

export const Assessment: React.FC = () => {
  console.log('INITIAL_QUESTIONS:', INITIAL_QUESTIONS);

  return (
    <div>
      <h2>Assessment Component Loaded</h2>
      <p>Check the console for INITIAL_QUESTIONS.</p>
    </div>
  );
};