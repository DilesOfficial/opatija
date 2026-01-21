import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ServicesPreview from "@/components/ServicesPreview";
import DestinationsShowcase from "@/components/DestinationsShowcase";
import ExperiencesPreview from "@/components/ExperiencesPreview";
import AboutPreview from "@/components/AboutPreview";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-navy">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <AboutPreview />
      <ServicesPreview />
      <ExperiencesPreview />
      <DestinationsShowcase />
      <Footer />
    </main>
  );
};

export default Index;
