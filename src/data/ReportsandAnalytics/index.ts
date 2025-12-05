import { IconType } from "react-icons";
import { FaArrowTrendUp, FaArrowTrendDown  } from "react-icons/fa6";


export interface ReportsandAnalyticsItem {
    name: string;
    image: string;
    number: string;
    icon: IconType;
    rating: string;
    text: string;
}

export const ReportsandAnalyticsData: ReportsandAnalyticsItem[] = [
    {
        name: "Total Active Users",
        image: "/images/ReportsandAnalytics/vector3.svg",
        number: "2,850",
        icon: FaArrowTrendUp,
        rating: "12%",
        text: "Up from past week"
    },
    {
        name: "Journal Entries Logged",
        image: "/images/ReportsandAnalytics/vector2.svg",
        number: "9,480",
        icon: FaArrowTrendUp,
        rating: "4.3%",
        text: "Down from yesterday"
    },
    {
        name: "High Severity Symptoms",
        image: "/images/ReportsandAnalytics/vector1.svg",
        number: "420",
        icon: FaArrowTrendDown,
        rating: "8.5%",
        text: "Up from yesterday"
    },
    {
        name: "Total Rewards Earned",
        image: "/images/ReportsandAnalytics/vector.svg",
        number: "13,600",
        icon: FaArrowTrendUp,
        rating: "1.8%",
        text: "Up from yesterday"
    }
];

export interface ReportedAllergiesItem {
    allergen: string;
    time: string;
    avg: string;
    total: string;
}

export const ReportedAllergiesData: ReportedAllergiesItem[] = [
    {
        allergen: "Dust Mites",
        time: "3,410",
        avg: "High",
        total: "18%"
    },
    {
        allergen: "Pollen",
        time: "2,789",
        avg: "High",
        total: "15%"
    },
    {
        allergen: "Dairy",
        time: "1,504",
        avg: "Moderate",
        total: "8%"
    },
    {
        allergen: "Shellfish",
        time: "1,102",
        avg: "Moderate",
        total: "6%"
    },
    {
        allergen: "Pet Dander",
        time: "980",
        avg: "Low",
        total: "5%"
    }
];