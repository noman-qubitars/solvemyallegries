'use client'

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header"
import { AdminMenus } from "@/data/Sidebar/sidebar";

interface Props {
  children: ReactNode;
}

const IndexLayout: React.FC<Props> = ({ children }) => {
  
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const adminToken = localStorage.getItem('adminToken');
        if (adminToken) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.push('/signin');
        }
      }
    };

    checkAuth();
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-900 mx-auto"></div>
          <p className="mt-4 text-[#11401C]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex">
      <div className="hidden lg:block">
        <Sidebar menus={AdminMenus} />
      </div>
      <div className="lg:ml-[250px] xl:ml-[250px] w-full">
        <Header />
        <main className="mt-12 sm:mt-[4.9rem] lg:mt-[4.7rem] px-4 py-4 sm:py-4 bg-[#FAFAFB]">
          {children}
        </main>
      </div>
    </div>
  );
}

export default IndexLayout;