import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "he";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.experiences": "Experiences",
    "nav.gallery": "Gallery",
    "nav.about": "About",
    "nav.contact": "Contact",
    
    // Hero Section
    "hero.tagline": "Luxury Travel Experiences",
    "hero.discover": "Discover",
    "hero.description": "Your worldwide travel partner – crafting unforgettable journeys across our curated destinations.",
    "hero.cta.plan": "Plan Your Journey",
    "hero.cta.explore": "Explore Experiences",
    "hero.scroll": "Discover",
    
    // Destinations
    "dest.greece": "Greece",
    "dest.greece.tagline": "Where myths come alive",
    "dest.italy": "Italy",
    "dest.italy.tagline": "La dolce vita awaits",
    "dest.poland": "Poland",
    "dest.poland.tagline": "Historic charm unveiled",
    "dest.austria": "Austria",
    "dest.austria.tagline": "Alpine elegance",
    "dest.uae": "UAE",
    "dest.uae.tagline": "Modern luxury redefined",
    "dest.srilanka": "Sri Lanka",
    "dest.srilanka.tagline": "Island of wonders",
    "dest.philippines": "Philippines",
    "dest.philippines.tagline": "Tropical paradise",
    "dest.worldwide": "Worldwide",
    "dest.worldwide.tagline": "Global adventures",
    
    // Destinations Showcase
    "destinations.tagline": "Our Destinations",
    "destinations.title": "Discover Our World",
    "destinations.highlights": "Highlights",
    "destinations.greece.desc": "Ancient ruins, sun-kissed islands, and Mediterranean magic await in the birthplace of Western civilization.",
    "destinations.greece.h1": "Santorini sunsets",
    "destinations.greece.h2": "Athens history",
    "destinations.greece.h3": "Island hopping",
    "destinations.italy.desc": "From Renaissance art to coastal glamour, experience la dolce vita in every corner of this timeless destination.",
    "destinations.italy.h1": "Amalfi Coast",
    "destinations.italy.h2": "Tuscan vineyards",
    "destinations.italy.h3": "Roman heritage",
    "destinations.poland.desc": "Discover medieval cities, pristine nature, and warm hospitality in the heart of Central Europe.",
    "destinations.poland.h1": "Krakow old town",
    "destinations.poland.h2": "Mountain retreats",
    "destinations.poland.h3": "Cultural treasures",
    "destinations.austria.desc": "Alpine grandeur meets imperial elegance in this symphony of nature and refined culture.",
    "destinations.austria.h1": "Vienna palaces",
    "destinations.austria.h2": "Alpine skiing",
    "destinations.austria.h3": "Musical heritage",
    "destinations.uae.desc": "Where ancient traditions meet futuristic luxury in the world's most ambitious destination.",
    "destinations.uae.h1": "Dubai skyline",
    "destinations.uae.h2": "Desert adventures",
    "destinations.uae.h3": "World-class shopping",
    "destinations.srilanka.desc": "Tropical beaches, ancient temples, and wildlife encounters on this teardrop island paradise.",
    "destinations.srilanka.h1": "Tea plantations",
    "destinations.srilanka.h2": "Wildlife safaris",
    "destinations.srilanka.h3": "Ancient temples",
    "destinations.philippines.desc": "Crystal waters, pristine beaches, and warm Filipino hospitality across 7,000 islands.",
    "destinations.philippines.h1": "Palawan islands",
    "destinations.philippines.h2": "Diving paradise",
    "destinations.philippines.h3": "Beach resorts",
    "destinations.worldwide.desc": "Beyond our featured destinations, we craft bespoke journeys to any corner of the globe.",
    "destinations.worldwide.h1": "Custom Itineraries",
    "destinations.worldwide.h2": "Group Tours",
    "destinations.worldwide.h3": "Luxury Escapes",
    
    // Services Preview
    "services.tagline": "Our Services",
    "services.title": "Exceptional Travel Services",
    "services.description": "From personalized itineraries to exclusive access, we handle every detail of your luxury journey.",
    "services.cta": "View All Services",
    "services.custom.title": "Custom Itineraries",
    "services.custom.desc": "Bespoke travel plans tailored to your preferences",
    "services.concierge.title": "24/7 Concierge",
    "services.concierge.desc": "Round-the-clock support throughout your journey",
    "services.access.title": "Exclusive Access",
    "services.access.desc": "VIP experiences and private tours",
    "services.accommodations.title": "Luxury Accommodations",
    "services.accommodations.desc": "Hand-selected hotels and private villas",
    
    // Experiences Preview
    "experiences.tagline": "Curated Experiences",
    "experiences.title": "Unforgettable Moments",
    "experiences.description": "From private yacht charters in Greece to wine tastings in Italy, we craft experiences that become lifelong memories.",
    "experiences.cta": "Explore All Experiences",
    
    // About Preview
    "about.tagline": "About Us",
    "about.title": "Your Journey, Our Passion",
    "about.description": "With decades of experience crafting luxury travel experiences across Greece, Italy, Poland, Austria, UAE, Sri Lanka, and the Philippines, we transform dreams into extraordinary journeys.",
    "about.cta": "Learn More About Us",
    "about.stat.destinations": "Destinations",
    "about.stat.travelers": "Happy Travelers",
    "about.stat.experiences": "Curated Experiences",
    "about.stat.support": "Support",
    
    // Contact Section
    "contact.tagline": "Get In Touch",
    "contact.title": "Start Your Journey",
    "contact.description": "Ready to experience the world in extraordinary style? Let our travel experts craft your perfect journey.",
    "contact.form.name": "Full Name",
    "contact.form.email": "Email Address",
    "contact.form.phone": "Phone Number",
    "contact.form.country": "Country of Residence",
    "contact.form.destination": "Preferred Destination",
    "contact.form.destination.select": "Select a destination",
    "contact.form.travelers": "Number of Travelers",
    "contact.form.dates": "Preferred Travel Dates",
    "contact.form.budget": "Budget Range",
    "contact.form.budget.select": "Select budget range",
    "contact.form.travelerType": "Traveler Type",
    "contact.form.experienceType": "Experience Types",
    "contact.form.requests": "Additional Requests",
    "contact.form.requests.placeholder": "Tell us about your dream journey...",
    "contact.form.submit": "Send Inquiry",
    "contact.form.submitting": "Sending...",
    "contact.success.title": "Thank You!",
    "contact.success.message": "Your inquiry has been submitted. Our travel experts will contact you within 24 hours.",
    "contact.error": "Something went wrong. Please try again.",
    
    // Footer
    "footer.description": "Crafting extraordinary travel experiences across the world's most captivating destinations.",
    "footer.quickLinks": "Quick Links",
    "footer.destinations": "Destinations",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved.",
    "footer.crafted": "Crafted with passion for extraordinary journeys",
    
    // Services Page
    "services.page.tagline": "Premium Services",
    "services.page.title": "Luxury Travel Services",
    "services.page.description": "Experience unparalleled service across Greece, Italy, Poland, Austria, UAE, Sri Lanka, and the Philippines.",
    "services.page.cta": "Plan Your Journey",
    
    // Experiences Page
    "experiences.page.tagline": "Curated Experiences",
    "experiences.page.title": "Unforgettable Journeys",
    "experiences.page.description": "Discover handcrafted experiences across our featured destinations worldwide.",
    
    // About Page
    "about.page.tagline": "Our Story",
    "about.page.title": "About Opatija Travel",
    "about.page.description": "Your trusted partner for luxury travel experiences across the globe.",
    
    // Gallery Page
    "gallery.tagline": "Visual Journey",
    "gallery.title": "Destination Gallery",
    "gallery.description": "Explore stunning imagery from our featured destinations around the world.",
    "gallery.filter.all": "All Destinations",
    
    // Contact Page
    "contact.page.tagline": "Contact Us",
    "contact.page.title": "Get In Touch",
    "contact.page.description": "Ready to start planning your dream journey? We're here to help.",
  },
  he: {
    // Navigation
    "nav.home": "בית",
    "nav.services": "שירותים",
    "nav.experiences": "חוויות",
    "nav.gallery": "גלריה",
    "nav.about": "אודות",
    "nav.contact": "צור קשר",
    
    // Hero Section
    "hero.tagline": "חוויות נסיעה יוקרתיות",
    "hero.discover": "גלה את",
    "hero.description": "השותף שלך לנסיעות ברחבי העולם – יוצרים מסעות בלתי נשכחים ביעדים הנבחרים שלנו.",
    "hero.cta.plan": "תכנן את המסע שלך",
    "hero.cta.explore": "גלה חוויות",
    "hero.scroll": "גלה",
    
    // Destinations
    "dest.greece": "יוון",
    "dest.greece.tagline": "איפה המיתוסים מתעוררים לחיים",
    "dest.italy": "איטליה",
    "dest.italy.tagline": "החיים המתוקים מחכים",
    "dest.poland": "פולין",
    "dest.poland.tagline": "קסם היסטורי נחשף",
    "dest.austria": "אוסטריה",
    "dest.austria.tagline": "אלגנטיות אלפינית",
    "dest.uae": "איחוד האמירויות",
    "dest.uae.tagline": "יוקרה מודרנית מחודשת",
    "dest.srilanka": "סרי לנקה",
    "dest.srilanka.tagline": "אי הפלאות",
    "dest.philippines": "הפיליפינים",
    "dest.philippines.tagline": "גן עדן טרופי",
    "dest.worldwide": "ברחבי העולם",
    "dest.worldwide.tagline": "הרפתקאות גלובליות",
    
    // Destinations Showcase
    "destinations.tagline": "היעדים שלנו",
    "destinations.title": "גלה את העולם שלנו",
    "destinations.highlights": "נקודות עניין",
    "destinations.greece.desc": "חורבות עתיקות, איים מוזהבים וקסם ים תיכוני מחכים במולדת התרבות המערבית.",
    "destinations.greece.h1": "שקיעות סנטוריני",
    "destinations.greece.h2": "היסטוריה אתונאית",
    "destinations.greece.h3": "שייט בין איים",
    "destinations.italy.desc": "מאמנות הרנסנס ועד הזוהר החופי, חווה את החיים המתוקים בכל פינה של יעד נצחי זה.",
    "destinations.italy.h1": "חוף אמאלפי",
    "destinations.italy.h2": "כרמי טוסקנה",
    "destinations.italy.h3": "מורשת רומית",
    "destinations.poland.desc": "גלה ערים מימי הביניים, טבע בתולי והכנסת אורחים חמה בלב מרכז אירופה.",
    "destinations.poland.h1": "העיר העתיקה קראקוב",
    "destinations.poland.h2": "נופשי הרים",
    "destinations.poland.h3": "אוצרות תרבותיים",
    "destinations.austria.desc": "פאר אלפיני פוגש אלגנטיות קיסרית בסימפוניה זו של טבע ותרבות מעודנת.",
    "destinations.austria.h1": "ארמונות וינה",
    "destinations.austria.h2": "סקי אלפיני",
    "destinations.austria.h3": "מורשת מוזיקלית",
    "destinations.uae.desc": "כאשר מסורות עתיקות פוגשות יוקרה עתידנית ביעד השאפתני בעולם.",
    "destinations.uae.h1": "קו הרקיע של דובאי",
    "destinations.uae.h2": "הרפתקאות מדבר",
    "destinations.uae.h3": "קניות ברמה עולמית",
    "destinations.srilanka.desc": "חופים טרופיים, מקדשים עתיקים ומפגשי חיות בר באי הגן עדן הזה.",
    "destinations.srilanka.h1": "מטעי תה",
    "destinations.srilanka.h2": "ספארי חיות בר",
    "destinations.srilanka.h3": "מקדשים עתיקים",
    "destinations.philippines.desc": "מים צלולים, חופים בתוליים והכנסת אורחים פיליפינית חמה ב-7,000 איים.",
    "destinations.philippines.h1": "איי פלאוואן",
    "destinations.philippines.h2": "גן עדן לצוללים",
    "destinations.philippines.h3": "אתרי נופש חוף",
    "destinations.worldwide.desc": "מעבר ליעדים המובילים שלנו, אנו יוצרים מסעות מותאמים אישית לכל פינה בעולם.",
    "destinations.worldwide.h1": "מסלולים מותאמים",
    "destinations.worldwide.h2": "סיורים קבוצתיים",
    "destinations.worldwide.h3": "בריחות יוקרתיות",
    
    // Services Preview
    "services.tagline": "השירותים שלנו",
    "services.title": "שירותי נסיעות יוצאי דופן",
    "services.description": "ממסלולים מותאמים אישית ועד גישה בלעדית, אנו מטפלים בכל פרט במסע היוקרתי שלך.",
    "services.cta": "צפה בכל השירותים",
    "services.custom.title": "מסלולים מותאמים",
    "services.custom.desc": "תוכניות נסיעה מותאמות להעדפותיך",
    "services.concierge.title": "קונסיירז' 24/7",
    "services.concierge.desc": "תמיכה מסביב לשעון לאורך כל המסע",
    "services.access.title": "גישה בלעדית",
    "services.access.desc": "חוויות VIP וסיורים פרטיים",
    "services.accommodations.title": "לינה יוקרתית",
    "services.accommodations.desc": "מלונות נבחרים בקפידה ווילות פרטיות",
    
    // Experiences Preview
    "experiences.tagline": "חוויות נבחרות",
    "experiences.title": "רגעות בלתי נשכחים",
    "experiences.description": "משייט יאכטות פרטי ביוון ועד טעימות יין באיטליה, אנו יוצרים חוויות שהופכות לזכרונות לכל החיים.",
    "experiences.cta": "גלה את כל החוויות",
    
    // About Preview
    "about.tagline": "אודותינו",
    "about.title": "המסע שלך, התשוקה שלנו",
    "about.description": "עם עשרות שנים של ניסיון ביצירת חוויות נסיעה יוקרתיות ביוון, איטליה, פולין, אוסטריה, איחוד האמירויות, סרי לנקה והפיליפינים, אנו הופכים חלומות למסעות יוצאי דופן.",
    "about.cta": "למד עוד עלינו",
    "about.stat.destinations": "יעדים",
    "about.stat.travelers": "נוסעים מרוצים",
    "about.stat.experiences": "חוויות נבחרות",
    "about.stat.support": "תמיכה",
    
    // Contact Section
    "contact.tagline": "צור קשר",
    "contact.title": "התחל את המסע שלך",
    "contact.description": "מוכן לחוות את העולם בסגנון יוצא דופן? תן למומחי הנסיעות שלנו ליצור את המסע המושלם שלך.",
    "contact.form.name": "שם מלא",
    "contact.form.email": "כתובת אימייל",
    "contact.form.phone": "מספר טלפון",
    "contact.form.country": "מדינת מגורים",
    "contact.form.destination": "יעד מועדף",
    "contact.form.destination.select": "בחר יעד",
    "contact.form.travelers": "מספר נוסעים",
    "contact.form.dates": "תאריכי נסיעה מועדפים",
    "contact.form.budget": "טווח תקציב",
    "contact.form.budget.select": "בחר טווח תקציב",
    "contact.form.travelerType": "סוג נוסע",
    "contact.form.experienceType": "סוגי חוויות",
    "contact.form.requests": "בקשות נוספות",
    "contact.form.requests.placeholder": "ספר לנו על המסע החלומי שלך...",
    "contact.form.submit": "שלח פנייה",
    "contact.form.submitting": "שולח...",
    "contact.success.title": "תודה רבה!",
    "contact.success.message": "הפנייה שלך נשלחה. מומחי הנסיעות שלנו יצרו איתך קשר תוך 24 שעות.",
    "contact.error": "משהו השתבש. אנא נסה שוב.",
    
    // Footer
    "footer.description": "יוצרים חוויות נסיעה יוצאות דופן ביעדים המרתקים ביותר בעולם.",
    "footer.quickLinks": "קישורים מהירים",
    "footer.destinations": "יעדים",
    "footer.contact": "צור קשר",
    "footer.rights": "כל הזכויות שמורות.",
    "footer.crafted": "נוצר עם תשוקה למסעות יוצאי דופן",
    
    // Services Page
    "services.page.tagline": "שירותים פרימיום",
    "services.page.title": "שירותי נסיעות יוקרתיות",
    "services.page.description": "חווה שירות ללא תחרות ביוון, איטליה, פולין, אוסטריה, איחוד האמירויות, סרי לנקה והפיליפינים.",
    "services.page.cta": "תכנן את המסע שלך",
    
    // Experiences Page
    "experiences.page.tagline": "חוויות נבחרות",
    "experiences.page.title": "מסעות בלתי נשכחים",
    "experiences.page.description": "גלה חוויות מותאמות אישית ביעדים המובילים שלנו ברחבי העולם.",
    
    // About Page
    "about.page.tagline": "הסיפור שלנו",
    "about.page.title": "אודות Opatija Travel",
    "about.page.description": "השותף המהימן שלך לחוויות נסיעה יוקרתיות ברחבי העולם.",
    
    // Gallery Page
    "gallery.tagline": "מסע ויזואלי",
    "gallery.title": "גלריית יעדים",
    "gallery.description": "גלה תמונות מדהימות מהיעדים המובילים שלנו ברחבי העולם.",
    "gallery.filter.all": "כל היעדים",
    
    // Contact Page
    "contact.page.tagline": "צור קשר",
    "contact.page.title": "דבר איתנו",
    "contact.page.description": "מוכן להתחיל לתכנן את מסע החלומות שלך? אנחנו כאן לעזור.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  const isRTL = language === "he";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
