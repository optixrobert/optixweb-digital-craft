import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Code, ShoppingCart, Palette, Monitor } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import portfolioShowcase from "@/assets/portfolio-showcase.jpg";

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("tutti");

  const categories = [
    { id: "tutti", name: "Tutti i progetti", icon: Monitor },
    { id: "siti-web", name: "Siti Web", icon: Code },
    { id: "ecommerce", name: "E-commerce", icon: ShoppingCart },
    { id: "design", name: "UI/UX Design", icon: Palette }
  ];

  const projects = [
    {
      title: "Ristorante Da Vinci",
      category: "siti-web",
      description: "Sito web elegante per ristorante con menu digitale e sistema di prenotazioni online.",
      technologies: ["WordPress", "Custom PHP", "Responsive Design"],
      image: portfolioShowcase,
      link: "#",
      year: "2024"
    },
    {
      title: "Fashion Boutique Milano",
      category: "ecommerce",
      description: "E-commerce completo per boutique di moda con catalogo prodotti e pagamenti sicuri.",
      technologies: ["WooCommerce", "Custom Theme", "Payment Gateway"],
      image: portfolioShowcase,
      link: "#",
      year: "2024"
    },
    {
      title: "Studio Legale Associato",
      category: "siti-web",
      description: "Portale professionale per studio legale con area clienti riservata e blog.",
      technologies: ["React", "Node.js", "MongoDB"],
      image: portfolioShowcase,
      link: "#",
      year: "2023"
    },
    {
      title: "Wellness Center App",
      category: "design",
      description: "Design completo per applicazione di centro benessere con prenotazioni e programmi.",
      technologies: ["Figma", "Adobe XD", "Prototyping"],
      image: portfolioShowcase,
      link: "#",
      year: "2023"
    },
    {
      title: "Tech Startup Landing",
      category: "siti-web",
      description: "Landing page moderna per startup tecnologica con animazioni e call-to-action efficaci.",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
      image: portfolioShowcase,
      link: "#",
      year: "2024"
    },
    {
      title: "Marketplace Artigianale",
      category: "ecommerce",
      description: "Piattaforma e-commerce per prodotti artigianali italiani con sistema multi-vendor.",
      technologies: ["Laravel", "Vue.js", "Stripe"],
      image: portfolioShowcase,
      link: "#",
      year: "2023"
    }
  ];

  const filteredProjects = selectedCategory === "tutti" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const stats = [
    { number: "100+", label: "Progetti completati" },
    { number: "50+", label: "Clienti soddisfatti" },
    { number: "5+", label: "Anni di esperienza" },
    { number: "98%", label: "Tasso di soddisfazione" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-optix-light via-background to-optix-light py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              I nostri <span className="bg-gradient-to-r from-optix-blue to-optix-green bg-clip-text text-transparent">progetti</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Esplora i progetti che abbiamo realizzato per i nostri clienti. 
              Ogni progetto è una storia di successo che dimostra il nostro impegno 
              nel creare soluzioni digitali di qualità.
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-optix-blue mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id 
                  ? "bg-gradient-to-r from-optix-blue to-optix-green hover:from-optix-blue/90 hover:to-optix-green/90 text-white" 
                  : "border-optix-blue text-optix-blue hover:bg-optix-light"
                }
              >
                <category.icon className="mr-2 h-4 w-4" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-optix-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4">
                      <Button size="sm" variant="secondary" className="bg-white text-optix-blue hover:bg-white/90">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Visualizza
                      </Button>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 text-optix-blue">
                      {project.year}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-optix-blue/20 text-optix-blue">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Come lavoriamo
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ogni progetto segue un processo strutturato che ci permette di 
              garantire risultati di qualità e rispettare sempre i tempi concordati.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-optix-blue to-optix-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="font-semibold text-lg mb-3">Analisi e Strategia</h3>
                <p className="text-muted-foreground text-sm">
                  Studiamo il tuo business e definiamo insieme obiettivi e strategia del progetto.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-white text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-optix-blue to-optix-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="font-semibold text-lg mb-3">Design e Sviluppo</h3>
                <p className="text-muted-foreground text-sm">
                  Creiamo il design e sviluppiamo la soluzione utilizzando le migliori tecnologie.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-white text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-optix-blue to-optix-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="font-semibold text-lg mb-3">Lancio e Supporto</h3>
                <p className="text-muted-foreground text-sm">
                  Mettiamo online il progetto e forniamo supporto continuo per garantire il successo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-optix-blue to-optix-green">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Il tuo progetto sarà il prossimo?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Trasforma le tue idee in realtà digitali di successo. 
            Contattaci per una consulenza gratuita e scopri come possiamo aiutarti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-optix-blue hover:bg-white/90">
              <Link to="/contatti">
                Inizia il tuo progetto
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link to="/servizi">
                Scopri i nostri servizi
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;