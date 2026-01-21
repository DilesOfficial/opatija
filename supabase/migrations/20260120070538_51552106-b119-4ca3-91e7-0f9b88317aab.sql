-- Create table for available flights that can be updated weekly
CREATE TABLE public.available_flights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  departure_city TEXT NOT NULL,
  departure_city_he TEXT,
  arrival_city TEXT NOT NULL,
  arrival_city_he TEXT,
  departure_date DATE NOT NULL,
  departure_time TIME,
  aircraft_type TEXT NOT NULL,
  aircraft_type_he TEXT,
  available_seats INTEGER NOT NULL DEFAULT 1,
  price_from TEXT,
  notes TEXT,
  notes_he TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.available_flights ENABLE ROW LEVEL SECURITY;

-- Allow public read access for active flights
CREATE POLICY "Anyone can view active flights" 
ON public.available_flights 
FOR SELECT 
USING (is_active = true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_available_flights_updated_at
BEFORE UPDATE ON public.available_flights
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add some sample flights for initial display
INSERT INTO public.available_flights (departure_city, departure_city_he, arrival_city, arrival_city_he, departure_date, departure_time, aircraft_type, aircraft_type_he, available_seats, price_from, notes, notes_he, is_active)
VALUES 
  ('Tel Aviv', 'תל אביב', 'Dubai', 'דובאי', '2026-01-25', '10:00', 'Light Jet', 'מטוס קל', 6, '$8,500', 'Direct flight, catering included', 'טיסה ישירה, כולל קייטרינג', true),
  ('Tel Aviv', 'תל אביב', 'Athens', 'אתונה', '2026-01-28', '14:30', 'Midsize Jet', 'מטוס בינוני', 8, '$12,000', 'Luxury cabin, WiFi available', 'תא יוקרה, WiFi זמין', true),
  ('Tel Aviv', 'תל אביב', 'London', 'לונדון', '2026-02-01', '08:00', 'Heavy Jet', 'מטוס כבד', 12, '$28,000', 'Full service, bedroom available', 'שירות מלא, חדר שינה זמין', true),
  ('Dubai', 'דובאי', 'Paris', 'פריז', '2026-02-05', '11:00', 'VIP Airliner', 'מטוס VIP', 16, '$45,000', 'Ultimate luxury experience', 'חוויית יוקרה מושלמת', true);