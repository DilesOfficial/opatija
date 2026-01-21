import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/hooks/useAuth";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Experiences from "./pages/Experiences";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Personal from "./pages/Personal";
import EliteJourneys from "./pages/EliteJourneys";
import PrivateFlights from "./pages/PrivateFlights";
import Boutique from "./pages/Boutique";
import AdminLogin from "./pages/AdminLogin";
import AdminFlights from "./pages/AdminFlights";
import AdminContacts from "./pages/AdminContacts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/experiences" element={<Experiences />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/personal" element={<Personal />} />
              <Route path="/elite-journeys" element={<EliteJourneys />} />
              <Route path="/private-flights" element={<PrivateFlights />} />
              <Route path="/boutique" element={<Boutique />} />
              <Route path="/flightadmin" element={<AdminLogin />} />
              <Route path="/flightadmin/manage" element={<AdminFlights />} />
              <Route path="/flightadmin/contacts" element={<AdminContacts />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <WhatsAppButton />
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
