"use client"

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { EducationalOptionsBtnData } from "@/data/EducationalVideo";
import { CiStopwatch } from "react-icons/ci";
import { EducationalVideo } from "@/lib/api/educationalVideoApi";
import { MdOutlineKeyboardDoubleArrowLeft, MdKeyboardArrowLeft, MdOutlineKeyboardDoubleArrowRight, MdKeyboardArrowRight } from 'react-icons/md';

type DraftsProps = {
    drafts: EducationalVideo[];
    onEdit: (index: number) => void;
    onDelete: (index: number) => void;
    searchTerm: string;
    onSelectCard: (index: number) => void;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const Drafts: React.FC<DraftsProps> = ({ drafts, onEdit, onDelete, searchTerm, onSelectCard, currentPage, totalPages, onPageChange }) => {
    const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
    const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

    const toggleDropdown = (index: number) => {
        setOpenDropdownIndex(prev => (prev === index ? null : index));
    };

    const handleSelect = (label: string, cardIndex: number) => {
        if (label === "Edit") {
            onEdit(cardIndex);
        } else if (label === "Delete") {
            onDelete(cardIndex);
        }
        setOpenDropdownIndex(null);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                openDropdownIndex !== null &&
                dropdownRefs.current[openDropdownIndex] &&
                !dropdownRefs.current[openDropdownIndex]?.contains(e.target as Node)
            ) {
                setOpenDropdownIndex(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openDropdownIndex]);

    const filteredDrafts = drafts.filter(draft =>
        draft.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

    return (
        <div className="mt-[40px]">
            {filteredDrafts.length === 0 ? (
                <p className="text-[#11401C] font-semibold text-center">No Drafts Video Available.</p>
            ) : (
                <>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredDrafts.map((draft, cardIndex) => (
                            <div key={draft._id} className="border border-[#B1A9A9] rounded-lg cursor-pointer flex flex-col" onClick={() => onSelectCard(cardIndex)}>
                                <div className="relative">
                                {draft.thumbnailUrl ? (
                                    <Image
                                        src={draft.thumbnailUrl.startsWith('http') ? draft.thumbnailUrl : `${apiUrl}${draft.thumbnailUrl}`}
                                        alt={draft.title}
                                        width={320}
                                        height={169}
                                        className="w-full h-[169px] rounded-tl-lg rounded-tr-lg object-cover"
                                        priority={cardIndex < 5}
                                        unoptimized
                                    />
                                ) : (
                                    <video
                                        src={draft.videoUrl.startsWith('http') ? draft.videoUrl : `${apiUrl}${draft.videoUrl}`}
                                        className="w-full h-[169px] rounded-tl-lg rounded-tr-lg object-cover"
                                        preload="metadata"
                                    />
                                )}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <Image src="/images/Educational/play.svg" alt="play" width={26} height={26} />
                                </div>
                            </div>
                            <div className="px-[8px] py-[8px] flex flex-col flex-1">
                                <div className="flex items-start justify-between mb-2 gap-2 h-[40px]">
                                    <h3 className="text-[#11401C] font-semibold line-clamp-2 flex-1 min-w-0">{draft.title}</h3>
                                    <div className="relative shrink-0" ref={(el) => { dropdownRefs.current[cardIndex] = el }}>
                                        <HiOutlineDotsVertical className="text-[#1C1C1C] cursor-pointer" onClick={(e) => {
                                            e.stopPropagation();
                                            toggleDropdown(cardIndex);
                                        }} />
                                        {openDropdownIndex === cardIndex && (
                                            <ul className="absolute z-10 mt-1 -left-[120px] w-[127px] bg-white border border-gray-300 rounded-md shadow-md">
                                                {EducationalOptionsBtnData.map((lang, optionIndex) => (
                                                    <li
                                                        key={optionIndex}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleSelect(lang.label, cardIndex);
                                                        }}
                                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center gap-2"
                                                    >
                                                        <Image src={lang.image} alt="img" width={20} height={20} />
                                                        {lang.label}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                                <div className="h-[32px] mb-2 flex items-start">
                                    <p className="text-[#4D4D4D] font-normal text-[12px] leading-4 line-clamp-2">{draft.description || ''}</p>
                                </div>
                                <div className="flex items-center gap-2 mt-auto">
                                    <CiStopwatch className="text-[#B1A9A9]" />
                                    <p className="text-[#11401C] font-medium text-[12px]">
                                        {(() => {
                                            const created = new Date(draft.createdAt);
                                            const now = new Date();
                                            
                                            // Compare dates at midnight UTC for accurate day calculation
                                            const createdDate = new Date(Date.UTC(created.getUTCFullYear(), created.getUTCMonth(), created.getUTCDate()));
                                            const nowDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
                                            const diffDays = Math.floor((nowDate.getTime() - createdDate.getTime()) / 86400000);
                                            
                                            if (diffDays === 0) return 'Today';
                                            if (diffDays === 1) return 'Yesterday';
                                            
                                            const diffMonths = Math.floor(diffDays / 30);
                                            const diffYears = Math.floor(diffDays / 365);
                                            
                                            if (diffYears > 0) return `${diffYears} ${diffYears === 1 ? 'Year' : 'Years'} ago`;
                                            if (diffMonths > 0) return `${diffMonths} ${diffMonths === 1 ? 'Month' : 'Months'} ago`;
                                            return `${diffDays} ${diffDays === 1 ? 'Day' : 'Days'} ago`;
                                        })()}
                                    </p>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <div className="flex justify-end items-center gap-2 mt-6">
                            <div className="text-[#313131] text-[14px] font-normal border-r border-[#A6A6A6] pr-3">
                                {currentPage} of {totalPages} pages
                            </div>
                            <button
                                onClick={() => onPageChange(1)}
                                className="border border-[#E9E9E9] w-[40px] h-[36px] flex items-center justify-center cursor-pointer rounded-[4px] text-[#626262] disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={currentPage === 1}
                            >
                                <MdOutlineKeyboardDoubleArrowLeft />
                            </button>
                            <button
                                onClick={() => onPageChange(currentPage - 1)}
                                className="border border-[#E9E9E9] w-[40px] h-[36px] flex items-center justify-center cursor-pointer rounded-[4px] text-[#626262] disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={currentPage === 1}
                            >
                                <MdKeyboardArrowLeft />
                            </button>
                            <button
                                onClick={() => onPageChange(currentPage + 1)}
                                className="border border-[#E9E9E9] w-[40px] h-[36px] flex items-center justify-center cursor-pointer rounded-[4px] text-[#626262] disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={currentPage === totalPages}
                            >
                                <MdKeyboardArrowRight />
                            </button>
                            <button
                                onClick={() => onPageChange(totalPages)}
                                className="border border-[#E9E9E9] w-[40px] h-[36px] flex items-center justify-center cursor-pointer rounded-[4px] text-[#626262] disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={currentPage === totalPages}
                            >
                                <MdOutlineKeyboardDoubleArrowRight />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Drafts;
