import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, Palette, Search, Zap, CheckCircle, Star, Calendar, FileText, Building, ShoppingCart, Package, Award, Globe, Users, TrendingUp, Clock, MessageCircle } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { GA4Events } from "@/hooks/useGA4";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientsSection from "@/components/ClientsSection";
import { AuditRequestForm } from "@/components/AuditRequestForm";
import { useSEO, createWebsiteStructuredData } from "@/hooks/useSEO";
import { MetaRedirects } from "@/components/MetaRedirects";
import { AdvancedSchema } from "@/components/AdvancedSchema";
import heroImage from "@/assets/hero-image.jpg";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  slug: string;
  created_at: string;
  featured_image_url: string | null;
  profiles: {
    first_name: string;
    last_name: string;
  } | null;
}

const Index = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  
  const seoComponent = useSEO({
    title: "Web Agency Professionale",
    description: "Optixweb.space è la web agency italiana leader nella realizzazione di siti web professionali, e-commerce e applicazioni web custom. Trasformiamo le tue idee in soluzioni digitali vincenti.",
    keywords: "web agency Italia, realizzazione siti web, e-commerce, sviluppo applicazioni, SEO, digital marketing, consulenza web, siti responsive, WordPress, React",
    canonicalUrl: "https://optixweb.space",
    structuredData: createWebsiteStructuredData()
  });

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select(`
            id,
            title,
            excerpt,
            slug,
            created_at,
            featured_image_url,
            profiles!blog_posts_author_id_fkey(first_name, last_name)
          `)
          .eq('published', true)
          .order('published_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setBlogPosts((data as BlogPost[]) || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchLatestPosts();
  }, []);
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

  const clients = [
    { name: "TechCorp", industry: "Tecnologia" },
    { name: "Fashion House", industry: "Moda" },
    { name: "Green Energy", industry: "Energia" },
    { name: "Med Solutions", industry: "Sanità" },
    { name: "Edu Platform", industry: "Educazione" },
    { name: "Food & Co", industry: "Ristorazione" },
    { name: "Real Estate Pro", industry: "Immobiliare" },
    { name: "Sports Club", industry: "Sport" },
    { name: "Art Gallery", industry: "Arte" },
    { name: "Consulting Firm", industry: "Consulenza" }
  ];

  const ecommerceServices = [
    {
      icon: ShoppingCart,
      title: "PrestaShop Partner",
      description: "Partner ufficiale PrestaShop per e-commerce professionali, moduli personalizzati e integrazioni avanzate.",
      badge: "Partner Ufficiale",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Package,
      title: "Shopify Expert",
      description: "Sviluppo di store Shopify performanti con temi personalizzati e app dedicate per ogni esigenza.",
      badge: "Expert",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Globe,
      title: "WooCommerce Pro",
      description: "E-commerce WordPress con WooCommerce, plugin personalizzati e ottimizzazioni per massime performance.",
      badge: "Specializzati",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Code,
      title: "E-commerce Custom",
      description: "Piattaforme e-commerce su misura sviluppate con tecnologie moderne per progetti complessi.",
      badge: "Personalizzato",
      color: "from-optix-blue to-optix-light-blue"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {seoComponent}
      <MetaRedirects />
      <AdvancedSchema type="homepage" />
      <Header />
      
      {/* Hero Section with updated value proposition */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="text-sm font-medium border-primary/20">
                  🚀 40 Esperti Web • 12 Anni di Esperienza
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Trasformiamo il tuo sito web in una macchina di vendita
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Risultati garantiti per aziende italiane. Più di 200 PMI hanno triplicato le vendite online con i nostri siti web ottimizzati per la conversione.
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span><strong>40+</strong> Esperti Web</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span><strong>12 anni</strong> di esperienza</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span><strong>200+</strong> aziende servite</span>
                </div>
              </div>

              {/* Value Proposition */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <p className="text-lg leading-relaxed">
                    <strong>Audit Gratuito:</strong> Analizza il tuo sito web e scopri come aumentare le conversioni del 150% in 6 mesi
                  </p>
                </CardContent>
              </Card>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8 py-3">
                  <a href="#audit-form">
                    Scarica Audit Gratuito
                    <TrendingUp className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
                  <a href="https://wa.me/393532004367?text=Ciao!%20Vorrei%20parlare%20dei%20vostri%20servizi%20web" target="_blank">
                    Parla con WhatsApp
                    <MessageCircle className="w-5 h-5 ml-2" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:pl-8">
              <div id="audit-form">
                <AuditRequestForm 
                  sourceChannel="homepage"
                  landingPage="homepage"
                  variant="default"
                />
              </div>
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
                  <div className="w-12 h-12 bg-gradient-to-r from-optix-blue to-optix-light-blue rounded-lg flex items-center justify-center mb-4">
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

      {/* E-commerce Section */}
      <section className="py-20 bg-gradient-to-br from-background to-optix-light/20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Soluzioni E-commerce di Eccellenza
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Partner ufficiali delle migliori piattaforme e-commerce. Realizziamo store online 
              performanti e ottimizzati per le vendite.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {ecommerceServices.map((service, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white relative overflow-hidden group">
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium text-white rounded-full bg-gradient-to-r ${service.color}`}>
                    <Award className="w-3 h-3 mr-1" />
                    {service.badge}
                  </span>
                </div>
                
                <CardContent className="p-8 pt-12">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="font-bold text-xl mb-4 group-hover:text-optix-blue transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-optix-blue/10 to-optix-green/10 rounded-2xl p-8 md:p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Hai bisogno di un e-commerce su misura?
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                Analizziamo le tue esigenze e ti proponiamo la soluzione e-commerce più adatta al tuo business, 
                con integrazioni avanzate e funzionalità personalizzate.
              </p>
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-optix-blue to-optix-light-blue hover:from-optix-blue/90 hover:to-optix-light-blue/90 text-white"
                onClick={() => GA4Events.ctaClick('consulenza_ecommerce', 'ecommerce_section')}
              >
                <Link to="/contatti">
                  Richiedi una consulenza e-commerce
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Blog Section */}
      {blogPosts.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-optix-light/30 to-background">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Dal nostro blog
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Insights, guide e approfondimenti sul mondo del web design e dello sviluppo digitale
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {blogPosts.map((post) => (
                <Card key={post.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white overflow-hidden group">
                  <div className="relative">
                    {post.featured_image_url ? (
                      <img 
                        src={post.featured_image_url} 
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-optix-blue/20 to-optix-green/20 flex items-center justify-center">
                        <FileText className="h-12 w-12 text-optix-blue/60" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <time>{new Date(post.created_at).toLocaleDateString('it-IT')}</time>
                      {post.profiles && (
                        <>
                          <span>•</span>
                          <span>di {post.profiles.first_name} {post.profiles.last_name}</span>
                        </>
                      )}
                    </div>
                    
                    <h3 className="font-bold text-lg mb-3 group-hover:text-optix-blue transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    {post.excerpt && (
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      className="p-0 h-auto text-optix-blue hover:text-optix-blue/80 hover:bg-transparent group/btn"
                      asChild
                      onClick={() => GA4Events.blogPostRead(post.title)}
                    >
                      <Link to={`/blog/${post.slug}`}>
                        Leggi l'articolo
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center">
              <Button asChild variant="outline" size="lg" className="border-optix-blue text-optix-blue hover:bg-optix-light">
                <Link to="/blog">
                  Vedi tutti gli articoli
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}


      {/* Dynamic Clients Section */}
      <ClientsSection />

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
      <section className="py-20 bg-gradient-to-r from-optix-blue to-optix-light-blue">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Pronto a trasformare la tua presenza digitale?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Contattaci oggi per una consulenza gratuita e scopri come possiamo 
            aiutarti a raggiungere i tuoi obiettivi digitali.
          </p>
          <Button 
            asChild 
            size="lg" 
            variant="secondary" 
            className="bg-white text-optix-blue hover:bg-white/90"
            onClick={() => GA4Events.ctaClick('inizia_progetto', 'footer_cta')}
          >
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
