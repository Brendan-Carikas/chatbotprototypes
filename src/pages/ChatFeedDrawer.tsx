import React from 'react';
import ChatDialogDrawer from '../components/ChatDialogDrawer';
import { ChatProvider } from '../contexts/ChatContext';

const ChatFeedDrawer: React.FC = () => {
  return (
    <div className="chat-feed-drawer">
      <ChatProvider>
        <ChatDialogDrawer />
      </ChatProvider>
    </div>
  );
};

export default ChatFeedDrawer;
