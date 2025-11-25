"use client";

import React from "react";

interface Props {
    width?: string;
    height?: string;
}

const Export: React.FC<Props> = ({ width = "10", height = "10" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 12 12" fill="none">
            <path d="M9.99996 8V10H1.99996V8H0.666626V10C0.666626 10.7333 1.26663 11.3333 1.99996 11.3333H9.99996C10.7333 11.3333 11.3333 10.7333 11.3333 10V8H9.99996ZM2.66663 4L3.60663 4.94L5.33329 3.22V8.66667H6.66663V3.22L8.39329 4.94L9.33329 4L5.99996 0.666672L2.66663 4Z" fill="currentColor" />
        </svg>
    );
};

export default Export;