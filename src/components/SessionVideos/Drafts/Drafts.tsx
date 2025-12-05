"use client"

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { EducationalOptionsBtnData } from "@/data/EducationalVideo";
import { IoEyeOutline } from "react-icons/io5";
import { CiStopwatch } from "react-icons/ci";

type Draft = {
    title: string;
    description: string;
    symptoms: string[];
    videos: File[];
};

type DraftsProps = {
    drafts: {
        title: string;
        description: string;
        symptoms: string[];
        videos: File[];
    }[];
    onEdit: (index: number) => void;
    onDelete: (index: number) => void;
    searchTerm: string;
    onSelectCard: (index: number, data: Draft) => void;
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

    const filteredData = drafts
        .filter(drafts =>
            drafts.title.toLowerCase().includes(searchTerm.toLowerCase())
        )


    return (
        <div className="px-[24px] mt-[40px]">
            {filteredData.length === 0 ? (
                <p className="text-[#11401C] font-semibold text-center">No Drats Video Available.</p>
            ) : (
                <div className="grid grid-cols-4 gap-4">
                    {filteredData.map((draft, cardIndex) => (
                        <div key={cardIndex} className="border border-[#B1A9A9] rounded-lg cursor-pointer" onClick={() => onSelectCard(cardIndex, draft)}>
                            <ul>
                                {Array.isArray(draft.videos) && draft.videos.length > 0 && (
                                    <div className="relative">
                                        <video
                                            controls
                                            src={URL.createObjectURL(draft.videos[0])}
                                            className="w-full h-[169px] rounded-tl-lg rounded-tr-lg"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Image src="/images/Educational/play.svg" alt="play" width={26} height={26} />
                                        </div>
                                        <div className="bg-white/40 absolute rounded-md p-1 right-2 bottom-2 text-red font-medium text-[14px]">
                                            06:00
                                        </div>
                                    </div>
                                )}
                            </ul>
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
                                    <IoEyeOutline className="text-[#B1A9A9]" />
                                    <p className="text-[#11401C] font-medium text-[12px]">30K views</p>
                                    <p className="text-[#B1A9A9] pb-2">.</p>
                                    <CiStopwatch className="text-[#B1A9A9]" />
                                    <p className="text-[#11401C] font-medium text-[12px]">1 Year ago</p>
                                </div>
                                <div className="flex items-center flex-wrap gap-2">
                                    {draft.symptoms.map((symptom, index) => (
                                        <div key={index} className="border border-[#14A155] rounded-full px-[12px] py-[4px]  text-[#333333] font-normal text-[12px]">
                                            {symptom}
                                        </div>
                                    ))}
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
