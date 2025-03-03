import { type Theme } from './types';

export const voobottheme: Theme = {
  name: 'voobottheme',
  logo: 'public/vooba-logo.png', // Logo shown in chat header
  colors: {
    primary: '0 0% 0%', // User message bubbles, send button
    background: '0 0% 100%', // Chat dialog background
    foreground: '0 0% 3.9%', // Main text color
    card: '0 0% 100%', // Chat dialog card background
    cardForeground: '0 0% 3.9%', // Text color in chat dialog card
    popover: '0 0% 100%', // Dropdown menus background
    popoverForeground: '0 0% 3.9%', // Text in dropdown menus
    secondary: '0 0% 96.1%', // Secondary elements background
    secondaryForeground: '0 0% 9%', // Text on secondary elements
    border: '0 0% 89.8%', // Border color
    focusRing: '0 0% 3.9%', // Focus indicator color
    muted: '0 0% 96.1%', // Muted background
    mutedForeground: '0 0% 45.1%', // Muted text color
  },
  fonts: {
    sans: ['Inter', 'sans-serif'], // Modern, clean font
  },
  borderRadius: {
    userMessage: '16px', // Consistent, modern border radius
    botMessage: '16px',
    input: '12px',
    button: '12px',
  },
  messageStyles: {
    maxWidth: '70%', // Maximum width of message bubbles
    padding: '12px', // Slightly less padding for a cleaner look
    shadow: 'sm', // Subtle shadow for depth
    fontSize: {
      message: 'sm', // Message text size
      timestamp: 'xs', // Timestamp text size
    },
    hideTimestamp: false, // Show timestamps
    hideAssistantInfo: true, // Hide assistant info for a cleaner look
    showFeedback: true, // Show feedback buttons
  },
  buttonStyles: {
    primary: {
      background: 'bg-black',
      hover: 'hover:bg-black/80',
      text: 'text-white',
    },
    ghost: {
      background: 'bg-black/5',
      hover: 'hover:bg-black/10',
      text: 'text-black',
    },
  },
};
