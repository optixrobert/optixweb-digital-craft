import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Phone, Users, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AuditRequestFormProps {
  sourceChannel?: string;
  landingPage?: string;
  variant?: "default" | "facebook" | "linkedin" | "google";
}

export function AuditRequestForm({ sourceChannel = "direct", landingPage = "homepage", variant = "default" }: AuditRequestFormProps) {
  const [formData, setFormData] = useState({
    nome: "",
    azienda: "",
    whatsapp: "",
    obiettivo_principale: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const variantConfig = {
    default: {
      title: "Ricevi il tuo Audit Gratuito",
      subtitle: "Analisi completa del tuo sito web in 24 ore",
      buttonText: "Scarica Audit Gratuito",
      benefits: ["Analisi tecnica completa", "Report dettagliato", "Consulenza telefonica gratuita"]
    },
    facebook: {
      title: "Audit Gratuito per PMI",
      subtitle: "Scopri come triplicare le vendite online",
      buttonText: "Scarica Subito",
      benefits: ["Case study PMI simili", "Strategia personalizzata", "ROI garantito"]
    },
    linkedin: {
      title: "Analisi ROI Gratuita",
      subtitle: "Metriche chiare per la crescita B2B",
      buttonText: "Richiedi Analisi",
      benefits: ["KPI misurabili", "Strategia B2B", "Partner di crescita"]
    },
    google: {
      title: "Preventivo Gratuito 24h",
      subtitle: "Competenza tecnica e risultati garantiti",
      buttonText: "Richiedi Preventivo",
      benefits: ["Competenza tecnica", "SEO incluso", "Supporto dedicato"]
    }
  };

  const config = variantConfig[variant];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('audit_requests')
        .insert({
          ...formData,
          fonte_traffico: sourceChannel,
          landing_page: landingPage
        });

      if (error) throw error;

      // Traccia la conversione
      await supabase
        .from('conversion_metrics')
        .insert({
          phase: 'lead',
          source_channel: sourceChannel,
          notes: `Lead generated from ${landingPage}`
        });

      setIsSubmitted(true);
      toast({
        title: "Richiesta Inviata!",
        description: "Ti contatteremo entro 2 ore lavorative",
      });

      // Trigger email sequence
      await supabase.functions.invoke('send-audit-welcome', {
        body: formData
      });

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore. Riprova.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-6 text-center">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Richiesta Ricevuta!</h3>
          <p className="text-muted-foreground mb-4">
            Ti contatteremo entro <strong>2 ore lavorative</strong> via WhatsApp per fissare la tua consulenza gratuita.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 justify-center">
              <Phone className="w-4 h-4 text-primary" />
              <span>WhatsApp: {formData.whatsapp}</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Users className="w-4 h-4 text-primary" />
              <span>Azienda: {formData.azienda}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">{config.title}</CardTitle>
        <CardDescription>{config.subtitle}</CardDescription>
        <div className="flex flex-wrap gap-2 justify-center mt-3">
          {config.benefits.map((benefit, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {benefit}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nome">Nome e Cognome *</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
              placeholder="Mario Rossi"
              required
            />
          </div>

          <div>
            <Label htmlFor="azienda">Azienda *</Label>
            <Input
              id="azienda"
              value={formData.azienda}
              onChange={(e) => setFormData(prev => ({ ...prev, azienda: e.target.value }))}
              placeholder="Nome della tua azienda"
              required
            />
          </div>

          <div>
            <Label htmlFor="whatsapp">WhatsApp *</Label>
            <Input
              id="whatsapp"
              type="tel"
              value={formData.whatsapp}
              onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
              placeholder="+39 333 123 4567"
              required
            />
          </div>

          <div>
            <Label htmlFor="obiettivo">Obiettivo Principale *</Label>
            <Select
              value={formData.obiettivo_principale}
              onValueChange={(value) => setFormData(prev => ({ ...prev, obiettivo_principale: value }))}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleziona il tuo obiettivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aumentare-vendite">Aumentare le vendite online</SelectItem>
                <SelectItem value="generare-lead">Generare più lead qualificati</SelectItem>
                <SelectItem value="migliorare-seo">Migliorare posizionamento Google</SelectItem>
                <SelectItem value="nuovo-sito">Creare nuovo sito web</SelectItem>
                <SelectItem value="ecommerce">Aprire un e-commerce</SelectItem>
                <SelectItem value="altro">Altro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? "Invio in corso..." : config.buttonText}
            <TrendingUp className="w-4 h-4 ml-2" />
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Risposta garantita entro 2 ore lavorative
          </p>
        </form>
      </CardContent>
    </Card>
  );
}