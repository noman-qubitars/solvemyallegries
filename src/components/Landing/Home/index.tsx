"use client";
import React from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { FaApple } from "react-icons/fa";

const Home: React.FC = () => {

    const router = useRouter();

    return (
        <div className="lg:mt-[120px] mt-0">
            <div className="relative overflow-hidden pt-[120px] sm:pt-[160px]" id="home-section">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-12 MT-10 lg:gap-4">
                    <div className="px-2 flex flex-col items-center justify-center sm:px-0">
                        <p className="text-green px-4 text-[30px] sm:text-[42px] text-center lg:text-start md:text[54px] xl:text-[64px] font-semibold font-poppins leading-[35px] sm:leading-[70px] max-w-full sm:max-w-[36rem]">
                            The greatest investment you can make is in <u className="text-gradient-green">Yourself</u>
                        </p>
                        <div className="btn-gradient-border mt-[50px] sm:mt-[81px] h-[56px] w-[330px] text-start me-0 lg:me-16 xl:me-8 sm:w-[400px] xl:w-[500px] rounded-full">
                            <button className="font-bold text-[21px] sm:text-[24ox] text-center text-green font-poppins cursor-pointer" onClick={() => router.push('/webinar/subscription')}>
                                Get App Access
                            </button>
                        </div>
                        <div className="btn-gradient-border mt-[30px] h-[56px] w-[330px] text-start lg:me-16 xl:me-8 sm:w-[400px] xl:w-[500px] rounded-full">
                            <button className="font-bold text-[24px] text-center text-green font-poppins cursor-pointer" onClick={() => router.push('/webinar')}>
                                Watch Webinar
                            </button>
                        </div>
                    </div>
                    {/* Right Image */}
                    <div className="lg:absolute relative lg:right-[-150px] right-0 top-3">
                        <Image src="/images/hero.png" alt="" width={892} height={888} className="xl:w-[892px] lg:w-[760px]" />
                    </div>

                </div>
                <p className="font-poppins px-4 font-normal text-[21px] max-w-7xl mx-auto sm:text-[26px] md:text-[30px] leading-[30px] sm:leading-[48px] text-green lg:pt-48 pt-10 text-center">
                    Experience daily healing sessions, seamless communication with expert practitioners, personalized milestone tracking, an engaging reward system, and a complete history of your wellness journey—all in one app.
                </p>
                <div className="mt-[50px] flex gap-[30px] sm:gap-[48px] justify-center">
                    <button className="bg-black px-3 py-2 flex gap-1 items-center rounded-lg cursor-pointer">
                        <FaApple className="text-white text-[30px] sm:text-[35px]" />
                        <div className="text-left">
                            <p className="font-poppins text-[10px] sm:text-[11.5px] font-normal text-white leading-3">Download on the</p>
                            <p className="font-poppins text-[18px] sm:text-[20px] font-medium text-white leading-6">App Store </p>
                        </div>
                    </button>
                    <button className="bg-black px-3 py-2 flex gap-1 items-center rounded-lg cursor-pointer">
                        <Image
                            src='/images/playstore.png'
                            alt="admin"
                            width={30}
                            height={30}
                            className="sm:h-[30px] sm:w-[30px] w-[28px] h-[28px]"
                        />
                        <div className="text-left">
                            <p className="font-poppins text-[10px] sm:text-[11.5px] font-normal text-white leading-3 uppercase">Get it on</p>
                            <p className="font-poppins text-[18px] sm:text-[20px] font-medium text-white leading-6">Google Play</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;