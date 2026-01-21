import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// Import all destination hero images
import heroGreece from "@/assets/hero-greece.jpg";
import heroItaly from "@/assets/hero-italy.jpg";
import heroAustria from "@/assets/hero-austria.jpg";
import heroUAE from "@/assets/hero-uae.jpg";
import heroPhilippines from "@/assets/hero-philippines.jpg";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { t } = useLanguage();

  const slides = [
    { 
      image: heroGreece,
      headline: t("hero.slide1.headline"),
      subheadline: t("hero.slide1.subheadline"),
      description: t("hero.slide1.description")
    },
    { 
      image: heroItaly,
      headline: t("hero.slide2.headline"),
      subheadline: t("hero.slide2.subheadline"),
      description: t("hero.slide2.description")
    },
    { 
      image: heroAustria,
      headline: t("hero.slide3.headline"),
      subheadline: t("hero.slide3.subheadline"),
      description: t("hero.slide3.description")
    },
    { 
      image: heroUAE,
      headline: t("hero.slide4.headline"),
      subheadline: t("hero.slide4.subheadline"),
      description: t("hero.slide4.description")
    },
    { 
      image: heroPhilippines,
      headline: t("hero.slide5.headline"),
      subheadline: t("hero.slide5.subheadline"),
      description: t("hero.slide5.description")
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const currentSlide = slides[currentIndex];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Images with Crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={currentSlide.image}
            alt="Luxury travel destination"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/40 to-navy/80" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute start-4 md:start-8 z-20 p-3 rounded-full bg-background/10 backdrop-blur-sm border border-gold/20 text-primary-foreground hover:bg-background/20 hover:border-gold/40 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute end-4 md:end-8 z-20 p-3 rounded-full bg-background/10 backdrop-blur-sm border border-gold/20 text-primary-foreground hover:bg-background/20 hover:border-gold/40 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              {/* Script Headline */}
              <h1 className="font-script text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-primary-foreground mb-4 leading-tight">
                {currentSlide.headline}
              </h1>
              
              {/* Decorative Line with Subheadline */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="hidden sm:block flex-1 max-w-[100px] h-px bg-gradient-to-r from-transparent to-gold/60" />
                <p className="font-sans text-primary-foreground/90 text-sm sm:text-base md:text-lg tracking-[0.15em] uppercase">
                  {currentSlide.subheadline}
                </p>
                <span className="hidden sm:block flex-1 max-w-[100px] h-px bg-gradient-to-l from-transparent to-gold/60" />
              </div>
              
              {/* Description */}
              <p className="font-sans text-primary-foreground/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                {currentSlide.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="gold" size="lg" className="text-sm tracking-wider" asChild>
              <Link to="/contact">{t("hero.cta.plan")}</Link>
            </Button>
            <Button variant="heroOutline" size="lg" className="text-sm tracking-wider" asChild>
              <Link to="/about">{t("hero.cta.story")}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-gold"
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-primary-foreground/60"
        >
          <span className="text-xs tracking-widest uppercase mb-2">Scroll</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
