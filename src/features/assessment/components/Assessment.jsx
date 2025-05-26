import React, { useState, useEffect } from 'react';
import { INITIAL_QUESTIONS } from '../constants/questions';

export function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  
  const question = INITIAL_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / INITIAL_QUESTIONS.length) * 100;

  const handleAnswer = (optionId, optionValue) => {
    // Store the answer
    const newAnswers = {
      ...answers,
      [question.id]: {
        id: optionId,
        value: optionValue
      }
    };
    setAnswers(newAnswers);

    // Check if we're at the last question
    if (currentQuestion >= INITIAL_QUESTIONS.length - 1) {
      setIsComplete(true);
    } else {
      // Move to next question
      setCurrentQuestion(prev => prev + 1);
    }
  };

  // Show completion screen if done
  if (isComplete) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-6">Assessment Complete!</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl mb-4">Thank you for completing the assessment.</h2>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(answers, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  // Show the current question
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
      <div className="text-sm text-gray-600 mb-4 text-center">
        Question {currentQuestion + 1} of {INITIAL_QUESTIONS.length}
      </div>

      {question && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl mb-4">{question.text}</h2>
          <div className="space-y-3">
            {question.options.map((option) => (
              <button
                key={option.id}
                className={`w-full text-left p-3 border rounded transition-colors
                  ${answers[question.id]?.id === option.id 
                    ? 'bg-blue-50 border-blue-500' 
                    : 'hover:bg-gray-50'}`}
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