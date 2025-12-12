import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeroBanner from "@/components/PageHeroBanner";
import { motion } from "framer-motion";
import { Award, Heart, Shield, Star, Users, Globe, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroAbout from "@/assets/hero-about.jpg";

const values = [
  { icon: Heart, label: "Passion", description: "We love what we do and it shows in every journey we create." },
  { icon: Award, label: "Excellence", description: "Uncompromising quality in every detail, every destination." },
  { icon: Shield, label: "Trust", description: "Your safety and satisfaction are our highest priorities." },
  { icon: Star, label: "Exclusivity", description: "Access to unique experiences you won't find anywhere else." },
];

const stats = [
  { icon: Clock, value: "15+", label: "Years of Experience" },
  { icon: Globe, value: "50+", label: "Destinations Worldwide" },
  { icon: Users, value: "1000+", label: "Happy Travelers" },
  { icon: Star, value: "100%", label: "Client Satisfaction" },
];

const About = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <PageHeroBanner
        tagline="Our Story"
        title="About Opatija Travel"
        description="Born out of a genuine love for travel, human connection, and creating experiences that feel different. Your worldwide travel partner specializing in Greece, Italy, Poland, Austria, UAE, Sri Lanka, and the Philippines."
        image={heroAbout}
        imageAlt="World map with compass representing global travel"
      />

      {/* Story Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                Your Gateway to the World
              </h2>
              <div className="space-y-6 font-sans text-muted-foreground leading-relaxed">
                <p>
                  Opatija Travel was founded by twin brothers, Guy and Raz Friedman, 
                  who share a deep passion for travel and hospitality. The company reflects 
                  years of dedication to travel design and building international relationships 
                  across Europe, the Middle East, and Asia.
                </p>
                <p>
                  Our expertise spans seven featured destinations: the ancient wonders of Greece, 
                  the culinary excellence of Italy, the historic charm of Poland, the alpine 
                  grandeur of Austria, the modern luxury of the UAE, the tropical paradise of 
                  Sri Lanka, and the pristine beaches of the Philippines.
                </p>
                <p>
                  In an era where planning a holiday has become increasingly complex, 
                  we're here to simplify the process and bring back the joy of travel. 
                  What we offer is not just travel services – it's a personal journey, 
                  designed with genuine understanding of your style, preferences, and aspirations.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-card rounded-xl p-10 shadow-xl border border-border">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center">
                    <span className="font-serif text-2xl text-primary">OT</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-foreground">Guy & Raz Friedman</h3>
                    <p className="font-sans text-muted-foreground text-sm">Founders</p>
                  </div>
                </div>
                <blockquote className="font-serif text-xl text-foreground italic leading-relaxed border-l-4 border-gold pl-6">
                  "Whether it's a romantic getaway to Santorini, a family holiday in Austria, 
                  or a wellness retreat in Sri Lanka, we're here to create a journey with meaning 
                  – one that will stay with you long after you return."
                </blockquote>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-gold/30 rounded-xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gold/5 rounded-xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-sans text-gold tracking-[0.3em] uppercase text-sm mb-4">
              What We Stand For
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">
              Our Core Values
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-8 border border-border text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2">{value.label}</h3>
                <p className="font-sans text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-navy">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-gold" />
                </div>
                <p className="font-serif text-4xl text-gold mb-2">{stat.value}</p>
                <p className="font-sans text-primary-foreground/70 text-sm uppercase tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              Let's Create Your Story
            </h2>
            <p className="font-sans text-muted-foreground mb-8">
              Ready to experience travel done differently? Get in touch and let us 
              design a journey that's uniquely yours across our featured destinations worldwide.
            </p>
            <Button variant="gold" size="xl" asChild>
              <Link to="/contact">Start Planning</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
