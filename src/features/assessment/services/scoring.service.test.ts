import { describe, it, expect } from 'vitest';
import { ScoringService } from './scoring.service';
import { Answer } from '../types/assessment.types';
import { QuestionWeight } from '../types/scoring.types';

describe('ScoringService', () => {
  describe('calculateScore', () => {
    it('should return initial scores when no answers provided', () => {
      const answers = new Map<string, Answer[]>();
      const weights = new Map<string, QuestionWeight>();

      const result = ScoringService.calculateScore(answers, weights);

      expect(result).toEqual({
        readiness: 0,
        capability: 0,
        risk: 0,
        culture: 0,
        total: 0,
      });
    });

    it('should calculate score for a single answer with numeric value', () => {
      const answers = new Map<string, Answer[]>([
        [
          'q1',
          [{ id: 'a1', text: 'Answer 1', value: 5, scoreValue: 5 }],
        ],
      ]);
      const weights = new Map<string, QuestionWeight>([
        ['q1', { category: 'readiness', weight: 2 }],
      ]);

      const result = ScoringService.calculateScore(answers, weights);

      expect(result.readiness).toBe(10); // 5 * 2
      expect(result.total).toBe(10);
    });

    it('should calculate score for multiple answers', () => {
      const answers = new Map<string, Answer[]>([
        [
          'q1',
          [
            { id: 'a1', text: 'Answer 1', value: 3, scoreValue: 3 },
            { id: 'a2', text: 'Answer 2', value: 2, scoreValue: 2 },
          ],
        ],
      ]);
      const weights = new Map<string, QuestionWeight>([
        ['q1', { category: 'capability', weight: 1 }],
      ]);

      const result = ScoringService.calculateScore(answers, weights);

      expect(result.capability).toBe(5); // (3 + 2) * 1
      expect(result.total).toBe(5);
    });

    it('should handle non-numeric answer values as 1', () => {
      const answers = new Map<string, Answer[]>([
        [
          'q1',
          [{ id: 'a1', text: 'Answer 1', value: 'selected', scoreValue: 0 }],
        ],
      ]);
      const weights = new Map<string, QuestionWeight>([
        ['q1', { category: 'risk', weight: 3 }],
      ]);

      const result = ScoringService.calculateScore(answers, weights);

      expect(result.risk).toBe(3); // 1 * 3
      expect(result.total).toBe(3);
    });

    it('should skip questions without weights', () => {
      const answers = new Map<string, Answer[]>([
        ['q1', [{ id: 'a1', text: 'Answer 1', value: 5, scoreValue: 5 }]],
        ['q2', [{ id: 'a2', text: 'Answer 2', value: 10, scoreValue: 10 }]],
      ]);
      const weights = new Map<string, QuestionWeight>([
        ['q1', { category: 'readiness', weight: 2 }],
        // q2 has no weight defined
      ]);

      const result = ScoringService.calculateScore(answers, weights);

      expect(result.readiness).toBe(10); // 5 * 2
      expect(result.total).toBe(10); // q2 is ignored
    });

    it('should calculate scores across multiple categories', () => {
      const answers = new Map<string, Answer[]>([
        ['q1', [{ id: 'a1', text: 'Answer 1', value: 4, scoreValue: 4 }]],
        ['q2', [{ id: 'a2', text: 'Answer 2', value: 3, scoreValue: 3 }]],
        ['q3', [{ id: 'a3', text: 'Answer 3', value: 5, scoreValue: 5 }]],
        ['q4', [{ id: 'a4', text: 'Answer 4', value: 2, scoreValue: 2 }]],
      ]);
      const weights = new Map<string, QuestionWeight>([
        ['q1', { category: 'readiness', weight: 1 }],
        ['q2', { category: 'capability', weight: 2 }],
        ['q3', { category: 'risk', weight: 1 }],
        ['q4', { category: 'culture', weight: 3 }],
      ]);

      const result = ScoringService.calculateScore(answers, weights);

      expect(result.readiness).toBe(4); // 4 * 1
      expect(result.capability).toBe(6); // 3 * 2
      expect(result.risk).toBe(5); // 5 * 1
      expect(result.culture).toBe(6); // 2 * 3
      expect(result.total).toBe(21); // 4 + 6 + 5 + 6
    });

    it('should accumulate scores for same category', () => {
      const answers = new Map<string, Answer[]>([
        ['q1', [{ id: 'a1', text: 'Answer 1', value: 3, scoreValue: 3 }]],
        ['q2', [{ id: 'a2', text: 'Answer 2', value: 4, scoreValue: 4 }]],
      ]);
      const weights = new Map<string, QuestionWeight>([
        ['q1', { category: 'readiness', weight: 1 }],
        ['q2', { category: 'readiness', weight: 1 }],
      ]);

      const result = ScoringService.calculateScore(answers, weights);

      expect(result.readiness).toBe(7); // 3 + 4
      expect(result.total).toBe(7);
    });

    it('should handle zero weight', () => {
      const answers = new Map<string, Answer[]>([
        ['q1', [{ id: 'a1', text: 'Answer 1', value: 10, scoreValue: 10 }]],
      ]);
      const weights = new Map<string, QuestionWeight>([
        ['q1', { category: 'readiness', weight: 0 }],
      ]);

      const result = ScoringService.calculateScore(answers, weights);

      expect(result.readiness).toBe(0);
      expect(result.total).toBe(0);
    });

    it('should handle negative weights', () => {
      const answers = new Map<string, Answer[]>([
        ['q1', [{ id: 'a1', text: 'Answer 1', value: 5, scoreValue: 5 }]],
      ]);
      const weights = new Map<string, QuestionWeight>([
        ['q1', { category: 'risk', weight: -1 }],
      ]);

      const result = ScoringService.calculateScore(answers, weights);

      expect(result.risk).toBe(-5); // 5 * -1
      expect(result.total).toBe(-5);
    });
  });
});
