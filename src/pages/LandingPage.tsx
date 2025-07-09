import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle, Users, TrendingUp, Clock, Phone } from "lucide-react";
import { AuditRequestForm } from "@/components/AuditRequestForm";
import { supabase } from "@/integrations/supabase/client";
import { useSEO } from "@/hooks/useSEO";

interface LandingPageData {
  id: string;
  slug: string;
  title: string;
  hero_title: string;
  hero_subtitle: string;
  value_proposition: string;
  target_audience: string;
  cta_primary: string;
  cta_secondary?: string | null;
  social_proof: string[] | null;
  case_studies: string[] | null;
  visits: number;
}

export default function LandingPage() {
  const { slug } = useParams();
  const [landingData, setLandingData] = useState<LandingPageData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useSEO({
    title: landingData?.title || "Trasforma il tuo sito in una macchina di vendita | OptixWeb",
    description: landingData?.hero_subtitle || "40 esperti web, 12 anni di esperienza, risultati garantiti per aziende italiane",
    keywords: "agenzia web, siti web, conversioni, lead generation, ROI, PMI italiane, e-commerce",
  });

  useEffect(() => {
    const fetchLandingData = async () => {
      if (!slug) return;

      try {
        // Fetch current visits count and increment
        const { data: currentData } = await supabase
          .from('landing_pages')
          .select('visits')
          .eq('slug', slug)
          .single();

        if (currentData) {
          await supabase
            .from('landing_pages')
            .update({ visits: (currentData.visits || 0) + 1 })
            .eq('slug', slug);
        }

        // Fetch landing page data
        const { data, error } = await supabase
          .from('landing_pages')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single();

        if (error || !data) {
          setLandingData(null);
          return;
        }

        setLandingData(data);

        // Traccia la visita nelle metriche
        await supabase
          .from('conversion_metrics')
          .insert({
            phase: 'visitor',
            source_channel: getSourceFromSlug(slug),
            notes: `Landing page visit: ${slug}`
          });

      } catch (error) {
        console.error('Error fetching landing data:', error);
        setLandingData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLandingData();
  }, [slug]);

  const getSourceFromSlug = (slug: string) => {
    if (slug.includes('facebook')) return 'facebook';
    if (slug.includes('linkedin')) return 'linkedin';
    if (slug.includes('google')) return 'google';
    return 'direct';
  };

  const getVariantFromSlug = (slug: string): "facebook" | "linkedin" | "google" | "default" => {
    if (slug.includes('facebook')) return 'facebook';
    if (slug.includes('linkedin')) return 'linkedin';
    if (slug.includes('google')) return 'google';
    return 'default';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!landingData || !slug) {
    return <Navigate to="/404" replace />;
  }

  const whatsappNumber = "+393451234567"; // Sostituisci con il tuo numero
  const whatsappMessage = `Ciao! Sono interessato ai vostri servizi web. Ho visitato la pagina ${slug}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-sm font-medium">
                  {landingData.target_audience}
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {landingData.hero_title}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {landingData.hero_subtitle}
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
                    {landingData.value_proposition}
                  </p>
                </CardContent>
              </Card>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8 py-3">
                  <a href="#audit-form">
                    {landingData.cta_primary}
                    <TrendingUp className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                {landingData.cta_secondary && (
                  <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      {landingData.cta_secondary}
                      <Phone className="w-5 h-5 ml-2" />
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:pl-8">
              <div id="audit-form">
                <AuditRequestForm 
                  sourceChannel={getSourceFromSlug(slug)}
                  landingPage={slug}
                  variant={getVariantFromSlug(slug)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 px-4 bg-background/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Risultati Concreti per Aziende come la Tua</h2>
            <p className="text-lg text-muted-foreground">
              Scopri come abbiamo aiutato aziende simili alla tua
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {landingData.social_proof?.map((proof, index) => (
              <Card key={index} className="border-primary/10">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Star className="w-6 h-6 text-primary fill-current" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-lg mb-2">{proof}</p>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map((star) => (
                          <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8">Perché Scegliere OptixWeb</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Risultati Garantiti</h3>
              <p className="text-muted-foreground">
                12 anni di esperienza e oltre 200 progetti di successo
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Risposta Rapida</h3>
              <p className="text-muted-foreground">
                Ti contatteremo entro 2 ore lavorative via WhatsApp
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Team Dedicato</h3>
              <p className="text-muted-foreground">
                40+ esperti specializzati in crescita digitale
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto a Trasformare il Tuo Business Online?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Inizia con una consulenza gratuita di 30 minuti
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-3">
              <a href="#audit-form">
                {landingData.cta_primary}
                <TrendingUp className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                WhatsApp Diretto
                <Phone className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}