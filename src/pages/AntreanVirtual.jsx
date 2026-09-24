import React from "react";
import SEOMeta from "../components/common/SEOMeta";
import Hero from "../components/common/Hero";
import AntreanVirtualHeroImage from "../assets/hero-antrean-virtual.webp";
import AntrianVirtualTeaser from "../components/antreanvirtual/AntreanVirtualTeaser";
import AntrianVirtualAccordion from "../components/antreanvirtual/AntreanVirtualAccordion";

function AntreanVirtual() {
  const ManajemenAntreanHeroProps = {
    welcomeText: "Solusi",
    title: "Antrean Virtual",
    subtitle:
      "Berikan fleksibilitas bagi pelanggan untuk menunggu dari mana saja dengan antrian online berbasis mobile.",
    imageUrl: AntreanVirtualHeroImage,
    textAlign: "text-center mx-auto",
    buttonJustify: "justify-center",
    button1Text: "Permintaan Demo",
    button1Link: "/demo",
    button2Text: "Konsultasi",
    button2Link: "/kontak",
  };

  return (
    <div className="bg-primary min-h-screen">
      <SEOMeta 
        title="Sistem Antrian Virtual | Exaque" 
        description="Kelola antrean, kurangi waktu tunggu, dan tingkatkan efisiensi layanan dengan sistem antrean virtual Qmatic." 
        url="https://exaque.com/antrian-virtual" 
        exactTitle={true} 
      />
      <Hero {...ManajemenAntreanHeroProps} />
      <div className="py-8 md:py-20 space-y-15 md:space-y-20">
      <AntrianVirtualTeaser />
      <AntrianVirtualAccordion />
      </div>
    </div>
  );
}

export default AntreanVirtual;
