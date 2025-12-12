import { motion } from "framer-motion";

interface PageHeroBannerProps {
  tagline: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

const PageHeroBanner = ({ tagline, title, description, image, imageAlt }: PageHeroBannerProps) => {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-gold-light tracking-[0.3em] uppercase text-sm mb-4"
          >
            {tagline}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary-foreground mb-6"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-sans text-primary-foreground/80 text-lg md:text-xl leading-relaxed"
          >
            {description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default PageHeroBanner;
