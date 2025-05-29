import React from 'react';

const QuizSection = ({ currentQuestionIndex, contentRepository, currentWeek, handleAnswerSubmit, answerFeedback }) => {
  const currentQuiz = contentRepository.quizzes[`week${currentWeek}`];

  if (!currentQuiz) return null;

  return (
    <div className="mt-12">
      <div className="bg-white rounded-xl shadow-sm border border-ice-blue overflow-hidden">
        <div className="bg-gradient-to-r from-navy-blue to-mountain-blue px-6 py-4">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <span className="text-2xl mr-3">📝</span>
            Weekly Quiz
          </h3>
          <p className="text-ice-blue mt-1 text-sm">
            Test your understanding with these knowledge-check questions
          </p>
        </div>
        <div className="p-6">
          {currentQuestionIndex < currentQuiz.length ? (
            <div>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Question {currentQuestionIndex + 1} of {currentQuiz.length}
                  </span>
                  <span className="text-sm text-gray-500">
                    {Math.round(((currentQuestionIndex) / currentQuiz.length) * 100)}% Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-navy-blue h-2 rounded-full transition-all duration-300 ease-in-out" 
                    style={{ width: `${((currentQuestionIndex) / currentQuiz.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-lg sm:text-xl font-medium text-navy-blue mb-4 leading-relaxed">
                  {currentQuiz[currentQuestionIndex]?.question}
                </h4>
                <div className="space-y-3">
                  {currentQuiz[currentQuestionIndex]?.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSubmit(idx)}
                      className="w-full text-left py-4 px-5 border-2 border-gray-200 rounded-xl hover:border-navy-blue hover:bg-ice-blue transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-navy-blue focus:ring-opacity-20 group quiz-option-mobile min-h-[60px] sm:min-h-[auto]"
                    >
                      <div className="flex items-center">
                        <span className="w-6 h-6 rounded-full border-2 border-gray-300 mr-4 flex-shrink-0 group-hover:border-navy-blue transition-colors duration-200">
                          <span className="block w-full h-full rounded-full bg-navy-blue transform scale-0 group-hover:scale-100 transition-transform duration-200"></span>
                        </span>
                        <span className="text-gray-700 group-hover:text-navy-blue transition-colors duration-200 text-base sm:text-sm">
                          {option}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-navy-blue mb-2">Quiz Completed!</h4>
              <p className="text-gray-600">Great job on completing this week's assessment.</p>
            </div>
          )}
          {answerFeedback && (
            <div className={`mt-6 p-5 border-l-4 rounded-lg ${
              answerFeedback.link 
                ? 'bg-red-50 border-red-400' 
                : 'bg-green-50 border-green-400'
            }`}>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {answerFeedback.link ? (
                    <svg className="w-5 h-5 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-green-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <p className={`font-medium ${answerFeedback.link ? 'text-red-800' : 'text-green-800'}`}>
                    {answerFeedback.message}
                  </p>
                  {answerFeedback.link && (
                    <a
                      href={answerFeedback.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-3 text-sm font-medium text-red-600 hover:text-red-500 transition-colors duration-200"
                    >
                      Learn more about this topic
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizSection;
