"use client";

import React from "react";

interface Props {
    width?: string;
    height?: string;
}

const Videos: React.FC<Props> = ({ width = "24", height = "24" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={width} viewBox="0 0 18 12" fill="none">
            <path d="M1 0.75H13C13.1358 0.75 13.25 0.864213 13.25 1V11C13.25 11.1358 13.1358 11.25 13 11.25H1C0.864213 11.25 0.75 11.1358 0.75 11V1C0.75 0.864214 0.864214 0.75 1 0.75ZM1.25 10.75H12.75V1.25H1.25V10.75ZM17.25 9.68945L13.5605 6L17.25 2.31055V9.68945ZM7.25 3.75V5.75H9.25V6.25H7.25V8.25H6.75V6.25H4.75V5.75H6.75V3.75H7.25Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
};

export default Videos;