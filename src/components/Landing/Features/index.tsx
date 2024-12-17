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
                className="absolute right-0 top-[-200px] w-[100px]"
            />
            <p className="text-center font-poppins font-bold text-[44px] text-green">
                Other Features
            </p>
            <div className="relative z-10">
                {/* Background Ellipse Image (Backwards) */}
                <div className="absolute top-[-360px] left-[190px] z-0">
                    <Image
                        src='/images/ellipse.png'
                        alt='mockup'
                        width={1259}
                        height={932}
                        className="w-[1259px]"
                    />
                </div>

                {/* Feature Two Image (Second Layer - Backwards) */}
                <div className="absolute top-[-100px] right-0 z-10">
                    <Image
                        src='/images/feature_two.svg'
                        alt='mockup'
                        width={900}
                        height={932}
                        className="h-[932px] w-[900px]"
                    />
                </div>

                {/* Feature One Image */}
                <div className="absolute top-[-100px] left-0 z-40">
                    <Image
                        src='/images/feature_one.svg'
                        alt='mockup'
                        width={700}
                        height={932}
                        className="h-[932px] w-[900px]"
                    />
                </div>

                {/* Centered Feature Image (Topmost Layer) */}
                <div className="absolute top-[-460px] left-1/2 transform -translate-x-1/2 z-30">
                    <Image
                        src='/images/feature.svg'
                        alt='mockup'
                        width={700}
                        height={932}
                        className="h-[932px] w-[900px]"
                    />
                </div>

                {/* Background Section */}
                <div className="h-[511px] w-full bg-[url('/images/feature_bg.svg')] bg-cover bg-center mt-[490px]" />
            </div>
            <div className="container mx-auto mt-[26rem]">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <Image
                            src='/images/get.svg'
                            alt='mockup'
                            width={441}
                            height={348}
                            className=""
                        />
                    </div>
                    <div>
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