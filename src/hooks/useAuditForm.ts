import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useWebhook } from "@/hooks/useWebhook";
import { AuditFormData } from "@/types/audit";

export const useAuditForm = (sourceChannel: string, landingPage: string, variant: string) => {
  const [formData, setFormData] = useState<AuditFormData>({
    nome: "",
    azienda: "",
    whatsapp: "",
    obiettivo_principale: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { sendLeadToCRM } = useWebhook();

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

      // Invia al CRM
      try {
        await sendLeadToCRM({
          name: formData.nome,
          email: '', // Non disponibile nel form audit
          company: formData.azienda,
          phone: formData.whatsapp,
          message: `Obiettivo: ${formData.obiettivo_principale}`,
          source: `optixweb.space - Audit ${variant}`
        });
        console.log('Lead audit sincronizzato con CRM');
      } catch (crmError) {
        console.error('Errore sincronizzazione CRM:', crmError);
        // Non blocchiamo il flusso se il CRM fallisce
      }

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

  const updateFormData = (field: keyof AuditFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    isLoading,
    isSubmitted,
    handleSubmit,
    updateFormData
  };
};