import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import LogoRed from "../assets/logo-red.webp";
import useApi from "../hooks/UseApi";

import ioHLogo from "../assets/Logo/Logo IOH-01.png";
import bcaFinanceLogo from "../assets/Logo/BCA_Finance.png";
import standardCharteredLogo from "../assets/Logo/Standard_Chartered_(2021).png";
import bankOfChinaLogo from "../assets/Logo/Bank_Of_China_logo.png";
import prudentialLogo from "../assets/Logo/Prudential_plc_logo.png";
import allianzLogo from "../assets/Logo/allianz-logo.svg";
import manulifeLogo from "../assets/Logo/manulife-logo.png";
import axaLogo from "../assets/Logo/AXA_Logo.png";

const clientLogos = [
  { name: "Indosat Ooredoo Hutchison", logo: ioHLogo },
  { name: "BCA Finance", logo: bcaFinanceLogo },
  { name: "Standard Chartered", logo: standardCharteredLogo },
  { name: "Bank of China", logo: bankOfChinaLogo },
  { name: "Prudential", logo: prudentialLogo },
  { name: "Allianz", logo: allianzLogo },
  { name: "Manulife", logo: manulifeLogo },
  { name: "AXA", logo: axaLogo, imgClass: "max-h-[34px]" },
];

const ExaqueManagedService = () => {
  const { request, loading } = useApi();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("waktu-tunggu");
  const [openFaqs, setOpenFaqs] = useState({});

  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    branchCount: "",
    challenge: "",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [utmParams, setUtmParams] = useState({});

  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const utms = {};
      ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((param) => {
        const val = searchParams.get(param);
        if (val) utms[param] = val;
      });
      setUtmParams(utms);
    } catch (e) {
      // ignore
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const trimmedFullName = formData.fullName.trim();
      const names = trimmedFullName ? trimmedFullName.split(/\s+/) : ["-"];
      const first_name = names[0] || "-";
      const last_name = names.length > 1 ? names.slice(1).join(" ") : names[0] || "-";

      let compiledMessage = "[Layanan]: Exaque Managed Service\n";
      compiledMessage += "[Notifikasi]: Kirim ke WID\n";
      if (formData.branchCount) {
        compiledMessage += `[Jumlah Cabang]: ${formData.branchCount}\n`;
      }
      if (formData.challenge) {
        compiledMessage += `[Tantangan Utama]: ${formData.challenge}\n`;
      }
      if (Object.keys(utmParams).length > 0) {
        compiledMessage += `[Parameter UTM]: ${Object.entries(utmParams).map(([k, v]) => `${k}=${v}`).join(", ")}\n`;
      }
      if (!formData.branchCount && !formData.challenge) {
        compiledMessage += "Permintaan Managed Service & Diskusi Exaque Managed Service.\n";
      }

      const payload = {
        first_name,
        last_name,
        email: formData.email.trim(),
        company: formData.company ? formData.company.trim() : "-",
        job_title: "Exaque Managed Service",
        user_persona: "Managed Service",
        service_needed: "Managed Service Request",
        message: compiledMessage,
      };

      const response = await request("/inquiries", "POST", payload);

      if (response) {
        // GA4 Event tracking untuk form terkirim
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "generate_lead", {
            event_category: "Engagement",
            event_label: "Jadwalkan Diskusi Managed Service",
            value: 1,
            currency: "IDR",
          });
        }

        setSuccessMsg(
          <>
            Terima kasih! Permintaan Managed Service &amp; diskusi Anda telah berhasil dikirim. Email konfirmasi telah kami kirimkan ke <em>inbox</em> Anda dan tim kami akan segera menghubungi Anda.
          </>
        );
        setFormData({
          fullName: "",
          company: "",
          email: "",
          branchCount: "",
          challenge: "",
        });
      }
    } catch (err) {
      setErrorMsg(
        err.message || "Terjadi kesalahan saat mengirim formulir. Silakan coba lagi."
      );
    }
  };

  const toggleFaq = (idx) => {
    setOpenFaqs((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Cara kerja", href: "#cara-kerja" },
    { label: "Cakupan layanan", href: "#cakupan-layanan" },
    { label: "Model biaya", href: "#model-biaya" },
    { label: "FAQ", href: "#faq" },
  ];

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
    }
  };

  const situationExamples = {
    "waktu-tunggu": {
      title: "Waktu tunggu meningkat saat jam istirahat.",
      desc: "Exaque menelaah pola kedatangan, durasi layanan, dan keaktifan konter; lalu memvalidasi temuan bersama PIC cabang.",
      followUp: "tinjau pengaturan waktu istirahat dan pantau perubahan waktu tunggu setelah penyesuaian.",
    },
    "no-show": {
      title: (
        <>
          Pola pembatalan tiket atau <em className="mr-1.5">no-show</em> meningkat pada jam sibuk.
        </>
      ),
      desc: "Exaque menganalisis selisih estimasi waktu tunggu vs durasi toleransi nasabah, pola panggilan loket, serta keterisian antrean.",
      followUp: "penyesuaian kuota pemanggilan, integrasi tiket digital, dan optimasi alur kedatangan cabang.",
    },
    "masalah-berulang": {
      title: "Deviasi SLA terjadi berulang pada hari dan konter spesifik.",
      desc: "Exaque menelusuri jenis transaksi dengan deviasi layanan tertinggi serta ketersediaan staf terlatih pada jam-jam puncak.",
      followUp: "jadwal rotasi petugas khusus dan pembagian antrean cepat untuk transaksi sederhana.",
    },
  };

  const faqItems = [
    {
      q: "Apa bedanya dengan membeli sistem antrean?",
      a: "Anda tidak membeli perangkat. Anda berlangganan hasil: layanan cabang yang berjalan, performa yang terukur setiap bulan, dan SLA tertulis.",
      plainAnswer: "Anda tidak membeli perangkat. Anda berlangganan hasil: layanan cabang yang berjalan, performa yang terukur setiap bulan, dan SLA tertulis.",
    },
    {
      q: "Apakah sistem yang sudah ada harus diganti?",
      a: (
        <>
          Tidak otomatis. <em>Assessment</em> menilai kompatibilitas, kondisi perangkat, lisensi, dan kebutuhan layanan sebelum merekomendasikan komponen yang dipertahankan atau diubah.
        </>
      ),
      plainAnswer: "Tidak otomatis. Assessment menilai kompatibilitas, kondisi perangkat, lisensi, dan kebutuhan layanan sebelum merekomendasikan komponen yang dipertahankan atau diubah.",
    },
    {
      q: "Apakah perangkat terhubung ke jaringan internal kami?",
      a: "Tidak. Perangkat Exaque beroperasi dengan arsitektur air-gapped menggunakan internet independen, 100% terpisah dari jaringan lokal dan perbankan klien. Tablet SecureBranch juga terkunci khusus (kiosk mode) dengan kamera dinonaktifkan.",
      plainAnswer: "Tidak. Perangkat Exaque beroperasi dengan arsitektur air-gapped menggunakan internet independen, 100% terpisah dari jaringan lokal dan perbankan klien. Tablet SecureBranch juga terkunci khusus (kiosk mode) dengan kamera dinonaktifkan.",
    },
    {
      q: "Apakah memakai AI?",
      a: "Saat ini analitik dan deteksi exception layanan cabang berjalan berbasis aturan (rule-based) yang transparan dan dapat diaudit. Analitik lanjutan dan pembelajaran mesin terarah ada dalam roadmap pengembangan kami.",
      plainAnswer: "Saat ini analitik dan deteksi exception layanan cabang berjalan berbasis aturan (rule-based) yang transparan dan dapat diaudit. Analitik lanjutan dan pembelajaran mesin terarah ada dalam roadmap pengembangan kami.",
    },
    {
      q: "Berapa biayanya?",
      a: (
        <>
          Biaya utama dihitung per cabang aktif per periode, ditambah biaya infrastruktur sesuai pemakaian dan biaya implementasi per fase. Nominalnya ditetapkan setelah <em>assessment</em>.
        </>
      ),
      plainAnswer: "Biaya utama dihitung per cabang aktif per periode, ditambah biaya infrastruktur sesuai pemakaian dan biaya implementasi per fase. Nominalnya ditetapkan setelah assessment.",
    },
    {
      q: "Bagaimana data nasabah dijaga?",
      a: "Lokasi data, hak akses, retensi, dan skema audit disepakati sebelum implementasi dan mengikuti standar institusi Anda. Perangkat Exaque berjalan di jaringan terpisah dari jaringan internal Anda.",
      plainAnswer: "Lokasi data, hak akses, retensi, dan skema audit disepakati sebelum implementasi dan mengikuti standar institusi Anda. Perangkat Exaque berjalan di jaringan terpisah dari jaringan internal Anda.",
    },
    {
      q: "Untuk institusi seperti apa layanan ini?",
      a: (
        <>
          Institusi dengan jaringan cabang di perbankan, <em>multifinance</em>, asuransi, dan telekomunikasi.
        </>
      ),
      plainAnswer: "Institusi dengan jaringan cabang di perbankan, multifinance, asuransi, dan telekomunikasi.",
    },
    {
      q: "Apakah Exaque memantau cabang setiap hari?",
      a: "Frekuensi pemantauan, jam layanan, indikator, serta waktu respons ditetapkan dalam paket dan kesepakatan layanan. Halaman ini tidak menjanjikan pemantauan 24/7 untuk seluruh cakupan.",
      plainAnswer: "Frekuensi pemantauan, jam layanan, indikator, serta waktu respons ditetapkan dalam paket dan kesepakatan layanan. Halaman ini tidak menjanjikan pemantauan 24/7 untuk seluruh cakupan.",
    },
    {
      q: "Apakah performa pelayanan cabang dijamin?",
      a: "Exaque berkomitmen pada SLA layanan yang disepakati. Hasil operasional cabang juga dipengaruhi staf, kebijakan, dan pelaksanaan tindakan oleh institusi. Indikatornya ditinjau bersama.",
      plainAnswer: "Exaque berkomitmen pada SLA layanan yang disepakati. Hasil operasional cabang juga dipengaruhi staf, kebijakan, dan pelaksanaan tindakan oleh institusi. Indikatornya ditinjau bersama.",
    },
    {
      q: "Apakah perangkat dan lisensi termasuk?",
      a: (
        <>
          Cakupannya mengikuti proposal. Perangkat, konektivitas, <em>hosting</em>, lisensi, dan pemeliharaan dirinci agar tidak ada asumsi bahwa semuanya otomatis termasuk dalam biaya langganan.
        </>
      ),
      plainAnswer: "Cakupannya mengikuti proposal. Perangkat, konektivitas, hosting, lisensi, dan pemeliharaan dirinci agar tidak ada asumsi bahwa semuanya otomatis termasuk dalam biaya langganan.",
    },
    {
      q: "Apa langkah pertama setelah diskusi awal?",
      a: (
        <>
          Kedua pihak menyepakati kebutuhan <em>assessment</em>, data awal, PIC, keluaran, serta biaya jika ada sebelum pekerjaan lanjutan dimulai.
        </>
      ),
      plainAnswer: "Kedua pihak menyepakati kebutuhan assessment, data awal, PIC, keluaran, serta biaya jika ada sebelum pekerjaan lanjutan dimulai.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Exaque Managed Service | Performa Cabang Terpantau</title>
        <meta
          name="description"
          content="Performa cabang terpantau. Masalah layanan ditindaklanjuti. Dukungan bagi kantor pusat untuk memantau layanan, menelusuri masalah, dan mengawal perbaikan."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Schema.org FAQPage JSON-LD untuk keterbacaan Google & mesin pencari */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map((item) => ({
              "@type": "Question",
              "name": item.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.plainAnswer || (typeof item.a === "string" ? item.a : ""),
              },
            })),
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white font-['Plus_Jakarta_Sans',sans-serif] text-[#19181A] antialiased selection:bg-[#A9023A] selection:text-white">
        {/* =========================================================
            NAVBAR (STICKY & RESPONSIVE)
            ========================================================= */}
        <header
          className={`sticky top-0 z-50 transition-all duration-200 bg-white ${
            scrolled ? "shadow-sm border-b border-[#EAE7E8]" : "border-b border-[#F0EDEE]"
          }`}
        >
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            {/* Logo Brand with red logo & subtitle */}
            <Link
              to="/"
              className="flex items-center gap-3 no-underline group focus:outline-none"
              aria-label="Exaque Managed Service"
            >
              <div className="flex flex-col">
                <img
                  src={LogoRed}
                  alt="Exaque"
                  className="h-6 sm:h-7 w-auto object-contain transition-transform duration-200 group-hover:opacity-95"
                />
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.24em] text-[#5A5558] uppercase mt-0.5">
                  <em>MANAGED SERVICE</em>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-10">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className="text-[14px] lg:text-[15px] font-medium text-[#2B2729] hover:text-[#A9023A] transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Right Action Button */}
            <div className="hidden md:flex items-center">
              <a
                href="#diskusi"
                onClick={(e) => handleSmoothScroll(e, "#diskusi")}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#A9023A] text-white text-[14px] font-semibold hover:bg-[#8D0130] transition-all shadow-xs active:scale-[0.98]"
              >
                <span>Diskusikan kebutuhan cabang</span>
                <span className="text-base leading-none">↗</span>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-gray-700 hover:text-black hover:bg-gray-100 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden border-b border-gray-200 bg-white px-4 pt-2 pb-6 space-y-3 shadow-lg animate-in fade-in duration-150">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className="block px-3 py-2.5 rounded-md text-base font-medium text-gray-800 hover:text-[#A9023A] hover:bg-gray-50"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2">
                <a
                  href="#diskusi"
                  onClick={(e) => handleSmoothScroll(e, "#diskusi")}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#A9023A] text-white text-sm font-semibold hover:bg-[#8D0130] transition shadow-xs"
                >
                  <span>Diskusikan kebutuhan cabang</span>
                  <span className="text-base leading-none">↗</span>
                </a>
              </div>
            </div>
          )}
        </header>

        {/* =========================================================
            SECTION 1: HERO SECTION
            ========================================================= */}
        <section className="pt-12 sm:pt-16 pb-16 lg:pt-20 lg:pb-24 overflow-hidden border-b border-[#F0EDEE]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* LEFT COLUMN: HEADLINE & COPY */}
              <div className="lg:col-span-6 xl:col-span-6">
                <div className="inline-block text-[#A9023A] text-[12px] sm:text-[13px] font-bold tracking-[0.16em] uppercase mb-4 sm:mb-5">
                  EXAQUE <em>MANAGED SERVICE</em>
                </div>

                <h1 className="text-[36px] sm:text-[46px] lg:text-[52px] xl:text-[56px] font-extrabold text-[#19181A] leading-[1.08] tracking-[-0.02em]">
                  Performa cabang <br className="hidden sm:inline" />
                  terpantau. <br />
                  <span className="text-[#A9023A]">
                    Masalah layanan <br className="hidden sm:inline" />
                    ditindaklanjuti.
                  </span>
                </h1>

                <p className="mt-6 text-[16px] sm:text-[17.5px] leading-[1.65] text-[#555053] max-w-[540px]">
                  Dukungan bagi kantor pusat untuk memantau layanan, menelusuri masalah, dan mengawal perbaikan bersama tim cabang.
                </p>

                <p className="mt-3.5 text-[16px] sm:text-[17.5px] leading-[1.65] text-[#555053] max-w-[540px]">
                  Exaque mengelola platform dan membantu analisis operasional, dengan cakupan layanan yang disepakati sejak awal.
                </p>

                {/* Call-to-action buttons */}
                <div className="mt-8 sm:mt-9 flex flex-wrap items-center gap-3.5">
                  <a
                    href="#diskusi"
                    onClick={(e) => handleSmoothScroll(e, "#diskusi")}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#A9023A] text-white font-semibold text-[15px] hover:bg-[#8D0130] transition shadow-xs active:scale-[0.98]"
                  >
                    <span>Diskusikan kebutuhan cabang</span>
                    <span className="text-base leading-none">↗</span>
                  </a>

                  <a
                    href="#tantangan"
                    onClick={(e) => handleSmoothScroll(e, "#tantangan")}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white border border-[#D8D4D6] text-[#19181A] font-semibold text-[15px] hover:bg-gray-50 hover:border-gray-400 transition active:scale-[0.98]"
                  >
                    <span>Lihat cara kerja</span>
                    <span className="text-sm leading-none">↓</span>
                  </a>
                </div>

                <p className="mt-7 sm:mt-8 text-[13px] sm:text-[13.5px] text-[#7A7578]">
                  Untuk jaringan cabang bank, <em>multifinance</em>, asuransi, dan <em>telco</em>.
                </p>
              </div>

              {/* RIGHT COLUMN: GRAPHIC MOCKUP CARD */}
              <div className="lg:col-span-6 xl:col-span-6">
                <div className="bg-[#EFEAEB] rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8">
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-[#E7E2E4] p-5 sm:p-7">
                    
                    {/* Card Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-[#F0ECEE]">
                      <span className="text-[13px] sm:text-[14px] font-bold text-[#19181A] tracking-tight">
                        EXAQUE / Performa Jaringan
                      </span>
                      <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] font-medium text-[#11766D]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#11766D]"></span>
                        <span>Ringkasan operasional</span>
                      </div>
                    </div>

                    {/* Metrics Row (3-Columns) */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 py-5 border-b border-[#F0ECEE]">
                      <div>
                        <span className="text-[11px] sm:text-[12px] text-[#706B6E] block font-medium">
                          Cabang terpantau
                        </span>
                        <span className="text-[26px] sm:text-[32px] font-extrabold text-[#19181A] mt-0.5 block leading-tight">
                          24
                        </span>
                      </div>
                      <div>
                        <span className="text-[11px] sm:text-[12px] text-[#706B6E] block font-medium">
                          Dalam target tunggu
                        </span>
                        <span className="text-[26px] sm:text-[32px] font-extrabold text-[#19181A] mt-0.5 block leading-tight">
                          91%
                        </span>
                      </div>
                      <div>
                        <span className="text-[11px] sm:text-[12px] text-[#706B6E] block font-medium">
                          Perlu perhatian
                        </span>
                        <span className="text-[26px] sm:text-[32px] font-extrabold text-[#A9023A] mt-0.5 block leading-tight">
                          3
                        </span>
                      </div>
                    </div>

                    {/* Progress Bars Section */}
                    <div className="pt-5">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[12px] sm:text-[13px] font-bold text-[#19181A]">
                          Waktu tunggu per cabang
                        </span>
                        <span className="text-[11px] sm:text-[12px] text-[#706B6E]">
                          Target ≤ 10 menit
                        </span>
                      </div>

                      <div className="space-y-3.5">
                        {/* Cabang A */}
                        <div className="flex items-center text-[12px] sm:text-[13px]">
                          <span className="w-20 sm:w-24 font-medium text-[#4D484B] shrink-0">
                            Cabang A
                          </span>
                          <div className="flex-1 bg-[#EEF0F2] h-2.5 rounded-full overflow-hidden mx-3">
                            <div className="bg-[#A9023A] h-full rounded-full" style={{ width: "85%" }}></div>
                          </div>
                          <span className="w-10 text-right font-bold text-[#19181A] shrink-0">
                            14 m
                          </span>
                        </div>

                        {/* Cabang B */}
                        <div className="flex items-center text-[12px] sm:text-[13px]">
                          <span className="w-20 sm:w-24 font-medium text-[#4D484B] shrink-0">
                            Cabang B
                          </span>
                          <div className="flex-1 bg-[#EEF0F2] h-2.5 rounded-full overflow-hidden mx-3">
                            <div className="bg-[#94A99F] h-full rounded-full" style={{ width: "52%" }}></div>
                          </div>
                          <span className="w-10 text-right font-semibold text-[#4D484B] shrink-0">
                            8 m
                          </span>
                        </div>

                        {/* Cabang C */}
                        <div className="flex items-center text-[12px] sm:text-[13px]">
                          <span className="w-20 sm:w-24 font-medium text-[#4D484B] shrink-0">
                            Cabang C
                          </span>
                          <div className="flex-1 bg-[#EEF0F2] h-2.5 rounded-full overflow-hidden mx-3">
                            <div className="bg-[#94A99F] h-full rounded-full" style={{ width: "38%" }}></div>
                          </div>
                          <span className="w-10 text-right font-semibold text-[#4D484B] shrink-0">
                            6 m
                          </span>
                        </div>
                      </div>

                      {/* Callout Notice Box */}
                      <div className="mt-6 bg-[#FCF4F6] rounded-xl p-4 sm:p-5 border-l-[3.5px] border-[#A9023A]">
                        <h4 className="text-[12px] sm:text-[13px] font-bold text-[#19181A]">
                          Cabang A · Penelusuran bersama PIC
                        </h4>
                        <p className="mt-1 text-[11px] sm:text-[12px] text-[#555053] leading-relaxed">
                          Waktu tunggu meningkat saat jam istirahat. Keaktifan konter dan pola kedatangan sedang ditinjau.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="inline-block bg-white border border-[#E3DCDE] text-[#4D484B] text-[10.5px] sm:text-[11px] font-medium px-2.5 py-1 rounded shadow-2xs">
                            PIC ditetapkan
                          </span>
                          <span className="inline-block bg-white border border-[#E3DCDE] text-[#4D484B] text-[10.5px] sm:text-[11px] font-medium px-2.5 py-1 rounded shadow-2xs">
                            Tindak lanjut berjalan
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-center text-[11px] sm:text-[12px] text-[#7A7578] mt-3.5">
                    Ilustrasi alur layanan dan data contoh, bukan data klien.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: 3-COLUMN FEATURE STRIP & TANTANGAN KANTOR PUSAT
            ========================================================= */}
        <section id="tantangan" className="scroll-mt-20 py-14 sm:py-20 bg-white">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Top 3-Column Highlights Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-14 border-b border-[#EAE6E8]">
              <div>
                <h3 className="text-[16px] sm:text-[17px] font-bold text-[#19181A] mb-1.5">
                  Platform dikelola
                </h3>
                <p className="text-[13.5px] sm:text-[14px] text-[#6A6568] leading-relaxed">
                  Dukungan teknis dan operasional sistem
                </p>
              </div>

              <div>
                <h3 className="text-[16px] sm:text-[17px] font-bold text-[#19181A] mb-1.5">
                  <em>Business support</em>
                </h3>
                <p className="text-[13.5px] sm:text-[14px] text-[#6A6568] leading-relaxed">
                  Analisis, rekomendasi, dan tindak lanjut
                </p>
              </div>

              <div>
                <h3 className="text-[16px] sm:text-[17px] font-bold text-[#19181A] mb-1.5">
                  Kendali tetap pada Anda
                </h3>
                <p className="text-[13.5px] sm:text-[14px] text-[#6A6568] leading-relaxed">
                  Keputusan operasional di tangan institusi
                </p>
              </div>
            </div>

            {/* Tantangan Kantor Pusat Content */}
            <div className="pt-14 sm:pt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-6 xl:col-span-6">
                <span className="text-[#A9023A] text-[12px] sm:text-[13px] font-bold tracking-[0.16em] uppercase block mb-4">
                  TANTANGAN KANTOR PUSAT
                </span>
                <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#19181A] leading-[1.12] tracking-[-0.02em]">
                  Data cabang tersedia. <br />
                  Siapa yang memastikan <br />
                  masalahnya ditangani?
                </h2>
                <p className="mt-6 text-[15px] sm:text-[16.5px] text-[#555053] leading-[1.65] max-w-[520px]">
                  Melihat angka adalah awal. Tantangan berikutnya adalah menemukan penyebab, berkoordinasi dengan cabang, dan memastikan tindak lanjutnya berjalan. Nasabah yang datang ke cabang adalah prospek paling matang, sehingga setiap <em>exception</em> yang terlewat adalah peluang yang terbuang.
                </p>
              </div>

              <div className="lg:col-span-6 xl:col-span-6">
                <div className="divide-y divide-[#EAE6E8] border-t lg:border-t-0 border-[#EAE6E8]">
                  <div className="py-6 sm:py-7 first:pt-0 sm:first:pt-0">
                    <div className="flex items-baseline gap-4 sm:gap-5">
                      <span className="text-[#A9023A] font-bold text-[15px] sm:text-[16px] shrink-0 font-mono">
                        01
                      </span>
                      <div>
                        <h3 className="text-[18px] sm:text-[19px] font-bold text-[#19181A] tracking-tight">
                          Masalah baru dibahas setelah keluhan masuk
                        </h3>
                        <p className="mt-2 text-[14px] sm:text-[14.5px] text-[#5A5558] leading-relaxed">
                          Penyimpangan waktu tunggu dan pola <em className="mr-1.5">no-show</em> belum selalu ditinjau secara konsisten.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="py-6 sm:py-7">
                    <div className="flex items-baseline gap-4 sm:gap-5">
                      <span className="text-[#A9023A] font-bold text-[15px] sm:text-[16px] shrink-0 font-mono">
                        02
                      </span>
                      <div>
                        <h3 className="text-[18px] sm:text-[19px] font-bold text-[#19181A] tracking-tight">
                          Tim pusat memiliki banyak prioritas
                        </h3>
                        <p className="mt-2 text-[14px] sm:text-[14.5px] text-[#5A5558] leading-relaxed">
                          Menelaah setiap cabang dan mengawal tindakan perbaikan membutuhkan waktu serta PIC yang jelas.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="py-6 sm:py-7">
                    <div className="flex items-baseline gap-4 sm:gap-5">
                      <span className="text-[#A9023A] font-bold text-[15px] sm:text-[16px] shrink-0 font-mono">
                        03
                      </span>
                      <div>
                        <h3 className="text-[18px] sm:text-[19px] font-bold text-[#19181A] tracking-tight">
                          Pemeliharaan menyita perhatian
                        </h3>
                        <p className="mt-2 text-[14px] sm:text-[14.5px] text-[#5A5558] leading-relaxed">
                          Kondisi platform, perangkat, dan dukungan teknis ikut menentukan kesinambungan layanan.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================
            SECTION 3: BUSINESS SUPPORT DALAM PRAKTIK (EXAQUE MAROON THEME)
            ========================================================= */}
        <section id="cara-kerja" className="scroll-mt-20 py-20 lg:py-24 bg-[#A9023A] text-white">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl">
              <span className="text-[#FFD1DE] text-[12px] sm:text-[13px] font-bold tracking-[0.16em] uppercase block mb-3.5">
                <em>BUSINESS SUPPORT</em> DALAM PRAKTIK
              </span>
              <h2 className="text-[34px] sm:text-[44px] lg:text-[48px] font-extrabold text-white leading-[1.12] tracking-[-0.02em]">
                Dari temuan di cabang <br className="hidden sm:inline" />
                ke tindak lanjut yang jelas.
              </h2>
              <p className="mt-5 text-[15px] sm:text-[16.5px] text-[#FCECEF]/90 leading-[1.65]">
                Exaque membantu menelaah data dan mengoordinasikan tindak lanjut bersama PIC Anda. Frekuensi pemantauan, indikator, serta alur eskalasi ditetapkan dalam kesepakatan layanan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 sm:gap-8 mt-14 sm:mt-16 pb-14 border-b border-white/20">
              <div>
                <span className="text-[#FFD1DE] text-[11px] sm:text-[12px] font-bold tracking-[0.14em] uppercase block mb-2.5 font-mono">
                  01 / PANTAU
                </span>
                <h3 className="text-[17px] sm:text-[18px] font-bold text-white mb-2">
                  Kenali penyimpangan
                </h3>
                <p className="text-[13.5px] sm:text-[14px] text-white/80 leading-relaxed">
                  Tinjau indikator cabang terhadap target dan pola operasional yang disepakati.
                </p>
              </div>

              <div>
                <span className="text-[#FFD1DE] text-[11px] sm:text-[12px] font-bold tracking-[0.14em] uppercase block mb-2.5 font-mono">
                  02 / TELUSURI
                </span>
                <h3 className="text-[17px] sm:text-[18px] font-bold text-white mb-2">
                  Konfirmasi penyebab
                </h3>
                <p className="text-[13.5px] sm:text-[14px] text-white/80 leading-relaxed">
                  Analisis pola data dan validasi kondisi aktual bersama PIC cabang.
                </p>
              </div>

              <div>
                <span className="text-[#FFD1DE] text-[11px] sm:text-[12px] font-bold tracking-[0.14em] uppercase block mb-2.5 font-mono">
                  03 / TINDAK LANJUT
                </span>
                <h3 className="text-[17px] sm:text-[18px] font-bold text-white mb-2">
                  Sepakati tindakan
                </h3>
                <p className="text-[13.5px] sm:text-[14px] text-white/80 leading-relaxed">
                  Susun rekomendasi, penanggung jawab, dan waktu tindak lanjut bersama tim Anda.
                </p>
              </div>

              <div>
                <span className="text-[#FFD1DE] text-[11px] sm:text-[12px] font-bold tracking-[0.14em] uppercase block mb-2.5 font-mono">
                  04 / TINJAU
                </span>
                <h3 className="text-[17px] sm:text-[18px] font-bold text-white mb-2">
                  Periksa perkembangan
                </h3>
                <p className="text-[13.5px] sm:text-[14px] text-white/80 leading-relaxed">
                  Catat status tindakan dan tinjau perubahan indikator pada periode berikutnya.
                </p>
              </div>
            </div>

            {/* Interactive Situation Showcase Card */}
            <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 text-[#19181A] shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
                <div className="md:col-span-4 space-y-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab("waktu-tunggu")}
                    className={`w-full text-left px-4 py-3 rounded-lg font-semibold text-[14px] transition-all flex items-center justify-between ${
                      activeTab === "waktu-tunggu"
                        ? "bg-[#A9023A] text-white shadow-xs"
                        : "bg-[#F7F4F5] text-[#3A3538] hover:bg-[#EFEAEB]"
                    }`}
                  >
                    <span>Waktu tunggu ↑</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("no-show")}
                    className={`w-full text-left px-4 py-3 rounded-lg font-semibold text-[14px] transition-all flex items-center justify-between ${
                      activeTab === "no-show"
                        ? "bg-[#A9023A] text-white shadow-xs"
                        : "bg-[#F7F4F5] text-[#3A3538] hover:bg-[#EFEAEB]"
                    }`}
                  >
                    <span><em>No-show</em> ↑</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("masalah-berulang")}
                    className={`w-full text-left px-4 py-3 rounded-lg font-semibold text-[14px] transition-all flex items-center justify-between ${
                      activeTab === "masalah-berulang"
                        ? "bg-[#A9023A] text-white shadow-xs"
                        : "bg-[#F7F4F5] text-[#3A3538] hover:bg-[#EFEAEB]"
                    }`}
                  >
                    <span>Masalah berulang</span>
                  </button>
                </div>

                <div className="md:col-span-8 pl-0 md:pl-2">
                  <span className="text-[#A9023A] text-[11px] sm:text-[12px] font-bold tracking-[0.14em] uppercase block mb-1">
                    CONTOH SITUASI · ILUSTRATIF
                  </span>
                  
                  <h3 className="text-[19px] sm:text-[21px] font-bold text-[#19181A] tracking-tight">
                    {situationExamples[activeTab].title}
                  </h3>

                  <p className="mt-2.5 text-[14px] sm:text-[15px] text-[#555053] leading-relaxed">
                    {situationExamples[activeTab].desc}
                  </p>

                  <p className="mt-5 text-[14px] sm:text-[14.5px] text-[#19181A] leading-relaxed">
                    <strong className="font-bold">Tindak lanjut bersama:</strong>{" "}
                    {situationExamples[activeTab].followUp}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================
            SECTION 4: SATU KERANGKA LAYANAN (3 FEATURE CARDS)
            ========================================================= */}
        <section id="cakupan-layanan" className="scroll-mt-20 py-20 lg:py-24 bg-[#FAF7F8] border-b border-[#EFEAEB]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-14 sm:mb-16">
              <div className="lg:col-span-7">
                <span className="text-[#A9023A] text-[12px] sm:text-[13px] font-bold tracking-[0.16em] uppercase block mb-3.5">
                  SATU KERANGKA LAYANAN
                </span>
                <h2 className="text-[32px] sm:text-[42px] lg:text-[46px] font-extrabold text-[#19181A] leading-[1.1] tracking-[-0.02em]">
                  Teknologi yang terjaga. <br />
                  Operasional yang mendapat <br />
                  perhatian.
                </h2>
              </div>

              <div className="lg:col-span-5 lg:text-left">
                <p className="text-[14px] sm:text-[15px] text-[#605B5E] leading-relaxed max-w-sm lg:ml-auto">
                  Komponen dipilih berdasarkan kondisi sistem, kebutuhan cabang, dan kebijakan institusi Anda.
                </p>
              </div>
            </div>

            {/* 3 Main White Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              
              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-7 sm:p-8 border border-[#EBE5E7] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#FCECEF] text-[#A9023A] flex items-center justify-center mb-6">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 10a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v4a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-4Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </div>

                  <h3 className="text-[20px] font-bold text-[#19181A] tracking-tight">
                    Platform &amp; <em>technical support</em>
                  </h3>

                  <p className="mt-2 text-[14px] text-[#5A5558] leading-relaxed">
                    Menjaga fondasi teknologi yang mendukung layanan cabang.
                  </p>

                  <ul className="mt-6 space-y-2.5 text-[13.5px] text-[#4A4547]">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#A9023A] font-bold leading-tight mt-0.5">•</span>
                      <span>Pengelolaan platform sesuai arsitektur</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#A9023A] font-bold leading-tight mt-0.5">•</span>
                      <span>Pemantauan teknis dan penanganan gangguan</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#A9023A] font-bold leading-tight mt-0.5">•</span>
                      <span>Pemeliharaan dan <em>backup</em> sesuai cakupan</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#A9023A] font-bold leading-tight mt-0.5">•</span>
                      <span>Respons dan eskalasi sesuai SLA</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl p-7 sm:p-8 border border-[#EBE5E7] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#FCECEF] text-[#A9023A] flex items-center justify-center mb-6">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>

                  <h3 className="text-[20px] font-bold text-[#19181A] tracking-tight">
                    <em>Business support</em>
                  </h3>

                  <p className="mt-2 text-[14px] text-[#5A5558] leading-relaxed">
                    Membantu kantor pusat memahami temuan dan menindaklanjutinya.
                  </p>

                  <ul className="mt-6 space-y-2.5 text-[13.5px] text-[#4A4547]">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#A9023A] font-bold leading-tight mt-0.5">•</span>
                      <span>Penelaahan indikator layanan cabang</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#A9023A] font-bold leading-tight mt-0.5">•</span>
                      <span>Penelusuran bersama PIC terkait</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#A9023A] font-bold leading-tight mt-0.5">•</span>
                      <span>Rekomendasi tindakan perbaikan</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#A9023A] font-bold leading-tight mt-0.5">•</span>
                      <span>Pencatatan dan peninjauan tindak lanjut</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl p-7 sm:p-8 border border-[#EBE5E7] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#FCECEF] text-[#A9023A] flex items-center justify-center mb-6">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>

                  <h3 className="text-[20px] font-bold text-[#19181A] tracking-tight">
                    Pelaporan &amp; <em>review</em>
                  </h3>

                  <p className="mt-2 text-[14px] text-[#5A5558] leading-relaxed">
                    Mengubah data operasional menjadi bahan keputusan manajemen.
                  </p>

                  <ul className="mt-6 space-y-2.5 text-[13.5px] text-[#4A4547]">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#A9023A] font-bold leading-tight mt-0.5">•</span>
                      <span>Ringkasan performa dan tren cabang</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#A9023A] font-bold leading-tight mt-0.5">•</span>
                      <span>Prioritas masalah yang perlu perhatian</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#A9023A] font-bold leading-tight mt-0.5">•</span>
                      <span>Status tindakan dan penanggung jawab</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#A9023A] font-bold leading-tight mt-0.5">•</span>
                      <span><em>Review</em> berkala sesuai kesepakatan</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>

            <p className="mt-10 text-[12.5px] sm:text-[13px] text-[#7A7578] text-center max-w-3xl mx-auto leading-relaxed">
              Platform pendukung dapat mencakup Qmatic Orchestra dan modul Pintar sesuai kebutuhan. Detail lisensi, integrasi, dan perangkat ditentukan melalui <em>assessment</em>.
            </p>
          </div>
        </section>

        {/* =========================================================
            SECTION 5: HASIL YANG BISA DIBAHAS (REPORT CARD & CHECKLIST)
            ========================================================= */}
        <section className="py-20 lg:py-24 bg-[#F8F5F6] border-b border-[#EAE6E8]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              
              {/* Left Column: Report Card Mockup */}
              <div className="lg:col-span-6 xl:col-span-6">
                <div className="bg-white rounded-xl shadow-lg border border-[#E7E2E4] border-t-4 border-t-[#A9023A] p-6 sm:p-8 max-w-[490px] mx-auto lg:mx-0">
                  <div className="text-[11px] sm:text-[11.5px] font-bold text-[#A9023A] tracking-[0.14em] uppercase">
                    EXAQUE / CONTOH HASIL LAYANAN
                  </div>
                  <h3 className="text-[22px] sm:text-[24px] font-extrabold text-[#19181A] mt-1.5 tracking-tight">
                    Ringkasan Performa Cabang
                  </h3>
                  <div className="text-[12px] text-[#7A7578] mt-0.5 mb-6">
                    Periode ilustratif · Data contoh
                  </div>

                  <div className="divide-y divide-[#F0ECEE] text-[13px] sm:text-[13.5px]">
                    <div className="py-3.5 flex items-center justify-between gap-4">
                      <span className="text-[#656063]">Prioritas perhatian</span>
                      <span className="font-bold text-[#19181A] text-right">Cabang A · Waktu tunggu</span>
                    </div>

                    <div className="py-3.5 flex items-center justify-between gap-4">
                      <span className="text-[#656063]">Temuan awal</span>
                      <span className="font-semibold text-[#19181A] text-right">Kenaikan pada pukul 12.00–13.00</span>
                    </div>

                    <div className="py-3.5 flex items-center justify-between gap-4">
                      <span className="text-[#656063]">Validasi</span>
                      <span className="font-semibold text-[#19181A] text-right">Tinjau pola kedatangan &amp; konter aktif</span>
                    </div>

                    <div className="py-3.5 flex items-center justify-between gap-4">
                      <span className="text-[#656063]">PIC tindak lanjut</span>
                      <span className="font-semibold text-[#19181A] text-right">Operasional cabang + Exaque</span>
                    </div>

                    <div className="py-3.5 flex items-center justify-between gap-4">
                      <span className="text-[#656063]">Status</span>
                      <span className="font-bold text-[#A9023A] text-right">Dalam penelusuran</span>
                    </div>
                  </div>

                  <div className="mt-6 bg-[#F8F5F6] rounded-lg p-4 text-[12px] sm:text-[12.5px] leading-relaxed">
                    <strong className="font-bold text-[#19181A] block mb-0.5">Agenda <em>review</em> berikutnya</strong>
                    <span className="text-[#555053]">
                      Konfirmasi penyebab dan sepakati tindakan sebelum membandingkan hasil pada periode berikutnya.
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Heading, Paragraph & Checklist */}
              <div className="lg:col-span-6 xl:col-span-6">
                <span className="text-[#A9023A] text-[12px] sm:text-[13px] font-bold tracking-[0.16em] uppercase block mb-3.5">
                  HASIL YANG BISA DIBAHAS
                </span>
                <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#19181A] leading-[1.12] tracking-[-0.02em]">
                  Laporan yang membantu <br />
                  menentukan tindakan.
                </h2>
                <p className="mt-5 text-[15px] sm:text-[16px] text-[#555053] leading-relaxed max-w-xl">
                  Kantor pusat mendapat konteks di balik angka: lokasi masalah, temuan yang perlu dikonfirmasi, dan perkembangan penanganannya.
                </p>

                <div className="mt-8 space-y-3.5 border-t border-[#EAE6E8] pt-4">
                  {[
                    "Cabang mana yang perlu diprioritaskan?",
                    "Apa yang sudah diketahui tentang penyebabnya?",
                    "Siapa yang menindaklanjuti, dan kapan?",
                    "Apa yang berubah setelah tindakan dilakukan?",
                  ].map((q, idx) => (
                    <div key={idx} className="flex items-center gap-3 py-2 border-b border-[#EAE6E8] text-[14.5px] sm:text-[15px] text-[#19181A]">
                      <span className="text-[#A9023A] font-bold text-base leading-none">✓</span>
                      <span className="font-medium">{q}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <a
                    href="#diskusi"
                    onClick={(e) => handleSmoothScroll(e, "#diskusi")}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white border border-[#D5D0D2] text-[#19181A] font-semibold text-[14px] sm:text-[15px] hover:bg-gray-50 hover:border-gray-400 transition"
                  >
                    <span>Bahas kebutuhan pelaporan</span>
                    <span className="text-base leading-none">↗</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION BUKTI KLIEN: IMPLEMENTASI & REKAM JEJAK
            ========================================================= */}
        <section className="py-16 sm:py-20 bg-white border-b border-[#EAE6E8]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#FAF7F8] rounded-2xl p-8 sm:p-10 lg:p-12 border border-[#EBE5E7] relative overflow-hidden">
              <div className="max-w-3xl">
                <span className="text-[#A9023A] text-[12px] sm:text-[13px] font-bold tracking-[0.16em] uppercase block mb-3">
                  BUKTI IMPLEMENTASI &amp; REKAM JEJAK
                </span>
                <blockquote className="text-[20px] sm:text-[24px] lg:text-[27px] font-extrabold text-[#19181A] leading-[1.3] tracking-tight">
                  “Mobile Ticket berjalan di seluruh jaringan gerai Indosat sejak 2023, tanpa insiden.”
                </blockquote>
                <p className="mt-3 text-[14px] sm:text-[15px] text-[#6A6568] leading-relaxed">
                  Menjaga kelancaran alur pelayanan pelanggan skala nasional dengan tingkat keandalan tinggi dan operasional yang stabil.
                </p>
              </div>

              {/* Baris Logo Klien Enterprise (Tanpa Angka Kinerja Klien) */}
              <div className="mt-10 pt-8 border-t border-[#EAE6E8]">
                <div className="text-[11px] sm:text-[12px] font-bold text-[#8A8588] uppercase tracking-[0.14em] mb-6">
                  Dipercaya oleh Jaringan Layanan &amp; Finansial Terkemuka di Indonesia:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 items-center">
                  {clientLogos.map((client, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-center p-3 bg-white rounded-lg border border-[#EAE6E8] h-16 shadow-2xs hover:shadow-xs hover:border-[#D5D0D2] transition"
                      title={client.name}
                    >
                      <img
                        src={client.logo}
                        alt={client.name}
                        className={`max-h-[30px] max-w-[90%] object-contain grayscale hover:grayscale-0 transition duration-200 ${
                          client.imgClass || ""
                        }`}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 6: TANGGUNG JAWAB YANG JELAS (2 COMPARISON CARDS)
            ========================================================= */}
        <section className="py-20 lg:py-24 bg-white border-b border-[#EAE6E8]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#A9023A] text-[12px] sm:text-[13px] font-bold tracking-[0.16em] uppercase block mb-3.5">
              TANGGUNG JAWAB YANG JELAS
            </span>
            <h2 className="text-[32px] sm:text-[42px] lg:text-[46px] font-extrabold text-[#19181A] leading-[1.12] tracking-[-0.02em]">
              Komitmen layanan Exaque. <br />
              Target performa cabang Anda.
            </h2>
            <p className="mt-4 text-[15px] sm:text-[16px] text-[#555053] leading-relaxed max-w-2xl">
              Keduanya diukur secara terpisah agar komitmen layanan dan peran setiap pihak mudah dipahami.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8 mt-12">
              {/* Card 1: SLA Layanan Exaque */}
              <div className="bg-white rounded-xl p-7 sm:p-9 border border-[#E7E2E4] shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[11.5px] font-bold text-[#A9023A] tracking-[0.14em] uppercase block mb-3">
                    SLA LAYANAN EXAQUE
                  </span>
                  <h3 className="text-[20px] sm:text-[22px] font-extrabold text-[#19181A] tracking-tight">
                    Apa yang menjadi komitmen kami
                  </h3>
                  <p className="mt-3 text-[14px] sm:text-[14.5px] text-[#555053] leading-relaxed">
                    Ketersediaan platform sesuai arsitektur, waktu respons dukungan, proses eskalasi, dan jadwal pelaporan.
                  </p>
                </div>
                <div className="mt-10 pt-4 border-t border-[#F0ECEE]">
                  <strong className="text-[13.5px] sm:text-[14px] font-bold text-[#19181A]">
                    Ditetapkan dalam perjanjian layanan.
                  </strong>
                </div>
              </div>

              {/* Card 2: Indikator Operasional Cabang */}
              <div className="bg-white rounded-xl p-7 sm:p-9 border border-[#E7E2E4] shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[11.5px] font-bold text-[#A9023A] tracking-[0.14em] uppercase block mb-3">
                    INDIKATOR OPERASIONAL CABANG
                  </span>
                  <h3 className="text-[20px] sm:text-[22px] font-extrabold text-[#19181A] tracking-tight">
                    Apa yang kita pantau bersama
                  </h3>
                  <p className="mt-3 text-[14px] sm:text-[14.5px] text-[#555053] leading-relaxed">
                    Waktu tunggu, durasi pelayanan, <em>no-show</em>, dan kepuasan pelanggan sesuai data serta modul yang digunakan.
                  </p>
                </div>
                <div className="mt-10 pt-4 border-t border-[#F0ECEE]">
                  <strong className="text-[13.5px] sm:text-[14px] font-bold text-[#19181A]">
                    Target dan tindakan disepakati dengan tim Anda.
                  </strong>
                </div>
              </div>
            </div>

            <p className="mt-8 text-[12.5px] sm:text-[13px] text-[#7A7578] leading-relaxed">
              Exaque membantu analisis dan koordinasi tindak lanjut. Keputusan penempatan staf, kebijakan layanan, dan pelaksanaan operasional tetap menjadi kewenangan institusi Anda.
            </p>
          </div>
        </section>

        {/* =========================================================
            SECTION 7: TRANSISI SESUAI KONDISI ANDA (4 STEP COLUMNS)
            ========================================================= */}
        <section className="py-20 lg:py-24 bg-white border-b border-[#EAE6E8]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#A9023A] text-[12px] sm:text-[13px] font-bold tracking-[0.16em] uppercase block mb-3.5">
              TRANSISI SESUAI KONDISI ANDA
            </span>
            <h2 className="text-[32px] sm:text-[42px] lg:text-[46px] font-extrabold text-[#19181A] leading-[1.12] tracking-[-0.02em]">
              Mulai dari kebutuhan. <br />
              Terapkan secara bertahap.
            </h2>
            <p className="mt-4 text-[15px] sm:text-[16px] text-[#555053] leading-relaxed max-w-2xl">
              Untuk sistem yang sudah berjalan maupun pengembangan baru, kami menilai apa yang dapat dipertahankan dan apa yang perlu disesuaikan.
            </p>

            {/* 4 Step Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14 sm:mt-16">
              <div className="border-t border-[#D5D0D2] pt-6">
                <span className="text-[#A9023A] font-bold text-[13px] font-mono block mb-2">
                  01
                </span>
                <h3 className="text-[18px] font-bold text-[#19181A] tracking-tight">
                  <em>Assessment</em>
                </h3>
                <p className="mt-2 text-[13.5px] text-[#555053] leading-relaxed">
                  Petakan sistem, kondisi perangkat, kendala operasional, dan indikator prioritas.
                </p>
              </div>

              <div className="border-t border-[#D5D0D2] pt-6">
                <span className="text-[#A9023A] font-bold text-[13px] font-mono block mb-2">
                  02
                </span>
                <h3 className="text-[18px] font-bold text-[#19181A] tracking-tight">
                  Rancangan layanan
                </h3>
                <p className="mt-2 text-[13.5px] text-[#555053] leading-relaxed">
                  Sepakati arsitektur, cakupan dukungan, SLA, peran PIC, dan proyeksi biaya.
                </p>
              </div>

              <div className="border-t border-[#D5D0D2] pt-6">
                <span className="text-[#A9023A] font-bold text-[13px] font-mono block mb-2">
                  03
                </span>
                <h3 className="text-[18px] font-bold text-[#19181A] tracking-tight">
                  <em>Pilot</em> terarah
                </h3>
                <p className="mt-2 text-[13.5px] text-[#555053] leading-relaxed">
                  Validasi kesiapan teknis dan operasional di cabang terpilih, jika diperlukan.
                </p>
              </div>

              <div className="border-t border-[#D5D0D2] pt-6">
                <span className="text-[#A9023A] font-bold text-[13px] font-mono block mb-2">
                  04
                </span>
                <h3 className="text-[18px] font-bold text-[#19181A] tracking-tight">
                  Penerapan &amp; <em>review</em>
                </h3>
                <p className="mt-2 text-[13.5px] text-[#555053] leading-relaxed">
                  Perluas sesuai hasil evaluasi, kesiapan cabang, dan siklus anggaran.
                </p>
              </div>
            </div>

            <p className="mt-10 text-[12.5px] sm:text-[13px] text-[#7A7578] leading-relaxed">
              Memakai perangkat lama? Risiko penggantian perangkat dan ketersediaan bahan habis pakai dapat menjadi bagian <em>assessment</em> kesinambungan layanan.
            </p>
          </div>
        </section>

        {/* =========================================================
            SECTION 8: MODEL BIAYA (TABLE / MATRIX)
            ========================================================= */}
        <section id="model-biaya" className="scroll-mt-20 py-20 lg:py-24 bg-[#A9023A] text-white">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[#FFD1DE] text-[12px] sm:text-[13px] font-bold tracking-[0.16em] uppercase block mb-3.5">
              MODEL BIAYA
            </span>
            <h2 className="text-[32px] sm:text-[42px] lg:text-[46px] font-extrabold text-white leading-[1.12] tracking-[-0.02em]">
              Cakupan jelas. <br />
              Anggaran lebih mudah direncanakan.
            </h2>
            <p className="mt-4 text-[15px] sm:text-[16px] text-[#FCECEF]/90 leading-relaxed max-w-2xl mb-12">
              Penawaran memisahkan layanan berulang, komponen pendukung, dan implementasi agar Anda dapat menilai kebutuhan setiap fase.
            </p>

            {/* Table Container */}
            <div className="bg-white rounded-xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-[#F5EFF2] border-b border-[#EBE3E7] text-[11px] sm:text-[12px] font-bold tracking-wider text-[#19181A] uppercase">
                      <th className="py-4 px-6 w-[28%] text-[#A9023A]">KOMPONEN</th>
                      <th className="py-4 px-6 w-[42%]">CAKUPAN YANG DIBAHAS</th>
                      <th className="py-4 px-6 w-[30%]">DASAR PENAWARAN</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0ECEE] text-[13.5px] sm:text-[14px]">
                    <tr>
                      <td className="py-5 px-6 font-bold text-[#19181A] align-top">
                        Layanan berulang
                      </td>
                      <td className="py-5 px-6 text-[#555053] align-top leading-relaxed">
                        Pengelolaan platform, <em>technical support</em>, <em>business support</em>, pelaporan, dan <em>review</em>.
                      </td>
                      <td className="py-5 px-6 text-[#555053] align-top leading-relaxed">
                        Jumlah cabang aktif serta ruang lingkup dan frekuensi layanan.
                      </td>
                    </tr>

                    <tr>
                      <td className="py-5 px-6 font-bold text-[#19181A] align-top">
                        Infrastruktur &amp; perangkat
                      </td>
                      <td className="py-5 px-6 text-[#555053] align-top leading-relaxed">
                        <em>Hosting</em>, tablet atau perangkat lain, konektivitas, lisensi, dan penggantian perangkat.
                      </td>
                      <td className="py-5 px-6 text-[#555053] align-top leading-relaxed">
                        Dirinci sesuai arsitektur; tidak diasumsikan seluruhnya termasuk langganan.
                      </td>
                    </tr>

                    <tr>
                      <td className="py-5 px-6 font-bold text-[#19181A] align-top">
                        Implementasi
                      </td>
                      <td className="py-5 px-6 text-[#555053] align-top leading-relaxed">
                        Konfigurasi, persiapan data, pelatihan, <em>pilot</em>, dan penerapan per fase.
                      </td>
                      <td className="py-5 px-6 text-[#555053] align-top leading-relaxed">
                        Ruang lingkup pekerjaan yang disepakati sebelum pelaksanaan.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="mt-6 text-[12.5px] sm:text-[13px] text-white/80 leading-relaxed">
              Estimasi biaya, asumsi pemakaian, serta komponen termasuk dan di luar cakupan dijelaskan dalam proposal. Tahapan penerapan menyesuaikan kebijakan anggaran institusi Anda.
            </p>
          </div>
        </section>

        {/* =========================================================
            SECTION 9: KEAMANAN & TATA KELOLA
            ========================================================= */}
        <section className="py-20 lg:py-24 bg-white border-b border-[#EAE6E8]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              
              <div className="lg:col-span-5 xl:col-span-5">
                <span className="text-[#A9023A] text-[12px] sm:text-[13px] font-bold tracking-[0.16em] uppercase block mb-3.5">
                  KEAMANAN &amp; TATA KELOLA
                </span>
                <h2 className="text-[32px] sm:text-[40px] font-extrabold text-[#19181A] leading-[1.12] tracking-[-0.02em]">
                  Disiapkan untuk <br />
                  evaluasi tim TI Anda.
                </h2>
                <p className="mt-4 text-[15px] sm:text-[16px] text-[#555053] leading-relaxed">
                  Kebutuhan keamanan dan kesesuaian solusi dibahas sebelum implementasi. Persetujuan tetap mengikuti proses internal institusi.
                </p>
              </div>

              <div className="lg:col-span-7 xl:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
                <div className="p-5 rounded-xl bg-[#FAF7F8] border border-[#EFEAEB]">
                  <h3 className="text-[16px] sm:text-[17px] font-bold text-[#19181A] mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#A9023A]"></span>
                    Arsitektur Air-Gapped &amp; Internet Independen
                  </h3>
                  <p className="text-[13.5px] sm:text-[14px] text-[#555053] leading-relaxed">
                    Perangkat berjalan di koneksi internet independen, <strong>100% terpisah dari jaringan lokal dan perbankan klien</strong>. Tanpa ketergantungan maupun akses ke intranet internal institusi.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#FAF7F8] border border-[#EFEAEB]">
                  <h3 className="text-[16px] sm:text-[17px] font-bold text-[#19181A] mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#A9023A]"></span>
                    Perangkat SecureBranch Terkunci
                  </h3>
                  <p className="text-[13.5px] sm:text-[14px] text-[#555053] leading-relaxed">
                    Tablet SecureBranch dikunci khusus (<em>kiosk mode</em>), <strong>kamera dinonaktifkan</strong>, dan hanya menjalankan satu aplikasi Exaque tanpa celah akses eksternal.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white border border-[#EAE6E8]">
                  <h3 className="text-[16px] sm:text-[17px] font-bold text-[#19181A] mb-2">
                    Akses &amp; Pengelolaan Data
                  </h3>
                  <p className="text-[13.5px] sm:text-[14px] text-[#555053] leading-relaxed">
                    Sepakati lokasi <em>hosting</em>, hak akses, kepemilikan, dan retensi data sesuai kebijakan tata kelola institusi Anda.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white border border-[#EAE6E8]">
                  <h3 className="text-[16px] sm:text-[17px] font-bold text-[#19181A] mb-2">
                    Kesinambungan &amp; Dokumen Evaluasi
                  </h3>
                  <p className="text-[13.5px] sm:text-[14px] text-[#555053] leading-relaxed">
                    Prosedur <em>backup</em>, eskalasi gangguan terdefinisi, serta kelengkapan dokumen teknis untuk penilaian vendor siap disediakan.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 10: PERTANYAAN UMUM (FAQ ACCORDION 2-GRID COL)
            ========================================================= */}
        <section id="faq" className="scroll-mt-20 py-20 lg:py-24 bg-white">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 sm:mb-12">
              <span className="text-[#A9023A] text-[13px] sm:text-[14px] font-bold block mb-2 sm:mb-3">
                Pertanyaan yang sering diajukan
              </span>
              <h2 className="text-[32px] sm:text-[44px] lg:text-[48px] font-extrabold text-[#19181A] leading-[1.12] tracking-[-0.02em]">
                Sebelum Anda <br className="hidden sm:inline" />
                menjadwalkan <em>assessment</em>.
              </h2>
            </div>

            {(() => {
              const midIndex = Math.ceil(faqItems.length / 2);
              const leftCol = faqItems.slice(0, midIndex);
              const rightCol = faqItems.slice(midIndex);

              const renderFaqItem = (faq, idx) => {
                const isOpen = !!openFaqs[idx];
                return (
                  <div key={idx} className="border-b border-[#EAE6E8]">
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full py-5 sm:py-6 flex items-start justify-between gap-4 sm:gap-6 text-left group focus:outline-none"
                    >
                      <span
                        className={`font-bold text-[15.5px] sm:text-[16.5px] leading-snug transition-colors ${
                          isOpen ? "text-[#A9023A]" : "text-[#19181A] group-hover:text-[#A9023A]"
                        }`}
                      >
                        {faq.q}
                      </span>
                      <svg
                        className={`w-5 h-5 shrink-0 text-[#A9023A] transition-transform duration-200 mt-0.5 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <div
                      id={`faq-ans-${idx}`}
                      className={`grid transition-all duration-200 ease-in-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden pr-4 sm:pr-6 text-[14px] sm:text-[14.5px] text-[#555053] leading-relaxed">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                );
              };

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-14 items-start">
                  <div className="border-t-2 border-[#19181A]">
                    {leftCol.map((faq, i) => renderFaqItem(faq, i))}
                  </div>
                  <div className="border-t-2 border-[#19181A] max-md:border-t-0">
                    {rightCol.map((faq, i) => renderFaqItem(faq, midIndex + i))}
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* =========================================================
            SECTION 11: CTA FORM (MULAI DARI CABANG ANDA)
            ========================================================= */}
        <section id="diskusi" className="scroll-mt-20 py-20 lg:py-24 bg-[#F8F5F6] border-t border-[#EAE6E8]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Heading, Description & Checklist */}
              <div className="lg:col-span-6 xl:col-span-6 pt-2">
                <span className="text-[#A9023A] text-[12px] sm:text-[13px] font-bold tracking-[0.16em] uppercase block mb-3.5">
                  MULAI DARI CABANG ANDA
                </span>
                <h2 className="text-[36px] sm:text-[44px] lg:text-[48px] font-extrabold text-[#19181A] leading-[1.12] tracking-[-0.02em]">
                  Cabang mana yang <br />
                  paling membutuhkan <br />
                  perhatian saat ini?
                </h2>
                
                <p className="mt-5 text-[15px] sm:text-[16px] text-[#555053] leading-relaxed max-w-xl">
                  Ceritakan tantangannya. Kita petakan kebutuhan awal dan tentukan apakah <em>assessment</em> lebih lanjut diperlukan.
                </p>

                <div className="mt-8 space-y-4 border-t border-[#EAE6E8] pt-4">
                  <div className="flex items-center gap-3 py-2 border-b border-[#EAE6E8] text-[14.5px] sm:text-[15px] text-[#19181A]">
                    <span className="text-[#A9023A] font-bold text-base leading-none">✓</span>
                    <span className="font-semibold text-[#19181A]">Bahas kondisi sistem dan kendala layanan</span>
                  </div>

                  <div className="flex items-center gap-3 py-2 border-b border-[#EAE6E8] text-[14.5px] sm:text-[15px] text-[#19181A]">
                    <span className="text-[#A9023A] font-bold text-base leading-none">✓</span>
                    <span className="font-semibold text-[#19181A]">Tentukan indikator serta cabang prioritas</span>
                  </div>

                  <div className="flex items-center gap-3 py-2 border-b border-[#EAE6E8] text-[14.5px] sm:text-[15px] text-[#19181A]">
                    <span className="text-[#A9023A] font-bold text-base leading-none">✓</span>
                    <span className="font-semibold text-[#19181A]">Sepakati langkah dan kebutuhan <em>assessment</em></span>
                  </div>
                </div>

                <p className="mt-8 text-[12.5px] sm:text-[13px] text-[#7A7578] leading-relaxed max-w-lg">
                  Belum perlu menyiapkan seluruh data cabang untuk diskusi awal. Cakupan, keluaran, dan biaya <em>assessment</em>—jika ada—disepakati sebelum pelaksanaan.
                </p>
              </div>

              {/* Right Column: White Card Form */}
              <div className="lg:col-span-6 xl:col-span-6">
                <div className="bg-white rounded-2xl shadow-xl border border-[#EAE6E8] p-6 sm:p-9">

                  {successMsg && (
                    <div className="mb-5 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13.5px] font-medium leading-relaxed">
                      {successMsg}
                    </div>
                  )}

                  {errorMsg && (
                    <div className="mb-5 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-[13.5px] font-medium leading-relaxed">
                      {errorMsg}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    {/* Row 1: Nama Lengkap & Perusahaan */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[13px] font-bold text-[#19181A] mb-1.5">
                          Nama lengkap
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          placeholder="Nama Anda"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5D0D2] text-[14px] text-[#19181A] placeholder-[#8F8A8D] focus:outline-none focus:border-[#A9023A] focus:ring-1 focus:ring-[#A9023A] transition"
                        />
                      </div>

                      <div>
                        <label className="block text-[13px] font-bold text-[#19181A] mb-1.5">
                          Perusahaan
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          required
                          placeholder="Nama institusi"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5D0D2] text-[14px] text-[#19181A] placeholder-[#8F8A8D] focus:outline-none focus:border-[#A9023A] focus:ring-1 focus:ring-[#A9023A] transition"
                        />
                      </div>
                    </div>

                    {/* Email Pekerjaan */}
                    <div>
                      <label className="block text-[13px] font-bold text-[#19181A] mb-1.5">
                        Email pekerjaan
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="nama@perusahaan.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5D0D2] text-[14px] text-[#19181A] placeholder-[#8F8A8D] focus:outline-none focus:border-[#A9023A] focus:ring-1 focus:ring-[#A9023A] transition"
                      />
                    </div>

                    {/* Jumlah Cabang (Opsional) */}
                    <div>
                      <label className="block text-[13px] font-bold text-[#19181A] mb-1.5">
                        Jumlah cabang (opsional)
                      </label>
                      <select
                        name="branchCount"
                        value={formData.branchCount}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5D0D2] text-[14px] text-[#19181A] bg-white focus:outline-none focus:border-[#A9023A] focus:ring-1 focus:ring-[#A9023A] transition"
                      >
                        <option value="">Pilih kisaran</option>
                        <option value="< 10 cabang">&lt; 10 cabang</option>
                        <option value="10 – 50 cabang">10 – 50 cabang</option>
                        <option value="51 – 100 cabang">51 – 100 cabang</option>
                        <option value="> 100 cabang">&gt; 100 cabang</option>
                      </select>
                    </div>

                    {/* Apa tantangan utamanya? (Opsional) */}
                    <div>
                      <label className="block text-[13px] font-bold text-[#19181A] mb-1.5">
                        Apa tantangan utamanya? (opsional)
                      </label>
                      <textarea
                        rows="3"
                        name="challenge"
                        value={formData.challenge}
                        onChange={handleChange}
                        placeholder="Contoh: waktu tunggu sulit dipantau atau perangkat perlu diperbarui."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5D0D2] text-[14px] text-[#19181A] placeholder-[#8F8A8D] focus:outline-none focus:border-[#A9023A] focus:ring-1 focus:ring-[#A9023A] transition resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 sm:py-4 rounded-lg bg-[#A9023A] text-white font-semibold text-[15px] hover:bg-[#8D0130] transition shadow-xs active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <span>{loading ? "Mengirim permintaan..." : "Jadwalkan diskusi Managed Service"}</span>
                        {!loading && <span className="text-base leading-none">↗</span>}
                      </button>
                    </div>

                    <p className="text-[11.5px] sm:text-[12px] text-[#7A7578] text-center mt-3">
                      Pada versi aktif, informasi digunakan untuk menindaklanjuti permintaan diskusi Anda.
                    </p>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default ExaqueManagedService;
