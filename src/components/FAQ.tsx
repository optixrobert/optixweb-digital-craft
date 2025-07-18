import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { createFAQStructuredData } from "@/hooks/useSEO";
import { Helmet } from "react-helmet-async";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export const FAQ = ({ items, title = "Domande Frequenti" }: FAQProps) => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  
  const structuredData = createFAQStructuredData(items);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
          <div className="space-y-4">
            {items.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <button
                    className="w-full text-left p-6 hover:bg-muted/50 transition-colors"
                    onClick={() => toggleItem(index)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold pr-4">{item.question}</h3>
                      {openItems.includes(index) ? (
                        <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                      )}
                    </div>
                  </button>
                  {openItems.includes(index) && (
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};