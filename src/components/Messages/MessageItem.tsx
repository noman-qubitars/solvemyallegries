"use client"

import { useState } from 'react';
import Image from 'next/image';
import { Message } from '@/lib/api/messageApi';

interface User {
  id?: string;
  mongoId?: string;
  name: string;
  image?: string;
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
  const [imageError, setImageError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const userImage = selectedUser?.image || null;

  return (
    <div
      className={`flex ${msg.sentBy === "user" ? "justify-start" : "justify-end"} items-end`}
      onContextMenu={msg.sentBy === "admin" ? (e) => onContextMenu(e, msg) : undefined}
    >
      {msg.sentBy === "user" && (
        <div className="relative w-[25px] h-[25px] rounded-full overflow-hidden shrink-0 bg-[#11401C] mr-2">
          {userImage && !avatarError ? (
            <Image
              src={userImage}
              alt={selectedUser?.name || 'User'}
              width={25}
              height={25}
              className="object-cover rounded-full"
              unoptimized
              onError={() => {
                console.error('Avatar failed to load:', userImage);
                setAvatarError(true);
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-[10px] font-semibold">
              {selectedUser?.name.charAt(0).toUpperCase() || 'U'}
            </div>
          )}
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
            <source src={`${apiBaseUrl}${msg.fileUrl}`} />
          </audio>
        ) : msg.fileUrl ? (
          <div>
            {msg.messageType === 'image' ? (
              <div className="relative">
                {imageError ? (
                  <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg text-gray-500 text-sm">
                    Failed to load image
                  </div>
                ) : (
                  <img
                    src={`${apiBaseUrl}${msg.fileUrl}`}
                    alt={msg.fileName || 'Image'}
                    className="max-w-full max-h-[300px] rounded-lg object-contain cursor-pointer hover:opacity-90 transition-opacity"
                    onError={() => setImageError(true)}
                    onClick={() => {
                      window.open(`${apiBaseUrl}${msg.fileUrl}`, '_blank');
                    }}
                  />
                )}
                {msg.content && (
                  <p className="mt-2 text-sm">{msg.content}</p>
                )}
              </div>
            ) : msg.messageType === 'pdf' ? (
              <div className="flex items-center gap-2">
                <span>📄</span>
                <a href={`${apiBaseUrl}${msg.fileUrl}`} download className="text-blue-600 underline">
                  {msg.fileName || 'Download PDF'}
                </a>
              </div>
            ) : (
              <a href={`${apiBaseUrl}${msg.fileUrl}`} download className="text-blue-600 underline">
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