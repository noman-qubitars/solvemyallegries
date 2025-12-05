"use client";

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import Layout from '@/components/Layout';
import Subscription from '@/components/Subscription';
import { IoIosArrowUp } from "react-icons/io";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

const SubscriptionPage: React.FC = () => {

    const [isVisible, setIsVisible] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
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

    useEffect(() => {
        const success = searchParams.get('success');
        const sessionId = searchParams.get('session_id');
        const canceled = searchParams.get('canceled');

        if (success === 'true' && sessionId) {
            setIsProcessing(true);
            api.post('/subscription/verify-payment', { sessionId })
                .then((response) => {
                    if (response.data.success) {
                        window.location.href = '/webinar/subscription?payment=success';
                    }
                })
                .catch((error) => {
                    console.error('Payment verification failed:', error);
                    window.location.href = '/webinar/subscription?payment=error';
                })
                .finally(() => {
                    setIsProcessing(false);
                });
        } else if (canceled === 'true') {
            console.log('Payment was canceled');
        }
    }, [searchParams]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isProcessing) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green mx-auto mb-4"></div>
                        <p className="text-green font-poppins">Processing your payment...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Subscription />

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

export default SubscriptionPage;