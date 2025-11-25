"use client";

import React from "react";

interface Props {
    width?: string;
    height?: string;
}

const Database: React.FC<Props> = ({ width = "24", height = "24" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 22" fill="none">
            <path d="M12 19C12 20.1046 11.1046 21 10 21C8.8954 21 8 20.1046 8 19M12 19C12 17.8954 11.1046 17 10 17M12 19H19M8 19C8 17.8954 8.8954 17 10 17M8 19H1M10 17V13M10 13C15 13 19 11.66 19 10V4M10 13C5 13 1 11.66 1 10V4M19 4C19 5.65685 14.9706 7 10 7C5.02944 7 1 5.65685 1 4M19 4C19 2.34315 14.9706 1 10 1C5.02944 1 1 2.34315 1 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default Database;