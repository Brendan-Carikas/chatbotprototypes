import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../contexts/AuthContext';

interface NavigationProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen: propIsOpen, onToggle: propOnToggle }) => {
  const [isOpen, setIsOpen] = useState(propIsOpen || false);
  const location = useLocation();
  const auth = useAuth();
  const { logout } = auth;
  
  // Debug: Log auth context
  console.log('Auth context in Navigation:', auth);

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
  
  // Handle logout
  const handleLogout = async () => {
    console.log('Logout button clicked');
    try {
      console.log('Attempting to logout with function:', logout);
      await logout();
      console.log('Logout successful');
      // Redirect will be handled by the AuthContext
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Check if we're on the login page
  const isLoginPage = location.pathname === '/ids-login' || location.pathname === '/';
  
  // Don't render navigation on login page
  if (isLoginPage) {
    return null;
  }
  
  return (
    <>
      {/* Hamburger menu button */}
      <button
        onClick={handleToggle}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        tabIndex={-1}
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
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        tabIndex={-1}
      >
        <div className="flex flex-col h-full p-4 pt-20 pb-4 justify-between">

          <div className="flex flex-col space-y-2 overflow-y-auto">
            <div className="px-3 py-2">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Prototype menu</h2>
            </div>
            
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
          
          {/* Logout button in the footer */}
          <div className="mt-auto pb-6">
            <div className="border-t border-gray-200 pt-4 mb-2"></div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 rounded-md text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 border border-blue-500 transition-colors duration-200"
              aria-label="Log out"
              tabIndex={0}
            >
              <LogoutIcon className="mr-2" fontSize="small" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
