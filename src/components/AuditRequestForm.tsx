import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AuditRequestFormProps } from "@/types/audit";
import { auditVariantConfig } from "@/config/auditVariants";
import { useAuditForm } from "@/hooks/useAuditForm";
import { AuditForm } from "@/components/AuditForm";
import { AuditSuccessCard } from "@/components/AuditSuccessCard";

export function AuditRequestForm({ 
  sourceChannel = "direct", 
  landingPage = "homepage", 
  variant = "default" 
}: AuditRequestFormProps) {
  const config = auditVariantConfig[variant];
  const { formData, isLoading, isSubmitted, handleSubmit, updateFormData } = useAuditForm(
    sourceChannel, 
    landingPage, 
    variant
  );

  if (isSubmitted) {
    return <AuditSuccessCard formData={formData} />;
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
        <AuditForm 
          formData={formData}
          isLoading={isLoading}
          config={config}
          onSubmit={handleSubmit}
          onFieldChange={updateFormData}
        />
      </CardContent>
    </Card>
  );
}