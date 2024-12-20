"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GoPerson } from "react-icons/go";
import { MdOutlineMail } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const Subscription: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        // Disable scrolling when modal is open
        if (isModalOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        // Cleanup on unmount
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isModalOpen]);


    return (
        <div className="relative">
            <div className="container mx-auto pt-[145px] grid grid-cols-2 gap-2">
                <div>
                    <p className="text-gradient-green font-poppins font-semibold text-[32px]">
                        One-Time Payment
                    </p>
                    <p className="text-green font-poppins font-normal mt-[32px]">
                        Add Personal Details
                    </p>
                    <form className="mt-[12px]">
                        <div className="space-y-4">
                            <div className=" border border-gray-100 rounded-xl px-4 py-4 flex items-center gap-3">
                                <GoPerson className="text-gray-100" />
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="w-full outline-none border-none placeholder-gray-100"
                                />
                            </div>
                            <div className=" border border-gray-100 rounded-xl px-4 py-4 flex items-center gap-3">
                                <GoPerson className="text-gray-100" />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="w-full outline-none border-none placeholder-gray-100"
                                />
                            </div>
                            <div className=" border border-gray-100 rounded-xl px-4 py-4 flex items-center gap-3">
                                <MdOutlineMail className="text-gray-100" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full outline-none border-none placeholder-gray-100"
                                />
                            </div>
                            <div className="relative">
                                <select
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-transparent focus:outline-none text-gray-100"
                                >
                                    <option value="+1">+1</option>
                                    <option value="+44">+44</option>
                                    <option value="+91">+91</option>
                                </select>
                                <input
                                    type="tel"
                                    placeholder="Enter Phone number"
                                    className="w-full p-4 pl-20 border border-gray-100 rounded-lg outline-none"
                                />
                            </div>
                        </div>

                        <p className="text-green font-poppins font-normal mt-[24px] mb-[12px]">
                            Add Payment Details
                        </p>
                        <div className="space-y-4">
                            <div className=" border border-gray-100 rounded-xl px-4 py-4 flex items-center gap-3">
                                <input
                                    type="text"
                                    placeholder="1234 1234 1234 1234"
                                    className="w-full outline-none border-none placeholder-gray-100"
                                />
                                <Image
                                    src='/images/mastercard.png'
                                    alt='mockup'
                                    width={32}
                                    height={20}
                                    className=""
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="MM / YY"
                                    className="w-full p-4 border border-gray-100 rounded-xl outline-none"
                                />
                                <input
                                    type="text"
                                    placeholder="CVC"
                                    className="w-full p-4 border border-gray-100 rounded-xl outline-none"
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-[12px] mt-[32px]">
                            <button
                                type="button"
                                className="w-[400px] h-[56px] border border-gray-100 rounded-xl text-gray-150 text-center font-poppins font-normal"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={toggleModal}
                                className=" bg-green text-white rounded-lg h-[56px] text-center font-extrabold font-poppins w-full"
                            >
                                Subscribe Now
                            </button>
                        </div>
                        <p className="font-poppins font-normal text-gray-150 mt-[24px]">
                            By providing your card information, you agree with Terms and Conditions
                        </p>
                    </form>
                </div>
                <div className="flex items-center justify-center">
                    <Image
                        src='/images/sub.svg'
                        alt='mockup'
                        width={495}
                        height={406}
                        className="w-[495px] h-[406px]"
                    />
                </div>
            </div>
            <div className="relative mb-[130px]">
                <Image
                    src='/images/sub_white.png'
                    alt="admin"
                    width={1183}
                    height={560}
                    className="absolute right-0 top-[-150px] w-[200px] h[200px]"
                />
            </div>
            <Image
                src='/images/sub_left.png'
                alt='mockup'
                width={495}
                height={406}
                className="absolute top-[320px] w-[40px]"
            />

            {/* Modal */}
            {isModalOpen && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleModal}></div>
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="w-[600px] h-[600px] rounded-[24px] pt-[29px] bg-white shadow-2xl relative">
                            <div className="flex justify-end pr-[29px]">
                                <RxCross2
                                    className="text-green cursor-pointer text-[20px]"
                                    onClick={toggleModal}
                                />
                            </div>
                            <div className="bg-[url('/images/modal_wish.svg')] bg-cover bg-center h-[450px] mx-[80px]">
                                <p className="uppercase font-poppins font-bold text-[44px] text-gradient-green pt-[5rem]">
                                    congratulations
                                </p>
                                <div className="bg-green py-[17px] mt-[20px] absolute top-[13rem] w-full left-0">
                                    <div className="max-w-[29rem] mx-auto">
                                        <p className="text-center font-poppins font-normal text-[14px] leading-[21px] text-white">
                                            Please check your email for details and confirmation of your subscription.
                                            We&apos;re excited to support you on your wellness journey with{' '}
                                            <span className="font-bold">SaveMyAllergies!</span>
                                        </p>
                                    </div>
                                </div>
                                <Image
                                    src="/images/modal_left.svg"
                                    alt="admin"
                                    width={391}
                                    height={354}
                                    className="absolute left-0 w-[50px] h-[200px]"
                                />
                                <Image
                                    src="/images/modal_right.svg"
                                    alt="admin"
                                    width={391}
                                    height={354}
                                    className="absolute right-0 w-[50px] h-[200px]"
                                />
                                <div className="flex justify-center mt-[140px]">
                                    <Image
                                        src="/images/modal_person.svg"
                                        alt="admin"
                                        width={391}
                                        height={354}
                                        className="w-[390px] h-[200px]"
                                    />
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full">
                                <Image
                                    src="/images/modal_vector.svg"
                                    alt="Footer Wave"
                                    width={1920}
                                    height={300}
                                    className="w-full object-cover opacity-5"
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Subscription;