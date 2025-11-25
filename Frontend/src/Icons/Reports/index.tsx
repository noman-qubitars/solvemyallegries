"use client";

import React from "react";

interface Props {
    width?: string;
    height?: string;
}

const Reports: React.FC<Props> = ({ width = "24", height = "24" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 19 20" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M12.6565 1H6.18066C3.31946 1 1 3.31946 1 6.18066V13.9517C1 16.8128 3.31946 19.1323 6.18066 19.1323H12.6565C15.5176 19.1323 17.8372 16.8128 17.8372 13.9517V6.18066C17.8372 3.31946 15.5176 1 12.6565 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.66821 13.7297V14.1731H6.28344V13.7297H8.66821ZM12.5539 9.84497V10.2874H6.28344V9.84497H12.5539ZM12.5539 5.95923V6.40161H6.28344V5.95923H12.5539Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
};

export default Reports;