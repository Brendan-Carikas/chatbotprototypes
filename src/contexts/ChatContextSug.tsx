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
  hideSummarySuggestions: boolean;
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
  const [hideSummarySuggestions, setHideSummarySuggestions] = useState(false);
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
      showFeedback: false, // First message: no feedback per memory
      showSuggestions: false // First message: no suggestions per memory
    },
    {
      id: '2',
      content: 'Select an option below or type a brief message so I can better assist you.',
      isBot: true,
      timestamp: null, // Second message: no timestamp per memory cebe3a5d
      showFeedback: false, // Second message: no feedback per memory
      showSuggestions: !hideInitialSuggestions, // Second message: shows initial suggestions per memory
      suggestions: hideInitialSuggestions ? undefined : ['Ask for a proposal', 'Ask a question'] // Only show if not hidden
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);



  const showInitialOptions = () => {
    setHideInitialSuggestions(false);
    const botMessage: Message = {
      id: Date.now().toString(),
      content: 'Select an option below or type a brief message so I can better assist you.',
      isBot: true,
      timestamp: getFormattedTime(),
      showFeedback: false,
      showSuggestions: true,
      suggestions: ['Ask for a proposal', 'Ask a question']
    };
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev.map(msg => ({
        ...msg,
        showSuggestions: msg.id === '2' ? false : msg.showSuggestions,
        suggestions: msg.id === '2' ? undefined : msg.suggestions
      })), botMessage]);
    }, 1000);
  };

  const handleProposalFlow = (userInput: string) => {
    // Hide initial suggestions when user asks a question
    if (userInput === 'Ask a question') {
      setHideInitialSuggestions(true);
      return;
    }

    // Show initial suggestions if user mentions 'proposal' or 'quote'
    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes('proposal') || lowerInput.includes('quote')) {
      showInitialOptions();
      return;
    }
    let nextStep: ProposalStep = null;
    const updatedProposalData = { ...proposalData };

    switch (proposalData.step) {
      case 'name':
        updatedProposalData.name = userInput;
        nextStep = 'email';
        const emailMessage: Message = {
          id: Date.now().toString(),
          content: PROPOSAL_FLOW.email,
          isBot: true,
          timestamp: getFormattedTime(),
          showFeedback: false
        };
        setMessages(prev => [...prev, emailMessage]);
        break;
      case 'email':
        updatedProposalData.email = userInput;
        nextStep = 'phone';
        const phoneMessage: Message = {
          id: Date.now().toString(),
          content: PROPOSAL_FLOW.phone,
          isBot: true,
          timestamp: getFormattedTime(),
          showFeedback: false
        };
        setMessages(prev => [...prev, phoneMessage]);
        break;
      case 'phone':
        updatedProposalData.phone = userInput;
        nextStep = 'summary';
        const summaryMessage: Message = {
          id: Date.now().toString(),
          content: `${PROPOSAL_FLOW.complete}\n\nName: ${updatedProposalData.name}\nEmail: ${updatedProposalData.email}\nPhone: ${updatedProposalData.phone}\n\nIs there anything else I can help you with?`,
          isBot: true,
          timestamp: getFormattedTime(),
          showFeedback: false,
          showSuggestions: !hideSummarySuggestions,
          suggestions: ['No, I\'m good', 'I still need help']
        };
        setMessages(prev => [...prev, summaryMessage]);
        break;
      default:
        return false;
    }

    updatedProposalData.step = nextStep;
    setProposalData(updatedProposalData);
    return null;
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
      // Handle initial suggestion buttons
      if (content === 'Ask for a proposal' || content === 'Ask a question') {
        setHideInitialSuggestions(true);
        
        // Update existing messages to hide initial suggestions
        setMessages(prev => prev.map(msg => ({
          ...msg,
          showSuggestions: msg.suggestions?.includes('Ask for a proposal') ? false : msg.showSuggestions,
          suggestions: msg.suggestions?.includes('Ask for a proposal') ? undefined : msg.suggestions
        })));
        
        if (content === 'Ask for a proposal' && !proposalData.step) {
          const botMessage: Message = {
            id: Date.now().toString(),
            content: PROPOSAL_FLOW.initial + '\n\n' + PROPOSAL_FLOW.name,
            isBot: true,
            timestamp: getFormattedTime(),
            showFeedback: messages.length >= 2
          };
          setProposalData({ ...proposalData, step: 'name' });
          setIsTyping(false);
          setMessages(prev => [...prev, botMessage]);
        }
        return;
      }
      
      // Handle summary suggestion buttons
      if (content === 'No, I\'m good' || content === 'I still need help') {
        setHideSummarySuggestions(true);
        
        // Update existing messages to hide summary suggestions
        setMessages(prev => prev.map(msg => ({
          ...msg,
          showSuggestions: msg.suggestions?.includes('No, I\'m good') ? false : msg.showSuggestions,
          suggestions: msg.suggestions?.includes('No, I\'m good') ? undefined : msg.suggestions
        })));
        
        if (content === 'No, I\'m good') {
          const thankYouMessage: Message = {
            id: Date.now().toString(),
            content: 'Thanks for taking the time to chat.',
            isBot: true,
            timestamp: getFormattedTime(),
            showFeedback: messages.length >= 2,
            showSuggestions: false
          };
          setMessages(prev => [...prev, thankYouMessage]);
        } else {
          const helpMessage: Message = {
            id: Date.now().toString(),
            content: 'How can I help?',
            isBot: true,
            timestamp: getFormattedTime(),
            showFeedback: messages.length >= 2,
            showSuggestions: false
          };
          setMessages(prev => [...prev, helpMessage]);
        }
        
        setProposalData({ ...proposalData, step: null });
        setIsTyping(false);
        return;
      }
      
      // Check for proposal/quote keywords in regular messages
      if (!proposalData.step) {
        const lowerContent = content.toLowerCase();
        if (lowerContent.includes('proposal') || lowerContent.includes('quote')) {
          showInitialOptions();
          return;
        }
      }
      
      // Handle proposal flow steps
      const proposalResponse = handleProposalFlow(content);
      if (proposalResponse === null) {
        setIsTyping(false);
        return;
      }
      
      // Handle regular chat responses
      if (!proposalResponse) {
        const botMessage: Message = {
          id: Date.now().toString(),
          content: CHAT_RESPONSES[Math.floor(Math.random() * CHAT_RESPONSES.length)],
          isBot: true,
          timestamp: getFormattedTime(),
          showFeedback: messages.length >= 2,
          showSuggestions: false
        };
        setIsTyping(false);
        setMessages(prev => [...prev, botMessage]);
      }
    }, 2000);
  };

  return (
    <ChatContext.Provider value={{ messages, isTyping, sendMessage, proposalData, hideInitialSuggestions, hideSummarySuggestions }}>
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
