import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeroBanner from "@/components/PageHeroBanner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import heroItaly from "@/assets/hero-italy.jpg";
import heroGreece from "@/assets/hero-greece.jpg";
import experienceWellness from "@/assets/experience-wellness.jpg";

const Personal = () => {
  const { t } = useLanguage();

  const questItems = [
    { titleKey: "personal.quest.beach", descKey: "personal.quest.beach.desc" },
    { titleKey: "personal.quest.culture", descKey: "personal.quest.culture.desc" },
    { titleKey: "personal.quest.wine", descKey: "personal.quest.wine.desc" },
    { titleKey: "personal.quest.adventure", descKey: "personal.quest.adventure.desc" },
    { titleKey: "personal.quest.wellness", descKey: "personal.quest.wellness.desc" },
    { titleKey: "personal.quest.culinary", descKey: "personal.quest.culinary.desc" },
  ];

  const occasionKeys = [
    "personal.occasion.romantic",
    "personal.occasion.honeymoon",
    "personal.occasion.milestone",
    "personal.occasion.family",
    "personal.occasion.friends",
    "personal.occasion.solo",
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <PageHeroBanner
        tagline={t("personal.page.tagline")}
        title={t("personal.page.title")}
        description={t("personal.page.description")}
        image={heroItaly}
        imageAlt="Personal luxury travel experience"
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
                {t("personal.intro.title")}
              </h2>
              
              <div className="space-y-6 font-sans text-muted-foreground leading-relaxed text-lg">
                <p>{t("personal.intro.p1")}</p>
                <p>{t("personal.intro.p2")}</p>
                <p>{t("personal.intro.p3")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quest Section - Image Left, List Right */}
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
                src={experienceWellness} 
                alt="Luxury travel experience" 
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
                <h3 className="font-serif text-4xl md:text-5xl text-gold italic">{t("personal.quest.title")}</h3>
                <div className="flex-1 h-px bg-gold/30"></div>
              </div>
              
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {t("personal.quest.intro")}
              </p>

              <div className="space-y-6">
                {questItems.map((item, index) => (
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

      {/* Creating Memories Section - Gold accent bar, text left, image right */}
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
                    {t("personal.memories.title")}
                  </h3>
                  <div className="flex-1 h-px bg-gold/30 hidden md:block"></div>
                </div>
                
                <p className="text-muted-foreground my-8 leading-relaxed">
                  {t("personal.memories.desc")}
                </p>

                <div className="space-y-4">
                  {occasionKeys.map((key, index) => (
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
                src={heroGreece} 
                alt="Family creating memories" 
                className="w-full h-full object-cover min-h-[500px]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Peace of Mind Section */}
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
                  {t("personal.peace.title")}
                </h2>
                <div className="flex-1 h-px bg-gold/30 max-w-[100px]"></div>
              </div>
              
              <div className="space-y-6 font-sans text-muted-foreground leading-relaxed text-lg">
                <p>{t("personal.peace.p1")}</p>
                <p>{t("personal.peace.p2")}</p>
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
              {t("personal.quote")}
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
              <Link to="/contact">{t("personal.cta")}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Personal;
