import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import ThemeProvider from "@/components/ThemeProvider";
import SplashScreen from "@/components/SplashScreen";

export default function Index() {
  return (
    <SplashScreen>
      <ThemeProvider>
        <div className="min-h-screen bg-[#0A0A0F] text-white selection:bg-indigo-500/30 theme-page-bg">
          <Navbar />
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
        </div>
      </ThemeProvider>
    </SplashScreen>
  );
}