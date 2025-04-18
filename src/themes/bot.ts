import type { Theme } from './types';

export const botTheme: Theme = {
  name: 'bot',
  logo: '/chatbottheme/Arto-Logo-Reverse.svg', // Logo shown in chat header
  colors: {
    primary: '242 65% 24%', // User message bubbles, send button
    background: '0 0% 100%', // Chat dialog background
    foreground: '0 0% 0%', // Main text color
    card: '0 0% 100%', // Chat dialog card background
    cardForeground: '0 0% 0%', // Text color in chat dialog card
    popover: '0 0% 100%', // Dropdown menus background
    popoverForeground: '0 0% 0%', // Text in dropdown menus
    secondary: '174 57% 90%', // Bot message bubbles
    secondaryForeground: '0 0% 0%', // Bot message text color
    border: '220 13% 91%', // Border color for UI elements
    focusRing: '242 65% 24%', // Focus ring color (same as primary)
    muted: '220 13% 91%', // Muted background color
    mutedForeground: '220 8.9% 46.1%', // Muted text color
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
      timestamp: 'xs' // Timestamp text size
    }
  },
  buttonStyles: {
    primary: {
      background: 'bg-primary', // Send button background
      hover: 'hover:bg-primary/90', // Send button hover effect
      text: 'text-primary-foreground', // Send button text color
    },
    ghost: {
      background: 'bg-transparent', // Secondary buttons background
      hover: 'hover:bg-primary/10', // Secondary buttons hover effect
      text: 'text-primary', // Secondary buttons text color
    },
  },
};
