import { FAQ } from "@/components/FAQ";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useSEO } from "@/hooks/useSEO";

const serviziFAQ = [
  {
    question: "Quanto costa realizzare un sito web professionale?",
    answer: "I costi variano in base alla complessità del progetto. Un sito web aziendale parte da €2.500, mentre un e-commerce completo da €5.000. Offriamo sempre un preventivo gratuito personalizzato dopo l'analisi delle tue esigenze."
  },
  {
    question: "Quanto tempo serve per realizzare un sito web?",
    answer: "I tempi dipendono dalla complessità: un sito vetrina richiede 2-3 settimane, un sito aziendale 4-6 settimane, un e-commerce 6-10 settimane. Ti forniamo sempre una timeline dettagliata prima di iniziare."
  },
  {
    question: "Il sito sarà ottimizzato per dispositivi mobili?",
    answer: "Assolutamente sì! Tutti i nostri siti sono responsive design e ottimizzati per smartphone, tablet e desktop. Testiamo su tutti i principali dispositivi per garantire un'esperienza perfetta."
  },
  {
    question: "Includete la SEO nel prezzo del sito?",
    answer: "Sì, includiamo sempre la SEO di base: ottimizzazione tecnica, meta tag, sitemap, robots.txt e velocità di caricamento. Per strategie SEO avanzate offriamo servizi dedicati con piani mensili."
  },
  {
    question: "Fornite assistenza e manutenzione dopo la consegna?",
    answer: "Offriamo 3 mesi di assistenza gratuita inclusa. Successivamente puoi scegliere tra i nostri piani di manutenzione mensili che includono aggiornamenti, backup, monitoraggio sicurezza e supporto tecnico."
  },
  {
    question: "Posso gestire autonomamente i contenuti del sito?",
    answer: "Certamente! Realizziamo siti con CMS user-friendly (WordPress, custom CMS). Ti formiamo gratuitamente sull'utilizzo e forniamo guide video per gestire contenuti, prodotti e blog in autonomia."
  },
  {
    question: "Realizzate e-commerce con sistemi di pagamento?",
    answer: "Sì, siamo specializzati in e-commerce con Shopify, PrestaShop e WooCommerce. Integriamo tutti i principali sistemi di pagamento: carte, PayPal, bonifico, Stripe e molto altro."
  },
  {
    question: "Il sito avrà un certificato SSL e sarà sicuro?",
    answer: "Tutti i nostri siti includono certificato SSL gratuito, backup automatici, protezione antimalware e aggiornamenti di sicurezza. La sicurezza è una nostra priorità assoluta."
  }
];

export default function ServiziFAQ() {
  useSEO({
    title: "FAQ Servizi Web - Domande Frequenti",
    description: "Risposte alle domande più frequenti sui nostri servizi di realizzazione siti web, e-commerce, applicazioni web e consulenza digitale. Tempi, costi e dettagli.",
    keywords: "FAQ web agency, costi sito web, tempi realizzazione, manutenzione siti, SEO incluso, e-commerce, sicurezza web",
    canonicalUrl: "https://optixweb.space/servizi/faq"
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb 
          items={[
            { name: "Servizi", url: "/servizi" },
            { name: "FAQ", url: "/servizi/faq" }
          ]} 
        />
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Domande Frequenti sui Nostri Servizi
            </h1>
            <p className="text-xl text-muted-foreground">
              Tutto quello che devi sapere sui nostri servizi web
            </p>
          </div>

          <FAQ items={serviziFAQ} />

          <div className="mt-16 text-center">
            <div className="bg-primary/5 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">
                Non hai trovato la risposta che cercavi?
              </h3>
              <p className="text-muted-foreground mb-6">
                Contattaci direttamente per una consulenza gratuita personalizzata
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/393532004367?text=Ciao! Ho una domanda sui vostri servizi web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Scrivici su WhatsApp
                </a>
                <a
                  href="/contatti"
                  className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
                >
                  Modulo di Contatto
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}