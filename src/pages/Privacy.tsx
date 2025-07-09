import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSEO } from "@/hooks/useSEO";

const Privacy = () => {
  const seoComponent = useSEO({
    title: "Privacy Policy | Optix Web - Informativa sulla Privacy",
    description: "Informativa sulla privacy di Optix Web - AR Group di Peluso Roberto. Scopri come trattiamo i tuoi dati personali in conformità al GDPR.",
    keywords: "privacy policy, GDPR, protezione dati, informativa privacy, trattamento dati personali",
    canonicalUrl: "https://optixweb.space/privacy"
  });

  return (
    <div className="min-h-screen bg-background">
      {seoComponent}
      <Header />
      
      <div className="container mx-auto px-4 lg:px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR)
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Ultimo aggiornamento: 9 Luglio 2025
            </p>
          </div>

          <div className="space-y-8">
            {/* Titolare del trattamento */}
            <Card>
              <CardHeader>
                <CardTitle>1. Titolare del Trattamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Il Titolare del trattamento dei dati personali è:
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <p><strong>AR Group di Peluso Roberto</strong></p>
                  <p>Via Tenente Losco 18, 80040 Poggiomarino (NA)</p>
                  <p>P.IVA: 08779461212</p>
                  <p>Email: info@optixweb.space</p>
                  <p>Telefono: +39 353 200 4367</p>
                </div>
              </CardContent>
            </Card>

            {/* Tipi di dati raccolti */}
            <Card>
              <CardHeader>
                <CardTitle>2. Tipi di Dati Personali Raccolti</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>I dati personali che possiamo raccogliere includono:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Dati di identificazione:</strong> nome, cognome, ragione sociale</li>
                  <li><strong>Dati di contatto:</strong> indirizzo email, numero di telefono, indirizzo postale</li>
                  <li><strong>Dati aziendali:</strong> nome dell'azienda, settore di attività, ruolo professionale</li>
                  <li><strong>Dati di navigazione:</strong> indirizzo IP, tipo di browser, sistema operativo, pagine visitate</li>
                  <li><strong>Cookie tecnici e analitici:</strong> per migliorare l'esperienza di navigazione</li>
                </ul>
              </CardContent>
            </Card>

            {/* Finalità del trattamento */}
            <Card>
              <CardHeader>
                <CardTitle>3. Finalità del Trattamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>I dati personali vengono trattati per le seguenti finalità:</p>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">a) Finalità contrattuali ed esecuzione dei servizi:</h4>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Erogazione dei servizi di sviluppo web e consulenza digitale</li>
                      <li>Gestione dei rapporti contrattuali</li>
                      <li>Assistenza clienti e supporto tecnico</li>
                      <li>Fatturazione e adempimenti fiscali</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold">b) Finalità di marketing (previo consenso):</h4>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Invio di newsletter e comunicazioni commerciali</li>
                      <li>Profilazione per offerte personalizzate</li>
                      <li>Marketing diretto tramite email, telefono o WhatsApp</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold">c) Finalità tecniche:</h4>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Funzionamento del sito web</li>
                      <li>Analisi delle performance e miglioramento dei servizi</li>
                      <li>Sicurezza informatica e prevenzione frodi</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Base giuridica */}
            <Card>
              <CardHeader>
                <CardTitle>4. Base Giuridica del Trattamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Il trattamento dei dati personali si basa su:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Consenso dell'interessato</strong> (art. 6, par. 1, lett. a GDPR) per le attività di marketing</li>
                  <li><strong>Esecuzione di un contratto</strong> (art. 6, par. 1, lett. b GDPR) per l'erogazione dei servizi</li>
                  <li><strong>Interesse legittimo</strong> (art. 6, par. 1, lett. f GDPR) per analisi e miglioramento dei servizi</li>
                  <li><strong>Adempimento di obblighi legali</strong> (art. 6, par. 1, lett. c GDPR) per adempimenti fiscali e contabili</li>
                </ul>
              </CardContent>
            </Card>

            {/* Modalità di trattamento */}
            <Card>
              <CardHeader>
                <CardTitle>5. Modalità di Trattamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>I dati personali sono trattati con strumenti informatici e/o cartacei secondo principi di:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Liceità, correttezza e trasparenza</li>
                  <li>Minimizzazione dei dati</li>
                  <li>Esattezza e aggiornamento</li>
                  <li>Limitazione della conservazione</li>
                  <li>Integrità e riservatezza</li>
                </ul>
                <p className="mt-4">
                  Sono adottate misure di sicurezza tecniche e organizzative appropriate per proteggere i dati da accessi non autorizzati, alterazioni, distruzioni o perdite.
                </p>
              </CardContent>
            </Card>

            {/* Conservazione */}
            <Card>
              <CardHeader>
                <CardTitle>6. Tempi di Conservazione</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>I dati personali sono conservati per il tempo necessario al raggiungimento delle finalità:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Dati contrattuali:</strong> 10 anni dalla cessazione del rapporto (obblighi fiscali)</li>
                  <li><strong>Dati di marketing:</strong> fino alla revoca del consenso o per 24 mesi dall'ultimo contatto</li>
                  <li><strong>Dati di navigazione:</strong> 26 mesi dalla raccolta</li>
                  <li><strong>Richieste di contatto:</strong> 24 mesi dalla richiesta</li>
                </ul>
              </CardContent>
            </Card>

            {/* Comunicazione e diffusione */}
            <Card>
              <CardHeader>
                <CardTitle>7. Comunicazione e Diffusione dei Dati</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>I dati personali possono essere comunicati a:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Fornitori di servizi:</strong> hosting, email marketing, analytics (Google Analytics, Supabase)</li>
                  <li><strong>Professionisti:</strong> commercialisti, consulenti legali</li>
                  <li><strong>Autorità competenti:</strong> quando richiesto dalla legge</li>
                  <li><strong>Partner commerciali:</strong> solo previo consenso specifico</li>
                </ul>
                <p>I dati non sono mai diffusi pubblicamente.</p>
              </CardContent>
            </Card>

            {/* Diritti dell'interessato */}
            <Card>
              <CardHeader>
                <CardTitle>8. Diritti dell'Interessato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>L'interessato ha il diritto di:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Accesso:</strong> ottenere informazioni sui propri dati trattati</li>
                  <li><strong>Rettifica:</strong> correggere dati inesatti o incompleti</li>
                  <li><strong>Cancellazione:</strong> richiedere la cancellazione dei dati</li>
                  <li><strong>Limitazione:</strong> limitare il trattamento in specifici casi</li>
                  <li><strong>Portabilità:</strong> ricevere i dati in formato strutturato</li>
                  <li><strong>Opposizione:</strong> opporsi al trattamento per motivi legittimi</li>
                  <li><strong>Revoca del consenso:</strong> revocare il consenso in qualsiasi momento</li>
                </ul>
                <p className="mt-4">
                  Per esercitare questi diritti, contattare: <strong>info@optixweb.space</strong>
                </p>
              </CardContent>
            </Card>

            {/* Cookie */}
            <Card>
              <CardHeader>
                <CardTitle>9. Cookie e Tecnologie Simili</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Il sito utilizza:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Cookie tecnici:</strong> necessari per il funzionamento del sito</li>
                  <li><strong>Cookie analitici:</strong> Google Analytics per statistiche anonime</li>
                  <li><strong>Cookie di profilazione:</strong> solo previo consenso</li>
                </ul>
                <p>È possibile gestire le preferenze cookie attraverso le impostazioni del browser.</p>
              </CardContent>
            </Card>

            {/* Modifiche */}
            <Card>
              <CardHeader>
                <CardTitle>10. Modifiche alla Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Questa Privacy Policy può essere modificata periodicamente. 
                  Le modifiche saranno pubblicate su questa pagina con indicazione della data di aggiornamento.
                  Si consiglia di consultare regolarmente questa pagina.
                </p>
              </CardContent>
            </Card>

            {/* Reclami */}
            <Card>
              <CardHeader>
                <CardTitle>11. Reclami</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  In caso di violazione della normativa sulla protezione dei dati personali, 
                  è possibile presentare reclamo al Garante per la Protezione dei Dati Personali:
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <p><strong>Garante per la Protezione dei Dati Personali</strong></p>
                  <p>Piazza di Monte Citorio, 121 - 00186 Roma</p>
                  <p>Telefono: +39 06 69677 1</p>
                  <p>Email: garante@gpdp.it</p>
                  <p>PEC: protocollo@pec.gpdp.it</p>
                </div>
              </CardContent>
            </Card>

            {/* Contatti */}
            <Card>
              <CardHeader>
                <CardTitle>12. Contatti</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Per qualsiasi domanda relativa a questa Privacy Policy o al trattamento dei dati personali, 
                  è possibile contattarci:
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <p>Email: <strong>info@optixweb.space</strong></p>
                  <p>Telefono: <strong>+39 353 200 4367</strong></p>
                  <p>WhatsApp: <strong>+39 353 200 4367</strong></p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;