"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { appfeatures } from "@/data/Landing";

const About: React.FC = () => {

  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setSlidesToShow(1);
      } else if (width < 768) {
        setSlidesToShow(1);
      } else if (width < 1024) {
        setSlidesToShow(2);
      } else if (width < 1280) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 700,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div id="feature-section" className="mt-[70px]">
      <p className="text-center font-poppins font-bold text-[30px] sm:text-[36px] md:text-[44px] text-green">
        App Features
      </p>

      <div className="overflow-hidden px-3 mt-[45px] sm:mt-[60px] md:mt-[70px] lg:mt-[81px] relative pb-[78px] sm:pb-[88px] md:pb-[100px] lg:pb-[115px]">
        <div className="absolute left-0 top-[10px] z-0">
          <Image
            src="/images/background-simple.png"
            alt="feature"
            width={128}
            height={128}
            className="object-cover"
          />
        </div>

        <Slider {...settings}>
          {appfeatures.map((feature) => (
            <div key={feature.id} className="px-2">
              <div className="flex flex-col items-center text-center bg-white rounded-2xl px-6 py-10 w-full h-full border border-black-50">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={128}
                  height={128}
                  className="w-[128px] h-[128px]"
                />
                <div className="mt-4 h-[56px] flex items-start justify-center w-full">
                  <h3 className="font-poppins font-semibold text-lg text-green leading-tight">
                    {feature.title}
                  </h3>
                </div>
                <div className="mt-2 h-[48px] flex items-start justify-center w-full">
                  <p className="text-gray-500 font-poppins font-medium leading-tight">
                    {feature.desp}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* How Does This App Work Section */}
      <div className="max-w-340 mb-[82px] mx-auto mt-4 px-4 sm:px-6 lg:px-8">
        <p className="text-green font-poppins font-bold text-[26px] sm:text-[36px] md:text-[40px] lg:text-[44px] text-center sm:text-left px-2 sm:px-0">
          How does This App Work?
        </p>
        <div className="flex justify-center pt-[50px] sm:pt-[60px] md:pt-[75px]">
          <Image
            src="/images/appWork.png"
            alt="App Feature"
            width={900}
            height={460}
            className="w-full max-w-[440px] sm:max-w-[500px] md:max-w-[650px] lg:max-w-[800px] xl:max-w-[870px] h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
