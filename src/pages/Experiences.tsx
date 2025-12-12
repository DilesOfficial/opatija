import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeroBanner from "@/components/PageHeroBanner";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroExperiences from "@/assets/hero-experiences.jpg";
import wineImage from "@/assets/experience-wine.jpg";
import italyImage from "@/assets/experience-italy.jpg";
import wellnessImage from "@/assets/experience-wellness.jpg";
import drivingImage from "@/assets/experience-driving.jpg";

const experiences = [
  {
    title: "Mediterranean Discovery",
    location: "Greece & Italy",
    description: "Explore the cradle of civilization with island hopping in Greece and coastal drives along the Amalfi. From the white-washed villages of Santorini to the ancient ruins of Rome, experience Mediterranean luxury at its finest.",
    image: italyImage,
    duration: "10-14 Days",
    highlights: ["Greek island hopping", "Amalfi Coast drive", "Wine tasting in Tuscany", "Private yacht experiences"]
  },
  {
    title: "Culinary Immersion",
    location: "Italy & Austria",
    description: "Experience authentic European cuisine with local chefs in Italian countryside villas and Viennese coffee houses. Learn traditional recipes, visit local markets, and savor the finest regional delicacies.",
    image: wineImage,
    duration: "7-10 Days",
    highlights: ["Cooking classes", "Truffle hunting in Italy", "Vienna coffee culture", "Wine estate visits"]
  },
  {
    title: "Wellness Retreat",
    location: "Sri Lanka & Philippines",
    description: "Rejuvenate body and soul with yoga, meditation, and spa treatments in serene Asian destinations. Our wellness retreats combine ancient Ayurvedic practices with pristine island beaches for complete transformation.",
    image: wellnessImage,
    duration: "7-14 Days",
    highlights: ["Ayurvedic spa in Sri Lanka", "Beach yoga in Philippines", "Meditation retreats", "Healthy cuisine"]
  },
  {
    title: "Alpine Adventure",
    location: "Austria & Poland",
    description: "Thrilling adventures through breathtaking alpine landscapes with luxury stays. Experience the romance of the Austrian Alps, explore historic Polish cities, and discover the natural beauty of Central Europe.",
    image: drivingImage,
    duration: "5-8 Days",
    highlights: ["Alpine hiking & skiing", "Historic Krakow tours", "5-star mountain lodges", "Scenic train journeys"]
  },
  {
    title: "Desert & Luxury",
    location: "UAE",
    description: "Experience the ultimate in modern luxury combined with timeless desert adventures. From the iconic skyline of Dubai to serene desert camps under the stars, discover the magic of the Arabian Peninsula.",
    image: italyImage,
    duration: "5-7 Days",
    highlights: ["Dubai luxury shopping", "Desert safari adventures", "Abu Dhabi culture", "World-class dining"]
  },
];

const Experiences = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <PageHeroBanner
        tagline="Signature Journeys"
        title="Boutique Experiences"
        description="Some journeys are stories – filled with taste, color, people, and moments that stay with you. Every boutique experience is crafted to touch the senses across our featured destinations worldwide."
        image={heroExperiences}
        imageAlt="Beautiful sunset over tropical mountains and sea"
      />

      {/* Experiences Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="space-y-24">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
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
                      alt={exp.title}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <span className="font-sans text-gold-light tracking-widest uppercase text-xs">
                        {exp.duration}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <p className="font-sans text-gold tracking-widest uppercase text-sm mb-2">
                    {exp.location}
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                    {exp.title}
                  </h2>
                  <p className="font-sans text-muted-foreground leading-relaxed mb-6">
                    {exp.description}
                  </p>
                  <div className="mb-6">
                    <h4 className="font-sans text-sm text-foreground font-medium mb-3">Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="px-3 py-1 bg-gold/10 text-gold rounded-full text-sm font-sans"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 font-sans text-gold hover:text-gold-dark transition-colors group"
                  >
                    <span>Inquire About This Experience</span>
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
              Custom Journeys
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              Looking for Something Unique?
            </h2>
            <p className="font-sans text-muted-foreground mb-8">
              Can't find exactly what you're looking for? Let us craft a bespoke experience 
              tailored entirely to your preferences across Greece, Italy, Poland, Austria, UAE, Sri Lanka, or the Philippines.
            </p>
            <Button variant="gold" size="xl" asChild>
              <Link to="/contact">Design My Journey</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Experiences;
