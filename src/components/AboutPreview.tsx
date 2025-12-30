import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Decorative Logo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative">
              {/* Circular text badge */}
              <div className="w-64 h-64 md:w-80 md:h-80 relative">
                <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_20s_linear_infinite]">
                  <defs>
                    <path
                      id="circlePath"
                      d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                    />
                  </defs>
                  <text className="font-sans text-xs tracking-[0.3em] uppercase fill-foreground/60">
                    <textPath href="#circlePath" startOffset="0%">
                      THE • LUXURY • TRAVEL • AGENCY • OPATIJA •
                    </textPath>
                  </text>
                </svg>
                {/* Center logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full gradient-gold flex items-center justify-center">
                    <span className="font-serif text-3xl text-primary font-semibold">OT</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="flex-1 max-w-[60px] h-px bg-gold" />
              <p className="font-sans text-gold tracking-[0.2em] uppercase text-xs">
                {t("about.subtitle")}
              </p>
            </div>
            
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground italic mb-8">
              {t("about.subtitle")}
            </h2>
            
            <div className="space-y-6 font-sans text-muted-foreground leading-relaxed">
              <p>
                {t("about.preview.p1")}
              </p>
              <p>
                {t("about.preview.p2")}
              </p>
              <p>
                {t("about.preview.p3")}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8"
            >
              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-sans text-gold hover:text-gold-dark transition-colors group"
              >
                <span>{t("about.cta")}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
