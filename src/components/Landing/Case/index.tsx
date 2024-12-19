"use client";

import React from "react";
import Image from "next/image";
import { casestudy } from "@/data/Landing";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Case: React.FC = () => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        centerMode: true,
        centerPadding: "16%",
        arrows: false,
    };

    return (
        <div>
            <p className="mt-[55px] text-green font-poppins text-[36px] font-extrabold text-center">
                Case Study
            </p>
            <Slider {...settings}>
                {casestudy.map((item) => (
                    <div key={item.id} className="mt-[44px] px-4">
                        {/* CHALLENGES */}
                        <div className="bg-green-50 py-[38px] pl-[24px] rounded-lg">
                            <div className="flex gap-[20px] items-center">
                                <h2 className="font-poppins font-bold text-[36px] text-white">
                                    {item.title}
                                </h2>
                                <div className="grid grid-cols-3 gap-y-4 gap-x-3.5">
                                    {item.bullets.map((bullet, index) => (
                                        <span
                                            key={index}
                                            className="flex items-center gap-2 font-poppins font-semibold text-white"
                                        >
                                            • {bullet}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>


                        <div className="flex gap-[17px] mt-[30px]">
                            {/* SESSION PLAN */}
                            <div>
                                <h3 className="font-poppins text-[24px] font-bold text-black-100">{item.titles}</h3>
                                <div>
                                    {item.sessions.map((session, idx) => (
                                        <div key={idx} className="flex items-center gap-4 mt-[12px]">
                                            <p className="bg-green-100 text-white w-[131px] h-[56px] rounded-lg font-poppins font-bold text-center flex items-center justify-center shadow-lg" style={{ boxShadow: "#00000040" }}>
                                                {session.name}
                                            </p>
                                            <p className="font-poppins text-[14px] font-normal text-black-100 text-wrap max-w-[190px]">{session.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* IMPACT & OUTCOME */}
                            <div className="flex justify-between flex-col w-[300px]">
                                <div className="bg-green-100 py-[21px] px-[28px] rounded-lg">
                                    <h4 className="font-bold font-poppins text-black-100">{item.impact.title}</h4>
                                    <p className="mt-[17px] font-poppins font-normal text-[14px] text-black-100">{item.impact.description}</p>
                                </div>
                                <div className="btn-gradient-border rounded-lg">
                                    <div className="px-[28px] py-[21px]">
                                        <h4 className="font-bold font-poppins text-black-100" style={{ boxShadow: "#00000040" }}>{item.outcome.title}</h4>
                                        <p>{item.outcome.description}</p>
                                    </div>
                                </div>
                            </div>
                            {/* REVIEW */}
                            <div className="bg-text-gradient-green-one opacity-90 pr-[28px] w-[430px] rounded-3xl relative">
                                <Image
                                    src={item.review.image}
                                    alt="review"
                                    width={163}
                                    height={164}
                                    className="rounded-full absolute top-[-20px] left-1/2 transform -translate-x-1/2 w-[140px] h-[140px]"
                                />
                                <div className="flex justify-end pt-[24px]">
                                    <div className="flex items-center gap-2 hover:underline cursor-pointer hover:decoration-white">
                                        <p className="text-white">{item.review.view}</p>
                                        <span className="text-white">
                                            <item.review.vector />
                                        </span>
                                    </div>
                                </div>
                                <div className="relative">
                                    <Image
                                        src={item.review.imageone}
                                        alt="review"
                                        width={163}
                                        height={164}
                                        className="absolute w-[40px] left-[55px] top-[-25px]"
                                    />
                                    <h4 className="text-lg font-bold text-center text-white mt-[120px]">{item.review.person}</h4>
                                    <div className="flex justify-center">
                                        <div className=" max-w-[300px]">
                                            <p className="text-center text-white">{item.review.quote}</p>
                                        </div>
                                    </div>
                                    <Image
                                        src={item.review.imagetwo}
                                        alt="review"
                                        width={163}
                                        height={164}
                                        className="absolute w-[40px] right-[30px] bottom-[-75px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Case;