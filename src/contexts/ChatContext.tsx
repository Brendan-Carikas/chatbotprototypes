import React, { createContext, useContext, useState } from 'react';
import { Message } from '../types';

const BOT_RESPONSES = [
  'I have always depended on the kindness of strangers',
  'Life is like riding a bicycle. To keep your balance you must keep moving',
  'Eighty percent of success is showing up',
  'If at first you don\'t succeed, try, try, try again'
];

interface ChatContextType {
  messages: Message[];
  isTyping: boolean;
  sendMessage: (content: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '👋 Hi, I am Arto how can help?',
      isBot: true,
      timestamp: '14:30'
    },
    {
      id: '2',
      content: 'Can you explain what React hooks are?',
      isBot: false,
      timestamp: '14:31'
    },
    {
      id: '3',
      content: 'Life is like riding a bicycle. To keep your balance you must keep moving',
      isBot: true,
      timestamp: '14:31'
    },
    {
      id: '4',
      content: 'That\'s an interesting quote, but I was asking about React hooks.',
      isBot: false,
      timestamp: '14:32'
    },
    {
      id: '5',
      content: 'I have always depended on the kindness of strangers',
      isBot: true,
      timestamp: '14:32'
    },
    {
      id: '6',
      content: 'I think there might be something wrong with the chatbot...',
      isBot: false,
      timestamp: '14:33'
    },
    {
      id: '7',
      content: 'Eighty percent of success is showing up',
      isBot: true,
      timestamp: '14:33'
    },
    {
      id: '8',
      content: 'Are you just giving me random quotes now?',
      isBot: false,
      timestamp: '14:34'
    },
    {
      id: '9',
      content: 'If at first you don\'t succeed, try, try, try again',
      isBot: true,
      timestamp: '14:34'
    },
    {
      id: '10',
      content: 'This is actually kind of funny. Give me another one!',
      isBot: false,
      timestamp: '14:35'
    },
    {
      id: '11',
      content: 'Life is like riding a bicycle. To keep your balance you must keep moving',
      isBot: true,
      timestamp: '14:35'
    },
    {
      id: '12',
      content: 'You already said that one! 😄',
      isBot: false,
      timestamp: '14:36'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const getFormattedTime = () => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  };

  const sendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: getFormattedTime()
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
        timestamp: getFormattedTime()
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
