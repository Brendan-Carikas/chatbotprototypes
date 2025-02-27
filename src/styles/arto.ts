import { type Theme } from './types';

export const artoTheme: Theme = {
  name: 'arto',
  logo: '/arto-site-logo-grey.svg',
  colors: {
    primary: '#00847C',
    secondary: '#006666',
    background: '#ffffff',
    foreground: '#000000',
    card: '#ffffff',
    cardForeground: '#000000',
    popover: '#ffffff',
    popoverForeground: '#000000',
    muted: '#f3f4f6',
    mutedForeground: '#6b7280',
  },
  fonts: {
    sans: ['Libre Franklin', 'system-ui', 'sans-serif'],
  },
  borderRadius: {
    userMessage: '12px 12px 4px 12px',
    botMessage: '12px 12px 12px 4px',
    input: '4px',
    button: '4px',
  },
  dialog: {
    width: {
      xl: '448px',
      xs: '378px',
    },
  },
  messageStyles: {
    maxWidth: '80%',
    padding: '16px',
    shadow: 'none',
    fontSize: 'text-sm',
    showFeedback: true,
    hideAssistantInfo: false,
    userMessage: {
      background: '#00847C',
      text: 'white',
      borderRadius: '12px 12px 4px 12px',
      fontSize: 'text-sm',
      marginBottom: '8px',
    },
    botMessage: {
      background: '#ebebeb',
      text: 'black',
      borderRadius: '12px 12px 12px 4px',
      fontSize: 'text-sm',
    },
    container: {
      spacing: '8px',
      padding: '16px',
      maxHeight: '400px',
      minHeight: '300px',
    },
  },
  buttonStyles: {
    primary: {
      background: '#00847C',
      hover: '#006666',
      text: 'white',
    },
    ghost: {
      background: 'transparent',
      hover: '#e6f3f3',
      text: '#00847C',
    },
    placeholder: {
      fontSize: 'text-sm',
      color: 'text-gray-400',
      text: 'Ask a question...'
    }
  },
};
