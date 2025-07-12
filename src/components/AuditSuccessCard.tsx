import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Phone, Users } from "lucide-react";
import { AuditFormData } from "@/types/audit";

interface AuditSuccessCardProps {
  formData: AuditFormData;
}

export function AuditSuccessCard({ formData }: AuditSuccessCardProps) {
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