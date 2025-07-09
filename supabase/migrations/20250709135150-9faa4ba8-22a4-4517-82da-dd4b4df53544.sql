-- Migrazione per sistema di conversione ottimizzato

-- Tabella per le richieste di audit gratuito (lead magnet)
CREATE TABLE public.audit_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  azienda TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  obiettivo_principale TEXT NOT NULL,
  fonte_traffico TEXT, -- facebook, linkedin, google, direct
  landing_page TEXT, -- quale landing page ha usato
  status TEXT NOT NULL DEFAULT 'new', -- new, contacted, converted, lost
  follow_up_sent BOOLEAN DEFAULT false,
  follow_up_date TIMESTAMP WITH TIME ZONE,
  conversion_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabella per landing pages specifiche
CREATE TABLE public.landing_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE, -- facebook-ads, linkedin-business, google-seo
  title TEXT NOT NULL,
  hero_title TEXT NOT NULL,
  hero_subtitle TEXT NOT NULL,
  value_proposition TEXT NOT NULL,
  target_audience TEXT NOT NULL, -- PMI, aziende in crescita, etc
  cta_primary TEXT NOT NULL,
  cta_secondary TEXT,
  social_proof TEXT[], -- testimonials specifici
  case_studies TEXT[], -- case studies rilevanti
  published BOOLEAN DEFAULT true,
  conversion_rate DECIMAL(5,2) DEFAULT 0,
  visits INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabella per metriche del customer journey
CREATE TABLE public.conversion_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  audit_request_id UUID REFERENCES public.audit_requests(id),
  phase TEXT NOT NULL, -- visitor, lead, qualified, customer
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  source_channel TEXT, -- facebook, linkedin, google, direct
  conversion_value DECIMAL(10,2), -- valore del cliente se convertito
  notes TEXT
);

-- Tabella per email sequence automation
CREATE TABLE public.email_sequences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  audit_request_id UUID REFERENCES public.audit_requests(id),
  sequence_type TEXT NOT NULL, -- welcome, follow_up_24h, nurture_week1, etc
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  email_subject TEXT NOT NULL,
  email_body TEXT NOT NULL,
  opened BOOLEAN DEFAULT false,
  clicked BOOLEAN DEFAULT false,
  replied BOOLEAN DEFAULT false
);

-- Enable RLS
ALTER TABLE public.audit_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.landing_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversion_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_sequences ENABLE ROW LEVEL SECURITY;

-- RLS Policies for audit_requests
CREATE POLICY "Admins can manage all audit requests" 
ON public.audit_requests 
FOR ALL 
USING (is_admin());

CREATE POLICY "Anyone can create audit requests" 
ON public.audit_requests 
FOR INSERT 
WITH CHECK (true);

-- RLS Policies for landing_pages
CREATE POLICY "Admins can manage all landing pages" 
ON public.landing_pages 
FOR ALL 
USING (is_admin());

CREATE POLICY "Anyone can view published landing pages" 
ON public.landing_pages 
FOR SELECT 
USING (published = true);

-- RLS Policies for conversion_metrics
CREATE POLICY "Admins can manage all conversion metrics" 
ON public.conversion_metrics 
FOR ALL 
USING (is_admin());

-- RLS Policies for email_sequences
CREATE POLICY "Admins can manage all email sequences" 
ON public.email_sequences 
FOR ALL 
USING (is_admin());

-- Triggers for updated_at
CREATE TRIGGER update_audit_requests_updated_at
BEFORE UPDATE ON public.audit_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_landing_pages_updated_at
BEFORE UPDATE ON public.landing_pages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert landing pages predefinite
INSERT INTO public.landing_pages (slug, title, hero_title, hero_subtitle, value_proposition, target_audience, cta_primary, cta_secondary, social_proof, case_studies) VALUES
(
  'facebook-ads',
  'Agenzia Web per PMI Italiane | OptixWeb',
  'Trasformiamo il tuo sito web in una macchina di vendita',
  'Più di 40 esperti web, 12 anni di esperienza, risultati garantiti per aziende italiane',
  'Scopri come abbiamo aiutato oltre 200 PMI italiane a triplicare le vendite online con siti web ottimizzati per la conversione',
  'PMI italiane che vendono online',
  'Scarica Audit Gratuito',
  'Parla con WhatsApp',
  ARRAY['Fatturato +150% in 6 mesi - Azienda Tessile Milano', '+300% lead qualificati - E-commerce Moda Firenze'],
  ARRAY['case-study-tessile-milano', 'case-study-ecommerce-moda']
),
(
  'linkedin-business',
  'Soluzioni Web per Aziende in Crescita | OptixWeb',
  'Siti web che generano ROI measurabile',
  'Analisi dati, conversion rate optimization e crescita sostenibile per la tua azienda',
  'Partner tecnologico per aziende B2B che vogliono crescere online con metriche chiare e risultati misurabili',
  'Aziende B2B in crescita',
  'Analisi Gratuita Presenza Online',
  'Parla con un Esperto',
  ARRAY['ROI +240% primo anno - Software House Bologna', 'Lead B2B +180% - Consulenza Finanziaria Roma'],
  ARRAY['case-study-software-bologna', 'case-study-consulenza-roma']
),
(
  'google-seo',
  'Preventivo Sito Web Professionale 24h | OptixWeb',
  'Siti web professionali che convertono visitatori in clienti',
  'Competenza tecnica, esperienza consolidata, preventivo gratuito in 24 ore',
  'Sviluppiamo siti web tecnicamente perfetti, SEO-friendly e ottimizzati per le conversioni',
  'Aziende che cercano competenza tecnica',
  'Preventivo Gratuito in 24h',
  'Chiamaci Ora',
  ARRAY['Posizioni #1 Google per 45 keyword - Azienda Metalmeccanica', 'Sito veloce al 98% PageSpeed - E-commerce Alimentare'],
  ARRAY['case-study-metalmeccanica-seo', 'case-study-ecommerce-performance']
);