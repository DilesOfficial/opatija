-- Allow admins to view all contact submissions
CREATE POLICY "Admins can view contact submissions"
ON public.contact_submissions
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to update contact submissions (e.g., change status)
CREATE POLICY "Admins can update contact submissions"
ON public.contact_submissions
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete contact submissions
CREATE POLICY "Admins can delete contact submissions"
ON public.contact_submissions
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));