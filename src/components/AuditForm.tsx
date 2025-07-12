import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp } from "lucide-react";
import { AuditFormData, AuditVariantConfig } from "@/types/audit";

interface AuditFormProps {
  formData: AuditFormData;
  isLoading: boolean;
  config: AuditVariantConfig;
  onSubmit: (e: React.FormEvent) => void;
  onFieldChange: (field: keyof AuditFormData, value: string) => void;
}

export function AuditForm({ formData, isLoading, config, onSubmit, onFieldChange }: AuditFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="nome">Nome e Cognome *</Label>
        <Input
          id="nome"
          value={formData.nome}
          onChange={(e) => onFieldChange('nome', e.target.value)}
          placeholder="Mario Rossi"
          required
        />
      </div>

      <div>
        <Label htmlFor="azienda">Azienda *</Label>
        <Input
          id="azienda"
          value={formData.azienda}
          onChange={(e) => onFieldChange('azienda', e.target.value)}
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
          onChange={(e) => onFieldChange('whatsapp', e.target.value)}
          placeholder="+39 333 123 4567"
          required
        />
      </div>

      <div>
        <Label htmlFor="obiettivo">Obiettivo Principale *</Label>
        <Select
          value={formData.obiettivo_principale}
          onValueChange={(value) => onFieldChange('obiettivo_principale', value)}
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
  );
}