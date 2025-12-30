import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeroBanner from "@/components/PageHeroBanner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import heroGreece from "@/assets/hero-greece.jpg";
import heroUae from "@/assets/hero-uae.jpg";
import heroAustria from "@/assets/hero-austria.jpg";
import heroItaly from "@/assets/hero-italy.jpg";

const Boutique = () => {
  const { t } = useLanguage();

  const experiences = [
    {
      id: "uae",
      titleKey: "boutique.uae.title",
      subtitleKey: "boutique.uae.subtitle",
      image: heroUae,
      highlightKeys: [
        "boutique.uae.h1",
        "boutique.uae.h2",
        "boutique.uae.h3",
        "boutique.uae.h4",
        "boutique.uae.h5",
      ],
      introKey: "boutique.uae.intro",
      contentKey: "boutique.uae.content",
      closingKey: "boutique.uae.closing"
    },
    {
      id: "alpine",
      titleKey: "boutique.alpine.title",
      subtitleKey: "boutique.alpine.subtitle",
      image: heroAustria,
      highlightKeys: [
        "boutique.alpine.h1",
        "boutique.alpine.h2",
        "boutique.alpine.h3",
        "boutique.alpine.h4",
        "boutique.alpine.h5",
      ],
      introKey: "boutique.alpine.intro",
      contentKey: "boutique.alpine.content",
      closingKey: "boutique.alpine.closing"
    },
    {
      id: "mediterranean",
      titleKey: "boutique.mediterranean.title",
      subtitleKey: "boutique.mediterranean.subtitle",
      image: heroGreece,
      highlightKeys: [
        "boutique.mediterranean.h1",
        "boutique.mediterranean.h2",
        "boutique.mediterranean.h3",
        "boutique.mediterranean.h4",
        "boutique.mediterranean.h5",
      ],
      introKey: "boutique.mediterranean.intro",
      contentKey: "boutique.mediterranean.content",
      closingKey: "boutique.mediterranean.closing"
    },
    {
      id: "tuscany",
      titleKey: "boutique.tuscany.title",
      subtitleKey: "boutique.tuscany.subtitle",
      image: heroItaly,
      highlightKeys: [
        "boutique.tuscany.h1",
        "boutique.tuscany.h2",
        "boutique.tuscany.h3",
        "boutique.tuscany.h4",
        "boutique.tuscany.h5",
      ],
      introKey: "boutique.tuscany.intro",
      contentKey: "boutique.tuscany.content",
      closingKey: "boutique.tuscany.closing"
    }
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <PageHeroBanner
        tagline={t("boutique.page.tagline")}
        title={t("boutique.page.title")}
        description={t("boutique.page.description")}
        image={heroGreece}
        imageAlt="Boutique luxury travel experience"
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
                {t("boutique.intro.title")}
              </h2>
              
              <div className="space-y-6 font-sans text-muted-foreground leading-relaxed text-lg">
                <p>{t("boutique.intro.p1")}</p>
                <p>{t("boutique.intro.p2")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Sections */}
      {experiences.map((experience, index) => (
        <section 
          key={experience.id} 
          className={`py-20 ${index % 2 === 0 ? 'bg-background' : 'bg-secondary'}`}
        >
          <div className="container mx-auto px-6">
            {/* Alternating layout: even = image left, odd = image right */}
            <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={index % 2 === 1 ? 'lg:order-2' : ''}
              >
                <img 
                  src={experience.image} 
                  alt={t(experience.titleKey)} 
                  className="w-full h-[500px] object-cover rounded-lg shadow-xl"
                />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={index % 2 === 1 ? 'lg:order-1' : ''}
              >
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="font-serif text-3xl md:text-4xl text-gold italic">{t(experience.titleKey)}</h3>
                  <div className="flex-1 h-px bg-gold/30 hidden md:block"></div>
                </div>
                <p className="text-foreground font-serif text-lg mb-6">{t(experience.subtitleKey)}</p>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t(experience.introKey)}
                </p>

                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {t(experience.contentKey)}
                </p>

                {/* Highlights */}
                <div className="space-y-3 mb-8">
                  {experience.highlightKeys.map((highlightKey, hIndex) => (
                    <motion.div
                      key={highlightKey}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: hIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <span className="text-gold">🌿</span>
                      <span className="text-foreground text-sm">{t(highlightKey)}</span>
                    </motion.div>
                  ))}
                </div>

                <p className="text-muted-foreground italic text-sm">
                  {t(experience.closingKey)}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

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
              {t("boutique.quote")}
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
              <Link to="/contact">{t("boutique.cta")}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Boutique;
