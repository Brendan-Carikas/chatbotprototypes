import React from 'react';
import { X, Send, ThumbsUp, ThumbsDown, Mail, MessageSquare, Info } from 'lucide-react';
import { artoTheme } from '../theme/arto';
import { Tooltip, Chip, Stack } from '@mui/material';
import TypingIndicator from './TypingIndicator';
import SalesDialog from './SalesDialog';

type FeedbackType = 'positive' | 'negative' | null;

interface FeedbackOption {
  id: string;
  label: string;
  response: string;
}

interface WelcomeOption {
  text: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
}

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  showFeedback?: boolean;
  feedback?: FeedbackType;
  feedbackOption?: string | null;
  customFeedback?: string;
  isCustomFeedbackSubmitted?: boolean;
  isFeedbackResponseDismissed?: boolean;
  chips?: WelcomeOption[];
}

interface ChatDialogCaptureV2Props {
  onClose: () => void;
}

const WELCOME_OPTIONS: WelcomeOption[] = [];

const POSITIVE_OPTIONS: FeedbackOption[] = [
  { id: 'fast', label: 'Fast (Efficient)', response: "Thanks for your feedback! We strive for quick, accurate responses." },
  { id: 'clear', label: 'Provided clear and helpful answers', response: "Glad to hear our answers were clear and helpful!" },
  { id: 'knowledgeable', label: 'Knowledgeable assistant', response: "We appreciate your recognition! We aim for expertise in every response." },
  { id: 'engaging', label: 'Engaging and friendly tone', response: "Happy you found our conversation engaging!" },
  { id: 'easy', label: 'Easy to use', response: "Thanks! We aim for a smooth, user-friendly experience." },
  { id: 'understood', label: 'Understood my needs well', response: "Glad we could understand and address your needs!" },
  { id: 'other', label: 'Other', response: "Thanks for your positive feedback!" }
];

const NEGATIVE_OPTIONS: FeedbackOption[] = [
  { id: 'slow', label: 'Slow (Inefficient)', response: "Sorry for the delay. We're working on improving speed." },
  { id: 'unhelpful', label: 'Answers were not helpful', response: "Sorry our answers weren’t helpful. We’re working to improve." },
  { id: 'incorrect', label: 'Provided incorrect information', response: "Apologies for the mistake. We’ll review and improve accuracy." },
  { id: 'difficult', label: 'Difficult to interact with', response: "Sorry for any difficulty. We’re making interactions smoother." },
  { id: 'misunderstood', label: "Didn't understand my question", response: "Apologies for the misunderstanding. We’re working on better comprehension." },
  { id: 'error', label: 'Encountered error message', response: "Sorry for the error. We’ll investigate and fix it." },
  { id: 'other', label: 'Other', response: "Thanks for your feedback!" }
];

type TabType = 'ai' | 'talk';

