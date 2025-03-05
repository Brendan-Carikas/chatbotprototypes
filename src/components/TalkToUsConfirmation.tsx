import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { artoTheme } from '../theme/arto';

interface TalkToUsConfirmationProps {
  name?: string;
  onClose?: () => void;
}

const TalkToUsConfirmation: React.FC<TalkToUsConfirmationProps> = ({ name }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-4 bg-white rounded-lg shadow-lg h-[600px]">
      <div className="animate-[scale-up_0.5s_ease-out,bounce_0.5s_ease-in-out_0.5s]">
        <CheckCircle2 
          className="w-16 h-16 animate-[draw-check_1s_ease-out_forwards]"
          style={{ color: artoTheme.colors.primary }}
          strokeWidth={2.5}
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
