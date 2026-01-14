"use client"

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { EducationalOptionsBtnData } from "@/data/EducationalVideo";
import { CiStopwatch } from "react-icons/ci";
import { SessionVideo } from "@/lib/api/sessionVideoApi";

interface UploadProps {
    videos: SessionVideo[];
    onEdit: (index: number) => void;
    onDelete: (index: number) => void;
    searchTerm: string;
    onSelectCard: (index: number) => void;
}

const Upload: React.FC<UploadProps> = ({ videos, onEdit, onDelete, searchTerm, onSelectCard }) => {
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

    const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';


    return (
        <div className="mt-[40px]">
            {filteredVideos.length === 0 ? (
                <p className="text-[#11401C] font-semibold text-center">No Upload Video Available.</p>
            ) : (
                <div className="grid grid-cols-5 gap-4">
                    {filteredVideos.map((video, cardIndex) => (
                        <div key={video._id} className="border border-[#B1A9A9] rounded-lg cursor-pointer flex flex-col" onClick={() => onSelectCard(cardIndex)}>
                            <div className="relative">
                                {video.thumbnailUrl ? (
                                    <Image
                                        src={video.thumbnailUrl}
                                        alt={video.title}
                                        width={300}
                                        height={169}
                                        className="w-full h-[169px] rounded-tl-lg rounded-tr-lg object-cover"
                                    />
                                ) : (
                                    <video
                                        src={video.videoUrl.startsWith('http') ? video.videoUrl : `${apiUrl}${video.videoUrl}`}
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
                                    <h3 className="text-[#11401C] font-semibold line-clamp-2 flex-1 min-w-0">{video.title}</h3>
                                    <div className="relative shrink-0" ref={(el) => {dropdownRefs.current[cardIndex] = el}}>
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
                                    <p className="text-[#4D4D4D] font-normal text-[12px] leading-4 line-clamp-2">{video.description || ''}</p>
                                </div>
                                <div className="flex items-center flex-wrap gap-2 mb-2">
                                    {video.symptoms && video.symptoms.map((symptom, index) => (
                                        <div key={index} className="border border-[#14A155] rounded-full px-[12px] py-[4px] text-[#333333] font-normal text-[12px]">
                                            {symptom}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center gap-2 mt-auto">
                                    <CiStopwatch className="text-[#B1A9A9]" />
                                    <p className="text-[#11401C] font-medium text-[12px]">
                                        {(() => {
                                            const created = new Date(video.createdAt);
                                            const now = new Date();
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

export default Upload;
