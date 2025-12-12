import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// Import all destination hero images
import heroGreece from "@/assets/hero-greece.jpg";
import heroItaly from "@/assets/hero-italy.jpg";
import heroPoland from "@/assets/hero-poland.jpg";
import heroAustria from "@/assets/hero-austria.jpg";
import heroUAE from "@/assets/hero-uae.jpg";
import heroSriLanka from "@/assets/hero-srilanka.jpg";
import heroPhilippines from "@/assets/hero-philippines.jpg";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { t, isRTL } = useLanguage();

  const destinations = [
    { nameKey: "dest.greece", taglineKey: "dest.greece.tagline", image: heroGreece },
    { nameKey: "dest.italy", taglineKey: "dest.italy.tagline", image: heroItaly },
    { nameKey: "dest.poland", taglineKey: "dest.poland.tagline", image: heroPoland },
    { nameKey: "dest.austria", taglineKey: "dest.austria.tagline", image: heroAustria },
    { nameKey: "dest.uae", taglineKey: "dest.uae.tagline", image: heroUAE },
    { nameKey: "dest.srilanka", taglineKey: "dest.srilanka.tagline", image: heroSriLanka },
    { nameKey: "dest.philippines", taglineKey: "dest.philippines.tagline", image: heroPhilippines },
  ];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % destinations.length);
  }, [destinations.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
  }, [destinations.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const currentDestination = destinations[currentIndex];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Images with Crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={currentDestination.image}
            alt={`Luxury travel destination - ${t(currentDestination.nameKey)}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy/70" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={isRTL ? nextSlide : prevSlide}
        className="absolute start-2 sm:start-4 md:start-8 z-20 p-2 sm:p-3 rounded-full bg-background/10 backdrop-blur-sm border border-border/20 text-primary-foreground hover:bg-background/20 transition-all"
        aria-label="Previous destination"
      >
        {isRTL ? <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" /> : <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />}
      </button>
      <button
        onClick={isRTL ? prevSlide : nextSlide}
        className="absolute end-2 sm:end-4 md:end-8 z-20 p-2 sm:p-3 rounded-full bg-background/10 backdrop-blur-sm border border-border/20 text-primary-foreground hover:bg-background/20 transition-all"
        aria-label="Next destination"
      >
        {isRTL ? <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" /> : <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />}
      </button>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-sans text-gold-light tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm mb-4 sm:mb-6"
          >
            {t("hero.tagline")}
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-primary-foreground mb-2 sm:mb-4 leading-tight">
                {t("hero.discover")}
                <span className="block text-gradient-gold">{t(currentDestination.nameKey)}</span>
              </h1>
              <p className="font-sans text-primary-foreground/80 text-base sm:text-xl md:text-2xl mb-4 sm:mb-8 italic px-2">
                {t(currentDestination.taglineKey)}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="font-sans text-primary-foreground/70 text-sm sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2 hidden sm:block"
          >
            {t("hero.description")}
          </motion.p>

          {/* Destination Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-10 px-2"
          >
            {destinations.map((destination, index) => (
              <button
                key={destination.nameKey}
                onClick={() => goToSlide(index)}
                className={`px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full font-sans border transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gold text-navy border-gold"
                    : "bg-gold/20 text-gold-light border-gold/30 hover:bg-gold/30"
                }`}
              >
                {t(destination.nameKey)}
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
          >
            <Button variant="luxury" size="lg" className="sm:size-xl text-sm sm:text-base" asChild>
              <Link to="/contact">{t("hero.cta.plan")}</Link>
            </Button>
            <Button variant="heroOutline" size="lg" className="sm:size-xl text-sm sm:text-base" asChild>
              <Link to="/experiences">{t("hero.cta.explore")}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 sm:gap-2">
        {destinations.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-6 sm:w-8 bg-gold"
                : "bg-primary-foreground/40 hover:bg-primary-foreground/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-primary-foreground/60"
        >
          <span className="text-xs tracking-widest uppercase mb-2">{t("hero.scroll")}</span>
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
