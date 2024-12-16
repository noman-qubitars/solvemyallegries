import Navbar from "@/components/Navbar";
import HomePage from "@/components/Landing/Home";
import AboutPage from "@/components/Landing/About";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HomePage />
      <AboutPage />
    </div>
  );
}
