import { type Theme } from './types';

export const artotheme: Theme = {
  name: 'artotheme',
  logo: 'Arto-Logo-Reverse.svg', // Logo shown in chat header
  colors: {
    primary: '181 100% 26%', // User message bubbles, send button
    background: '174 57% 90%', // Chat dialog background
    foreground: '0 0% 0%', // Main text color
    card: '0 0% 100%', // Chat dialog card background
    cardForeground: '0 0% 0%', // Text color in chat dialog card
    popover: '0 0% 100%', // Dropdown menus background
    popoverForeground: '0 0% 0%', // Text in dropdown menus
    secondary: '210 40% 96.1%', // Secondary elements background
    secondaryForeground: '222.2 47.4% 11.2%', // Text on secondary elements
    border: '214.3 31.8% 91.4%', // Border color
    focusRing: '181 100% 26%', // Focus indicator color
    muted: '60 50% 96%', // Muted background
    mutedForeground: '0 0% 0%', // Muted text color
  },
  fonts: {
    sans: ['Libre Franklin', 'sans-serif'], // Main chat font
  },
  borderRadius: {
    userMessage: '20px 20px 4px 20px', // User message bubble corners
    botMessage: '20px 20px 20px 4px', // Bot message bubble corners
    input: '12px', // Chat input field corners
    button: '12px', // Send button corners
  },
  messageStyles: {
    maxWidth: '70%', // Maximum width of message bubbles
    padding: '16px', // Padding inside message bubbles
    shadow: 'none', // No shadow on message bubbles
    fontSize: {
      message: 'sm', // Message text size
      timestamp: 'none' // Hide timestamp
    },
    userMessage: {
      background: '#008080', // Teal color for user messages
      text: 'text-black',
      borderRadius: '20px 20px 4px 20px'
    },
    botMessage: {
      background: '#f1f5f9', // Light gray for bot messages
      text: 'text-black',
      borderRadius: '20px 20px 20px 4px'
    },
    showFeedback: false, // Hide feedback buttons
    hideAssistantInfo: true // Hide AI Assistant icon and text
  },
  buttonStyles: {
    primary: {
      background: 'bg-primary', // Send button background
      hover: 'hover:bg-primary/80', // Send button hover effect
      text: 'text-white', // Send button text color
    },
    ghost: {
      background: 'bg-primary/10', // Secondary buttons background
      hover: 'hover:bg-primary/20', // Secondary buttons hover effect
      text: 'text-primary', // Secondary buttons text color
    },
  },
};
