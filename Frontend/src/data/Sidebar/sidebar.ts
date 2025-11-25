import Dashboard, { IconProps } from "@/Icons/Dashboard";
import User from "@/Icons/User";
import Messages from "@/Icons/Messages";
import Reports from "@/Icons/Reports";
import Videos from "@/Icons/Videos";
import Database from "@/Icons/Database";
import Rewards from "@/Icons/Rewards";
import Analytics from "@/Icons/Analytics";
import Store from "@/Icons/Store";
import Journals from "@/Icons/Journals";
import Support from "@/Icons/Support";
import Settings from "@/Icons/Settings";
import Logout from "@/Icons/Logout";
import Session from "@/Icons/Session";

export interface Sidebar_Item {
  id: number;
  text: string;
  Image: string;
}

export interface MenuItem {
  id: string;
  title: string;
  link: string;
  icon: React.FC<IconProps>;
}

export interface SidebarMenu {
  menuItems: MenuItem[];
}

export const AdminMenus: SidebarMenu[] = [
  {
    menuItems: [
      {
        id: "dashboard",
        title: "Dashboard",
        link: "/dashboard",
        icon: Dashboard,
      },
      {
        id: "usermanagement",
        title: "User Management",
        link: "/usermanagement",
        icon: User,
      },
      {
        id: "messages",
        title: "Messages",
        link: "/messages",
        icon: Messages,
      },
      {
        id: "allergyreports",
        title: "Allergy Reports",
        link: "/allergyreports",
        icon: Reports,
      },
      {
        id: "educationalvideos",
        title: "Educational Videos",
        link: "/educationalvideos",
        icon: Videos,
      },
      {
        id: "sessionvideos",
        title: "Session Videos",
        link: "/sessionvideos",
        icon: Session,
      },
      {
        id: "allergendatabase",
        title: "Symptom Database",
        link: "/allergendatabase",
        icon: Database,
      },
      {
        id: "rewardsmanagement",
        title: "Rewards Management",
        link: "/rewardsmanagement",
        icon: Rewards,
      },
      {
        id: "reportsanalytics",
        title: "Reports & Analytics",
        link: "/reportsanalytics",
        icon: Analytics,
      },
      {
        id: "storeanalytics",
        title: "Store Analytics",
        link: "/storeanalytics",
        icon: Store,
      },
      {
        id: "journalsanalysis",
        title: "Journals Analysis",
        link: "/journalsanalysis",
        icon: Journals,
      },
      {
        id: "supportfeedback",
        title: "Support Feedback",
        link: "/supportfeedback",
        icon: Support,
      },
      {
        id: "settings",
        title: "Settings",
        link: "/settings",
        icon: Settings,
      },
      {
        id: "logout",
        title: "Logout",
        link: "/signin",
        icon: Logout,
      },
    ],
  },
];
