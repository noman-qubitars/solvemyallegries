"use client"

import Image from "next/image";
import BreadCrum from "./BreadCrum";
import { ReportsandAnalyticsData, ReportedAllergiesData } from "@/data/ReportsandAnalytics";
import SymptomsChart from "./SymptomsCharts";

const ReportsandAnalytics: React.FC = () => {

    const bgColors = ["bg-[#FFF3D6]", "bg-[#D9F7E8]", "bg-[#E5E4FF]", "bg-[#FFDED1]"];


    return (
        <div className="">
            <BreadCrum />
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">
                {ReportsandAnalyticsData.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white p-4 rounded-[14px] shadow-md flex flex-col gap-2"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="font-medium sm:w-[10rem] md:w-auto lg:w-[10rem] text-[#636466]">{item.name}</h3>
                            <div className={`px-[14px] py-[18px] h-[60px] flex items-center justify-center rounded-[23px] ${bgColors[index]}`}>
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={32}
                                    height={24}
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        <h1 className="text-[28px] font-semibold text-[#202224]">{item.number}</h1>
                        <div className="flex items-center gap-2 w-fit">
                            <item.icon
                                className={`${item.icon.name === "FaArrowTrendDown"
                                    ? "text-[#DB2828]"
                                    : "text-[#21BA45]"
                                    }`}
                            />
                            <div className="flex items-center gap-1">
                                <p
                                    className={`text-sm ${item.icon.name === "FaArrowTrendDown"
                                        ? "text-[#DB2828]"
                                        : "text-[#21BA45]"
                                        }`}
                                >
                                    {item.rating}
                                </p>
                                <p className="text-[14px] lg:text-[12px] xl:text-[14px] font-normal text-[#606060]">{item.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <p className="mt-4 text-[#11401C] font-semibold text-[24px]">Symptoms Trend</p>
            <div className="mt-4 flex items-center xl:items-start flex-col xl:flex-row gap-[17px]">
                <div className="w-[100%] xl:w-[70%] bg-white rounded-[14px] py-[19px] px-[15px] shadow-md">
                    <SymptomsChart />
                </div>
                <div className="md:w-[50%] lg:w-[40%] xl:w-[30%] bg-white rounded-[14px] py-[14px] px-[10px] shadow-md">
                    <p className="text-[#222222] font-medium text-[20px] pl-[10px]">Most Reported Allergies</p>
                    <div className="overflow-x-auto mt-4">
                        <table className="text-center">
                            <thead className="text-[#717171] font-semibold bg-[#F3F3F4] text-[14px]">
                                <tr>
                                    <th className="px-3 py-3 rounded-tl-lg rounded-bl-lg">Allergen</th>
                                    <th className="px-3 py-3">Times Reported</th>
                                    <th className="px-3 py-3">Avg Severity</th>
                                    <th className="px-3 py-3 rounded-tr-lg rounded-br-lg">% of Total</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {ReportedAllergiesData.map((user, index) => (
                                    <tr key={index}>
                                        <td className="px-3 py-3 text-center font-medium text-[14px] text-[#11401C]">
                                            {user.allergen}
                                        </td>
                                        <td className="px-3 py-3 text-center font-medium text-[14px] text-[#999999]">
                                            {user.allergen}
                                        </td>
                                        <td
                                            className={`px-3 py-3 text-center font-medium text-[14px] ${user.avg === "High"
                                                    ? "text-[#DB2828]"  
                                                    : user.avg === "Moderate"
                                                        ? "text-[#F2711C]"   
                                                        : user.avg === "Low"
                                                            ? "text-[#2185D0]"
                                                            : ""
                                                }`}
                                        >
                                            {user.avg}
                                        </td>
                                        <td className="px-3 py-3 text-center font-medium text-[14px] text-[#999999]">
                                            {user.total}
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsandAnalytics;