import React from "react";
import SEOMeta from "../components/common/SEOMeta";

import Hero from "../components/common/Hero";
import productHeroImage from "../assets/hero-dukungan-perangkat-lunak.webp";
import DukunganPerangkatLunakTeaser from "../components/dukunganperangkatlunak/DukunganPerangkatLunakTeaser";
import DukunganPerangkatLunakStatsFeature from "../components/dukunganperangkatlunak/DukunganPerangkatLunakStatsFeature";
import DukunganPerangkatLunakCTA from "../components/dukunganperangkatlunak/DukunganPerangkatLunakCTA";

function DukunganPerangkatLunak() {
  const productHeroProps = {
    welcomeText: "Qmatic Orchestra",
    title: "Dukungan Perangkat Lunak",
    subtitle:
      "Pastikan sistem Anda berjalan lancar dengan dukungan teknis ahli terbaik kami.",
    imageUrl: productHeroImage,
    textAlign: "text-center mx-auto",
    showButtons: false,
  };

  return (
    <div className="bg-primary min-h-screen">
      <SEOMeta
        title="Dukungan Perangkat Lunak & Maintenance Sistem"
        description="Pastikan sistem manajemen antrean enterprise Anda berjalan lancar dengan tim dukungan teknis dan maintenance ahli dari Exaque."
        url="https://exaque.com/dukungan-perangkat-lunak"
      />
      <Hero {...productHeroProps} />
      <div className="py-8 md:py-20 space-y-15 md:space-y-20">
        <DukunganPerangkatLunakTeaser />
        <DukunganPerangkatLunakStatsFeature />
      </div>
      <DukunganPerangkatLunakCTA />
    </div>
  );
}

export default DukunganPerangkatLunak;
