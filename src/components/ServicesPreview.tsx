import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Compass, GlassWater, Users, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import serviceConcierge from "@/assets/service-concierge.jpg";

const ServicesPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const services = [
    {
      icon: Compass,
      titleKey: "services.custom.title",
      descKey: "services.custom.desc",
    },
    {
      icon: GlassWater,
      titleKey: "services.concierge.title",
      descKey: "services.concierge.desc",
    },
    {
      icon: Users,
      titleKey: "services.access.title",
      descKey: "services.access.desc",
    },
    {
      icon: Globe,
      titleKey: "services.accommodations.title",
      descKey: "services.accommodations.desc",
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
            {t("services.tagline")}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 sm:mb-6">
            {t("services.title")}
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            {t("services.description")}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.titleKey}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group bg-card rounded-lg p-5 sm:p-8 hover:shadow-xl transition-all duration-500 border border-border hover:border-gold/30"
            >
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
                  <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-2xl text-foreground mb-2 sm:mb-3 group-hover:text-gold transition-colors duration-300">
                    {t(service.titleKey)}
                  </h3>
                  <p className="font-sans text-muted-foreground leading-relaxed text-sm sm:text-base">
                    {t(service.descKey)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-10 sm:mt-16 relative rounded-xl overflow-hidden"
        >
          <img
            src={serviceConcierge}
            alt="Luxury hotel concierge service"
            className="w-full h-[280px] sm:h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-transparent sm:from-navy/80 sm:to-transparent flex items-center">
            <div className="p-5 sm:p-8 md:p-12 max-w-lg">
              <p className="font-sans text-gold-light tracking-widest uppercase text-xs sm:text-sm mb-2 sm:mb-4">
                {t("services.concierge.title")}
              </p>
              <h3 className="font-serif text-xl sm:text-3xl md:text-4xl text-primary-foreground mb-2 sm:mb-4">
                {t("services.title")}
              </h3>
              <p className="font-sans text-primary-foreground/80 mb-4 sm:mb-6 text-sm sm:text-base line-clamp-2 sm:line-clamp-none">
                {t("services.description")}
              </p>
              <Button variant="heroOutline" size="sm" className="sm:size-default" asChild>
                <Link to="/services" className="inline-flex items-center gap-2">
                  {t("services.cta")}
                  <ArrowRight className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;
