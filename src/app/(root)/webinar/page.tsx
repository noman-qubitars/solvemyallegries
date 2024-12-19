import React from 'react'
import Navbar from '@/components/Navbar';
import Webinar from '@/components/Webinar';
import Footer from '@/components/Footer';

const WebinardPage: React.FC = () => {
    return (
        <>
            <Navbar />
            <Webinar />
            <Footer />
        </>
    )
}

export default WebinardPage;