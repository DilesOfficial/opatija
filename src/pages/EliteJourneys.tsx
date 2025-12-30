import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeroBanner from "@/components/PageHeroBanner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import heroAustria from "@/assets/hero-austria.jpg";
import heroUae from "@/assets/hero-uae.jpg";
import heroPhilippines from "@/assets/hero-philippines.jpg";

const EliteJourneys = () => {
  const { t } = useLanguage();

  const eliteFeatures = [
    { titleKey: "elite.feature.aviation", descKey: "elite.feature.aviation.desc" },
    { titleKey: "elite.feature.accommodations", descKey: "elite.feature.accommodations.desc" },
    { titleKey: "elite.feature.concierge", descKey: "elite.feature.concierge.desc" },
    { titleKey: "elite.feature.experiences", descKey: "elite.feature.experiences.desc" },
    { titleKey: "elite.feature.security", descKey: "elite.feature.security.desc" },
    { titleKey: "elite.feature.logistics", descKey: "elite.feature.logistics.desc" },
  ];

  const elitePillarKeys = [
    "elite.pillar.personalization",
    "elite.pillar.discretion",
    "elite.pillar.execution",
    "elite.pillar.quality",
    "elite.pillar.support",
    "elite.pillar.access",
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <PageHeroBanner
        tagline={t("elite.page.tagline")}
        title={t("elite.page.title")}
        description={t("elite.page.description")}
        image={heroAustria}
        imageAlt="Elite luxury travel experience"
      />

      {/* Intro Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gold mb-8 italic">
                {t("elite.intro.title")}
              </h2>
              
              <div className="space-y-6 font-sans text-muted-foreground leading-relaxed text-lg">
                <p>{t("elite.intro.p1")}</p>
                <p>{t("elite.intro.p2")}</p>
                <p>{t("elite.intro.p3")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Elite Experience Section - Image Left, List Right */}
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
                src={heroUae} 
                alt="Elite luxury experience" 
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
                <h3 className="font-serif text-4xl md:text-5xl text-gold italic">{t("elite.experience.title")}</h3>
                <div className="flex-1 h-px bg-gold/30"></div>
              </div>
              
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {t("elite.experience.intro")}
              </p>

              <div className="space-y-6">
                {eliteFeatures.map((item, index) => (
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

      {/* Pillars Section - Gold accent bar, text left, image right */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-0 items-stretch">
            {/* Content with gold accent */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Gold accent bar */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gold"></div>
              
              <div className="bg-secondary p-10 lg:p-16 h-full">
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="font-serif text-3xl md:text-4xl text-foreground">
                    {t("elite.pillars.title")}
                  </h3>
                  <div className="flex-1 h-px bg-gold/30 hidden md:block"></div>
                </div>
                
                <p className="text-muted-foreground my-8 leading-relaxed">
                  {t("elite.pillars.intro")}
                </p>

                <div className="space-y-4">
                  {elitePillarKeys.map((key, index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <span className="text-gold">🌿</span>
                      <span className="text-foreground">{t(key)}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img 
                src={heroPhilippines} 
                alt="Elite travel destination" 
                className="w-full h-full object-cover min-h-[500px]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Confidence Section */}
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
                  {t("elite.confidence.title")}
                </h2>
                <div className="flex-1 h-px bg-gold/30 max-w-[100px]"></div>
              </div>
              
              <div className="space-y-6 font-sans text-muted-foreground leading-relaxed text-lg">
                <p>{t("elite.confidence.p1")}</p>
                <p>{t("elite.confidence.p2")}</p>
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
              {t("elite.quote")}
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <div className="flex-1 h-px bg-gold/30 max-w-[150px]"></div>
              <span className="text-gold">🌿</span>
              <div className="flex-1 h-px bg-gold/30 max-w-[150px]"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Button variant="gold" size="xl" asChild>
              <Link to="/contact">{t("elite.cta")}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default EliteJourneys;
