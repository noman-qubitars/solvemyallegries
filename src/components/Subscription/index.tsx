"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GoPerson } from "react-icons/go";
import { MdOutlineMail } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { subscriptionSchema } from "@/lib/validation/subscriptionSchema";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
});

interface SubscriptionProps {
    paymentSuccess?: boolean;
}

const Subscription: React.FC<SubscriptionProps> = ({ paymentSuccess = false }) => {
    const [isModalOpen, setIsModalOpen] = useState(paymentSuccess);

    useEffect(() => {
        if (paymentSuccess) {
            setIsModalOpen(true);
        }
    }, [paymentSuccess]);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    };

    const handleSubmit = async (values: typeof initialValues, { setSubmitting, setFieldError, resetForm }: any) => {
        try {
            const response = await api.post('/subscription/create-checkout', {
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
                phone: values.phone,
            });

            if (!response.data.success || !response.data.url) {
                throw new Error(response.data.message || 'Failed to create checkout session');
            }

            resetForm();
            setTimeout(() => {
                window.location.href = response.data.url;
            }, 500);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Payment processing failed. Please try again.';
            setFieldError('email', errorMessage);
            setSubmitting(false);
        }
    };


    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [isModalOpen]);


    return (
        <div className="relative">
            <div className="max-w-[84rem] px-5 container mx-auto pt-[50px] sm:pt-[60px] md:pt-[85px] lg:pt-[50px] md:gap-[40px] xl:gap-0 grid grid-cols-1 md:grid-cols-2">
                <div>
                    <p className="text-gradient-green font-poppins font-semibold text-[32px]">
                        One-Time Payment
                    </p>
                    <p className="text-green font-poppins font-normal mt-[19px] md:mt-[20px] lg:mt-[26px] xl:mt-[32px]">
                        Add Personal Details
                    </p>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={subscriptionSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, setFieldValue, values, isSubmitting, resetForm }) => (
                            <Form className="mt-[12px]">
                                <div className="space-y-4">
                                    <div>
                                        <div className={`border ${errors.firstName && touched.firstName ? 'border-red' : 'border-gray-100'} rounded-xl px-4 py-2 sm:py-3 md:py-2 lg:py-3 xl:py-4 flex items-center gap-3`}>
                                            <GoPerson className="text-gray-100" />
                                            <Field
                                                type="text"
                                                name="firstName"
                                                placeholder="First Name"
                                                className="w-full outline-none border-none placeholder-gray-100"
                                            />
                                        </div>
                                        <ErrorMessage name="firstName" component="div" className="text-red text-sm mt-1" />
                                    </div>
                                    <div>
                                        <div className={`border ${errors.lastName && touched.lastName ? 'border-red' : 'border-gray-100'} rounded-xl px-4 py-2 sm:py-3 md:py-2 lg:py-3 xl:py-4 flex items-center gap-3`}>
                                            <GoPerson className="text-gray-100" />
                                            <Field
                                                type="text"
                                                name="lastName"
                                                placeholder="Last Name"
                                                className="w-full outline-none border-none placeholder-gray-100"
                                            />
                                        </div>
                                        <ErrorMessage name="lastName" component="div" className="text-red text-sm mt-1" />
                                    </div>
                                    <div>
                                        <div className={`border ${errors.email && touched.email ? 'border-red' : 'border-gray-100'} rounded-xl px-4 py-2 sm:py-3 md:py-2 lg:py-3 xl:py-4 flex items-center gap-3`}>
                                            <MdOutlineMail className="text-gray-100" />
                                            <Field
                                                type="email"
                                                name="email"
                                                placeholder="Enter your email"
                                                className="w-full outline-none border-none placeholder-gray-100"
                                            />
                                        </div>
                                        <ErrorMessage name="email" component="div" className="text-red text-sm mt-1" />
                                    </div>
                                    <div>
                                        <div className={`border ${errors.phone && touched.phone ? 'border-red' : 'border-gray-100'} rounded-xl px-4 py-2 sm:py-3 md:py-2 lg:py-3 flex items-center gap-3`}>
                                            <PhoneInput
                                                country={'us'}
                                                value={values.phone}
                                                onChange={(value) => setFieldValue('phone', value)}
                                                placeholder="Enter Phone number"
                                                inputClass="!w-full !border-none !rounded-r-xl !outline-none placeholder-gray-100"
                                                buttonClass="!border-none !rounded-l-xl !bg-transparent"
                                                containerClass="!border-0 !rounded-xl"
                                            />
                                        </div>
                                        <ErrorMessage name="phone" component="div" className="text-red text-sm mt-1" />
                                    </div>
                                </div>

                                <div className="flex gap-[12px] mt-[32px]">
                                    <button
                                        type="button"
                                        onClick={() => resetForm()}
                                        className="w-full h-[40px] cursor-pointer sm:h-[46px] md:h-[40px] lg:h-[52px] xl:h-[56px] border border-gray-100 rounded-xl text-gray-150 text-center font-poppins font-normal"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-green cursor-pointer text-white rounded-lg h-[40px] sm:h-[46px] md:h-[40x] lg:h-[52px] xl:h-[56px] text-center font-extrabold font-poppins w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Getting App' : 'Get App'}
                                    </button>
                                </div>
                                <p className="font-poppins font-normal text-gray-150 mt-[24px]">
                                    By proceeding, you agree with Terms and Conditions
                                </p>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className="flex items-center justify-center">
                    <Image
                        src='/images/sub.svg'
                        alt='mockup'
                        width={495}
                        height={406}
                        className="w-[495px] md:h-[500px] lg:h-[406px]"
                    />
                </div>
            </div>
            <div className="relative mb-[130px] hidden md:block normal-nums">
                <Image
                    src='/images/sub_white.png'
                    alt="admin"
                    width={1183}
                    height={560}
                    className="absolute right-0 top-[-150px] w-[120px] lg:w-[150px] xl:w-[200px] h-[200px] lg:h-[250px] xl:h-[560px]"
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
                    <div className="fixed inset-0 bg-black/80 bg-opacity-50 z-50" onClick={toggleModal}></div>
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="w-[600px] h-[600px] rounded-[24px] mx-[20px] pt-[29px] bg-white shadow-2xl relative">
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