import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

interface NavigationProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen: propIsOpen, onToggle: propOnToggle }) => {
  const [isOpen, setIsOpen] = useState(propIsOpen || false);
  const location = useLocation();

  // Allow parent component to control the open state if provided
  useEffect(() => {
    if (propIsOpen !== undefined) {
      setIsOpen(propIsOpen);
    }
  }, [propIsOpen]);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (propOnToggle) {
      propOnToggle();
    }
  };

  // Close drawer when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
    if (propOnToggle) {
      propOnToggle();
    }
  };

  // Close drawer when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        if (propOnToggle) {
          propOnToggle();
        }
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, propOnToggle]);

  return (
    <>
      {/* Hamburger menu button */}
      <button
        onClick={handleToggle}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        tabIndex={-1} // Add this line to ignore tab navigation

      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={handleToggle}
          aria-hidden="true"
        />
      )}

      {/* Drawer panel */}
      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        tabIndex={-1} // Add this line to ignore tab navigation

      >
        <div className="flex flex-col h-full p-4 mt-20">

          <div className="flex flex-col space-y-2">
            
            
            <Link 
              to="/original" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/original' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'}`}
              aria-label="Go to Original Chat Dialog page"
              onClick={handleLinkClick}
              tabIndex={-1}
            >
              Chatbot: Original Dialog
            </Link>
            
            <Link 
              to="/welcome" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/welcome' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'}`}
              aria-label="Go to Welcome page"
              onClick={handleLinkClick}
              tabIndex={-1} // Add this line to ignore tab navigation

            >
              Chatbot: Email capture
            </Link>
            <Link 
              to="/welcome-style2" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/welcome-style2' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'}`}
              aria-label="Go to Welcome Style 2 page"
              onClick={handleLinkClick}
              tabIndex={-1} // Add this line to ignore tab navigation

            >
              Chatbot: Email capture style 2
            </Link>
            <Link 
              to="/spec" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/spec' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'}`}
              aria-label="Go to Spec page"
              onClick={handleLinkClick}
              tabIndex={-1} // Add this line to ignore tab navigation

            >
              Chatbot: Arto theme
            </Link>
            <Link 
              to="/chat-feedback" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/chat-feedback' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'}`}
              aria-label="Go to Chat Feedback page"
              onClick={handleLinkClick}
              tabIndex={-1} // Add this line to ignore tab navigation

            >
              Chatbot: Feedback
            </Link>
            
            <Link 
              to="/capture" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/capture' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'}`}
              aria-label="Go to Capture page"
              onClick={handleLinkClick}
              tabIndex={-1} // Add this line to ignore tab navigation

            >
              Chatbot: Talk to sales
            </Link>
            <Link 
              to="/capture-v2" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/capture-v2' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'}`}
              aria-label="Go to Capture V2 page"
              onClick={handleLinkClick}
              tabIndex={-1} // Add this line to ignore tab navigation

            >
              Chatbot: Talk to sales v2
            </Link>

            <Link 
              to="/suggestions" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/suggestions' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'}`}
              aria-label="Go to Chat Dialog Suggestions page"
              onClick={handleLinkClick}
              tabIndex={-1}
            >
              Chatbot: Dialog Suggestions
            </Link>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
