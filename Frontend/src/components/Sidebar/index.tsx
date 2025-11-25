"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { SidebarMenu } from "../../data/Sidebar/sidebar";

interface Props {
  menus: SidebarMenu[];
}

const Sidebar: React.FC<Props> = ({ menus }) => {

  const location = usePathname();

  return (
    <aside className="sm:w-[250px] xl:w-[250px] 2xl:w-[250px] fixed inset-y-0 left-0 z-10 h-screen border border-[#E8E8E8] bg-white">
      <div className="flex items-center justify-center h-[4.3rem]">
        <Link href="/dashboard">
          <Image src="/images/logo.svg" alt="logo" width={160} height={42} />
        </Link>
      </div>
      <nav className="pl-4 relative py-6 space-y-3 2xl:space-y-5 overflow-y-auto scrollbar-hide h-[calc(100vh-4.3rem)]">
        {menus.map((sidebarMenu, index) => (
          <div key={index}>
            <ul className="space-y-2">
              {sidebarMenu.menuItems.map((item) => (
                <li key={item.id} className={`relative ${(item.link !== "/" && location.startsWith(item.link || "")) ? "bg-[#E7ECE8]" : ""}`}>
                  <div className={`${(item.link !== "/" && location.startsWith(item.link || "")) ? "bg-[#11401C] rounded-tr-md rounded-br-md absolute top-0 -left-4 w-1 h-full" : ""}`} />
                  <Link
                    href={item.link || ""}
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
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
