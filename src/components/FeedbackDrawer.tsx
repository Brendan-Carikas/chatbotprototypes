import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useFeedback } from '../hooks/useFeedback';
import FeedbackOptions from './FeedbackOptions';
import FeedbackConfirmation from './FeedbackConfirmation';
import { POSITIVE_OPTIONS, NEGATIVE_OPTIONS, FeedbackOption } from '../types';

const FeedbackDrawer: React.FC = () => {
  const { isOpen, type, close, submitted, selectedOption: submittedOption, submitFeedback } = useFeedback();
  const [selectedOption, setSelectedOption] = useState<FeedbackOption | null>(null);
  const [parentOption, setParentOption] = useState<FeedbackOption | null>(null);
  const [showSubOptions, setShowSubOptions] = useState(false);
  const [customFeedback, setCustomFeedback] = useState('');

  // Reset state when drawer opens
  useEffect(() => {
    if (isOpen) {
      setSelectedOption(null);
      setParentOption(null);
      setShowSubOptions(false);
      setCustomFeedback('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const options = type === 'positive' ? POSITIVE_OPTIONS : NEGATIVE_OPTIONS;

  const handleFeedbackSelect = (option: FeedbackOption) => {
    if (option.subOptions) {
      setParentOption(option);
      setShowSubOptions(true);
      setSelectedOption(null);
    } else {
      setSelectedOption(option);
      setParentOption(null);
      if (option.id !== 'other') {
        setCustomFeedback('');
      }
    }
  };

  const handleSubOptionSelect = (subOption: FeedbackOption) => {
    if (parentOption) {
      const combinedOption = {
        ...subOption,
        id: `${parentOption.id}_${subOption.id}`,
        label: `${parentOption.label} - ${subOption.label}`,
        response: subOption.response
      };
      setSelectedOption(combinedOption);
    }
  };

  const handleBack = () => {
    setShowSubOptions(false);
    setParentOption(null);
    setSelectedOption(null);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      submitFeedback(selectedOption.id, selectedOption.id === 'other' ? customFeedback : undefined);
    }
  };

  const isSubmitDisabled = !selectedOption || (selectedOption.id === 'other' && !customFeedback.trim());

  return (
    <div className="absolute inset-0 z-50">
      <div className="absolute inset-0 bg-black/0" />
      <div className="absolute inset-0 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col">
        {submitted && submittedOption ? (
          <FeedbackConfirmation submittedOption={submittedOption} />
        ) : (
          <>
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">
                {showSubOptions ? 'Select Specific Issue' : 'Provide Feedback'}
              </h2>
              <button
                onClick={close}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close feedback"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <FeedbackOptions 
                options={showSubOptions && parentOption?.subOptions ? parentOption.subOptions : options}
                onSelect={showSubOptions ? handleSubOptionSelect : handleFeedbackSelect}
                type={type || 'positive'}
                showBackButton={showSubOptions}
                onBack={handleBack}
                selectedOptionId={selectedOption?.id}
              />
              {selectedOption?.id === 'other' && !showSubOptions && (
                <div className="mt-4 space-y-2">
                  <label 
                    htmlFor="customFeedback" 
                    className="block text-sm font-medium text-gray-700"
                  >
                    Please provide additional details
                  </label>
                  <textarea
                    id="customFeedback"
                    value={customFeedback}
                    onChange={(e) => setCustomFeedback(e.target.value)}
                    placeholder="Enter your feedback here..."
                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg resize-none
                             focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
                             placeholder:text-gray-400"
                    maxLength={180}
                  />
                  <div className="text-right text-sm text-gray-500">
                    {customFeedback.length}/180
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t bg-gray-50">
              <button
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  !isSubmitDisabled
                    ? 'bg-teal-600 text-white hover:bg-teal-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                aria-disabled={isSubmitDisabled}
              >
                Submit Feedback
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedbackDrawer;