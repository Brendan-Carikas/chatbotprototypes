import React, { createContext, useContext, useState } from 'react';
import { Message } from '../types';

type ProposalStep = 'name' | 'email' | 'phone' | 'summary' | null;
type RepairStep = 'name' | 'email' | 'phone' | 'location' | 'noticed' | 'summary' | null;

// Council-specific responses for each suggestion
const COUNCIL_RESPONSES: Record<string, string> = {
  "When are my bins collected?": "Your bins are collected every Tuesday morning. Please ensure they are placed outside by 7 AM. You can check specific collection dates on the council website or through your council account. Is there anything else I can help you with?",
  
  "I need to report a housing repair": "I can help you report a housing repair. Please provide details about the issue, including the location in your home, when you first noticed it. You can also call our repairs hotline at 0800-123-4567. Is there anything else I can help you with?",
  
  "What's my rent balance?": "To check your rent balance, you'll need to log in to your council account or contact our housing team directly. For security reasons, I cannot access your personal financial information through this chat. Is there anything else I can help you with?"
};

const CHAT_RESPONSES = [
  'I can assist with various council services like bin collections, housing repairs, and rent inquiries. Just let me know what you need!',
  'As your council assistant, I aim to provide accurate and helpful responses while maintaining a natural conversational flow.',
  'I can help you explore different council services and provide detailed explanations. Feel free to ask follow-up questions for clarification.',
  'My responses are generated using advanced language models, but I always encourage users to verify critical information with the council directly.',
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
  
  const [repairData, setRepairData] = useState<{
    step: RepairStep;
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
    noticed?: string;
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
      suggestions: hideInitialSuggestions ? undefined : [
        'When are my bins collected?',
        'I need to report a housing repair',
        'What\'s my rent balance?'
      ] // Council-specific suggestions
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
      suggestions: [
        'When are my bins collected?',
        'I need to report a housing repair',
        'What\'s my rent balance?'
      ]
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

  const handleRepairFlow = (userInput: string) => {
    let nextStep: RepairStep = null;
    const updatedRepairData = { ...repairData };

    switch (repairData.step) {
      case 'name':
        updatedRepairData.name = userInput;
        nextStep = 'email';
        const emailMessage: Message = {
          id: Date.now().toString(),
          content: 'Thanks! Now, could you please provide your email address so we can send you updates about your repair?',
          isBot: true,
          timestamp: getFormattedTime(),
          showFeedback: false
        };
        setMessages(prev => [...prev, emailMessage]);
        break;
      case 'email':
        updatedRepairData.email = userInput;
        nextStep = 'phone';
        const phoneMessage: Message = {
          id: Date.now().toString(),
          content: 'Great! What\'s your phone number so we can contact you about the repair if needed?',
          isBot: true,
          timestamp: getFormattedTime(),
          showFeedback: false
        };
        setMessages(prev => [...prev, phoneMessage]);
        break;
      case 'phone':
        updatedRepairData.phone = userInput;
        nextStep = 'location';
        const locationMessage: Message = {
          id: Date.now().toString(),
          content: 'Please tell me where in your home the issue is located (e.g., kitchen, bathroom, bedroom).',
          isBot: true,
          timestamp: getFormattedTime(),
          showFeedback: false
        };
        setMessages(prev => [...prev, locationMessage]);
        break;
      case 'location':
        updatedRepairData.location = userInput;
        nextStep = 'noticed';
        const noticedMessage: Message = {
          id: Date.now().toString(),
          content: 'When did you first notice this issue?',
          isBot: true,
          timestamp: getFormattedTime(),
          showFeedback: false
        };
        setMessages(prev => [...prev, noticedMessage]);
        break;
      case 'noticed':
        updatedRepairData.noticed = userInput;
        nextStep = 'summary';
        const summaryMessage: Message = {
          id: Date.now().toString(),
          content: `Thank you for providing all the information about your repair request. Here's a summary:\n\nName: ${updatedRepairData.name}\nEmail: ${updatedRepairData.email}\nPhone: ${updatedRepairData.phone}\nLocation: ${updatedRepairData.location}\nWhen noticed: ${updatedRepairData.noticed}\n\nYour repair request has been submitted with reference number REP-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}. A member of our repairs team will contact you within 2 working days.\n\nIs there anything else I can help you with?`,
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

    updatedRepairData.step = nextStep;
    setRepairData(updatedRepairData);
    return true;
  };

  const handleProposalFlow = (userInput: string) => {
    // Handle council-specific queries except for repair flow
    if (COUNCIL_RESPONSES[userInput] && userInput !== 'I need to report a housing repair') {
      const botMessage: Message = {
        id: Date.now().toString(),
        content: COUNCIL_RESPONSES[userInput],
        isBot: true,
        timestamp: getFormattedTime(),
        showFeedback: true
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      return true;
    }

    // Hide initial suggestions when user asks a question
    if (userInput === 'Ask a question') {
      setHideInitialSuggestions(true);
      return;
    }

    // Show initial suggestions if user mentions specific keywords
    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes('bins') || lowerInput.includes('repair') || lowerInput.includes('rent')) {
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

    // Handle message sending
    setTimeout(() => {
      // Handle council-specific suggestions except housing repair
      if (content === 'When are my bins collected?' || 
          content === 'What\'s my rent balance?') {
        setHideInitialSuggestions(true);
        
        // Update existing messages to hide initial suggestions
        setMessages(prev => prev.map(msg => ({
          ...msg,
          showSuggestions: msg.id === '2' ? false : msg.showSuggestions,
          suggestions: msg.id === '2' ? undefined : msg.suggestions
        })));
        
        const botMessage: Message = {
          id: Date.now().toString(),
          content: COUNCIL_RESPONSES[content],
          isBot: true,
          timestamp: getFormattedTime(),
          showFeedback: true
        };
        setIsTyping(false);
        setMessages(prev => [...prev, botMessage]);
        return;
      }
      
      // Handle housing repair flow
      if (content === 'I need to report a housing repair') {
        setHideInitialSuggestions(true);
        
        // Update existing messages to hide initial suggestions
        setMessages(prev => prev.map(msg => ({
          ...msg,
          showSuggestions: msg.id === '2' ? false : msg.showSuggestions,
          suggestions: msg.id === '2' ? undefined : msg.suggestions
        })));
        
        const botMessage: Message = {
          id: Date.now().toString(),
          content: 'I can help you report a housing repair. Let\'s get started with some details. First, could you please tell me your full name?',
          isBot: true,
          timestamp: getFormattedTime(),
          showFeedback: false
        };
        setRepairData({ ...repairData, step: 'name' });
        setIsTyping(false);
        setMessages(prev => [...prev, botMessage]);
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
            content: 'How can I help with your council-related query?',
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
      
      // Check for council-related keywords in regular messages
      if (!proposalData.step && !repairData.step) {
        const lowerContent = content.toLowerCase();
        
        // Handle bins-related keywords
        if (lowerContent.includes('bins') || lowerContent.includes('collection') || lowerContent.includes('waste') || lowerContent.includes('recycling')) {
          const botMessage: Message = {
            id: Date.now().toString(),
            content: COUNCIL_RESPONSES['When are my bins collected?'],
            isBot: true,
            timestamp: getFormattedTime(),
            showFeedback: true
          };
          setIsTyping(false);
          setMessages(prev => [...prev, botMessage]);
          return;
        }
        
        // Handle repair-related keywords
        if (lowerContent.includes('repair') || lowerContent.includes('fix') || lowerContent.includes('broken') || 
            lowerContent.includes('house repair') || lowerContent.includes('housing') || lowerContent.includes('maintenance')) {
          const botMessage: Message = {
            id: Date.now().toString(),
            content: 'I can help you report a housing repair. Let\'s get started with some details. First, could you please tell me your full name?',
            isBot: true,
            timestamp: getFormattedTime(),
            showFeedback: false
          };
          setRepairData({ ...repairData, step: 'name' });
          setIsTyping(false);
          setMessages(prev => [...prev, botMessage]);
          return;
        }
        
        // Handle rent-related keywords
        if (lowerContent.includes('rent') || lowerContent.includes('balance') || lowerContent.includes('payment') || 
            lowerContent.includes('rent balance') || lowerContent.includes('account')) {
          const botMessage: Message = {
            id: Date.now().toString(),
            content: COUNCIL_RESPONSES['What\'s my rent balance?'],
            isBot: true,
            timestamp: getFormattedTime(),
            showFeedback: true
          };
          setIsTyping(false);
          setMessages(prev => [...prev, botMessage]);
          return;
        }
      }
      
      // Handle repair flow steps
      if (repairData.step) {
        const repairResponse = handleRepairFlow(content);
        if (repairResponse) {
          setIsTyping(false);
          return;
        }
      }
      
      // Handle proposal flow steps
      const proposalResponse = handleProposalFlow(content);
      if (proposalResponse === true || proposalResponse === null) {
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
