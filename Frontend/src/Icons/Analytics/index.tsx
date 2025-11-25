"use client";

import React from "react";

interface Props {
    width?: string;
    height?: string;
}

const Analytics: React.FC<Props> = ({ width = "24", height = "24" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 18 18" fill="none">
            <path d="M2 0.75H16C16.6858 0.75 17.25 1.31421 17.25 2V16C17.25 16.6858 16.6858 17.25 16 17.25H2C1.31421 17.25 0.75 16.6858 0.75 16V2C0.75 1.31421 1.31421 0.75 2 0.75ZM1.25 16.75H16.75V1.25H1.25V16.75ZM13.25 10.75V13.25H12.75V10.75H13.25ZM9.25 4.75V13.25H8.75V4.75H9.25ZM5.25 7.75V13.25H4.75V7.75H5.25Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
};

export default Analytics;