"use client"

import Image from 'next/image';
import { Message } from '@/lib/api/messageApi';

interface User {
  id?: string;
  mongoId?: string;
  name: string;
}

interface MessageItemProps {
  msg: Message;
  selectedUser: User | null | undefined;
  formatTime: (dateString: string) => string;
  onContextMenu: (e: React.MouseEvent, message: Message) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({
  msg,
  selectedUser,
  formatTime,
  onContextMenu,
}) => {
  return (
    <div 
      className={`flex ${msg.sentBy === "user" ? "justify-start" : "justify-end"} items-end`}
      onContextMenu={msg.sentBy === "admin" ? (e) => onContextMenu(e, msg) : undefined}
    >
      {msg.sentBy === "user" && (
        <div className="w-[25px] h-[25px] rounded-full bg-[#11401C] flex items-center justify-center text-white text-[10px] font-semibold mr-2">
          {selectedUser?.name.charAt(0).toUpperCase() || 'U'}
        </div>
      )}
      <div
        className={`max-w-[60%] px-4 py-2 rounded-lg text-sm ${msg.sentBy === "user"
          ? "bg-[#F3F4F6] rounded-bl-none"
          : "bg-[#E6EFE6] rounded-br-none"
          }`}
      >
        {msg.messageType === 'text' ? (
          msg.content
        ) : msg.messageType === 'voice' && msg.fileUrl ? (
          <audio controls className="max-w-full">
            <source src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}${msg.fileUrl}`} />
          </audio>
        ) : msg.fileUrl ? (
          <div>
            {msg.messageType === 'image' ? (
              <img src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}${msg.fileUrl}`} alt={msg.fileName} className="max-w-full rounded" />
            ) : msg.messageType === 'pdf' ? (
              <div className="flex items-center gap-2">
                <span>📄</span>
                <a href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}${msg.fileUrl}`} download className="text-blue-600 underline">
                  {msg.fileName || 'Download PDF'}
                </a>
              </div>
            ) : (
              <a href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}${msg.fileUrl}`} download className="text-blue-600 underline">
                {msg.fileName || 'Download file'}
              </a>
            )}
          </div>
        ) : (
          msg.content || 'File'
        )}
        <div className="text-[10px] text-right text-gray-500 mt-1">{formatTime(msg.createdAt)}</div>
      </div>
      {msg.sentBy === "admin" && (
        <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center ml-2 overflow-hidden">
          <Image src="/images/Header/user.svg" alt="Admin" width={32} height={32} className="object-cover" />
        </div>
      )}
    </div>
  );
};

export default MessageItem;

