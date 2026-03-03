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
import { useSignInMutation } from "@/lib/api/authApi";
import { useToaster } from "@/components/Toaster";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { showToast } = useToaster();

  const initialValues = {
    email: "",
    password: "",
  };

  const [signIn, { isLoading: isSigningIn }] = useSignInMutation();

  const handleSignIn = async (values: typeof initialValues, { setSubmitting, setErrors, setTouched }: any) => {
    try {
      const response = await signIn({
        email: values.email,
        password: values.password,
      }).unwrap();

      if (response.success && response.token) {
        showToast("Sign in successful! Redirecting...", "success");
        localStorage.setItem('adminToken', response.token);
        localStorage.setItem('adminEmail', response.email);
        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      } else {
        throw new Error(response.message || 'Sign in failed');
      }
    } catch (error: any) {
      const errorMessage = error.data?.message || error.message || 'Sign in failed. Please try again.';
      
      showToast(errorMessage, "error");
      
      const lowerErrorMessage = errorMessage.toLowerCase();
      if (lowerErrorMessage.includes('password') && lowerErrorMessage.includes('wrong')) {
        setErrors({ password: errorMessage, email: undefined });
        setTouched({ password: true, email: false });
      } else if (lowerErrorMessage.includes('email') && lowerErrorMessage.includes('wrong')) {
        setErrors({ email: errorMessage, password: undefined });
        setTouched({ email: true, password: false });
      } else {
        setErrors({ email: errorMessage, password: undefined });
        setTouched({ email: true, password: false });
      }
      setSubmitting(false);
    }
  };

  return (
    <div className="px-1">
      <div className="flex justify-center my-2">
        <Image src="/images/logo.svg" alt="Logo" width={245} height={68} />
      </div>
      <div className="text-center mb-3">
        <p className="text-[27px] lg:text-[31px] font-extrabold mb-1 [word-spacing:-0.10em]">
          Sign In To Your Account.
        </p>
        <p className="text-base ext-bold text-gray-600">
          The greatest investment you can make is in Yourself
        </p>
      </div>

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
                    {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </span>
                </div>
              </div>
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm text-left ms-7 mt-1" />
            </div>

            <div className="flex items-center justify-between mb-4 mx-7 text-sm">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="mr-2 accent-green-900 mt-1" />
                Remember Me
              </label>
              <Link href="/resetpwd" className="text-green-900 hover:underline">
                Forgot Password
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isSigningIn}
              className="w-[355px] lg:w-[400px] mx-auto bg-green-900 cursor-pointer text-white py-2 rounded-full hover:bg-green-900 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting || isSigningIn ? 'Signing In...' : 'Sign In'} <span><FaArrowRightFromBracket />
              </span>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;