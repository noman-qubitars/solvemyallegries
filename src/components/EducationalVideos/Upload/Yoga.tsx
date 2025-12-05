"use client"

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { CiStopwatch } from "react-icons/ci";
import { EducationalOptionsBtnData } from "@/data/EducationalVideo";
import { EducationalVideo } from "@/lib/api/educationalVideoApi";

type YogaProps = {
    videos: EducationalVideo[];
    index: number | null;
    goBack: () => void;
    onEdit: (index: number) => void;
    onDelete: (index: number) => void;
};

const Yoga: React.FC<YogaProps> = ({ videos, index, goBack, onEdit, onDelete }) => {
    if (index === null || !videos[index]) {
        return <button onClick={goBack} className="flex items-center gap-2 cursor-pointer"><MdKeyboardArrowLeft />Back</button>;
    }

    const currentVideo = videos[index];
    const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
    const [mainVideoDropdownOpen, setMainVideoDropdownOpen] = useState(false);
    const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
    const mainVideoDropdownRef = useRef<HTMLDivElement | null>(null);

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
        setMainVideoDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (
                openDropdownIndex !== null &&
                dropdownRefs.current[openDropdownIndex] &&
                !dropdownRefs.current[openDropdownIndex]?.contains(target)
            ) {
                setOpenDropdownIndex(null);
            }
            if (
                mainVideoDropdownOpen &&
                mainVideoDropdownRef.current &&
                !mainVideoDropdownRef.current.contains(target)
            ) {
                setMainVideoDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openDropdownIndex, mainVideoDropdownOpen]);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const otherVideos = videos.filter((_, i) => i !== index);

    return (
        <div className="px-[24px] mt-[40px]">
            <button onClick={goBack} className="flex items-center gap-2 cursor-pointer"><MdKeyboardArrowLeft />Back</button>
            <div className="flex gap-2 mt-4">
                <div className="w-[80%]">
                    <video controls src={`${apiUrl}${currentVideo.videoUrl}`} className="w-full h-[500px] object-contain bg-black" />
                    <div className="flex items-center justify-between mt-4">
                        <h2 className="text-[32px] font-medium text-[#11401C]">{currentVideo.title}</h2>
                        <div className="flex items-center gap-2">
                            <CiStopwatch className="text-[#B1A9A9]" />
                            <p className="text-[#11401C] font-medium text-[18px]">
                                {(() => {
                                    const created = new Date(currentVideo.createdAt);
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
                            <div className="relative" ref={mainVideoDropdownRef}>
                                <HiOutlineDotsVertical className="text-[#11401C] cursor-pointer" onClick={(e) => {
                                    e.stopPropagation();
                                    setMainVideoDropdownOpen(prev => !prev);
                                }} />
                                {mainVideoDropdownOpen && (
                                    <ul className="absolute z-10 mt-1 -left-[120px] w-[127px] bg-white border border-gray-300 rounded-md shadow-md">
                                        {EducationalOptionsBtnData.map((lang, optionIndex) => (
                                            <li
                                                key={optionIndex}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSelect(lang.label, index);
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
                    </div>
                    <p className="text-[#1C1C1C] font-normal text-[14px]">{currentVideo.description}</p>
                </div>
                <div className="w-[20%]">
                    <div className="grid grid-cols-1 gap-2">
                        {otherVideos.slice(0, 2).map((video, idx) => {
                            const originalIndex = videos.findIndex(v => v._id === video._id);
                            return (
                                <div key={video._id} className="border border-[#B1A9A9] rounded-lg cursor-pointer">
                                    <div className="relative">
                                        <video src={`${apiUrl}${video.videoUrl}`} className="w-full h-[169px] rounded-tl-lg rounded-tr-lg overflow-hidden block object-cover" preload="metadata" />
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <Image src="/images/Educational/play.svg" alt="play" width={26} height={26} />
                                        </div>
                                    </div>
                                    <div className="px-[8px] py-[8px] space-y-2">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-[#11401C] font-semibold">{video.title}</h3>
                                            <div className="relative" ref={(el) => { dropdownRefs.current[idx] = el }}>
                                                <HiOutlineDotsVertical className="text-[#1C1C1C] cursor-pointer" onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleDropdown(idx);
                                                }} />
                                                {openDropdownIndex === idx && (
                                                    <ul className="absolute z-10 mt-1 -left-[120px] w-[127px] bg-white border border-gray-300 rounded-md shadow-md">
                                                        {EducationalOptionsBtnData.map((lang, optionIndex) => (
                                                            <li
                                                                key={optionIndex}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleSelect(lang.label, originalIndex);
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
                                        <p className="text-[#4D4D4D] font-normal text-[12px]">{video.description}</p>
                                        <div className="flex items-center gap-2">
                                            <CiStopwatch className="text-[#B1A9A9]" />
                                            <p className="text-[#11401C] font-medium text-[12px]">
                                                {(() => {
                                                    const created = new Date(video.createdAt);
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
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Yoga;
