import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Euro, CheckCircle, Calendar, Users, TrendingUp, Building, Target, Clock, FileText, Award, Zap, GraduationCap, BookOpen, Monitor } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { AuditRequestForm } from "@/components/AuditRequestForm";

const CreditoImposta = () => {
  const seoComponent = useSEO({
    title: "Credito d'Imposta Formazione 4.0 | Optix Web Ente di Formazione Accreditato",
    description: "Ottieni il 70% di credito d'imposta per la formazione digitale 4.0. Optix Web ente accreditato per corsi su sviluppo web, e-commerce, digital marketing. Formazione aziendale finanziata.",
    keywords: "credito imposta formazione 4.0, corsi digital marketing finanziati, formazione sviluppo web, ente formazione accreditato, corsi e-commerce aziende, formazione digitale imprese",
    canonicalUrl: "https://optixweb.space/bandi-digitali/credito-imposta-formazione"
  });

  const requisitiBando = [
    "Tutte le imprese italiane (anche individuali)",
    "Formazione su competenze digitali 4.0", 
    "Corsi di almeno 16 ore",
    "Massimo €300.000 per azienda (3 anni)"
  ];

  const corsiFinanziabili = [
    {
      icon: Monitor,
      title: "Sviluppo Web e Programmazione",
      description: "Corsi specializzati su sviluppo siti web, e-commerce e applicazioni digitali",
      percentuale: "70% credito d'imposta",
      esempi: ["HTML/CSS/JavaScript", "WordPress avanzato", "E-commerce development"]
    },
    {
      icon: TrendingUp, 
      title: "Digital Marketing e SEO",
      description: "Formazione completa su marketing digitale, SEO e social media management",
      percentuale: "70% credito d'imposta",
      esempi: ["SEO/SEM", "Social media marketing", "Google Analytics"]
    },
    {
      icon: Target,
      title: "Trasformazione Digitale",
      description: "Percorsi di formazione per la digitalizzazione dei processi aziendali",
      percentuale: "70% credito d'imposta", 
      esempi: ["Digital transformation", "Automazione processi", "Cloud computing"]
    },
    {
      icon: BookOpen,
      title: "E-commerce e Vendite Online",
      description: "Competenze per gestire negozi online e strategie di vendita digitale",
      percentuale: "70% credito d'imposta",
      esempi: ["Gestione e-commerce", "Marketplace selling", "Customer journey"]
    }
  ];

  const processoOptixWeb = [
    {
      step: "1",
      title: "Analisi Fabbisogni Formativi",
      description: "Valutiamo le competenze digitali della tua azienda e identifichiamo i corsi più utili",
      durata: "1-2 giorni"
    },
    {
      step: "2", 
      title: "Progettazione Percorso",
      description: "Creiamo un piano formativo personalizzato conforme ai requisiti 4.0",
      durata: "3-5 giorni"
    },
    {
      step: "3",
      title: "Erogazione Formazione", 
      description: "Corsi in aula o online con docenti certificati ed esperti del settore",
      durata: "2-8 settimane"
    },
    {
      step: "4",
      title: "Gestione Credito d'Imposta",
      description: "Documentazione completa per ottenere il 70% di credito d'imposta",
      durata: "Post corso"
    }
  ];

  const vantaggiOptixWeb = [
    {
      icon: Award,
      title: "Ente di Formazione Accreditato",
      description: "Riconoscimento ufficiale per l'erogazione di corsi finanziabili"
    },
    {
      icon: Users,
      title: "1000+ Professionisti Formati",
      description: "Esperienza consolidata nella formazione digitale aziendale"
    },
    {
      icon: GraduationCap,
      title: "Docenti Certificati",
      description: "Team di esperti con certificazioni Google, Meta e Microsoft"
    },
    {
      icon: CheckCircle,
      title: "100% Crediti Ottenuti",
      description: "Tutta la documentazione necessaria per il credito d'imposta"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {seoComponent}
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="border-green-500 text-green-700">
                  🎓 Formazione Sempre Disponibile
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Credito d'Imposta Formazione 4.0
                  <span className="block text-primary">70% Finanziato</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  <strong>Optix Web ente di formazione accreditato</strong> per il Credito d'Imposta Formazione 4.0. 
                  Corsi specializzati su digital marketing, sviluppo web ed e-commerce con il 70% di credito fiscale.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Euro className="w-5 h-5 text-green-500" />
                  <span><strong>70%</strong> credito d'imposta</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span><strong>Corsi</strong> da 16 ore</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-purple-500" />
                  <span><strong>Tutte</strong> le imprese</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-orange-500" />
                  <span><strong>Formazione</strong> certificata</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8 py-3">
                  <Link to="/contatti">
                    Analisi Fabbisogni Gratuita
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
                  <a href="https://wa.me/393532004367?text=Vorrei%20informazioni%20sui%20corsi%20formazione%204.0" target="_blank">
                    WhatsApp Diretto
                  </a>
                </Button>
              </div>
            </div>

            {/* Info Card */}
            <Card className="border-primary/20 bg-primary/5 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-primary" />
                  Dettagli Credito Formazione
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Credito Massimo</h3>
                  <div className="text-3xl font-bold text-primary">€300.000</div>
                  <p className="text-sm text-muted-foreground">per azienda in 3 anni</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Percentuale Credito</h3>
                  <div className="text-2xl font-bold text-green-600">70%</div>
                  <p className="text-sm text-muted-foreground">del costo della formazione</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Requisiti Principali</h3>
                  <ul className="space-y-1 text-sm">
                    {requisitiBando.map((requisito, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {requisito}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button asChild className="w-full">
                  <Link to="/contatti">
                    Richiedi Catalogo Corsi
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Corsi Finanziabili */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Corsi Optix Web con Credito d'Imposta 70%
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Formazione specializzata su competenze digitali 4.0 per trasformare la tua azienda
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {corsiFinanziabili.map((corso, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary/70 rounded-lg flex items-center justify-center">
                      <corso.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{corso.title}</CardTitle>
                      <Badge variant="secondary" className="bg-green-100 text-green-800 mt-1">
                        {corso.percentuale}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{corso.description}</p>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Moduli formativi:</h4>
                    <div className="flex flex-wrap gap-2">
                      {corso.esempi.map((esempio, idx) => (
                        <Badge key={idx} variant="outline">
                          {esempio}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Processo Optix Web */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Come Funziona la Formazione con Credito d'Imposta
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Dalla pianificazione alla gestione del credito fiscale, ti seguiamo in ogni fase
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processoOptixWeb.map((fase, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white text-center relative">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">{fase.step}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{fase.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{fase.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {fase.durata}
                  </Badge>
                </CardContent>
                {index < processoOptixWeb.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vantaggi Optix Web */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Perché Scegliere Optix Web per la Formazione 4.0
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ente accreditato con esperienza consolidata nella formazione digitale aziendale
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {vantaggiOptixWeb.map((vantaggio, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-4">
                    <vantaggio.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{vantaggio.title}</h3>
                  <p className="text-muted-foreground text-sm">{vantaggio.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Domande Frequenti sul Credito d'Imposta Formazione
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                domanda: "Come funziona il credito d'imposta del 70% per la formazione?",
                risposta: "Il credito può essere utilizzato in compensazione F24 o ceduto a terzi. Copre il 70% del costo della formazione su competenze digitali 4.0."
              },
              {
                domanda: "Quali sono i requisiti minimi per i corsi finanziabili?",
                risposta: "I corsi devono durare almeno 16 ore e riguardare competenze digitali 4.0. Non ci sono limiti dimensionali per le aziende."
              },
              {
                domanda: "I corsi si possono fare online o solo in presenza?",
                risposta: "Entrambe le modalità sono ammesse. Optix Web offre formazione sia in aula che online con la stessa qualità e riconoscimento."
              },
              {
                domanda: "Che documentazione serve per ottenere il credito?",
                risposta: "Optix Web fornisce tutta la documentazione necessaria: attestati, registri presenze, fatture e dichiarazioni di conformità."
              }
            ].map((faq, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">{faq.domanda}</h3>
                  <p className="text-muted-foreground">{faq.risposta}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Inizia Subito la Formazione con il 70% di Credito
            </h2>
            <p className="text-xl text-white/90 mb-4 max-w-2xl mx-auto">
              <strong>Analisi gratuita dei fabbisogni formativi</strong> e piano personalizzato. 
              Forma il tuo team con il 70% di credito d'imposta.
            </p>
            <div className="mt-4 text-white/80 text-sm">
              📚 <strong>Corsi sempre disponibili</strong> - Pianifica la formazione quando vuoi!
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <AuditRequestForm 
              variant="default" 
              sourceChannel="credito-imposta-formazione" 
              landingPage="/bandi-digitali/credito-imposta-formazione" 
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CreditoImposta;