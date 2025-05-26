import React from 'react';
import { motion } from 'framer-motion';
import { AssessmentQuestion, Answer } from '../types/assessment.types';

interface QuestionCardProps {
  question: AssessmentQuestion;
  onAnswer: (answers: Answer[]) => void;
  isActive: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer, isActive }) => {
  const handleChange = (selected: Answer[]) => {
    onAnswer(selected);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 50 }}
      exit={{ opacity: 0, x: -50 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <h3 className="text-xl font-semibold mb-4">{question.text}</h3>

      {question.type === 'single' && (
        <div className="space-y-3">
          {question.options.map(option => (
            <label key={option.id} className="flex items-center space-x-3">
              <input
                type="radio"
                name={question.id}
                value={option.value}
                onChange={() => handleChange([option])}
                className="form-radio"
              />
              <span>{option.text}</span>
            </label>
          ))}
        </div>
      )}

      {question.type === 'multiple' && (
        <div className="space-y-3">
          {question.options.map(option => (
            <label key={option.id} className="flex items-center space-x-3">
              <input
                type="checkbox"
                name={question.id}
                value={option.value}
                onChange={(e) => {
                  const selected = question.options.filter(opt => 
                    document.querySelector<HTMLInputElement>(`input[value="${opt.value}"]`)?.checked
                  );
                  if (selected.length <= (question.maxSelections || Infinity)) {
                    handleChange(selected);
                  } else {
                    e.preventDefault();
                  }
                }}
                className="form-checkbox"
              />
              <span>{option.text}</span>
            </label>
          ))}
        </div>
      )}
    </motion.div>
  );
};