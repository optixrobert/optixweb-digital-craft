import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const Contatti = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefono: "",
    azienda: "",
    servizio: "",
    messaggio: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.email || !formData.messaggio) {
      toast({
        title: "Campi mancanti",
        description: "Per favore compila tutti i campi obbligatori",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Salva nel database
      const { error } = await supabase
        .from('contact_requests')
        .insert([
          {
            nome: formData.nome,
            email: formData.email,
            telefono: formData.telefono,
            azienda: formData.azienda,
            servizio: formData.servizio,
            messaggio: formData.messaggio,
            status: 'new'
          }
        ]);

      if (error) throw error;

      toast({
        title: "Messaggio inviato!",
        description: "Ti contatteremo entro 24 ore per la tua consulenza gratuita.",
      });
      
      // Reset form
      setFormData({
        nome: "",
        email: "",
        telefono: "",
        azienda: "",
        servizio: "",
        messaggio: ""
      });

    } catch (error) {
      console.error('Error submitting contact request:', error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore. Riprova più tardi o contattaci direttamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "info@optixweb.space",
      description: "Scrivici per qualsiasi informazione"
    },
    {
      icon: Phone,
      title: "Telefono",
      content: "+39 123 456 7890",
      description: "Chiamaci dal Lunedì al Venerdì"
    },
    {
      icon: MapPin,
      title: "Sede",
      content: "Italia",
      description: "Serviamo clienti in tutta Italia"
    },
    {
      icon: Clock,
      title: "Orari",
      content: "9:00 - 18:00",
      description: "Lunedì - Venerdì"
    }
  ];

  const services = [
    "Realizzazione Siti Web",
    "E-commerce",
    "Applicazioni Web Custom",
    "UX/UI Design",
    "SEO e Ottimizzazione",
    "Consulenza Digitale",
    "Altro"
  ];

  const faqs = [
    {
      question: "Quanto tempo serve per realizzare un sito web?",
      answer: "I tempi variano in base alla complessità del progetto. Un sito vetrina richiede 2-3 settimane, mentre progetti più complessi possono richiedere 4-8 settimane."
    },
    {
      question: "Fornite assistenza dopo il lancio?",
      answer: "Sì, offriamo supporto tecnico e manutenzione continua per garantire che il tuo sito funzioni sempre perfettamente."
    },
    {
      question: "I vostri siti sono ottimizzati per mobile?",
      answer: "Assolutamente sì. Tutti i nostri progetti sono responsive e ottimizzati per dispositivi mobili fin dall'inizio."
    },
    {
      question: "Posso gestire autonomamente i contenuti del sito?",
      answer: "Sì, realizziamo siti con sistemi di gestione contenuti intuitivi e forniamo formazione per l'utilizzo."
    }
  ];

  const seoComponent = useSEO({
    title: "Contatti - Richiedi un Preventivo Gratuito",
    description: "Contatta Optixweb.space per un preventivo gratuito. Siamo a tua disposizione per realizzare il tuo progetto web: siti, e-commerce, applicazioni e consulenza digitale.",
    keywords: "contatti web agency, preventivo sito web, richiesta preventivo gratuito, consulenza web, contatto sviluppatori web Italia",
    canonicalUrl: "https://optixweb.space/contatti"
  });

  return (
    <div className="min-h-screen bg-background">
      {seoComponent}
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-optix-light via-background to-optix-light py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-optix-blue to-optix-green bg-clip-text text-transparent">Contattaci</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Siamo qui per aiutarti a trasformare le tue idee in realtà digitali di successo. 
              Contattaci per una consulenza gratuita e senza impegno.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-optix-blue to-optix-green rounded-lg flex items-center justify-center mx-auto mb-4">
                    <info.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                  <p className="text-optix-blue font-medium mb-1">{info.content}</p>
                  <p className="text-muted-foreground text-sm">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-optix-blue" />
                    Richiedi una consulenza gratuita
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Compila il form per ricevere una consulenza personalizzata per il tuo progetto.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nome">Nome *</Label>
                        <Input
                          id="nome"
                          name="nome"
                          value={formData.nome}
                          onChange={handleChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="telefono">Telefono</Label>
                        <Input
                          id="telefono"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="azienda">Azienda</Label>
                        <Input
                          id="azienda"
                          name="azienda"
                          value={formData.azienda}
                          onChange={handleChange}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="servizio">Servizio di interesse</Label>
                      <select
                        id="servizio"
                        name="servizio"
                        value={formData.servizio}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">Seleziona un servizio</option>
                        {services.map((service, index) => (
                          <option key={index} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="messaggio">Messaggio *</Label>
                      <Textarea
                        id="messaggio"
                        name="messaggio"
                        value={formData.messaggio}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="mt-1"
                        placeholder="Descrivi il tuo progetto..."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-optix-blue to-optix-green hover:from-optix-blue/90 hover:to-optix-green/90 text-white"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {isLoading ? "Invio in corso..." : "Invia richiesta"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-0">
                  <div className="w-full h-64 bg-gradient-to-br from-optix-light to-optix-blue/10 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-optix-blue mx-auto mb-2" />
                      <p className="text-muted-foreground">Google Maps</p>
                      <p className="text-sm text-muted-foreground">Mappa interattiva disponibile</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader>
                  <CardTitle>Domande frequenti</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border-b border-border pb-4 last:border-b-0">
                        <h4 className="font-medium text-foreground mb-2">{faq.question}</h4>
                        <p className="text-sm text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
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
            Iniziamo a lavorare insieme
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Ogni grande progetto inizia con una conversazione. 
            Contattaci oggi e trasformiamo le tue idee in successo digitale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-optix-blue hover:bg-white/90">
              <a href="mailto:info@optixweb.space">
                <Mail className="mr-2 h-4 w-4" />
                Scrivici subito
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <a href="tel:+39123456790">
                <Phone className="mr-2 h-4 w-4" />
                Chiamaci ora
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contatti;