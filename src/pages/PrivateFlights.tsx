import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeroBanner from "@/components/PageHeroBanner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Plane, Clock, FileCheck, Users, CheckCircle, Calendar, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import heroUAE from "@/assets/hero-uae.jpg";
import heroPhilippines from "@/assets/hero-philippines.jpg";
import heroCoastal from "@/assets/hero-coastal.jpg";

const PrivateFlights = () => {
  const { t, language } = useLanguage();

  const { data: availableFlights, isLoading } = useQuery({
    queryKey: ['available-flights'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('available_flights')
        .select('*')
        .eq('is_active', true)
        .gte('departure_date', new Date().toISOString().split('T')[0])
        .order('departure_date', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  const flightServices = [
    { titleKey: "flights.service.aircraft", descKey: "flights.service.aircraft.desc" },
    { titleKey: "flights.service.scheduling", descKey: "flights.service.scheduling.desc" },
    { titleKey: "flights.service.routing", descKey: "flights.service.routing.desc" },
    { titleKey: "flights.service.ground", descKey: "flights.service.ground.desc" },
    { titleKey: "flights.service.special", descKey: "flights.service.special.desc" },
    { titleKey: "flights.service.security", descKey: "flights.service.security.desc" },
  ];

  const commitmentKeys = [
    "flights.commitment.247",
    "flights.commitment.contact",
    "flights.commitment.punctuality",
    "flights.commitment.discretion",
    "flights.commitment.partners",
    "flights.commitment.coordination",
  ];

  const processSteps = [
    { icon: FileCheck, titleKey: "flights.process.inquiry.title", descKey: "flights.process.inquiry.desc" },
    { icon: Clock, titleKey: "flights.process.quote.title", descKey: "flights.process.quote.desc" },
    { icon: Users, titleKey: "flights.process.confirm.title", descKey: "flights.process.confirm.desc" },
    { icon: CheckCircle, titleKey: "flights.process.ready.title", descKey: "flights.process.ready.desc" },
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeStr: string | null) => {
    if (!timeStr) return '';
    return timeStr.slice(0, 5);
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <PageHeroBanner
        tagline={t("flights.page.tagline")}
        title={t("flights.page.title")}
        description={t("flights.page.description")}
        image={heroUAE}
        imageAlt="Private jet luxury travel"
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
                {t("flights.intro.title")}
              </h2>
              
              <div className="space-y-6 font-sans text-muted-foreground leading-relaxed text-lg">
                <p>{t("flights.intro.p1")}</p>
                <p>{t("flights.intro.p2")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section - Image Left, List Right */}
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
                src={heroPhilippines} 
                alt="Private aviation experience" 
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
                <h3 className="font-serif text-4xl md:text-5xl text-gold italic">{t("flights.service.title")}</h3>
                <div className="flex-1 h-px bg-gold/30"></div>
              </div>
              
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {t("flights.service.intro")}
              </p>

              <div className="space-y-6">
                {flightServices.map((item, index) => (
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

      {/* Flight Process Timeline */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex-1 h-px bg-gold/30 max-w-[100px]"></div>
              <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">{t("flights.process.tagline")}</span>
              <div className="flex-1 h-px bg-gold/30 max-w-[100px]"></div>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gold italic">
              {t("flights.process.title")}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-background p-8 rounded-lg shadow-lg h-full text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gold/10 rounded-full flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-gold" />
                  </div>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-gold text-background rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-3">{t(step.titleKey)}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{t(step.descKey)}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gold/30"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Flights Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex-1 h-px bg-gold/30 max-w-[100px]"></div>
              <span className="text-gold font-sans text-sm tracking-[0.3em] uppercase">{t("flights.available.tagline")}</span>
              <div className="flex-1 h-px bg-gold/30 max-w-[100px]"></div>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gold italic mb-6">
              {t("flights.available.title")}
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              {t("flights.available.intro")}
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
            </div>
          ) : availableFlights && availableFlights.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {availableFlights.map((flight, index) => (
                <motion.div
                  key={flight.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-secondary p-6 rounded-lg border border-gold/10 hover:border-gold/30 transition-colors"
                >
                  <div className="flex flex-col h-full">
                    {/* Route */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-2 flex-1">
                        <MapPin className="w-5 h-5 text-gold flex-shrink-0" />
                        <span className="font-serif text-xl text-foreground">
                          {language === 'he' ? flight.departure_city_he || flight.departure_city : flight.departure_city}
                        </span>
                      </div>
                      <Plane className="w-5 h-5 text-gold rotate-90" />
                      <div className="flex items-center gap-2 flex-1 justify-end">
                        <span className="font-serif text-xl text-foreground">
                          {language === 'he' ? flight.arrival_city_he || flight.arrival_city : flight.arrival_city}
                        </span>
                        <MapPin className="w-5 h-5 text-gold flex-shrink-0" />
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gold" />
                        <span className="text-muted-foreground">{formatDate(flight.departure_date)}</span>
                      </div>
                      {flight.departure_time && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gold" />
                          <span className="text-muted-foreground">{formatTime(flight.departure_time)}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Plane className="w-4 h-4 text-gold" />
                        <span className="text-muted-foreground">
                          {language === 'he' ? flight.aircraft_type_he || flight.aircraft_type : flight.aircraft_type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gold" />
                        <span className="text-muted-foreground">{flight.available_seats} {t("flights.available.seats")}</span>
                      </div>
                    </div>

                    {/* Notes */}
                    {(flight.notes || flight.notes_he) && (
                      <p className="text-muted-foreground text-sm mb-4 italic">
                        {language === 'he' ? flight.notes_he || flight.notes : flight.notes}
                      </p>
                    )}

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gold/10">
                      {flight.price_from && (
                        <div>
                          <span className="text-xs text-muted-foreground">{t("flights.available.from")}</span>
                          <span className="text-xl font-semibold text-gold ml-2">{flight.price_from}</span>
                        </div>
                      )}
                      <Button variant="outline" size="sm" asChild className="border-gold/30 hover:bg-gold/10">
                        <Link to="/contact">{t("flights.available.inquire")}</Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Plane className="w-12 h-12 text-gold/30 mx-auto mb-4" />
              <p className="text-muted-foreground">{t("flights.available.none")}</p>
              <Button variant="gold" size="lg" asChild className="mt-6">
                <Link to="/contact">{t("flights.available.request")}</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Commitment Section - Gold accent bar, text left, image right */}
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
                    {t("flights.commitment.title")}
                  </h3>
                  <div className="flex-1 h-px bg-gold/30 hidden md:block"></div>
                </div>
                
                <p className="text-muted-foreground my-8 leading-relaxed">
                  {t("flights.commitment.p1")}
                </p>

                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {t("flights.commitment.p2")}
                </p>

                <div className="space-y-4">
                  {commitmentKeys.map((key, index) => (
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
                src={heroCoastal} 
                alt="Luxury destination" 
                className="w-full h-full object-cover min-h-[500px]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
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
                  {t("flights.beyond.title")}
                </h2>
                <div className="flex-1 h-px bg-gold/30 max-w-[100px]"></div>
              </div>
              
              <div className="space-y-6 font-sans text-muted-foreground leading-relaxed text-lg">
                <p>{t("flights.beyond.p1")}</p>
                <p>{t("flights.beyond.p2")}</p>
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
              {t("flights.quote")}
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
              <Link to="/contact">{t("flights.cta")}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PrivateFlights;
