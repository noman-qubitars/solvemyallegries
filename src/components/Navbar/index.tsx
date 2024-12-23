"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Solve from "@/icons/Solve";

const Navbar: React.FC = () => {

    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleClick = (section: string) => {
        setActiveLink(section);

        // Scroll to the section with smooth behavior
        const element = document.getElementById(`${section}-section`);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav
            className={`container mx-auto flex justify-between items-center fixed left-0 right-0 z-20 transition-all duration-300 ${isScrolled ? "bg-white shadow-lg p-1.5 rounded-lg top-0" : "bg-transparent top-5"
                }`}
        >
            <div className="cursor-pointer" onClick={() => router.push('/')}>
                <Solve />
            </div>
            <div className="flex items-center gap-[4rem]">
                <button  onClick={() => handleClick("home")} className={`font-circular font-bold text-[14px] ${
                    activeLink === "home" ? "text-green" : "text-gray"
                }`}>
                    Home
                </button>
                <button onClick={() => handleClick("feature")} className={`font-circular font-bold text-[14px] ${
                    activeLink === "feature" ? "text-green" : "text-gray"
                }`}>
                    Features
                </button>
                <button onClick={() => handleClick("faqs")} className={`font-circular font-bold text-[14px] ${
                    activeLink === "faqs" ? "text-green" : "text-gray"
                }`}>
                    FAQs
                </button>
                <button onClick={() => handleClick("contact")} className={`font-circular font-bold text-[14px] ${
                    activeLink === "contact" ? "text-green" : "text-gray"
                }`}>
                    Contact
                </button>
            </div>
            <button className="font-poppins font-extrabold text-white-50 w-[179px] h-[45px] rounded-full bg-green" onClick={() => router.push('/webinar')}>
                Watch Webinar
            </button>
        </nav>
    );
};

export default Navbar;
