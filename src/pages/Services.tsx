import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeroBanner from "@/components/PageHeroBanner";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Compass, GlassWater, Users, Globe, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroServices from "@/assets/hero-services.jpg";

const services = [
  {
    icon: Compass,
    title: "Tailor-Made Holidays",
    description:
      "We design journeys that reflect your personality, rhythm, and dreams. From destination selection to itinerary planning, hotel bookings, restaurant reservations, and unique experiences across Greece, Italy, Austria, UAE, and beyond.",
    features: [
      "Personalized itinerary design",
      "Handpicked accommodations",
      "Restaurant reservations",
      "Activity planning",
      "24/7 travel support"
    ]
  },
  {
    icon: GlassWater,
    title: "Boutique Journeys",
    description:
      "Curated experiences with meaning. We create boutique journeys to select destinations around the world, combining culture, gastronomy, wine, and adventure. Explore the vineyards of Italy, temples of Sri Lanka, or beaches of the Philippines.",
    features: [
      "Curated group experiences",
      "Cultural immersion",
      "Gastronomy & wine tours",
      "Expert local guides",
      "Unique accommodations"
    ]
  },
  {
    icon: Users,
    title: "Family & Group Operations",
    description:
      "Complete solutions for groups and families. We handle all logistics – flights, accommodations, transportation, guides – so you can simply enjoy the journey. Perfect for multi-generational trips to Poland, Austria, or island hopping in Greece.",
    features: [
      "Multi-generational planning",
      "Group coordination",
      "Private transportation",
      "Kid-friendly activities",
      "Seamless logistics"
    ]
  },
  {
    icon: Globe,
    title: "Concierge Services",
    description:
      "Wherever you travel, we're already there. Our extensive network provides a full, personalized concierge experience in Dubai, Athens, Rome, Vienna, and all our featured destinations worldwide.",
    features: [
      "VIP access & reservations",
      "Private guides & drivers",
      "Local recommendations",
      "Emergency assistance",
      "Special requests"
    ]
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <PageHeroBanner
        tagline="What We Offer"
        title="Our Services"
        description="From the first idea until your plane lands back home, every detail is thoughtfully planned to create memories that last across Greece, Italy, Poland, Austria, UAE, Sri Lanka, and the Philippines."
        image={heroServices}
        imageAlt="Luxury travel destinations featuring Greece and Dubai"
      />

      {/* Services Detail */}
      <section className="py-24 bg-background" ref={ref}>
        <div className="container mx-auto px-6">
          <div className="space-y-24">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
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
                    {service.title}
                  </h2>
                  <p className="font-sans text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                        <span className="font-sans text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`bg-card rounded-xl p-8 border border-border ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
                    <service.icon className="w-24 h-24 text-gold/30" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-navy">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-primary-foreground mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="font-sans text-primary-foreground/70 max-w-2xl mx-auto mb-8">
              Let us craft a bespoke travel experience tailored to your dreams.
            </p>
            <Button variant="luxury" size="xl" asChild>
              <Link to="/contact">Plan Your Journey</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Services;
