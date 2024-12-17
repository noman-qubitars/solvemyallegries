import Navbar from "@/components/Navbar";
import HomePage from "@/components/Landing/Home";
import AboutPage from "@/components/Landing/About";
import FeaturesPage from "@/components/Landing/Features";
import CasePage from "@/components/Landing/Case";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HomePage />
      <AboutPage />
      <FeaturesPage />
      <CasePage />
    </div>
  );
}
