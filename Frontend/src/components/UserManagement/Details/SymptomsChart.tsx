"use client"
import React, { useState, useMemo } from "react";
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { DailySession } from '@/lib/api/dailySessionApi';

interface SymptomsChartProps {
    userId: string;
    sessions: DailySession[];
}

const SymptomsChart: React.FC<SymptomsChartProps> = ({ sessions }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    
    const chartData = useMemo(() => {
        console.log('SymptomsChart - sessions received:', sessions);
        console.log('SymptomsChart - sessions length:', sessions?.length);
        
        if (!sessions || sessions.length === 0) {
            console.log('SymptomsChart - No sessions, returning empty array');
            return [];
        }
        
        const sortedSessions = [...sessions].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA.getTime() - dateB.getTime();
        });
        
        console.log('SymptomsChart - sortedSessions:', sortedSessions);
        console.log('SymptomsChart - sortedSessions dates:', sortedSessions.map(s => ({
            date: s.date,
            dateObj: new Date(s.date),
            utcDate: `${new Date(s.date).getUTCFullYear()}-${new Date(s.date).getUTCMonth()}-${new Date(s.date).getUTCDate()}`
        })));
        
        const data: number[] = [];
        
        sortedSessions.forEach((session, index) => {
            console.log(`SymptomsChart - Processing session ${index + 1}:`, {
                date: session.date,
                answersCount: session.answers.length,
                answers: session.answers
            });
            
            const ratingAnswers = session.answers.filter(
                answer => answer.question?.questionType === 'rating' && typeof answer.answer === 'number'
            );
            
            console.log(`SymptomsChart - Session ${index + 1} rating answers:`, ratingAnswers);
            
            if (ratingAnswers.length > 0) {
                const firstRating = ratingAnswers[0].answer as number;
                console.log(`SymptomsChart - Session ${index + 1} adding rating:`, firstRating);
                data.push(firstRating);
            } else {
                console.log(`SymptomsChart - Session ${index + 1} has no rating answers`);
            }
        });
        
        console.log('SymptomsChart - Final chartData:', data);
        console.log('SymptomsChart - chartData length:', data.length);
        
        return data;
    }, [sessions]);

    const days = useMemo(() => {
        const dayLabels = chartData.map((_, i) => `Day ${i + 1}`);
        console.log('SymptomsChart - days array:', dayLabels);
        console.log('SymptomsChart - days length:', dayLabels.length);
        return dayLabels;
    }, [chartData]);

    const options: Highcharts.Options = useMemo(() => ({
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
            tickInterval: days.length <= 2 ? undefined : 2,
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
                data: chartData.length > 0 ? chartData : [0],
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
                            tickInterval: days.length <= 2 ? undefined : 3,
                        },
                    },
                },
            ],
        },
    }), [chartData, days]);

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