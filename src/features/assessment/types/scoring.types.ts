export interface QuestionWeight {
  category: 'readiness' | 'capability' | 'risk' | 'culture';
  weight: number;
}

export interface AssessmentScore {
  readiness: number;
  capability: number;
  risk: number;
  culture: number;
  total: number;
}

export interface AssessmentResult {
  path: 'zero-knowledge' | 'some-awareness' | 'knowledgeable';
  scores: AssessmentScore;
  recommendations: string[];
}