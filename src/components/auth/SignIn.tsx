"use client";

import { useState } from "react";
import Image from "next/image";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FaRegEnvelope } from "react-icons/fa6";
import { MdOutlineLock } from "react-icons/md";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { adminSigninSchema } from "@/lib/validation/adminAuthSchema";
import axios from "axios";
import { useToaster } from "@/components/Toaster";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
});

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { showToast } = useToaster();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSignIn = async (values: typeof initialValues, { setSubmitting, setErrors, setTouched }: any) => {
    try {
      const response = await api.post('/auth/signin', {
        email: values.email,
        password: values.password,
      });

      if (response.data.success && response.data.token) {
        // Show success toast
        showToast("Sign in successful! Redirecting...", "success");
        // Store token in localStorage
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminEmail', response.data.email);
        // Redirect to dashboard
        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      } else {
        throw new Error(response.data.message || 'Sign in failed');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Sign in failed. Please try again.';
      
      // Show error toast
      showToast(errorMessage, "error");
      
      // Determine which field has the error based on the error message
      const lowerErrorMessage = errorMessage.toLowerCase();
      if (lowerErrorMessage.includes('password') && lowerErrorMessage.includes('wrong')) {
        // Password is wrong - set error on password field
        setErrors({ password: errorMessage, email: undefined });
        setTouched({ password: true, email: false });
      } else if (lowerErrorMessage.includes('email') && lowerErrorMessage.includes('wrong')) {
        // Email is wrong - set error on email field
        setErrors({ email: errorMessage, password: undefined });
        setTouched({ email: true, password: false });
      } else {
        // Default to email field if unclear
        setErrors({ email: errorMessage, password: undefined });
        setTouched({ email: true, password: false });
      }
      setSubmitting(false);
    }
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
      <Formik
        initialValues={initialValues}
        validationSchema={adminSigninSchema}
        onSubmit={handleSignIn}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="w-full py-3">
            <div className="mb-4">
              <label className="block text-sm font-bold mb-1 ms-7">Email Address</label>
              <div className="flex justify-center items-center">
                <div className={`flex items-center border ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'} w-[400px] rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-green-600`}>
                  <span className="text-gray-400 px-4 shrink-0">
                    <FaRegEnvelope />
                  </span>
                  <Field
                    type="email"
                    name="email"
                    placeholder="email@email.com"
                    className="flex-1 py-2 pr-4 text-sm focus:outline-none"
                  />
                </div>
              </div>
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm text-left ms-7 mt-1" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-1 ms-7">Password</label>
              <div className="flex justify-center items-center">
                <div className={`flex items-center border ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'} w-[400px] rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-green-600`}>
                  <span className="text-gray-400 px-4 shrink-0">
                    <MdOutlineLock />
                  </span>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="********"
                    className="flex-1 py-2 pr-4 text-sm focus:outline-none placeholder:align-middle"
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-gray-400 px-4 cursor-pointer shrink-0"
                  >
                    {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </span>
                </div>
              </div>
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm text-left ms-7 mt-1" />
            </div>

            <div className="flex items-center justify-between mb-4 mx-7 text-sm">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="mr-2 bg-green-900 text-green-900 mt-1" />
                Remember Me
              </label>
              <Link href="/resetpwd" className="text-green-900 hover:underline">
                Forgot Password
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-[355px] lg:w-[400px] mx-auto bg-green-900 cursor-pointer text-white py-2 rounded-full hover:bg-green-900 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'} <span><FaArrowRightFromBracket />
              </span>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;