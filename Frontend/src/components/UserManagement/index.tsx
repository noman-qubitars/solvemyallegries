"use client"

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BreadCrum from "./BreadCrum";
import { UserManagementData as initialData } from "@/data/UserManagement";
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
import { GrRotateLeft } from "react-icons/gr";
import { MdBlock, MdOutlineKeyboardDoubleArrowLeft, MdKeyboardArrowLeft, MdOutlineKeyboardDoubleArrowRight, MdKeyboardArrowRight } from 'react-icons/md';

const UserManagement: React.FC = () => {

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [data, setData] = useState(initialData);
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
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
      setSelectedRows(data.map((user) => user.email))
    }
  }

  const handleSort = () => {
    const sorted = [...data].sort((a, b) => {
      return sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    })
    setData(sorted)
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
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

  const toggleBlockStatus = (email: string) => {
    setData(prevData =>
      prevData.map(user =>
        user.email === email
          ? {
            ...user,
            status: user.status === "Active" ? "Blocked" : "Active",
            activity: "Just Now"
          }
          : user
      )
    );
    setOpenDropdownIndex(null);
  };

  const handleView = (userId: number) => {
    router.push(`/usermanagement/${userId}`);
    setOpenDropdownIndex(null);
  };

  return (
    <div className="">
      <BreadCrum onSearch={setSearchTerm} setSelectedFilter={setSelectedFilter} selectedFilter={selectedFilter} />
      <div className="mt-4">
        <p className="text-[#666666] font-semibold">
          {data.length} Total Users
        </p>
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
                <th
                  className={`px-4 py-3 cursor-pointer whitespace-nowrap flex items-center justify-between ${sortOrder === 'asc' ? 'bg-[#F2F3F7]' : ''}`}
                  onClick={handleSort}
                >
                  Name
                  {sortOrder === 'asc' ? (
                    <FaArrowUp className="text-xs text-gray-600" />
                  ) : (
                    <FaArrowDown className="text-xs text-gray-600" />
                  )}
                </th>
                <th className="px-4 py-3 whitespace-nowrap">Joined On</th>
                <th className="px-4 py-3 whitespace-nowrap">Status</th>
                <th className="px-4 py-3 whitespace-nowrap">Last Activity</th>
                <th className="px-4 py-3 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#CCCCCC]">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-[#222222] font-medium py-2">
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
                          checked={selectedRows.includes(user.email)}
                          onChange={() => toggleCheckbox(user.email)}
                          className="peer hidden"
                        />
                        <div className="w-4 h-4 rounded border border-[#828282] bg-white flex items-center justify-center peer-checked:border-[#21BA45] peer-checked:bg-[#21BA45]">
                          <Image src="/images/User/tick.svg" alt="check" width={12} height={7} />
                        </div>
                      </label>
                    </td>
                    <td className="px-4 py-4 flex items-center gap-3 text-left whitespace-nowrap">
                      <Image
                        src={user.image}
                        alt="User"
                        width={25}
                        height={25}
                      />
                      <div>
                        <p className="font-medium text-[#484C52]">{user.name}</p>
                        <p className="text-[12px] font-normal text-[#808080]">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[#222222] font-medium text-[14px] whitespace-nowrap">{user.date}</td>
                    <td className="px-4 py-4 flex justify-center whitespace-nowrap">
                      <div
                        className={`flex items-center gap-2 px-[22px] w-fit py-[10px] rounded-[12px] text-[14px] font-medium ${user.status === 'Active'
                          ? 'bg-[#E9F8EC] text-[#21BA45]'
                          : 'bg-[#FBE9E9] text-[#DB2828]'
                          }`}
                      >
                        <div className="h-[8px] w-[8px] rounded-full bg-current"></div>
                        {user.status}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[#222222] font-medium text-[14px] whitespace-nowrap">{user.activity}</td>
                    <td className="px-4 py-4 flex justify-center whitespace-nowrap">
                      <div ref={dropdownRef} data-dropdown-index={index}>
                        <button className="text-[#000000] cursor-pointer" onClick={() => toggleDropdown(index)}>
                          <user.icon className="w-5 h-5" />
                        </button>
                        {openDropdownIndex === index && (
                          <div className="absolute right-[4.5rem] mt-0 w-[127px] bg-white rounded-[6px] shadow-lg border border-[#B3B3B3] z-50">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleView(user.id);
                              }}
                              className="w-full cursor-pointer flex gap-2 pl-[12px] py-[12px] text-[#11401C] font-medium border-b border-[#B3B3B3]"
                            >
                              <AiOutlineEye className="w-4 h-4" /> View
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBlockStatus(user.email);
                              }}
                              className="w-full cursor-pointer flex gap-2 pl-[12px] py-[12px] text-[#717171] font-medium border-b border-[#B3B3B3]"
                            >
                              {user.status === "Active" ? (
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

export default UserManagement;
