import React, { useState } from 'react';
import { CheckCircle, Circle, ChevronRight, ChevronDown } from 'lucide-react';

const TrainingPlan = () => {
  const [expandedModules, setExpandedModules] = useState({});
  const [completedLessons, setCompletedLessons] = useState({});

  const modules = [
    {
      id: 'module-1',
      title: 'AI Fundamentals',
      lessons: [
        { id: 'lesson-1-1', title: 'Introduction to AI', duration: '30 min' },
        { id: 'lesson-1-2', title: 'Machine Learning Basics', duration: '45 min' },
        { id: 'lesson-1-3', title: 'Data Processing Fundamentals', duration: '35 min' }
      ]
    },
    {
      id: 'module-2',
      title: 'Advanced Concepts',
      lessons: [
        { id: 'lesson-2-1', title: 'Neural Networks', duration: '50 min' },
        { id: 'lesson-2-2', title: 'Deep Learning Applications', duration: '45 min' },
        { id: 'lesson-2-3', title: 'Natural Language Processing', duration: '40 min' },
        { id: 'lesson-2-4', title: 'Future Trends', duration: '25 min' }
      ]
    }
  ];

  // Toggle module expansion
  const toggleModule = (moduleId) => {
    setExpandedModules({
      ...expandedModules,
      [moduleId]: !expandedModules[moduleId]
    });
  };

  // Toggle lesson completion status
  const toggleLessonCompletion = (lessonId) => {
    setCompletedLessons({
      ...completedLessons,
      [lessonId]: !completedLessons[lessonId]
    });
  };

  return (
    <div className="p-8 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">AI Training Program</h1>
        <div className="space-y-4">
          {modules.map(module => (
            <div key={module.id} className="bg-gray-800 rounded-lg p-4">
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full flex items-center justify-between text-white p-2 hover:bg-gray-700 rounded"
              >
                <span className="text-xl font-semibold">{module.title}</span>
                {expandedModules[module.id] ? <ChevronDown /> : <ChevronRight />}
              </button>
              
              {expandedModules[module.id] && (
                <div className="mt-4 space-y-2">
                  {module.lessons.map(lesson => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-2 hover:bg-gray-700 rounded text-white"
                    >
                      <div className="flex items-center space-x-2">
                        <button onClick={() => toggleLessonCompletion(lesson.id)}>
                          {completedLessons[lesson.id] ? <CheckCircle className="text-green-500" /> : <Circle />}
                        </button>
                        <span>{lesson.title}</span>
                      </div>
                      <span className="text-gray-400">{lesson.duration}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainingPlan;