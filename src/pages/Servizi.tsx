import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Code, ShoppingCart, Palette, Search, Zap, Monitor, Smartphone, Globe } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO, createServiceStructuredData } from "@/hooks/useSEO";

const Servizi = () => {
  const seoComponent = useSEO({
    title: "Servizi Web Agency",
    description: "Scopri tutti i servizi di Optixweb.it: realizzazione siti web, e-commerce, applicazioni web, SEO, UX/UI design e consulenza digitale per far crescere la tua attività online.",
    keywords: "servizi web agency, realizzazione siti web, e-commerce, sviluppo applicazioni, SEO professionale, UX/UI design, web marketing, consulenza digitale, manutenzione siti web",
    canonicalUrl: "https://optixweb.it/servizi",
    structuredData: createServiceStructuredData("Servizi Web Agency", "Servizi completi di web agency per la tua presenza digitale")
  });

  const mainServices = [
    {
      icon: Code,
      title: "Realizzazione Siti Web",
      description: "Creiamo siti web professionali, responsive e ottimizzati per convertire i visitatori in clienti.",
      features: ["Design responsive", "Ottimizzazione SEO base", "Gestione contenuti", "Sicurezza SSL"],
      types: [
        { name: "Siti Vetrina", desc: "Presentazione professionale della tua attività" },
        { name: "Blog Aziendali", desc: "Piattaforme per condividere contenuti di valore" },
        { name: "Portali Informativi", desc: "Siti ricchi di contenuti e funzionalità" }
      ]
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      description: "Sviluppiamo negozi online completi per vendere i tuoi prodotti o servizi 24/7.",
      features: ["Catalogo prodotti", "Gestione ordini", "Pagamenti sicuri", "Dashboard admin"],
      types: [
        { name: "WooCommerce", desc: "Soluzioni flessibili basate su WordPress" },
        { name: "Shopify", desc: "Piattaforme complete chiavi in mano" },
        { name: "Custom", desc: "Sviluppo personalizzato per esigenze specifiche" }
      ]
    },
    {
      icon: Zap,
      title: "Applicazioni Web",
      description: "Sviluppiamo applicazioni web su misura per ottimizzare i processi aziendali.",
      features: ["Architettura scalabile", "Interfacce intuitive", "Integrazione API", "Sicurezza avanzata"],
      types: [
        { name: "Gestionali", desc: "Software per la gestione aziendale" },
        { name: "CRM", desc: "Sistemi di gestione clienti" },
        { name: "Portali", desc: "Piattaforme web collaborative" }
      ]
    },
    {
      icon: Palette,
      title: "UX/UI Design",
      description: "Progettiamo interfacce belle e funzionali che offrono un'esperienza utente ottimale.",
      features: ["User research", "Wireframe e mockup", "Prototipazione", "Design system"],
      types: [
        { name: "Web Design", desc: "Design per siti web e applicazioni" },
        { name: "Mobile Design", desc: "Interfacce per dispositivi mobili" },
        { name: "Brand Identity", desc: "Identità visiva coordinata" }
      ]
    }
  ];

  const additionalServices = [
    {
      icon: Search,
      title: "SEO Tecnico",
      description: "Ottimizziamo la struttura tecnica del tuo sito per migliorare il posizionamento sui motori di ricerca."
    },
    {
      icon: Monitor,
      title: "Hosting e Manutenzione",
      description: "Servizi di hosting professionale e manutenzione continua per garantire prestazioni ottimali."
    },
    {
      icon: Smartphone,
      title: "Ottimizzazione Mobile",
      description: "Rendiamo il tuo sito perfettamente fruibile su tutti i dispositivi mobili."
    },
    {
      icon: Globe,
      title: "Consulenza Digitale",
      description: "Ti guidiamo nella definizione di una strategia digitale efficace per il tuo business."
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
              I nostri <span className="bg-gradient-to-r from-optix-blue to-optix-green bg-clip-text text-transparent">servizi</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Offriamo soluzioni digitali complete per trasformare la tua presenza online 
              e far crescere il tuo business. Dalla progettazione allo sviluppo, 
              ti accompagniamo in ogni fase del tuo percorso digitale.
            </p>
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
                      Richiedi preventivo
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
              Servizi aggiuntivi
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Completiamo la tua presenza digitale con servizi specializzati 
              per garantire prestazioni ottimali e risultati duraturi.
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
                Consulenza gratuita
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
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