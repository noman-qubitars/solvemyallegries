"use client";

import React from "react";

interface Props {
    width?: string;
    height?: string;
}

const Rewards: React.FC<Props> = ({ width = "24", height = "24" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width={width} height={height} viewBox="0 0 24.000000 24.000000" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
                <path d="M43 203 c-25 -10 -13 -44 23 -65 25 -15 32 -24 25 -31 -18 -18 -12 -56 9 -67 41 -22 82 34 49 67 -7 7 0 17 25 33 37 22 40 28 30 54 -5 13 -21 16 -78 15 -39 0 -77 -3 -83 -6z m37 -28 c0 -27 -6 -30 -29 -16 -17 11 -7 41 14 41 9 0 15 -9 15 -25z m70 -9 c0 -39 -11 -50 -40 -41 -15 5 -20 15 -20 41 0 31 2 34 30 34 28 0 30 -3 30 -34z m47 18 c3 -9 0 -20 -8 -25 -23 -14 -29 -11 -29 16 0 28 27 35 37 9z m-63 -80 c9 -3 16 -16 16 -29 0 -25 -21 -38 -45 -29 -18 7 -20 50 -2 57 6 3 13 6 14 6 1 1 8 -2 17 -5z" />
            </g>
        </svg>
    );
};

export default Rewards;