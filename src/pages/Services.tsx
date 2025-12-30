import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeroBanner from "@/components/PageHeroBanner";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Compass, GlassWater, Users, Globe, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import heroServices from "@/assets/hero-services.jpg";

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const services = [
    {
      icon: Compass,
      titleKey: "services.tailor.title",
      descKey: "services.tailor.desc",
      featureKeys: [
        "services.tailor.f1",
        "services.tailor.f2",
        "services.tailor.f3",
        "services.tailor.f4",
        "services.tailor.f5"
      ]
    },
    {
      icon: GlassWater,
      titleKey: "services.boutique.title",
      descKey: "services.boutique.desc",
      featureKeys: [
        "services.boutique.f1",
        "services.boutique.f2",
        "services.boutique.f3",
        "services.boutique.f4",
        "services.boutique.f5"
      ]
    },
    {
      icon: Users,
      titleKey: "services.family.title",
      descKey: "services.family.desc",
      featureKeys: [
        "services.family.f1",
        "services.family.f2",
        "services.family.f3",
        "services.family.f4",
        "services.family.f5"
      ]
    },
    {
      icon: Globe,
      titleKey: "services.concierge.page.title",
      descKey: "services.concierge.page.desc",
      featureKeys: [
        "services.concierge.f1",
        "services.concierge.f2",
        "services.concierge.f3",
        "services.concierge.f4",
        "services.concierge.f5"
      ]
    },
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <PageHeroBanner
        tagline={t("services.page.tagline")}
        title={t("services.page.title")}
        description={t("services.page.description")}
        image={heroServices}
        imageAlt="Luxury travel destinations featuring Greece and Dubai"
      />

      {/* Services Detail */}
      <section className="py-24 bg-background" ref={ref}>
        <div className="container mx-auto px-6">
          <div className="space-y-24">
            {services.map((service, index) => (
              <motion.div
                key={service.titleKey}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-gold" />
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                    {t(service.titleKey)}
                  </h2>
                  <p className="font-sans text-muted-foreground leading-relaxed mb-6">
                    {t(service.descKey)}
                  </p>
                  <ul className="space-y-3">
                    {service.featureKeys.map((featureKey) => (
                      <li key={featureKey} className="flex items-center gap-3 text-foreground">
                        <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                        <span className="font-sans">{t(featureKey)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`bg-muted rounded-xl aspect-[4/3] flex items-center justify-center ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <service.icon className="w-24 h-24 text-gold/30" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-card">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto px-6 text-center"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
            {t("services.page.cta.title")}
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto mb-8">
            {t("services.page.cta.desc")}
          </p>
          <Button variant="default" size="lg" asChild>
            <Link to="/contact">
              {t("services.page.cta.button")}
            </Link>
          </Button>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
};

export default Services;
