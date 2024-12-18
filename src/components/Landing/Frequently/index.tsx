"use client";

import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { faq } from "@/data/Landing";

const Frequently: React.FC = () => {

    const [activeId, setActiveId] = useState<string>("1");

    return (
        <div className="container mx-auto mt-[30px]">
            <p className="font-poppins font-extrabold text-[48px] text-green" style={{ boxShadow: "#00000040" }}>
                Frequenlty Asked Questions
            </p>
            <div className="flex">
                {/* FAQ List */}
                <div className="w-1/2 bg-white">
                    {faq.map((item) => (
                        <div
                            key={item.id}
                            className={`flex items-center justify-between p-4 cursor-pointer shadow-sm ${activeId === item.id ? "bg-green-250" : "" // Light green background
                                }`}
                            onClick={() => setActiveId(item.id)} // Set active FAQ
                        >
                            {/* Left: Circle Indicator and Title */}
                            <div className="flex items-center space-x-4">
                                <div
                                    className={`w-4 h-4 rounded-full ${activeId === item.id ? "bg-green" : "bg-green-300"
                                        }`}
                                ></div>
                                <span
                                    className={`font-poppins ${activeId === item.id ? "font-normal text-black-100" : "text-gray-700"
                                        }`}
                                >
                                    {item.title}
                                </span>
                            </div>

                            {/* Right: Arrow Icon */}
                            <IoIosArrowForward className="text-green" />
                        </div>
                    ))}
                </div>

                {/* Active FAQ Content */}
                <div className="w-1/2 bg-green-250 p-6">
                    <h3 className="font-poppins text-[22px] font-bold text-green">
                        {faq.find((item) => item.id === activeId)?.subtitle}
                    </h3>
                    <p className="text-gray-700 mt-4">
                        {faq.find((item) => item.id === activeId)?.desp}
                    </p>
                </div>
            </div>
        </div>

    );
};

export default Frequently;