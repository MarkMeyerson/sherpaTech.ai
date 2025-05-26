import React, { useState } from 'react';
import { INITIAL_QUESTIONS } from '../constants/questions';

export function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  
  const question = INITIAL_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / INITIAL_QUESTIONS.length) * 100;

  const handleAnswer = (optionId, optionValue) => {
    const newAnswers = {
      ...answers,
      [question.id]: {
        id: optionId,
        value: optionValue
      }
    };
    
    setAnswers(newAnswers);

    if (currentQuestion < INITIAL_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsComplete(false);
  };

  if (isComplete) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-6">Assessment Complete!</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl mb-6">Results Summary</h2>
          
          <div className="space-y-4">
            {Object.entries(answers).map(([questionId, answer]) => {
              const questionData = INITIAL_QUESTIONS.find(q => q.id === questionId);
              const selectedOption = questionData?.options.find(opt => opt.id === answer.id);
              
              return (
                <div key={questionId} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="font-medium text-gray-900 mb-2">{questionData?.text}</p>
                  <p className="text-gray-600">
                    Selected: <span className="text-blue-600">{selectedOption?.text}</span>
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={handleRestart}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Start Over
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Print Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">AI Readiness Assessment</h1>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

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
                    ? 'bg-blue-50 border-blue-500 font-medium' 
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