import { useState } from 'react';
import { AssessmentState, Answer } from '../types/assessment.types';

export const useAssessment = () => {
  const [state, setState] = useState<AssessmentState>({
    currentSection: 'initial',
    currentQuestionIndex: 0,
    scores: { familiarity: 0, readiness: 0, motivation: 0, complexity: 0 },
    path: null,
  });

  const handleAnswer = (answers: Answer[]) => {
    setState((prev) => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
    }));
  };

  return { state, handleAnswer };
};