import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeroBanner from "@/components/PageHeroBanner";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import heroGallery from "@/assets/hero-gallery.jpg";

// Import gallery images
import greece1 from "@/assets/gallery/greece-1.jpg";
import greece2 from "@/assets/gallery/greece-2.jpg";
import italy1 from "@/assets/gallery/italy-1.jpg";
import italy2 from "@/assets/gallery/italy-2.jpg";
import poland1 from "@/assets/gallery/poland-1.jpg";
import poland2 from "@/assets/gallery/poland-2.jpg";
import austria1 from "@/assets/gallery/austria-1.jpg";
import austria2 from "@/assets/gallery/austria-2.jpg";
import uae1 from "@/assets/gallery/uae-1.jpg";
import uae2 from "@/assets/gallery/uae-2.jpg";
import srilanka1 from "@/assets/gallery/srilanka-1.jpg";
import srilanka2 from "@/assets/gallery/srilanka-2.jpg";
import philippines1 from "@/assets/gallery/philippines-1.jpg";
import philippines2 from "@/assets/gallery/philippines-2.jpg";

const destinations = [
  "All",
  "Greece",
  "Italy",
  "Poland",
  "Austria",
  "UAE",
  "Sri Lanka",
  "Philippines",
];

const galleryImages = [
  { src: greece1, country: "Greece", title: "Santorini Sunset", location: "Santorini" },
  { src: greece2, country: "Greece", title: "Mykonos Windmills", location: "Mykonos" },
  { src: italy1, country: "Italy", title: "Amalfi Coast", location: "Positano" },
  { src: italy2, country: "Italy", title: "Venice Canals", location: "Venice" },
  { src: poland1, country: "Poland", title: "Old Town Square", location: "Krakow" },
  { src: poland2, country: "Poland", title: "Royal Castle", location: "Warsaw" },
  { src: austria1, country: "Austria", title: "Alpine Village", location: "Hallstatt" },
  { src: austria2, country: "Austria", title: "Palace Gardens", location: "Vienna" },
  { src: uae1, country: "UAE", title: "City Skyline", location: "Dubai" },
  { src: uae2, country: "UAE", title: "Grand Mosque", location: "Abu Dhabi" },
  { src: srilanka1, country: "Sri Lanka", title: "Ancient Fortress", location: "Sigiriya" },
  { src: srilanka2, country: "Sri Lanka", title: "Tea Plantations", location: "Nuwara Eliya" },
  { src: philippines1, country: "Philippines", title: "Island Paradise", location: "Palawan" },
  { src: philippines2, country: "Philippines", title: "White Beach", location: "Boracay" },
];

const Gallery = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = selectedFilter === "All"
    ? galleryImages
    : galleryImages.filter((img) => img.country === selectedFilter);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <PageHeroBanner
        tagline="Visual Inspiration"
        title="Destination Gallery"
        description="Explore stunning photography from our featured destinations across Greece, Italy, Poland, Austria, UAE, Sri Lanka, and the Philippines."
        image={heroGallery}
        imageAlt="Collage of world travel destinations"
      />

      {/* Filter Section */}
      <section className="py-8 bg-secondary border-b border-border sticky top-[72px] z-40">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {destinations.map((destination) => (
              <button
                key={destination}
                onClick={() => setSelectedFilter(destination)}
                className={`px-4 py-2 rounded-full font-sans text-sm transition-all duration-300 ${
                  selectedFilter === destination
                    ? "bg-gold text-primary-foreground"
                    : "bg-card text-foreground border border-border hover:border-gold/50"
                }`}
              >
                {destination}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="font-sans text-gold-light tracking-widest uppercase text-xs block mb-1">
                      {image.location}
                    </span>
                    <h3 className="font-serif text-lg text-primary-foreground">
                      {image.title}
                    </h3>
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-1 bg-navy/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-sans text-xs text-gold-light">
                      {image.country}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <p className="font-sans text-muted-foreground">
                No images found for this destination.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-2 text-primary-foreground hover:text-gold transition-colors"
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full rounded-xl shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-navy to-transparent rounded-b-xl">
                <span className="font-sans text-gold-light tracking-widest uppercase text-sm block mb-2">
                  {selectedImage.country} • {selectedImage.location}
                </span>
                <h2 className="font-serif text-2xl md:text-3xl text-primary-foreground">
                  {selectedImage.title}
                </h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
};

export default Gallery;
