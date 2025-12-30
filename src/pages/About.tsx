import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeroBanner from "@/components/PageHeroBanner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Award, Shield, Star, Clock, Globe, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroAbout from "@/assets/hero-about.jpg";
import heroItaly from "@/assets/hero-italy.jpg";

const About = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: Clock, value: "8+", labelKey: "stats.years" },
    { icon: Globe, value: "50+", labelKey: "stats.destinations" },
    { icon: Users, value: "1000+", labelKey: "stats.travelers" },
    { icon: Star, value: "100%", labelKey: "stats.satisfaction" },
  ];

  const coreValues = [
    { icon: Heart, labelKey: "stats.passion", descKey: "stats.passion.desc" },
    { icon: Award, labelKey: "stats.excellence", descKey: "stats.excellence.desc" },
    { icon: Shield, labelKey: "stats.trust", descKey: "stats.trust.desc" },
    { icon: Star, labelKey: "stats.exclusivity", descKey: "stats.exclusivity.desc" },
  ];

  const coreBeliefs = [
    { titleKey: "about.belief.listening", descKey: "about.belief.listening.desc" },
    { titleKey: "about.belief.intention", descKey: "about.belief.intention.desc" },
    { titleKey: "about.belief.involvement", descKey: "about.belief.involvement.desc" },
    { titleKey: "about.belief.quality", descKey: "about.belief.quality.desc" },
    { titleKey: "about.belief.templates", descKey: "about.belief.templates.desc" },
    { titleKey: "about.belief.precision", descKey: "about.belief.precision.desc" },
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <PageHeroBanner
        tagline={t("about.page.tagline")}
        title={t("about.page.title")}
        description={t("about.page.description")}
        image={heroAbout}
        imageAlt="World map with compass representing global travel"
      />

      {/* Stats Section */}
      <section className="py-16 bg-navy">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-gold" />
                </div>
                <p className="font-serif text-3xl md:text-4xl text-gold mb-2 italic">{stat.value}</p>
                <p className="font-sans text-cream/70 text-xs md:text-sm uppercase tracking-wider">
                  {t(stat.labelKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-sans text-gold tracking-[0.3em] uppercase text-sm mb-4">
              {t("stats.valuesTagline")}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground italic">
              {t("stats.valuesTitle")}
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.labelKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2">{t(value.labelKey)}</h3>
                <p className="font-sans text-muted-foreground text-sm">{t(value.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust and Luxury Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Circular Logo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                {/* Circular text */}
                <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow">
                  <defs>
                    <path
                      id="circlePath"
                      d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                    />
                  </defs>
                  <text className="fill-muted-foreground text-[11px] tracking-[0.3em] uppercase">
                    <textPath href="#circlePath">
                      • THE • LUXURY • TRAVEL • AGENCY • OPATIJA •
                    </textPath>
                  </text>
                </svg>
                {/* Center logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gold flex items-center justify-center">
                    <span className="font-serif text-3xl md:text-4xl text-navy font-bold">OT</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-px bg-gold"></div>
                <p className="font-sans text-gold tracking-[0.2em] uppercase text-sm">
                  {t("about.trust.tagline")}
                </p>
              </div>
              
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-8 italic">
                {t("about.trust.title")}
              </h2>
              
              <div className="space-y-6 font-sans text-muted-foreground leading-relaxed">
                <p>{t("about.trust.p1")}</p>
                <p>{t("about.trust.p2")}</p>
                <p>{t("about.trust.p3")}</p>
              </div>
              
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors mt-8 font-sans"
              >
                {t("about.trust.link")}
                <span>→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section - Image Left, Content Right */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src={heroItaly} 
                alt="Twin brothers' travel philosophy" 
                className="w-full h-[600px] object-cover rounded-lg shadow-xl"
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-6">
                <h3 className="font-serif text-4xl md:text-5xl text-gold italic">{t("about.philosophy.title")}</h3>
                <div className="flex-1 h-px bg-gold/30"></div>
              </div>
              
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {t("about.philosophy.intro")}
              </p>

              <div className="space-y-6">
                {coreBeliefs.map((item, index) => (
                  <motion.div
                    key={item.titleKey}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <span className="text-gold text-xl flex-shrink-0">🌿</span>
                    <div>
                      <span className="font-semibold text-foreground">{t(item.titleKey)}</span>
                      <span className="text-muted-foreground">: {t(item.descKey)}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="flex-1 h-px bg-gold/30 max-w-[100px]"></div>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gold italic">
                  {t("about.promise.title")}
                </h2>
                <div className="flex-1 h-px bg-gold/30 max-w-[100px]"></div>
              </div>
              
              <div className="space-y-6 font-sans text-muted-foreground leading-relaxed text-lg">
                <p>{t("about.promise.p1")}</p>
                <p>{t("about.promise.p2")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gold/30 max-w-[150px]"></div>
              <span className="text-gold text-5xl font-serif">"</span>
              <div className="flex-1 h-px bg-gold/30 max-w-[150px]"></div>
            </div>
            
            <p className="text-lg text-muted-foreground italic mb-6">
              {t("about.quote")}
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <div className="flex-1 h-px bg-gold/30 max-w-[150px]"></div>
              <span className="text-gold">🌿</span>
              <div className="flex-1 h-px bg-gold/30 max-w-[150px]"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
              {t("about.cta.title")}
            </h2>
            <p className="font-sans text-muted-foreground mb-8">
              {t("about.cta.desc")}
            </p>
            <Button variant="gold" size="xl" asChild>
              <Link to="/contact">{t("about.cta.button")}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
