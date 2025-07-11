import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { GA4Events } from './useGA4';

// Genera un session ID unico per la sessione corrente
const generateSessionId = () => {
  const existing = sessionStorage.getItem('analytics_session_id');
  if (existing) return existing;
  
  const sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  sessionStorage.setItem('analytics_session_id', sessionId);
  return sessionId;
};

// Ottiene l'IP del visitatore (approssimativo tramite servizio esterno)
const getVisitorInfo = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return {
      ip: data.ip,
      userAgent: navigator.userAgent,
    };
  } catch (error) {
    console.warn('Impossibile ottenere informazioni visitatore:', error);
    return {
      ip: 'unknown',
      userAgent: navigator.userAgent,
    };
  }
};

export const useAnalytics = () => {
  const location = useLocation();

  // Traccia le visualizzazioni di pagina
  const trackPageView = useCallback(async (pagePath?: string) => {
    const path = pagePath || location.pathname;
    const sessionId = generateSessionId();
    const visitorInfo = await getVisitorInfo();
    
    try {
      await supabase
        .from('website_analytics')
        .insert({
          page_path: path,
          session_id: sessionId,
          visitor_ip: visitorInfo.ip,
          user_agent: visitorInfo.userAgent,
          referrer: document.referrer || null,
          visit_duration: 0, // Sarà aggiornato quando l'utente lascia la pagina
        });
      
      console.log('Visualizzazione pagina tracciata:', path);
    } catch (error) {
      console.error('Errore nel tracking della pagina:', error);
    }
  }, [location.pathname]);

  // Traccia la lettura di articoli del blog
  const trackBlogView = useCallback(async (blogPostId: string, timeSpent = 0, scrollPercentage = 0) => {
    const sessionId = generateSessionId();
    const visitorInfo = await getVisitorInfo();
    
    try {
      await supabase
        .from('blog_analytics')
        .insert({
          blog_post_id: blogPostId,
          session_id: sessionId,
          visitor_ip: visitorInfo.ip,
          time_spent: timeSpent,
          scroll_percentage: scrollPercentage,
          referrer: document.referrer || null,
        });
      
      console.log('Visualizzazione blog tracciata:', blogPostId);
      
      // Traccia anche in GA4
      GA4Events.blogPostRead(blogPostId);
    } catch (error) {
      console.error('Errore nel tracking del blog:', error);
    }
  }, []);

  // Aggiorna il tempo di permanenza sulla pagina
  const updateVisitDuration = useCallback(async (duration: number) => {
    const sessionId = generateSessionId();
    
    try {
      await supabase
        .from('website_analytics')
        .update({ visit_duration: duration })
        .eq('session_id', sessionId)
        .eq('page_path', location.pathname)
        .order('created_at', { ascending: false })
        .limit(1);
    } catch (error) {
      console.error('Errore nell\'aggiornamento durata visita:', error);
    }
  }, [location.pathname]);

  // Hook per tracciare automaticamente i cambi di pagina
  useEffect(() => {
    const startTime = Date.now();
    
    // Traccia la visualizzazione della nuova pagina
    trackPageView();

    // Cleanup: aggiorna la durata quando l'utente lascia la pagina
    return () => {
      const duration = Math.round((Date.now() - startTime) / 1000);
      updateVisitDuration(duration);
    };
  }, [location.pathname, trackPageView, updateVisitDuration]);

  // Traccia eventi personalizzati
  const trackCustomEvent = useCallback((eventName: string, eventData: any = {}) => {
    console.log('Evento personalizzato:', eventName, eventData);
    // Qui puoi aggiungere logica per salvare eventi personalizzati in Supabase se necessario
  }, []);

  return {
    trackPageView,
    trackBlogView,
    trackCustomEvent,
    updateVisitDuration,
  };
};

// Hook per il tracking dello scroll nei blog post
export const useBlogScrollTracking = (blogPostId: string) => {
  const { trackBlogView } = useAnalytics();

  useEffect(() => {
    let startTime = Date.now();
    let maxScroll = 0;
    let hasTracked = false;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      maxScroll = Math.max(maxScroll, scrollPercent);

      // Traccia quando l'utente ha letto almeno il 50% dell'articolo
      if (scrollPercent >= 50 && !hasTracked) {
        hasTracked = true;
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        trackBlogView(blogPostId, timeSpent, scrollPercent);
        
        // Traccia anche in GA4
        GA4Events.scrollDepth(scrollPercent);
      }
    };

    const handleBeforeUnload = () => {
      if (!hasTracked) {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        trackBlogView(blogPostId, timeSpent, maxScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      
      // Traccia anche quando il componente viene smontato
      if (!hasTracked) {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        trackBlogView(blogPostId, timeSpent, maxScroll);
      }
    };
  }, [blogPostId, trackBlogView]);
};