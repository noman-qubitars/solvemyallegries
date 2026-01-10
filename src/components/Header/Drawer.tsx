"use client"

import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { SidebarMenu } from "@/data/Sidebar/sidebar";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  menus: SidebarMenu[];
};

const Drawer: React.FC<DrawerProps> = ({ open, onClose, menus }) => {
  const location = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (open) {
      document.addEventListener("keydown", handleEsc);
      // Prevent body scroll when drawer is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [open, onClose]);

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    onClose(); // Close drawer before navigation
    router.push('/signin');
  };

  const handleLinkClick = () => {
    onClose(); // Close drawer when a link is clicked
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/25 transition-opacity duration-300 ease-out z-20 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sliding panel */}
      <aside
        className={`fixed top-0 left-0 h-full w-[250px] bg-white border border-[#E8E8E8] shadow-lg transition-transform duration-300 ease-out z-30 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between h-[4.3rem] px-4 border-b border-[#E8E8E8]">
          <Link href="/dashboard" onClick={handleLinkClick}>
            <Image src="/images/logo.svg" alt="logo" width={160} height={42} />
          </Link>
          <button
            aria-label="Close drawer"
            onClick={onClose}
            className="hover:bg-gray-100 transition-colors"
          >
            <IoClose size={24} className="text-[#666666]" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="pl-4 relative py-6 space-y-3 overflow-y-auto scrollbar-hide h-[calc(100vh-4.3rem)]">
          {menus.map((sidebarMenu, index) => (
            <div key={index}>
              <ul className="space-y-2">
                {sidebarMenu.menuItems.map((item) => (
                  <li key={item.id} className={`relative ${(item.link !== "/" && location.startsWith(item.link || "")) ? "bg-[#E7ECE8]" : ""}`}>
                    <div className={`${(item.link !== "/" && location.startsWith(item.link || "")) ? "bg-[#11401C] rounded-tr-md rounded-br-md absolute top-0 -left-4 w-1 h-full" : ""}`} />
                    {item.id === "logout" ? (
                      <a
                        href="#"
                        onClick={handleLogout}
                        className={`flex items-center gap-3 p-2 text-[14px] capitalize rounded-md hover:text-black text-[#666666] font-medium w-fit transition-colors duration-300 cursor-pointer`}
                      >
                        {item.icon && (
                          <span>
                            <item.icon />
                          </span>
                        )}
                        <span>{item.title}</span>
                      </a>
                    ) : (
                      <Link
                        href={item.link || ""}
                        onClick={handleLinkClick}
                        className={`flex items-center gap-3 p-2 text-[14px] capitalize rounded-md ${(item.link !== "/" && location.startsWith(item.link || "")) ? "bg-[#11401C] font-semibold w-[12rem] text-white pl-3 rounded-md" : "hover:text-black text-[#666666] font-medium w-fit"
                          } transition-colors duration-300`}
                      >
                        {item.icon && (
                          <span>
                            <item.icon />
                          </span>
                        )}
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Drawer;