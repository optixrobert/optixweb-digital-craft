import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

const DEFAULT_SEO = {
  title: "Optixweb.space | Web Agency Professionale - Realizzazione Siti Web e Applicazioni",
  description: "Web agency italiana specializzata in realizzazione siti web professionali, sviluppo applicazioni web custom e consulenza digitale per PMI, startup e professionisti.",
  keywords: "realizzazione siti web, sviluppo applicazioni, web agency Italia, siti web professionali, e-commerce, SEO, UX/UI design, web marketing, consulenza digitale, PMI, startup, WordPress, React, sviluppo custom",
  image: "https://lovable.dev/opengraph-image-p98pqg.png",
  type: "website",
  url: "https://optixweb.space"
};

export const useSEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  canonicalUrl,
  structuredData
}: SEOProps = {}) => {
  const seoTitle = title ? `${title} | Optixweb.space` : DEFAULT_SEO.title;
  const seoDescription = description || DEFAULT_SEO.description;
  const seoKeywords = keywords || DEFAULT_SEO.keywords;
  const seoImage = image || DEFAULT_SEO.image;
  const seoUrl = url || DEFAULT_SEO.url;
  const seoCanonicalUrl = canonicalUrl || seoUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content="Optixweb.space" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="it-IT" />
      <meta name="geo.region" content="IT" />
      <meta name="geo.country" content="Italy" />

      {/* Canonical URL */}
      <link rel="canonical" href={seoCanonicalUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:site_name" content="Optixweb.space" />
      <meta property="og:locale" content="it_IT" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:site" content="@optixweb" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

// Structured Data Templates
export const createWebsiteStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Optixweb.space",
  "description": "Web agency italiana specializzata in realizzazione siti web professionali e sviluppo applicazioni web custom",
  "url": "https://optixweb.space",
  "logo": "https://optixweb.space/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+39-XXX-XXXXXXX",
    "contactType": "customer service",
    "areaServed": "IT",
    "availableLanguage": "Italian"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IT",
    "addressLocality": "Italia"
  },
  "sameAs": [
    "https://www.linkedin.com/company/optixweb",
    "https://www.facebook.com/optixweb",
    "https://twitter.com/optixweb"
  ],
  "services": [
    "Realizzazione siti web",
    "Sviluppo applicazioni web",
    "E-commerce",
    "SEO e ottimizzazione",
    "UX/UI Design",
    "Consulenza digitale"
  ]
});

export const createServiceStructuredData = (serviceName: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": serviceName,
  "description": description,
  "provider": {
    "@type": "Organization",
    "name": "Optixweb.space",
    "url": "https://optixweb.space"
  },
  "areaServed": "IT",
  "availableLanguage": "Italian"
});