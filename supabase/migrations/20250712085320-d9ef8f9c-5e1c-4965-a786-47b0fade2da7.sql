-- Fix: Aggiorna la funzione update_updated_at_column per risolvere il warning di sicurezza
-- Aggiungi SECURITY DEFINER e imposta un search_path esplicito

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;