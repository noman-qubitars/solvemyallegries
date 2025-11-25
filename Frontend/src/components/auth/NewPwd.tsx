"use client";

import Image from "next/image";
import { FaLessThan } from "react-icons/fa6";
import Link from "next/link";
import { MdOutlineLock } from "react-icons/md";
import { useState, useEffect } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { adminResetPasswordSchema } from "@/lib/validation/adminAuthSchema";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

const NewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    // Get email from sessionStorage
    const storedEmail = typeof window !== 'undefined' ? sessionStorage.getItem('resetEmail') || '' : '';
    if (!storedEmail) {
      router.push('/resetpwd');
      return;
    }
    setEmail(storedEmail);
  }, [router]);

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const handleResetPassword = async (values: typeof initialValues, { setSubmitting, setFieldError }: any) => {
    try {
      const response = await api.post('/admin/auth/reset-password', {
        email: email,
        password: values.password,
      });

      if (response.data.success) {
        // Clear sessionStorage
        sessionStorage.removeItem('resetEmail');
        // Redirect to sign in page
        router.push("/");
      } else {
        throw new Error(response.data.message || 'Password reset failed');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Password reset failed. Please try again.';
      setFieldError('password', errorMessage);
      setSubmitting(false);
    }
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
        <Formik
          initialValues={initialValues}
          validationSchema={adminResetPasswordSchema}
          onSubmit={handleResetPassword}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="w-full py-3">
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1 ms-3">New Password</label>
                <div className="relative flex justify-center items-center">
                  <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <MdOutlineLock />
                  </span>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="********"
                    className={`border ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'} w-[355px] lg:w-[400px] mx-auto rounded-full h-10 px-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 placeholder:align-middle`}
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  >
                    {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </span>
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm text-center mt-1" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1 ms-3">Re enter New Password</label>
                <div className="relative flex justify-center items-center">
                  <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <MdOutlineLock />
                  </span>
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="********"
                    className={`border ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-gray-300'} w-[355px] lg:w-[400px] mx-auto rounded-full h-10 px-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 placeholder:align-middle`}
                  />
                  <span
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  >
                    {showConfirmPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </span>
                </div>
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm text-center mt-1" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-[355px] lg:w-[400px] mx-auto cursor-pointer bg-green-900 text-white py-2 rounded-full hover:bg-green-900 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Resetting...' : 'Reset Password'} <span> <MdOutlineLock /></span>
              </button>
              <Link href="/">
                <div className="flex items-center text-sm font-bold text-green-900 justify-center mt-6">
                  <span className="me-3"><FaLessThan /></span>
                  <p> Back to login screen</p>
                </div>
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewPassword;
