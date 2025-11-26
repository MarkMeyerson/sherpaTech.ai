import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useAssessment } from './useAssessment';
import { Answer } from '../types/assessment.types';

describe('useAssessment', () => {
  describe('initial state', () => {
    it('should initialize with correct default values', () => {
      const { result } = renderHook(() => useAssessment());

      expect(result.current.state.currentSection).toBe('initial');
      expect(result.current.state.currentQuestionIndex).toBe(0);
      expect(result.current.state.path).toBeNull();
      expect(result.current.state.scores).toEqual({
        familiarity: 0,
        readiness: 0,
        motivation: 0,
        complexity: 0,
      });
    });
  });

  describe('handleAnswer', () => {
    it('should increment currentQuestionIndex when an answer is provided', () => {
      const { result } = renderHook(() => useAssessment());

      const mockAnswer: Answer[] = [
        { id: '1', text: 'Option 1', value: 'option1', scoreValue: 5 },
      ];

      act(() => {
        result.current.handleAnswer(mockAnswer);
      });

      expect(result.current.state.currentQuestionIndex).toBe(1);
    });

    it('should increment currentQuestionIndex multiple times', () => {
      const { result } = renderHook(() => useAssessment());

      const mockAnswer: Answer[] = [
        { id: '1', text: 'Option 1', value: 'option1', scoreValue: 5 },
      ];

      act(() => {
        result.current.handleAnswer(mockAnswer);
        result.current.handleAnswer(mockAnswer);
        result.current.handleAnswer(mockAnswer);
      });

      expect(result.current.state.currentQuestionIndex).toBe(3);
    });

    it('should handle empty answers array', () => {
      const { result } = renderHook(() => useAssessment());

      act(() => {
        result.current.handleAnswer([]);
      });

      expect(result.current.state.currentQuestionIndex).toBe(1);
    });

    it('should handle multiple answers (for multi-select questions)', () => {
      const { result } = renderHook(() => useAssessment());

      const mockAnswers: Answer[] = [
        { id: '1', text: 'Option 1', value: 'option1', scoreValue: 3 },
        { id: '2', text: 'Option 2', value: 'option2', scoreValue: 4 },
        { id: '3', text: 'Option 3', value: 'option3', scoreValue: 5 },
      ];

      act(() => {
        result.current.handleAnswer(mockAnswers);
      });

      expect(result.current.state.currentQuestionIndex).toBe(1);
    });
  });

  describe('state persistence', () => {
    it('should preserve other state values when handling answers', () => {
      const { result } = renderHook(() => useAssessment());

      const mockAnswer: Answer[] = [
        { id: '1', text: 'Option 1', value: 'option1', scoreValue: 5 },
      ];

      act(() => {
        result.current.handleAnswer(mockAnswer);
      });

      // Other state values should remain unchanged
      expect(result.current.state.currentSection).toBe('initial');
      expect(result.current.state.path).toBeNull();
      expect(result.current.state.scores).toEqual({
        familiarity: 0,
        readiness: 0,
        motivation: 0,
        complexity: 0,
      });
    });
  });
});
