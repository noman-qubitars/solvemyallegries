"use client"

import { useState } from "react";
import BreadCrum from "./BreadCrum";
import { StoreAnalysisBtnData } from "@/data/StoreAnalysis";
import Products from "./Products";
import Orders from "./Orders";
import Sales from "./Sales";
import Inventory from "./Inventory";
import Reviews from "./Reviews";

const StoreAnalytics: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <BreadCrum onSearch={setSearchTerm} setSelectedFilter={setSelectedFilter} selectedFilter={selectedFilter} activeIndex={activeIndex} />
      <div className="mt-4">
        <div className="flex items-center gap-8 w-fit">
          {StoreAnalysisBtnData.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`flex items-center gap-1 cursor-pointer border-b-2
                        ${activeIndex === index ? "font-semibold text-[#11401C] border-[#11401C] pb-1" : "font-medium text-[#717171] border-transparent pb-1"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        {activeIndex === 0 &&
          <Products searchTerm={searchTerm} />
        }
        {activeIndex === 1 &&
          <Orders searchTerm={searchTerm} selectedFilter={selectedFilter} />
        }
        {activeIndex === 2 &&
          <Sales searchTerm={searchTerm} />
        }
        {activeIndex === 3 &&
          <Inventory searchTerm={searchTerm} selectedFilter={selectedFilter} />
        }
        {activeIndex === 4 &&
          <Reviews searchTerm={searchTerm} selectedFilter={selectedFilter} />
        }
      </div>
    </div>
  );
};

export default StoreAnalytics;
