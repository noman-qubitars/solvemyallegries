"use client";

import React from "react";

export interface IconProps {
    width?: string;
    height?: string;
}

const Dashboard: React.FC<IconProps> = ({ width = "24", height = "24" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
            <path d="M13 12C13 11.4477 13.4477 11 14 11H19C19.5523 11 20 11.4477 20 12V19C20 19.5523 19.5523 20 19 20H14C13.4477 20 13 19.5523 13 19V12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M4 6C4 5.44772 4.44772 5 5 5H9C9.55228 5 10 5.44772 10 6V13C10 13.5523 9.55228 14 9 14H5C4.44772 14 4 13.5523 4 13V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M4 18C4 17.4477 4.44772 17 5 17H9C9.55228 17 10 17.4477 10 18V20C10 20.5523 9.55228 21 9 21H5C4.44772 21 4 20.5523 4 20V18Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M13 5C13 4.44772 13.4477 4 14 4H19C19.5523 4 20 4.44772 20 5V7C20 7.55228 19.5523 8 19 8H14C13.4477 8 13 7.55228 13 7V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
};

export default Dashboard;