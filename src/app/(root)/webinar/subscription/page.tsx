import React from 'react'
import Navbar from '@/components/Navbar';
import Subscription from '@/components/Subscription';
import Footer from '@/components/Footer';

const SubscriptionPage: React.FC = () => {
    return (
        <>
            <Navbar />
            <Subscription />
            <Footer />
        </>
    )
}

export default SubscriptionPage;