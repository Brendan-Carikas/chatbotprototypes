import React from 'react';
import CheckCircleIconOutlined from '@mui/icons-material/CheckCircleOutlined';
import { FeedbackOption } from '../types';
import { artoTheme } from '../theme/arto';

interface FeedbackOptionLocal {
  id: string;
  label: string;
  response: string;
}

interface FeedbackConfirmationProps {
  submittedOption: FeedbackOption | FeedbackOptionLocal;
}

const FeedbackConfirmation: React.FC<FeedbackConfirmationProps> = ({ submittedOption }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-4">
      <div className="animate-[scale-up_0.5s_ease-out,bounce_0.5s_ease-in-out_0.5s]">
        <CheckCircleIconOutlined
          sx={{ 
            fontSize: 96, 
            color: artoTheme.colors.primary,
            animation: 'pulse 2s infinite'
          }}
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
