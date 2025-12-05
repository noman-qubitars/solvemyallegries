"use client"

import { IoIosSearch } from "react-icons/io";

interface User {
  userId: string;
  name: string;
  email: string;
  lastMessage: string;
  lastMessageTime: string;
  isRead: boolean;
  unreadCount: number;
}

interface UserListProps {
  activeTab: 'All' | 'Unread';
  setActiveTab: (tab: 'All' | 'Unread') => void;
  search: string;
  setSearch: (value: string) => void;
  filteredUsers: User[];
  selectedUserId: string | null;
  messagesLoading: boolean;
  messagesCount: number;
  unreadCount: number;
  onUserClick: (userId: string) => void;
  formatDate: (dateString: string) => string;
  formatTime: (dateString: string) => string;
}

const UserList: React.FC<UserListProps> = ({
  activeTab,
  setActiveTab,
  search,
  setSearch,
  filteredUsers,
  selectedUserId,
  messagesLoading,
  messagesCount,
  unreadCount,
  onUserClick,
  formatDate,
  formatTime,
}) => {
  const tabButtonClass = (tab: string) =>
    `relative text-[#222222] cursor-pointer font-medium text-[12px] flex items-center gap-2 pb-1 ${activeTab === tab ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#222222]' : ''}`;

  return (
    <div className="w-full sm:w-[35%] lg:w-[34%] xl:w-[34%] 2xl:w-[29%] border border-[#B1A9A9] bg-white rounded-[8px] px-[10px] py-[22px]">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setActiveTab('All')} className={tabButtonClass('All')}>
          All
          <div className="w-[15px] h-[14px] bg-[#E2E2E2] text-[10px] rounded-[4px] flex items-center justify-center">
            {messagesCount}
          </div>
        </button>
        <button onClick={() => setActiveTab('Unread')} className={tabButtonClass('Unread')}>
          Unread
          <div className="w-[15px] h-[14px] bg-[#E2E2E2] text-[10px] rounded-[4px] flex items-center justify-center">
            {unreadCount}
          </div>
        </button>
      </div>
      <div className="flex items-center px-3 gap-2 border border-[#D5D5D5] rounded-full w-full h-[38px] focus-within:ring-1 focus-within:ring-[#11401C] focus-within:border-[#11401C] transition-all">
        <IoIosSearch size={20} className="text-[#8F9091]" />
        <input
          type="text"
          placeholder="Search chat"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full text-black outline-none bg-transparent placeholder:text-[#8F9091]"
        />
      </div>
      <div className='mt-4 overflow-y-auto scrollbar-hide h-[calc(100vh-313px)]'>
        {messagesLoading ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-[#717171]">Loading...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-[#717171]">No messages found</p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.userId}
              onClick={() => onUserClick(user.userId)}
              className={`mb-4 last:mb-0 cursor-pointer p-2 rounded-lg ${selectedUserId === user.userId ? 'bg-[#F5F6FA]' : ''}`}
            >
              <div className="flex gap-2 items-start">
                <div className="w-[22px] h-[22px] rounded-full bg-[#11401C] flex items-center justify-center text-white text-[10px] font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[14px] text-[#222222]">
                    {user.name}
                    <span className="text-[#666666] text-[12px]"> - {user.userId.slice(-6)}</span>
                  </p>
                  <div className='flex items-center justify-between'>
                    <p className="text-[12px] text-[#4D4D4D] truncate font-medium">{user.lastMessage}</p>
                    {user.unreadCount > 0 && (
                      <div className="w-[8px] h-[8px] rounded-full bg-[#11401C]"></div>
                    )}
                  </div>
                  <p className="text-[10px] text-[#999999] font-medium mt-1">
                    {formatDate(user.lastMessageTime)} • {formatTime(user.lastMessageTime)}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserList;

