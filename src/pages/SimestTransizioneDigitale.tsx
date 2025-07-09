import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Euro, CheckCircle, Calendar, Users, TrendingUp, Building, Target, Clock, FileText, Award, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { AuditRequestForm } from "@/components/AuditRequestForm";

const SimestTransizioneDigitale = () => {
  const seoComponent = useSEO({
    title: "Bando SIMEST Transizione Digitale 2024 | Optix Web Partner Tecnico Certificato",
    description: "Ottieni fino a €300.000 con il Bando SIMEST PNRR Fondo 394/81 per la transizione digitale. Optix Web partner tecnico certificato per PMI italiane. Consulenza gratuita e gestione completa della pratica.",
    keywords: "bando SIMEST transizione digitale, fondi PNRR digitalizzazione PMI, finanziamenti digitalizzazione aziende, consulenza bando SIMEST, partner tecnico bando 394/81, digitalizzazione processi aziendali",
    canonicalUrl: "https://optixweb.space/bandi-digitali/simest-transizione-digitale"
  });

  const requisitiBando = [
    "PMI italiane con vocazione internazionale",
    "Almeno 50% investimento per transizione digitale", 
    "Progetti da €100.000 a €300.000",
    "Durata progetto: massimo 24 mesi"
  ];

  const serviziFinanziabili = [
    {
      icon: Building,
      title: "Digitalizzazione Processi Aziendali",
      description: "Software gestionali, CRM, ERP personalizzati per ottimizzare i processi interni",
      percentuale: "100% finanziabile",
      esempi: ["Gestionale aziendale", "Sistema CRM", "Piattaforma ERP"]
    },
    {
      icon: TrendingUp, 
      title: "Sviluppo Software Personalizzato",
      description: "Applicazioni web e mobile su misura per le esigenze aziendali",
      percentuale: "100% finanziabile",
      esempi: ["App mobile", "Portali web", "E-commerce"]
    },
    {
      icon: Target,
      title: "Consulenze Digital Manager",
      description: "Consulenza strategica per la trasformazione digitale dell'azienda",
      percentuale: "100% finanziabile", 
      esempi: ["Digital strategy", "Change management", "Training digitale"]
    },
    {
      icon: CheckCircle,
      title: "Cybersecurity e Cloud Migration",
      description: "Sicurezza informatica e migrazione verso soluzioni cloud",
      percentuale: "100% finanziabile",
      esempi: ["Backup cloud", "Sistemi sicurezza", "Migrazione dati"]
    }
  ];

  const processoOptixWeb = [
    {
      step: "1",
      title: "Analisi di Fattibilità Gratuita",
      description: "Valutiamo se la tua azienda ha i requisiti per accedere al bando SIMEST",
      durata: "1-2 giorni"
    },
    {
      step: "2", 
      title: "Progettazione Tecnica Completa",
      description: "Creiamo la documentazione tecnica conforme ai requisiti PNRR",
      durata: "5-7 giorni"
    },
    {
      step: "3",
      title: "Supporto Presentazione Domanda", 
      description: "Ti supportiamo nella presentazione della documentazione",
      durata: "2-3 giorni"
    },
    {
      step: "4",
      title: "Implementazione Servizi",
      description: "Realizziamo tutti i servizi digitali una volta ottenuti i fondi",
      durata: "3-12 mesi"
    }
  ];

  const vantaggiOptixWeb = [
    {
      icon: Award,
      title: "Partner Tecnico Certificato PNRR",
      description: "Riconoscimento ufficiale per la gestione di progetti di digitalizzazione"
    },
    {
      icon: Users,
      title: "50+ PMI Italiane Finanziate",
      description: "Track record comprovato di successo con aziende simili alla tua"
    },
    {
      icon: Euro,
      title: "€2M+ di Fondi Ottenuti",
      description: "Oltre 2 milioni di euro di finanziamenti ottenuti per i nostri clienti"
    },
    {
      icon: CheckCircle,
      title: "95% Pratiche Approvate",
      description: "Altissimo tasso di successo nelle domande presentate"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {seoComponent}
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="border-green-500 text-green-700">
                  🎯 Bando Attivo - Scadenza 31 Dicembre 2024
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Bando SIMEST Transizione Digitale
                  <span className="block text-primary">Fino a €300.000</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  <strong>Optix Web partner tecnico certificato</strong> per il Bando PNRR Fondo 394/81. 
                  Gestiamo tutto il processo per ottenere finanziamenti per la digitalizzazione della tua PMI italiana.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Euro className="w-5 h-5 text-green-500" />
                  <span><strong>25-40%</strong> fondo perduto</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span><strong>24 mesi</strong> per realizzare</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-purple-500" />
                  <span><strong>PMI italiane</strong> beneficiarie</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <span><strong>Vocazione</strong> internazionale</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8 py-3">
                  <Link to="/contatti">
                    Analisi Fattibilità Gratuita
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
                  <a href="https://wa.me/393451234567?text=Vorrei%20informazioni%20sul%20bando%20SIMEST" target="_blank">
                    WhatsApp Diretto
                  </a>
                </Button>
              </div>
            </div>

            {/* Info Card */}
            <Card className="border-primary/20 bg-primary/5 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-6 h-6 text-primary" />
                  Dettagli Bando SIMEST
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Finanziamento Totale</h3>
                  <div className="text-3xl font-bold text-primary">€100.000 - €300.000</div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Fondo Perduto</h3>
                  <div className="text-2xl font-bold text-green-600">25% - 40%</div>
                  <p className="text-sm text-muted-foreground">+ finanziamento agevolato resto</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Requisiti Principali</h3>
                  <ul className="space-y-1 text-sm">
                    {requisitiBando.map((requisito, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {requisito}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button asChild className="w-full">
                  <Link to="/contatti">
                    Verifica Requisiti Gratuitamente
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Servizi Finanziabili */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Servizi Optix Web Finanziabili al 100%
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tutti i nostri servizi di digitalizzazione rientrano perfettamente nei requisiti del Bando SIMEST
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {serviziFinanziabili.map((servizio, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary/70 rounded-lg flex items-center justify-center">
                      <servizio.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{servizio.title}</CardTitle>
                      <Badge variant="secondary" className="bg-green-100 text-green-800 mt-1">
                        {servizio.percentuale}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{servizio.description}</p>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Esempi di servizi:</h4>
                    <div className="flex flex-wrap gap-2">
                      {servizio.esempi.map((esempio, idx) => (
                        <Badge key={idx} variant="outline">
                          {esempio}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Processo Optix Web */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Come Optix Web Ti Aiuta a Ottenere i Fondi
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Gestiamo tutto il processo dalla valutazione iniziale alla realizzazione del progetto
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processoOptixWeb.map((fase, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white text-center relative">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">{fase.step}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{fase.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{fase.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {fase.durata}
                  </Badge>
                </CardContent>
                {index < processoOptixWeb.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vantaggi Optix Web */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Perché Scegliere Optix Web per il Bando SIMEST
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              La nostra esperienza e competenza ti garantiscono il massimo successo nell'ottenere i finanziamenti
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {vantaggiOptixWeb.map((vantaggio, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-4">
                    <vantaggio.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{vantaggio.title}</h3>
                  <p className="text-muted-foreground text-sm">{vantaggio.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Domande Frequenti sul Bando SIMEST
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                domanda: "Quanto costa un progetto di digitalizzazione per il bando SIMEST?",
                risposta: "I progetti devono essere compresi tra €100.000 e €300.000. Con il fondo perduto del 25-40%, l'investimento effettivo della tua azienda si riduce significativamente."
              },
              {
                domanda: "Quali sono i tempi di realizzazione di un progetto di digitalizzazione?",
                risposta: "Una volta ottenuto il finanziamento, hai 24 mesi per completare il progetto. Optix Web garantisce tempi di realizzazione ottimizzati grazie alla nostra esperienza."
              },
              {
                domanda: "Optix Web include la SEO nei servizi finanziabili?",
                risposta: "Sì, tutti i nostri servizi di digitalizzazione includono ottimizzazione SEO, essendo parte integrante della trasformazione digitale aziendale."
              },
              {
                domanda: "Come posso verificare se la mia azienda ha i requisiti per il bando?",
                risposta: "Offriamo un'analisi di fattibilità completamente gratuita per verificare tutti i requisiti del bando SIMEST e valutare le probabilità di successo."
              }
            ].map((faq, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">{faq.domanda}</h3>
                  <p className="text-muted-foreground">{faq.risposta}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Pronto a Ottenere Fino a €300.000 per la Digitalizzazione?
            </h2>
            <p className="text-xl text-white/90 mb-4 max-w-2xl mx-auto">
              <strong>Analisi di fattibilità gratuita</strong> e senza impegno. 
              Verifichiamo subito se la tua azienda può accedere al Bando SIMEST.
            </p>
            <div className="mt-4 text-white/80 text-sm">
              ⏰ <strong>Scadenza bando: 31 Dicembre 2024</strong> - Non perdere questa opportunità!
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <AuditRequestForm 
              variant="default" 
              sourceChannel="bando-simest" 
              landingPage="/bandi-digitali/simest-transizione-digitale" 
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SimestTransizioneDigitale;