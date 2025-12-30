import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "he" : "en");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 text-sm font-medium text-gold transition-all"
      aria-label={language === "en" ? "Switch to Hebrew" : "Switch to English"}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={language}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex items-center gap-1.5"
        >
          {language === "en" ? (
            <>
              <span className="text-lg">🇮🇱</span>
              <span>HE</span>
            </>
          ) : (
            <>
              <span className="text-lg">🇬🇧</span>
              <span>EN</span>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default LanguageSwitcher;
