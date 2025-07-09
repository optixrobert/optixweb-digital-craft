import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Euro, TrendingUp, Clock, CheckCircle, Building, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const BandiDigitali = () => {
  const seoComponent = useSEO({
    title: "Bandi Digitali per PMI Italiane | Optix Web - Fondi PNRR e SIMEST",
    description: "Scopri come accedere ai fondi PNRR e bandi SIMEST per la digitalizzazione. Optix Web partner tecnico certificato per ottenere fino a €300.000 per la transizione digitale delle PMI italiane.",
    keywords: "bandi digitali PMI, fondi PNRR digitalizzazione, bando SIMEST transizione digitale, finanziamenti digitalizzazione aziende, consulenza bandi europei, partner tecnico certificato",
    canonicalUrl: "https://optixweb.space/bandi-digitali"
  });

  const bandiFeatured = [
    {
      title: "Bando SIMEST Transizione Digitale",
      description: "Finanziamenti fino a €300.000 per la digitalizzazione delle PMI italiane",
      amount: "€300.000",
      fondoPerduto: "25-40%",
      scadenza: "31 Dicembre 2024",
      status: "Attivo",
      link: "/bandi-digitali/simest-transizione-digitale"
    },
    {
      title: "Voucher Digitalizzazione PMI",
      description: "Contributi per e-commerce, siti web e app mobile",
      amount: "€10.000",
      fondoPerduto: "70%",
      scadenza: "Domande sempre aperte", 
      status: "Attivo",
      link: "/bandi-digitali/voucher-digitalizzazione"
    },
    {
      title: "Credito d'Imposta Formazione 4.0",
      description: "Credito fiscale per corsi di formazione digitale",
      amount: "€300.000",
      fondoPerduto: "70% credito",
      scadenza: "Corsi sempre disponibili",
      status: "Attivo",
      link: "/bandi-digitali/credito-imposta-formazione"
    }
  ];

  const serviziFinanziabili = [
    {
      icon: Building,
      title: "Digitalizzazione Processi Aziendali",
      description: "Software gestionali, CRM, ERP personalizzati",
      percentualeFinanziabile: "100%"
    },
    {
      icon: TrendingUp,
      title: "Sviluppo Software e Applicazioni",
      description: "Applicazioni web, mobile, e-commerce",
      percentualeFinanziabile: "100%"
    },
    {
      icon: Target,
      title: "Consulenze Digital Manager",
      description: "Consulenza strategica per la trasformazione digitale",
      percentualeFinanziabile: "100%"
    },
    {
      icon: CheckCircle,
      title: "Cybersecurity e Cloud",
      description: "Sicurezza informatica e migrazione cloud",
      percentualeFinanziabile: "100%"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {seoComponent}
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              🏆 Partner Tecnico Certificato PNRR
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Bandi Digitali per <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">PMI Italiane</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              <strong>Optix Web partner tecnico certificato</strong> per ottenere fondi PNRR e bandi SIMEST. 
              Gestiamo tutto il processo per ottenere <strong>fino a €300.000</strong> per la digitalizzazione della tua azienda.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Euro className="w-5 h-5 text-primary" />
                <span><strong>€2M+</strong> fondi ottenuti per clienti</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                <span><strong>50+</strong> PMI finanziate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span><strong>95%</strong> pratiche approvate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bandi Attivi */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Bandi Attivi per la Digitalizzazione
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Scopri i bandi e finanziamenti disponibili per digitalizzare la tua azienda
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bandiFeatured.map((bando, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {bando.status}
                    </Badge>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{bando.amount}</div>
                      <div className="text-sm text-muted-foreground">Fino a</div>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{bando.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">{bando.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-semibold">Fondo Perduto</div>
                      <div className="text-primary font-bold">{bando.fondoPerduto}</div>
                    </div>
                    <div>
                      <div className="font-semibold">Scadenza</div>
                      <div className="text-muted-foreground">{bando.scadenza}</div>
                    </div>
                  </div>

                  <Button asChild size="sm" className="w-full">
                    <Link to={bando.link}>
                      Scopri di più
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Servizi Finanziabili */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Servizi Optix Web Finanziabili al 100%
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tutti i nostri servizi rientrano nei bandi per la digitalizzazione delle PMI italiane
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviziFinanziabili.map((servizio, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-4">
                    <servizio.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{servizio.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{servizio.description}</p>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Finanziabile {servizio.percentualeFinanziabile}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Come Funziona */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Come Ottenere i Fondi con Optix Web
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ti accompagniamo in tutto il processo, dalla valutazione alla realizzazione del progetto
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Analisi Gratuita", desc: "Valutiamo la fattibilità del tuo progetto di digitalizzazione" },
              { step: "2", title: "Progettazione", desc: "Creiamo la documentazione tecnica conforme ai requisiti del bando" },
              { step: "3", title: "Presentazione", desc: "Ti supportiamo nella presentazione della domanda" },
              { step: "4", title: "Realizzazione", desc: "Implementiamo i servizi digitali una volta ottenuti i fondi" }
            ].map((fase, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{fase.step}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{fase.title}</h3>
                <p className="text-muted-foreground text-sm">{fase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Pronto a Digitalizzare la Tua Azienda Gratis?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Analisi di fattibilità gratuita per verificare se la tua azienda può ottenere i fondi PNRR
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Link to="/contatti">
                Richiedi Analisi Gratuita
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <a href="https://wa.me/393532004367?text=Vorrei%20informazioni%20sui%20bandi%20digitali" target="_blank">
                WhatsApp Diretto
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BandiDigitali;