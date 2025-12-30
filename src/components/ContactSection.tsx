import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const destinationKeys = [
  "contact.dest.italy", "contact.dest.france", "contact.dest.greece", "contact.dest.croatia",
  "contact.dest.portugal", "contact.dest.spain", "contact.dest.austria", "contact.dest.switzerland",
  "contact.dest.srilanka", "contact.dest.thailand", "contact.dest.japan", "contact.dest.other"
];

const travelerTypeKeys = [
  "contact.traveler.solo",
  "contact.traveler.couple",
  "contact.traveler.familyYoung",
  "contact.traveler.familyTeens",
  "contact.traveler.multiGen",
  "contact.traveler.friends",
];

const budgetRangeKeys = [
  "contact.budget.5k",
  "contact.budget.10k",
  "contact.budget.20k",
  "contact.budget.50k",
  "contact.budget.100k",
];

const experienceTypeKeys = [
  "contact.exp.hotel",
  "contact.exp.villa",
  "contact.exp.cruise",
  "contact.exp.safari",
  "contact.exp.tours",
  "contact.exp.wellness",
];

interface ContactSectionProps {
  showHeader?: boolean;
}

const ContactSection = ({ showHeader = true }: ContactSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTravelerTypes, setSelectedTravelerTypes] = useState<string[]>([]);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    destination: "",
    numTravelers: "",
    travelDates: "",
    budget: "",
    additionalRequests: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleTravelerTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedTravelerTypes([...selectedTravelerTypes, type]);
    } else {
      setSelectedTravelerTypes(selectedTravelerTypes.filter(t => t !== type));
    }
  };

  const handleExperienceChange = (exp: string, checked: boolean) => {
    if (checked) {
      setSelectedExperiences([...selectedExperiences, exp]);
    } else {
      setSelectedExperiences(selectedExperiences.filter(e => e !== exp));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone || undefined,
            country: formData.country || undefined,
            destination: formData.destination || undefined,
            numTravelers: formData.numTravelers ? parseInt(formData.numTravelers) : undefined,
            travelDates: formData.travelDates || undefined,
            budget: formData.budget || undefined,
            travelerTypes: selectedTravelerTypes.length > 0 ? selectedTravelerTypes : undefined,
            experienceTypes: selectedExperiences.length > 0 ? selectedExperiences : undefined,
            additionalRequests: formData.additionalRequests || undefined,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast({
          title: t("contact.success.title"),
          description: t("contact.success.message"),
        });

        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          country: "",
          destination: "",
          numTravelers: "",
          travelDates: "",
          budget: "",
          additionalRequests: "",
        });
        setSelectedTravelerTypes([]);
        setSelectedExperiences([]);
      } else {
        throw new Error(result.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: t("contact.error.title"),
        description: t("contact.error.message"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-secondary" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-16"
          >
            <p className="font-sans text-gold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm mb-3 sm:mb-4">
              {t("contact.tagline")}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 sm:mb-6">
              {t("contact.title")}
            </h2>
            <p className="font-sans text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              {t("contact.description")}
            </p>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1 space-y-4 sm:space-y-8"
          >
            <div className="bg-card rounded-xl p-5 sm:p-8 border border-border">
              <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-4 sm:mb-6">{t("contact.info.getInTouch")}</h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-sans text-xs sm:text-sm text-muted-foreground">{t("contact.info.email")}</p>
                    <p className="font-sans text-foreground text-sm sm:text-base break-all">isradubai.il@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-sans text-xs sm:text-sm text-muted-foreground">{t("contact.info.phone")}</p>
                    <p className="font-sans text-foreground text-sm sm:text-base">(+972) 548797729</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-sans text-xs sm:text-sm text-muted-foreground">{t("contact.info.office")}</p>
                    <p className="font-sans text-foreground text-sm sm:text-base">HaYuvalim Center, Ness Ziona, Israel</p>
                    <p className="font-sans text-foreground text-sm sm:text-base">Tel Aviv, Israel</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-navy rounded-xl p-5 sm:p-8 text-center">
              <p className="font-serif text-lg sm:text-xl text-primary-foreground mb-2 sm:mb-4">
                {t("contact.whiteGlove.title")}
              </p>
              <p className="font-sans text-primary-foreground/70 text-xs sm:text-sm">
                {t("contact.whiteGlove.desc")}
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="bg-card rounded-xl p-5 sm:p-8 border border-border space-y-6 sm:space-y-8">
              {/* Contact Information */}
              <div>
                <h4 className="font-serif text-lg sm:text-xl text-foreground mb-3 sm:mb-4">{t("contact.form.contactInfo")}</h4>
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t("contact.form.name")} *</Label>
                    <Input 
                      id="fullName" 
                      placeholder={t("contact.form.name")} 
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("contact.form.email")} *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("contact.form.phone")}</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+1 (555) 000-0000" 
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">{t("contact.form.country")}</Label>
                    <Input 
                      id="country" 
                      placeholder={t("contact.form.country")} 
                      value={formData.country}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Travel Plans */}
              <div>
                <h4 className="font-serif text-lg sm:text-xl text-foreground mb-3 sm:mb-4">{t("contact.form.travelPlans")}</h4>
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label>{t("contact.form.destination")}</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, destination: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("contact.form.destination.select")} />
                      </SelectTrigger>
                      <SelectContent>
                        {destinationKeys.map(key => (
                          <SelectItem key={key} value={key}>{t(key)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="numTravelers">{t("contact.form.travelers")}</Label>
                    <Input 
                      id="numTravelers" 
                      type="number" 
                      min="1" 
                      placeholder="2" 
                      value={formData.numTravelers}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="travelDates">{t("contact.form.dates")}</Label>
                    <Input 
                      id="travelDates" 
                      type="text" 
                      placeholder="e.g., June 2025" 
                      value={formData.travelDates}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("contact.form.budget")}</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("contact.form.budget.select")} />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetRangeKeys.map(key => (
                          <SelectItem key={key} value={key}>{t(key)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 space-y-2">
                  <Label className="text-sm sm:text-base">{t("contact.form.travelerType")}</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 mt-2">
                    {travelerTypeKeys.map(key => (
                      <div key={key} className="flex items-center gap-2">
                        <Checkbox
                          id={key}
                          checked={selectedTravelerTypes.includes(key)}
                          onCheckedChange={(checked) => handleTravelerTypeChange(key, !!checked)}
                        />
                        <Label htmlFor={key} className="text-xs sm:text-sm font-normal cursor-pointer">{t(key)}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-lg sm:text-xl text-foreground mb-3 sm:mb-4">{t("contact.form.idealExperience")}</h4>
                <div className="space-y-2">
                  <Label className="text-sm sm:text-base">{t("contact.form.experienceType")}</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 mt-2">
                    {experienceTypeKeys.map(key => (
                      <div key={key} className="flex items-center gap-2">
                        <Checkbox
                          id={key}
                          checked={selectedExperiences.includes(key)}
                          onCheckedChange={(checked) => handleExperienceChange(key, !!checked)}
                        />
                        <Label htmlFor={key} className="text-xs sm:text-sm font-normal cursor-pointer">{t(key)}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Additional Requests */}
              <div className="space-y-2">
                <Label htmlFor="additionalRequests">{t("contact.form.requests")}</Label>
                <Textarea
                  id="additionalRequests"
                  placeholder={t("contact.form.requests.placeholder")}
                  rows={4}
                  value={formData.additionalRequests}
                  onChange={handleInputChange}
                />
              </div>

              <Button 
                type="submit" 
                variant="gold" 
                size="xl" 
                className="w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    {t("contact.form.submitting")}
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    {t("contact.form.submit")}
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
