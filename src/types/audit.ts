export interface AuditRequestFormProps {
  sourceChannel?: string;
  landingPage?: string;
  variant?: "default" | "facebook" | "linkedin" | "google";
}

export interface AuditFormData {
  nome: string;
  azienda: string;
  whatsapp: string;
  obiettivo_principale: string;
}

export interface AuditVariantConfig {
  title: string;
  subtitle: string;
  buttonText: string;
  benefits: string[];
}