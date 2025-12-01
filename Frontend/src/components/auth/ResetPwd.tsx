"use client";

import Image from "next/image";
import { FaRegEnvelope } from "react-icons/fa6";
import { MdOutlineLock } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { adminForgotPasswordSchema } from "@/lib/validation/adminAuthSchema";
import axios from "axios";
import { useToaster } from "@/components/Toaster";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

const ResetPwd = () => {
  const router = useRouter();
  const { showToast } = useToaster();

  const initialValues = {
    email: "",
  };

  const handleSubmit = async (values: typeof initialValues, { setSubmitting }: any) => {
    try {
      const response = await api.post('/admin/auth/forgot-password', {
        email: values.email,
      });

      if (response.data.success) {
        // Show success toast
        showToast("OTP sent to your email successfully!", "success");
        // Store email in sessionStorage to use in OTP screen
        sessionStorage.setItem('resetEmail', values.email);
        // Redirect to OTP screen
        setTimeout(() => {
          router.push("/otpscreen");
        }, 500);
      } else {
        throw new Error(response.data.message || 'Failed to send OTP');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to send OTP. Please try again.';
      // Show error toast
      showToast(errorMessage, "error");
      setSubmitting(false);
    }
  };

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
        <p className="text-base text-gray-600 leading-7 font-normal text-center mt-2">Forgot your password? No worries, then let's submit password reset. It will be send to your email.</p>
        
        <Formik
          initialValues={initialValues}
          validationSchema={adminForgotPasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className="my-5">
                <label className="block text-sm font-bold mb-2 ms-4">Email Address</label>
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
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm text-left ms-4 mt-1" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-[355px] lg:w-[400px] cursor-pointer mx-auto flex justify-center items-center bg-green-900 text-white py-2 rounded-full hover:bg-green-900 transition duration-200 gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Reset Password'} <span> <MdOutlineLock /></span>
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPwd;
