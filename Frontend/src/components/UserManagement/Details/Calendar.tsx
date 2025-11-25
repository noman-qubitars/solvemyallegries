'use client';

import { useState } from 'react';
import Image from 'next/image';
import { TiTick } from 'react-icons/ti';
import { UserManagementDetailModalData } from '@/data/UserManagement';
import { IoCloseCircleOutline } from "react-icons/io5";

const Calendar = () => {
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [completedSessions, setCompletedSessions] = useState<number[]>([]);

    const openModal = (day: number) => {
        setSelectedDay(day);
        if (!completedSessions.includes(day)) {
            setCompletedSessions((prev) => [...prev, day]);
        }
        setIsOpen(true);
    };

    const closeModal = () => setIsOpen(false);
    const totalDays = 42;

    return (
        <div>
            <h2 className="text-[#11401C] font-semibold text-[20px] mb-2">Sessions Completed</h2>
            <div className="grid grid-cols-7 gap-2 relative">
                {Array.from({ length: totalDays }, (_, i) => {
                    const day = i + 1;
                    const completed = completedSessions.includes(day);
                    return (
                        <button
                            key={day}
                            onClick={() => openModal(day)}
                            className={`w-10 h-10 cursor-pointer flex items-center justify-center rounded-full font-medium text-[14px] relative transition-all duration-200 
                                    ${completed
                                    ? 'bg-gradient-to-r from-[#11401C] to-[#859B5B] text-white'
                                    : 'text-[#859B5B]'
                                }`}
                        >
                            {day}
                            {completed && (
                                <TiTick className="w-4 h-4 absolute -top-1 -right-1 p-[2px] bg-[#11401C] text-white rounded-full" />
                            )}
                        </button>
                    );
                })}
            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-[#BABBBB]/40 bg-opacity-50 flex items-center justify-center z-20">
                    <div className="bg-white p-4 rounded-lg max-w-2xl shadow-lg overflow-x-hidden overflow-y-auto max-h-[85vh] scrollbar-hide">
                        <div className="flex items-center justify-between">
                            <div className="text-[#11401C] font-semibold text-[24px] mb-2">Day {selectedDay}</div>
                            <IoCloseCircleOutline className="w-6 h-6 text-[#11401C] cursor-pointer" onClick={closeModal} />
                        </div>
                        {UserManagementDetailModalData.map((item, index) => (
                            <div key={index} className="space-y-3 mt-4">
                                <p className='text-[#11401C] font-semibold'>{item.question}</p>
                                <div className='flex items-center gap-2'>
                                    <p className='text-[#484C52] font-semibold underline'>{item.response}</p>
                                    <p className='text-[#717171] font-medium'>{item.answer}</p>
                                </div>
                                <p className='text-[#11401C] font-semibold'>{item.questionone}</p>
                                <div className='flex gap-2'>
                                    <p className='text-[#484C52] font-semibold underline'>{item.response}</p>
                                    <div className="flex flex-col gap-2">
                                        {item.array.map((item, index) => (
                                            <div key={index} className='flex items-center gap-3'>
                                                <div className='flex items-center gap-1 flex-1'>
                                                    <p className={`font-bold ${index === 0 ? 'text-[#DB3B21]' : ''} ${index === 1 ? 'text-[#11401C]' : ''} ${index === 2 ? 'text-[#B1A9A9]' : ''}`}>{item.symptom}:</p>
                                                    <p className='text-[#717171] font-medium'>{item.title}</p>
                                                </div>
                                                <p className='text-[#717171] font-medium'>{item.rating}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <p className='text-[#11401C] font-semibold'>{item.description}</p>
                                <p className='text-[#484C52] font-semibold underline'>{item.response}</p>
                                <p className='text-[#717171] font-medium'>{item.ratingthree}</p>
                                <p className='text-[#11401C] font-semibold'>{item.questiontwo}</p>
                                <div className='flex gap-2'>
                                    <p className='text-[#484C52] font-semibold underline'>{item.response}</p>
                                    <div className='grid grid-cols-2 gap-x-[6rem] gap-y-2'>
                                        {item.arrayone.map((item, index) => (
                                            <p key={index} className='text-[#717171] font-medium'>{item.title}</p>
                                        ))}
                                    </div>
                                </div>
                                <p className='text-[#11401C] font-semibold'>{item.questionthree}</p>
                                <div className='flex gap-2'>
                                    <p className='text-[#484C52] font-semibold underline'>{item.response}</p>
                                    <div className='grid grid-cols-2 gap-x-[6rem]'>
                                        {item.arraytwo.map((item, index) => (
                                            <p key={index} className='text-[#717171] font-medium'>{item.title}</p>
                                        ))}
                                    </div>
                                </div>
                                <p className='text-[#11401C] font-semibold'>{item.questionfour}</p>
                                <div className='flex gap-2'>
                                    <p className='text-[#484C52] font-semibold underline'>{item.response}</p>
                                    <div className='grid grid-cols-2 gap-x-[18rem] gap-y-2'>
                                        {item.arraythree.map((item, index) => (
                                            <p key={index} className='text-[#717171] font-medium'>{item.title}</p>
                                        ))}
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-2'>
                                    <div className='flex flex-col gap-2'>
                                        <div className="border border-[#EAEAEA] flex items-center justify-between rounded-[6px] px-[8px] py-[6px]">
                                            <div className="text-[#717171] font-medium text-[14px]">image.jpg</div>
                                            <Image
                                                src="/images/User/delete.svg"
                                                alt="delete"
                                                width={20}
                                                height={20}
                                                className="cursor-pointer"
                                            />
                                        </div>
                                        <div className='flex items-center gap-2 text-[12px] font-normal text-[#717171]'>
                                            <div>
                                                March, 10, 2024,
                                            </div>
                                            <div>
                                                08:45AM
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <div className="border border-[#EAEAEA] flex items-center justify-between rounded-[6px] px-[8px] py-[6px]">
                                            <div className="text-[#717171] font-medium text-[14px]">image.jpg</div>
                                            <Image
                                                src="/images/User/delete.svg"
                                                alt="delete"
                                                width={20}
                                                height={20}
                                                className="cursor-pointer"
                                            />
                                        </div>
                                        <div className='flex items-center gap-2 text-[12px] font-normal text-[#717171]'>
                                            <div>
                                                March, 10, 2024,
                                            </div>
                                            <div>
                                                08:45AM
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;