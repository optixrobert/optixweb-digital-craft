import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Target, Lightbulb, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import teamImage from "@/assets/team-image.jpg";

const ChiSiamo = () => {
  const values = [
    {
      icon: Users,
      title: "Team esperto",
      description: "Un team di professionisti con esperienza consolidata nel settore digitale."
    },
    {
      icon: Target,
      title: "Obiettivi chiari",
      description: "Lavoriamo sempre con obiettivi ben definiti per garantire risultati misurabili."
    },
    {
      icon: Lightbulb,
      title: "Innovazione",
      description: "Utilizziamo le tecnologie più avanzate per creare soluzioni all'avanguardia."
    },
    {
      icon: Heart,
      title: "Passione",
      description: "La passione per il nostro lavoro si riflette in ogni progetto che realizziamo."
    }
  ];

  const teamMembers = [
    {
      name: "Marco Rossi",
      role: "CEO & Full Stack Developer",
      description: "Esperto in sviluppo web con oltre 8 anni di esperienza in progetti enterprise."
    },
    {
      name: "Laura Bianchi",
      role: "UX/UI Designer",
      description: "Specialista in design dell'esperienza utente e interfacce intuitive."
    },
    {
      name: "Alessandro Verde",
      role: "SEO Specialist",
      description: "Consulente SEO con comprovata esperienza nell'ottimizzazione per i motori di ricerca."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-optix-light via-background to-optix-light py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Chi siamo
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Siamo una web agency italiana nata dalla passione per l'innovazione digitale. 
              Il nostro team combina creatività, competenza tecnica e visione strategica per 
              creare soluzioni digitali che fanno davvero la differenza.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                La nostra <span className="bg-gradient-to-r from-optix-blue to-optix-green bg-clip-text text-transparent">mission</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Crediamo che ogni azienda, indipendentemente dalle sue dimensioni, meriti 
                una presenza digitale di qualità. La nostra missione è democratizzare 
                l'accesso alle tecnologie web avanzate, offrendo soluzioni professionali 
                a prezzi accessibili.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Lavoriamo fianco a fianco con i nostri clienti per comprendere le loro 
                esigenze specifiche e trasformare le loro visioni in realtà digitali 
                concrete e performanti.
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-optix-blue to-optix-green hover:from-optix-blue/90 hover:to-optix-green/90 text-white">
                <Link to="/contatti">
                  Inizia il tuo progetto
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="relative">
              <img 
                src={teamImage} 
                alt="Team Optixweb al lavoro" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-optix-blue/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              I nostri valori
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Questi principi guidano ogni nostra decisione e si riflettono 
              nella qualità del nostro lavoro e nel rapporto con i clienti.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-optix-blue to-optix-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Il nostro team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professionisti appassionati che mettono competenza ed esperienza 
              al servizio del tuo successo digitale.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-optix-blue to-optix-green rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-optix-blue font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-gradient-to-r from-optix-blue to-optix-green">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              La nostra esperienza in numeri
            </h2>
            <div className="grid md:grid-cols-4 gap-8 mt-12">
              <div>
                <div className="text-4xl lg:text-5xl font-bold mb-2">100+</div>
                <div className="text-lg opacity-90">Progetti completati</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-bold mb-2">5+</div>
                <div className="text-lg opacity-90">Anni di esperienza</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-bold mb-2">50+</div>
                <div className="text-lg opacity-90">Clienti soddisfatti</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-bold mb-2">24/7</div>
                <div className="text-lg opacity-90">Supporto dedicato</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Pronti a lavorare insieme?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contattaci per una consulenza gratuita e scopri come possiamo 
            aiutarti a realizzare i tuoi obiettivi digitali.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-optix-blue to-optix-green hover:from-optix-blue/90 hover:to-optix-green/90 text-white">
              <Link to="/contatti">
                Contattaci ora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-optix-blue text-optix-blue hover:bg-optix-light">
              <Link to="/portfolio">
                Vedi i nostri progetti
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ChiSiamo;