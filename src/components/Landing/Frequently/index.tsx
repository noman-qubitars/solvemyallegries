"use client";
import { faq } from "@/data/Landing";
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";


const Frequently: React.FC = () => {
  
  const [activeId, setActiveId] = useState<string>("1");

  return (
    <div
      className="max-w-[85rem] mx-auto mt-[30px] px-4 overflow-x-hidden"
      id="faqs-section"
    >
      <p className="font-poppins font-extrabold text-[28px] sm:text-[40px] md:text-[44px] lg:text-[48px] text-green">
        Frequently Asked Questions
      </p>

      <div className="flex flex-col md:flex-row mt-[40px] gap-3 md:gap-4 lg:gap-6">
        {/* FAQ List */}
        <div className="w-full md:w-1/2 bg-white">
          {faq.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between p-4 cursor-pointer shadow-sm transition-all duration-200 ${
                activeId === item.id ? "bg-green-250" : ""
              }`}
              onClick={() => setActiveId(item.id)}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-4 h-4 rounded-full ${
                    activeId === item.id ? "bg-green" : "bg-green-300"
                  }`}
                ></div>
                <span
                  className={`font-poppins text-[16px] sm:text-[18px] ${
                    activeId === item.id
                      ? "font-normal text-black-100"
                      : "text-gray-700"
                  }`}
                >
                  {item.title}
                </span>
              </div>
              <IoIosArrowForward
                className={`text-[20px] ${
                  activeId === item.id ? "text-green" : "text-green-300"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Answer Box - visible from md and up */}
        <div className="block md:block w-full md:w-1/2 bg-green-250 px-[25px] py-4 h-[210px] sm:h-[170px] md:h-[250px] lg:h-[220px] xl:h-[180px] rounded-2xl">
          <h3 className="font-poppins text-[20px] sm:text-[22px] font-bold text-green">
            {faq.find((item) => item.id === activeId)?.subtitle}
          </h3>
          <p className="text-gray-150 mt-4 font-poppins text-[16px] sm:text-[18px]">
            {faq.find((item) => item.id === activeId)?.desp}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Frequently;
