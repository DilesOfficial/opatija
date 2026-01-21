-- Create an enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (avoids infinite recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy for user_roles: users can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- RLS policy: admins can view all roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Update available_flights RLS policies for admin access
-- Allow admins to insert flights
CREATE POLICY "Admins can insert flights"
ON public.available_flights
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Allow admins to update flights
CREATE POLICY "Admins can update flights"
ON public.available_flights
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete flights
CREATE POLICY "Admins can delete flights"
ON public.available_flights
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to view ALL flights (including inactive)
CREATE POLICY "Admins can view all flights"
ON public.available_flights
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));