
-- Create consultation_requests table for booking appointments
CREATE TABLE public.consultation_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  consultation_date TIMESTAMP WITH TIME ZONE NOT NULL,
  consultation_time TEXT NOT NULL,
  consultation_type TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

-- Create policies - anyone can submit a consultation request
CREATE POLICY "Anyone can create consultation requests" 
ON public.consultation_requests 
FOR INSERT 
WITH CHECK (true);

-- Only admins can view consultation requests
CREATE POLICY "Admins can view all consultation requests" 
ON public.consultation_requests 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

-- Only admins can update consultation requests
CREATE POLICY "Admins can update consultation requests" 
ON public.consultation_requests 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND is_admin = true
  )
);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_consultation_requests_updated_at
BEFORE UPDATE ON public.consultation_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
