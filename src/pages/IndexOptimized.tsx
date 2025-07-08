import { lazy, Suspense, memo } from "react";
import { useSEO, createWebsiteStructuredData } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Star, Users, Award, Clock, Shield, Zap, Target, Code, Palette, Search } from "lucide-react";
import { Link } from "react-router-dom";

// Lazy load all non-critical components for mobile performance
const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));
const SubscriptionPlans = lazy(() => import("@/components/SubscriptionPlans"));
const ServicesSection = lazy(() => import("@/components/sections/ServicesSection"));
const PortfolioSection = lazy(() => import("@/components/sections/PortfolioSection"));
const TestimonialsSection = lazy(() => import("@/components/sections/TestimonialsSection"));

// Mobile-optimized hero component
const HeroSection = memo(() => (
  <section className="hero-bg py-16 lg:py-24 overflow-hidden">
    <div className="container mx-auto px-4 lg:px-6">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="hero-text text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-optix-blue to-optix-green bg-clip-text text-transparent">
            La tua presenza digitale di successo
          </h1>
          <p className="hero-subtitle text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl">
            Trasformiamo le tue idee in soluzioni digitali vincenti. 
            Siti web professionali, e-commerce e applicazioni su misura per far crescere la tua attività.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button asChild size="lg" className="btn-primary">
              <Link to="/contatti">
                Richiedi Preventivo Gratuito
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/portfolio">
                Vedi Portfolio
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="lg:w-1/2 relative">
          <div className="relative">
            <picture>
              <source media="(max-width: 768px)" srcSet="/src/assets/hero-image.jpg?w=400&h=300&fit=cover" />
              <source media="(max-width: 1024px)" srcSet="/src/assets/hero-image.jpg?w=600&h=450&fit=cover" />
              <img 
                src="/src/assets/hero-image.jpg"
                alt="Web Agency Professionale - Sviluppo Siti Web"
                className="rounded-2xl shadow-2xl w-full h-auto"
                loading="eager"
                width="800"
                height="600"
                decoding="async"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-optix-blue/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
));

// Mobile-optimized stats component
const StatsSection = memo(() => (
  <section className="py-12 lg:py-16 bg-white">
    <div className="container mx-auto px-4 lg:px-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: Users, number: "50+", label: "Clienti Soddisfatti" },
          { icon: Award, number: "100+", label: "Progetti Completati" },
          { icon: Clock, number: "5+", label: "anni di Esperienza" },
          { icon: Star, number: "5.0", label: "Rating Medio" }
        ].map(({ icon: Icon, number, label }, index) => (
          <div key={index} className="text-center">
            <Icon className="h-8 w-8 text-optix-blue mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 mb-2">{number}</div>
            <div className="text-sm text-gray-600">{label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
));

// Mobile-optimized CTA component
const CTASection = memo(() => (
  <section className="py-16 lg:py-20 bg-gradient-to-r from-optix-blue to-optix-green">
    <div className="container mx-auto px-4 lg:px-6 text-center">
      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
        Pronto a far crescere la tua attività online?
      </h2>
      <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
        Contattaci oggi per una consulenza gratuita e scopri come possiamo aiutarti.
      </p>
      <Button asChild size="lg" variant="secondary">
        <Link to="/prenota">
          Prenota Consulenza Gratuita
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  </section>
));

const Index = () => {
  const seoComponent = useSEO({
    title: "Web Agency Professionale",
    description: "Optixweb.space è la web agency italiana leader nella realizzazione di siti web professionali, e-commerce e applicazioni web custom. Trasformiamo le tue idee in soluzioni digitali vincenti.",
    keywords: "web agency Italia, realizzazione siti web, e-commerce, sviluppo applicazioni, SEO, digital marketing, consulenza web, siti responsive, WordPress, React",
    canonicalUrl: "https://optixweb.space",
    structuredData: createWebsiteStructuredData()
  });

  return (
    <div className="min-h-screen bg-background">
      {seoComponent}
      
      <Suspense fallback={<div className="h-16 bg-background" />}>
        <Header />
      </Suspense>
      
      <HeroSection />
      <StatsSection />
      
      <Suspense fallback={<div className="py-20 text-center">Caricamento servizi...</div>}>
        <ServicesSection />
      </Suspense>
      
      <Suspense fallback={<div className="py-20 text-center">Caricamento portfolio...</div>}>
        <PortfolioSection />
      </Suspense>
      
      <Suspense fallback={<div className="py-20 text-center">Caricamento recensioni...</div>}>
        <TestimonialsSection />
      </Suspense>
      
      <CTASection />
      
      <Suspense fallback={<div className="py-20 bg-gray-50/50 text-center">Caricamento piani...</div>}>
        <SubscriptionPlans />
      </Suspense>

      <Suspense fallback={<div className="h-32 bg-gray-900" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;