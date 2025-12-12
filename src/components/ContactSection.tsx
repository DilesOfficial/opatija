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

const destinations = [
  "Italy", "France", "Greece", "Croatia", "Portugal", "Spain",
  "Austria", "Switzerland", "Sri Lanka", "Thailand", "Japan", "Other"
];

const travelerTypes = [
  "Solo Traveler",
  "Couple/Partner",
  "Family with Young Children (under 12)",
  "Family with Teens (12-18)",
  "Multi-Generational",
  "Group of Friends",
];

const budgetRanges = [
  "$5,000 - $10,000 (Hotel/Resort Only)",
  "$10,000 - $20,000 (Hotel + Personalized Enhancements)",
  "$20,000 - $50,000 (Fully Customized Luxury Experience)",
  "$50,000 - $100,000 (Ultra-Luxury Journey)",
  "$100,000+ (Bespoke, Once-in-a-Lifetime Itinerary)",
];

const experienceTypes = [
  "Luxury Hotel or Resort Booking",
  "Private Villa Rental",
  "Exclusive Cruise or Yacht Charter",
  "Bespoke Safari or Adventure Travel",
  "Private Guided Tours & VIP Access",
  "Wellness & Spa Retreat",
];

interface ContactSectionProps {
  showHeader?: boolean;
}

const ContactSection = ({ showHeader = true }: ContactSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
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
          title: "Thank you for your inquiry!",
          description: "We'll get back to you within 24-48 hours to discuss your dream journey.",
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
        title: "Submission failed",
        description: "Please try again or contact us directly.",
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
              Start Your Journey
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 sm:mb-6">
              Contact Us
            </h2>
            <p className="font-sans text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              We're here to design your next journey with precision, care, and a personal touch.
              Share a few details to help us tailor your experience.
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
              <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-4 sm:mb-6">Get In Touch</h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-sans text-xs sm:text-sm text-muted-foreground">Email</p>
                    <p className="font-sans text-foreground text-sm sm:text-base break-all">info@opatijatravel.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-sans text-xs sm:text-sm text-muted-foreground">Phone / WhatsApp</p>
                    <p className="font-sans text-foreground text-sm sm:text-base">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-sans text-xs sm:text-sm text-muted-foreground">Office</p>
                    <p className="font-sans text-foreground text-sm sm:text-base">Tel Aviv, Israel</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-navy rounded-xl p-5 sm:p-8 text-center">
              <p className="font-serif text-lg sm:text-xl text-primary-foreground mb-2 sm:mb-4">
                White Glove Service
              </p>
              <p className="font-sans text-primary-foreground/70 text-xs sm:text-sm">
                Our team is available 24/7 for your travel needs. We ensure every detail is handled with care.
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
                <h4 className="font-serif text-lg sm:text-xl text-foreground mb-3 sm:mb-4">Contact Information</h4>
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input 
                      id="fullName" 
                      placeholder="Your name" 
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
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
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+1 (555) 000-0000" 
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input 
                      id="country" 
                      placeholder="Your country" 
                      value={formData.country}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Travel Plans */}
              <div>
                <h4 className="font-serif text-lg sm:text-xl text-foreground mb-3 sm:mb-4">Your Travel Plans</h4>
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label>Destination</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, destination: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent>
                        {destinations.map(dest => (
                          <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="numTravelers">Number of Travelers</Label>
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
                    <Label htmlFor="travelDates">Preferred Travel Dates</Label>
                    <Input 
                      id="travelDates" 
                      type="text" 
                      placeholder="e.g., June 2025" 
                      value={formData.travelDates}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Estimated Budget</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetRanges.map(budget => (
                          <SelectItem key={budget} value={budget}>{budget}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 space-y-2">
                  <Label className="text-sm sm:text-base">Who will be traveling? (Select all that apply)</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 mt-2">
                    {travelerTypes.map(type => (
                      <div key={type} className="flex items-center gap-2">
                        <Checkbox
                          id={type}
                          checked={selectedTravelerTypes.includes(type)}
                          onCheckedChange={(checked) => handleTravelerTypeChange(type, !!checked)}
                        />
                        <Label htmlFor={type} className="text-xs sm:text-sm font-normal cursor-pointer">{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Experience Type */}
              <div>
                <h4 className="font-serif text-lg sm:text-xl text-foreground mb-3 sm:mb-4">Your Ideal Experience</h4>
                <div className="space-y-2">
                  <Label className="text-sm sm:text-base">What type of experience are you seeking? (Select all that apply)</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 mt-2">
                    {experienceTypes.map(exp => (
                      <div key={exp} className="flex items-center gap-2">
                        <Checkbox
                          id={exp}
                          checked={selectedExperiences.includes(exp)}
                          onCheckedChange={(checked) => handleExperienceChange(exp, !!checked)}
                        />
                        <Label htmlFor={exp} className="text-xs sm:text-sm font-normal cursor-pointer">{exp}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Additional Requests */}
              <div className="space-y-2">
                <Label htmlFor="additionalRequests">Additional Requests or Special Occasions</Label>
                <Textarea
                  id="additionalRequests"
                  placeholder="Tell us about any special occasions, preferences, or specific experiences you'd like included..."
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
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Inquiry
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
