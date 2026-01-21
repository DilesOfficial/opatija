import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import logoImage from "@/assets/logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { t } = useLanguage();

  const navLinks = [
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.personal"), href: "/personal" },
    { name: t("nav.eliteJourneys"), href: "/elite-journeys" },
    { name: t("nav.privateFlights"), href: "/private-flights" },
    { name: t("nav.boutique"), href: "/boutique" },
    { name: t("nav.gallery"), href: "/gallery" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showScrolledStyle = isScrolled || !isHomePage;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showScrolledStyle
          ? "bg-navy/70 backdrop-blur-md shadow-lg py-2"
          : "bg-navy/50 backdrop-blur-sm py-3"
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Single line navigation */}
        <div className="flex items-center justify-between gap-4">
          {/* Logo - Left */}
          <Link to="/" className="flex-shrink-0">
            <img 
              src={logoImage} 
              alt="The Opatija Travel Agency" 
              className="h-14 md:h-16 lg:h-20 w-auto object-contain"
            />
          </Link>

          {/* Center Navigation */}
          <nav className="hidden xl:flex items-center justify-center gap-6 2xl:gap-8 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-sans text-[11px] 2xl:text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:text-gold relative group whitespace-nowrap ${
                  location.pathname === link.href 
                    ? "text-gold" 
                    : "text-primary-foreground/90"
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                  location.pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
            ))}
          </nav>

          {/* Right side - Language + CTA */}
          <div className="hidden xl:flex items-center gap-4">
            {/* Language Switcher with highlight */}
            <div className="px-4 py-2 rounded-full border border-gold/40 bg-gold/10 hover:bg-gold/20 transition-all duration-300 cursor-pointer">
              <LanguageSwitcher />
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className="border-gold text-gold hover:bg-gold hover:text-navy tracking-widest uppercase text-[10px] 2xl:text-xs font-sans px-4 2xl:px-6"
              asChild
            >
              <Link to="/contact">{t("nav.requestQuote")}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-full border border-gold/40 bg-gold/10">
              <LanguageSwitcher />
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-primary-foreground"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-navy border-t border-gold/20"
          >
            <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-sans text-primary-foreground/90 py-2 border-b border-gold/10 hover:text-gold transition-colors text-sm tracking-wider uppercase ${
                    location.pathname === link.href ? "text-gold" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Button variant="gold" className="mt-4" asChild>
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  {t("nav.requestQuote")}
                </Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
