"use client"

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import BreadCrum from "./BreadCrum";
import { JournalsAnalysisData, JournalModalData } from "@/data/JournalsAnalysis";
import { JournalData as initialData } from "@/data/JournalsAnalysis";
import JournalModal from "./JournalModal";
import { AiOutlineEye } from 'react-icons/ai';
import { MdOutlineKeyboardDoubleArrowLeft, MdKeyboardArrowLeft, MdOutlineKeyboardDoubleArrowRight, MdKeyboardArrowRight } from 'react-icons/md';


const JournalsAnalysis: React.FC = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
    const bgColors = ["bg-[#FFF3D6]", "bg-[#FFDED1]"];
    const [selectedRows, setSelectedRows] = useState<string[]>([])
    const [data, setData] = useState(initialData);
    const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [viewmodalOpen, setViewModalOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const filteredData = data
        .filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(user =>
            selectedFilter
                ? user.status.toLowerCase().includes(selectedFilter.toLowerCase())
                : true
        );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const itemsPerPageOptions = [10, 20, 30, 50];

    const toggleCheckbox = (email: string) => {
        setSelectedRows((prev) =>
            prev.includes(email)
                ? prev.filter((item) => item !== email)
                : [...prev, email]
        )
    }

    const toggleAllCheckboxes = () => {
        if (selectedRows.length === data.length) {
            setSelectedRows([])
        } else {
            setSelectedRows(data.map((user) => user.name))
        }
    }

    const toggleDropdown = (index: number) => {
        setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest(`[data-dropdown-index="${openDropdownIndex}"]`)) {
                setOpenDropdownIndex(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openDropdownIndex]);

    const handleView = (index: number) => {
        const actualIndex = startIndex + index;
        setSelectedIndex(actualIndex);
        setViewModalOpen(true);
        setOpenDropdownIndex(null);
    };


    return (
        <div className="">
            <h1 className="text-[#11401C] font-semibold text-[24px]">Journals Analysis</h1>
            <p className="text-[#646464] font-medium text-[14px]">Monitor user-submitted journals, detect symptom patterns, and track feedback over time to personalize insights.</p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">
                {JournalsAnalysisData.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white p-4 rounded-[14px] shadow-md flex flex-col gap-2"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="font-medium sm:w-[10rem] md:w-auto lg:w-[10rem] text-[#636466]">{item.name}</h3>
                            <div className={`px-[14px] py-[18px] h-[60px] flex items-center justify-center rounded-[23px] ${bgColors[index]}`}>
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={32}
                                    height={24}
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        <h1 className="text-[28px] font-semibold text-[#202224]">{item.number}</h1>
                        <p className="font-normal text-[#606060]">{item.text}</p>
                    </div>
                ))}
            </div>
            <p className="mt-4 text-[#11401C] font-semibold text-[24px]">Journal Log</p>
            <div className="mt-4">
                <BreadCrum onSearch={setSearchTerm} setSelectedFilter={setSelectedFilter} selectedFilter={selectedFilter} />
            </div>
            <div className="relative mt-4">
                <div className="overflow-x-auto rounded-lg border border-[#CCCCCC]">
                    <table className="min-w-full text-sm text-center">
                        <thead className="text-[#484C52] font-medium bg-white border-b border-[#CCCCCC]">
                            <tr>
                                <th className="px-4 py-3">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.length === data.length}
                                            onChange={toggleAllCheckboxes}
                                            className="peer hidden"
                                        />
                                        <div className="w-4 h-4 rounded border border-[#828282] bg-white flex items-center justify-center peer-checked:border-[#21BA45] peer-checked:bg-[#21BA45]">
                                            <Image src="/images/User/tick.svg" alt="check" width={12} height={7} />
                                        </div>
                                    </label>
                                </th>
                                <th className="px-4 py-3 whitespace-nowrap">Date</th>
                                <th className="px-4 py-3 whitespace-nowrap">User Name</th>
                                <th className="px-4 py-3 whitespace-nowrap">Session Day</th>
                                <th className="px-4 py-3 whitespace-nowrap">Feedback Summary</th>
                                <th className="px-4 py-3 whitespace-nowrap">Symptom Mentioned</th>
                                <th className="px-4 py-3 whitespace-nowrap">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-[#CCCCCC]">
                            {filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center text-[#222222] font-medium py-2">
                                        No Data Available
                                    </td>
                                </tr>
                            ) : (
                                currentItems.map((user, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-4">
                                            <label className="inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.includes(user.name)}
                                                    onChange={() => toggleCheckbox(user.name)}
                                                    className="peer hidden"
                                                />
                                                <div className="w-4 h-4 rounded border border-[#828282] bg-white flex items-center justify-center peer-checked:border-[#21BA45] peer-checked:bg-[#21BA45]">
                                                    <Image src="/images/User/tick.svg" alt="check" width={12} height={7} />
                                                </div>
                                            </label>
                                        </td>
                                        <td className="px-4 py-4 text-[#484C52] font-medium text-[14px] whitespace-nowrap">{user.date}</td>
                                        <td className="px-4 py-4 text-[#484C52] font-medium text-[14px] whitespace-nowrap">{user.name}</td>
                                        <td className="px-4 py-4 text-[#484C52] font-medium text-[14px] whitespace-nowrap">{user.session}</td>
                                        <td className="px-4 py-4 text-[#484C52] font-medium text-[14px] whitespace-nowrap">{user.feedback}</td>
                                        <td className="px-4 py-4 text-[#484C52] font-medium text-[14px] whitespace-nowrap">{user.symptom}</td>
                                        <td className="px-4 py-4 flex justify-center whitespace-nowrap">
                                            <div ref={dropdownRef} data-dropdown-index={index}>
                                                <button className="text-[#000000] cursor-pointer" onClick={() => toggleDropdown(index)}>
                                                    <user.icon className="w-5 h-5" />
                                                </button>
                                                {openDropdownIndex === index && (
                                                    <div className="absolute right-[3rem] mt-0 w-[84px] bg-white rounded-[6px] shadow-lg border border-[#B3B3B3] z-50">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleView(user.id);
                                                            }}
                                                            className="w-full cursor-pointer flex gap-2 pl-[12px] py-[12px] text-[#11401C] font-medium border-b border-[#B3B3B3]"
                                                        >
                                                            <AiOutlineEye className="w-4 h-4" /> View
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {filteredData.length > 10 && (
                <div className="flex flex-wrap md:flex-nowrap items-center justify-between mt-3 gap-4 px-[28px]">
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="text-[#484C52] font-medium text-[14px] border-r border-[#CCCCCC] pr-4">
                            Items per page
                            <select
                                className="ml-2 px-2 py-1 border border-[#E9E9E9] rounded-lg outline-none cursor-pointer"
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                            >
                                {itemsPerPageOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="text-[#313131] text-[14px] font-normal">
                            {startIndex + 1} - {Math.min(startIndex + itemsPerPage, data.length)} of {data.length} items
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-2">
                        <div className="text-[#313131] text-[14px] font-normal border-r border-[#A6A6A6] pr-3">
                            {currentPage} of {data.length} pages
                        </div>
                        <button
                            onClick={() => setCurrentPage(1)}
                            className="border border-[#E9E9E9] w-[40px] h-[36px] flex items-center justify-center cursor-pointer rounded-[4px] text-[#626262]"
                        >
                            <MdOutlineKeyboardDoubleArrowLeft />
                        </button>
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            className="border border-[#E9E9E9] w-[40px] h-[36px] flex items-center justify-center cursor-pointer rounded-[4px] text-[#626262]">
                            <MdKeyboardArrowLeft />
                        </button>
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                            className="border border-[#E9E9E9] w-[40px] h-[36px] flex items-center justify-center cursor-pointer rounded-[4px] text-[#626262]"
                        >
                            <MdKeyboardArrowRight />
                        </button>
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            className="border border-[#E9E9E9] w-[40px] h-[36px] flex items-center justify-center cursor-pointer rounded-[4px] text-[#626262]">
                            <MdOutlineKeyboardDoubleArrowRight />
                        </button>
                    </div>
                </div>
            )
            }

            {viewmodalOpen && selectedIndex !== null && (
                <JournalModal
                    isOpen={viewmodalOpen}
                    onClose={() => setViewModalOpen(false)}
                    data={JournalModalData[selectedIndex]}
                />
            )}
        </div>
    );
};

export default JournalsAnalysis;