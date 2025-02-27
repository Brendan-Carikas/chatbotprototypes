import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { FeedbackOption } from '../types';

interface FeedbackConfirmationProps {
  submittedOption: FeedbackOption;
}

const FeedbackConfirmation: React.FC<FeedbackConfirmationProps> = ({ submittedOption }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-4">
      <div className="animate-[scale-up_0.5s_ease-out,bounce_0.5s_ease-in-out_0.5s]">
        <CheckCircle2 
          className="w-16 h-16 text-teal-600 animate-[draw-check_1s_ease-out_forwards]"
          strokeWidth={2.5}
          aria-label="Success check mark"
        />
      </div>
      <p 
        className="text-lg text-center text-gray-700 max-w-md animate-fade-in"
        role="status"
        aria-live="polite"
      >
        {submittedOption.response}
      </p>
    </div>
  );
};

export default FeedbackConfirmation;
