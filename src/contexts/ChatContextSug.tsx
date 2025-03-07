import React, { createContext, useContext, useState } from 'react';
import { Message } from '../types';

const REACT_RESPONSES = [
  'React hooks let you use state and lifecycle features in functional components. Common hooks include useState for state management and useEffect for side effects.',
  'TypeScript enhances React development by providing static typing, better IDE support, and catching potential errors at compile time.',
  'ARIA attributes make React components accessible. Key attributes include role, aria-label, and aria-live for dynamic content.',
  'Tailwind CSS provides utility classes for responsive design. Use breakpoints like sm:, md:, and lg: for different screen sizes.',
  'Optimize React performance by using useMemo for expensive calculations, useCallback for function memoization, and React.memo for component memoization.'
];

interface ChatContextType {
  messages: Message[];
  isTyping: boolean;
  sendMessage: (content: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const getFormattedTime = () => {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
};

interface ChatProviderProps {
  children: React.ReactNode;
  showSuggestions?: boolean;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children, showSuggestions = false }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '👋 Hi, I am Arto how can help?',
      isBot: true,
      timestamp: null, // First message: no timestamp
      showFeedback: false // First message: no feedback
    },
    {
      id: '2',
      content: 'Select an option below or type a brief message so I can better assist you.',
      isBot: true,
      timestamp: null, // Second message: no timestamp (per memory)
      showFeedback: false, // Second message: no feedback
      showSuggestions: true // Second message: shows suggestions
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);



  const sendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: getFormattedTime(), // User messages: show timestamp
      showFeedback: false // User messages: no feedback
    };
    
    setMessages((prev) => [...prev, userMessage]);

    // Show typing indicator
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const randomResponse = REACT_RESPONSES[Math.floor(Math.random() * REACT_RESPONSES.length)];
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        isBot: true,
        timestamp: getFormattedTime(), // Bot messages after first two: show timestamp
        showFeedback: true, // Bot messages after first two: show feedback
        showSuggestions: false
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    }, 2000);
  };

  return (
    <ChatContext.Provider value={{ messages, isTyping, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
