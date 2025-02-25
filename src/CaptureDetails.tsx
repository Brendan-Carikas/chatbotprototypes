import React from 'react';
import ChatDialogCapture from './components/ChatDialogCapture';

function CaptureDetails() {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      {isOpen && <ChatDialogCapture onClose={() => setIsOpen(false)} />}
    </div>
  );
}

export default CaptureDetails;