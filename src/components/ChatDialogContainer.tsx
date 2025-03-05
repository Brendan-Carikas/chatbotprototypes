import React from 'react';
import ChatDialogCapture from './ChatDialogCapture';
import SalesDialog from './SalesDialog';
import TalkToUsConfirmation from './TalkToUsConfirmation';

interface ChatDialogContainerProps {
  onClose: () => void;
}

const ChatDialogContainer: React.FC<ChatDialogContainerProps> = ({ onClose }) => {
  const [showChatDialog, setShowChatDialog] = React.useState(true);
  const [showSalesDialog, setShowSalesDialog] = React.useState(false);
  const [showTalkToUsConfirmation, setShowTalkToUsConfirmation] = React.useState(false);
  const [submittedName, setSubmittedName] = React.useState('');

  const handleTalkToUsClick = () => {
    setShowChatDialog(false);
    setShowSalesDialog(true);
  };

  const handleSalesDialogSubmit = (name: string, email: string, phone: string) => {
    console.log('SalesDialog onSubmit called with:', { name, email, phone });
    
    // Save the submitted name
    setSubmittedName(name);
    
    // Hide SalesDialog and show TalkToUsConfirmation
    setShowSalesDialog(false);
    setShowTalkToUsConfirmation(true);
    
    // After 3 seconds, hide TalkToUsConfirmation and show ChatDialogCapture
    setTimeout(() => {
      setShowTalkToUsConfirmation(false);
      setShowChatDialog(true);
    }, 3000);
  };

  const handleSalesDialogClose = () => {
    setShowSalesDialog(false);
    setShowChatDialog(true);
  };

  return (
    <>
      {showChatDialog && (
        <ChatDialogCapture 
          onClose={onClose} 
          onTalkToUsClick={handleTalkToUsClick}
        />
      )}
      
      {showSalesDialog && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="w-full max-w-[448px] mx-auto">
            <SalesDialog
              onSubmit={handleSalesDialogSubmit}
              onClose={handleSalesDialogClose}
            />
          </div>
        </div>
      )}
      
      {showTalkToUsConfirmation && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="w-full max-w-[448px] mx-auto">
            <TalkToUsConfirmation
              name={submittedName}
              onClose={() => setShowTalkToUsConfirmation(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatDialogContainer;
