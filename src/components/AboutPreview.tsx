import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Heart, Shield, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const values = [
    { icon: Heart, label: "Passion" },
    { icon: Award, label: "Excellence" },
    { icon: Shield, label: "Trust" },
    { icon: Star, label: "Exclusivity" },
  ];

  return (
    <section className="py-16 sm:py-24 bg-secondary" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-gold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm mb-3 sm:mb-4">
              {t("about.tagline")}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 sm:mb-6">
              {t("about.title")}
            </h2>
            <div className="space-y-4 sm:space-y-6 font-sans text-muted-foreground leading-relaxed text-sm sm:text-base">
              <p>
                {t("about.description")}
              </p>
            </div>

            {/* Values */}
            <div className="mt-6 sm:mt-10 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-2 sm:gap-3"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                  </div>
                  <span className="font-sans text-foreground font-medium text-sm sm:text-base">{value.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-6 sm:mt-8"
            >
              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-sans text-gold hover:text-gold-dark transition-colors group text-sm sm:text-base"
              >
                <span>{t("about.cta")}</span>
                <ArrowRight className="w-4 h-4 sm:w-[18px] sm:h-[18px] group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Decorative */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main decorative card */}
              <div className="bg-card rounded-xl p-6 sm:p-10 shadow-xl border border-border">
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full gradient-gold flex items-center justify-center flex-shrink-0">
                      <span className="font-serif text-lg sm:text-2xl text-primary">OT</span>
                    </div>
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl text-foreground">Opatija Travel</h3>
                      <p className="font-sans text-muted-foreground text-xs sm:text-sm">{t("about.tagline")}</p>
                    </div>
                  </div>

                  <blockquote className="font-serif text-base sm:text-xl text-foreground italic leading-relaxed border-s-4 border-gold ps-4 sm:ps-6">
                    {t("about.description")}
                  </blockquote>

                  <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-border">
                    <div className="text-center">
                      <p className="font-serif text-2xl sm:text-3xl text-gold">7</p>
                      <p className="font-sans text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">{t("about.stat.destinations")}</p>
                    </div>
                    <div className="text-center">
                      <p className="font-serif text-2xl sm:text-3xl text-gold">500+</p>
                      <p className="font-sans text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">{t("about.stat.travelers")}</p>
                    </div>
                    <div className="text-center">
                      <p className="font-serif text-2xl sm:text-3xl text-gold">24/7</p>
                      <p className="font-sans text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">{t("about.stat.support")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 border-2 border-gold/30 rounded-xl -z-10" />
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-20 h-20 sm:w-32 sm:h-32 bg-gold/5 rounded-xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
