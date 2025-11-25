'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import Export from "@/Icons/Export";

interface BreadCrumProps {
    onSearch: (term: string) => void;
    setSelectedFilter: (filter: string | null) => void;
    selectedFilter: string | null;
    onOpen: () => void;
}

const BreadCrum: React.FC<BreadCrumProps> = ({ onSearch, onOpen, setSelectedFilter, selectedFilter }) => {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const options = ['Active', 'Blocked'];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleSelect = (option: string) => {
        setSelectedFilter(option);
    };

    const handleReset = () => {
        setSelectedFilter(null);
    };

    const handleRemoveTag = () => {
        setSelectedFilter(null);
    };


    return (
        <div className="space-y-3">
            <div>
                <h1 className="text-[#11401C] font-semibold text-[24px]">Allergen Database</h1>
                <p className="text-[#646464] font-medium text-[14px]">Manage & Track Allergens</p>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex items-center px-3 gap-2 border border-[#D5D5D5] rounded-full w-[388px] h-[38px] focus-within:ring-1 focus-within:ring-[#11401C] focus-within:border-[#11401C] transition-all">
                        <IoIosSearch size={20} className="text-[#8F9091]" />
                        <input
                            type="text"
                            placeholder="Search Allergen ID, name, or category"
                            onChange={(e) => onSearch(e.target.value)}
                            className="w-full text-black outline-none bg-transparent placeholder:text-[#8F9091]"
                        />
                    </div>
                    <div className="relative" ref={dropdownRef}>
                        <div className="flex items-center gap-2">
                            <Image
                                src="/images/User/user.svg"
                                alt="user"
                                width={16}
                                height={18}
                                className="cursor-pointer"
                                onClick={toggleDropdown}
                            />
                            {selectedFilter && (
                                <div
                                    className="flex items-center justify-between border border-[#14A155] text-[#333333] px-2 py-0.5 rounded-full text-[12px] font-normal w-[77px]"
                                >
                                    {selectedFilter}
                                    <button
                                        onClick={handleRemoveTag}
                                        className="text-sm font-bold text-[#999999] cursor-pointer"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                        </div>

                        {isOpen && (
                            <div className="absolute z-50 border border-[#DFDFDF] mt-2 w-[220px] bg-white shadow-lg rounded-lg p-4">
                                <p className="text-[12px] font-normal text-[#71717A] mb-[8px]">Filter</p>
                                {options.map((option) => (
                                    <label key={option} className="flex items-center gap-2 mb-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="filter"
                                            checked={selectedFilter === option}
                                            onChange={() => handleSelect(option)}
                                            className="peer hidden"
                                        />
                                        <div className="w-4 h-4 rounded border border-[#828282] bg-white flex items-center justify-center peer-checked:border-[#21BA45] peer-checked:bg-[#21BA45]">
                                            {selectedFilter === option && (
                                                <Image src="/images/User/tick.svg" alt="check" width={12} height={7} />
                                            )}
                                        </div>
                                        <span className="text-[#333333] text-[14px] font-normal">{option}</span>
                                    </label>
                                ))}
                                <div className="flex items-center gap-8 mt-4">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="bg-[#21BA45] text-white text-center px-[28px] py-[10px] rounded-md text-[14px] font-semibold cursor-pointer"
                                    >
                                        Apply
                                    </button>
                                    <button
                                        onClick={handleReset}
                                        className="text-[#828282] text-[14px] text-center font-medium cursor-pointer"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <button className="flex items-center gap-2 cursor-pointer border border-[#CCCCCC] rounded-lg px-[12px] py-[7px] text-[#11401C] font-semibold text-[14px]">
                        <Export />
                        Export
                    </button>
                    <button onClick={onOpen} className="bg-gradient-to-r cursor-pointer from-[#11401C] via-[#1F7332] to-[#859B5B] rounded-full px-[12px] py-[7px] text-white font-bold">
                        + Add New Symptom
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BreadCrum;