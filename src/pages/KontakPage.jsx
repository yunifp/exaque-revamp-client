import React, { useEffect } from "react";
import SEOMeta from "../components/common/SEOMeta";
import { useLocation } from "react-router-dom";
import heroImage from "../assets/hero-kontak.png";
import Hero from "../components/common/Hero";
import ContactFormCTA from "../components/common/ContactFormCTA";

const KontakPage = () => {
  const location = useLocation();
  const initialTab = location.pathname === "/demo" ? "demo" : "sales";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const currentTab = initialTab === "demo" 
    ? { title: "Dapatkan Demo Produk" }
    : { title: "Berbicara Dengan Sales" };

  const heroProps = {
    welcomeText: "Mari Terhubung",
    title: <>{currentTab.title}</>,
    subtitle:
      "Punya pertanyaan tentang produk, harga, atau butuh bantuan teknis? Tim kami siap membantu Anda.",
    imageUrl: heroImage,
    textAlign: "text-center mx-auto",
    showButtons: false,
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEOMeta
        title="Kontak | Exaque"
        description="Hubungi Exaque untuk konsultasi solusi teknologi perusahaan Anda."
      />

      <Hero {...heroProps} />

      <ContactFormCTA initialTab={initialTab} />
    </div>
  );
};

export default KontakPage;
