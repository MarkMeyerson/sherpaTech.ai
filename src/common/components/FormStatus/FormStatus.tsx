import React, { useEffect, useState } from 'react';
import { FormStatusProps } from './FormStatus.types';

const defaultMessages = {
  submitting: 'Sending your message...',
  success: 'Message sent successfully!',
  error: 'Failed to send message. Please try again.',
  idle: ''
} as const;

const statusStyles = {
  submitting: 'bg-blue-50 text-blue-700 border-blue-200',
  success: 'bg-green-50 text-green-700 border-green-200',
  error: 'bg-red-50 text-red-700 border-red-200',
  idle: ''
} as const;

const statusIcons = {
  submitting: '⏳',
  success: '✅',
  error: '❌',
  idle: ''
} as const;

export const FormStatus: React.FC<FormStatusProps> = ({
  status,
  className = '',
  messages = defaultMessages,
  autoHideDelay = 5000
}) => {
  const [visible, setVisible] = useState(status !== 'idle');

  useEffect(() => {
    setVisible(status !== 'idle');

    if (status === 'success' && autoHideDelay > 0) {
      const timer = setTimeout(() => setVisible(false), autoHideDelay);
      return () => clearTimeout(timer);
    }
  }, [status, autoHideDelay]);

  if (!visible) return null;

  return (
    <div
      role={status === 'error' ? 'alert' : 'status'}
      aria-live={status === 'error' ? 'assertive' : 'polite'}
      className={`
        flex items-center gap-2 p-4 rounded-md border
        transition-all duration-300 ease-in-out
        ${statusStyles[status]}
        ${className}
      `}
    >
      <span className="text-lg" aria-hidden="true">
        {statusIcons[status]}
      </span>
      <span>{messages[status]}</span>
    </div>
  );
};