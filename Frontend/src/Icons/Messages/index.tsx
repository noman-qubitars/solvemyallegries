"use client";

import React from "react";

interface Props {
    width?: string;
    height?: string;
}

const Messages: React.FC<Props> = ({ width = "19", height = "19" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20" fill="none">
            <path d="M17.4003 16C17.7837 15.2499 18 14.4002 18 13.5C18 10.4624 15.5376 8 12.5 8C9.4624 8 7 10.4624 7 13.5C7 16.5376 9.4624 19 12.5 19H19C19 19 18 18 17.4143 16.0292M16.85 10C16.9484 9.5153 17 9.0137 17 8.5C17 4.35786 13.6421 1 9.5 1C5.35786 1 2 4.35786 2 8.5C2 9.3766 2.15039 10.2181 2.42676 11C3.50098 14.0117 1 16 1 16H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default Messages;