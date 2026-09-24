import React from "react";
import SEOMeta from "../components/common/SEOMeta";

import Hero from "../components/common/Hero";
import ManajemenAntreanHeroImage from "../assets/hero-manajemen-perjalanan-pelanggan.webp";
import ManajemenPerjalananPelangganCTA from "../components/manajemenperjalananpelanggan/ManajemenPerjalananPelangganCTA";
import ManajemenPerjalananPelangganFeature from "../components/manajemenperjalananpelanggan/ManajemenPerjalananPelangganFeature";
import ManajemenPerjalananPelangganTeaser from "../components/manajemenperjalananpelanggan/ManajemenPerjalananPelangganTeaser";

function ManajemenPerjalananPelanggan() {
  const ManajemenAntreanHeroProps = {
    welcomeText: "Solusi",
    title: "Manajemen Perjalanan Pelanggan",
    subtitle:
      "Terapkan struktur pada operasional Anda dengan solusi manajemen antrian untuk perusahaan.",
    imageUrl: ManajemenAntreanHeroImage,
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
        title="Manajemen Perjalanan Pelanggan - Exaque" 
        description="Ciptakan pengalaman terbaik bagi pelanggan dan staf dari awal hingga akhir dengan solusi Customer Journey Management Qmatic." 
        url="https://exaque.com/manajemen-perjalanan-pelanggan" 
        exactTitle={true} 
      />
      <Hero {...ManajemenAntreanHeroProps} />
      <div className="py-8 md:py-20 space-y-15 md:space-y-20">
      <ManajemenPerjalananPelangganTeaser />
      <ManajemenPerjalananPelangganFeature />
      </div>
      <ManajemenPerjalananPelangganCTA />
    </div>
  );
}

export default ManajemenPerjalananPelanggan;
