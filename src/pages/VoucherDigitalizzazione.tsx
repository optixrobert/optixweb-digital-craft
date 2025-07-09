import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Euro, CheckCircle, Calendar, Users, TrendingUp, Building, Target, Clock, FileText, Award, Zap, Smartphone, ShoppingCart, Globe } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { AuditRequestForm } from "@/components/AuditRequestForm";

const VoucherDigitalizzazione = () => {
  const seoComponent = useSEO({
    title: "Voucher Digitalizzazione PMI 2024 | Optix Web Partner Tecnologico Certificato",
    description: "Ottieni fino a €10.000 con il Voucher Digitalizzazione per PMI. Optix Web partner tecnologico per e-commerce, siti web e soluzioni digitali. Consulenza gratuita e gestione completa.",
    keywords: "voucher digitalizzazione PMI, bando e-commerce, finanziamenti siti web, digital voucher 2024, partner tecnologico voucher, digitalizzazione piccole imprese",
    canonicalUrl: "https://optixweb.space/bandi-digitali/voucher-digitalizzazione"
  });

  const requisitiBando = [
    "PMI italiane con meno di 250 dipendenti",
    "Fatturato annuo inferiore a €50 milioni", 
    "Progetti da €3.000 a €10.000",
    "Durata progetto: massimo 18 mesi"
  ];

  const serviziFinanziabili = [
    {
      icon: ShoppingCart,
      title: "E-commerce e Negozi Online",
      description: "Piattaforme e-commerce complete per vendere online con tutti gli strumenti necessari",
      percentuale: "70% finanziabile",
      esempi: ["Negozio e-commerce", "Marketplace integration", "Sistema pagamenti"]
    },
    {
      icon: Globe, 
      title: "Siti Web Aziendali",
      description: "Siti web professionali e responsive per promuovere la tua attività online",
      percentuale: "70% finanziabile",
      esempi: ["Sito vetrina", "Sito corporate", "Landing pages"]
    },
    {
      icon: Smartphone,
      title: "Applicazioni Mobile",
      description: "App mobile native e progressive web app per raggiungere i clienti ovunque",
      percentuale: "70% finanziabile", 
      esempi: ["App iOS/Android", "PWA", "App catalogo"]
    },
    {
      icon: Target,
      title: "Marketing Digitale",
      description: "Strumenti e piattaforme per il marketing digitale e l'analisi dei dati",
      percentuale: "70% finanziabile",
      esempi: ["SEO/SEM", "Social media tools", "Analytics avanzati"]
    }
  ];

  const processoOptixWeb = [
    {
      step: "1",
      title: "Verifica Requisiti Gratuita",
      description: "Controlliamo se la tua PMI ha tutti i requisiti per il Voucher Digitalizzazione",
      durata: "24 ore"
    },
    {
      step: "2", 
      title: "Progetto Tecnico Dettagliato",
      description: "Creiamo il progetto tecnico conforme ai requisiti del voucher",
      durata: "3-5 giorni"
    },
    {
      step: "3",
      title: "Supporto Domanda Voucher", 
      description: "Ti assistiamo nella presentazione della domanda online",
      durata: "1-2 giorni"
    },
    {
      step: "4",
      title: "Realizzazione Progetto",
      description: "Sviluppiamo la soluzione digitale una volta approvato il voucher",
      durata: "1-6 mesi"
    }
  ];

  const vantaggiOptixWeb = [
    {
      icon: Award,
      title: "Partner Tecnologico Certificato",
      description: "Riconoscimento ufficiale come fornitore qualificato per voucher PMI"
    },
    {
      icon: Users,
      title: "100+ PMI Digitalizzate",
      description: "Esperienza comprovata con piccole e medie imprese di ogni settore"
    },
    {
      icon: Euro,
      title: "€500K+ Voucher Ottenuti",
      description: "Oltre mezzo milione di euro di voucher ottenuti per i nostri clienti"
    },
    {
      icon: CheckCircle,
      title: "98% Voucher Approvati",
      description: "Altissimo tasso di successo nelle domande di voucher presentate"
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
                  🎯 Voucher Attivo - Domande Sempre Aperte
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Voucher Digitalizzazione PMI
                  <span className="block text-primary">Fino a €10.000</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  <strong>Optix Web partner tecnologico certificato</strong> per il Voucher Digitalizzazione PMI. 
                  Sviluppiamo e-commerce, siti web e app con il 70% di contributo a fondo perduto.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Euro className="w-5 h-5 text-green-500" />
                  <span><strong>70%</strong> fondo perduto</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span><strong>18 mesi</strong> per realizzare</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-purple-500" />
                  <span><strong>PMI italiane</strong> beneficiarie</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <span><strong>Domande</strong> sempre aperte</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8 py-3">
                  <Link to="/contatti">
                    Verifica Requisiti Gratuito
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
                  <a href="https://wa.me/393451234567?text=Vorrei%20informazioni%20sul%20voucher%20digitalizzazione" target="_blank">
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
                  Dettagli Voucher PMI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Importo Voucher</h3>
                  <div className="text-3xl font-bold text-primary">€3.000 - €10.000</div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Contributo</h3>
                  <div className="text-2xl font-bold text-green-600">70% Fondo Perduto</div>
                  <p className="text-sm text-muted-foreground">+ 30% cofinanziamento</p>
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
                    Richiedi Analisi Gratuita
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
              Servizi Optix Web Finanziabili con Voucher
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tutti i nostri servizi di digitalizzazione rientrano perfettamente nel Voucher Digitalizzazione PMI
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
              Come Optix Web Ti Aiuta con il Voucher
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Gestiamo tutto il processo dalla verifica requisiti alla realizzazione del progetto
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
              Perché Scegliere Optix Web per il Voucher PMI
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              La nostra esperienza con le PMI garantisce il successo del tuo progetto di digitalizzazione
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
              Domande Frequenti sul Voucher Digitalizzazione
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                domanda: "Quanto costa realizzare un e-commerce con il voucher PMI?",
                risposta: "Un e-commerce professionale costa tra €5.000 e €10.000. Con il voucher del 70%, paghi solo €1.500-€3.000 per un negozio online completo."
              },
              {
                domanda: "Quali sono i tempi per ottenere il voucher digitalizzazione?",
                risposta: "Una volta presentata la domanda, i tempi di approvazione sono di circa 30-60 giorni. Optix Web ti assiste in tutto il processo."
              },
              {
                domanda: "Il sito web realizzato con voucher include la SEO?",
                risposta: "Sì, tutti i nostri progetti includono l'ottimizzazione SEO di base per garantire la visibilità online della tua azienda."
              },
              {
                domanda: "Posso usare il voucher per migliorare un sito esistente?",
                risposta: "Sì, il voucher può essere utilizzato anche per il restyling o l'aggiornamento di siti web e piattaforme digitali esistenti."
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
              Ottieni il Tuo Voucher Digitalizzazione Oggi
            </h2>
            <p className="text-xl text-white/90 mb-4 max-w-2xl mx-auto">
              <strong>Verifica gratuita dei requisiti</strong> e progetto personalizzato. 
              Trasforma la tua PMI con il 70% di contributo a fondo perduto.
            </p>
            <div className="mt-4 text-white/80 text-sm">
              💡 <strong>Domande sempre aperte</strong> - Inizia oggi la tua digitalizzazione!
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <AuditRequestForm 
              variant="default" 
              sourceChannel="voucher-digitalizzazione" 
              landingPage="/bandi-digitali/voucher-digitalizzazione" 
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VoucherDigitalizzazione;