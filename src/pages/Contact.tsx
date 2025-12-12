import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import PageHeroBanner from "@/components/PageHeroBanner";
import heroContact from "@/assets/hero-contact.jpg";

const Contact = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <PageHeroBanner
        tagline="Start Your Journey"
        title="Contact Us"
        description="We're here to design your next journey with precision, care, and a personal touch. Whether you dream of Greek islands, Italian villas, or Asian retreats – share a few details to help us tailor your experience."
        image={heroContact}
        imageAlt="Luxury hotel lobby with world globe"
      />

      {/* Contact Form Section - Reuse existing component without the header */}
      <ContactSection showHeader={false} />

      <Footer />
    </main>
  );
};

export default Contact;
