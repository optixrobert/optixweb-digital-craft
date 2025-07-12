-- Fix: Rimuovi i constraint esistenti per permettere la pulizia
ALTER TABLE public.subscribers 
DROP CONSTRAINT IF EXISTS subscribers_user_id_fkey;

-- Crea i profili mancanti per gli utenti in subscribers che non hanno un profilo
INSERT INTO public.profiles (user_id, email, first_name, last_name, created_at, updated_at)
SELECT DISTINCT s.user_id, s.email, 
       SPLIT_PART(s.email, '@', 1) as first_name,
       'User' as last_name,
       NOW() as created_at,
       NOW() as updated_at
FROM public.subscribers s 
LEFT JOIN public.profiles p ON s.user_id = p.user_id 
WHERE s.user_id IS NOT NULL AND p.user_id IS NULL;

-- Ora possiamo aggiungere il foreign key constraint
ALTER TABLE public.subscribers 
ADD CONSTRAINT subscribers_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

-- Aggiungi indici mancanti per migliorare le performance
CREATE INDEX IF NOT EXISTS idx_audit_requests_created_at ON public.audit_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_requests_status ON public.audit_requests (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_requests_created_at ON public.contact_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_requests_status ON public.contact_requests (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultation_requests_created_at ON public.consultation_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultation_requests_status ON public.consultation_requests (status, created_at DESC);

-- Aggiungi indici per campi di ricerca comuni
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON public.blog_posts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_conversion_metrics_timestamp ON public.conversion_metrics (timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_conversion_metrics_phase ON public.conversion_metrics (phase, timestamp DESC);