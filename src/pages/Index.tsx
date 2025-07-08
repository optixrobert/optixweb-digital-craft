import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Code, Palette, Search, Zap, CheckCircle, Star, Calendar, FileText, Building } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  };
}

const Index = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

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
                      <span>•</span>
                      <span>di {post.profiles.first_name} {post.profiles.last_name}</span>
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

      {/* Clients Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Clienti che si fidano di noi
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Aziende di diversi settori ci hanno scelto per la loro trasformazione digitale
            </p>
          </div>
          
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {clients.map((client, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white">
                      <CardContent className="flex flex-col items-center justify-center p-8 min-h-[120px]">
                        <div className="w-12 h-12 bg-gradient-to-r from-optix-blue/10 to-optix-green/10 rounded-full flex items-center justify-center mb-4">
                          <Building className="h-6 w-6 text-optix-blue" />
                        </div>
                        <h3 className="font-semibold text-lg text-center mb-2">{client.name}</h3>
                        <p className="text-sm text-muted-foreground text-center">{client.industry}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
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
