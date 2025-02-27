import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Message as MessageType } from '../types';
import { useFeedback } from '../hooks/useFeedback';
import { artoTheme } from '../styles/arto';

interface MessageProps {
  message: MessageType;
  index: number;
}

const Message: React.FC<MessageProps> = ({ message, index }) => {
  const { openFeedback, hasFeedback } = useFeedback();
  const hasSubmittedFeedback = hasFeedback(message.id);

  return (
    <div 
      id={`message-${index}`}
      className={`flex flex-col ${message.isBot ? '' : 'items-end'}`}
      role="listitem"
      aria-label={`${message.isBot ? 'Bot' : 'User'} message: ${message.content}`}
    >
      <div
        style={{
          borderRadius: message.isBot ? artoTheme.borderRadius.botMessage : artoTheme.borderRadius.userMessage,
          fontFamily: artoTheme.fonts.sans.join(', '),
          fontSize: message.isBot ? artoTheme.messageStyles.botMessage.fontSize : artoTheme.messageStyles.userMessage.fontSize
        }}
        className={`max-w-[80%] p-3 ${artoTheme.messageStyles.fontSize} ${
          message.isBot
            ? 'bg-gray-100 text-gray-900'
            : 'bg-teal-600 text-white'
        }`}
      >
        {message.content}
        <time 
          className="block text-xs mt-1 opacity-70"
          dateTime={message.timestamp}
          aria-label={`Sent at ${message.timestamp}`}
        >
          {message.timestamp}
        </time>
      </div>
      
      {message.isBot && !hasSubmittedFeedback && (
        <div className="flex space-x-2 mt-2">
          <button
            onClick={() => openFeedback('positive', message.id)}
            className="p-1.5 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors
                     focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            aria-label="Rate this response as helpful"
          >
            <ThumbsUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => openFeedback('negative', message.id)}
            className="p-1.5 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors
                     focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            aria-label="Rate this response as not helpful"
          >
            <ThumbsDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Message;