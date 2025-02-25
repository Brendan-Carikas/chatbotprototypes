import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ChatDialog from './components/ChatDialog';
import Welcome from './Welcome';
import WelcomeStyle2 from './WelcomeStyle2';
import CaptureDetails from './CaptureDetails';
import CaptureDetailsV2 from './CaptureDetailsV2';

function OriginalApp() {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <div className="min-h-screen w-full">
      {isOpen && <ChatDialog onClose={() => setIsOpen(false)} />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/welcome-style2" element={<WelcomeStyle2 />} />
        <Route path="/original" element={<OriginalApp />} />
        <Route path="/capture" element={<CaptureDetails />} />
        <Route path="/capture-v2" element={<CaptureDetailsV2 />} />
        <Route path="/" element={<Navigate to="/welcome" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;