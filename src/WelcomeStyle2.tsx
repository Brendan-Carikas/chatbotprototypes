import React from 'react';
import ChatDialogWelcomeStyle2 from './components/ChatDialogWelcomeStyle2';

function WelcomeStyle2() {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="min-h-screen w-full">
      <div className="p-8">
        
      </div>
      {isOpen && <ChatDialogWelcomeStyle2 onClose={() => setIsOpen(false)} />}
    </div>
  );
}

export default WelcomeStyle2;
