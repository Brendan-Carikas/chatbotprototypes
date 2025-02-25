import React from 'react';
import ChatDialogCaptureV2 from './components/ChatDialogCaptureV2.tsx';

function CaptureDetailsV2() {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      {isOpen && <ChatDialogCaptureV2 onClose={() => setIsOpen(false)} />}
    </div>
  );
}

export default CaptureDetailsV2;