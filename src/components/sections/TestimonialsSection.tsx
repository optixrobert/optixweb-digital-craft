import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = memo(() => {
  const testimonials = [
    {
      name: "Marco Rossi",
      company: "TechStart SRL",
      text: "Optixweb ha trasformato completamente la nostra presenza online. Il nuovo sito ha aumentato le conversioni del 300%.",
      rating: 5
    },
    {
      name: "Giulia Bianchi",
      company: "Fashion Boutique",
      text: "Professionalità e creatività al top. Il nostro e-commerce è ora una macchina da vendite perfetta.",
      rating: 5
    },
    {
      name: "Antonio Verdi",
      company: "Studio Legale Verdi",
      text: "Supporto eccellente e risultati oltre le aspettative. Consiglio vivamente Optixweb.",
      rating: 5
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-gray-50/50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Cosa dicono i nostri <span className="bg-gradient-to-r from-optix-blue to-optix-green bg-clip-text text-transparent">Clienti</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            La soddisfazione dei clienti è la nostra priorità
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
});

export default TestimonialsSection;