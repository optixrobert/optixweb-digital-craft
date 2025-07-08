import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Palette, Search, Zap, ShoppingCart, Package } from "lucide-react";

const ServicesSection = memo(() => {
  const services = [
    {
      icon: Code,
      title: "Sviluppo Web",
      description: "Siti web professionali e applicazioni web su misura"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      description: "Negozi online ottimizzati per le vendite"
    },
    {
      icon: Palette,
      title: "UX/UI Design",
      description: "Design accattivanti e interfacce intuitive"
    },
    {
      icon: Search,
      title: "SEO",
      description: "Ottimizzazione per i motori di ricerca"
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Siti veloci e ottimizzati"
    },
    {
      icon: Package,
      title: "Manutenzione",
      description: "Supporto continuo e aggiornamenti"
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-gray-50/50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            I nostri <span className="bg-gradient-to-r from-optix-blue to-optix-green bg-clip-text text-transparent">Servizi</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Soluzioni complete per la tua presenza digitale
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(({ icon: Icon, title, description }, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8">
                <Icon className="h-12 w-12 text-optix-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">{title}</h3>
                <p className="text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
});

export default ServicesSection;