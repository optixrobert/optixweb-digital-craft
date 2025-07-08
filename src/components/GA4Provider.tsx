import { useEffect } from 'react';
import { useGA4PageTracking, initGA4 } from '@/hooks/useGA4';

interface GA4ProviderProps {
  children: React.ReactNode;
}

export const GA4Provider: React.FC<GA4ProviderProps> = ({ children }) => {
  // Inizializza GA4 al mount del componente
  useEffect(() => {
    initGA4();
  }, []);

  // Traccia automaticamente i cambi di pagina
  useGA4PageTracking();

  return <>{children}</>;
};

export default GA4Provider;