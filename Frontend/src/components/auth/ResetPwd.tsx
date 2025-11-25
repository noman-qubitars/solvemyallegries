import Image from "next/image";
import { FaRegEnvelope } from "react-icons/fa6";
import { MdOutlineLock } from "react-icons/md";
import Link from "next/link";
const ResetPwd = () => {
    return (
        <div className="max-w-4xl mx-auto flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="flex justify-center my-3 ">
                    <Image src="/images/logo.svg" alt="Logo" width={245} height={68} />
                </div>
                <p
                    className="text-[27px] lg:text-[31px] font-extrabold text-center mb-2"
                    style={{ wordSpacing: "-0.10em" }}>
                    Reset Your Password.
                </p>
                <p className="text-base text-gray-600 leading-7 font-normal text-center mt-2">Forgot your password? No worries, then let’s submit password reset. It will be send to your email.</p>
                <div className="my-5">
                    <label className="block text-sm font-bold mb-2 ms-4">Email Address</label>
                    <div className="relative flex justify-center items-center">
                        <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <FaRegEnvelope />
                        </span>
                        <input
                            type="email"
                            placeholder="email@email.com"
                            className="border border-gray-300 w-[355px] lg:w-[400px] mx-auto rounded-full px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                    </div>
                </div>
                <Link href="/otpscreen"
                    className="flex justify-center items-center bg-green-900 text-white py-2 rounded-full hover:bg-green-900 transition duration-200 flex items-center justify-center gap-2"> Reset Password <span> <MdOutlineLock /></span>
                </Link>
            </div>
        </div>
    )
}
export default ResetPwd