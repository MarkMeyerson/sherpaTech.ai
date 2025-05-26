export type QuestionType = 'single' | 'multiple' | 'scale' | 'matrix';

export interface AssessmentQuestion {
  id: string;
  type: QuestionType;
  text: string;
  options: Answer[];
  scoreImpact?: {
    category: 'familiarity' | 'readiness' | 'motivation' | 'complexity';
    weight: number;
  };
  maxSelections?: number;
  required?: boolean;
}

export interface Answer {
  id: string;
  text: string;
  value: string | number;
  scoreValue: number;
}

export interface AssessmentScore {
  familiarity: number;
  readiness: number;
  motivation: number;
  complexity: number;
}

export type AssessmentPath = 'zero-knowledge' | 'some-awareness' | 'knowledgeable';

export interface AssessmentState {
  currentSection: 'initial' | 'tailored' | 'contact';
  scores: AssessmentScore;
  path: AssessmentPath | null;
  currentQuestionIndex: number;
}