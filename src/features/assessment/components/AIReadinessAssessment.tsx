import React, { useState } from 'react';
import { AssessmentQuestion, AssessmentResult, UserContact } from '../types/assessment.types';

export const AIReadinessAssessment: React.FC = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState<string>('q1');
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [userContact, setUserContact] = useState<UserContact | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    const currentQuestion = questions.find(q => q.id === questionId);
    
    if (currentQuestion) {
      const nextId = typeof currentQuestion.nextQuestionId === 'function' 
        ? currentQuestion.nextQuestionId(answer)
        : currentQuestion.nextQuestionId;

      if (nextId) {
        setCurrentQuestionId(nextId);
      } else {
        setShowContactForm(true);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">AI Readiness Assessment</h2>
      
      {!showContactForm && !result && (
        <QuestionCard
          question={questions.find(q => q.id === currentQuestionId)!}
          onAnswer={handleAnswer}
        />
      )}

      {showContactForm && !result && (
        <ContactCollection
          onSubmit={(contact) => {
            setUserContact(contact);
            setResult(calculateResult(answers));
          }}
        />
      )}

      {result && (
        <ResultsDisplay result={result} />
      )}
    </div>
  );
};