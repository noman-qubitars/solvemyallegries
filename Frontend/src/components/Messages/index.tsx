"use client"

import { useState } from 'react';
import Image from 'next/image';
import BreadCrum from "./BreadCrum";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { messages, Message } from '@/data/Messages';
import { IoMdAttach } from "react-icons/io";


interface Messag {
  id: number;
  text: string;
  sender: "user" | "other";
  time: string;
}

const Messages: React.FC = () => {

  const [activeTab, setActiveTab] = useState<'All' | 'Read' | 'Unread'>('All');
  const [search, setSearch] = useState('');
  const [input, setInput] = useState("");
  const [messag, setMessag] = useState<Messag[]>([
    {
      id: 1,
      text: "Hello, Kathy here! 👋 How can I help you?",
      sender: "other",
      time: "8:21 AM",
    },
    {
      id: 2,
      text: "Hi Kathy, It's Ashley here. I want to discuss my symptoms with you.",
      sender: "user",
      time: "8:21 AM",
    },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Messag = {
      id: Date.now(),
      text: input,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessag((prev) => [...prev, newMessage]);
    setInput("");
  };

  let filteredMessages: Message[] = [];

  if (activeTab === 'All') {
    filteredMessages = [messages[0], messages[1]];
  } else if (activeTab === 'Read') {
    filteredMessages = [messages[2]];
  } else if (activeTab === 'Unread') {
    filteredMessages = [messages[3]];
  }

  if (search.trim() !== '') {
    filteredMessages = filteredMessages
      .map(section => ({
        ...section,
        all: section.all.filter(msg =>
          msg.name.toLowerCase().includes(search.toLowerCase())
        ),
      }))
      .filter(section => section.all.length > 0);
  }

  const tabButtonClass = (tab: string) =>
    `relative text-[#222222] cursor-pointer font-medium text-[12px] flex items-center gap-2 pb-1 ${activeTab === tab ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#222222]' : ''
    }`;

  return (
    <div className="">
      <BreadCrum />
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <div className="w-full sm:w-[35%] lg:w-[34%] xl:w-[34%] 2xl:w-[29%] border border-[#B1A9A9] bg-white rounded-[8px] px-[10px] py-[22px]">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setActiveTab('All')} className={tabButtonClass('All')}>
              All
              <div className="w-[15px] h-[14px] bg-[#E2E2E2] text-[10px] rounded-[4px] flex items-center justify-center">
                8
              </div>
            </button>
            <button onClick={() => setActiveTab('Read')} className={tabButtonClass('Read')}>
              Read
              <div className="w-[15px] h-[14px] bg-[#E2E2E2] text-[10px] rounded-[4px] flex items-center justify-center">
                5
              </div>
            </button>
            <button onClick={() => setActiveTab('Unread')} className={tabButtonClass('Unread')}>
              Unread
              <div className="w-[15px] h-[14px] bg-[#E2E2E2] text-[10px] rounded-[4px] flex items-center justify-center">
                3
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
            {filteredMessages.map((section) => (
              <div key={section.label} className="">
                <h4 className="text-[14px] font-normal text-[#717171] mb-2">{section.label}</h4>
                {section.all.map((msg: Message['all'][number], index) => (
                  <div key={index} className="mb-4 last:mb-0 cursor-pointer">
                    <div className="flex gap-2 items-start">
                      <Image src={msg.image} alt={msg.name} width={22} height={22} />
                      <div className="flex-1">
                        <p className="font-semibold text-[14px] text-[#222222]">{msg.name} <span className="text-[#666666] text-[12px]">- {msg.userId}</span></p>
                        <div className='flex items-center justify-between'>
                          <p className="text-[12px] text-[#4D4D4D] truncate font-medium">{msg.message}</p>
                          {msg.dot &&
                            <Image src={msg.dot} alt={msg.name} width={8} height={8} />
                          }
                        </div>
                        <p className="text-[10px] text-[#999999] font-medium mt-1">{msg.date} • {msg.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>
        <div className="w-full sm:w-[66%] lg:w-[67%] xl:w-[67%] 2xl:w-[72%] border border-[#B1A9A9] bg-white rounded-[8px] bg-white flex flex-col justify-between">
          <div className="flex items-center justify-between px-[24px] py-[17px] border-b border-[#AFB8CF]">
            <div className="flex items-center gap-2">
              <div className='relative'>
                <Image src="/images/Messages/7.svg" alt="Ashley" width={32} height={32} />
                <div className='bg-[linear-gradient(to_right,#11401C,#1F7332,#859B5B)] rounded-full w-[8px] h-[8px] absolute bottom-0 right-0' />
              </div>
              <p className="text-[14px] font-semibold text-[#636363]">Ashley</p>
            </div>
            <div className='flex items-center gap-3'>
              <div className='w-[34px] h-[34px] rounded-[8px] bg-white shadow-md flex items-center justify-center cursor-pointer'>
                <Image src="/images/Messages/star.svg" alt="Ashley" width={17} height={17} />
              </div>
              <div className='w-[34px] h-[34px] rounded-[8px] bg-white shadow-md flex items-center justify-center cursor-pointer'>
                <IoIosSearch className='text-[#1A1A1B]' />
              </div>
              <div className='w-[34px] h-[34px] rounded-[8px] bg-white shadow-md flex items-center justify-center cursor-pointer'>
                <HiOutlineDotsVertical className='text-[#1A1A1B]' />
              </div>
            </div>
          </div>
          {/* Chat Body */}
          <div className="flex-1 px-6 py-4 space-y-6 overflow-y-auto scrollbar-hide max-h-[25rem]">
            {messag.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-start" : "justify-end"} items-end`}>
                {msg.sender === "user" && (
                  <Image src="/images/Messages/1.svg" alt="Ashley" width={25} height={25} className="mr-2" />
                )}
                <div
                  className={`max-w-[60%] px-4 py-2 rounded-lg text-sm ${msg.sender === "user"
                    ? "bg-[#F3F4F6] rounded-bl-none"
                    : "bg-[#E6EFE6] rounded-br-none"
                    }`}
                >
                  {msg.text}
                  <div className="text-[10px] text-right text-gray-500 mt-1">{msg.time}</div>
                </div>
                {msg.sender === "other" && (
                  <Image src="/images/Messages/7.svg" alt="Ashley" width={32} height={32} className="ml-2" />
                )}
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="px-[48px] py-[23px] flex items-center gap-3">
            <button className='cursor-pointer'>
              <Image src="/images/Messages/emoji.svg" alt="Ashley" width={19} height={19} />
            </button>
            <div className="flex items-center px-3 gap-2 border border-[#D5D5D5] rounded-full w-full h-[38px] focus-within:ring-1 focus-within:ring-[#11401C] focus-within:border-[#11401C] transition-all">
              <IoMdAttach size={20} className='cursor-pointer' />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message here ..."
                className="w-full text-black outline-none bg-transparent placeholder:text-[#8F9091]"
              />
              <Image src="/images/Messages/mic.svg" alt="Ashley" width={16} height={20} className='cursor-pointer' />
            </div>
            <div className='flex items-center gap-3'>
              <div className='px-[8px] py-[8px] bg-[#11401C] rounded-full flex items-center justify-center cursor-pointer'>
                <Image src="/images/Messages/vector.svg" alt="Ashley" width={15} height={15} />
              </div>
              <button className="cursor-pointer" onClick={handleSend}>
                <Image src="/images/Messages/thumb.svg" alt="Ashley" width={21} height={19} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;