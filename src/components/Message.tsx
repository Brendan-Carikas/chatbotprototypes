import React from 'react';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import { Message as MessageType } from '../types';
import { useFeedback } from '../hooks/useFeedback';
import { artoTheme } from '../theme/arto';

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
          fontSize: message.isBot ? artoTheme.messageStyles.botMessage.fontSize : artoTheme.messageStyles.userMessage.fontSize,
          backgroundColor: message.isBot ? artoTheme.messageStyles.botMessage.background : artoTheme.messageStyles.userMessage.background,
          color: message.isBot ? artoTheme.messageStyles.botMessage.text : artoTheme.messageStyles.userMessage.text
        }}
        className={`max-w-[80%] p-3 ${artoTheme.messageStyles.fontSize}`}
      >
        {message.content}
        <time 
          className="block text-xs mt-1 opacity-100"
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
            tabIndex={3 + (index * 2)}
          >
            <ThumbUpOutlinedIcon fontSize="small" />
          </button>
          <button
            onClick={() => openFeedback('negative', message.id)}
            className="p-1.5 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors
                     focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            aria-label="Rate this response as not helpful"
            tabIndex={4 + (index * 2)}
          >
            <ThumbDownOutlinedIcon fontSize="small" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Message;