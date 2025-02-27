import React from 'react';
import Message from './Message';
import { useChat } from '../contexts/ChatContext';

const MessageList: React.FC = () => {
  const { messages } = useChat();

  return (
    <div 
      className="flex-1 overflow-y-auto p-4 space-y-4"
      role="log"
      aria-label="Chat messages"
      aria-live="polite"
    >
      {messages.map((message, index) => (
        <Message 
          key={message.id} 
          message={message} 
          index={index}
        />
      ))}
    </div>
  );
};

export default MessageList;