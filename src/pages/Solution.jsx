import React from "react";
import SEOMeta from "../components/common/SEOMeta";

import Hero from "../components/common/Hero";
import SolusiHeroImage from "../assets/hero-solusi.webp";
import SolusiCard from "../components/solusi/SolusiCard";
import SolusiCTA from "../components/solusi/SolusiCTA";

function Solusi() {
  const MobileTicketHeroProps = {
    welcomeText: "Solusi-Solusi",
    title: "Solusi Exaque", 
    subtitle: "Perbaiki operasional, tingkatkan keuntungan, dan tingkatkan pengalaman pelanggan dengan solusi Exaque.",
    imageUrl: SolusiHeroImage,
    textAlign: "text-center mx-auto",
  };

  return (
    <div className="bg-primary min-h-screen">
      <SEOMeta
        title="Solusi Manajemen Antrean & Pengalaman Pelanggan"
        description="Perbaiki operasional, tingkatkan efisiensi, dan tingkatkan pengalaman pelanggan dengan solusi sistem manajemen antrean terintegrasi dari Exaque."
        url="https://exaque.com/solusi"
      />
      <Hero {...MobileTicketHeroProps} />
      <div className="py-8 md:py-20 space-y-15 md:space-y-20">
        <SolusiCard />
      </div>
      <SolusiCTA />
    </div>
  );
}

export default Solusi;