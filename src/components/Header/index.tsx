"use client"

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { IoIosSearch } from "react-icons/io";
import Image from "next/image"; 
import Messages from "@/Icons/Messages";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const Header = () => {

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");
  const languages = ["English", "French", "Spanish"];
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (lang: string) => {
    setSelectedLang(lang);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <header className="fixed top-0 w-full lg:w-auto lg:left-[250px] right-0 bg-white shadow-xs px-4 py-4 flex items-center justify-between z-20">
      <div className="flex items-center px-3 gap-2 bg-[#F5F6FA] border border-[#D5D5D5] rounded-full w-[388px] h-[38px] focus-within:ring-1 focus-within:ring-[#11401C] focus-within:border-[#11401C] transition-all">
        <IoIosSearch size={20} />
        <input
          type="text"
          placeholder="Search"
          className="w-full text-black outline-none bg-transparent"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <span className="cursor-pointer text-[#999999]" onClick={() => router.push('/messages')}><Messages /></span>
          <div className="absolute -top-[2px] right-0 w-[7px] h-[7px] rounded-full bg-gradient-to-r from-[#11401C] via-[#1F7332] to-[#859B5B]" />
        </div>
        <div className="relative">
          <Image src="/images/Header/bell.svg" alt="Logo" width={18} height={18} className="cursor-pointer" />
          <div className="absolute -top-[2px] right-0 w-[7px] h-[7px] rounded-full bg-gradient-to-r from-[#11401C] via-[#1F7332] to-[#859B5B]" />
        </div>
        <div className="flex items-center gap-1">
          <Image src="/images/Header/uk.svg" alt="Logo" width={40} height={27} className="cursor-pointer" />
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-2 py-2 cursor-pointer bg-white"
            >
              {selectedLang}
              {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </button>
            {open && (
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
        <div className="flex items-center gap-2 cursor-pointer">
          <Image
            src="/images/Header/user.svg"
            alt="User Avatar"
            width={44}
            height={44}
          />
          <div className="flex flex-col gap-0.5">
            <p className="font-semibold text-[#404040] text-[14px]">Kathy Platt</p>
            <p className="text-[#565656] font-normal text-[12px]">Admin</p>
          </div>
          <div className="rounded-full border border-[#5C5C5C] flex items-center justify-center w-[18px] h-[18px]">
            <MdKeyboardArrowDown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
