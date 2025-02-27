import React from 'react';
import { FeedbackOption } from '../types';

interface FeedbackOptionsProps {
  options: FeedbackOption[];
  onSelect: (option: FeedbackOption) => void;
  type: 'positive' | 'negative';
  showBackButton?: boolean;
  onBack?: () => void;
  selectedOptionId?: string | null;
}

export const FeedbackOptions: React.FC<FeedbackOptionsProps> = ({ 
  options, 
  onSelect, 
  type,
  showBackButton,
  onBack,
  selectedOptionId
}) => {
  return (
    <div className="space-y-2">
      {showBackButton && (
        <button
          onClick={onBack}
          className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 
                   focus:outline-none transition-colors mb-2"
        >
          ← Back to all options
        </button>
      )}
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option)}
          className={`w-full px-4 py-2 text-left text-sm rounded-lg border 
                    ${type === 'positive' 
                      ? 'border-teal-400 hover:bg-teal-50 focus:ring-teal-700' 
                      : 'order-teal-400 hover:bg-teal-50 focus:ring-teal-700'
                    } 
                    ${selectedOptionId === option.id ?
                      (type === 'positive' ? 'bg-teal-50' : 'bg-teal-50') : ''
                    }
                    hover:bg-opacity-50 focus:outline-none focus:ring-2 
                    focus:ring-offset-2 transition-colors`}
        >
          {option.label}
          {option.subOptions && (
            <span className="float-right text-gray-400">→</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default FeedbackOptions;