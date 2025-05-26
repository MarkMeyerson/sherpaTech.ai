import React, { useState } from 'react';
import { QuestionCard } from './QuestionCard';
import { useAssessment } from '../hooks/useAssessment';
import { INITIAL_QUESTIONS } from '../constants/questions';
import { motion, AnimatePresence } from 'framer-motion';

export const Assessment: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const { state, handleAnswer } = useAssessment();

  if (!isStarted) {
    return (
      <div className="text-center">
        <button
          onClick={() => setIsStarted(true)}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Start Your Assessment
        </button>
      </div>
    );
  }

  const currentQuestion = INITIAL_QUESTIONS[state.currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        <QuestionCard
          key={currentQuestion.id}
          question={currentQuestion}
          onAnswer={handleAnswer}
          isActive={true}
        />
      </AnimatePresence>
    </div>
  );
};