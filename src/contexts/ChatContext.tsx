import React, { createContext, useContext, useState } from 'react';
import { Message } from '../types';

const BOT_RESPONSES = [
  'I can assist with various tasks like answering questions, providing information, and helping with proposals. Just let me know what you need!',
  'As an AI assistant, I aim to provide accurate and helpful responses while maintaining a natural conversational flow.',
  'I can help you explore different topics and provide detailed explanations. Feel free to ask follow-up questions for clarification.',
  'My responses are generated using advanced language models, but I always encourage users to verify critical information.',
  'I strive to be helpful while being transparent about my capabilities and limitations as an AI assistant.'
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
      content: '👋 Hi, I am Arto your helpful AI assistant',
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
      showSuggestions: showSuggestions // Only show suggestions in ChatDialogSuggestions
    },
    {
      id: '3',
      content: 'Can you help me with a proposal?',
      isBot: false,
      timestamp: '14:31'
    },
    {
      id: '4',
      content: 'I can assist with various tasks like answering questions, providing information, and helping with proposals. Just let me know what you need!',
      isBot: true,
      timestamp: '14:31',
      showFeedback: true // Bot messages after first two: show feedback
    },
    {
      id: '5',
      content: 'I need a proposal for a new website project.',
      isBot: false,
      timestamp: '14:32'
    },
    {
      id: '6',
      content: 'I can help you explore different topics and provide detailed explanations. Feel free to ask follow-up questions for clarification.',
      isBot: true,
      timestamp: '14:32',
      showFeedback: true // Bot messages after first two: show feedback
    },
    {
      id: '7',
      content: 'What kind of information can you provide for the proposal?',
      isBot: false,
      timestamp: '14:33'
    },
    {
      id: '8',
      content: 'As an AI assistant, I aim to provide accurate and helpful responses while maintaining a natural conversational flow.',
      isBot: true,
      timestamp: '14:33',
      showFeedback: true // Bot messages after first two: show feedback
    },
    {
      id: '9',
      content: 'Can you help me structure the proposal?',
      isBot: false,
      timestamp: '14:34'
    },
    {
      id: '10',
      content: 'I strive to be helpful while being transparent about my capabilities and limitations as an AI assistant.',
      isBot: true,
      timestamp: '14:34',
      showFeedback: true // Bot messages after first two: show feedback
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
      const randomResponse = BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];
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
