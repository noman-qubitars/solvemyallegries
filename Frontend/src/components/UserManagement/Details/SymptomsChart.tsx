"use client"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useState } from "react";

const SymptomsChart = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const days = Array.from({ length: 31 }, (_, i) => `Day ${i + 1}`)

    const options: Highcharts.Options = {
        chart: {
            type: "line",
            height: 300,
            spacing: [10, 10, 15, 10],
            backgroundColor: "white",
        },
        title: { text: "" },
        xAxis: {
            categories: days,
            labels: {
                style: { fontSize: "11px", color: "#717171" },
            },
            tickInterval: 2,
            gridLineWidth: 0,
            gridLineColor: "#e0e0e0",
        },
        yAxis: {
            title: { text: "" },
            min: 1,
            max: 10,
            plotBands: [
                {
                    from: 8,
                    to: 10,
                    color: "rgba(239, 68, 68, 0.1)",
                    zIndex: 0,
                },
                {
                    from: 6,
                    to: 8,
                    color: "rgba(34, 197, 94, 0.1)",
                    zIndex: 0,
                },
                {
                    from: 1,
                    to: 6,
                    color: "rgba(156, 163, 175, 0.05)",
                    zIndex: 0,
                },
            ],
            plotLines: [
                {
                    value: 10,
                    color: "#EF4444",
                    width: 2,
                    zIndex: 5,
                },
                {
                    value: 8,
                    color: "#EF4444",
                    width: 1,
                    zIndex: 5,
                },
                {
                    value: 6,
                    color: "#22C55E",
                    width: 1,
                    zIndex: 5,
                },
                {
                    value: 1,
                    color: "#9CA3AF",
                    width: 1,
                    zIndex: 5,
                },
            ],
            gridLineColor: "#f0f0f0",
            gridLineWidth: 0,
        },
        series: [
            {
                type: "line",
                name: "Symptoms",
                data: [2, 4, 6, 3, 7, 8, 5, 6, 7, 4, 5, 6, 3, 5, 7, 8, 6, 4, 5, 6, 7, 8, 9, 10, 6, 4, 5, 6, 7, 8, 6],
                showInLegend: false,
                color: "#374151",
                lineWidth: 2,
                marker: {
                    enabled: false,
                },
            },
        ],
        tooltip: { enabled: false },
        credits: { enabled: false },
        legend: {
            enabled: false,
        },
        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 500,
                    },
                    chartOptions: {
                        xAxis: {
                            tickInterval: 3,
                        },
                    },
                },
            ],
        },
    }

    return (
        <div className={`rounded-xl shadow-sm border border-gray-200 p-4 bg-white transition-all duration-300 w-[99.4%] ${isFullScreen ? ' fixed inset-0 z-50 flex flex-col justify-center bg-white overflow-hidden' : ''}`}>
            <div className="flex justify-between items-center mb-4">
                <p className="text-[#11401C] font-semibold text-[20px]">Symptoms</p>
                <div className="relative">
                    <button
                        className="p-1.5 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                        onClick={() => setDropdownOpen((open) => !open)}
                    >
                        <HiOutlineDotsHorizontal className="w-4 h-4 text-gray-500" />
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-[5px] top-[15px] z-50 border border-[#DFDFDF] mt-2 w-[95px] bg-white shadow-lg rounded-lg">
                            <button
                                className="w-full cursor-pointer flex items-center pl-[12px] py-[10px] text-[#717171] font-medium"
                                onClick={() => {
                                    setIsFullScreen((prev) => !prev);
                                    setDropdownOpen(false);
                                }}
                            >
                                {isFullScreen ? 'Collapse' : 'Expand'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

                <HighchartsReact highcharts={Highcharts} options={options} />
            <div className="flex justify-center gap-4 text-sm mt-4">
                <div className="flex items-center text-[#939393] font-medium gap-1">
                    <div className="w-4 h-4 bg-[#DB3B21]" />
                    High
                </div>
                <div className="flex items-center text-[#939393] font-medium gap-1">
                    <div className="w-4 h-4 bg-[#11401C]" />
                    Moderate
                </div>
                <div className="flex items-center text-[#939393] font-medium gap-1">
                    <div className="w-4 h-4 bg-[#CCCCCC]" />
                    Low
                </div>
            </div>
        </div>
    )
}

export default SymptomsChart