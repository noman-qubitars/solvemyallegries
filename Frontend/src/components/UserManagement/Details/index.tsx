"use client"

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import BreadCrum from "./BreadCrum";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { UserManagementDetailData } from "@/data/UserManagement";
import { MdBlock } from 'react-icons/md';
import { GrRotateLeft } from "react-icons/gr";
import Calendar from "./Calendar";
import SymptomsChart from "./SymptomsChart";


interface UserManagementDetailProps {
    id: string;
}

const UserManagementDetail: React.FC<UserManagementDetailProps> = ({ id }) => {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState("active");
    const toggleDropdown = () => setIsOpen(!isOpen);
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

    const handleStatusToggle = () => {
        setStatus((prev) => (prev === "active" ? "blocked" : "active"));
        setIsOpen(false);
    };

    console.log(id, "id>>>>>>>");

    return (
        <div>
            <BreadCrum />
            <div className="flex items-center gap-4 mt-4">
                <div className="w-full lg:w-[69%] bg-white rounded-[12px] shadow-sm px-[22px] py-[22px]">
                    <div className="flex items-center justify-between">
                        <p className="text-[#11401C] font-semibold text-[20px]">Profile</p>
                        <div className="flex items-center gap-2">
                            <p className="text-[#11401C] font-medium text-[18px]">Status:</p>
                            <div
                                className={`flex items-center gap-2 px-[22px] w-fit py-[10px] rounded-[12px] text-[14px] font-medium ${status === "active"
                                    ? "bg-[#E9F8EC] text-[#21BA45]"
                                    : "bg-[#FDEDED] text-[#DB3B21]"
                                    }`}
                            >
                                <div
                                    className={`h-[8px] w-[8px] rounded-full ${status === "active" ? "bg-[#21BA45]" : "bg-[#DB3B21]"
                                        }`}
                                ></div>
                                {status === "active" ? "Active" : "Blocked"}
                            </div>
                            <div className="relative" ref={dropdownRef}>
                                <HiOutlineDotsHorizontal className="text-[#000000] text-[14px] cursor-pointer" onClick={toggleDropdown} />
                                {isOpen && (
                                    <div className="absolute right-[5px] top-[10px] z-50 border border-[#DFDFDF] mt-2 w-[127px] bg-white shadow-lg rounded-lg">
                                        <button
                                            onClick={handleStatusToggle}
                                            className="w-full cursor-pointer flex items-center gap-2 pl-[12px] py-[12px] text-[#717171] font-medium"
                                        >
                                            {status === "active" ? (
                                                <>
                                                    <MdBlock className="w-4 h-4" /> Block
                                                </>
                                            ) : (
                                                <>
                                                    <GrRotateLeft className="w-4 h-4" /> Unblock
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex gap-4">
                        <Image src="/images/User/persons.svg" alt="User" width={197} height={197} />
                        {UserManagementDetailData.map((item, index) => (
                            <div key={index} className="grid grid-cols-2 gap-3">
                                {item.array.map((item, index) => (
                                    <div key={index} className="flex flex-col gap-1">
                                        <p className="text-[#B3B3B3] font-medium">{item.label}</p>
                                        <p className="text-[#11401C] font-medium text-[18px]">{item.data}</p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                </div>
                <div className="w-full lg:w-[29%] bg-white rounded-[12px] shadow-sm px-[8px] py-[12px]">
                    <Calendar />
                </div>
            </div>
            <div className="mt-4">
                <SymptomsChart />
            </div>
        </div>
    );
};

export default UserManagementDetail;