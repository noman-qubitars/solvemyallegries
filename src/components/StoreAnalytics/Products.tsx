"use client"

import { useState } from "react";
import Image from "next/image";
import { StoreAnalysisData as initialData } from "@/data/StoreAnalysis";
import { MdOutlineKeyboardDoubleArrowLeft, MdKeyboardArrowLeft, MdOutlineKeyboardDoubleArrowRight, MdKeyboardArrowRight } from 'react-icons/md';

interface ProductsProps {
    searchTerm: string;
}

const Products: React.FC<ProductsProps> = ({ searchTerm }) => {

    const [data, setData] = useState(initialData);
    const [selectedRows, setSelectedRows] = useState<string[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);

    const filteredData = data
        .filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const itemsPerPageOptions = [8, 16, 24, 32];

    return (
        <div className="mt-4">
            <div className={`${filteredData.length === 0 ? "" : "grid sm:grid-cols-2 lg:grid-cols-4 gap-8"}`}>
                {filteredData.length === 0 ? (
                    <div className="flex items-center justify-center text-center py-8 text-[#222222] font-medium">
                        No Data Available
                    </div>
                ) : (
                    currentItems.map((data, index) => (
                        <div key={index} className="shadow-md rounded-lg bg-white border-1 border-[#B1A9A9] cursor-pointer">
                            <Image src={data.image} alt="check" width={262} height={169} className="w-full rounded-tl-lg rounded-tr-lg" />
                            <div className="px-[10px] py-[8px] flex flex-col gap-1">
                                <div className="text-[#11401C] font-semibold text-[20px]">{data.name}</div>
                                <div className="text-[#1A1A1A] font-semibold text-[18px]">{data.price}</div>
                                <div className="text-[#4D4D4D] font-medium text-[24px]">{data.stock}</div>
                                <div className="text-[#4D4D4D] font-medium">{data.supplemts}</div>
                                <div className="flex justify-between mt-1">
                                    {data.btn.map((item, index) => (
                                        <button key={index} className={`px-[37px] py-[8px] rounded-lg cursor-pointer ${index === 0 ? "text-[#2185D0] border-1 border-[#2185D0]" : "text-[#717171] border-1 border-[#717171]"}`}>
                                            {item.title}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {filteredData.length > 8 && (
                <div className="flex flex-wrap md:flex-nowrap items-center justify-between mt-4 gap-4">
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

export default Products;