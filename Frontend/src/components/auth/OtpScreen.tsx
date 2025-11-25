"use client";
// import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaLessThan } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
const OtpScreen = () => {
    // const inputRefs = useRef([]);
    // const [secondsLeft, setSecondsLeft] = useState(120); 

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    //     const value = e.target.value;
    //     // Allow only digits 0-9
    //     if (!/^[0-9]?$/.test(value)) {
    //         e.target.value = "";
    //         return;
    //     }
    //     e.target.value = value;
    //     if (value.length === 1 && index < inputRefs.current.length - 1) {
    //         inputRefs.current[index + 1].focus();
    //     }
    // };

    // const handleKeyDown = (e, index) => {
    //     if (e.key === "Backspace" && !e.target.value && index > 0) {
    //         inputRefs.current[index - 1].focus();
    //     }
    // };

    // // Countdown Timer Logic
    // useEffect(() => {
    //     if (secondsLeft <= 0) return;

    //     const timer = setInterval(() => {
    //         setSecondsLeft((prev) => prev - 1);
    //     }, 1000);

    //     return () => clearInterval(timer);
    // }, [secondsLeft]);

    // const handleResendOTP = () => {
    //     // You can trigger actual API here to resend OTP
    //     console.log("OTP resent!");
    //     setSecondsLeft(120); // restart the countdown
    // };

    // const formatTime = (sec) => {
    //     const minutes = Math.floor(sec / 60);
    //     const seconds = sec % 60;
    //     return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    // };


    return (
        <div className="bg-[#F8FAFC] flex items-center justify-center px-4">
            <div className="w-full max-w-md text-center">
                {/* Logo */}
                <div className="flex justify-center my-4">
                    <Image src="/images/logo.svg" alt="Logo" width={245} height={68} />
                </div>

                {/* Heading */}
                <h2
                    className="text-[27px] lg:text-[31px] font-extrabold mb-2"
                    style={{ wordSpacing: "-0.1em" }}
                >
                    Verify OTP.
                </h2>
                <p className="text-base text-gray-600 my-6">
                    We’ve sent a one-time password (OTP) to your email. <br />
                    Please enter it below to verify your identity and continue.
                </p>

                {/* OTP Inputs */}
                <div className="flex justify-center gap-4 mb-6">
                    {[0, 1, 2, 3].map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                            // onChange={(e) => handleChange(e, index)}
                            // onKeyDown={(e) => handleKeyDown(e, index)}
                            // ref={(el) => (inputRefs.current[index] = el)}
                        />
                    ))}
                </div>

                <Link href="/newpassword"
                    className="w-[355px] lg:w-[400px] mx-auto bg-green-900 text-white py-2 rounded-full hover:bg-green-900 transition duration-200 flex items-center justify-center gap-2"> Reset Password <span> <TiTick size={25} /></span>
                </Link>
                {/* Resend OTP */}
                <p className="text-base font-normal text-gray-600 mt-5 text-center">If you don’t receive the email within a minute, check your spam folder or try again. </p>
                   {/* Resend OTP */}
                <p className="text-sm text-gray-500 my-5">
                    Didn’t receive the code?{" "}
                    {/* {secondsLeft > 0 ? (
                        <span className="text-green-800 font-semibold">
                            Resend OTP in 
                            {formatTime(secondsLeft)}
                        </span>
                    ) : (
                        <span
                            onClick={handleResendOTP}
                            className="text-green-800 font-semibold cursor-pointer"
                        >
                            Resend OTP
                        </span>
                    )} */}
                </p>

                {/* Back to Login */}
                <Link href="/">
                    <div className="flex items-center text-base justify-center gap-2 text-green-900 font-bold cursor-pointer mb-4 sm:mb-0">
                        <FaLessThan className="text-[12px]" />
                        <p>Back to login screen</p>
                    </div>
                </Link>
            </div>
        </div>

    );
};

export default OtpScreen;
