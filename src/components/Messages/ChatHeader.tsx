"use client"

import { useState } from 'react';
import Image from 'next/image';
import { IoIosSearch } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";

interface User {
  id?: string;
  mongoId?: string;
  name: string;
  image?: string;
}

interface ChatHeaderProps {
  selectedUser: User | null | undefined;
  showDeleteChatMenu: boolean;
  setShowDeleteChatMenu: (show: boolean) => void;
  onDeleteChat: () => void;
  deleteMenuRef: React.RefObject<HTMLDivElement | null>;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  selectedUser,
  showDeleteChatMenu,
  setShowDeleteChatMenu,
  onDeleteChat,
  deleteMenuRef,
}) => {
  const [imageError, setImageError] = useState(false);
  const userImage = selectedUser?.image || null;

  return (
    <div className="flex items-center justify-between px-[24px] py-[17px] border-b border-[#AFB8CF]">
      <div className="flex items-center gap-2">
        {selectedUser ? (
          <>
            <div className='relative'>
              <div className="relative w-[32px] h-[32px] rounded-full overflow-hidden bg-[#11401C]">
                {userImage && !imageError ? (
                  <Image
                    src={userImage}
                    alt={selectedUser.name}
                    width={32}
                    height={32}
                    className="object-cover rounded-full"
                    unoptimized
                    onError={() => {
                      console.error('Image failed to load:', userImage);
                      setImageError(true);
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-[12px] font-semibold">
                    {selectedUser.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className='bg-[linear-gradient(to_right,#11401C,#1F7332,#859B5B)] rounded-full w-[8px] h-[8px] absolute bottom-0 right-0' />
            </div>
            <p className="text-[14px] font-semibold text-[#636363]">{selectedUser.name}</p>
          </>
        ) : (
          <p className="text-[14px] font-semibold text-[#636363]">Select a user to start chatting</p>
        )}
      </div>
      <div className='flex items-center gap-3 relative'>
        <div className='w-[34px] h-[34px] rounded-[8px] bg-white shadow-md flex items-center justify-center cursor-pointer'>
          <Image src="/images/Messages/star.svg" alt="Star" width={17} height={17} />
        </div>
        <div className='w-[34px] h-[34px] rounded-[8px] bg-white shadow-md flex items-center justify-center cursor-pointer'>
          <IoIosSearch className='text-[#1A1A1B]' />
        </div>
        <div className='w-[34px] h-[34px] rounded-[8px] bg-white shadow-md flex items-center justify-center cursor-pointer relative' ref={deleteMenuRef}>
          <HiOutlineDotsVertical 
            className='text-[#1A1A1B]' 
            onClick={() => setShowDeleteChatMenu(!showDeleteChatMenu)}
          />
          {showDeleteChatMenu && (
            <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[150px]">
              <button
                onClick={onDeleteChat}
                className="w-full px-4 py-2 cursor-pointer text-left text-sm text-red-600 hover:bg-gray-100 rounded-lg"
              >
                Delete Chat
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;