import { useEffect } from 'react';
import { useGA4PageTracking, initGA4 } from '@/hooks/useGA4';
import { useAnalytics } from '@/hooks/useAnalytics';

interface GA4ProviderProps {
  children: React.ReactNode;
}

export const GA4Provider: React.FC<GA4ProviderProps> = ({ children }) => {
  // Inizializza GA4 e il sistema di analytics
  useEffect(() => {
    initGA4();
  }, []);

  // Traccia automaticamente i cambi di pagina (sia GA4 che Supabase)
  useGA4PageTracking();
  useAnalytics(); // Questo gestisce il tracking in Supabase

  return <>{children}</>;
};

export default GA4Provider;