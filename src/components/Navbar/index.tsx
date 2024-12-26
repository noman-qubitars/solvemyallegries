"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import Solve from "@/icons/Solve";
import { IoReorderThree } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";


const Navbar: React.FC = () => {

    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState("home");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const [modalClass, setModalClass] = useState('');

    useEffect(() => {
        if (isModalOpen) {
            setModalClass('open');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            setModalClass('close');
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    }, [isModalOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => { // Annotate event type
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                closeModal(); // Close the modal on outside click
            }
        };

        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setModalClass("closing");
        setTimeout(() => {
            setIsModalOpen(false);
        }, 300); // Match with transition duration
    };

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
        <>
            <nav
                className={`container mx-auto flex justify-between items-center fixed left-0 right-0 z-20 transition-all duration-300 ${isScrolled ? "bg-white shadow-lg p-1.5 rounded-lg top-0" : "bg-transparent top-5"
                    }`}
            >
                <div className="cursor-pointer" onClick={() => router.push('/')}>
                    <Solve />
                </div>
                <div className="hidden md:hidden lg:block">
                    <div className="flex items-center gap-[4rem]">
                        <button onClick={() => handleClick("home")} className={`font-circular font-bold text-[14px] ${activeLink === "home" ? "text-green" : "text-gray"
                            }`}>
                            Home
                        </button>
                        <button onClick={() => handleClick("feature")} className={`font-circular font-bold text-[14px] ${activeLink === "feature" ? "text-green" : "text-gray"
                            }`}>
                            Features
                        </button>
                        <button onClick={() => handleClick("faqs")} className={`font-circular font-bold text-[14px] ${activeLink === "faqs" ? "text-green" : "text-gray"
                            }`}>
                            FAQs
                        </button>
                        <button onClick={() => handleClick("contact")} className={`font-circular font-bold text-[14px] ${activeLink === "contact" ? "text-green" : "text-gray"
                            }`}>
                            Contact
                        </button>
                    </div>
                </div>
                <button className="font-poppins font-extrabold text-white-50 w-[179px] h-[45px] rounded-full bg-green hidden md:hidden lg:block" onClick={() => router.push('/webinar')}>
                    Watch Webinar
                </button>
                <IoReorderThree className="text-green block md:block lg:hidden text-[30px]" onClick={openModal} />
            </nav>

            {isModalOpen && (
                <>
                    <div
                        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${modalClass === "open" ? "opacity-100" : "opacity-0"
                            }`}
                    ></div>
                    <div
                        ref={modalRef}
                        className={`fixed right-0 top-0 bg-white z-40 w-[393px] h-screen pt-[1.25rem] px-[1.25rem] transition-transform duration-300 ${modalClass === "open"
                            ? "translate-x-0"
                            : modalClass === "closing"
                                ? "translate-x-full"
                                : "translate-x-full"
                            }`}>
                        <div className='flex justify-between items-center'>
                            <Solve />
                            <IoMdClose className="text-green text-[25px]" onClick={closeModal} />
                        </div>
                        <div className="bg-gray w-full h-0.5 mt-3 mb-3" />
                        <div className="space-y-7">
                            <div className="flex flex-col gap-[2rem] mt-10">
                                <button onClick={() => handleClick("home")} className={`font-circular font-bold text-[14px] text-start ${activeLink === "home" ? "text-green" : "text-gray"
                                    }`}>
                                    Home
                                </button>
                                <button onClick={() => handleClick("feature")} className={`font-circular font-bold text-[14px] text-start ${activeLink === "feature" ? "text-green" : "text-gray"
                                    }`}>
                                    Features
                                </button>
                                <button onClick={() => handleClick("faqs")} className={`font-circular font-bold text-[14px] text-start ${activeLink === "faqs" ? "text-green" : "text-gray"
                                    }`}>
                                    FAQs
                                </button>
                                <button onClick={() => handleClick("contact")} className={`font-circular font-bold text-[14px] text-start ${activeLink === "contact" ? "text-green" : "text-gray"
                                    }`}>
                                    Contact
                                </button>
                            </div>
                            <button className="font-poppins font-extrabold text-white-50 w-[179px] h-[45px] rounded-full bg-green" onClick={() => router.push('/webinar')}>
                                Watch Webinar
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Navbar;
