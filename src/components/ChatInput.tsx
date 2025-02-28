import React, { useState } from 'react';
import { Send as SendLucide } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import { artoTheme } from '../styles/arto';
import SendIcon from '@mui/icons-material/Send';

const ChatInput: React.FC = () => {
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
            Ask a question
          </label>
          <input
            id="messageInput"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={artoTheme.buttonStyles.placeholder.text}
            className={`flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600 ${artoTheme.buttonStyles.placeholder.fontSize} ${artoTheme.buttonStyles.placeholder.color}`}
            aria-label="Message input"
            required
          />
          <button
            type="submit"
            className="bg-teal-600 text-white rounded-lg px-4 py-2 hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
            aria-label="Send message"
          >
            <SendIcon fontSize="small" />
          </button>
        </div>
      </form>
      {/* Powered by Arto */}
      <div className="text-xs text-center mt-2 pb-4 font-regular rounded-b-lg">
          <a href="https://invotra.com/arto-ai-chatbot/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:opacity-80">

         

            <span className="text-[#C0C0C0] pt-2mb-2">Powered by</span>
            <img src="./arto-site-logo-lite-grey.svg" alt="Arto" className="inline-block h-4 mb-1 ml-0.5" />

          </a>
        </div>
      </div>
   
  );
};

export default ChatInput;