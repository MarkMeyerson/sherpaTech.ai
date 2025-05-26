import { useState, useCallback } from 'react';
import { AssessmentState, AssessmentScore, AssessmentPath, Answer } from '../types/assessment.types';

interface ScoreWeights {
  familiarity: number;
  impact: number;
  motivation: number;
  readiness: number;
}

const SCORE_WEIGHTS: ScoreWeights = {
  familiarity: 0.4,
  impact: 0.3,
  motivation: 0.2,
  readiness: 0.1
};

export const useAssessment = () => {
  const [state, setState] = useState<AssessmentState>({
    currentSection: 'initial',
    scores: {
      familiarity: 0,
      impact: 0,
      motivation: 0,
      readiness: 0
    },
    path: null,
    currentQuestionIndex: 0,
    answers: new Map()
  });

  const calculatePath = useCallback((scores: AssessmentScore): AssessmentPath => {
    const { familiarity, impact, motivation, readiness } = scores;

    // Step 1: Familiarity Gate
    if (familiarity <= 1) { // "never heard" or "heard but don't know"
      return 'zero-knowledge';
    }

    // Step 2: Impact + Motivation Evaluation
    const motivationScore = motivation / 4; // Normalize to 0-1 scale
    const impactScore = impact / 5; // Already 0-1 scale

    if (impactScore <= 0.4 && motivationScore <= 0.25) { // Impact ≤ 2 and 1 or fewer motivators
      return 'zero-knowledge';
    }

    if (impactScore === 0.6 || motivationScore === 0.5) { // Impact = 3 or 2 motivators
      return 'some-awareness';
    }

    if (impactScore >= 0.8 && motivationScore >= 0.75) { // Impact ≥ 4 and 3+ motivators
      return 'knowledgeable';
    }

    // Step 3: Readiness Override
    if (readiness >= 0.8) { // "Likely" or "Very likely"
      if (state.path === 'zero-knowledge') return 'some-awareness';
      if (state.path === 'some-awareness') return 'knowledgeable';
    }

    return 'some-awareness'; // Default path
  }, [state.path]);

  const handleAnswer = useCallback((questionId: string, answer: Answer | Answer[]) => {
    setState(prev => {
      const newAnswers = new Map(prev.answers);
      newAnswers.set(questionId, answer);

      // Calculate new scores based on answers
      const newScores = { ...prev.scores };
      
      // Handle different question types
      if (questionId === 'familiarity') {
        const ans = Array.isArray(answer) ? answer[0] : answer;
        newScores.familiarity = Number(ans.value) * SCORE_WEIGHTS.familiarity;
      }
      
      if (questionId === 'impact') {
        const ans = Array.isArray(answer) ? answer[0] : answer;
        newScores.impact = Number(ans.value) * SCORE_WEIGHTS.impact;
      }
      
      if (questionId === 'motivation') {
        const answers = Array.isArray(answer) ? answer : [answer];
        newScores.motivation = (answers.length / 4) * SCORE_WEIGHTS.motivation; // Normalize by max selections
      }

      if (questionId === 'readiness') {
        const ans = Array.isArray(answer) ? answer[0] : answer;
        newScores.readiness = Number(ans.value) * SCORE_WEIGHTS.readiness;
      }

      // Check if we should move to tailored questions
      const isLastInitialQuestion = prev.currentQuestionIndex === 3; // 4 initial questions
      if (isLastInitialQuestion) {
        const path = calculatePath(newScores);
        return {
          ...prev,
          currentSection: 'tailored',
          path,
          scores: newScores,
          answers: newAnswers
        };
      }

      return {
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        scores: newScores,
        answers: newAnswers
      };
    });
  }, [calculatePath]);

  return {
    state,
    handleAnswer
  };
};