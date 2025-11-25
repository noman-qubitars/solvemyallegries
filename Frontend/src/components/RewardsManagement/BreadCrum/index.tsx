'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import Export from "@/Icons/Export";
import { IoCloseCircleOutline } from "react-icons/io5";
import { modalFields, ModalField } from '@/data/RewardsManagement';
import { Switch } from "@headlessui/react";

interface BreadCrumProps {
    onSearch: (term: string) => void;
    setSelectedFilter: (filter: string | null) => void;
    selectedFilter: string | null;
}

const BreadCrum: React.FC<BreadCrumProps> = ({ onSearch, setSelectedFilter, selectedFilter }) => {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const options = ['Today', 'This Week', 'This Month'];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expireEnabled, setExpireEnabled] = useState(false);
    const [fraudPreventionEnabled, setFraudPreventionEnabled] = useState(false);

    const [inputFields, setInputFields] = useState(
        modalFields.filter((f) => f.type === "input") as Extract<ModalField, { type: "input" }>[]
    );

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
                <h1 className="text-[#11401C] font-semibold text-[24px]">Rewards Management</h1>
                <p className="text-[#646464] font-medium text-[14px]">Manage & Track rewards</p>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex items-center px-3 gap-2 border border-[#D5D5D5] rounded-full w-[388px] h-[38px] focus-within:ring-1 focus-within:ring-[#11401C] focus-within:border-[#11401C] transition-all">
                        <IoIosSearch size={20} className="text-[#8F9091]" />
                        <input
                            type="text"
                            placeholder="Search uses by name, ID or keyword"
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
                                    className="flex items-center gap-2 border border-[#14A155] text-[#333333] px-2 py-0.5 rounded-full text-[12px] font-normal w-fit"
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
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 cursor-pointer border border-[#CCCCCC] hover:border-[#11401C] rounded-lg px-[15px] py-[7px] text-[#4D4D4D] font-semibold text-[14px]">
                        <Image src="/images/Rewards/settings.svg" alt="img" width={12} height={12} />
                        Settings
                    </button>
                    <button className="flex items-center gap-2 cursor-pointer border border-[#CCCCCC] hover:border-[#11401C] rounded-lg px-[15px] py-[7px] text-[#11401C] font-semibold text-[14px]">
                        <Export />
                        Export
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-[#BABBBB]/40 bg-opacity-50 flex items-center justify-center z-20">
                    <div className="bg-white p-4 rounded-lg shadow-lg w-[500px] overflow-x-hidden overflow-y-auto max-h-[85vh] scrollbar-hide">
                        <div className="flex items-center justify-between">
                            <div className="text-[#11401C] font-semibold text-[24px]">Reward System Settings</div>
                            <IoCloseCircleOutline className="w-6 h-6 text-[#1C274C] hover:text-[#11401C] cursor-pointer" onClick={() => setIsModalOpen(false)} />
                        </div>
                        <div className='mt-4'>
                            {modalFields.map((field, index) => {
                                if (field.type === "input") {
                                    return (
                                        <div key={index} className="flex justify-between items-center mb-2">
                                            <label className="text-[18px] font-medium text-[#4D4D4D]">{field.label}</label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    placeholder={field.placeholder}
                                                    onChange={(e) =>
                                                        setInputFields((prev) =>
                                                            prev.map((f) =>
                                                                f.label === field.label ? { ...f, value: e.target.value } : f
                                                            )
                                                        )
                                                    }
                                                    className={`px-2 py-[3px] border border-[#B1A9A9] placeholder-[#4D4D4D]/20 rounded-[4px] ${index === 0 ? "w-[68px]" : "w-[82px]"}`}
                                                />
                                                {field.unit && <span className="text-sm text-gray-500">{field.unit}</span>}
                                            </div>
                                        </div>
                                    );
                                }
                                if (field.type === "toggle") {
                                    const checked =
                                        field.stateKey === "expireEnabled" ? expireEnabled : fraudPreventionEnabled;
                                    const onChange =
                                        field.stateKey === "expireEnabled" ? setExpireEnabled : setFraudPreventionEnabled;
                                    return (
                                        <div key={index} className="flex justify-between items-center mb-2 last:mb-0">
                                            <label className="text-[18px] font-medium text-[#4D4D4D]">{field.label}</label>
                                            <Switch
                                                checked={checked}
                                                onChange={onChange}
                                                className={`${checked ? "bg-[#11401C]" : "bg-[#222222]"
                                                    } relative inline-flex cursor-pointer h-[32px] w-[64px] items-center rounded-full`}
                                            >
                                                <span className="sr-only">{checked ? "On" : "Off"}</span>
                                                <span
                                                    className={`${checked ? "translate-x-9" : "translate-x-1"
                                                        } inline-block h-[24px] w-[24px] transform rounded-full bg-white transition`}
                                                />
                                                <span
                                                    className={`absolute left-4 text-xs font-medium transition ${checked ? "text-white" : "text-white"
                                                        }`}
                                                    style={{ left: checked ? "10px" : "35px" }}
                                                >
                                                    {checked ? "On" : "Off"}
                                                </span>
                                            </Switch>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BreadCrum;