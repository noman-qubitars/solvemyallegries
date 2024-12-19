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
            <div className="flex mt-[56px]">
                <div className="w-1/2 bg-white">
                    {faq.map((item) => (
                        <div
                            key={item.id}
                            className={`flex items-center justify-between p-4 cursor-pointer shadow-sm ${activeId === item.id ? "bg-green-250" : ""
                                }`}
                            onClick={() => setActiveId(item.id)}
                        >
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
                            <IoIosArrowForward className={`text-[20px] ${activeId === item.id ? "text-green" : "text-green-300"}`} />
                        </div>
                    ))}
                </div>

                <div className="w-1/2 bg-green-250 px-[25px] py-[59px] h-[270px] rounded-tr-2xl rounded-br-2xl" style={{ marginTop: `${(Number(activeId) - 1) * 56}px` }}>
                    <h3 className="font-poppins text-[22px] font-bold text-green">
                        {faq.find((item) => item.id === activeId)?.subtitle}
                    </h3>
                    <p className="text-gray-150 mt-[30px] font-poppins font-normal text-[20px]">
                        {faq.find((item) => item.id === activeId)?.desp}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Frequently;