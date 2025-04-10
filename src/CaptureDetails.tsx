import React from 'react';
import ChatDialogContainer from './components/ChatDialogContainer';

function CaptureDetails() {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      {isOpen && <ChatDialogContainer onClose={() => setIsOpen(false)} />}
    </div>
  );
}

export default CaptureDetails;