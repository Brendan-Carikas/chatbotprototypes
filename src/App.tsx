import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import ChatDialog from './components/ChatDialog';
import Welcome from './Welcome';
import WelcomeStyle2 from './WelcomeStyle2';
import CaptureDetails from './CaptureDetails';
import CaptureDetailsV2 from './CaptureDetailsV2';
import ChatFeedDrawer from './pages/ChatFeedDrawer';
import Spec from './pages/Spec';
import { ThemeProvider } from './contexts/ThemeContext';
import { artoTheme } from './theme/arto';
import Navigation from './components/Navigation';
import ChatDialogSuggestions from './components/ChatDialogSuggestions';
import ChatSuggestionsCouncil from './components/ChatSuggestionsCouncil';

function OriginalApp() {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <div className="min-h-screen w-full">
      {isOpen && <ChatDialog onClose={() => setIsOpen(false)} />}
    </div>
  );
}

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <ThemeProvider initialTheme={artoTheme} initialChatTheme="artotheme">
      <HashRouter>
        <div className="flex flex-col min-h-screen">
          <Navigation isOpen={isNavOpen} onToggle={handleNavToggle} />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/welcome-style2" element={<WelcomeStyle2 />} />
              <Route path="/original" element={<OriginalApp />} />
              <Route path="/capture" element={<CaptureDetails />} />
              <Route path="/capture-v2" element={<CaptureDetailsV2 />} />
              <Route path="/spec" element={<Spec />} />
              <Route path="/" element={<Navigate to="/welcome" replace />} />
              <Route path="/chat-feedback" element={<ChatFeedDrawer />} />
              <Route path="/suggestions" element={<ChatDialogSuggestions />} />
              <Route path="/council" element={<ChatSuggestionsCouncil />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
