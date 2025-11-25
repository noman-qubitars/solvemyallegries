"use client";

import React from "react";
import Image from "next/image";
import Solve from "@/Icons/Solve";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";
import { MdCopyright } from "react-icons/md";
import { IoIosSend } from "react-icons/io";


const Footer: React.FC = () => {
    return (
        <>
            <div className="mt-[70px] bg-green flex flex-col md:flex-row justify-center items-center gap-4 py-[57px] px-4 md:px-8">
                <p className="text-white font-poppins font-bold text-[24px] text-center md:text-left z-10">
                    Subscribe for Newsletter
                </p>

                <div className="bg-white rounded-full pl-[20px] pr-[10px] py-[7px] md:py-[10px] lg:py-[8px] flex gap-2 items-center z-10 w-full md:w-auto max-w-md">
                    <input
                        type="text"
                        placeholder="Your email"
                        className="placeholder-gray-400 font-poppins font-normal outline-none border-none w-full"
                    />
                    <button className="bg-green cursor-pointer rounded-full px-[10px] py-[10px] flex justify-center items-center">
                        <IoIosSend className="text-white text-[24px]" />
                    </button>
                </div>
            </div>

            <div className="bg-green-250 py-[35px] px-[20px] sm:px-[80px] md:px-[90px] lg:px-[110px] xl:px-[128px] flex flex-col items-center relative">
                <span className="z-10 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <Solve />
                </span>
                <p className="font-poppins font-normal text-[14px] leading-[21px] text-green text-center mt-6 z-10">
                    SaveMyAllergies is a personalized wellness app designed to help individuals manage their allergies and improve their overall health. With tailored healing sessions, practitioner guidance, and tools to track progress, SaveMyAllergies offers a holistic approach to allergy relief and long-term wellness. The app provides a unique blend of practical support and educational resources, empowering users to understand and manage their symptoms more effectively.
                </p>
                <div className="flex gap-6 items-center mt-10 z-10">
                    <FaFacebook className="text-green text-[28px] cursor-pointer" />
                    <FaInstagram className="text-green text-[28px] cursor-pointer" />
                    <TfiYoutube className="text-green text-[35px] cursor-pointer" />
                </div>
                <p className="text-center font-poppins font-normal text-[12px] text-gray-250 flex items-center mt-6 z-10">
                    <MdCopyright />
                    Copyright 2024 - SaveMyAllergies
                </p>
                <div className="absolute bottom-0 left-0 w-full">
                    <Image
                        src="/images/footer.png"
                        alt="Footer Wave"
                        width={1920}
                        height={300}
                        className="w-full object-cover opacity-5"
                    />
                </div>
            </div>
        </>
    );
};

export default Footer;