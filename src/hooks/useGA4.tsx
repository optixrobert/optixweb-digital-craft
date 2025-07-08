import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

// Configurazione GA4
const initializeGA4 = (measurementId: string) => {
  ReactGA.initialize(measurementId, {
    gtagOptions: {
      debug_mode: import.meta.env.DEV, // Debug solo in development
    },
  });
};

// Hook per tracciare le pagine automaticamente
export const useGA4PageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Invia pageview quando cambia la location
    ReactGA.send({ 
      hitType: "pageview", 
      page: location.pathname + location.search,
      title: document.title 
    });
  }, [location]);
};

// Funzioni utility per eventi personalizzati
export const trackEvent = (
  action: string, 
  category: string, 
  label?: string, 
  value?: number
) => {
  ReactGA.event({
    action,
    category,
    label,
    value,
  });
};

// Eventi predefiniti per l'applicazione
export const GA4Events = {
  // Contatti e form
  contactFormSubmit: (method: string) => 
    trackEvent('form_submit', 'contact', method),
  
  consultationRequest: () => 
    trackEvent('consultation_request', 'lead_generation'),
  
  // Navigazione
  navigationClick: (destination: string) => 
    trackEvent('navigation_click', 'navigation', destination),
  
  // Portfolio e progetti
  portfolioView: (projectName: string) => 
    trackEvent('portfolio_view', 'engagement', projectName),
  
  // Blog
  blogPostRead: (postTitle: string) => 
    trackEvent('blog_post_read', 'engagement', postTitle),
  
  // CTA clicks
  ctaClick: (ctaName: string, position: string) => 
    trackEvent('cta_click', 'conversion', `${ctaName}_${position}`),
  
  // Scroll tracking
  scrollDepth: (percentage: number) => 
    trackEvent('scroll_depth', 'engagement', `${percentage}%`, percentage),
  
  // File downloads
  fileDownload: (fileName: string, fileType: string) => 
    trackEvent('file_download', 'engagement', fileName, undefined),
  
  // External links
  externalLinkClick: (url: string) => 
    trackEvent('external_link_click', 'outbound', url),
};

// Inizializza GA4 con il Measurement ID
export const initGA4 = () => {
  // Per ora useremo un measurement ID placeholder
  // L'utente dovrà configurarlo tramite Supabase secrets
  const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID || 'G-XXXXXXXXXX';
  
  if (measurementId && measurementId !== 'G-XXXXXXXXXX') {
    initializeGA4(measurementId);
    console.log('GA4 inizializzato con ID:', measurementId);
  } else {
    console.warn('GA4 Measurement ID non configurato. Configura la variabile VITE_GA4_MEASUREMENT_ID');
  }
};

export default { useGA4PageTracking, trackEvent, GA4Events, initGA4 };