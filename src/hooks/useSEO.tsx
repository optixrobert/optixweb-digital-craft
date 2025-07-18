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
  "@type": ["Organization", "LocalBusiness"],
  "name": "Optixweb.space",
  "alternateName": "OptixWeb",
  "description": "Web agency italiana specializzata in realizzazione siti web professionali, sviluppo applicazioni web custom e soluzioni e-commerce per PMI e startup",
  "url": "https://optixweb.space",
  "logo": {
    "@type": "ImageObject",
    "url": "https://optixweb.space/src/assets/optixweb-logo.png",
    "width": 200,
    "height": 200
  },
  "image": "https://optixweb.space/src/assets/hero-image.jpg",
  "founder": {
    "@type": "Person",
    "name": "OptixWeb Team"
  },
  "foundingDate": "2012",
  "numberOfEmployees": "40+",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+39-353-200-4367",
      "contactType": "customer service",
      "areaServed": "IT",
      "availableLanguage": ["Italian", "English"],
      "contactOption": "TollFree"
    },
    {
      "@type": "ContactPoint",
      "url": "https://wa.me/393532004367",
      "contactType": "customer service",
      "areaServed": "IT",
      "availableLanguage": "Italian"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IT",
    "addressLocality": "Italia",
    "addressRegion": "Italia"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "41.9028",
    "longitude": "12.4964"
  },
  "sameAs": [
    "https://www.linkedin.com/company/optixweb",
    "https://www.facebook.com/optixweb",
    "https://twitter.com/optixweb",
    "https://wa.me/393532004367"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servizi Web Professionali",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Realizzazione Siti Web",
          "description": "Siti web professionali responsive e ottimizzati per la conversione"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Sviluppo E-commerce",
          "description": "Negozi online performanti con Shopify, PrestaShop e WooCommerce"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Sviluppo Applicazioni Web",
          "description": "Applicazioni web custom per ottimizzare i processi aziendali"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "200",
    "bestRating": "5"
  },
  "priceRange": "€€",
  "serviceArea": {
    "@type": "Country",
    "name": "Italia"
  }
});

export const createServiceStructuredData = (serviceName: string, description: string, price?: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": serviceName,
  "description": description,
  "provider": {
    "@type": "Organization",
    "name": "Optixweb.space",
    "url": "https://optixweb.space",
    "logo": "https://optixweb.space/src/assets/optixweb-logo.png"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Italia"
  },
  "availableLanguage": "Italian",
  "serviceType": "Web Development",
  "category": "Technology",
  ...(price && {
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": "EUR",
      "availability": "InStock"
    }
  })
});

export const createBreadcrumbStructuredData = (breadcrumbs: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url
  }))
});

export const createFAQStructuredData = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const createReviewStructuredData = (reviews: Array<{
  author: string,
  rating: number,
  text: string,
  datePublished: string
}>) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Optixweb.space",
  "review": reviews.map(review => ({
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": "5"
    },
    "reviewBody": review.text,
    "datePublished": review.datePublished
  }))
});