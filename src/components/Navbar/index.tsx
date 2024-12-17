"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Solve from "@/icons/Solve";

const Navbar: React.FC = () => {

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav
            className={`container mx-auto flex justify-between items-center fixed left-0 right-0 z-20 transition-all duration-300 ${isScrolled ? "bg-white shadow-lg p-1.5 rounded-lg top-0" : "bg-transparent top-5"
                }`}
        >
            <div className="cursor-pointer">
                <Solve />
            </div>
            <div className="flex items-center gap-[4rem]">
                <Link href="/" className="font-circular text-green font-bold text-[14px]">
                    Home
                </Link>
                <Link href="/" className="font-circular text-gray font-bold text-[14px]">
                    Features
                </Link>
                <Link href="/" className="font-circular text-gray font-bold text-[14px]">
                    FAQs
                </Link>
                <Link href="/" className="font-circular text-gray font-bold text-[14px]">
                    Contact
                </Link>
            </div>
            <button className="font-poppins font-extrabold text-white-50 w-[179px] h-[45px] rounded-full bg-green">
                Watch Webinar
            </button>
        </nav>
    );
};

export default Navbar;
