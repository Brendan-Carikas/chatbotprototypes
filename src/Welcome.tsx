import React from 'react';
import ChatDialogWelcome from './components/ChatDialogWelcome';

function Welcome() {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="min-h-screen w-full">
      <div className="p-8">
        
      </div>
      {isOpen && <ChatDialogWelcome onClose={() => setIsOpen(false)} />}
    </div>
  );
}

export default Welcome;
