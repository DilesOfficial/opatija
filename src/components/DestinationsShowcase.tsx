import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const DestinationsShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const destinations = [
    {
      nameKey: "dest.greece",
      descKey: "destinations.greece.desc",
      highlights: ["Santorini", "Athens", "Mykonos", "Crete"],
    },
    {
      nameKey: "dest.italy",
      descKey: "destinations.italy.desc",
      highlights: ["Tuscany", "Amalfi Coast", "Rome", "Venice"],
    },
    {
      nameKey: "dest.poland",
      descKey: "destinations.poland.desc",
      highlights: ["Krakow", "Warsaw", "Gdańsk", "Zakopane"],
    },
    {
      nameKey: "dest.austria",
      descKey: "destinations.austria.desc",
      highlights: ["Vienna", "Salzburg", "Innsbruck", "Hallstatt"],
    },
    {
      nameKey: "dest.uae",
      descKey: "destinations.uae.desc",
      highlights: ["Dubai", "Abu Dhabi", "Ras Al Khaimah"],
    },
    {
      nameKey: "dest.srilanka",
      descKey: "destinations.srilanka.desc",
      highlights: ["Colombo", "Kandy", "Galle", "Sigiriya"],
    },
    {
      nameKey: "dest.philippines",
      descKey: "destinations.philippines.desc",
      highlights: ["Palawan", "Boracay", "Cebu", "Siargao"],
    },
    {
      nameKey: "dest.worldwide",
      descKey: "destinations.worldwide.desc",
      highlights: ["Custom Itineraries", "Group Tours", "Luxury Escapes"],
      isWorldwide: true,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-secondary" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="font-sans text-gold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm mb-3 sm:mb-4">
            {t("destinations.tagline")}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 sm:mb-6">
            {t("destinations.title")}
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            {t("hero.description")}
          </p>
        </motion.div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.nameKey}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-xl p-4 sm:p-6 border border-border hover:border-gold/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors flex-shrink-0">
                  {destination.isWorldwide ? (
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                  ) : (
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                  )}
                </div>
                <h3 className="font-serif text-base sm:text-xl text-foreground group-hover:text-gold transition-colors">
                  {t(destination.nameKey)}
                </h3>
              </div>
              <p className="font-sans text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                {t(destination.descKey)}
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {destination.highlights.slice(0, 3).map((highlight) => (
                  <span
                    key={highlight}
                    className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gold/10 text-gold text-[10px] sm:text-xs rounded-full font-sans"
                  >
                    {highlight}
                  </span>
                ))}
                {destination.highlights.length > 3 && (
                  <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gold/10 text-gold text-[10px] sm:text-xs rounded-full font-sans sm:hidden">
                    +{destination.highlights.length - 3}
                  </span>
                )}
                {destination.highlights.slice(3).map((highlight) => (
                  <span
                    key={highlight}
                    className="hidden sm:inline-block px-2 py-1 bg-gold/10 text-gold text-xs rounded-full font-sans"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsShowcase;
