'use client';

import { useState, useMemo } from 'react';
import { TiTick } from 'react-icons/ti';
import { IoCloseCircleOutline } from "react-icons/io5";
import { DailySession } from '@/lib/api/dailySessionApi';
import { useGetSessionByDateQuery } from '@/lib/api/dailySessionApi';

interface CalendarProps {
    userId: string;
    sessions: DailySession[];
}

const Calendar: React.FC<CalendarProps> = ({ userId, sessions }) => {
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    
    // Map sessions to day numbers (1-42) based on their order
    const dayToSessionMap = useMemo(() => {
        const sortedSessions = [...sessions].sort((a, b) => 
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        
        const map = new Map<number, DailySession>();
        sortedSessions.forEach((session, index) => {
            const dayNumber = index + 1;
            if (dayNumber <= 42) {
                map.set(dayNumber, session);
            }
        });
        return map;
    }, [sessions]);

    // Get the selected session's date for the API call
    const selectedSession = selectedDay ? dayToSessionMap.get(selectedDay) : null;
    const selectedDate = selectedSession?.date || null;
    
    const { data: sessionData, isLoading: sessionLoading } = useGetSessionByDateQuery(
        { userId, date: selectedDate || '' },
        { skip: !selectedDate || !userId }
    );

    const openModal = (dayNumber: number) => {
        if (dayToSessionMap.has(dayNumber)) {
            setSelectedDay(dayNumber);
            setIsOpen(true);
        }
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedDay(null);
    };

    const displaySession = sessionData?.data || selectedSession;

    return (
        <div>
            <h2 className="text-[#11401C] font-semibold text-[20px] mb-4">Sessions Completed</h2>
            <div className="grid grid-cols-7 gap-3">
                {Array.from({ length: 42 }, (_, i) => {
                    const dayNumber = i + 1;
                    const isCompleted = dayToSessionMap.has(dayNumber);
                    const isClickable = isCompleted;
                    
                    return (
                        <button
                            key={dayNumber}
                            onClick={() => isClickable && openModal(dayNumber)}
                            disabled={!isClickable}
                            className={`relative flex items-center justify-center rounded-full font-medium text-[14px] transition-all duration-200 ${
                                isCompleted
                                    ? 'w-9 h-9 bg-linear-to-r from-[#11401C] to-[#859B5B] text-white cursor-pointer hover:opacity-90'
                                    : 'w-9 h-9 text-[#11401C] cursor-not-allowed opacity-60'
                            }`}
                        >
                            {dayNumber}
                            {isCompleted && (
                                <TiTick className="w-4 h-4 absolute -top-1 -right-1 p-[2px] bg-[#11401C] text-white rounded-full" />
                            )}
                        </button>
                    );
                })}
            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-[#BABBBB]/40 bg-opacity-50 flex items-center justify-center z-20">
                    <div className="bg-white p-4 rounded-lg max-w-lg w-full shadow-lg overflow-x-hidden overflow-y-auto max-h-[85vh] scrollbar-hide">
                        <div className="flex items-center justify-between">
                            <div className="text-[#11401C] font-semibold text-[24px]">
                                {selectedDay ? `Day ${selectedDay}` : 'Session Details'}
                            </div>
                            <IoCloseCircleOutline className="w-6 h-6 text-[#11401C] cursor-pointer" onClick={closeModal} />
                        </div>
                        {sessionLoading ? (
                            <div className="text-center py-8">
                                <p className="text-gray-50 font-medium">Loading session data...</p>
                            </div>
                        ) : displaySession && displaySession.answers.length > 0 ? (
                            <div className="space-y-3 mt-4">
                                {displaySession.answers.map((answer, index) => {
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
                                        return String(answer.answer);
                                    };
                                    
                                    return (
                                        <div key={index} className="space-y-2">
                                            <p className='text-[#11401C] font-semibold'>
                                                {answer.question?.questionText || `Question ${index + 1}`}
                                            </p>
                                            <div className='flex items-center gap-2'>
                                                <p className='text-[#484C52] font-semibold underline'>Response:</p>
                                                <p className={`font-medium ${isRating ? getRatingColor(ratingValue) : 'text-gray-50'}`}>
                                                    {displayAnswer()}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                                {displaySession.feedback && (
                                    <div className="pt-3 border-t border-gray-50">
                                        <p className='text-[#11401C] font-semibold'>Additional Feedback:</p>
                                        <p className='text-gray-50 font-medium mt-2'>{displaySession.feedback}</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-50 font-medium">No session data available for this day</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;