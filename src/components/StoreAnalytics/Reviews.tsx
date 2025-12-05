"use client"

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { StoreReviewsData as initialData } from "@/data/StoreAnalysis";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEye } from 'react-icons/ai';
import { IoClose } from "react-icons/io5";
import { MdOutlineKeyboardDoubleArrowLeft, MdKeyboardArrowLeft, MdOutlineKeyboardDoubleArrowRight, MdKeyboardArrowRight } from 'react-icons/md';

interface ReviewsProps {
    searchTerm: string;
    selectedFilter: string | null;
}

const Reviews: React.FC<ReviewsProps> = ({ searchTerm, selectedFilter }) => {

    const [data, setData] = useState(initialData);
    const [selectedRows, setSelectedRows] = useState<string[]>([])
    const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

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
            setSelectedRows(data.map((user) => user.id))
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

    const toggleBlockStatus = (id: string) => {
        setData(prevData =>
            prevData.map(user =>
                user.id === id
                    ? {
                        ...user,
                        status: user.status === "Pending" ? "Approved" : user.status === "Flagged" ? "Pending" : "Pending",
                        activity: "Just Now"
                    }
                    : user
            )
        );
        setOpenDropdownIndex(null);
    };

    return (
        <div className="">
            <div className="relative mt-4">
                <div className="overflow-x-auto rounded-lg border border-[#CCCCCC]">
                    <table className="min-w-full text-sm text-center">
                        <thead className="text-[#484C52] font-medium bg-[#F2F2F2] border-b border-[#CCCCCC]">
                            <tr>
                                <th className="px-4 py-4">
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
                                <th className="px-4 py-4 text-left whitespace-nowrap">Product</th>
                                <th className="px-4 py-4 whitespace-nowrap">Reviewer</th>
                                <th className="px-4 py-4 whitespace-nowrap">Rating</th>
                                <th className="px-4 py-4 whitespace-nowrap">Review Snippet</th>
                                <th className="px-4 py-4 whitespace-nowrap">Date</th>
                                <th className="px-4 py-4 whitespace-nowrap">Status</th>
                                <th className="px-4 py-4 whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-[#CCCCCC]">
                            {filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center text-[#222222] font-medium py-2">
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
                                                    checked={selectedRows.includes(user.id)}
                                                    onChange={() => toggleCheckbox(user.id)}
                                                    className="peer hidden"
                                                />
                                                <div className="w-4 h-4 rounded border border-[#828282] bg-white flex items-center justify-center peer-checked:border-[#21BA45] peer-checked:bg-[#21BA45]">
                                                    <Image src="/images/User/tick.svg" alt="check" width={12} height={7} />
                                                </div>
                                            </label>
                                        </td>
                                        <td className="px-4 py-4 text-left text-[#484C52] font-medium text-[14px] whitespace-nowrap">{user.name}</td>
                                        <td className="px-4 py-4 text-[#484C52] font-medium text-[14px] whitespace-nowrap">{user.indentified}</td>
                                        <td className="px-4 py-4 flex items-center justify-center whitespace-nowrap"><Image src={user.rating} alt="check" width={83} height={14} /></td>
                                        <td className="px-4 py-4 text-[#484C52] font-medium text-[14px] whitespace-nowrap">{user.review}</td>
                                        <td className="px-4 py-4 text-[#484C52] font-medium text-[14px] whitespace-nowrap">{user.date}</td>
                                        <td className="px-4 py-4 flex justify-center whitespace-nowrap">
                                            <div
                                                className={`flex items-center gap-2 px-[22px] w-fit py-[10px] rounded-[12px] text-[14px] font-medium 
                                                        ${user.status === 'Pending'
                                                        ? 'bg-[#DB28281A] text-[#DB2828]'
                                                        : user.status === 'Approved'
                                                            ? 'bg-[#21BA451A] text-[#21BA45]'
                                                            : user.status === 'Flagged'
                                                                ? 'bg-[#FBBD081A] text-[#FBBD08]'
                                                                : 'bg-[#DB28281A] text-[#DB2828]'
                                                    }
                          `}
                                            >
                                                <div className="h-[8px] w-[8px] rounded-full bg-current"></div>
                                                {user.status}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            {/* testing */}
                                            <div ref={dropdownRef} data-dropdown-index={index} className="flex justify-center">
                                                <button className="text-[#000000] cursor-pointer" onClick={() => toggleDropdown(index)}>
                                                    <user.icon className="w-5 h-5" />
                                                </button>
                                                {openDropdownIndex === index && (
                                                    <div className="absolute right-[3.5rem] mt-4 w-fit bg-white rounded-[6px] shadow-lg border border-[#B3B3B3] z-50">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                toggleBlockStatus(user.id);
                                                            }}
                                                            className="w-[6.8rem] cursor-pointer flex items-center gap-2 px-[14px] py-[12px]"
                                                        >
                                                            {user.status === "Approved" ? (
                                                                <div className="text-[#11401C] font-medium flex gap-2 items-center">
                                                                    <AiOutlineEye className="w-4 h-4 text-[#11401C] font-medium" /> View
                                                                </div>
                                                            ) : user.status === "Pending" ? (
                                                                <div className="text-[#484C52] font-medium flex gap-2 items-center">
                                                                    <Image src="/images/Allergy/approve.svg" alt="img" width={13} height={10} /> Approve
                                                                </div>
                                                            ) : user.status === "Flagged" ? (
                                                                <div className="text-[#11401C] font-medium flex gap-2 items-center">
                                                                    <AiOutlineEye className="w-4 h-4 text-[#11401C] font-medium" /> View
                                                                </div>
                                                            ) : null
                                                            }
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                toggleBlockStatus(user.id);
                                                            }}
                                                            className="w-[6.8rem] cursor-pointer flex items-center gap-2 px-[14px] py-[12px] text-[#717171] font-medium border-t border-[#B3B3B3]"
                                                        >
                                                            {user.status === "Approved" ? (
                                                                <div className="text-[#DB2828] font-medium flex gap-2 items-center">
                                                                    <RiDeleteBinLine className="w-4 h-4" /> Delete
                                                                </div>
                                                            ) : user.status === "Pending" ? (
                                                                <div className="text-[#DB2828] font-medium flex gap-2 items-center">
                                                                    <IoClose className="w-4 h-4" /> Reject
                                                                </div>
                                                            ) : user.status === "Flagged" ? (
                                                                <div className="text-[#717171] font-medium flex gap-2 items-center">
                                                                    <Image src="/images/Allergy/re.svg" alt="img" width={13} height={18} /> Restore
                                                                </div>
                                                            ) : null
                                                            }
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
        </div>
    );
};

export default Reviews;