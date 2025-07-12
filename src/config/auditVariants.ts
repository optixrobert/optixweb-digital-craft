import { AuditVariantConfig } from "@/types/audit";

export const auditVariantConfig: Record<string, AuditVariantConfig> = {
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