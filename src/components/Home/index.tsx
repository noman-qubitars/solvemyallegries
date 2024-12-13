"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Home: React.FC = () => {

    return (
        <div className="relative pt-[160px]">
            <div className="container mx-auto">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-green text-[64px] font-semibold font-poppins leading-[70px] max-w-[33rem]">
                            The greatest investment you can make is in <u className="">Yourself</u>
                        </p>
                        <div className="btn-gradient-border mt-[81px]">
                            <button className="h-[56px] w-[537px] font-bold text-[24px] text-center text-green font-poppins">
                                Get App Access
                            </button>
                        </div>
                        <div className="btn-gradient-border mt-[30px]">
                            <button className="h-[56px] w-[537px] font-bold text-[24px] text-center text-green font-poppins">
                                Watch Webinar
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center relative">
                        <Image
                            src='/images/iphone.png'
                            alt="admin"
                            width={463}
                            height={936}
                            className="h-[700px] w-[463px] z-10 relative"
                        />
                        <Image
                            src='/images/hero.png'
                            alt="admin"
                            width={395}
                            height={345}
                            className="h-[345px] w-[395px] absolute top-[22.5rem] -left-[130px] z-10"
                        />
                    </div>
                </div>
                <p className="font-poppins font-normal text-[30px] leading-[48px] text-green pt-32 text-center">
                    Experience daily healing sessions, seamless communication with expert practitioners, personalized milestone tracking, an engaging reward system, and a complete history of your wellness journey—all in one app.
                </p>
            </div>
            <Image
                src='/images/hero_bg.svg'
                alt="admin"
                width={892}
                height={888}
                className="h-[888px] w-[892px] absolute right-0 top-[6rem] z-0"
            />

        </div>
    );
};

export default Home;
