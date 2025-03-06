import { useState } from 'react';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';

type FeedbackType = 'positive' | 'negative' | null;

interface FeedbackOption {
  id: string;
  label: string;
  response: string;
}

const POSITIVE_OPTIONS: FeedbackOption[] = [
  { 
    id: 'fast', 
    label: 'Fast (Efficient)',
    response: "Thanks for acknowledging our speed and efficiency! We strive to provide quick, accurate responses to help you save time."
  },
  { 
    id: 'clear', 
    label: 'Provided clear and helpful answers',
    response: "We're delighted to hear that our answers were clear and helpful! Our goal is to make every interaction as informative as possible."
  },
  { 
    id: 'knowledgeable', 
    label: 'Knowledgeable assistant',
    response: "Thank you for recognizing our expertise! We work hard to maintain comprehensive knowledge to better assist you."
  },
  { 
    id: 'engaging', 
    label: 'Engaging and friendly tone',
    response: "We're glad you found our conversation engaging and friendly! Creating a positive interaction is important to us."
  },
  { 
    id: 'easy', 
    label: 'Easy to use',
    response: "Thanks for the feedback about our ease of use! We aim to make every interaction as smooth and straightforward as possible."
  },
  { 
    id: 'understood', 
    label: 'Understood my needs well',
    response: "We're pleased we could understand and address your needs effectively! Understanding our users is our top priority."
  },
  { 
    id: 'other', 
    label: 'Other',
    response: "Thank you for your positive feedback. We appreciate you taking the time to share your thoughts with us."
  }
];

const NEGATIVE_OPTIONS: FeedbackOption[] = [
  { 
    id: 'slow', 
    label: 'Slow (Inefficient)',
    response: "We apologize for the slow response time. Your feedback helps us identify areas where we can optimize our performance. We're working on improvements to serve you better."
  },
  { 
    id: 'unhelpful', 
    label: 'Answers were not helpful',
    response: "We're sorry our answers weren't helpful enough. We're continuously working to improve our responses to better meet your needs. Your feedback helps us understand where we need to focus our improvements."
  },
  { 
    id: 'incorrect', 
    label: 'Provided incorrect information',
    response: "We sincerely apologize for providing incorrect information. Accuracy is crucial to us, and we'll use your feedback to review and improve our knowledge base. Thank you for bringing this to our attention."
  },
  { 
    id: 'difficult', 
    label: 'Difficult to interact with',
    response: "We apologize for any difficulty you experienced during our interaction. We're committed to making our system more user-friendly and appreciate your feedback to help us improve."
  },
  { 
    id: 'misunderstood', 
    label: "Didn't understand my question",
    response: "We're sorry we misunderstood your question. Your feedback helps us improve our comprehension abilities. We're working on enhancing our understanding to serve you better."
  },
  { 
    id: 'error', 
    label: 'Encountered error message',
    response: "We apologize for the error you encountered. This helps us identify and fix technical issues. Our team will investigate this to prevent similar problems in the future."
  },
  { 
    id: 'other', 
    label: 'Other',
    response: "Thank you for letting us know about your experience. We appreciate you taking the time to share your thoughts with us."
  }
];

const ChatbotFeedback = () => {
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [feedbackOption, setFeedbackOption] = useState<string | null>(null);
  const [customFeedback, setCustomFeedback] = useState<string>('');
  const [isCustomFeedbackSubmitted, setIsCustomFeedbackSubmitted] = useState<boolean>(false);

  const handleThumbsUp = () => setFeedback('positive');
  const handleThumbsDown = () => setFeedback('negative');
  const handleOptionSelect = (optionId: string) => {
    setFeedbackOption(optionId);
    if (optionId !== 'other') {
      setIsCustomFeedbackSubmitted(true);
    }
  };

  const handleCustomFeedbackSubmit = () => {
    if (customFeedback.trim()) {
      setIsCustomFeedbackSubmitted(true);
    }
  };

  const getCurrentOptions = () => feedback === 'positive' ? POSITIVE_OPTIONS : NEGATIVE_OPTIONS;

  return (
    <div className="font-sans p-5 max-w-3xl mx-auto">
      {/* User's message */}
      <div className="flex justify-end mb-4">
        <div className="bg-teal-600 text-white rounded-2xl py-3 px-4 max-w-[80%]">
          Tell me more about the INV Group?
        </div>
      </div>

      {/* Chatbot's response */}
      <div className="flex mb-4">
        <div className="bg-gray-100 rounded-2xl py-3 px-4 max-w-[80%]">
          We deliver cutting-edge services tailored for government, defence, critical national infrastructure, and large complex organisations.
        </div>
      </div>

      {/* Initial feedback buttons */}
      {feedback === null && (
        <div className="flex items-center gap-2 mb-4">
          <button 
            onClick={handleThumbsUp}
            className="p-1.5 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors
                     focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            aria-label="Positive feedback"
            tabIndex={3}
          >
            <ThumbUpOutlinedIcon fontSize="small" />
          </button>
          <button 
            onClick={handleThumbsDown}
            className="p-1.5 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors
                     focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            aria-label="Negative feedback"
            tabIndex={6}
          >
            <ThumbDownOutlinedIcon fontSize="small" />
          </button>
        </div>
      )}

      {/* Feedback options */}
      {feedback && !feedbackOption && (
        <div className="mb-4">
          <div className="flex mb-4">
            <div className="bg-gray-100 rounded-2xl py-3 px-4 max-w-[80%]">
              {feedback === 'positive' 
                ? "Great! I'm glad the information was helpful."
                : "I'm sorry that the response didn't meet your expectations."
              }
              <p className="italic mt-2 text-sm text-gray-600">
                Please choose one of the following {feedback === 'positive' ? 'reasons' : 'options'}:
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              {getCurrentOptions().map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className="px-4 py-2 rounded-full transition-colors bg-teal-50 hover:bg-teal-100 text-teal-600 text-sm"
                >
                  {option.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                setFeedback(null);
                setFeedbackOption(null);
                setCustomFeedback('');
              }}
              className="self-start px-4 py-2 text-gray-600 rounded-lg transition-colors bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Custom feedback textarea for 'Other' option */}
      {feedbackOption === 'other' && !isCustomFeedbackSubmitted && (
        <div className="mb-4">
          <div className="flex mb-4">
            <div className="bg-gray-100 rounded-2xl py-3 px-4 max-w-[80%]">
              <p className="font-medium mb-2">Please provide your feedback:</p>
              <div>
                <textarea
                  value={customFeedback}
                  onChange={(e) => setCustomFeedback(e.target.value.slice(0, 180))}
                  maxLength={180}
                  className="w-full p-3 border rounded-lg mb-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Please add your feedback here..."
                />
                <div className="text-sm text-teal-600 font-medium">
                  {customFeedback.length}/180 characters
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCustomFeedbackSubmit}
                  disabled={!customFeedback.trim()}
                  className="px-4 py-2 text-white rounded-lg transition-colors bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Submit Feedback
                </button>
                <button
                  onClick={() => {
                    setFeedback(null);
                    setFeedbackOption(null);
                    setCustomFeedback('');
                  }}
                  className="px-4 py-2 text-gray-600 rounded-lg transition-colors bg-gray-100 hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Final feedback confirmation */}
      {isCustomFeedbackSubmitted && (
        <div className="flex mb-4">
          <div className="bg-gray-100 rounded-2xl py-3 px-4 max-w-[80%]">
            {getCurrentOptions().find(opt => opt.id === feedbackOption)?.response}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotFeedback;