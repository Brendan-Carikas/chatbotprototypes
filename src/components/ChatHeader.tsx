import React, { ReactNode } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';
import { artoTheme } from '../theme/arto';

interface ChatHeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  headerTitle?: string;
  children?: ReactNode;
  className?: string;
  tooltipText?: string;
  onClose?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  logoSrc = "./arto-site-logo-grey.svg",
  logoAlt = "Arto Logo",
  headerTitle = "Chat Assistant",
  children,
  className = "",
  tooltipText = "These answers are generated using artificial intelligence. This is an experimental technology, and information may occasionally be incorrect or misleading.",
  onClose
}) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <header 
      className={`flex items-center justify-between p-4 text-white rounded-t-lg ${className}`}
      style={{ backgroundColor: artoTheme.colors.primary }}
      role="banner"
      aria-labelledby="chat-header-title"
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <img 
            src={logoSrc} 
            alt={logoAlt}
            className="h-14 w-auto invert brightness-0" 
            aria-hidden="true"
          />
        </div>
        <span id="chat-header-title" className="sr-only">{headerTitle}</span>
        
        <Tooltip 
          title={tooltipText}
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
            tabIndex={4}
          >
            <InfoOutlinedIcon fontSize="small" className="text-white" />
          </button>
        </Tooltip>
        
        {children}
      </div>
      
      {onClose && (
        <button
          className="p-1.5 hover:bg-white/10 rounded-sm transition-colors focus:outline-none focus:ring-1 focus:ring-white/30"
          onClick={handleClose}
          aria-label="Close chat"
          tabIndex={100}
        >
          <CloseIcon fontSize="small" className="text-white" />
        </button>
      )}
    </header>
  );
};

export default ChatHeader;
