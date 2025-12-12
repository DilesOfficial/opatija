import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { t } = useLanguage();

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.services"), href: "/services" },
    { name: t("nav.experiences"), href: "/experiences" },
    { name: t("nav.gallery"), href: "/gallery" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On non-home pages, always show scrolled style
  const showScrolledStyle = isScrolled || !isHomePage;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showScrolledStyle
          ? "bg-background/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className={`font-serif text-2xl font-semibold tracking-wide transition-colors duration-300 ${
            showScrolledStyle ? "text-foreground" : "text-primary-foreground"
          }`}>
            Opatija
          </span>
          <span className={`font-sans text-sm tracking-widest uppercase transition-colors duration-300 ${
            showScrolledStyle ? "text-gold" : "text-gold-light"
          }`}>
            Travel
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`font-sans text-sm tracking-wide transition-colors duration-300 hover:text-gold ${
                showScrolledStyle ? "text-foreground" : "text-primary-foreground"
              } ${location.pathname === link.href ? "text-gold" : ""}`}
            >
              {link.name}
            </Link>
          ))}
          <LanguageSwitcher />
          <Button
            variant={showScrolledStyle ? "gold" : "heroOutline"}
            size="sm"
            className="ms-4"
            asChild
          >
            <Link to="/contact">{t("nav.contact")}</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 transition-colors duration-300 ${
              showScrolledStyle ? "text-foreground" : "text-primary-foreground"
            }`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t border-border"
          >
            <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-sans text-foreground py-2 border-b border-border/50 hover:text-gold transition-colors ${
                    location.pathname === link.href ? "text-gold" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Button variant="gold" className="mt-4" asChild>
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  {t("nav.contact")}
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
