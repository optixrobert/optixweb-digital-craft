# Configurazione Google Analytics 4

Questo progetto include un sistema completo di tracciamento GA4 con eventi personalizzati.

## Setup Iniziale

### 1. Ottenere il Measurement ID

1. Vai su [Google Analytics](https://analytics.google.com/)
2. Crea una nuova proprietà o seleziona quella esistente
3. Vai su **Amministrazione** → **Stream di dati** 
4. Seleziona il tuo sito web o creane uno nuovo
5. Copia il **Measurement ID** (formato: G-XXXXXXXXXX)

### 2. Configurazione nel progetto

Crea un file `.env.local` nella root del progetto:

```env
VITE_GA4_MEASUREMENT_ID=G-TUO-MEASUREMENT-ID
```

## Eventi Tracciati Automaticamente

Il sistema traccia automaticamente:

### Navigazione
- **Pageviews**: Ogni cambio di pagina
- **Navigation clicks**: Click sui menu di navigazione

### Conversioni
- **Contact form submit**: Invio moduli di contatto
- **Consultation request**: Richieste di consulenza
- **CTA clicks**: Click sui call-to-action principali

### Engagement
- **Blog post read**: Lettura degli articoli del blog
- **Portfolio view**: Visualizzazione progetti portfolio
- **Scroll depth**: Profondità di scroll (25%, 50%, 75%, 100%)
- **External link click**: Click su link esterni

### File e Download
- **File download**: Download di file/documenti

## Eventi Personalizzati

Puoi aggiungere eventi personalizzati importando le funzioni:

```tsx
import { GA4Events, trackEvent } from '@/hooks/useGA4';

// Eventi predefiniti
GA4Events.contactFormSubmit('email');
GA4Events.ctaClick('prenota_consulenza', 'hero');

// Eventi personalizzati
trackEvent('custom_action', 'custom_category', 'custom_label', 100);
```

## Funzionalità Incluse

### Hook useGA4PageTracking
Traccia automaticamente i cambi di pagina usando React Router.

### GA4Provider
Component wrapper che inizializza GA4 e fornisce il tracking automatico.

### Eventi Predefiniti
Libreria completa di eventi comuni per web agency:
- Lead generation
- User engagement  
- Content interaction
- Navigation patterns

### Debug Mode
In modalità development, GA4 viene eseguito in debug mode per facilitare il testing.

## Verifica del Funzionamento

1. Apri gli **Strumenti per Sviluppatori** del browser
2. Vai nella tab **Network**
3. Filtra per "google-analytics" o "gtag"
4. Naviga nel sito e verifica che le richieste vengano inviate

Oppure usa l'estensione **Google Analytics Debugger** per Chrome.

## Best Practices

1. **Non tracciare informazioni sensibili** nei custom events
2. **Testa sempre in ambiente di sviluppo** prima del deploy
3. **Monitora le quote** di Google Analytics per evitare limiti
4. **Configura obiettivi** in GA4 per misurare le conversioni
5. **Implementa Enhanced E-commerce** se hai un e-commerce

## Conformità Privacy

Ricorda di:
- Implementare banner cookies conforme GDPR
- Aggiornare la privacy policy
- Consentire agli utenti di opt-out dal tracking