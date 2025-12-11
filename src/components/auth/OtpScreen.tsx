"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaLessThan } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import axios from "axios";
import { useToaster } from "@/components/Toaster";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
});

const OtpScreen = () => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [secondsLeft, setSecondsLeft] = useState(120);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();
  const { showToast } = useToaster();

  // Get email from sessionStorage
  const email = typeof window !== 'undefined' ? sessionStorage.getItem('resetEmail') || '' : '';

  useEffect(() => {
    if (!email) {
      router.push('/resetpwd');
      return;
    }
  }, [email, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    // Allow only digits 0-9
    if (!/^[0-9]?$/.test(value)) {
      e.target.value = "";
      return;
    }
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);
    if (/^\d{4}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      newOtp.forEach((digit, idx) => {
        if (inputRefs.current[idx]) {
          inputRefs.current[idx]!.value = digit;
        }
      });
      inputRefs.current[3]?.focus();
    }
  };

  // Countdown Timer Logic
  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleVerifyOtp = async () => {
    const otpCode = otp.join('');
    
    if (otpCode.length !== 4) {
      showToast("Please enter the complete OTP code", "error");
      return;
    }

    if (!/^\d{4}$/.test(otpCode)) {
      showToast("OTP code must contain only numbers", "error");
      return;
    }

    try {
      setIsVerifying(true);
      const response = await api.post('/auth/otp', {
        email: email,
        code: otpCode,
      });

      if (response.data.success) {
        // Show success toast
        showToast("OTP verified successfully!", "success");
        // Store email in sessionStorage for reset password page
        sessionStorage.setItem('resetEmail', email);
        // Redirect to new password page
        setTimeout(() => {
          router.push("/newpassword");
        }, 500);
      } else {
        throw new Error(response.data.message || 'OTP verification failed');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Invalid OTP code. Please try again.';
      // Show error toast
      showToast(errorMessage, "error");
      // Clear OTP on error
      setOtp(['', '', '', '']);
      inputRefs.current.forEach(ref => {
        if (ref) ref.value = '';
      });
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    // Check if email exists
    if (!email) {
      showToast("Email not found. Please start over.", "error");
      router.push('/resetpwd');
      return;
    }

    // Prevent multiple simultaneous requests
    if (isResending) {
      return;
    }

    try {
      setIsResending(true);
      const response = await api.post('/auth/resend-otp', {
        email: email,
      });

      if (response.data.success) {
        // Show success toast
        showToast("OTP resent to your email successfully!", "success");
        setSecondsLeft(120);
        setOtp(['', '', '', '']);
        inputRefs.current.forEach(ref => {
          if (ref) ref.value = '';
        });
        inputRefs.current[0]?.focus();
      } else {
        throw new Error(response.data.message || 'Failed to resend OTP');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to resend OTP. Please try again.';
      // Show error toast
      showToast(errorMessage, "error");
    } finally {
      setIsResending(false);
    }
  };

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
          We've sent a one-time password (OTP) to your email. <br />
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
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : undefined}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
            />
          ))}
        </div>

        <button
          onClick={handleVerifyOtp}
          disabled={isVerifying || otp.join('').length !== 4}
          className="w-[355px] lg:w-[400px] mx-auto bg-green-900 text-white py-2 rounded-full hover:bg-green-900 transition duration-200 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isVerifying ? 'Verifying...' : 'Reset Password'} <span> <TiTick size={25} /></span>
        </button>

        {/* Resend OTP */}
        <p className="text-base font-normal text-gray-600 mt-5 text-center">If you don't receive the email within a minute, check your spam folder or try again. </p>
        <p className="text-sm text-gray-500 my-5">
          Didn't receive the code?{" "}
          {secondsLeft > 0 ? (
            <span className="text-green-800 font-semibold">
              Resend OTP in {formatTime(secondsLeft)}
            </span>
          ) : (
            <span
              onClick={handleResendOTP}
              className={`text-green-800 font-semibold cursor-pointer hover:underline ${isResending ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isResending ? 'Resending...' : 'Resend OTP'}
            </span>
          )}
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