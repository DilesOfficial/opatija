import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const destinations = [
    t("dest.greece"),
    t("dest.italy"),
    t("dest.poland"),
    t("dest.austria"),
    t("dest.uae"),
    t("dest.srilanka"),
    t("dest.philippines"),
  ];

  return (
    <footer className="bg-navy py-10 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 sm:mb-6">
              <span className="font-serif text-xl sm:text-2xl font-semibold text-primary-foreground">
                Opatija
              </span>
              <span className="font-sans text-xs sm:text-sm tracking-widest uppercase text-gold-light">
                Travel
              </span>
            </Link>
            <p className="font-sans text-primary-foreground/70 leading-relaxed max-w-md mb-3 sm:mb-4 text-xs sm:text-sm">
              {t("footer.description")}
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {destinations.map(dest => (
                <span key={dest} className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gold/10 text-gold-light text-[10px] sm:text-xs rounded-full font-sans">
                  {dest}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base sm:text-lg text-primary-foreground mb-3 sm:mb-4">{t("footer.quickLinks")}</h4>
            <nav className="space-y-2 sm:space-y-3">
              {[
                { name: t("nav.home"), href: "/" },
                { name: t("nav.services"), href: "/services" },
                { name: t("nav.experiences"), href: "/experiences" },
                { name: t("nav.about"), href: "/about" },
                { name: t("nav.contact"), href: "/contact" },
              ].map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block font-sans text-xs sm:text-sm text-primary-foreground/60 hover:text-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-base sm:text-lg text-primary-foreground mb-3 sm:mb-4">{t("nav.services")}</h4>
            <nav className="space-y-2 sm:space-y-3">
              {[
                t("services.custom.title"),
                t("services.concierge.title"),
                t("services.access.title"),
                t("services.accommodations.title"),
              ].map(service => (
                <Link
                  key={service}
                  to="/services"
                  className="block font-sans text-xs sm:text-sm text-primary-foreground/60 hover:text-gold transition-colors"
                >
                  {service}
                </Link>
              ))}
            </nav>
          </div>

          {/* Destinations - hidden on smallest screens */}
          <div className="hidden sm:block">
            <h4 className="font-serif text-base sm:text-lg text-primary-foreground mb-3 sm:mb-4">{t("footer.destinations")}</h4>
            <nav className="space-y-2 sm:space-y-3">
              {destinations.map(dest => (
                <Link
                  key={dest}
                  to="/experiences"
                  className="block font-sans text-xs sm:text-sm text-primary-foreground/60 hover:text-gold transition-colors"
                >
                  {dest}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/10 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 sm:gap-4">
            <p className="font-sans text-xs sm:text-sm text-primary-foreground/50 text-center">
              © {new Date().getFullYear()} Opatija Travel. {t("footer.rights")}
            </p>
            <p className="font-sans text-xs sm:text-sm text-primary-foreground/50">
              {t("footer.crafted")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
