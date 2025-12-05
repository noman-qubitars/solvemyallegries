"use client"

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { EducationalOptionsBtnData } from "@/data/EducationalVideo";
import { IoEyeOutline } from "react-icons/io5";
import { CiStopwatch } from "react-icons/ci";
import { EducationalVideo } from "@/lib/api/educationalVideoApi";

type DraftsProps = {
    drafts: EducationalVideo[];
    onEdit: (index: number) => void;
    onDelete: (index: number) => void;
    searchTerm: string;
    onSelectCard: (index: number) => void;
};

const Drafts: React.FC<DraftsProps> = ({ drafts, onEdit, onDelete, searchTerm, onSelectCard }) => {
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
        <div className="px-[24px] mt-[40px]">
            {filteredDrafts.length === 0 ? (
                <p className="text-[#11401C] font-semibold text-center">No Drafts Video Available.</p>
            ) : (
                <div className="grid grid-cols-4 gap-4">
                    {filteredDrafts.map((draft, cardIndex) => (
                        <div key={draft._id} className="border border-[#B1A9A9] rounded-lg cursor-pointer" onClick={() => onSelectCard(cardIndex)}>
                                <div className="relative">
                                <video
                                    src={`${apiUrl}${draft.videoUrl}`}
                                    className="w-full h-[169px] rounded-tl-lg rounded-tr-lg object-cover"
                                    preload="metadata"
                                />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <Image src="/images/Educational/play.svg" alt="play" width={26} height={26} />
                                </div>
                            </div>
                            <div className="px-[8px] py-[8px] space-y-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[#11401C] font-semibold">{draft.title}</h3>
                                    <div className="relative" ref={(el) => { dropdownRefs.current[cardIndex] = el }}>
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
                                <p className="text-[#4D4D4D] font-normal text-[12px]">{draft.description}</p>
                                <div className="flex items-center gap-2">
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
            )}
        </div>
    );
};

export default Drafts;
