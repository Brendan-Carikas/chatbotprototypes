export interface Theme {
  name: string;
  logo: string;
  colors: {
    primary: string;
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    secondary: string;
    secondaryForeground: string;
    border: string;
    focusRing: string; // Color for focus indicators
    muted: string; // Muted background color
    mutedForeground: string; // Muted text color
  };
  fonts: {
    sans: string[];
  };
  borderRadius: {
    userMessage: string;
    botMessage: string;
    input: string;
    button: string;
  };
  messageStyles: {
    maxWidth: string;
    padding: string;
    shadow: string;
    fontSize: {
      message: string;
      timestamp: string;
    };
    userMessage?: {
      background: string;
      text: string;
      borderRadius: string;
    };
    botMessage?: {
      background: string;
      text: string;
      borderRadius: string;
    };
    showFeedback?: boolean;
    hideAssistantInfo?: boolean;
    hideTimestamp?: boolean;
  };
  buttonStyles: {
    primary: {
      background: string;
      hover: string;
      text: string;
    };
    ghost: {
      background: string;
      hover: string;
      text: string;
    };
  };
}
