import React from "react";
import SEOMeta from "../components/common/SEOMeta";

import Hero from "../components/common/Hero";
import productHeroImage from "../assets/hero-digital-signage.webp";
import DigitalSignageTeaser from "../components/digitalsignage/DigitalSignageTeaser";
import DigitalSignageStatsFeature from "../components/digitalsignage/DigitalSignageStatsFeature";
function PesanOtomatis() {
  const productHeroProps = {
    welcomeText: "Qmatic Orchestra",
    title: "Digital Signage",
    subtitle: "Ubah waktu tunggu menjadi pengalaman pelanggan yang luar biasa",
    imageUrl: productHeroImage,
    textAlign: "text-center mx-auto",
    showButtons: false,
  };

  return (
    <div className="bg-primary min-h-screen">
      <SEOMeta
        title="Tampilan Papan Informasi Digital Signage"
        description="Ubah area dan waktu tunggu menjadi media interaktif yang informatif dan menyenangkan dengan Digital Signage Exaque."
        url="https://exaque.com/tampilan-papan-informasi-digital"
      />
      <Hero {...productHeroProps} />
      <div className="py-8 md:py-20 space-y-15 md:space-y-20">
      <DigitalSignageStatsFeature />
      <DigitalSignageTeaser />
      </div>
    </div>
  );
}

export default PesanOtomatis;
