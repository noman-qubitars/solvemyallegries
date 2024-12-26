"use client";

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import HomePage from "@/components/Landing/Home";
import AboutPage from "@/components/Landing/About";
import FeaturesPage from "@/components/Landing/Features";
import CasePage from "@/components/Landing/Case";
import TestimonialPage from "@/components/Landing/Testimonial";
import FrequentlyPage from "@/components/Landing/Frequently";
import { IoIosArrowUp } from "react-icons/io";


export default function Home() {

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
    <Layout>
      <HomePage />
      {/* <AboutPage /> */}
      {/* <FeaturesPage /> */}
      {/* <CasePage /> */}
      {/* <TestimonialPage /> */}
      {/* <FrequentlyPage /> */}

      {isVisible && (
        <button
          className="fixed bottom-20 z-40 sm:bottom-20 md:bottom-8 right-8 p-3 bg-green text-white rounded-full shadow-lg transition-all duration-300 ease-in-out"
          onClick={scrollToTop}
        >
          <IoIosArrowUp />
        </button>
      )
      }
    </Layout>
  );
}
