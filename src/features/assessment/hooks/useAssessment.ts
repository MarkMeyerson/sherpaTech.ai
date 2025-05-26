import { useState } from 'react';
import { AssessmentState } from '../types/assessment.types';

export const useAssessment = () => {
  const [state, setState] = useState<AssessmentState>({
    currentSection: 'initial',
    currentQuestionIndex: 0,
    scores: { familiarity: 0, impact: 0, motivation: 0, readiness: 0 },
    path: null,
    answers: new Map(),
  });

  const handleAnswer = (answers: any) => {
    setState((prev) => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
    }));
  };

  return { state, handleAnswer };
};