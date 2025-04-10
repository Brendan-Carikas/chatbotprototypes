import React, { useState } from 'react';
import { useChat } from '../contexts/ChatContextCouncil';
import { artoTheme } from '../theme/arto';
import SendIcon from '@mui/icons-material/Send';
import PoweredByArto from './PoweredByArto';

const ChatInputCouncil: React.FC = () => {
  const [input, setInput] = useState('');
  const { sendMessage } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="border-t">
      <form 
        onSubmit={handleSubmit} 
        className="p-4 px-2 pr-4"
        aria-label="Chat message form"
      >
        <div className="flex space-x-2">
          <label htmlFor="messageInput" className="sr-only">
            Ask a question buddy
          </label>
          <input
            id="messageInput"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 text-sm"
            style={{ '--tw-ring-color': artoTheme.colors.primary } as React.CSSProperties}
            aria-label="Message input"
            required
            tabIndex={1}
          />
          <button
            type="submit"
            className="text-white rounded-lg px-4 py-2 hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ 
              backgroundColor: artoTheme.colors.primary,
              '--tw-ring-color': artoTheme.colors.primary,
              opacity: !input.trim() ? '0.7' : '1'
            } as React.CSSProperties}
            aria-label="Send message"
            tabIndex={2}
            disabled={!input.trim()}
          >
            <SendIcon fontSize="small" />
          </button>
        </div>
      </form>
      <PoweredByArto />
    </div>
  );
};

export default ChatInputCouncil;
