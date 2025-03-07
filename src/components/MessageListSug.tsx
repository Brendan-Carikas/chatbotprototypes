import React from 'react';
import Message from './MessageSug';
import { useChat } from '../contexts/ChatContextSug';
import InitialSuggestions from './InitialSuggestions';

const MessageListSug: React.FC = () => {
  const { messages } = useChat();

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
          {message.showSuggestions && <InitialSuggestions />}
        </div>
      ))}
    </div>
  );
};

export default MessageListSug;