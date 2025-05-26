import React from 'react';
import { Assessment } from '../features/assessment/components/Assessment';

export const AssessmentTest: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Assessment Test Page</h1>
      <Assessment />
    </div>
  );
};