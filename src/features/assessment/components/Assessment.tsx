import React, { useState } from 'react';
import { QuestionCard } from './QuestionCard';
import { useAssessment } from '../hooks/useAssessment';
import { INITIAL_QUESTIONS } from '../constants/questions';

export const Assessment: React.FC = () => {
  const { state, handleAnswer } = useAssessment();
  const currentQuestion = INITIAL_QUESTIONS[state.currentQuestionIndex];

  console.log('Assessment State:', state);
  console.log('Current Question:', currentQuestion);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">AI Readiness Assessment</h1>
      {currentQuestion ? (
        <QuestionCard
          question={currentQuestion}
          onAnswer={handleAnswer}
          isActive={true}
        />
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
};