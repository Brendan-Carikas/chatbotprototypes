import React, { createContext, useContext, useState } from 'react';
import { Message } from '../types';

type ProposalStep = 'name' | 'email' | 'phone' | 'summary' | null;

const CHAT_RESPONSES = [
  'I can assist with various tasks like answering questions, providing information, and helping with proposals. Just let me know what you need!',
  'As an AI assistant, I aim to provide accurate and helpful responses while maintaining a natural conversational flow.',
  'I can help you explore different topics and provide detailed explanations. Feel free to ask follow-up questions for clarification.',
  'My responses are generated using advanced language models, but I always encourage users to verify critical information.',
  'I strive to be helpful while being transparent about my capabilities and limitations as an AI assistant.'
];

const PROPOSAL_FLOW = {
  initial: 'Great! I\'d be happy to help you request a proposal. Let\'s get started with a few details.',
  name: 'First, could you please tell me your full name?',
  email: 'Thanks! Now, could you please provide your email address so we can send you the proposal?',
  phone: 'Finally, what\'s your phone number?',
  complete: 'Thank you for providing all the information! Here\'s what I have:'
};

interface ChatContextType {
  messages: Message[];
  isTyping: boolean;
  sendMessage: (content: string) => void;
  proposalData: {
    step: ProposalStep;
    name?: string;
    email?: string;
    phone?: string;
  };
  hideInitialSuggestions: boolean;
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

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [hideInitialSuggestions, setHideInitialSuggestions] = useState(false);
  const [proposalData, setProposalData] = useState<{
    step: ProposalStep;
    name?: string;
    email?: string;
    phone?: string;
  }>({ step: null });
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '👋 Hi, I am Arto your helpful AI assistant',
      isBot: true,
      timestamp: null, // First message: no timestamp per memory
      showFeedback: false // First message: no feedback per memory
    },
    {
      id: '2',
      content: 'Select an option below or type a brief message so I can better assist you.',
      isBot: true,
      timestamp: getFormattedTime(), // Second message: shows timestamp per memory
      showFeedback: false, // Second message: no feedback per memory
      showSuggestions: true // Second message: shows initial suggestions per memory
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);



  const handleProposalFlow = (userInput: string) => {
    let nextStep: ProposalStep = null;
    let botResponse = '';
    const updatedProposalData = { ...proposalData };

    switch (proposalData.step) {
      case 'name':
        updatedProposalData.name = userInput;
        nextStep = 'email';
        botResponse = PROPOSAL_FLOW.email;
        break;
      case 'email':
        updatedProposalData.email = userInput;
        nextStep = 'phone';
        botResponse = PROPOSAL_FLOW.phone;
        break;
      case 'phone':
        updatedProposalData.phone = userInput;
        nextStep = 'summary';
        botResponse = `${PROPOSAL_FLOW.complete}\n\nName: ${updatedProposalData.name}\nEmail: ${updatedProposalData.email}\nPhone: ${updatedProposalData.phone}\n\nIs there anything else I can help you with?`;
        // Add bot message with suggestions immediately
        const summaryMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: botResponse,
          isBot: true,
          timestamp: getFormattedTime(), // Rule 3: All bot messages after second show timestamp
          showFeedback: false, // Special case: Hide feedback buttons for summary message
          showSuggestions: true,
          suggestions: ['No, I\'m good', 'I still need help']
        };
        setMessages(prev => [...prev, summaryMessage]);
        updatedProposalData.step = nextStep;
        setProposalData(updatedProposalData);
        return null;
      default:
        return false;
    }

    updatedProposalData.step = nextStep;
    setProposalData(updatedProposalData);
    return botResponse;
  };

  const sendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: getFormattedTime(),
      showFeedback: false
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Handle proposal flow or regular chat
    setTimeout(() => {
      let botResponse: string;
      let isProposalFlow = false;
      
      if (content.toLowerCase() === 'ask for a proposal' && !proposalData.step) {
        botResponse = PROPOSAL_FLOW.initial + '\n\n' + PROPOSAL_FLOW.name;
        setProposalData({ ...proposalData, step: 'name' });
        setHideInitialSuggestions(true);
        isProposalFlow = true;
      } else if (content === 'No, I\'m good') {
        // Create final thank you message
        const thankYouMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: 'Thanks for taking the time to chat.',
          isBot: true,
          timestamp: getFormattedTime(),
          showFeedback: messages.length >= 2,
          showSuggestions: false
        };
        setMessages(prev => [...prev, thankYouMessage]);
        setProposalData({ ...proposalData, step: null }); // Reset proposal flow
        setIsTyping(false);
        return;
      } else {
        const proposalResponse = handleProposalFlow(content);
        if (proposalResponse === null) {
          setIsTyping(false);
          return; // Summary message was already added
        }
        if (!proposalResponse) {
          botResponse = CHAT_RESPONSES[Math.floor(Math.random() * CHAT_RESPONSES.length)];
        } else {
          botResponse = proposalResponse;
          isProposalFlow = true;
        }
      }

      // Create bot message following display rules from memories
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        isBot: true,
        timestamp: messages.length === 0 ? null : getFormattedTime(), // Rule 1: First message has no timestamp
        showFeedback: !isProposalFlow && messages.length >= 2, // Hide feedback for proposal flow messages
        showSuggestions: messages.length === 1, // Rule 2: Only second message shows initial suggestions
        suggestions: undefined
      };
      
      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    }, 2000);
  };

  return (
    <ChatContext.Provider value={{ messages, isTyping, sendMessage, proposalData, hideInitialSuggestions }}>
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
