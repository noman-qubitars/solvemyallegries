"use client";

import Image from "next/image";
import { FaLessThan } from "react-icons/fa6";
import Link from "next/link";
import { MdOutlineLock } from "react-icons/md";
import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

const NewPassword = () => {
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();
    const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push("/");
    };

    return (
        <div className="max-w-4xl mx-auto flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="flex justify-center my-3">
                    <Image src="/images/logo.svg" alt="Logo" width={245} height={68} />
                </div>
                <div className="text-center mb-4">
                    <p
                        className="text-[27px] lg:text-[31px] font-extrabold mb-2"
                        style={{ wordSpacing: "-0.10em" }}>
                        Enter New Password.
                    </p>
                    <p className="text-base yext-bold text-gray-600">
                        The greatest investment you can make is in yourself
                    </p>
                </div>
                <form className=" w-full py-3" onClick={handleResetPassword}>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-1 ms-3">New Password</label>
                        <div className="relative flex justify-center items-center">
                            <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <MdOutlineLock />
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="********"
                                className="w-[355px] lg:w-[400px] mx-auto border border-gray-300 rounded-full h-10 px-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 placeholder:align-middle"
                            />
                            <span
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                            >
                                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                            </span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-1 ms-3">Re enter New Password</label>
                        <div className="relative flex justify-center items-center">
                            <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <MdOutlineLock />
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="********"
                                className="w-[355px] lg:w-[400px] mx-auto border border-gray-300 rounded-full h-10 px-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 placeholder:align-middle"
                            />
                            <span
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                            >
                                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                            </span>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-[355px] lg:w-[400px] mx-auto cursor-pointer bg-green-900 text-white py-2 rounded-full hover:bg-green-900 transition duration-200 flex items-center justify-center gap-2"
                    >
                        Reset Password <span> <MdOutlineLock /></span>
                    </button>
                    <Link href="/">
                        <div className="flex items-center text-sm font-bold text-green-900 justify-center mt-6">
                            <span className="me-3"><FaLessThan /></span>
                            <p> Back to login screen</p>
                        </div>
                    </Link>
                </form>
            </div>
        </div>
    )
}
export default NewPassword;