"use client";

import React, { useState } from "react";
import Image from "next/image";

interface FormData {
    fullName: string;
    email: string;
    message: string;
}

const Features: React.FC = () => {

    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Here you can handle the form submission logic (e.g., send data to an API)
        console.log("Form submitted:", formData);
        setSubmitted(true);
    };

    return (
        <div className="relative">
            <Image
                src='/images/group.png'
                alt='mockup'
                width={163}
                height={95}
                className="absolute right-0 top-[-70px] sm:top-[-100px] md:top-[-200px] w-[30px] sm:w-[50px] md:w-[100px]"
            />
            <p className="text-center font-poppins font-bold text-[44px] text-green">
                Other Features
            </p>
            <div className="relative z-10">
                {/* Background Ellipse Image (Backwards) */}
                <div className="absolute top-[-25px] sm:top-[-62px] md:top-[-105px] lg:top-[-160px] xl:top-[-295px] 2xl:top-[-360px] left-[20px] sm:left-[44px] md:left-[40px] lg:left-[50px] xl:left-[70px] 2xl:left-[190px] z-0">
                    <Image
                        src='/images/ellipse.png'
                        alt='mockup'
                        width={1259}
                        height={932}
                        className="w-[350px] sm:w-[590px] md:w-[720px] lg:w-[950px] xl:w-[1150px] 2xl:w-[1259px]"
                    />
                </div>

                {/* Feature Two Image (Second Layer - Backwards) */}
                <div className="absolute top-[-320px] sm:top-[-250px] md:top-[-250px] lg:top-[-170px] xl:top-[-100px] right-[2rem] sm:right-[4rem] md:right-[4rem] lg:right-[4rem] xl:right-0 z-10">
                    <Image
                        src='/images/feature_two.svg'
                        alt='mockup'
                        width={900}
                        height={932}
                        className="h-[932px] w-[130px] sm:w-[220px] md:w-[270px] lg:w-[350px] xl:w-[650px] 2xl:w-[900px]"
                    />
                </div>

                {/* Feature One Image */}
                <div className="absolute top-[-320px] sm:top-[-250px] md:top-[-250px] lg:top-[-170px] xl:top-[-100px] left-[2rem] sm:left-[4rem] md:left-[4rem] lg:left-[4rem] xl:left-0 z-40">
                    <Image
                        src='/images/feature_one.svg'
                        alt='mockup'
                        width={700}
                        height={932}
                        className="h-[932px] w-[130px] sm:w-[220px] md:w-[270px] lg:w-[350px] xl:w-[650px] 2xl:w-[900px]"
                    />
                </div>

                {/* Centered Feature Image (Topmost Layer) */}
                <div className="absolute top-[-425px] sm:top-[-420px] md:top-[-420px] lg:top-[-460px] left-1/2 transform -translate-x-1/2 z-30">
                    <Image
                        src='/images/feature.svg'
                        alt='mockup'
                        width={700}
                        height={932}
                        className="h-[932px] w-[130px] sm:w-[220px] md:w-[270px] lg:w-[350px] xl:w-[650px] 2xl:w-[900px]"
                    />
                </div>

                {/* Background Section */}
                <div className="h-[220px] sm:h-[350px] md:h-[400px] lg:h-[511px] w-full bg-[url('/images/feature_bg.svg')] bg-cover bg-center mt-[120px] sm:mt-[200px] md:mt-[250px] lg:mt-[380px] xl:mt-[490px]" />
            </div>
            <div className="container mx-auto mt-[8rem] sm:mt-[18rem] lg:mt-[26rem]" id="contact-section">
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 sm:gap-6 lg:gap-3">
                    <div className="flex justify-center sm:flex sm:justify-center">
                        <Image
                            src='/images/get.svg'
                            alt='mockup'
                            width={441}
                            height={348}
                            className=""
                        />
                    </div>
                    <div className="px-2 sm:px-0">
                        <p className="text-green font-poppins text-[32px] font-semibold text-center">
                            Get In <span className="text-gradient-green">Touch</span>
                        </p>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-[24px] mt-[34px]">
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Name"
                                required
                                className="border border-gray-100 placeholder-gray text-black outline-none px-[16px] py-[16px] w-full rounded-full"
                            />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                                className="border border-gray-100 placeholder-gray text-black outline-none px-[16px] py-[16px] w-full rounded-full"
                            />
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Write a message"
                                required
                                className="border border-gray-100 placeholder-gray text-black outline-none px-[16px] py-[16px] w-full rounded-3xl"
                            />
                            <div className="flex justify-center mt-[24px]">
                                <button
                                    type="submit"
                                    className="bg-green rounded-full w-[311px] h-[56px] text-center font-bold text-white font-poppins"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                        {submitted && <p className="mt-4">Thank you for your message!</p>}
                    </div>
                </div>
                <div className="flex justify-center mt-[64px]">
                    <button className="bg-text-gradient-green w-[358px] h-[56px] font-poppins font-bold text-[24px] text-white rounded-full">
                        Get App Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Features;