"use client";

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation';
import Layout from '@/components/Layout';
import Subscription from '@/components/Subscription';
import { IoIosArrowUp } from "react-icons/io";

const SubscriptionContent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const searchParams = useSearchParams();

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

    const payment = searchParams.get('payment');
    const paymentSuccess = payment === 'success';

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Layout>
            <Subscription paymentSuccess={paymentSuccess} />

            {isVisible && (
                <button
                    className="fixed bottom-20 cursor-pointer z-40 sm:bottom-20 md:bottom-8 right-8 p-3 bg-green text-white rounded-full shadow-lg transition-all duration-300 ease-in-out"
                    onClick={scrollToTop}
                >
                    <IoIosArrowUp />
                </button>
            )
            }
        </Layout>
    )
}

const SubscriptionPage: React.FC = () => {
    return (
        <Suspense fallback={
            <Layout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green mx-auto mb-4"></div>
                        <p className="text-green font-poppins">Loading...</p>
                    </div>
                </div>
            </Layout>
        }>
            <SubscriptionContent />
        </Suspense>
    );
}

export default SubscriptionPage;