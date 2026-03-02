import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import ThemeProvider from "@/components/ThemeProvider";
import LightBulbToggle from "@/components/LightBulbToggle";

export default function Index() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#0A0A0F] text-white selection:bg-indigo-500/30 theme-page-bg">
        <Navbar />
        <LightBulbToggle />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </ThemeProvider>
  );
}