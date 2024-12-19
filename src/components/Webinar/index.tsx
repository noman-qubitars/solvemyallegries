"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

const Webinar: React.FC = () => {

     const router = useRouter();

    return (
        <>
            <div className="container mx-auto pt-[145px]">
                <Image
                    src='/images/webinar_video.svg'
                    alt="admin"
                    width={1183}
                    height={560}
                    className="h-[560px] w-full"
                />
                <p className="text-green font-poppins font-normal text-[20px] leading-[30px] text-center mt-[48px] relative z-10">
                    Experience daily healing sessions, seamless communication with expert practitioners, personalized milestone tracking, an engaging reward system, and a complete history of your wellness journey—all in one app.
                </p>
                <div className="flex justify-center mt-[64px]">
                    <button className="bg-text-gradient-green w-[358px] h-[56px] font-poppins font-bold text-[24px] text-white rounded-full" onClick={() => router.push('/webinar/subscription')}>
                        Get App Access
                    </button>
                </div>
            </div>
            <div className="relative">
                <Image
                    src='/images/webinar_white.png'
                    alt="admin"
                    width={1183}
                    height={560}
                    className="absolute right-0 top-[-335px] w-[200px] h[200px]"
                />
            </div>
        </>
    );
};

export default Webinar;