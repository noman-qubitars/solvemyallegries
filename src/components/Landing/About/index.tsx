"use client";

import React from "react";
import Image from "next/image";
import { appfeatures } from "@/data/Landing";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const About: React.FC = () => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div id="feature-section" className="mt-[70px]">
            <p className="text-center font-poppins font-bold text-[44px] text-green">
                App Features
            </p>
            <div className="overflow-hidden mt-[81px] relative pb-[135px]">
                <div className="absolute left-0 top-[10px] z-0">
                    <Image
                        src='/images/background-simple.png'
                        alt='feature'
                        width={128}
                        height={128}
                        className="object-cover"
                    />
                </div>
                <Slider {...settings}>
                    {appfeatures.map((feature, index) => (
                        <div
                            key={feature.id}
                            className={`flex justify-center z-10 relative
                          ${index === 0 || index === 4 ? "pl-0" : "md:pl-0 lg:pl-3"} 
                          ${index === 3 || index === 7 ? "md:pr-3 lg:pr-0" : "sm:pr-3"}
                        `}
                        >
                            <div
                                className="flex flex-col justify-between items-center text-center bg-white rounded-2xl px-12 sm:px-8 md:px-3 lg:px-3 xl:px-11 2xl:px-16 py-16 w-full h-full min-h-[400px] border border-black-50"
                            >
                                <Image
                                    src={feature.image}
                                    alt={feature.title}
                                    width={128}
                                    height={128}
                                    className="w-[128px] h-[128px]"
                                />
                                <h3 className="font-poppins font-semibold text-lg text-green mt-4 max-w-[200px] flex-grow">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-500 font-poppins font-medium">
                                    {feature.desp}
                                </p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="container mx-auto mt-4 px-2 sm:px-0">
                <p className="text-green font-poppins font-bold text-[26px] sm:text-[44px]">How does This App Work?</p>
                <div className="flex justify-center">
                    <div className="relative">
                        {/* Image Mockup */}
                        <Image
                            src='/images/mockup.svg'
                            alt='mockup'
                            width={532}
                            height={1076}
                            className="w-[160px] sm:w-[250px] md:w-[350px] lg:w-[400px] xl:w-[532px]"
                        />

                        {/* Motivational Quote */}
                        <div className="absolute top-[13.5%] right-[-90px] sm:right-[-170px] md:right-[-170px] lg:right-[-270px] xl:right-[-300px] text-green text-[12px] sm:text-[18px] md:text-[20px] lg:text-[28px] xl:text-[32px] font-circular font-bold">
                            Motivational Quote
                        </div>
                        <Image
                            src='/images/connector_line.png'
                            alt='mockup'
                            width={163}
                            height={95}
                            className="absolute top-[18%] right-[-60px] sm:right-[-110px] w-[80px] sm:w-[132px] md:w-[163px]"
                        />

                        {/* Daily Mood Tracker */}
                        <div className="absolute top-[24.5%] left-[-90px] sm:left-[-175px] md:left-[-195px] lg:left-[-260px] xl:left-[-300px] text-green text-[12px] sm:text-[18px] md:text-[20px] lg:text-[28px] xl:text-[32px] font-circular font-bold">
                            Daily Mood Tracker
                        </div>
                        <Image
                            src='/images/connector_line_one.png'
                            alt='mockup'
                            width={163}
                            height={95}
                            className="absolute top-[29%] left-[-65px] sm:left-[-115px] w-[80px] sm:w-[138px] md:w-[163px]"
                        />

                        {/* Symptom Tracker */}
                        <div className="absolute top-[37%] right-[-90px] sm:right-[-170px] md:right-[-200px] lg:right-[-300px] xl:right-[-335px] text-green text-[12px] sm:text-[18px] md:text-[20px] lg:text-[28px] xl:text-[32px] font-circular font-bold">
                            Symptom Tracker
                        </div>
                        <Image
                            src='/images/connector_line_two.png'
                            alt='mockup'
                            width={163}
                            height={95}
                            className="absolute top-[38.6%] sm:top-[38%] right-[2px] sm:right-[-20px] md:right-[-35px] lg:right-[-70px] w-[30px] sm:w-[60px] md:w-[90px] lg:w-[163px]"
                        />

                        {/* Supplement Reminder */}
                        <div className="absolute top-[45%] left-[-99px] sm:left-[-180px] md:left-[-190px] lg:left-[-270px] xl:left-[-330px] text-green text-[11.5px] sm:text-[18px] md:text-[20px] lg:text-[28px] xl:text-[32px] font-circular font-bold">
                            Supplement Reminder
                        </div>
                        <Image
                            src='/images/connector_line_three.png'
                            alt='mockup'
                            width={163}
                            height={95}
                            className="absolute top-[51.5%] sm:top-[51.5%] md:top-[49.5%] left-[-62px] sm:left-[-112px] w-[80px] sm:w-[137px] md:w-[163px]"
                        />

                        {/* Session Tracker */}
                        <div className="absolute bottom-[21%] sm:bottom-[21%] md:bottom-[23%] lg:bottom-[25%] xl:bottom-[26.5%] left-[-90px] sm:left-[-180px] md:left-[-180px] lg:left-[-250px] text-green text-[12px] sm:text-[18px] md:text-[20px] lg:text-[28px] xl:text-[32px] font-circular font-bold">
                            Session Tracker
                        </div>
                        <Image
                            src='/images/connector_line_four.png'
                            alt='mockup'
                            width={163}
                            height={95}
                            className="absolute top-[64.5%] left-[-62px] sm:left-[-112px] w-[80px] sm:w-[137px] md:w-[163px]"
                        />

                        {/* Progress Level */}
                        <div className="absolute bottom-[19.5%] sm:bottom-[19.5%] md:bottom-[21%] lg:bottom-[23%] xl:bottom-[27%] right-[-90px] sm:right-[-160px] md:right-[-200px] lg:right-[-280px] text-green text-[12px] sm:text-[18px] md:text-[20px] lg:text-[28px] xl:text-[32px] font-circular font-bold">
                            Progress Level
                        </div>
                        <Image
                            src='/images/connector_line_five.png'
                            alt='mockup'
                            width={163}
                            height={95}
                            className="absolute top-[59.8%] right-[-65px] sm:right-[-115px] w-[80px] sm:w-[137px] md:w-[163px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;