'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { TiTick } from 'react-icons/ti';
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { DailySession } from '@/lib/api/dailySessionApi';
import { useGetSessionByDateQuery } from '@/lib/api/dailySessionApi';

interface CalendarProps {
    userId: string;
    sessions: DailySession[];
}

const Calendar: React.FC<CalendarProps> = ({ userId, sessions }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    
    const { data: sessionData, isLoading: sessionLoading } = useGetSessionByDateQuery(
        { userId, date: selectedDate || '' },
        { skip: !selectedDate || !userId }
    );

    const completedDates = useMemo(() => {
        return new Set(sessions.map(session => {
            const date = new Date(session.date);
            const year = date.getUTCFullYear();
            const month = date.getUTCMonth();
            const day = date.getUTCDate();
            return `${year}-${month}-${day}`;
        }));
    }, [sessions]);

    const calendarDays = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        const lastDayOfWeek = lastDay.getDay();
        
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevYear = month === 0 ? year - 1 : year;
        const prevMonthLastDay = new Date(prevYear, prevMonth + 1, 0).getDate();
        
        const days: Array<{ day: number; isCurrentMonth: boolean; isPrevMonth?: boolean; isNextMonth?: boolean } | null> = [];
        
        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
            days.push({
                day: prevMonthLastDay - i,
                isCurrentMonth: false,
                isPrevMonth: true
            });
        }
        
        for (let day = 1; day <= daysInMonth; day++) {
            days.push({
                day,
                isCurrentMonth: true
            });
        }
        
        const remainingDaysInWeek = 6 - lastDayOfWeek;
        for (let day = 1; day <= remainingDaysInWeek; day++) {
            days.push({
                day,
                isCurrentMonth: false,
                isNextMonth: true
            });
        }
        
        return days;
    }, [currentDate]);

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const openModal = (day: number) => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const monthStr = String(month + 1).padStart(2, '0');
        const dayStr = String(day).padStart(2, '0');
        const dateStr = `${year}-${monthStr}-${dayStr}`;
        setSelectedDate(dateStr);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedDate(null);
    };

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const selectedSession = sessionData?.data;

    const getDayNumber = (dateStr: string | null): number | null => {
        if (!dateStr || sessions.length === 0) return null;
        
        const sortedSessions = [...sessions].sort((a, b) => 
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        
        const firstSessionDate = new Date(sortedSessions[0].date);
        const selectedDate = new Date(dateStr + 'T00:00:00.000Z');
        
        const diffTime = selectedDate.getTime() - firstSessionDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        return diffDays >= 0 ? diffDays + 1 : null;
    };

    return (
        <div>
            <h2 className="text-[#11401C] font-semibold text-[20px] mb-2">Sessions Completed</h2>
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={goToPreviousMonth}
                    className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                >
                    <MdKeyboardArrowLeft className="w-5 h-5 text-[#11401C]" />
                </button>
                <h3 className="text-[#11401C] font-semibold text-[16px]">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <button
                    onClick={goToNextMonth}
                    className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                >
                    <MdKeyboardArrowRight className="w-5 h-5 text-[#11401C]" />
                </button>
            </div>
            <div className="grid grid-cols-7 gap-2 mb-2">
                {weekDays.map((day) => (
                    <div key={day} className="text-center text-[#717171] font-medium text-[12px]">
                        {day}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-2 relative">
                {calendarDays.map((dayInfo, index) => {
                    if (dayInfo === null) {
                        return <div key={`empty-${index}`} className="w-10 h-10" />;
                    }
                    
                    const { day, isCurrentMonth } = dayInfo;
                    const year = currentDate.getFullYear();
                    const month = currentDate.getMonth();
                    const dateKey = `${year}-${month}-${day}`;
                    const completed = isCurrentMonth && completedDates.has(dateKey);
                    const isClickable = completed;
                    
                    if (!isCurrentMonth) {
                        return (
                            <div
                                key={`${dayInfo.isPrevMonth ? 'prev' : 'next'}-${day}-${index}`}
                                className="w-10 h-10 flex items-center justify-center rounded-full font-medium text-[14px] text-gray-300"
                            >
                                {day}
                            </div>
                        );
                    }
                    
                    return (
                        <button
                            key={`current-${day}-${index}`}
                            onClick={() => isClickable && openModal(day)}
                            disabled={!isClickable}
                            className={`w-10 h-10 flex items-center justify-center rounded-full font-medium text-[14px] relative transition-all duration-200 
                                    ${completed
                                    ? 'bg-gradient-to-r from-[#11401C] to-[#859B5B] text-white cursor-pointer'
                                    : 'text-[#11401C] cursor-not-allowed opacity-60'
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
                    <div className="bg-white p-4 rounded-lg max-w-lg w-full mx-4 shadow-lg overflow-x-hidden overflow-y-auto max-h-[85vh] scrollbar-hide">
                        <div className="flex items-center justify-between">
                            <div className="text-[#11401C] font-semibold text-[24px] mb-2">
                                {selectedDate ? `Day ${getDayNumber(selectedDate) || 'N/A'}` : 'Session Details'}
                            </div>
                            <IoCloseCircleOutline className="w-6 h-6 text-[#11401C] cursor-pointer" onClick={closeModal} />
                        </div>
                        {sessionLoading ? (
                            <div className="text-center py-8">
                                <p className="text-[#717171] font-medium">Loading session data...</p>
                            </div>
                        ) : selectedSession && selectedSession.answers.length > 0 ? (
                            <div className="space-y-3 mt-4">
                                {selectedSession.answers.map((answer, index) => {
                                    const isRating = answer.question?.questionType === 'rating';
                                    const ratingValue = typeof answer.answer === 'number' ? answer.answer : null;
                                    
                                    const getRatingColor = (value: number | null): string => {
                                        if (value === null) return 'text-[#717171]';
                                        if (value < 3) return 'text-red-600';
                                        if (value >= 5 && value < 7) return 'text-gray-500';
                                        if (value >= 7 && value <= 10) return 'text-[#11401C]';
                                        return 'text-[#717171]';
                                    };
                                    
                                    const displayAnswer = () => {
                                        if (isRating && ratingValue !== null) {
                                            return ratingValue;
                                        }
                                        if (Array.isArray(answer.answer)) {
                                            return answer.answer.join(', ');
                                        }
                                        // Convert all non-rating answers to string
                                        return String(answer.answer);
                                    };
                                    
                                    return (
                                        <div key={index} className="space-y-2">
                                            <p className='text-[#11401C] font-semibold'>
                                                {answer.question?.questionText || `Question ${index + 1}`}
                                            </p>
                                            <div className='flex items-center gap-2'>
                                                <p className='text-[#484C52] font-semibold underline'>Response:</p>
                                                <p className={`font-medium ${isRating ? getRatingColor(ratingValue) : 'text-[#717171]'}`}>
                                                    {displayAnswer()}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                                {selectedSession.feedback && (
                                    <div className="pt-4 border-t border-[#EAEAEA]">
                                        <p className='text-[#11401C] font-semibold'>Additional Feedback:</p>
                                        <p className='text-[#717171] font-medium mt-2'>{selectedSession.feedback}</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-[#717171] font-medium">No session data available for this date</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;