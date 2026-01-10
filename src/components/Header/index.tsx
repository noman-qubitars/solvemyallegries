"use client"

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { IoIosSearch } from "react-icons/io";
import Image from "next/image"; 
import Messages from "@/Icons/Messages";
import Logout from "@/Icons/Logout";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { IoReorderThreeOutline } from "react-icons/io5";
import Drawer from "./Drawer";
import { AdminMenus } from "@/data/Sidebar/sidebar";

const Header = () => {

  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");
  const languages = ["English", "French", "Spanish"];
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (lang: string) => {
    setSelectedLang(lang);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    setIsUserDropdownOpen(false);
    router.push('/signin');
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);


  return (
    <>
    <header className="fixed top-0 w-full lg:w-auto lg:left-[250px] right-0 bg-white shadow-xs px-4 py-3 flex items-center justify-between z-20">
      <div className="flex items-center gap-2">
      <IoReorderThreeOutline className="text-green md:block lg:hidden text-[25px]" onClick={openDrawer} />
      <div className="flex items-center px-3 gap-2 bg-[#F5F6FA] border border-[#D5D5D5] rounded-full w-[180px] sm:w-[250px] md:w-[320px] lg:w-[388px] h-[38px] focus-within:ring-1 focus-within:ring-[#11401C] focus-within:border-[#11401C] transition-all">
        <IoIosSearch size={20} />
        <input
          type="text"
          placeholder="Search"
          className="w-full text-black outline-none bg-transparent"
        />
      </div>
      </div>
      <div className="flex items-center gap-3 md:gap-4">
        <div className="hidden md:block relative">
          <span className="cursor-pointer text-[#999999]" onClick={() => router.push('/messages')}><Messages /></span>
          <div className="absolute -top-[2px] right-0 w-[7px] h-[7px] rounded-full bg-linear-to-r from-[#11401C] via-[#1F7332] to-[#859B5B]" />
        </div>
        <div className="hidden md:block relative">
          <Image src="/images/Header/bell.svg" alt="Logo" width={18} height={18} className="cursor-pointer" />
          <div className="absolute -top-[2px] right-0 w-[7px] h-[7px] rounded-full bg-linear-to-r from-[#11401C] via-[#1F7332] to-[#859B5B]" />
        </div>
        <div className="hidden sm:flex items-center gap-1">
          <Image src="/images/Header/uk.svg" alt="Logo" width={40} height={27} className="cursor-pointer" />
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-2 py-2 cursor-pointer bg-white"
            >
              {selectedLang}
              {isDropdownOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </button>
            {isDropdownOpen && (
              <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md">
                {languages.map((lang) => (
                  <li
                    key={lang}
                    onClick={() => handleSelect(lang)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {lang}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div ref={userDropdownRef} className="relative">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
          >
            <Image
              src="/images/Header/user.svg"
              alt="User Avatar"
              width={44}
              height={44}
              className="w-[35px] h-[35px] sm:w-[44px] sm:h-[44px]"
            />
            <div className="flex flex-col gap-0.5">
              <p className="font-semibold text-[#404040] text-[10px] sm:text-[14px] lg:text-[12px] xl:text-[14px]">Kathy Platt</p>
              <p className="text-[#565656] font-normal text-[12px]">Admin</p>
            </div>
            <div className="rounded-full border border-[#5C5C5C] flex items-center justify-center w-[18px] h-[18px]">
              {isUserDropdownOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </div>
          </div>
          {isUserDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-30">
              <li
                onClick={handleLogout}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm text-[#404040] transition-colors flex items-center gap-2"
              >
                <Logout width="18" height="18" />
                <span>Logout</span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
    <Drawer open={isDrawerOpen} onClose={closeDrawer} menus={AdminMenus} />
    </>
  );
};

export default Header;