import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import wineImage from "@/assets/experience-wine.jpg";
import italyImage from "@/assets/experience-italy.jpg";
import wellnessImage from "@/assets/experience-wellness.jpg";
import drivingImage from "@/assets/experience-driving.jpg";

const ExperiencesPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const experiences = [
    {
      titleKey: "experiences.tagline",
      location: `${t("dest.greece")} & ${t("dest.italy")}`,
      descKey: "destinations.greece.desc",
      image: italyImage,
    },
    {
      titleKey: "experiences.tagline",
      location: `${t("dest.austria")} & ${t("dest.poland")}`,
      descKey: "destinations.austria.desc",
      image: drivingImage,
    },
    {
      titleKey: "experiences.tagline",
      location: `${t("dest.srilanka")} & ${t("dest.philippines")}`,
      descKey: "destinations.srilanka.desc",
      image: wellnessImage,
    },
    {
      titleKey: "experiences.tagline",
      location: t("dest.uae"),
      descKey: "destinations.uae.desc",
      image: wineImage,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="font-sans text-gold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm mb-3 sm:mb-4">
            {t("experiences.tagline")}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 sm:mb-6">
            {t("experiences.title")}
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            {t("experiences.description")}
          </p>
        </motion.div>

        {/* Experiences Grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group relative rounded-xl overflow-hidden cursor-pointer"
            >
              <Link to="/experiences">
                <div className="aspect-[4/3] relative">
                  <img
                    src={exp.image}
                    alt={exp.location}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-4 sm:p-8 flex flex-col justify-end">
                    <p className="font-sans text-gold-light tracking-widest uppercase text-[10px] sm:text-xs mb-1 sm:mb-2">
                      {exp.location}
                    </p>
                    <h3 className="font-serif text-lg sm:text-2xl md:text-3xl text-primary-foreground mb-1 sm:mb-3">
                      {t(exp.titleKey)}
                    </h3>
                    <p className="font-sans text-primary-foreground/70 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-4 max-w-md line-clamp-2 sm:line-clamp-none">
                      {t(exp.descKey)}
                    </p>
                    <div className="flex items-center gap-2 text-gold group-hover:gap-4 transition-all duration-300">
                      <span className="font-sans text-xs sm:text-sm">{t("about.cta")}</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 sm:mt-16 text-center"
        >
          <p className="font-sans text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
            {t("experiences.description")}
          </p>
          <Button variant="gold" size="default" className="sm:size-default" asChild>
            <Link to="/contact" className="inline-flex items-center gap-2">
              {t("hero.cta.plan")}
              <ArrowRight className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperiencesPreview;
