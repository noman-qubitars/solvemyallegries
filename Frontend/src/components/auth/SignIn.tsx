"use client";
import { useState } from "react";
import Image from "next/image";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FaRegEnvelope } from "react-icons/fa6";
import { MdOutlineLock } from "react-icons/md";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignIn = () => {
  
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="px-1">
      {/* Logo */}
      <div className="flex justify-center my-3">
        <Image src="/images/logo.svg" alt="Logo" width={245} height={68} />
      </div>
      {/* Heading */}
      <div className="text-center mb-4">
        <p
          className="text-[27px] lg:text-[31px] font-extrabold mb-2"
          style={{ wordSpacing: "-0.10em" }}>
          Sign In To Your Account.
        </p>
        <p className="text-base ext-bold text-gray-600">
          The greatest investment you can make is in Yourself
        </p>
      </div>

      {/* Form */}
      <form className=" w-full py-3" onSubmit={handleSignIn}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1 ms-7">Email Address</label>
          <div className="relative flex justify-center items-center">
            <span className="absolute left-9 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaRegEnvelope />
            </span>
            <input
              type="email"
              placeholder="email@email.com"
              className="border border-gray-300 w-[355px] lg:w-[400px] mx-auto rounded-full px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1 ms-7">Password</label>
          <div className="relative flex justify-center items-center">
            {/* Lock Icon */}
            <span className="absolute left-9 top-1/2 transform -translate-y-1/2 text-gray-400">
              <MdOutlineLock />
            </span>

            {/* Input */}
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className="w-[355px] lg:w-[400px] mx-auto border border-gray-300 rounded-full h-10 px-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 placeholder:align-middle"
            />

            {/* Toggle Show/Hide Icon */}
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-9 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            >
              {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 mx-7 text-sm">
          <label className="inline-flex items-center">
            <input type="checkbox" className="mr-2 bg-green-900 text-green-900" />
            Remember Me
          </label>
          <Link href="/resetpwd" className="text-green-900 hover:underline">
            Forgot Password
          </Link>
        </div>

        <button
          type="submit"
          className="w-[355px] lg:w-[400px] mx-auto bg-green-900 cursor-pointer text-white py-2 rounded-full hover:bg-green-900 transition duration-200 flex items-center justify-center gap-2"
        >
          Sign In <span><FaArrowRightFromBracket />
          </span>
        </button>
      </form>
    </div>
  );
};

export default SignIn;
