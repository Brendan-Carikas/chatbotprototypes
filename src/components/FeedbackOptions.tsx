import React from 'react';
import { FeedbackOption } from '../types';
import { artoTheme } from '../theme/arto';

interface FeedbackOptionsProps {
  options: FeedbackOption[];
  onSelect: (option: FeedbackOption) => void;
  type: 'positive' | 'negative';
  showBackButton?: boolean;
  onBack?: () => void;
  selectedOptionId?: string | null;
  tabIndex?: number;
}

export const FeedbackOptions: React.FC<FeedbackOptionsProps> = ({ 
  options, 
  onSelect, 
  showBackButton,
  onBack,
  selectedOptionId,
  tabIndex
}) => {
  // Create derived colors for hover and focus states
  const primaryColorWithOpacity = `${artoTheme.colors.primary}20`; // 20% opacity for hover state
  
  return (
    <div className="space-y-2">
      {showBackButton && (
        <button
          onClick={onBack}
          tabIndex={tabIndex}
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
          tabIndex={tabIndex}
          className={`w-full px-4 py-2 text-left text-sm rounded-lg border 
                    hover:bg-opacity-50 focus:outline-none focus:ring-2 
                    focus:ring-offset-2 transition-colors`}
          style={{
            borderColor: artoTheme.colors.primary,
            backgroundColor: selectedOptionId === option.id ? primaryColorWithOpacity : '',
            '--tw-ring-color': artoTheme.colors.primary
          } as React.CSSProperties}
          onMouseOver={(e) => {
            if (selectedOptionId !== option.id) {
              e.currentTarget.style.backgroundColor = primaryColorWithOpacity;
            }
          }}
          onMouseOut={(e) => {
            if (selectedOptionId !== option.id) {
              e.currentTarget.style.backgroundColor = '';
            }
          }}
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