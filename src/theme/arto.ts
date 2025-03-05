import { type Theme } from './types';
import { getAssetPath } from '../utils/assetPath';

// Define colors separately to avoid circular references
const PRIMARY_COLOR = '#005E54';
const PRIMARY_LIGHT_COLOR = '#005E5440'; // 25% of primary using hex opacity

export const artoTheme: Theme = {
  name: 'arto',
  logo: getAssetPath('Arto-Logo-Reverse.svg'),
  textSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    md: '1rem',       // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
  },
  colors: {
    primary: PRIMARY_COLOR,
    primaryLight: PRIMARY_LIGHT_COLOR,
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
    userMessage: '8px',
    botMessage: '8px',
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
      background: PRIMARY_LIGHT_COLOR, 
      text: '#111827', // text-gray-900
      borderRadius: '12px 12px 4px 12px',
      fontSize: 'text-sm',
      marginBottom: '8px',
    },
    botMessage: {
      background: '#f3f4f6', // bg-gray-100 
      text: '#111827', // text-gray-900
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
      background: '#008080',
      hover: '#006666',
      text: 'white',
    },
    ghost: {
      background: 'transparent',
      hover: '#e6f3f3',
      text: '#008080',
    },
  },
};
