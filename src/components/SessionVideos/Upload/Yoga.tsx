"use client"

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoEyeOutline } from "react-icons/io5";
import { CiStopwatch } from "react-icons/ci";
import { MdOutlineWatchLater } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { EducationalOptionsBtnData } from "@/data/EducationalVideo";

interface FormDataType {
    title: string;
    description: string;
    videos: File[];
}

type YogaProps = {
    formData: FormDataType[] | null;
    index: number | null;
    goBack: () => void;
    onEdit: (index: number) => void;
    onDelete: (index: number) => void;
};

const Yoga: React.FC<YogaProps> = ({ formData, index, goBack, onEdit, onDelete }) => {
    if (!formData || index === null) return  <button onClick={goBack} className="flex items-center gap-2 cursor-pointer"><MdKeyboardArrowLeft />Back</button>;

    const currentForm = formData[index];
    if (!currentForm) return  <button onClick={goBack} className="flex items-center gap-2 cursor-pointer"><MdKeyboardArrowLeft />Back</button>;

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

    return (
        <div className="px-[24px] mt-[40px]">
            <button onClick={goBack} className="flex items-center gap-2 cursor-pointer"><MdKeyboardArrowLeft />Back</button>
            <div className="flex gap-2 mt-4">
                <div className="w-[80%]">
                    {currentForm.videos.length > 0 && (
                        <video controls src={URL.createObjectURL(currentForm.videos[0])} />
                    )}
                    <div className="flex items-center justify-between mt-4">
                        <h2 className="text-[32px] font-medium text-[#11401C]">{currentForm.title}</h2>
                        <div className="flex items-center gap-2">
                            <IoEyeOutline className="text-[#B1A9A9]" />
                            <p className="text-[#11401C] font-medium text-[18px]">30K views</p>
                            <p className="text-[#B1A9A9] pb-2">.</p>
                            <CiStopwatch className="text-[#B1A9A9]" />
                            <p className="text-[#11401C] font-medium text-[18px]">1 Year ago</p>
                            <HiOutlineDotsVertical className="text-[#11401C]" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <MdOutlineWatchLater className="text-[#666666]" />
                        <p className="text-[#666666] font-normal text-[14px]">09:00AM</p>
                        <p className="text-[#666666] pb-2">.</p>
                        <CiCalendar className="text-[#666666]" />
                        <p className="text-[#666666] font-normal text-[14px]">May 29, 2025</p>
                    </div>
                    <p className="text-[#1C1C1C] font-normal text-[14px]">{currentForm.description}</p>
                </div>
                <div className="w-[20%]">
                    <div className="grid grid-cols-1 gap-2">
                        {currentForm.videos.slice(1).map((video, index) => (
                            <div key={index} className="border border-[#B1A9A9] rounded-lg cursor-pointer">
                                <div className="relative">
                                    <video controls src={URL.createObjectURL(video)} className="w-full h-[169px] rounded-tl-lg rounded-tr-lg overflow-hidden block" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Image src="/images/Educational/play.svg" alt="play" width={26} height={26} />
                                    </div>
                                    <div className="bg-white/40 absolute rounded-md p-1 right-2 bottom-2 text-red font-medium text-[14px]">
                                        06:00
                                    </div>
                                </div>
                                <div className="px-[8px] py-[8px] space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-[#11401C] font-semibold">{currentForm.title}</h3>
                                        <div className="relative" ref={(el) => { dropdownRefs.current[index] = el }}>
                                            <HiOutlineDotsVertical className="text-[#1C1C1C] cursor-pointer" onClick={(e) => {
                                                e.stopPropagation();
                                                toggleDropdown(index);
                                            }} />
                                            {openDropdownIndex === index && (
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
                                    <p className="text-[#4D4D4D] font-normal text-[12px]">{currentForm.description}</p>
                                    <div className="flex items-center gap-2">
                                        <IoEyeOutline className="text-[#B1A9A9]" />
                                        <p className="text-[#11401C] font-medium text-[12px]">30K views</p>
                                        <p className="text-[#B1A9A9] pb-2">.</p>
                                        <CiStopwatch className="text-[#B1A9A9]" />
                                        <p className="text-[#11401C] font-medium text-[12px]">1 Year ago</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Yoga;
