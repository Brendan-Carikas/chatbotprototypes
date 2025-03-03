export interface Theme {
  name: string;
  logo: string;
  textSizes: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  colors: {
    primary: string;
    primaryLight: string;
    secondary: string;
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    muted: string;
    mutedForeground: string;
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
  dialog: {
    width: {
      xl: string;
      xs: string;
    };
  };
  messageStyles: {
    maxWidth: string;
    padding: string;
    shadow: string;
    fontSize: string;
    showFeedback: boolean;
    hideAssistantInfo: boolean;
    userMessage: {
      background: string;
      text: string;
      borderRadius: string;
      fontSize?: string;
      marginBottom?: string;
    };
    botMessage: {
      background: string;
      text: string;
      borderRadius: string;
      fontSize?: string;
    };
    container: {
      spacing: string;
      padding: string;
      maxHeight: string;
      minHeight: string;
    };
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
