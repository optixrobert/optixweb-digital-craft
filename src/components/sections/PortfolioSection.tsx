import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const PortfolioSection = memo(() => {
  const projects = [
    {
      title: "E-commerce Fashion",
      description: "Negozio online per brand di moda",
      category: "E-commerce",
      image: "/src/assets/portfolio-showcase.jpg"
    },
    {
      title: "App Gestionale",
      description: "Applicazione web per gestione aziendale",
      category: "Web App",
      image: "/src/assets/team-image.jpg"
    },
    {
      title: "Sito Corporate",
      description: "Sito istituzionale per azienda multinazionale",
      category: "Corporate",
      image: "/src/assets/hero-image.jpg"
    }
  ];

  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Il nostro <span className="bg-gradient-to-r from-optix-blue to-optix-green bg-clip-text text-transparent">Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Alcuni dei progetti che abbiamo realizzato per i nostri clienti
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-optix-blue/10 to-optix-green/10"></div>
              <CardContent className="p-6">
                <div className="text-sm text-optix-blue font-medium mb-2">{project.category}</div>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/portfolio">
              Vedi tutti i progetti
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
});

export default PortfolioSection;