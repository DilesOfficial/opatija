import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, Globe, Users, Star, Heart, Award, Shield, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const stats = [
    { value: "8+", labelKey: "stats.years", icon: Clock },
    { value: "50+", labelKey: "stats.destinations", icon: Globe },
    { value: "1000+", labelKey: "stats.travelers", icon: Users },
    { value: "100%", labelKey: "stats.satisfaction", icon: Star },
  ];

  const values = [
    { 
      icon: Heart, 
      labelKey: "stats.passion", 
      descKey: "stats.passion.desc" 
    },
    { 
      icon: Award, 
      labelKey: "stats.excellence", 
      descKey: "stats.excellence.desc" 
    },
    { 
      icon: Shield, 
      labelKey: "stats.trust", 
      descKey: "stats.trust.desc" 
    },
    { 
      icon: Sparkles, 
      labelKey: "stats.exclusivity", 
      descKey: "stats.exclusivity.desc" 
    },
  ];

  return (
    <section ref={ref}>
      {/* Stats Bar */}
      <div className="bg-navy py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-5 h-5 text-gold" />
                </div>
                <p className="font-serif text-4xl md:text-5xl text-gold mb-2">{stat.value}</p>
                <p className="font-sans text-primary-foreground/70 text-xs uppercase tracking-wider">
                  {t(stat.labelKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-background py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-16"
          >
            <p className="font-sans text-gold tracking-[0.3em] uppercase text-xs mb-4">
              {t("stats.valuesTagline")}
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground">
              {t("stats.valuesTitle")}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.labelKey}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                  <value.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2">{t(value.labelKey)}</h3>
                <p className="font-sans text-muted-foreground text-sm leading-relaxed">
                  {t(value.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
