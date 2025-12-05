"use client"

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import BreadCrum from "./BreadCrum";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdBlock } from 'react-icons/md';
import { GrRotateLeft } from "react-icons/gr";
import Calendar from "./Calendar";
import SymptomsChart from "./SymptomsChart";
import { useGetUserByIdQuery, useToggleUserStatusMutation } from "@/lib/api/userApi";
import { useGetDailySessionsQuery } from "@/lib/api/dailySessionApi";
import { useToaster } from "@/components/Toaster";


interface UserManagementDetailProps {
    id: string;
}

const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

const formatActivity = (date: Date | string): string => {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just Now";
  if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? 'Minute' : 'Minutes'} Ago`;
  if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'Hour' : 'Hours'} Ago`;
  if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? 'Day' : 'Days'} Ago`;
  return formatDate(d);
};

const UserManagementDetail: React.FC<UserManagementDetailProps> = ({ id }) => {
    const { showToast } = useToaster();
    const { data: userData, isLoading: userLoading } = useGetUserByIdQuery(id, {
        skip: !id,
    });
    const { data: sessionsData } = useGetDailySessionsQuery({ userId: id }, {
        skip: !id,
    });
    const [toggleUserStatus] = useToggleUserStatusMutation();

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
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

    const handleStatusToggle = async () => {
        try {
            if (typeof window !== 'undefined' && !localStorage.getItem('adminToken')) {
                showToast("Admin authentication required", "error");
                return;
            }

            const result = await toggleUserStatus(id).unwrap();
            
            if (result.success) {
                showToast(result.message, "success");
            }
        } catch (error: any) {
            showToast(error?.data?.message || "Failed to update user status", "error");
        }
        setIsOpen(false);
    };

    const user = userData?.data;
    const sessions = sessionsData?.data || [];
    const completedDays = sessions.length;

    if (!user && !userLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-[#11401C] font-medium">User not found</p>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    const status = user.status.toLowerCase();
    const profileData = [
        { label: "Full Name:", data: user.name },
        { label: "Joined On:", data: formatDate(user.joinedDate) },
        { label: "Email ID:", data: user.email },
        { label: "session Days Completed:", data: `Day ${completedDays}` },
        { label: "Phone Number:", data: user.phone || "N/A" },
        { label: "Last Activity:", data: user.activity ? formatActivity(user.activity) : "N/A" },
    ];

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
                                {user.status}
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
                        <div className="grid grid-cols-2 gap-3">
                            {profileData.map((item, index) => (
                                <div key={index} className="flex flex-col gap-1">
                                    <p className="text-[#B3B3B3] font-medium">{item.label}</p>
                                    <p className="text-[#11401C] font-medium text-[18px]">{item.data}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-[29%] bg-white rounded-[12px] shadow-sm px-[8px] py-[12px]">
                    <Calendar userId={id} sessions={sessions} />
                </div>
            </div>
            <div className="mt-4">
                <SymptomsChart userId={id} sessions={sessions} />
            </div>
        </div>
    );
};

export default UserManagementDetail;