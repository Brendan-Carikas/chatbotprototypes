import { useState, useEffect, useRef } from 'react';
import { X, Send, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { cn } from '../lib/utils';
import { themes } from '../themes';
import { Tooltip } from '@mui/material';
import { Info } from 'lucide-react';

interface ChatDialogCnrProps {
  onClose?: () => void;
  theme?: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  feedback?: {
    isPositive?: boolean;
    reason?: string;
    submitted?: boolean;
  };
}

const LoadingDots = () => {
  return (
    <div className="flex space-x-1 items-center">
      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
  );
};

const ChatDialogCnr: React.FC<ChatDialogCnrProps> = ({ 
  onClose,
  theme = 'artotheme',
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [, setActiveFeedbackMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const activeTheme = theme || 'artotheme';

  const currentThemeObj = themes[activeTheme as keyof typeof themes];

  useEffect(() => {
    if (theme) {
      // setChatTheme(theme);
    }
  }, [theme]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Auto-scroll after user message
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thank you for your message. I understand your query and I will help you with that.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);

      // Auto-scroll after bot message
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000);
  };

  const handleFeedbackClick = (messageId: string, isPositive: boolean) => {
    setActiveFeedbackMessageId(messageId);
    
    setMessages(prevMessages => 
      prevMessages.map(message => {
        if (message.id === messageId) {
          return {
            ...message,
            feedback: {
              ...message.feedback,
              isPositive,
            },
          };
        }
        return message;
      })
    );
  };

  const handleFeedbackText = (messageId: string, reason: string) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message.id === messageId) {
          return {
            ...message,
            feedback: {
              reason,
            },
          };
        }
        return message;
      })
    );
  };

  const handleFeedbackSubmit = (messageId: string) => {
    setMessages(prevMessages => 
      prevMessages.map(message => {
        if (message.id === messageId) {
          return {
            ...message,
            feedback: {
              ...message.feedback,
              submitted: true,
            },
          };
        }
        return message;
      })
    );
    
    // Reset active feedback message
    setActiveFeedbackMessageId(null);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Card className="h-[600px] w-full max-w-full sm:max-w-[448px] flex flex-col overflow-hidden shadow-lg bg-white rounded-lg" role="dialog" aria-label="Chat Dialog">
      {/* Header */}
      <div className={cn(
        "p-4 flex items-center justify-between rounded-t-lg",
        "bg-[#008080] text-white"
      )}>
        <div className="flex items-center gap-2">
          <div className="flex items-center h-[56px] w-auto">
            <img 
              src={currentThemeObj.logo}
              alt="Logo" 
              className="h-full w-auto"
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
              <Info className="h-4 w-4 text-white" />
            </button>
          </Tooltip>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              "hover:bg-white/10 text-white"
            )}
            onClick={handleClose}
            aria-label="Close chat"
            tabIndex={1}
          >
            <X className="h-[1.4rem] w-[1.4rem]" />
          </Button>
        )}
      </div>

      {/* Assistant Label */}
      {!currentThemeObj.messageStyles.hideAssistantInfo && (
        <div className="flex items-center gap-2 px-4 py-2 bg-secondary/30">
          <img 
            src="/chatbottheme/Arto-icon.svg"
            alt="Bot"
            className="h-[17.5px] w-[17.5px]"
          />
          <span className="text-xs">AI Assistant</span>
        </div>
      )}

      {/* Chat Content */}
      <div className="flex flex-col flex-1 overflow-hidden bg-white">
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-4"
          role="log"
          aria-label="Chat messages"
          tabIndex={0}
        >
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={cn(
                "flex flex-col space-y-1",
                message.sender === 'user' ? "items-end" : "items-start",
                "w-full mb-4"
              )}
              role="article"
              aria-label={`${message.sender} message`}
            >
              <div className={cn(
                "flex items-end gap-2",
                message.sender === 'user' ? "justify-end" : "justify-start",
                "w-full"
              )}>
                {message.sender === 'bot' && !currentThemeObj.messageStyles.hideAssistantInfo && (
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <img 
                      src="/chatbottheme/Arto-icon.svg"
                      alt="Bot"
                      className="h-5 w-5"
                    />
                  </div>
                )}
                <div
                  className={cn(
                    "whitespace-pre-wrap break-words",
                    message.sender === 'user' ? "text-white" : "text-black"
                  )}
                  style={{ 
                    wordBreak: 'break-word',
                    padding: '16px',
                    maxWidth: '70%',
                    borderRadius: message.sender === 'user' 
                      ? '20px 20px 4px 20px'
                      : '20px 20px 20px 4px',
                    boxShadow: 'none',
                    background: message.sender === 'user'
                      ? '#008080' // Teal color for user messages
                      : '#f1f5f9', // Light gray for bot messages
                    fontSize: '0.875rem'
                  }}
                >
                  {message.text}
                </div>
              </div>
              <div className={cn(
                "flex items-center gap-2",
                message.sender === 'user' ? "justify-end" : "justify-start",
              )}>
                {!currentThemeObj.messageStyles.hideTimestamp && currentThemeObj.messageStyles.fontSize.timestamp !== 'none' && (
                  <span className={cn(
                    "text-muted-foreground",
                    currentThemeObj.messageStyles.fontSize.timestamp === 'xs' ? "text-xs" : "text-sm"
                  )}>
                    {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                )}
                {message.sender === 'bot' && !message.feedback && currentThemeObj.messageStyles.showFeedback !== false && (
                  <div className="flex gap-1" role="group" aria-label="Message feedback">
                    <button
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#008080]"
                      onClick={() => handleFeedbackClick(message.id, true)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleFeedbackClick(message.id, true);
                        }
                      }}
                      tabIndex={3 + (index * 2)}
                      aria-label="Positive feedback"
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#008080]"
                      onClick={() => handleFeedbackClick(message.id, false)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleFeedbackClick(message.id, false);
                        }
                      }}
                      tabIndex={4 + (index * 2)}
                      aria-label="Negative feedback"
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              {message.sender === 'bot' &&
                message.feedback &&
                message.feedback.isPositive === false && (
                  <div className="w-full mt-2">
                    {!message.feedback.submitted ? (
                      <>
                        <div className="flex flex-col gap-2">
                          <Textarea
                            placeholder="What was wrong with this response?"
                            value={message.feedback.reason || ''}
                            onChange={(e) => handleFeedbackText(message.id, e.target.value)}
                            className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary min-h-[60px]"
                            rows={3}
                            maxLength={600}
                          />
                          <div className="text-xs text-gray-500 font-medium mb-2 text-right">
                            {(message.feedback.reason?.length || 0)}/600 characters
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleFeedbackSubmit(message.id)}
                              disabled={!message.feedback.reason?.trim()}
                              className="px-3 py-1 text-white rounded-lg text-xs transition-colors bg-[#008080] hover:bg-[#006666] disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                              Submit Feedback
                            </button>
                            <button
                              onClick={() => {
                                setMessages(prevMessages => 
                                  prevMessages.map(msg => 
                                    msg.id === message.id 
                                      ? { ...msg, feedback: undefined } 
                                      : msg
                                  )
                                );
                                setActiveFeedbackMessageId(null);
                              }}
                              className="px-3 py-1 text-gray-600 rounded-lg text-xs transition-colors bg-gray-100 hover:bg-gray-200"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="relative text-xs text-gray-600 bg-white border border-gray-200 p-3 rounded-lg">
                        <button
                          onClick={() => {
                            setMessages(prevMessages => 
                              prevMessages.map(msg => 
                                msg.id === message.id 
                                  ? { ...msg, feedback: undefined } 
                                  : msg
                              )
                            );
                            setActiveFeedbackMessageId(null);
                          }}
                          className="absolute top-1 right-1 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                          aria-label="Dismiss feedback response"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        Thank you for your feedback. We'll use it to improve our responses.
                      </div>
                    )}
                  </div>
                )}
            </div>
          ))}
          {isTyping && (
            <div className="flex flex-col max-w-[80%] mr-auto items-start space-y-1">
              <div className="px-4 py-2 bg-muted rounded-[12px_12px_12px_0px]">
                <LoadingDots />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 mt-auto">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ask a question..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
                if (e.key === 'Escape') {
                  handleClose();
                }
              }}
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Chat input"
              tabIndex={messages.length * 2 + 3}
              ref={inputRef}
            />
            <button 
              onClick={handleSendMessage}
              aria-label="Send message"
              className={cn(
                "p-2 w-14 h-10 bg-[#008080] text-white rounded-md hover:bg-[#006666] transition-colors flex items-center justify-center",
                !inputValue.trim() && "opacity-50 cursor-not-allowed"
              )}
              tabIndex={messages.length * 2 + 4}
              disabled={!inputValue.trim()}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          <div className="text-xs text-center mt-4 font-regular">
            <a href="https://invotra.com/arto-ai-chatbot/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:opacity-80">
              <span className="text-[#C0C0C0] mt-0">Powered by</span>
              <img src="public/arto-site-logo-lite-grey.svg" alt="Arto" className="inline-block h-4 mb-1 ml-0.5" />
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChatDialogCnr;