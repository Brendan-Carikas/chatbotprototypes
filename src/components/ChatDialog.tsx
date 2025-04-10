import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import SendIcon from '@mui/icons-material/Send';
import { artoTheme } from '../theme/arto';
import TypingIndicator from './TypingIndicator';
import { getAssetPath } from '../utils/assetPath';
import PoweredByArto from './PoweredByArto';
import ChatHeader from './ChatHeader';

type FeedbackType = 'positive' | 'negative' | null;

interface FeedbackOption {
  id: string;
  label: string;
  response: string;
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
}

interface ChatDialogProps {
  onClose: () => void;
}

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

const ChatDialog: React.FC<ChatDialogProps> = ({ onClose }) => {
  const [messages, setMessages] = React.useState<Message[]>([
    { 
      id: '1',
      content: "👋 Hi, I am Arto how can help?", 
      isUser: false, 
      showFeedback: false, // First message: no feedback buttons
      feedback: null,
      feedbackOption: null,
      customFeedback: '',
      isCustomFeedbackSubmitted: false,
      isFeedbackResponseDismissed: false
    },
  ]);
  const [newMessage, setNewMessage] = React.useState('');

  const [isTyping, setIsTyping] = React.useState(false);

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

  return (
    <div 
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg flex flex-col w-[378px] xl:w-[448px]" 
      style={{ fontFamily: artoTheme.fonts.sans.join(', ') }}
    >
      {/* Header */}
      <ChatHeader 
        logoSrc={getAssetPath('Arto-Logo-Reverse.svg')} 
        logoAlt="Arto"
        tooltipText="These answers are generated using artificial intelligence. This is an experimental technology, and information may occasionally be incorrect or misleading."
        onClose={onClose}
      />
      {/* Messages */}
      <div 
        className="flex-1 overflow-y-auto"
        style={{
          padding: artoTheme.messageStyles.container.padding,
          gap: artoTheme.messageStyles.container.spacing,
          minHeight: artoTheme.messageStyles.container.minHeight,
          maxHeight: artoTheme.messageStyles.container.maxHeight,
        }}
      >
        {messages.map((message, index) => (
          <div key={index} className="mb-4">
            <div
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-2`}
            >
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
                {message.content}
              </div>
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
                      className="p-1.5 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors
                               focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                      aria-label="Positive feedback"
                      tabIndex={3 + (index * 2)}
                    >
                      <ThumbUpOutlinedIcon fontSize="small" />
                    </button>
                    <button
                      onClick={() => {
                        setMessages(messages.map(msg =>
                          msg.id === message.id
                            ? { ...msg, feedback: 'negative' }
                            : msg
                        ));
                      }}
                      className="p-1.5 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors
                               focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                      aria-label="Negative feedback"
                      tabIndex={4 + (index * 2)}
                    >
                      <ThumbDownOutlinedIcon fontSize="small" />
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
                      <CloseIcon className="w-3 h-3" />
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
        {isTyping && <TypingIndicator />}
      </div>

      {/* Input area */}
      <div className="border-t">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }} 
          className="p-4 px-2 pr-4"
          aria-label="Chat message form"
        >
          <div className="flex space-x-2">
            <label htmlFor="messageInput" className="sr-only">
              Ask a question buddy
            </label>
            <input
              id="messageInput"
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 text-sm"
              style={{ '--tw-ring-color': artoTheme.colors.primary } as React.CSSProperties}
              aria-label="Message input"
              required
              tabIndex={1}
            />
            <button
              type="submit"
              className="text-white rounded-lg px-4 py-2 hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ 
                backgroundColor: artoTheme.colors.primary,
                '--tw-ring-color': artoTheme.colors.primary,
                opacity: !newMessage.trim() ? '0.7' : '1'
              } as React.CSSProperties}
              aria-label="Send message"
              tabIndex={2}
              disabled={!newMessage.trim()}
              aria-disabled={!newMessage.trim()}
            >
              <SendIcon fontSize="small" />
            </button>
          </div>
        </form>
        <PoweredByArto />
      </div>
    </div>
  );
};

export default ChatDialog;
