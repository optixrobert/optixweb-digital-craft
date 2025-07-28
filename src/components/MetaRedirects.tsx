import { Helmet } from "react-helmet-async";

export const MetaRedirects = () => {
  return (
    <Helmet>
      {/* Prevent duplicate content for common variations */}
      <link rel="canonical" href="https://optixweb.space/" />
      
      {/* Additional indexing hints */}
      <meta name="referrer" content="origin-when-cross-origin" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Structured data for better crawling */}
      <meta name="application-name" content="Optixweb.space" />
      <meta name="msapplication-TileColor" content="#0066cc" />
      <meta name="theme-color" content="#0066cc" />
    </Helmet>
  );
};