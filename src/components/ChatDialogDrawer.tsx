import React from 'react';
import { X } from 'lucide-react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import FeedbackDrawer from './FeedbackDrawer';
import TypingIndicator from './TypingIndicator';
import { useChat } from '../contexts/ChatContext';

const ChatDialog: React.FC = () => {
  const { isTyping } = useChat();

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      // Handle dialog close
      console.log('Dialog close requested');
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-title"
    >
      <div 
        className="w-[378px] md:w-[448px] bg-white rounded-lg shadow-xl flex flex-col h-[600px] relative"
        role="document"
      >
        {/* Header */}
        <header 
          className="flex items-center justify-between p-6 bg-[#00847C] text-white rounded-t-lg"
          role="banner"
        >
          <div className="flex items-center">
            <img 
              src="./arto-site-logo-grey.svg" 
              alt="Arto Logo"
              className="h-8 w-auto invert brightness-0" 
              aria-hidden="true"
            />
          </div>
          <button 
            className="p-1.5 hover:bg-white/10 rounded-sm transition-colors focus:outline-none focus:ring-1 focus:ring-white/30"
            aria-label="Close chat"
          >
            <X 
              className="w-4 h-4 text-white" 
              aria-hidden="true"
            />
          </button>
        </header>

        {/* Message Area */}
        <main 
          className="flex-1 overflow-y-auto"
          role="log"
          aria-label="Chat messages"
          aria-live="polite"
        >
          <MessageList />
          {isTyping && <TypingIndicator />}
        </main>

        {/* Input Area */}
        <footer role="contentinfo">
          <ChatInput />
        </footer>

        {/* Feedback Drawer */}
        <FeedbackDrawer />
      </div>
    </div>
  );
};

export default ChatDialog;