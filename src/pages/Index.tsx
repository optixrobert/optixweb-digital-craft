import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Code, Palette, Search, Zap, CheckCircle, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const services = [
    {
      icon: Code,
      title: "Realizzazione Siti Web",
      description: "Siti web professionali, e-commerce e blog personalizzati per la tua attività."
    },
    {
      icon: Zap,
      title: "Sviluppo Applicazioni Web",
      description: "Applicazioni web su misura per ottimizzare i processi aziendali."
    },
    {
      icon: Palette,
      title: "UX/UI Design",
      description: "Design moderni e interfacce intuitive per un'esperienza utente ottimale."
    },
    {
      icon: Search,
      title: "SEO e Ottimizzazione",
      description: "Strategie SEO per migliorare la visibilità online e le performance."
    }
  ];

  const features = [
    "Consulenza personalizzata gratuita",
    "Progetti chiavi in mano",
    "Supporto tecnico dedicato",
    "Tecnologie all'avanguardia",
    "Risultati misurabili",
    "Assistenza post-lancio"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-optix-light via-background to-optix-light py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-optix-blue/5 to-optix-green/5"></div>
        <div className="container mx-auto px-4 lg:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-optix-blue to-optix-green bg-clip-text text-transparent">
                    Costruiamo
                  </span>{" "}
                  la tua presenza digitale
                </h1>
                <p className="text-xl text-muted-foreground max-w-xl">
                  Web agency italiana specializzata in soluzioni digitali professionali per PMI, startup e professionisti. 
                  Trasformiamo le tue idee in realtà digitali di successo.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-optix-blue to-optix-green hover:from-optix-blue/90 hover:to-optix-green/90 text-white">
                  <Link to="/contatti">
                    Prenota una consulenza gratuita
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-optix-blue text-optix-blue hover:bg-optix-light">
                  <Link to="/portfolio">
                    Vedi i nostri progetti
                  </Link>
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-optix-green" />
                  <span>100+ progetti completati</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-optix-green" />
                  <span>Clienti soddisfatti</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Optixweb - Web Agency Professionale" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-optix-blue/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              I nostri servizi digitali
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Offriamo soluzioni complete per la tua presenza online, dalla progettazione 
              alla realizzazione e ottimizzazione.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-optix-blue to-optix-green rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Perché scegliere Optixweb?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                La nostra esperienza e dedizione ci permettono di offrire soluzioni 
                digitali che fanno davvero la differenza per il tuo business.
              </p>
              
              <div className="grid gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-optix-green flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Button asChild size="lg" variant="outline" className="border-optix-blue text-optix-blue hover:bg-optix-light">
                  <Link to="/chi-siamo">
                    Scopri di più su di noi
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-optix-blue mb-2">100+</div>
                  <div className="text-sm text-muted-foreground">Progetti completati</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-optix-green mb-2">5+</div>
                  <div className="text-sm text-muted-foreground">Anni di esperienza</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-optix-blue mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">Supporto clienti</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-optix-green mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Soddisfazione clienti</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-optix-blue to-optix-green">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Pronto a trasformare la tua presenza digitale?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Contattaci oggi per una consulenza gratuita e scopri come possiamo 
            aiutarti a raggiungere i tuoi obiettivi digitali.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-optix-blue hover:bg-white/90">
            <Link to="/contatti">
              Inizia il tuo progetto
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
