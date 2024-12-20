"use client";

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar';
import Webinar from '@/components/Webinar';
import Footer from '@/components/Footer';
import { IoIosArrowUp } from "react-icons/io";

const WebinardPage: React.FC = () => {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <Navbar />
            <Webinar />
            <Footer />

            {isVisible && (
                <button
                    className="fixed bottom-20 z-40 sm:bottom-20 md:bottom-8 right-8 p-3 bg-green text-white rounded-full shadow-lg transition-all duration-300 ease-in-out"
                    onClick={scrollToTop}
                >
                    <IoIosArrowUp />
                </button>
            )
            }
        </div>
    )
}

export default WebinardPage;