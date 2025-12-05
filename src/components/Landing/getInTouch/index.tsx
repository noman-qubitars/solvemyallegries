"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';


interface FormData {
    fullName: string;
    email: string;
    message: string;
}

const JoinUs: React.FC = () => {

    const router = useRouter();

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
        console.log("Form submitted:", formData);
        setSubmitted(true);
    };

    return (
        <div className="container mx-auto mt-[8rem] sm:mt-[10rem] lg:mt-[12rem]" id="contact-section">
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-3">
                <div className="flex justify-center sm:flex sm:justify-center">
                    <Image
                        src='/images/get.svg'
                        alt='mockup'
                        width={441}
                        height={348}
                        className=""
                    />
                </div>
                <div className="container px-4 sm:px-16 xl:my-[80px]">
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
                            className="border border-gray-100 placeholder-gray text-black outline-none px-[10px] xl:px-[16px] lg:px-[14px] md:px-[12px] sm:px-[10px] py-[10px] xl:py-[16px] lg:py-[14px] md:py-[12px] sm:py-[10px] w-full rounded-full"
                        />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                            className="border border-gray-100 placeholder-gray text-black outline-none px-[10px] xl:px-[16px] lg:px-[14px] md:px-[12px] sm:px-[10px] py-[10px] xl:py-[16px] lg:py-[14px] md:py-[12px] sm:py-[10px] w-full rounded-full"
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
                                className="bg-green cursor-pointer rounded-full w-[230px] sm:w-[311px] h-[45px] sm:h-[56px] text-center font-bold text-white font-poppins"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                    {submitted && <p className="mt-4 text-center">Thank you for your message!</p>}
                </div>

            </div>
            <div className="flex justify-center xl:mt-[64px] lg:mt-[58px] md:mt-[52px] sm:mt-[46px] mt-[42px]">
                <button className="bg-text-gradient-green w-[270px] cursor-pointer sm:w-[358px] h-[50px] sm:h-[56px] font-poppins font-bold text-lg sm:text-[24px] text-white rounded-full" onClick={() => router.push('/webinar/subscription')}>
                    Get App Now
                </button>
            </div>
        </div>
    )

}
export default JoinUs;