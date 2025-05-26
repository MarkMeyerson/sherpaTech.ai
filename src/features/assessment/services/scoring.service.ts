import { AssessmentScore, QuestionWeight } from '../types/scoring.types';
import { Answer } from '../types/assessment.types';

export class ScoringService {
  static calculateScore(answers: Map<string, Answer[]>, weights: Map<string, QuestionWeight>): AssessmentScore {
    const initialScore: AssessmentScore = {
      readiness: 0,
      capability: 0,
      risk: 0,
      culture: 0,
      total: 0
    };

    return Array.from(answers.entries()).reduce((score, [questionId, answers]) => {
      const weight = weights.get(questionId);
      if (!weight) return score;

      const questionScore = answers.reduce((sum, answer) => 
        sum + (typeof answer.value === 'number' ? answer.value : 1), 0);

      return {
        ...score,
        [weight.category]: score[weight.category] + (questionScore * weight.weight),
        total: score.total + (questionScore * weight.weight)
      };
    }, initialScore);
  }
}