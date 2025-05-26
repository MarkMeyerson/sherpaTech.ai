import React, { useState } from 'react';
import { INITIAL_QUESTIONS } from '../constants/questions';

export function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const question = INITIAL_QUESTIONS[currentQuestion];
  
  const progress = ((currentQuestion + 1) / INITIAL_QUESTIONS.length) * 100;

  const handleAnswer = (optionId, optionValue) => {
    setAnswers(prev => ({
      ...prev,
      [question.id]: {
        id: optionId,
        value: optionValue
      }
    }));

    if (currentQuestion < INITIAL_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleAssessmentComplete();
    }
  };

  const handleAssessmentComplete = () => {
    // TODO: Implement assessment completion logic
    console.log('Assessment complete:', answers);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">AI Readiness Assessment</h1>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question counter */}
      <div className="text-sm text-gray-600 mb-4">
        Question {currentQuestion + 1} of {INITIAL_QUESTIONS.length}
      </div>

      {question && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl mb-4">{question.text}</h2>
          <div className="space-y-3">
            {question.options.map((option) => (
              <button
                key={option.id}
                className={`w-full text-left p-3 border rounded hover:bg-gray-50
                  ${answers[question.id]?.id === option.id ? 'bg-blue-50 border-blue-500' : ''}`}
                onClick={() => handleAnswer(option.id, option.value)}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}