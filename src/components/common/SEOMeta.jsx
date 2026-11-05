import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEOMeta({ 
  title, 
  description, 
  url, 
  type = "website", 
  image = "https://exaque.com/og-image.png", 
  exactTitle = false,
  schemas = null
}) {
  const fullTitle = exactTitle ? title : (title.includes("Exaque") ? title : `${title} - Exaque`);

  // Default WebPage Schema for every page
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": fullTitle,
    "description": description,
    "url": url,
    "image": image
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PT Exaque Mandiri Makmur",
    "url": "https://exaque.com/"
  };

  // Combine default schema with custom ones
  let structuredData = [defaultSchema, webSiteSchema];
  if (schemas) {
    if (Array.isArray(schemas)) {
      structuredData = [...structuredData, ...schemas];
    } else {
      structuredData.push(schemas);
    }
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="PT Exaque Mandiri Makmur" />
      <meta property="og:locale" content="id_ID" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
