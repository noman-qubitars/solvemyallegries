"use client";

import React from "react";
import Image from "next/image";
import { redirect } from 'next/navigation'
import { casestudy } from "@/data/Landing";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Case: React.FC = () => {

    const handleItemClick = (id: string) => {
        redirect(`/casestudy/${id}`)
    };

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
        responsive: [
            {
                breakpoint: 768, 
                settings: {
                    centerPadding: "10%", 
                },
            },
        ],
    };

    return (
        <div>
            <p className="mt-[55px] text-green font-poppins text-[36px] font-extrabold text-center">
                Case Study
            </p>
            <Slider {...settings}>
                {casestudy.map((item) => (
                    <div key={item.id} className="mt-[44px] px-4 cursor-pointer" onClick={() => handleItemClick(item.id)}>
                        {/* CHALLENGES */}
                        <div className="bg-green-50 py-[38px] pl-[16px] sm:pl-[24px] rounded-lg">
                            <div className="flex gap-[20px] sm:gap-[10px] lg:gap-[14px] xl:gap-[20px] items-center">
                                <h2 className="font-poppins font-bold text-[14px] sm:text-[16px] lg:text-[20px] xl:text-[34px] 2xl:text-[36px] text-white">
                                    {item.title}
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-4 sm:gap-x-4 lg:gap-x-4 xl:gap-x-4 2xl:gap-x-3.5">
                                    {item.bullets.map((bullet, index) => (
                                        <span
                                            key={index}
                                            className="flex items-center gap-2 font-poppins font-semibold text-white text-[10px] sm:text-[11px] lg:text-[10px] xl:text-[12px] 2xl:text-[16px]"
                                        >
                                            • {bullet}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>


                        <div className="flex justify-between sm:gap-[6px] lg:gap-[10px] xl:gap-[14px] 2xl:gap-[17px] mt-[30px]">
                            {/* SESSION PLAN */}
                            <div>
                                <h3 className="font-poppins text-[10px] sm:text-[12px] lg:text-[14px] xl:text-[20px] 2xl:text-[24px] font-bold text-black-100">{item.titles}</h3>
                                <div>
                                    {item.sessions.map((session, idx) => (
                                        <div key={idx} className="flex items-center gap-2 sm:gap-2 lg:gap-3 xl:gap-3 2xl:gap-4 mt-[12px]">
                                            <p className="bg-green-100 text-white text-[10px] sm:text-[8px] lg:text-[9px] xl:text-[11px] 2xl:text-[16px] w-[70px] sm:w-[100px] lg:w-[125px] xl:w-[140px] xl:p-3 2xl:p-0 2xl:w-[131px] h-[56px] rounded-lg font-poppins font-bold text-center flex items-center justify-center shadow-lg" style={{ boxShadow: "#00000040" }}>
                                                {session.name}
                                            </p>
                                            <p className="font-poppins text-[9px] sm:text-[8px] lg:text-[10px] xl:text-[11px] 2xl:text-[14px] font-normal text-black-100 text-wrap max-w-[120px] sm:max-w-[100px] lg:max-w-[132px] xl:max-w-[150px] 2xl:max-w-[190px]">{session.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* IMPACT & OUTCOME */}
                            <div className="flex justify-between flex-col w-[100px] sm:w-[200px] lg:w-[260px] xl:w-[262px] 2xl:w-[300px]">
                                <div className="bg-green-100 px-[12px] py-[12px] sm:px-[16px] sm:py-[14px] lg:px-[18px] lg:py-[16px] xl:px-[20px] xl:py-[18px] 2xl:px-[28px] 2xl:py-[21px] rounded-lg xl:h-[8.9rem] 2xl:h-[10.5rem]">
                                    <h4 className="font-bold font-poppins text-black-100 text-[12px] sm:text-[16px]">{item.impact.title}</h4>
                                    <p className="mt-[4px] sm:mt-[6px] xl:mt-[10px] 2xl:mt-[17px] font-poppins font-normal text-[8px] text-black-100 sm:text-[8px] lg:text-[10px] xl:text-[12px] 2xl:text-[16px]">{item.impact.description}</p>
                                </div>
                                <div className="btn-gradient-border rounded-lg xl:h-[10.2rem] 2xl:h-[10.5rem]">
                                    <div className="px-[12px] py-[12px] sm:px-[16px] sm:py-[14px] lg:px-[18px] lg:py-[16px] xl:px-[20px] xl:py-[18px] 2xl:px-[28px] 2xl:py-[21px]">
                                        <h4 className="font-bold font-poppins text-black-100 text-[12px] sm:text-[16px]" style={{ boxShadow: "#00000040" }}>{item.outcome.title}</h4>
                                        <p className="mt-[4px] sm:mt-[6px] xl:mt-[10px] 2xl:mt-[17px] font-poppins font-normal text-[8px] text-black-100 sm:text-[8px] lg:text-[10px] xl:text-[12px] 2xl:text-[16px]">{item.outcome.description}</p>
                                    </div>
                                </div>
                            </div>
                            {/* REVIEW */}
                            <div className="bg-custom-green-gradient pr-[12px] pl-[12px] sm:pr-[14px] sm:pl-[14px] lg:pr-[16px] lg:pl-[16px] xl:pl-[20px] 2xl:pl-[0px] xl:pr-[20px] 2xl:pr-[28px] sm:w-[400px] lg:w-[400px] xl:w-[420px] 2xl:w-[430px] rounded-3xl relative hidden sm:block">
                                <Image
                                    src={item.review.image}
                                    alt="review"
                                    width={163}
                                    height={164}
                                    className="rounded-full absolute top-[-20px] sm:left-[43%] lg:left-[42%] xl:left-1/2 transform -translate-x-1/2 sm:w-[70px] sm:h-[70px] lg:w-[100px] lg:h-[100px] xl:w-[100px] xl:h-[100px] 2xl:w-[140px] 2xl:h-[140px]"
                                />
                                <div className="flex justify-end pt-[24px]">
                                    <div className="flex items-center gap-2 hover:underline cursor-pointer hover:decoration-white text-[10px] sm:text-[10px] lg:text-[13px]">
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
                                        className="absolute sm:w-[20px] lg:w-[25px] xl:w-[30px] 2xl:w-[40px] xl:left-[35px] 2xl:left-[55px] top-[-25px]"
                                    />
                                    <h4 className="text-lg font-bold text-center text-white mt-[140px] sm:text-[12px]">{item.review.person}</h4>
                                    <div className="flex justify-center">
                                        <div className="sm:max-w-[350px] xl:max-w-[320px] 2xl:max-w-[330px]">
                                            <p className="text-center text-white font-poppins font-normal sm:text-[8px] lg:text-[10px] xl:text-[12px] 2xl:text-[16px]">{item.review.quote}</p>
                                        </div>
                                    </div>
                                </div>
                                <Image
                                    src={item.review.imagetwo}
                                    alt="review"
                                    width={163}
                                    height={164}
                                    className="absolute sm:w-[20px] lg:w-[25px] xl:w-[30px] 2xl:w-[40px] right-[30px] bottom-[-10px]"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Case;