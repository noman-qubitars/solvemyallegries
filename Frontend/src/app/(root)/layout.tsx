'use client'

import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header"
import { AdminMenus } from "@/data/Sidebar/sidebar";

interface Props {
  children: ReactNode;
}

const IndexLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex">
      <div className="hidden lg:block">
        <Sidebar menus={AdminMenus} />
      </div>
      <div className="lg:ml-[250px] xl:ml-[250px] w-full">
        <Header />
        <main className="mt-[3rem] sm:mt-[4.9rem] lg:mt-[4.7rem] px-4 py-4 sm:py-4 bg-[#FAFAFB]">
          {children}
        </main>
      </div>
    </div>
  );
}

export default IndexLayout;