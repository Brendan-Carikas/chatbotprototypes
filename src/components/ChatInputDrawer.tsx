import React, { useState } from 'react';
import { useChat } from '../contexts/ChatContext';
import { artoTheme } from '../theme/arto';
import SendIcon from '@mui/icons-material/Send';
import PoweredByArto from './PoweredByArto';

const ChatInputDrawer: React.FC = () => {
  const { sendMessage } = useChat();
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <form onSubmit={handleSubmit} className="relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="w-full pr-10 py-2 pl-3 resize-none overflow-hidden rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                   border border-gray-300"
          style={{
            minHeight: '44px',
            maxHeight: '120px',
            borderRadius: artoTheme.borderRadius.userMessage,
            fontFamily: artoTheme.fonts.sans.join(', '),
            fontSize: artoTheme.messageStyles.userMessage.fontSize
          }}
          rows={1}
          aria-label="Chat input"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-primary
                   hover:bg-primary/10 rounded-full transition-colors
                   focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                   disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!message.trim()}
          aria-label="Send message"
        >
          <SendIcon fontSize="small" />
        </button>
      </form>
      <PoweredByArto />
    </div>
  );
};

export default ChatInputDrawer;
