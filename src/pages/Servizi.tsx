import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Code, ShoppingCart, Palette, Search, Zap, Monitor, Smartphone, Globe, CheckCircle, Star, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO, createServiceStructuredData } from "@/hooks/useSEO";

const Servizi = () => {
  const seoComponent = useSEO({
    title: "Servizi Web Professionali Italia | Optix Web - Siti, E-commerce, Applicazioni",
    description: "Servizi web professionali per aziende italiane: sviluppo siti web, e-commerce, applicazioni personalizzate. 40 esperti con 12+ anni di esperienza. Consulenza gratuita.",
    keywords: "servizi web Italia, sviluppo siti web aziende, e-commerce personalizzato Italia, applicazioni web su misura, web agency professionale, servizi digitali aziende italiane",
    canonicalUrl: "https://optixweb.space/servizi",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service", 
      "name": "Servizi Web Professionali",
      "provider": {
        "@type": "Organization",
        "name": "Optix Web",
        "areaServed": "IT"
      },
      "serviceType": [
        "Sviluppo siti web aziende",
        "E-commerce personalizzato",
        "Applicazioni web su misura",
        "UX/UI Design professionale",
        "SEO locale Italia"
      ],
      "description": "Servizi web completi per aziende italiane con 40 esperti e 12+ anni di esperienza"
    }
  });

  const mainServices = [
    {
      icon: Code,
      title: "Realizzazione Siti Web Professionali per Aziende",
      description: "Creiamo siti web professionali, responsive e ottimizzati SEO per aziende italiane. I nostri siti web non sono solo belli da vedere, ma sono progettati per convertire visitatori in clienti e migliorare il tuo posizionamento su Google.",
      features: ["Ottimizzazione SEO inclusa", "Design responsive garantito", "Tempi di caricamento ottimizzati", "Compatibilità cross-browser"],
      types: [
        { name: "Siti Vetrina", desc: "Presentazione professionale ottimizzata per aziende italiane" },
        { name: "Blog Aziendali", desc: "Piattaforme SEO-friendly per contenuti di valore" },
        { name: "Portali Informativi", desc: "Siti ricchi di contenuti ottimizzati per Google" }
      ]
    },
    {
      icon: ShoppingCart,
      title: "Sviluppo E-commerce Personalizzati",
      description: "Sviluppiamo negozi online completi che vendono 24/7. Le nostre soluzioni e-commerce sono ottimizzate per il mercato italiano, con integrazione di sistemi di pagamento locali e conformità alle normative italiane.",
      features: ["Integrazione corrieri italiani", "Sistemi pagamento locali (Satispay, Nexi)", "Conformità GDPR", "Ottimizzazione mobile commerce"],
      types: [
        { name: "WooCommerce", desc: "Soluzioni e-commerce flessibili per il mercato italiano" },
        { name: "Shopify", desc: "Piattaforme complete ottimizzate per vendite Italia" },
        { name: "Custom", desc: "E-commerce personalizzato per normative italiane" }
      ]
    },
    {
      icon: Zap,
      title: "Applicazioni Web su Misura per il Business",
      description: "Sviluppiamo applicazioni web personalizzate per ottimizzare i processi aziendali di aziende italiane, rispettando normative locali e integrandoci con sistemi esistenti.",
      features: ["Architettura scalabile", "Conformità normative italiane", "Integrazione API locali", "Sicurezza avanzata GDPR"],
      types: [
        { name: "Gestionali", desc: "Software gestione aziendale per normative italiane" },
        { name: "CRM", desc: "Sistemi gestione clienti per PMI italiane" },
        { name: "Portali", desc: "Piattaforme web collaborative conformi GDPR" }
      ]
    },
    {
      icon: Palette,
      title: "UX/UI Design Professionale",
      description: "Progettiamo interfacce belle e funzionali che offrono un'esperienza utente ottimale, studiando il comportamento degli utenti italiani e le tendenze del mercato locale.",
      features: ["User research mercato italiano", "Wireframe e mockup", "Prototipazione avanzata", "Design system scalabile"],
      types: [
        { name: "Web Design", desc: "Design ottimizzato per utenti italiani" },
        { name: "Mobile Design", desc: "Interfacce mobile-first per Italia" },
        { name: "Brand Identity", desc: "Identità visiva per mercato italiano" }
      ]
    }
  ];

  const additionalServices = [
    {
      icon: Search,
      title: "SEO Locale per Aziende Italiane",
      description: "Ottimizziamo il tuo sito per le ricerche geo-localizzate italiane, migliorando il posizionamento su Google Italia."
    },
    {
      icon: Monitor,
      title: "Hosting Italia e Manutenzione",
      description: "Servizi di hosting su server italiani e manutenzione continua per garantire prestazioni ottimali per utenti italiani."
    },
    {
      icon: Smartphone,
      title: "Ottimizzazione Mobile Italia",
      description: "Rendiamo il tuo sito perfetto per dispositivi mobili, ottimizzato per la velocità di connessione italiana."
    },
    {
      icon: Globe,
      title: "Consulenza Digitale per PMI",
      description: "Ti guidiamo nella definizione di strategie digitali efficaci specifiche per il mercato e le normative italiane."
    }
  ];

  const process = [
    { step: "1", title: "Analisi", desc: "Studiamo le tue esigenze e il tuo mercato" },
    { step: "2", title: "Strategia", desc: "Definiamo la strategia e l'architettura" },
    { step: "3", title: "Design", desc: "Creiamo il design e l'esperienza utente" },
    { step: "4", title: "Sviluppo", desc: "Sviluppiamo con tecnologie all'avanguardia" },
    { step: "5", title: "Test", desc: "Testiamo tutto prima del lancio" },
    { step: "6", title: "Lancio", desc: "Mettiamo online e forniamo supporto" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {seoComponent}
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-optix-light via-background to-optix-light py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              I Nostri Servizi Web Professionali per Aziende Italiane
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              <strong>40 esperti web</strong> con <strong>12+ anni di esperienza</strong> offrono soluzioni digitali complete 
              per <strong>aziende italiane</strong>. Dalla progettazione allo sviluppo, 
              ti accompagniamo in ogni fase del tuo percorso digitale nel <strong>mercato italiano</strong>.
            </p>
            
            {/* Social Proof */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span><strong>200+</strong> aziende italiane servite</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span><strong>12+</strong> anni nel mercato italiano</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span><strong>40</strong> esperti certificati</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="space-y-16">
            {mainServices.map((service, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-optix-blue to-optix-green rounded-lg flex items-center justify-center">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold">{service.title}</h2>
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  
                  <div className="grid gap-4 mb-6">
                    <h3 className="font-semibold text-lg">Caratteristiche principali:</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-optix-light text-optix-blue">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button asChild className="bg-gradient-to-r from-optix-blue to-optix-green hover:from-optix-blue/90 hover:to-optix-green/90 text-white">
                    <Link to="/contatti">
                      Consulenza Gratuita - Preventivo in 24h
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="grid gap-4">
                    {service.types.map((type, idx) => (
                      <Card key={idx} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-optix-blue mb-1">{type.name}</h4>
                          <p className="text-sm text-muted-foreground">{type.desc}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Servizi Specializzati per il Mercato Italiano
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Completiamo la tua presenza digitale con servizi specializzati per il <strong>mercato italiano</strong>, 
              garantendo conformità normative e prestazioni ottimali per <strong>aziende italiane</strong>.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-optix-blue to-optix-green rounded-lg flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Il nostro processo
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Seguiamo un processo strutturato e collaudato per garantire 
              risultati di qualità e rispettare sempre i tempi di consegna.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((phase, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white relative">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-optix-blue to-optix-green rounded-full flex items-center justify-center mb-4">
                    <span className="text-white font-bold">{phase.step}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{phase.title}</h3>
                  <p className="text-muted-foreground text-sm">{phase.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-optix-blue to-optix-green">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Pronto a iniziare il tuo progetto?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Contattaci per una consulenza gratuita e scopri quale soluzione 
            è più adatta alle tue esigenze specifiche.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-optix-blue hover:bg-white/90">
              <Link to="/contatti">
                Consulenza Gratuita - Solo Aziende Italiane
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <a href="https://wa.me/393532004367?text=Ciao!%20Vorrei%20parlare%20dei%20vostri%20servizi%20web" target="_blank">
                WhatsApp Diretto
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link to="/portfolio">
                Vedi esempi di progetti
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Servizi;