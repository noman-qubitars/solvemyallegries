"use client"

import { useRef, useEffect } from 'react';
import { Message } from '@/lib/api/messageApi';
import MessageItem from './MessageItem';

interface User {
  id?: string;
  mongoId?: string;
  name: string;
}

interface MessageListProps {
  chatMessages: Message[];
  selectedUser: User | null | undefined;
  userMessagesLoading: boolean;
  formatTime: (dateString: string) => string;
  onContextMenu: (e: React.MouseEvent, message: Message) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  chatMessages,
  selectedUser,
  userMessagesLoading,
  formatTime,
  onContextMenu,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <div className="flex-1 px-6 py-4 space-y-6 overflow-y-auto scrollbar-hide max-h-[25rem] relative">
      {userMessagesLoading ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-[#717171]">Loading messages...</p>
        </div>
      ) : chatMessages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-[#717171]">No messages yet. Start the conversation!</p>
        </div>
      ) : (
        <>
          {chatMessages.map((msg) => (
            <MessageItem
              key={msg._id}
              msg={msg}
              selectedUser={selectedUser}
              formatTime={formatTime}
              onContextMenu={onContextMenu}
            />
          ))}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
};

export default MessageList;

