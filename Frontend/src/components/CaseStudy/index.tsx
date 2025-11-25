"use client";
import React from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { BsArrowUpRight } from "react-icons/bs";

interface CaseStudyProps {
    property: {
        id: string;
        maintitle: string;
        title: string;
        bullets: string[];
        titles: string;
        sessions: { name: string; description: string }[];
        impact: { title: string; description: string };
        outcome: { title: string; description: string };
        review: {
            image: StaticImageData;
            view: string;
            person: string;
            imageone: StaticImageData;
            quote: string;
            imagetwo: StaticImageData;
        };
        intro: string;
        introdesp: string;
        problem: string;
        problemdesp: string;
        image: StaticImageData;
        solution: string;
        solutiondesp: string;
        session: string;
        sessiondesp: string;
        result: string;
        resultdesp: string;
    };
}

const CaseStudy: React.FC<CaseStudyProps> = ({ property }) => {
    return (
        <div className="max-w-[84rem] mx-auto px-5 sm:px-6 lg:px-8 pt-[40px] xl:pt-[145px]">
            <h1 className="font-poppins font-bold text-[24px] sm:text-[32px] leading-[36px] sm:leading-[48px] text-gradient-green">
                {property.maintitle}
            </h1>

            <div className="mt-[44px]">
                {/* CHALLENGES */}
                <div className="bg-green-50 h-[220px] sm:h-[200px] lg:h-[150px] pl-4 pr-3 sm:pr-0 sm:pl-[24px] rounded-lg flex flex-col justify-center">
                    <div className="flex flex-col lg:flex-row gap-4 md:gap-4 lg:gap-[100px] items-start lg:items-center">
                        <h2 className="font-poppins font-bold text-[28px] sm:text-[36px] text-white">
                            {property.title}
                        </h2>
                        <div className="grid grid-cols-2 items-start justify-start sm:grid-cols-3 lg:grid-cols-3 gap-y-4 gap-x-10">
                            {property.bullets.map((bullet, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 font-poppins font-semibold text-white"
                                >
                                    • {bullet}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-[30px]">
                    {/* SESSION PLAN */}
                    <div>
                        <h3 className="font-poppins text-[20px] sm:text-[24px] font-bold text-black-100">
                            {property.titles}
                        </h3>
                        <div>
                            {property.sessions.map((session, idx) => (
                                <div key={idx} className="flex items-start gap-4 mt-[12px]">
                                    <p className="bg-green-100 text-white min-w-[131px] h-[56px] rounded-lg font-poppins font-bold text-center flex items-center justify-center shadow-lg flex-shrink-0" style={{ boxShadow: "#00000040" }}>
                                        {session.name}
                                    </p>
                                    <p className="font-poppins text-[14px] font-normal text-black-100 max-w-[320px]">
                                        {session.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* IMPACT & OUTCOME */}
                    <div className="flex flex-col gap-6">
                        <div className="bg-green-100 py-[21px] px-[28px] rounded-lg min-h-[9rem]">
                            <h4 className="font-bold font-poppins text-black-100">
                                {property.impact.title}
                            </h4>
                            <p className="mt-[17px] font-poppins font-normal text-[14px] text-black-100">
                                {property.impact.description}
                            </p>
                        </div>
                        <div className="btn-gradient-border rounded-lg min-h-[9rem]">
                            <div className="px-[28px] py-[21px]">
                                <h4 className="font-bold font-poppins text-black-100">
                                    {property.outcome.title}
                                </h4>
                                <p>{property.outcome.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* REVIEW */}
                    <div className="xl:col-auto col-span-full w-full mt-[60px] xl:mt-0 bg-custom-green-gradient px-4 sm:px-6 md:px-8 lg:pr-[28px] rounded-3xl relative xl:min-h-[310px] pb-12 pt-20">
                        {/* Top Centered Reviewer Image */}
                        <Image
                            src={property.review.image}
                            alt="review"
                            width={140}
                            height={140}
                            className="rounded-full absolute top-[-70px] left-1/2 transform -translate-x-1/2 w-[100px] sm:w-[120px] md:w-[140px] h-auto"
                        />

                        {/* View Link */}
                        <div className="flex justify-end mb-4">
                            <div className="flex items-center gap-2 hover:underline cursor-pointer hover:decoration-white">
                                <p className="text-white text-sm sm:text-base">{property.review.view}</p>
                                <span className="text-white">
                                    <BsArrowUpRight />
                                </span>
                            </div>
                        </div>

                        {/* Quote Content */}
                        <div className="relative text-center">
                            {/* Left Quote Icon */}
                            <Image
                                src={property.review.imageone}
                                alt="quote icon"
                                width={30}
                                height={30}
                                className="absolute left-4 sm:left-[55px] top-[-25px]"
                            />

                            <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                                {property.review.person}
                            </h4>

                            <p className="text-white text-sm sm:text-base max-w-[90%] md:max-w-[80%] lg:max-w-[60%] mx-auto">
                                {property.review.quote}
                            </p>

                            {/* Right Quote Icon */}
                            <Image
                                src={property.review.imagetwo}
                                alt="quote icon"
                                width={30}
                                height={30}
                                className="absolute right-4 sm:right-[30px] bottom-[-30px]"
                            />
                        </div>
                    </div>


                </div>
            </div>

            <p className="font-poppins font-semibold text-green text-[20px] sm:text-[24px] mt-[27px] sm:mt-[32px]">
                {property.intro}
            </p>
            <p className="font-poppins font-normal text-[16px] sm:text-[20px] text-black leading-[28px] sm:leading-[30px] mt-[14px] sm:mt-[18px]">
                {property.introdesp}
            </p>

            <div className="flex flex-col lg:flex-row gap-6 mt-[24px] sm:mt-[32px] md:mt-[40px]">
                <div className="flex flex-col justify-between">
                    <div>
                        <p className="font-poppins font-semibold text-[20px] sm:text-[24px] text-green">
                            {property.problem}
                        </p>
                        <p className="font-poppins font-normal text-[16px] sm:text-[20px] leading-[28px] sm:leading-[30px] text-black mt-[14px] sm:mt-[18px]">
                            {property.problemdesp}
                        </p>
                    </div>
                    <p className="font-poppins font-semibold text-[20px] sm:text-[24px] text-green mt-4 lg:mt-0">
                        {property.solution}
                    </p>
                </div>
                <div className="w-full">
                    <Image
                        src={property.image}
                        alt="Case Study Illustration"
                        className="w-full max-w-[750px] mx-auto"
                    />
                </div>
            </div>

            <p className="font-poppins font-normal text-[16px] sm:text-[20px] text-black mt-2">
                {property.solutiondesp}
            </p>

            <p className="mt-[24px] sm:mt-[32px] md:mt-[40px] font-poppins font-semibold text-[20px] sm:text-[24px] text-green">
                {property.session}
            </p>
            <p className="font-poppins font-normal text-[16px] sm:text-[20px] text-black mt-[14px] sm:mt-[18px]">
                {property.sessiondesp}
            </p>

            <p className="mt-[24px] sm:mt-[32px] md:mt-[40px]  font-poppins font-semibold text-[20px] sm:text-[24px] text-green">
                {property.result}
            </p>
            <p className="font-poppins font-normal text-[16px] sm:text-[20px] text-black mt-[14px] sm:mt-[18px]">
                {property.resultdesp}
            </p>
        </div>
    );
};

export default CaseStudy;