const ChatDialogCaptureV2: React.FC<ChatDialogCaptureV2Props> = ({ onClose }) => {
  const [isTyping, setIsTyping] = React.useState(false);
  const [inputPlaceholder] = React.useState('Ask a question...');
  const [activeTab, setActiveTab] = React.useState<TabType>('ai');
  const [showSalesDialog, setShowSalesDialog] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [contactName, setContactName] = React.useState('');
  const [contactEmail, setContactEmail] = React.useState('');
  const [contactPhone, setContactPhone] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [phoneError, setPhoneError] = React.useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    // Allow UK formats: +44 7XXX XXX XXX, 07XXX XXX XXX, 07XXX-XXX-XXX
    const phoneRegex = /^(\+44\s?7|07)[0-9]{3}(\s|\-)?[0-9]{3}(\s|\-)?[0-9]{3}$/;
    return phoneRegex.test(phone.trim());
  };

  const validateContactForm = () => {
    let isValid = true;
    
    if (!contactName.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!contactEmail.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(contactEmail)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!contactPhone.trim()) {
      setPhoneError('Phone number is required');
      isValid = false;
    } else if (!validatePhone(contactPhone)) {
      setPhoneError('Please enter a valid UK mobile number');
      isValid = false;
    } else {
      setPhoneError('');
    }

    return isValid;
  };
  const [messages, setMessages] = React.useState<Message[]>([
    { 
      id: '1',
      content: "👋 Hi, I'm Arto, your AI assistant here to help. How can I assist you today?", 
      isUser: false, 
      showFeedback: false,
      chips: WELCOME_OPTIONS,
      feedback: null,
      feedbackOption: null,
      customFeedback: '',
      isCustomFeedbackSubmitted: false,
      isFeedbackResponseDismissed: false
    },
  ]);
  const [newMessage, setNewMessage] = React.useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = { 
        id: Date.now().toString(),
        content: newMessage, 
        isUser: true 
      };
      setMessages([...messages, userMessage]);
      setNewMessage('');
      
      // Show typing indicator
      setIsTyping(true);
      
      // Simulate bot response after a delay
      setTimeout(() => {
        const botResponse = { 
          id: (Date.now() + 1).toString(),
          content: "I understand your message. Let me help you with that.", 
          isUser: false,
          showFeedback: true,
          feedback: null,
          feedbackOption: null,
          customFeedback: '',
          isCustomFeedbackSubmitted: false,
          isFeedbackResponseDismissed: false
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleContactSubmit = () => {
    if (validateContactForm()) {
      console.log('Contact form submitted:', { contactName, contactEmail, contactPhone });
      // TODO: Handle form submission
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setNameError('');
      setEmailError('');
      setPhoneError('');
      setActiveTab('ai'); // Switch back to conversation tab after submit
    }
  };

  const handleSalesDialogSubmit = (name: string, email: string, phone: string) => {
    console.log('SalesDialog onSubmit called with:', { name, email, phone });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false); 
      setShowSalesDialog(false); 
      // Optionally, you can set any other state necessary to show ChatDialogCaptureV2
    }, 4000);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-lg flex flex-col w-[378px] xl:w-[448px] h-[560px]" 
      style={{ fontFamily: artoTheme.fonts.sans.join(', ') }}
    >
      {/* Header */}
      <div className="bg-[#008080] text-white p-4 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/Arto-Logo-Reverse.svg" alt="Arto" className="h-14" />
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
              <Info className="h-4 w-4 text-white" />
            </button>
          </Tooltip>
        </div>
        <div className="flex items-center">
          <button onClick={onClose} className="p-1.5 hover:bg-[#006666] rounded-md transition-colors">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'ai' ? (
        <div 
          className="flex-1 overflow-y-auto"
          style={{
            padding: artoTheme.messageStyles.container.padding,
            gap: artoTheme.messageStyles.container.spacing,
            height: '100%',
          }}
        >
          {messages.map((message, index) => (
          <div key={index} className="mb-4">
            <div className="flex flex-col mb-2">
              <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={message.isUser ? artoTheme.messageStyles.fontSize : artoTheme.messageStyles.botMessage.fontSize}
                  style={{
                    maxWidth: artoTheme.messageStyles.maxWidth,
                    padding: artoTheme.messageStyles.padding,
                    background: message.isUser 
                      ? artoTheme.messageStyles.userMessage.background 
                      : artoTheme.messageStyles.botMessage.background,
                    color: message.isUser 
                      ? artoTheme.messageStyles.userMessage.text 
                      : artoTheme.messageStyles.botMessage.text,
                    borderRadius: message.isUser 
                      ? artoTheme.messageStyles.userMessage.borderRadius 
                      : artoTheme.messageStyles.botMessage.borderRadius,
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: message.content }} />
                </div>
              </div>
              {message.chips && (
                <div className="flex justify-start mt-2">
                  <Stack direction="column" spacing={1} sx={{ maxWidth: artoTheme.messageStyles.maxWidth }}>
                    {message.chips.map((option, index) => (
                      <Chip
                        key={index}
                        label={option.text}
                        variant="outlined"
                        icon={<option.icon size={16} color="currentColor" />}
                        onClick={() => {
                          const handleClick = async () => {
                            // Remove chips from the first message
                            setMessages(prev => prev.map((msg, idx) => 
                              idx === 0 ? { ...msg, chips: undefined } : msg
                            ));

                            // Add user message immediately
                            setMessages(prev => [
                              ...prev,
                              { id: Date.now().toString(), content: option.text, isUser: true }
                            ]);

                            if (option.text === 'Talk to sales') {
                              setShowSalesDialog(true);
                            }
                          };
                          handleClick();
                        }}
                        sx={{
                          borderColor: artoTheme.colors.primary,
                          color: artoTheme.colors.primary,
                          height: '32px',
                          maxWidth: 'fit-content',
                          '& .MuiChip-icon': {
                            marginLeft: '8px',
                            marginRight: '-4px',
                            color: 'inherit'
                          },
                          '& .MuiChip-label': {
                            paddingLeft: '12px'
                          },
                          '&:hover': {
                            backgroundColor: `${artoTheme.colors.primary}10`,
                            borderColor: artoTheme.colors.secondary,
                            color: artoTheme.colors.secondary
                          }
                        }}
                      />
                    ))}
                  </Stack>
                </div>
              )}
            </div>

            {/* Feedback UI */}
            {message.showFeedback && !message.isUser && (
              <div className="pl-0 max-w-[70%]">
                {message.feedback === null ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setMessages(messages.map(msg =>
                          msg.id === message.id
                            ? { ...msg, feedback: 'positive' }
                            : msg
                        ));
                      }}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#008080]"
                      aria-label="Positive feedback"
                    >
                      <ThumbsUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setMessages(messages.map(msg =>
                          msg.id === message.id
                            ? { ...msg, feedback: 'negative' }
                            : msg
                        ));
                      }}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#008080]"
                      aria-label="Negative feedback"
                    >
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                  </div>
                ) : message.feedbackOption === null ? (
                  <div className="space-y-2">
                    <div className="text-xs text-gray-600">
                      {message.feedback === 'positive'
                        ? "Great! I'm glad the information was helpful. To help us improve, please provide feedback."
                        : "Sorry that the information wasn't helpful. To help us improve, please provide feedback."}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(message.feedback === 'positive' ? POSITIVE_OPTIONS : NEGATIVE_OPTIONS).map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            setMessages(messages.map(msg =>
                              msg.id === message.id
                                ? { 
                                    ...msg, 
                                    feedbackOption: option.id,
                                    isCustomFeedbackSubmitted: option.id !== 'other'
                                  }
                                : msg
                            ));
                          }}
                          className="px-3 py-1 rounded-full text-xs transition-colors bg-teal-50 hover:bg-teal-100 text-[#008080]"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : message.feedbackOption === 'other' && !message.isCustomFeedbackSubmitted ? (
                  <div className="space-y-2 max-w-[80%]">
                    <div>
                      <textarea
                        value={message.customFeedback}
                        onChange={(e) => {
                          const newValue = e.target.value.slice(0, 600);
                          setMessages(messages.map(msg =>
                            msg.id === message.id
                              ? { ...msg, customFeedback: newValue }
                              : msg
                          ));
                        }}
                        maxLength={600}
                        className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008080] mb-1"
                        placeholder="Please add your feedback here..."
                        rows={3}
                      />
                      <div className="text-xs text-gray-500 font-medium mb-2 text-right">
                        {message.customFeedback?.length || 0}/600 characters
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          if (message.customFeedback?.trim()) {
                            setMessages(messages.map(msg =>
                              msg.id === message.id
                                ? { ...msg, isCustomFeedbackSubmitted: true }
                                : msg
                            ));
                          }
                        }}
                        disabled={!message.customFeedback?.trim()}
                        className="px-3 py-1 text-white rounded-lg text-xs transition-colors bg-[#008080] hover:bg-[#006666] disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Submit Feedback
                      </button>
                      <button
                        onClick={() => {
                          setMessages(messages.map(msg =>
                            msg.id === message.id
                              ? { 
                                  ...msg, 
                                  feedback: null,
                                  feedbackOption: null,
                                  customFeedback: '',
                                  isCustomFeedbackSubmitted: false
                                }
                              : msg
                          ));
                        }}
                        className="px-3 py-1 text-gray-600 rounded-lg text-xs transition-colors bg-gray-100 hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : message.feedbackOption === 'other' && !message.isCustomFeedbackSubmitted ? (
                  <div className="space-y-2 max-w-[80%]">
                    <div>
                      <textarea
                        value={message.customFeedback}
                        onChange={(e) => {
                          const newValue = e.target.value.slice(0, 600);
                          setMessages(messages.map(msg =>
                            msg.id === message.id
                              ? { ...msg, customFeedback: newValue }
                              : msg
                          ));
                        }}
                        maxLength={600}
                        className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008080] mb-1"
                        placeholder="Please add your feedback here..."
                        rows={3}
                      />
                      <div className="text-xs text-[#008080] font-medium mb-2">
                        {message.customFeedback?.length || 0}/600 characters
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          if (message.customFeedback?.trim()) {
                            setMessages(messages.map(msg =>
                              msg.id === message.id
                                ? { ...msg, isCustomFeedbackSubmitted: true }
                                : msg
                            ));
                          }
                        }}
                        disabled={!message.customFeedback?.trim()}
                        className="px-3 py-1 text-white rounded-lg text-xs transition-colors bg-[#008080] hover:bg-[#006666] disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Submit Feedback
                      </button>
                      <button
                        onClick={() => {
                          setMessages(messages.map(msg =>
                            msg.id === message.id
                              ? { 
                                  ...msg, 
                                  feedback: null,
                                  feedbackOption: null,
                                  customFeedback: '',
                                  isCustomFeedbackSubmitted: false
                                }
                              : msg
                          ));
                        }}
                        className="px-3 py-1 text-gray-600 rounded-lg text-xs transition-colors bg-gray-100 hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : message.isCustomFeedbackSubmitted && !message.isFeedbackResponseDismissed ? (
                  <div className="relative text-xs text-gray-600 bg-[#fff] border border-[gray-500] p-3 rounded-lg space-y-2">
                   
                    <button
                      onClick={() => {
                        setMessages(messages.map(msg =>
                          msg.id === message.id
                            ? { 
                                ...msg,
                                feedback: null,
                                feedbackOption: null,
                                customFeedback: '',
                                isCustomFeedbackSubmitted: false,
                                isFeedbackResponseDismissed: true
                              }
                            : msg
                        ));
                      }}
                      className="absolute top-1 right-1 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                      aria-label="Dismiss feedback response"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    {(message.feedback === 'positive' ? POSITIVE_OPTIONS : NEGATIVE_OPTIONS).find(
                      (opt) => opt.id === message.feedbackOption
                    )?.response}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start mb-2">
            <div
              style={{
                background: artoTheme.messageStyles.botMessage.background,
                borderRadius: artoTheme.messageStyles.botMessage.borderRadius,
              }}
            >
              <TypingIndicator />
            </div>
          </div>
        )}

        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-4 py-4" style={{ height: '100%' }}>
          <div className="space-y-6">
            <div>
              <h6 className="mt-2 mb-6 text-gray-700 text-lg font-semibold">Talk to our sales team</h6>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className={`block w-full rounded-md border ${nameError ? 'border-red-300' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-[#008080] focus:outline-none focus:ring-1 focus:ring-[#008080] sm:text-sm`}
                  placeholder="Your name"
                />
                {nameError && (
                  <p className="mt-1 text-sm text-red-600">{nameError}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
                <input
                  type="email"
                  id="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className={`block w-full rounded-md border ${emailError ? 'border-red-300' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-[#008080] focus:outline-none focus:ring-1 focus:ring-[#008080] sm:text-sm`}
                  placeholder="you@example.com"
                />
                {emailError && (
                  <p className="mt-1 text-sm text-red-600">{emailError}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone number</label>
                <input
                  type="tel"
                  id="phone"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className={`block w-full rounded-md border ${phoneError ? 'border-red-300' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-[#008080] focus:outline-none focus:ring-1 focus:ring-[#008080] sm:text-sm`}
                  placeholder="Your phone number"
                />
                {phoneError && (
                  <p className="mt-1 text-sm text-red-600">{phoneError}</p>
                )}
              </div>

              <div className="mt-8 pt-2">
                <button
                  onClick={handleContactSubmit}
                  className="w-full bg-[#008080] text-white py-2 px-4 rounded-md hover:bg-[#006666] transition-colors focus:outline-none focus:ring-2 focus:ring-[#008080] focus:ring-offset-2"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Input area */}
      <div className={`${activeTab === 'ai' ? 'border-t' : ''} text-sm`}>
        {activeTab === 'ai' && (
          <div className="flex gap-2 mx-4 my-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={inputPlaceholder}
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-[#008080] text-white rounded-md hover:bg-[#006666] transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        )}
        {/* Bottom Navigation */}
        <div>
          <hr className="border-t border-gray-200" />
          <nav className="flex justify-around px-4 bg-[#F3F3F3]" aria-label="Bottom Navigation">
            <button
              onClick={() => setActiveTab('ai')}
              className={`flex flex-col items-center px-4 py-2 relative transition-colors ${activeTab === 'ai' ? 'text-[#008080]' : 'text-[#757575] hover:text-[#008080]'}`}
              aria-current={activeTab === 'ai' ? 'page' : undefined}
            >
              <MessageSquare
                size={20}
                className={activeTab === 'ai' ? 'text-[#008080]' : 'text-[#757575]'}
              />
              <span className={`text-xs font-medium mt-1 ${activeTab === 'ai' ? 'text-[#008080]' : 'text-[#757575]'}`}>Conversation</span>
              {activeTab === 'ai' && <div className="absolute top-0 left-0 w-full h-0.5 bg-[#008080] rounded-full" />}
            </button>
            <button
              onClick={() => setActiveTab('talk')}
              className={`flex flex-col items-center px-4 py-2 relative transition-colors ${activeTab === 'talk' ? 'text-[#008080]' : 'text-[#757575] hover:text-[#008080]'}`}
              aria-current={activeTab === 'talk' ? 'page' : undefined}
            >
              <Mail
                size={20}
                className={activeTab === 'talk' ? 'text-[#008080]' : 'text-[#757575]'}
              />
              <span className={`text-xs font-medium mt-1 ${activeTab === 'talk' ? 'text-[#008080]' : 'text-[#757575]'}`}>Talk to us</span>
              {activeTab === 'talk' && <div className="absolute top-0 left-0 w-full h-0.5 bg-[#008080] rounded-full" />}
            </button>
          </nav>
        </div>

        {/* Powered by Arto */}
        <div className="text-xs text-center pb-2 font-regular bg-[#F3F3F3] rounded-b-lg">
          <a href="https://invotra.com/arto-ai-chatbot/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:opacity-80">
            <span className="text-[#757575] mt-0">Powered by</span>
            <img src="/arto-site-logo-grey.svg" alt="Arto" className="inline-block h-4 mb-1 ml-0.5" />
          </a>
        </div>
      </div>
      {showSalesDialog && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div style={{ width: '448px', height: '471px' }}>
            <SalesDialog
              onSubmit={handleSalesDialogSubmit}
              onClose={() => setShowSalesDialog(false)}
            />
          </div>
        </div>
      )}
      {isSubmitted && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-4 text-center">
            <p className="text-lg font-medium mb-2">Thank you for your submission!</p>
            <p className="text-sm text-gray-600 mb-4">We will review your submission and get back to you soon.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatDialogCaptureV2;
