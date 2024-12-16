"use client";

import React from "react";
import Image from "next/image";
import { appfeatures } from "@/data/Landing";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const About: React.FC = () => {

    const settings = {
        dots: false, // Show navigation dots
        infinite: true, // Infinite loop
        speed: 500, // Slide transition speed
        slidesToShow: 4, // Show 4 cards per slide
        slidesToScroll: 4, // Scroll 4 cards at a time
        autoplay: true, // Autoplay slides
        autoplaySpeed: 3000, // Duration per slide
        responsive: [
            {
                breakpoint: 1024, // For medium devices
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 768, // For small devices
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480, // For extra small devices
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };


    return (
        <div className="mt-[70px]">
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
                          ${index === 0 || index === 4 ? "pl-0" : "pl-3"} 
                          ${index === 3 || index === 7 ? "pr-0" : "pr-3"}
                        `}
                        >
                            <div
                                className="flex flex-col justify-between items-center text-center bg-white rounded-2xl px-16 py-16 w-full h-full min-h-[400px] border border-black-50"
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
            <div className="container mx-auto mt-4">
                <p className="text-green font-poppins font-bold text-[44px]">How does This App Work?</p>
                {/* <div className="flex justify-center mt-8">
                    <Image
                        src='/images/mockup.png'
                        alt='mockup'
                        width={532}
                        height={1076}
                        className=""
                    />
                </div> */}
                <div className="flex justify-center mt-8">
                    <div className="relative">
                        {/* Image Mockup */}
                        <Image
                            src='/images/mockup.png'
                            alt='mockup'
                            width={532}
                            height={1076}
                            className=""
                        />

                        {/* Motivational Quote */}
                        <div className="absolute top-[8%] right-[-300px] text-green text-[32px] font-circular font-bold">
                            Motivational Quote
                        </div>
                        <Image
                            src='/images/connector_line.png'
                            alt='mockup'
                            width={163}
                            height={95}
                            className="absolute top-[13%] right-[-160px]"
                        />

                        {/* Daily Mood Tracker */}
                        <div className="absolute top-[18%] left-[-300px] text-green text-[32px] font-circular font-bold">
                            Daily Mood Tracker
                        </div>
                        <Image
                            src='/images/connector_line_one.png'
                            alt='mockup'
                            width={163}
                            height={95}
                            className="absolute top-[23%] left-[-160px]"
                        />

                        {/* Symptom Tracker */}
                        <div className="absolute top-[34.8%] right-[-370px] text-green text-[32px] font-circular font-bold">
                            Symptom Tracker
                        </div>
                        <Image
                            src='/images/connector_line_two.png'
                            alt='mockup'
                            width={163}
                            height={95}
                            className="absolute top-[35.5%] right-[-105px]"
                        />

                        {/* Supplement Reminder */}
                        <div className="absolute top-[46%] left-[-330px] text-green text-[32px] font-circular font-bold">
                            Supplement Reminder
                        </div>
                        <Image
                            src='/images/connector_line_three.png'
                            alt='mockup'
                            width={163}
                            height={95}
                            className="absolute top-[50.5%] left-[-155px]"
                        />

                        {/* Session Tracker */}
                        <div className="absolute bottom-[23%] left-[-250px] text-green text-[32px] font-circular font-bold">
                            Session Tracker
                        </div>
                        <Image
                            src='/images/connector_line_four.png'
                            alt='mockup'
                            width={163}
                            height={95}
                            className="absolute top-[68%] left-[-155px]"
                        />

                        {/* Progress Level */}
                        <div className="absolute bottom-[23.5%] right-[-280px] text-green text-[32px] font-circular font-bold">
                            Progress Level
                        </div>
                        <Image
                            src='/images/connector_line_five.png'
                            alt='mockup'
                            width={163}
                            height={95}
                            className="absolute top-[62.5%] right-[-155px]"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;