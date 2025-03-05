import React from 'react';
import CheckCircleIconOutlined from '@mui/icons-material/CheckCircleOutlined';
import { artoTheme } from '../theme/arto';

interface TalkToUsConfirmationProps {
  name?: string;
  onClose?: () => void;
}

const TalkToUsConfirmation: React.FC<TalkToUsConfirmationProps> = ({ name }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-4 bg-white rounded-lg shadow-lg h-[600px]">
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
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Thank you{name ? `, ${name}` : ''}!
      </h2>
      <p className="text-center text-gray-600 max-w-xs">
        Your request has been submitted. Our team will be in touch with you shortly.
      </p>
    </div>
  );
};

export default TalkToUsConfirmation;
