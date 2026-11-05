import React from "react";
import SEOMeta from "../components/common/SEOMeta";

import Hero from "../components/common/Hero";
import IntegrasiHeroImage from "../assets/hero-integrasi.webp";
import IntegrasiCard from "../components/integrasi/IntegrasiCard";


function integrasi() {
  const MobileTicketHeroProps = {
    welcomeText: "",
    title: "Integrasi",
    subtitle: (
      <p>
        Hubungkan alat favorit Anda dengan Exaque.
        <br />
        Di sini Anda akan menemukan beberapa contoh terpilih dari integrasi
        paling populer yang telah dibuat.
      </p>
    ),
    imageUrl: IntegrasiHeroImage,
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
        title="Integrasi Sistem Antrean"
        description="Hubungkan alat favorit Anda dengan Exaque. Solusi integrasi populer untuk mengoptimalkan alur kerja dan pengalaman pelanggan."
        url="https://exaque.com/integrasi"
      />
      <Hero {...MobileTicketHeroProps} />
      <div className="py-8 md:py-20 space-y-15 md:space-y-20">
      <IntegrasiCard />
      </div>
    </div>
  );
}

export default integrasi;
