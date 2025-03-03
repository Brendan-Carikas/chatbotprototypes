import React, { createContext, useContext, useState, ReactNode } from 'react';
import { artoTheme } from '../theme/arto';
import { Theme as ArtoTheme } from '../theme/types';
import { ThemeName } from '../themes';

// Define the shape of the context
interface ThemeContextType {
  currentTheme: ArtoTheme;
  setTheme: (theme: ArtoTheme) => void;
  currentChatTheme: ThemeName;
  setChatTheme: (themeName: ThemeName) => void;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Props for the ThemeProvider component
interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ArtoTheme;
  initialChatTheme?: ThemeName;
}

// ThemeProvider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  initialTheme = artoTheme,
  initialChatTheme = 'artotheme'
}) => {
  const [currentTheme, setCurrentTheme] = useState<ArtoTheme>(initialTheme);
  const [currentChatTheme, setCurrentChatTheme] = useState<ThemeName>(initialChatTheme);

  const setTheme = (theme: ArtoTheme) => {
    setCurrentTheme(theme);
  };

  const setChatTheme = (themeName: ThemeName) => {
    setCurrentChatTheme(themeName);
  };

  return (
    <ThemeContext.Provider value={{ 
      currentTheme, 
      setTheme, 
      currentChatTheme, 
      setChatTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
