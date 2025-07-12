-- Fix 1: Aggiorna il foreign key di subscribers per usare profiles invece di auth.users
ALTER TABLE public.subscribers 
DROP CONSTRAINT IF EXISTS subscribers_user_id_fkey;

ALTER TABLE public.subscribers 
ADD CONSTRAINT subscribers_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

-- Fix 2: Aggiungi indici mancanti per migliorare le performance
CREATE INDEX IF NOT EXISTS idx_audit_requests_created_at ON public.audit_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_requests_status ON public.audit_requests (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_requests_created_at ON public.contact_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_requests_status ON public.contact_requests (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultation_requests_created_at ON public.consultation_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultation_requests_status ON public.consultation_requests (status, created_at DESC);

-- Fix 3: Aggiungi indici per campi di ricerca comuni
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON public.blog_posts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_conversion_metrics_timestamp ON public.conversion_metrics (timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_conversion_metrics_phase ON public.conversion_metrics (phase, timestamp DESC);

-- Fix 4: Ottimizza le RLS policies esistenti per evitare problemi di performance
-- Rimuovi e ricrea la policy is_admin per essere più efficiente
DROP POLICY IF EXISTS "Admins can manage all audit requests" ON public.audit_requests;
CREATE POLICY "Admins can manage all audit requests" 
ON public.audit_requests 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.is_admin = true
  )
);

DROP POLICY IF EXISTS "Admins can manage all conversion metrics" ON public.conversion_metrics;
CREATE POLICY "Admins can manage all conversion metrics" 
ON public.conversion_metrics 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.is_admin = true
  )
);