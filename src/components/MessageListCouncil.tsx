import React from 'react';
import Message from './MessageSug';
import { useChat } from '../contexts/ChatContextCouncil';
import CouncilSuggestions from './CouncilSuggestions';
import { artoTheme } from '../theme/arto';

const MessageListCouncil: React.FC = () => {
  const { messages, hideInitialSuggestions, hideSummarySuggestions, sendMessage } = useChat();

  return (
    <div 
      className="flex-1 overflow-y-auto p-4 space-y-4"
      role="log"
      aria-label="Chat messages"
      aria-live="polite"
    >
      {messages.map((message, index) => (
        <div key={message.id}>
          <Message 
            message={message} 
            index={index}
          />
          {/* Show suggestions based on message type */}
          {message.showSuggestions && message.suggestions && message.isBot && (
            <div className="mt-4">
              {!hideInitialSuggestions && index === 1 ? (
                /* Council suggestions */
                <CouncilSuggestions />
              ) : !hideSummarySuggestions && message.suggestions.includes('No, I\'m good') ? (
                /* Summary suggestions */
                <div className="flex flex-wrap gap-2">
                  {message.suggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(suggestion)}
                      className="text-left p-3 border-2 border-gray-200 hover:border-primary
                               transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2
                               active:scale-[0.98] text-sm text-gray-700 hover:text-primary focus:text-primary
                                hover:shadow-md hover:bg-primary/5 focus:bg-primary/5"
                      style={{ 
                        borderRadius: '24px',
                        fontFamily: artoTheme.fonts.sans.join(', '),
                        '--tw-ring-color': artoTheme.colors.primary,
                        '--tw-border-opacity': 1,
                        '--tw-border-color': `${artoTheme.colors.primary} var(--tw-border-opacity)`
                      } as React.CSSProperties}
                      role="button"
                      aria-label={`Select: ${suggestion}`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageListCouncil;
