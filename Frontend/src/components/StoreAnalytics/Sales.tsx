"use client"

import { useState } from "react";
import { StoreSalesData as initialData } from "@/data/StoreAnalysis";
import { StoreSalesProductData } from "@/data/StoreAnalysis";
import GaugeChart from "./GaugeChart";
import Image from "next/image";
import { IoArrowDownOutline } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import LineChart from "./LineChart";
import { MdKeyboardArrowDown } from "react-icons/md";


interface SalesProps {
    searchTerm: string;
}

const Sales: React.FC<SalesProps> = ({ searchTerm }) => {

    const [data, setData] = useState(initialData);

    const filteredData = data
        .filter(user =>
            user.sales.toLowerCase().includes(searchTerm.toLowerCase())
        )

    return (
        <>
            <div className="flex items-center gap-4 mt-4">
                <div className="lg:w-[75%] py-[20px] flex items-center rounded-lg border border-[#CCCCCC] bg-white">
                    {filteredData.map((item, idx) => (
                        <div
                            key={idx}
                            className={`pl-[37px] pr-[110px] flex flex-col justify-between ${(idx === 0 || idx === 1) ? "border-r border-[#B1A9A9]" : ""}`}
                        >
                            <div className="flex flex-col gap-2">
                                {item.image && (
                                    <div
                                        className={`rounded-full px-[13px] py-[10px] w-fit ${idx === 0
                                            ? "bg-[#FDF2EE]"
                                            : idx === 1
                                                ? "bg-[#E9F3FA]"
                                                : idx === 2
                                                    ? "bg-[#F5E4E4]"
                                                    : ""
                                            }`}
                                    >
                                        <Image src={item.image} alt={item.sales} width={16} height={20} />
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <p className="font-normal text-[#999999]">{item.sales}</p>
                                    <div className="flex items-center gap-0.5">
                                        <p className={`font-medium text-[14px] ${(idx === 0 || idx === 1) ? "text-[#21BA45]" : idx === 2 ? "text-[#F2711C]" : ""}`}>{item.number}</p>
                                        <p className={`font-medium text-[14px] ${(idx === 0 || idx === 1) ? "text-[#21BA45]" : idx === 2 ? "text-[#F2711C]" : ""}`}><item.icon /></p>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[24px] text-[#222222] font-semibold">{item.rating}</div>
                                    <div className="text-[#1E1E1E] text-[14px] font-normal">{item.text}</div>
                                </div>
                            </div>
                        </div>
                    )
                    )}
                </div>
                <div className="lg:w-[25%] rounded-lg border border-[#CCCCCC] bg-white">
                    <p className="text-[#000000] font-medium text-[20px] pl-[10px] pt-[10px]">User Volume</p>
                    <div className="flex justify-center mt-[9px]">
                        <GaugeChart />
                    </div>
                    <div className="flex justify-center gap-2 items-center pb-[8px]">
                        <p className="text-[#717171] font-normal text-[12px]">Your users has grown</p>
                        <div className="bg-[#FEF1E8] rounded-lg px-[4px] py-[4px] flex items-center gap-0.5">
                            <MdArrowOutward className="text-[#F2711C]" />
                            <p className="text-[#F2711C] font-normal text-[12px]">+19%</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
                <div className="lg:w-[65%] py-[20px] pl-[36px] pr-[10px] rounded-2xl border border-[#CCCCCC] bg-white">
                    <div className="flex items-center justify-between">
                        <p className="text-[#222222] font-medium text-[20px]">Revenue</p>
                        <div className="flex items-center gap-2 bg-white shadow-md rounded-lg cursor-pointer px-[8px] py-[8px]">
                            <Image src="/images/StoreAnalysis/calendar.svg" alt="img" width={12} height={12} />
                            <p className="text-[#000000] font-normal text-[12px]">July</p>
                            <MdKeyboardArrowDown className="text-[#000000]" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <p className="text-[#B1A9A9] font-normal text-[12px]">Balance</p>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                                <div className="bg-[#0062FF] w-[10px] h-[10px] rounded-full" />
                                <p className="text-[#44444F] font-normal text-[14px]">Store</p>
                            </div>
                            <div className="flex items-center gap-0.5">
                                <div className="bg-[#3DD598] w-[10px] h-[10px] rounded-full" />
                                <p className="text-[#44444F] font-normal text-[14px]">Accessories</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                        <p className="text-[#222222] font-semibold">$80,052.00</p>
                        <div className="flex items-center gap-1">
                            <div className="flex items-center gap-0.5">
                                <IoArrowDownOutline className="text-[#21BA45]" />
                                <p className="text-[#21BA45] font-semibold text-[12px]">18%</p>
                            </div>
                            <p className="text-[#717171] font-normal text-[12px]">From The Last Month</p>
                        </div>
                    </div>
                    <LineChart />
                </div>
                <div className="lg:w-[35%] px-[20px] py-[20px] rounded-2xl border border-[#CCCCCC] bg-white">
                    <div className="flex items-center justify-between">
                        <div className="text-[#222222] font-medium text-[20px]">
                            Sales by Product
                        </div>
                        <button className="text-[#0068F7] font-medium text-[14px] cursor-pointer">
                            See All
                        </button>
                    </div>
                    <div className="mt-4">
                        <div className="overflow-x-auto rounded-lg">
                            <table className="min-w-full text-sm text-center">
                                <thead className="text-[#717171] font-semibold bg-[#F3F3F4] rounded-lg">
                                    <tr>
                                        <th className="px-4 py-4 whitespace-nowrap">Product Name</th>
                                        <th className="px-4 py-4 whitespace-nowrap">Sold</th>
                                        <th className="px-4 py-4 whitespace-nowrap">Price</th>
                                        <th className="px-4 py-4 whitespace-nowrap">Rating</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {filteredData.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="text-center text-[#222222] font-medium py-2">
                                                No Data Available
                                            </td>
                                        </tr>
                                    ) : (
                                        StoreSalesProductData.map((user, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 text-[#11401C] font-medium text-[14px] flex items-center gap-2 whitespace-nowrap">
                                                    <div className="border border-[#F3F3F4] px-[6px] py-[6px] rounded-md">
                                                        <Image src={user.image} alt="check" width={18} height={18} />
                                                    </div>
                                                    {user.name}
                                                </td>
                                                <td className="px-4 py-4 text-[#999999] font-medium text-[14px] whitespace-nowrap">{user.sold}</td>
                                                <td className="px-4 py-4 text-[#999999] font-medium text-[14px] whitespace-nowrap">{user.price}</td>
                                                <td className="px-4 py-4 text-[#999999] font-medium text-[14px] flex items-center gap-2 whitespace-nowrap">
                                                    <Image src={user.star} alt="check" width={18} height={18} />
                                                    {user.rating}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sales;