"use client";

import React, { useState } from "react";
import Image from "next/image";
import { testimonials } from "@/data/Landing";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonial: React.FC = () => {

    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        centerMode: true,
        centerPadding: "20%",
        arrows: false,
        beforeChange: (current: number, next: number) => {
            setCurrentSlide(next); 
        },
    };


    return (
        <div>
            <p className="mt-[50px] font-poppins font-extrabold text-[36px] text-center text-green" style={{ boxShadow: "#00000040" }}>
                Testimonials
            </p>
            <Slider {...settings}>
                {testimonials.map((item, index) => (
                    <div
                        key={item.id}
                        className={`transition-all duration-500 px-6 mt-[47px] ${currentSlide === index ? "scale-110 z-10" : "scale-95 opacity-80"
                            }`}
                    >
                        <div
                            className={`bg-white-100 rounded-[50px] py-[41px] px-[38px] shadow-lg ${currentSlide === index ? "shadow-3xl" : "shadow-md mt-12"
                                } relative`}
                        >
                            {/* Center Border */}
                            <div className="gradient-border">
                                <div className="flex justify-between">
                                    <Image
                                        src={item.image}
                                        alt="review"
                                        width={36}
                                        height={26}
                                        className="w-[36px] h-[26px]"
                                    />
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={item.imagestar}
                                            alt="review"
                                            width={140}
                                            height={28}
                                            className="w-[140px] h-[28px]"
                                        />
                                        <div className="flex items-center gap-1">
                                            <p className="font-poppins font-semibold text-[20px] text-green-150">
                                                {item.ranking}
                                            </p>
                                            <p className="font-poppins font-normal text-green-150">
                                                {item.rating}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <p className="font-poppins font-light italic leading-[38px] text-green-200 mt-[8px] text-center">
                                    {item.desp}
                                </p>
                                <div className="flex justify-center flex-col items-center gap-3 mt-[14px]">
                                    <Image
                                        src={item.imageperson}
                                        alt="review"
                                        width={80}
                                        height={77}
                                        className="w-[80px] h-[77px]"
                                    />
                                    <p className="font-poppins text-[19px] font-medium text-center text-gray-50">
                                        {item.author}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>

        </div>
    );
};

export default Testimonial;