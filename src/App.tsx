import React, { useState, useEffect } from 'react';
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

// Import authentication components
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import IDSLogin from './invauth/IDSLogin';

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

  // Handle authentication redirects for both GitHub Pages and Firebase hosting
  useEffect(() => {
    // Only run this check if we're not already on the login page
    const path = window.location.hash.replace('#', '');
    const isLoginPage = path === '/ids-login';
    const isAuthenticated = localStorage.getItem('authUser') === 'true';
    
    // If not on login page and not authenticated, redirect to login
    if (!isLoginPage && !isAuthenticated) {
      console.log('Not authenticated, redirecting to login page');
      window.location.hash = '#/ids-login';
    }
  }, []);

  return (
    <ThemeProvider initialTheme={artoTheme} initialChatTheme="artotheme">
      <HashRouter>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navigation isOpen={isNavOpen} onToggle={handleNavToggle} />
            <main className="flex-grow pt-16">
              <Routes>
                {/* Authentication Routes */}
                <Route path="/ids-login" element={<IDSLogin />} />
                
                {/* Protected Routes */}
                <Route path="/welcome" element={
                  <ProtectedRoute>
                    <Welcome />
                  </ProtectedRoute>
                } />
                <Route path="/welcome-style2" element={
                  <ProtectedRoute>
                    <WelcomeStyle2 />
                  </ProtectedRoute>
                } />
                <Route path="/original" element={
                  <ProtectedRoute>
                    <OriginalApp />
                  </ProtectedRoute>
                } />
                <Route path="/capture" element={
                  <ProtectedRoute>
                    <CaptureDetails />
                  </ProtectedRoute>
                } />
                <Route path="/capture-v2" element={
                  <ProtectedRoute>
                    <CaptureDetailsV2 />
                  </ProtectedRoute>
                } />
                <Route path="/spec" element={
                  <ProtectedRoute>
                    <Spec />
                  </ProtectedRoute>
                } />
                <Route path="/chat-feedback" element={
                  <ProtectedRoute>
                    <ChatFeedDrawer />
                  </ProtectedRoute>
                } />
                <Route path="/suggestions" element={
                  <ProtectedRoute>
                    <ChatDialogSuggestions />
                  </ProtectedRoute>
                } />
                <Route path="/council" element={
                  <ProtectedRoute>
                    <ChatSuggestionsCouncil />
                  </ProtectedRoute>
                } />
                
                {/* Catch all routes and redirect to login */}
                <Route path="/" element={<Navigate to="/ids-login" replace />} />
                <Route path="*" element={<Navigate to="/ids-login" replace />} />
              </Routes>
            </main>
          </div>
        </AuthProvider>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
