"use client";

import React, { useState, useEffect } from "react";
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

    console.log(property, "iddd")

    return (
        <div className="container mx-auto pt-[145px]">
            <h1 className="font-poppins font-bold text-[32px] leading-[48px] text-gradient-green">{property.maintitle}</h1>
            <div className="mt-[44px]">
                {/* CHALLENGES */}
                <div className="bg-green-50 py-[38px] pl-[24px] rounded-lg">
                    <div className="flex gap-[100px] items-center">
                        <h2 className="font-poppins font-bold text-[36px] text-white">
                            {property.title}
                        </h2>
                        <div className="grid grid-cols-3 gap-y-4 gap-x-32">
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


                <div className="grid grid-cols-3 gap-[17px] mt-[30px]">
                    {/* SESSION PLAN */}
                    <div>
                        <h3 className="font-poppins text-[24px] font-bold text-black-100">{property.titles}</h3>
                        <div>
                            {property.sessions.map((session, idx) => (
                                <div key={idx} className="flex items-center gap-4 mt-[12px]">
                                    <p className="bg-green-100 text-white w-[131px] h-[56px] rounded-lg font-poppins font-bold text-center flex items-center justify-center shadow-lg" style={{ boxShadow: "#00000040" }}>
                                        {session.name}
                                    </p>
                                    <p className="font-poppins text-[14px] font-normal text-black-100 text-wrap max-w-[320px]">{session.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* IMPACT & OUTCOME */}
                    <div className="flex justify-between flex-col">
                        <div className="bg-green-100 py-[21px] px-[28px] rounded-lg h-[9rem]">
                            <h4 className="font-bold font-poppins text-black-100">{property.impact.title}</h4>
                            <p className="mt-[17px] font-poppins font-normal text-[14px] text-black-100">{property.impact.description}</p>
                        </div>
                        <div className="btn-gradient-border rounded-lg h-[9rem]">
                            <div className="px-[28px] py-[21px]">
                                <h4 className="font-bold font-poppins text-black-100" style={{ boxShadow: "#00000040" }}>{property.outcome.title}</h4>
                                <p>{property.outcome.description}</p>
                            </div>
                        </div>
                    </div>
                    {/* REVIEW */}
                    <div className="bg-custom-green-gradient pr-[28px] rounded-3xl relative">
                        <Image
                            src={property.review.image}
                            alt="review"
                            width={163}
                            height={164}
                            className="rounded-full absolute top-[-20px] left-1/2 transform -translate-x-1/2 w-[140px] h-[140px]"
                        />
                        <div className="flex justify-end pt-[24px]">
                            <div className="flex items-center gap-2 hover:underline cursor-pointer hover:decoration-white">
                                <p className="text-white">{property.review.view}</p>
                                <span className="text-white">
                                    <BsArrowUpRight />
                                </span>
                            </div>
                        </div>
                        <div className="relative">
                            <Image
                                src={property.review.imageone}
                                alt="review"
                                width={163}
                                height={164}
                                className="absolute w-[40px] left-[55px] top-[-25px]"
                            />
                            <h4 className="text-lg font-bold text-center text-white mt-[120px]">{property.review.person}</h4>
                            <div className="flex justify-center">
                                <div className=" max-w-[350px]">
                                    <p className="text-center text-white">{property.review.quote}</p>
                                </div>
                            </div>
                            <Image
                                src={property.review.imagetwo}
                                alt="review"
                                width={163}
                                height={164}
                                className="absolute w-[40px] right-[30px] bottom-[-40px]"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <p className="font-poppins font-semibold text-green text-[24px] mt-[32px]">
                {property.intro}
            </p>
            <p className="font-poppins font-normal text-[20px] text-black leading-[30px] mt-[18px]">
                {property.introdesp}
            </p>
            <div className="flex gap-2 mt-[40px]">
                <div className="flex flex-col justify-between">
                    <div>
                        <p className="font-poppins font-semibold text-[24px] text-green">
                            {property.problem}
                        </p>
                        <p className="font-poppins font-normal text-[20px] leading-[30px] text-black mt-[18px]">
                            {property.problemdesp}
                        </p>
                    </div>
                    <p className="font-poppins font-semibold text-[24px] text-green">
                        {property.solution}
                    </p>
                </div>
                <div>
                    <Image
                        src={property.image}
                        alt="alt"
                        className="w-[750px]"
                    />
                </div>
            </div>
            <p className="font-poppins font-normal text-[20px] text-black mt-2">
                {property.sessiondesp}
            </p>
            <p className="mt-[40px] font-poppins font-semibold text-[24px] text-green">
                {property.session}
            </p>
            <p className="font-poppins font-semibold text-[20px] text-black mt-[18px]">
                {property.sessiondesp}
            </p>
            <p className="mt-[40px] font-poppins font-semibold text-[24px] text-green">
              {property.result}  
            </p>
            <p className="font-poppins font-semibold text-[20px] text-black mt-[18px]">
                {property.resultdesp}
            </p>
        </div>
    );
};

export default CaseStudy;