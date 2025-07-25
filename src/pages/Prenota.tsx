import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalendarBooking from "@/components/CalendarBooking";
import { useSEO } from "@/hooks/useSEO";

const Prenota = () => {
  const seoComponent = useSEO({
    title: "Prenota Consulenza Gratuita",
    description: "Prenota una consulenza gratuita con gli esperti di Optixweb.space. Parliamo del tuo progetto web e troviamo insieme la soluzione digitale perfetta per te.",
    keywords: "consulenza gratuita web, prenotazione consulenza, consulenza digitale gratuita, meeting web agency, appuntamento sviluppo web",
    canonicalUrl: "https://optixweb.space/prenota"
  });

  return (
    <div className="min-h-screen bg-background">
      {seoComponent}
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-optix-blue/5 via-background to-optix-green/5 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-optix-blue/5 to-optix-green/5"></div>
        <div className="container mx-auto px-4 lg:px-6 relative">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-optix-blue to-optix-green bg-clip-text text-transparent">
                Prenota una Consulenza Gratuita
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Parla direttamente con i nostri esperti per discutere del tuo progetto digitale. 
              La consulenza è completamente gratuita e senza impegno.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-optix-blue to-optix-green hover:from-optix-blue/90 hover:to-optix-green/90 text-white">
                <Link to="/contatti">
                  Contattaci Ora
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-optix-blue text-optix-blue hover:bg-optix-light">
                <a href="https://wa.me/393532004367?text=Ciao!%20Vorrei%20prenotare%20una%20consulenza%20gratuita" target="_blank">
                  WhatsApp Diretto
                </a>
              </Button>
            </div>
          </div>
          
          <CalendarBooking />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Prenota;