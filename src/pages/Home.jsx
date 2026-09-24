import React from "react";

import Hero from "../components/home/Hero";
import AboutTeaser from "../components/home/AboutTeaser";
import IntegratedSolutions from "../components/home/IntegratedSolutions";
import IntegrationSection from "../components/home/IntegrationSection";
import NewsSection from "../components/home/NewsSection";
import CustomerStories from "../components/home/CustomerStories";
import LinkedInInsights from "../components/home/LinkedInInsights";
import HomeCTA from "../components/home/HomeCTA";

import SEOMeta from "../components/common/SEOMeta";
// Helmet import removed as it's no longer used directly in this file

function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PT Exaque Mandiri Makmur",
    "url": "https://exaque.com",
    "logo": "https://exaque.com/logo-helmet.svg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+62-815-8176181",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.linkedin.com/company/exaque"
    ]
  };

  return (
    <div className="bg-primary min-h-screen">
      <SEOMeta 
        title="Exaque - Sistem Manajemen Antrian & Solusi Perjalanan Pelanggan" 
        description="PT Exaque Mandiri Makmur menyediakan solusi Customer Journey Management, Sistem Antrian, dan People Counting terkemuka di Indonesia." 
        url="https://exaque.com" 
        exactTitle={true} 
        schemas={organizationSchema}
      />
      <Hero />
      <div className="py-8 md:py-20 space-y-15 md:space-y-20">
      <AboutTeaser />
      <IntegratedSolutions />
      <IntegrationSection />
      {/* <CustomerStories /> */}
      {/* <NewsSection /> */}
      </div>
      <LinkedInInsights />
      <HomeCTA />
    </div>
  );
}

export default Home;
