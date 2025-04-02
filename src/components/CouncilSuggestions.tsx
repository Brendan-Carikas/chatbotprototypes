import React from 'react';
import { useChat } from '../contexts/ChatContextCouncil';
import { artoTheme } from '../theme/arto';

// Council-specific suggestions
const COUNCIL_SUGGESTIONS = [
  "When are my bins collected?",
  "I need to report a housing repair",
  "What's my rent balance?"
];

// Council-specific responses for each suggestion

const CouncilSuggestions: React.FC = () => {
  const { sendMessage } = useChat();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, suggestion: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      sendMessage(suggestion);
    }
  };

  // Custom sendMessage handler for council suggestions
  const handleSendCouncilMessage = (suggestion: string) => {
    // First send the user's selection as a message
    sendMessage(suggestion);
    
    // The response will be handled by the ChatContext's sendMessage function
    // which will display the appropriate council response based on the suggestion
  };

  return (
    <div 
      className="flex flex-wrap gap-2 mt-4 mb-2"
      role="list"
      aria-label="Suggested council services"
    >
      {COUNCIL_SUGGESTIONS.map((suggestion) => (
        <button
          key={suggestion}
          onClick={() => handleSendCouncilMessage(suggestion)}
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

export default CouncilSuggestions;
