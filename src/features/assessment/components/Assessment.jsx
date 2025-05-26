import React, { useState } from 'react';
import { INITIAL_QUESTIONS } from '../constants/questions';

export function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const question = INITIAL_QUESTIONS[currentQuestion];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">AI Readiness Assessment</h1>
      {question && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl mb-4">{question.text}</h2>
          <div className="space-y-3">
            {question.options.map((option) => (
              <button
                key={option.id}
                className="w-full text-left p-3 border rounded hover:bg-gray-50"
                onClick={() => setCurrentQuestion(prev => prev + 1)}
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