"use client";

import React from "react";
import Image from "next/image";
import { casestudy } from "@/data/Landing";

const Case: React.FC = () => {
    return (
        <div>
            <p className="mt-[55px] text-green font-poppins text-[36px] font-extrabold text-center">
                Case Study
            </p>
            {casestudy.map((item) => (
                <div key={item.id} className="mt-[44px]">
                    {/* CHALLENGES */}
                    <div className="bg-green-50 py-[38px] pl-[24px] pr-[153px] rounded-lg flex gap-4 items-center">
                        <h2 className="font-poppins font-bold text-[36px] text-white">{item.title}</h2>
                        <div className="flex flex-wrap gap-4 mt-4">
                            {item.bullets.map((bullet, index) => (
                                <span key={index} className="flex items-center gap-2 font-poppins font-semibold text-white">
                                    • {bullet}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between mt-[30px]">
                        {/* SESSION PLAN */}
                        <div>
                            <h3 className="font-poppins text-[24px] font-bold text-black-100">{item.titles}</h3>
                            <div>
                                {item.sessions.map((session, idx) => (
                                    <div key={idx} className="flex items-center gap-4 mt-[12px]">
                                        <p className="bg-green-50 text-white w-[131px] h-[56px] rounded-lg font-poppins font-bold text-center flex items-center justify-center shadow-lg">
                                            {session.name}
                                        </p>
                                        <p className="font-poppins text-[14px] font-normal text-black-100">{session.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* IMPACT & OUTCOME */}
                        <div className="flex gap-6 flex-col">
                            <div className="bg-green-50 py-[21px] px-[28px] rounded-lg w-1/2">
                                <h4 className="font-bold font-poppins text-black-100">{item.impact.title}</h4>
                                <p className="mt-[17px] font-poppins font-normal text-[14px] text-black-100">{item.impact.description}</p>
                            </div>
                            <div className="btn-gradient-border w-1/2 rounded-lg">
                                <div className="px-[28px] py-[21px]">
                                    <h4 className="font-bold font-poppins text-black-100" style={{ boxShadow: "#00000040" }}>{item.outcome.title}</h4>
                                    <p>{item.outcome.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>





                    {/* REVIEW */}
                    <div className="bg-green-500 text-white p-6 rounded-lg flex gap-6 items-center">
                        <div className="relative">
                            <Image
                                src={item.review.image}
                                alt="review"
                                className="rounded-full w-24 h-24"
                            />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold">{item.review.person}</h4>
                            <p>{item.review.quote}</p>
                        </div>
                        <div className="ml-auto">
                            <span className="text-white">{item.review.view}</span>
                            <item.review.vector />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Case;