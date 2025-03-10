import React from 'react';
import Message from './MessageSug';
import { useChat } from '../contexts/ChatContextSug';
import InitialSuggestions from './InitialSuggestions';
import { artoTheme } from '../theme/arto';

const MessageListSug: React.FC = () => {
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
          {message.showSuggestions && message.isBot && (
            <div className="mt-4">
              {index === 1 && !hideInitialSuggestions ? (
                /* Rule 2: Second message shows initial suggestions */
                <InitialSuggestions />
              ) : message.suggestions && !hideSummarySuggestions ? (
                <div className="flex flex-wrap gap-2">
                  {message.suggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(suggestion)}
                      className="text-left p-3 rounded-lg border border-gray-200 hover:border-primary
                               transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2
                               active:scale-[0.98] text-sm text-gray-700 hover:text-primary focus:text-primary
                               shadow-sm hover:shadow-md hover:bg-primary/5 focus:bg-primary/5"
                      style={{ 
                        borderRadius: artoTheme.borderRadius.botMessage,
                        fontFamily: artoTheme.fonts.sans.join(', '),
                        '--tw-ring-color': artoTheme.colors.primary
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

export default MessageListSug;