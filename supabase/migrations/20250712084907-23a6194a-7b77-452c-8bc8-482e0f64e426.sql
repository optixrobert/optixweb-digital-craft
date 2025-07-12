-- Ottimizza le RLS policies per evitare problemi di performance e warning
-- Usa la funzione is_admin() esistente invece di query inline

-- Aggiorna le policy per audit_requests
DROP POLICY IF EXISTS "Admins can manage all audit requests" ON public.audit_requests;
CREATE POLICY "Admins can manage all audit requests" 
ON public.audit_requests 
FOR ALL 
TO authenticated
USING (is_admin());

-- Aggiorna le policy per conversion_metrics  
DROP POLICY IF EXISTS "Admins can manage all conversion metrics" ON public.conversion_metrics;
CREATE POLICY "Admins can manage all conversion metrics" 
ON public.conversion_metrics 
FOR ALL 
TO authenticated
USING (is_admin());

-- Aggiorna le policy per email_sequences
DROP POLICY IF EXISTS "Admins can manage all email sequences" ON public.email_sequences;
CREATE POLICY "Admins can manage all email sequences" 
ON public.email_sequences 
FOR ALL 
TO authenticated
USING (is_admin());

-- Aggiorna le policy per blog_analytics
DROP POLICY IF EXISTS "Admins can manage blog analytics" ON public.blog_analytics;
CREATE POLICY "Admins can manage blog analytics" 
ON public.blog_analytics 
FOR ALL 
TO authenticated
USING (is_admin());

-- Aggiorna le policy per website_analytics
DROP POLICY IF EXISTS "Admins can manage website analytics" ON public.website_analytics;
CREATE POLICY "Admins can manage website analytics" 
ON public.website_analytics 
FOR ALL 
TO authenticated
USING (is_admin());

-- Aggiorna le policy per blog_posts
DROP POLICY IF EXISTS "Admins can manage all posts" ON public.blog_posts;
CREATE POLICY "Admins can manage all posts" 
ON public.blog_posts 
FOR ALL 
TO authenticated
USING (is_admin());

-- Aggiorna le policy per clients
DROP POLICY IF EXISTS "Admins can manage all clients" ON public.clients;
CREATE POLICY "Admins can manage all clients" 
ON public.clients 
FOR ALL 
TO authenticated
USING (is_admin());

-- Aggiorna le policy per landing_pages
DROP POLICY IF EXISTS "Admins can manage all landing pages" ON public.landing_pages;
CREATE POLICY "Admins can manage all landing pages" 
ON public.landing_pages 
FOR ALL 
TO authenticated
USING (is_admin());