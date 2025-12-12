import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesPreview from "@/components/ServicesPreview";
import DestinationsShowcase from "@/components/DestinationsShowcase";
import ExperiencesPreview from "@/components/ExperiencesPreview";
import AboutPreview from "@/components/AboutPreview";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesPreview />
      <DestinationsShowcase />
      <ExperiencesPreview />
      <AboutPreview />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
