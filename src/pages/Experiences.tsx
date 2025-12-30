import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeroBanner from "@/components/PageHeroBanner";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import heroExperiences from "@/assets/hero-experiences.jpg";
import wineImage from "@/assets/experience-wine.jpg";
import italyImage from "@/assets/experience-italy.jpg";
import wellnessImage from "@/assets/experience-wellness.jpg";
import drivingImage from "@/assets/experience-driving.jpg";

const Experiences = () => {
  const { t } = useLanguage();

  const experiences = [
    {
      titleKey: "experiences.mediterranean.title",
      locationKey: "experiences.mediterranean.location",
      descKey: "experiences.mediterranean.desc",
      image: italyImage,
      durationKey: "experiences.mediterranean.duration",
      highlightKeys: [
        "experiences.mediterranean.h1",
        "experiences.mediterranean.h2",
        "experiences.mediterranean.h3",
        "experiences.mediterranean.h4"
      ]
    },
    {
      titleKey: "experiences.culinary.title",
      locationKey: "experiences.culinary.location",
      descKey: "experiences.culinary.desc",
      image: wineImage,
      durationKey: "experiences.culinary.duration",
      highlightKeys: [
        "experiences.culinary.h1",
        "experiences.culinary.h2",
        "experiences.culinary.h3",
        "experiences.culinary.h4"
      ]
    },
    {
      titleKey: "experiences.wellness.title",
      locationKey: "experiences.wellness.location",
      descKey: "experiences.wellness.desc",
      image: wellnessImage,
      durationKey: "experiences.wellness.duration",
      highlightKeys: [
        "experiences.wellness.h1",
        "experiences.wellness.h2",
        "experiences.wellness.h3",
        "experiences.wellness.h4"
      ]
    },
    {
      titleKey: "experiences.alpine.title",
      locationKey: "experiences.alpine.location",
      descKey: "experiences.alpine.desc",
      image: drivingImage,
      durationKey: "experiences.alpine.duration",
      highlightKeys: [
        "experiences.alpine.h1",
        "experiences.alpine.h2",
        "experiences.alpine.h3",
        "experiences.alpine.h4"
      ]
    },
    {
      titleKey: "experiences.desert.title",
      locationKey: "experiences.desert.location",
      descKey: "experiences.desert.desc",
      image: italyImage,
      durationKey: "experiences.desert.duration",
      highlightKeys: [
        "experiences.desert.h1",
        "experiences.desert.h2",
        "experiences.desert.h3",
        "experiences.desert.h4"
      ]
    },
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <PageHeroBanner
        tagline={t("experiences.page.tagline")}
        title={t("experiences.page.title")}
        description={t("experiences.page.description")}
        image={heroExperiences}
        imageAlt="Beautiful sunset over tropical mountains and sea"
      />

      {/* Experiences Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="space-y-24">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-12 items-center`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative rounded-xl overflow-hidden group">
                    <img
                      src={exp.image}
                      alt={t(exp.titleKey)}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <span className="font-sans text-gold-light tracking-widest uppercase text-xs">
                        {t(exp.durationKey)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <p className="font-sans text-gold tracking-widest uppercase text-sm mb-2">
                    {t(exp.locationKey)}
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                    {t(exp.titleKey)}
                  </h2>
                  <p className="font-sans text-muted-foreground leading-relaxed mb-6">
                    {t(exp.descKey)}
                  </p>
                  <div className="mb-6">
                    <h4 className="font-sans text-sm text-foreground font-medium mb-3">{t("experiences.highlights")}</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.highlightKeys.map((highlightKey) => (
                        <span
                          key={highlightKey}
                          className="px-3 py-1 bg-gold/10 text-gold rounded-full text-sm font-sans"
                        >
                          {t(highlightKey)}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 font-sans text-gold hover:text-gold-dark transition-colors group"
                  >
                    <span>{t("experiences.inquire")}</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Experience CTA */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <p className="font-sans text-gold tracking-[0.3em] uppercase text-sm mb-4">
              {t("experiences.custom.tagline")}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              {t("experiences.custom.title")}
            </h2>
            <p className="font-sans text-muted-foreground mb-8">
              {t("experiences.custom.desc")}
            </p>
            <Button variant="gold" size="xl" asChild>
              <Link to="/contact">{t("experiences.custom.button")}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Experiences;
