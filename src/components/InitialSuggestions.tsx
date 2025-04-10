import React from 'react';
import { useChat } from '../contexts/ChatContextSug';
import { artoTheme } from '../theme/arto';

// Initial suggestions for the second bot message
const INITIAL_SUGGESTIONS = [
  "Ask for a proposal",
  "Ask a question"
];

const InitialSuggestions: React.FC = () => {
  const { sendMessage } = useChat();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, suggestion: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      sendMessage(suggestion);
    }
  };

  return (
    <div 
      className="flex flex-wrap gap-2 mt-4 mb-2"
      role="list"
      aria-label="Suggested topics for development assistance"
    >
      {INITIAL_SUGGESTIONS.map((suggestion) => (
        <button
          key={suggestion}
          onClick={() => sendMessage(suggestion)}
          onKeyDown={(e) => handleKeyDown(e, suggestion)}
          className="text-left p-3 border-2 border-gray-200 hover:border-primary
                   transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2
                   active:scale-[0.98] text-sm text-gray-700 hover:text-primary focus:text-primary
                    hover:shadow-md hover:bg-primary/5 focus:bg-primary/5"
          style={{ 
            borderRadius: '24px',
            fontFamily: artoTheme.fonts.sans.join(', '),
            '--tw-ring-color': artoTheme.colors.primary,
            '--tw-border-opacity': 1,
            '--tw-border-color': `${artoTheme.colors.primary} var(--tw-border-opacity)`,
            backgroundColor: 'white',
          
          } as React.CSSProperties}
          role="listitem"
          aria-label={`Ask: ${suggestion}`}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};

export default InitialSuggestions;
