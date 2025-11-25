"use client";
import {Fragment} from "react";
import React, { ReactNode } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

interface LayoutProps {
    children: ReactNode;
}


const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
      <Fragment>
            <div className="fixed top-0 z-40 w-full">
                <Navbar />
            </div>
            <main className="flex-1 mt-[5rem]">
                {children}
            </main>
            <Footer />
        </Fragment>
    );
};

export default Layout;
