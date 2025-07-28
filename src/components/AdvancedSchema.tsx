import { Helmet } from "react-helmet-async";

interface AdvancedSchemaProps {
  type: "homepage" | "service" | "portfolio" | "about" | "contact";
  customData?: object;
}

export const AdvancedSchema = ({ type, customData }: AdvancedSchemaProps) => {
  const baseOrganization = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    "name": "Optix Web",
    "alternateName": ["OptixWeb", "Optixweb.space"],
    "description": "Agenzia web italiana leader con 40 esperti specializzati in sviluppo siti web professionali, e-commerce personalizzati e applicazioni su misura per aziende italiane",
    "url": "https://optixweb.space",
    "logo": {
      "@type": "ImageObject",
      "url": "https://optixweb.space/src/assets/optixweb-logo.png",
      "width": 200,
      "height": 200
    },
    "image": [
      "https://optixweb.space/src/assets/hero-image.jpg",
      "https://optixweb.space/src/assets/team-image.jpg",
      "https://optixweb.space/src/assets/portfolio-showcase.jpg"
    ],
    "telephone": "+39-353-200-4367",
    "email": "info@optixweb.space",
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
    "areaServed": [
      {
        "@type": "Country",
        "name": "Italia"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Lombardia"
      },
      {
        "@type": "AdministrativeArea", 
        "name": "Lazio"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Veneto"
      }
    ],
    "serviceArea": {
      "@type": "Country",
      "name": "Italia"
    },
    "foundingDate": "2012",
    "numberOfEmployees": "40+",
    "priceRange": "€€",
    "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer", "PayPal"],
    "currenciesAccepted": "EUR",
    "openingHours": "Mo-Fr 09:00-18:00",
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
    "sameAs": [
      "https://www.linkedin.com/company/optixweb",
      "https://www.facebook.com/optixweb",
      "https://twitter.com/optixweb",
      "https://www.instagram.com/optixweb",
      "https://wa.me/393532004367"
    ]
  };

  const getSchemaForType = () => {
    switch (type) {
      case "homepage":
        return {
          ...baseOrganization,
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Servizi Web Professionali per Aziende Italiane",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Realizzazione Siti Web Professionali",
                  "description": "Sviluppo siti web professionali responsive e ottimizzati SEO per aziende italiane",
                  "provider": {
                    "@type": "Organization",
                    "name": "Optix Web"
                  }
                },
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "price": "1500",
                  "priceCurrency": "EUR",
                  "valueAddedTaxIncluded": false
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Sviluppo E-commerce Personalizzati",
                  "description": "E-commerce completi ottimizzati per il mercato italiano con sistemi di pagamento locali",
                  "provider": {
                    "@type": "Organization",
                    "name": "Optix Web"
                  }
                },
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "price": "3500",
                  "priceCurrency": "EUR",
                  "valueAddedTaxIncluded": false
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Applicazioni Web Su Misura",
                  "description": "Sviluppo applicazioni web personalizzate per ottimizzare processi aziendali",
                  "provider": {
                    "@type": "Organization",
                    "name": "Optix Web"
                  }
                },
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "price": "5000",
                  "priceCurrency": "EUR",
                  "valueAddedTaxIncluded": false
                }
              }
            ]
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "200",
            "bestRating": "5",
            "worstRating": "1"
          },
          "review": [
            {
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": "Marco Rossi"
              },
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              },
              "reviewBody": "Ottimo servizio, sito web professionale realizzato nei tempi concordati. Team competente e supporto eccellente.",
              "datePublished": "2024-01-15"
            }
          ]
        };

      case "service":
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Servizi Web Professionali per Aziende Italiane",
          "description": "Servizi web completi: sviluppo siti web, e-commerce, applicazioni personalizzate per aziende italiane",
          "provider": baseOrganization,
          "areaServed": "IT",
          "serviceType": "Web Development",
          "category": "Technology Services",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Catalogo Servizi Web",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Siti Web Professionali",
                  "description": "Sviluppo siti web responsive ottimizzati per aziende italiane"
                }
              },
              {
                "@type": "Offer", 
                "itemOffered": {
                  "@type": "Service",
                  "name": "E-commerce Italia",
                  "description": "Negozi online personalizzati per il mercato italiano"
                }
              }
            ]
          }
        };

      case "portfolio":
        return {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Portfolio Progetti Web - Optix Web",
          "description": "Portfolio completo dei progetti web realizzati per aziende italiane: oltre 200 progetti completati",
          "url": "https://optixweb.space/portfolio",
          "mainEntity": baseOrganization,
          "hasPart": [
            {
              "@type": "WebSite",
              "name": "Progetti Siti Web Aziendali",
              "description": "Esempi di siti web professionali realizzati per aziende italiane"
            },
            {
              "@type": "WebApplication",
              "name": "E-commerce di Successo",
              "description": "Portfolio e-commerce personalizzati per il mercato italiano"
            }
          ]
        };

      case "about":
        return {
          ...baseOrganization,
          "employee": [
            {
              "@type": "Person",
              "name": "Marco Rossi",
              "jobTitle": "CEO & Full Stack Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "Optix Web"
              }
            },
            {
              "@type": "Person", 
              "name": "Laura Bianchi",
              "jobTitle": "UX/UI Designer",
              "worksFor": {
                "@type": "Organization",
                "name": "Optix Web"
              }
            }
          ],
          "knowsAbout": [
            "Sviluppo Web",
            "E-commerce",
            "SEO Italia",
            "UX/UI Design",
            "Marketing Digitale",
            "GDPR Compliance"
          ]
        };

      case "contact":
        return {
          ...baseOrganization,
          "potentialAction": [
            {
              "@type": "CommunicateAction",
              "name": "Contatta Optix Web",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://optixweb.space/contatti"
              }
            },
            {
              "@type": "CommunicateAction",
              "name": "WhatsApp Diretto",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://wa.me/393532004367"
              }
            }
          ]
        };

      default:
        return baseOrganization;
    }
  };

  const schemaData = customData ? { ...getSchemaForType(), ...customData } : getSchemaForType();

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};