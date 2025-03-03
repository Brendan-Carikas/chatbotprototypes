import React from 'react';
import { X } from 'lucide-react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import FeedbackDrawer from './FeedbackDrawer';
import TypingIndicator from './TypingIndicator';
import { useChat } from '../contexts/ChatContext';
import { Tooltip } from '@mui/material';
import { Info } from 'lucide-react';

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
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <img 
                src="./arto-site-logo-grey.svg" 
                alt="Arto Logo"
                className="h-8 w-auto invert brightness-0" 
                aria-hidden="true"
              />
            </div>

            <Tooltip 
              title="These answers are generated using artificial intelligence. This is an experimental technology, and information may occasionally be incorrect or misleading."
              arrow
              placement="bottom"
              sx={{
                '& .MuiTooltip-tooltip': {
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  color: '#fff',
                  fontSize: '0.75rem',
                  padding: '8px 12px',
                  maxWidth: '280px',
                  borderRadius: '4px'
                },
                '& .MuiTooltip-arrow': {
                  color: 'rgba(0, 0, 0, 0.9)'
                }
              }}
            >
              <button 
                className="p-1 rounded-full hover:bg-[#006666] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Information about AI Assistant"
                tabIndex={2}
              >
                <Info className="h-4 w- text-white" />
              </button>
            </Tooltip>
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