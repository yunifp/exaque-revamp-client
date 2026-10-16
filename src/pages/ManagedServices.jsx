import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  { name: "AXA", logo: axaLogo, imgClass: "max-h-[38px]" },
];


const csatBranches = [
  {
    name: "Sudirman",
    isHighlighted: false,
    score: "4,7",
    days: Array(30).fill("gray"),
  },
  {
    name: "Kelapa Gading",
    isHighlighted: false,
    score: "4,4",
    days: [
      "pink", "pink", "pink", "gray", "pink", "pink", "gray", "pink", "pink", "gray",
      "pink", "pink", "pink", "pink", "pink", "gray", "pink", "pink", "pink", "gray",
      "pink", "gray", "pink", "gray", "gray", "pink", "gray", "pink", "pink", "gray",
    ],
  },
  {
    name: "Tangerang Kota",
    isHighlighted: false,
    score: "4,6",
    days: [
      "gray", "gray", "gray", "gray", "gray", "gray", "gray", "gray", "gray", "gray",
      "pink", "pink", "gray", "pink", "gray", "gray", "pink", "gray", "gray", "gray",
      "pink", "gray", "gray", "pink", "gray", "gray", "gray", "gray", "gray", "gray",
    ],
  },
  {
    name: "Bekasi Barat",
    isHighlighted: true,
    score: "4,4",
    days: [
      "pink", "pink", "gray", "pink", "pink", "pink", "gray", "pink", "gray", "pink",
      "pink", "pink", "gray", "pink", "pink", "gray", "pink", "pink", "pink", "gray",
      "pink", "pink", "gray", "pink", "pink", "pink", "red", "red", "red", "red",
    ],
  },
  {
    name: "Depok Margonda",
    isHighlighted: false,
    score: "4,6",
    days: [
      "gray", "gray", "gray", "gray", "gray", "gray", "gray", "pink", "gray", "gray",
      "gray", "gray", "gray", "gray", "gray", "gray", "gray", "gray", "pink", "gray",
      "gray", "gray", "gray", "gray", "gray", "pink", "gray", "gray", "pink", "gray",
    ],
  },
  {
    name: "Bogor Pajajaran",
    isHighlighted: false,
    score: "4,5",
    days: [
      "gray", "pink", "pink", "gray", "gray", "pink", "pink", "pink", "gray", "gray",
      "pink", "pink", "gray", "gray", "pink", "pink", "pink", "gray", "gray", "pink",
      "pink", "gray", "gray", "pink", "pink", "gray", "pink", "pink", "pink", "gray",
    ],
  },
];

const ManagedServices = () => {
  const { request, loading } = useApi();
  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    company: "",
    job_title: "",
    user_persona: "",
    message: "",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      const scrollToTarget = () => {
        const el = document.getElementById(targetId);
        if (el) {
          const navOffset = 70;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;
          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: "smooth",
          });
          return true;
        }
        return false;
      };

      if (!scrollToTarget()) {
        const timer1 = setTimeout(scrollToTarget, 100);
        const timer2 = setTimeout(scrollToTarget, 350);
        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      }
    }
  }, [location.hash, location.pathname]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const payload = {
        ...formData,
        last_name: "",
        service_needed: "Permintaan Assessment",
      };

      const response = await request("/inquiries", "POST", payload);

      if (response) {
        setSuccessMsg(
          "Terima kasih! Permintaan assessment Anda telah terkirim. Tim kami akan segera menghubungi Anda."
        );
        setFormData({
          first_name: "",
          email: "",
          company: "",
          job_title: "",
          user_persona: "",
          message: "",
        });
      }
    } catch (err) {
      setErrorMsg(
        err.message || "Terjadi kesalahan saat mengirim permintaan. Silakan coba lagi."
      );
    }
  };

  useEffect(() => {
    const board = document.getElementById('cells');
    if (!board) return;
    board.innerHTML = '';
    let bad = 0, warn = 0;
    for(let i=0; i<112; i++) {
      let r = Math.random();
      let s = '';
      if(r < 0.08) { 
        s = 'bg-[#FF3D75] after:content-[\'\'] after:absolute after:-inset-[3px] after:border-[1.5px] after:border-[#FF3D75] after:rounded-[5px] after:opacity-[0.55]'; 
        bad++; 
      } else if(r < 0.22) { 
        s = 'bg-[#C25E7E]'; 
        warn++; 
      } else {
        s = 'bg-[#4B4649]';
      }
      let d = (Math.random() * 0.8).toFixed(2);
      let c = document.createElement('div');
      c.className = 'aspect-square rounded-[3px] bg-[#3A3638] relative opacity-0 animate-[in_0.4s_ease_forwards] ' + s;
      c.style.animationDelay = d + 's';
      board.appendChild(c);
    }
    const badEl = document.getElementById('b-bad');
    if (badEl) badEl.innerText = bad + ' cabang';
  }, []);

  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://exaque.com/#organization",
        "name": "Exaque",
        "legalName": "PT Exaque Mandiri Makmur",
        "url": "https://exaque.com/"
      },
      {
        "@type": "WebPage",
        "@id": "https://exaque.com/exaque-managed-branch-performance#webpage",
        "url": "https://exaque.com/exaque-managed-branch-performance",
        "name": "Exaque Managed Branch Performance",
        "description": "Pantau performa dan kualitas layanan setiap cabang melalui data serta laporan berkala dengan exaque managed branch performance.",
        "inLanguage": "id-ID",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://exaque.com/#website",
          "url": "https://exaque.com/",
          "name": "Exaque",
          "publisher": {
            "@id": "https://exaque.com/#organization"
          }
        },
        "about": {
          "@id": "https://exaque.com/exaque-managed-branch-performance#service"
        }
      },
      {
        "@type": "Service",
        "@id": "https://exaque.com/exaque-managed-branch-performance#service",
        "name": "Exaque Managed Branch Performance",
        "serviceType": "Branch Performance Monitoring and Reporting",
        "url": "https://exaque.com/exaque-managed-branch-performance",
        "description": "Pantau performa dan kualitas layanan setiap cabang melalui data serta laporan berkala dengan exaque managed branch performance.",
        "provider": {
          "@id": "https://exaque.com/#organization"
        },
        "areaServed": {
          "@type": "Country",
          "name": "Indonesia"
        },
        "audience": {
          "@type": "BusinessAudience",
          "audienceType": "Perusahaan dan organisasi dengan jaringan cabang"
        },
        "mainEntityOfPage": {
          "@id": "https://exaque.com/exaque-managed-branch-performance#webpage"
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Exaque Managed Branch Performance</title>
        <meta
          name="description"
          content="Pantau performa dan kualitas layanan setiap cabang melalui data serta laporan berkala dengan exaque managed branch performance."
        />
        <link
          rel="canonical"
          href="https://exaque.com/exaque-managed-branch-performance"
        />
        <script type="application/ld+json">
          {JSON.stringify(schemaJson)}
        </script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..800&display=swap" rel="stylesheet" />
        <style>{`
          @keyframes in { to { opacity: 1; } }
        `}</style>
      </Helmet>
      
      <main className="font-['Archivo',system-ui,sans-serif] text-[17px] leading-[1.6] text-[#1C1A1B] bg-white" style={{ fontVariationSettings: '"wdth" 100' }}>
        
        {/* 2. HERO */}
        <section className="pt-[140px] pb-[88px] max-md:py-[72px]">
          <div className="max-w-[1180px] mx-auto px-6 max-sm:px-4 grid grid-cols-[1.05fr_0.95fr] gap-[56px] items-center max-lg:grid-cols-1 max-lg:gap-[44px]">
            <div>
              <div className="flex items-center gap-[12px] text-[#A9023A] font-semibold text-[0.85rem] tracking-[0.05em] mb-[14px]">
                <span className="w-[30px] h-[1.5px] bg-[#A9023A]"></span> 
                <span>Exaque Managed Branch Performance</span>
              </div>
              <h1 className="text-[clamp(2.3rem,5.2vw,4.1rem)] font-bold tracking-[-0.01em] leading-[1.08] mb-[24px]" style={{ fontVariationSettings: '"wdth" 122' }}>
                Cukup berlangganan, cabang <span className="text-[#A9023A]">terukur &amp; terkelola.</span>
              </h1>
              <p className="text-[1.18rem] text-[#4A4548] max-w-[60ch] mb-[34px]">
                Dengan Exaque <em>Managed Service</em>, anda bisa memantau performa dan kualitas layanan setiap cabang melalui data serta laporan berkala. Tanpa investasi perangkat yang rumit, tanpa kekhawatiran soal pemeliharaan, dan tetap dalam kendali Anda.
              </p>
              <div className="flex flex-wrap items-center gap-y-[22px] gap-x-[28px]">
                <a className="inline-flex items-center gap-[10px] bg-gradient-to-r from-[#CB3262] to-[#8C0028] shadow-[0_12px_24px_-8px_#CB3262] text-white no-underline font-semibold px-[28px] py-[16px] rounded-full hover:opacity-90 transition-opacity" style={{ fontVariationSettings: '"wdth" 108' }} href="#form-lead">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  Hubungi tim kami
                </a>
              </div>
              <div className="grid grid-cols-3 mt-[56px] border-t border-[#DEE1E3] max-sm:grid-cols-1">
                <div className="pt-[18px] pr-[20px] max-sm:border-t max-sm:border-[#DEE1E3] max-sm:mt-[14px] max-sm:pr-0">
                  <b className="block text-[1.25rem] mb-[4px]" style={{ fontVariationSettings: '"wdth" 118' }}>10 tahun</b>
                  <span className="text-[0.92rem] text-[#6F696C] leading-[1.45] block">Di jaringan cabang institusi teregulasi Indonesia</span>
                </div>
                <div className="pt-[18px] pr-[20px] pl-[20px] border-l border-[#DEE1E3] max-sm:border-l-0 max-sm:pl-0 max-sm:border-t max-sm:mt-[14px]">
                  <b className="block text-[1.25rem] mb-[4px]" style={{ fontVariationSettings: '"wdth" 118' }}>Per cabang aktif</b>
                  <span className="text-[0.92rem] text-[#6F696C] leading-[1.45] block">Biaya langganan dihitung untuk setiap cabang yang beroperasi, sehingga anggaran jaringan mudah diproyeksikan</span>
                </div>
                <div className="pt-[18px] pr-[20px] pl-[20px] border-l border-[#DEE1E3] max-sm:border-l-0 max-sm:pl-0 max-sm:border-t max-sm:mt-[14px]">
                  <b className="block text-[1.25rem] mb-[4px]" style={{ fontVariationSettings: '"wdth" 118' }}>SLA tertulis</b>
                  <span className="text-[0.92rem] text-[#6F696C] leading-[1.45] block">Ketersediaan layanan dan waktu respons, dilaporkan setiap bulan</span>
                </div>
              </div>
            </div>

            <figure className="bg-[#1C1A1B] text-white rounded-[14px] px-[26px] pt-[26px] pb-[22px] m-0" aria-label="Ilustrasi papan performa jaringan cabang dengan data contoh">
              <div className="flex justify-between items-baseline gap-[12px] mb-[6px]">
                <h3 className="text-[1rem] font-bold text-white tracking-[-0.01em] leading-[1.25]">Jaringan cabang, hari ini</h3>
                <span className="text-[0.8rem] text-[#B9B3B6]">112 cabang</span>
              </div>
              <p className="text-[1.5rem] leading-[1.2] font-bold my-[14px] mb-[20px]" style={{ fontVariationSettings: '"wdth" 116' }}>
                <em id="b-bad" className="not-italic text-[#A9023A]">9 cabang</em> melewati target waktu tunggu. Kantor pusat tahu sekarang, bukan dari komplain bulan depan.
              </p>
              <div className="grid grid-cols-[repeat(16,1fr)] gap-[5px]" id="cells" role="img" aria-label="Grid status SLA per cabang"></div>
              <div className="flex flex-wrap gap-y-[8px] gap-x-[18px] mt-[18px] text-[0.8rem] text-[#C9C3C6]">
                <span><i className="inline-block w-[10px] h-[10px] rounded-[2px] mr-[7px] align-[-1px] bg-[#4B4649]"></i>Dalam target</span>
                <span><i className="inline-block w-[10px] h-[10px] rounded-[2px] mr-[7px] align-[-1px] bg-[#C25E7E]"></i>Mendekati batas</span>
                <span><i className="inline-block w-[10px] h-[10px] rounded-[2px] mr-[7px] align-[-1px] bg-[#FF3D75]"></i>Melewati target</span>
              </div>
              <figcaption className="mt-[14px] text-[0.75rem] text-[#8F898C]">Ilustrasi dengan data contoh, bukan data klien.</figcaption>
            </figure>
          </div>
        </section>

        {/* 3. BUKTI KLIEN */}
        <div className="py-[44px] border-y border-[#DEE1E3]">
          <div className="max-w-[1180px] mx-auto px-6 max-sm:px-4">
            <p className="text-[0.95rem] text-[#6F696C] text-center mb-[18px]">Jaringan cabang yang sudah bekerja sama dengan Exaque</p>
            <div className="grid grid-cols-8 gap-[16px] max-lg:grid-cols-4 max-sm:grid-cols-2">
              {clientLogos.map((client) => (
                <div
                  key={client.name}
                  className="flex items-center justify-center min-h-[58px] h-[58px] p-[10px] bg-white border border-solid border-[#DEE1E3] rounded-[6px] hover:border-[#CB3262]/50 hover:shadow-xs transition-all duration-200"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    title={client.name}
                    className={`max-h-[32px] max-w-[85%] w-auto object-contain ${client.imgClass || ""}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. MASALAH */}
        <section className="py-[104px] max-md:py-[72px]">
          <div className="max-w-[1180px] mx-auto px-6 max-sm:px-4 grid grid-cols-[5fr_7fr] gap-[64px] max-md:grid-cols-1 max-md:gap-[36px]">
            <div>
              <span className="block text-[#A9023A] font-semibold text-[0.95rem] mb-[14px]">Titik buta jaringan cabang</span>
              <h2 className="text-[clamp(1.75rem,3.4vw,2.6rem)] max-w-[22ch] font-bold tracking-[-0.01em] leading-[1.08]" style={{ fontVariationSettings: '"wdth" 122' }}>Kantor pusat menetapkan standar layanan. Cabang yang menjalankannya. Di antara keduanya, hampir tidak ada data.</h2>
              <p className="text-[1.18rem] text-[#4A4548] max-w-[60ch] mt-[22px]">Ketika satu cabang melampaui target waktu tunggu, kantor pusat biasanya baru tahu dari komplain nasabah atau laporan manual yang datang sebulan kemudian. Saat itu, masalahnya sudah menjadi pengalaman nasabah.</p>
            </div>
            <div>
              <ul className="list-none m-0 p-0">
                <li className="grid grid-cols-[28px_1fr] gap-[16px] py-[26px] border-t border-[#DEE1E3]">
                  <svg className="mt-[3px]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A9023A" strokeWidth="2" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" strokeDasharray="3 3"/></svg>
                  <div><h3 className="text-[1.15rem] leading-[1.25] font-bold tracking-[-0.01em] mb-[6px]" style={{ fontVariationSettings: '"wdth" 112' }}>Standar tanpa ukuran</h3><p className="text-[#4A4548]"><em>SLA</em> layanan ditetapkan di kantor pusat, tetapi tidak terukur per cabang, per jam sibuk, atau per jenis transaksi.</p></div>
                </li>
                <li className="grid grid-cols-[28px_1fr] gap-[16px] py-[26px] border-t border-[#DEE1E3]">
                  <svg className="mt-[3px]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A9023A" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
                  <div><h3 className="text-[1.15rem] leading-[1.25] font-bold tracking-[-0.01em] mb-[6px]" style={{ fontVariationSettings: '"wdth" 112' }}>Masalah layanan terlambat terdeteksi</h3><p className="text-[#4A4548]">Kualitas layanan menurun, proses pelayanan terhambat, dan kebutuhan nasabah terlewat. Masalah sering kali baru diketahui setelah nasabah menyampaikan keluhan.</p></div>
                </li>
                <li className="grid grid-cols-[28px_1fr] gap-[16px] py-[26px] border-y border-[#DEE1E3]">
                  <svg className="mt-[3px]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A9023A" strokeWidth="2" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="1"/><path d="M8 20h8M12 16v4"/></svg>
                  <div><h3 className="text-[1.15rem] leading-[1.25] font-bold tracking-[-0.01em] mb-[6px]" style={{ fontVariationSettings: '"wdth" 112' }}>Sistem yang harus dirawat sendiri</h3><p className="text-[#4A4548]">Tim TI menanggung perangkat, pembaruan (<em>update</em>), dan gangguan di puluhan lokasi, padahal itu bukan pekerjaan inti mereka.</p></div>
                </li>
              </ul>
              <p className="mt-[30px] text-[1.12rem] font-semibold max-w-[52ch]"><em>Managed Branch Performance</em> memindahkan ketiganya ke satu penyedia, dengan satu laporan dan satu <em>SLA</em>.</p>
            </div>
          </div>
        </section>

        {/* 5. CARA KERJA */}
        <section className="bg-[#EEF0F2] py-[104px] max-md:py-[72px]" id="cara-kerja">
          <div className="max-w-[1180px] mx-auto px-6 max-sm:px-4">
            <span className="block text-[#A9023A] font-semibold text-[0.95rem] mb-[14px]">Cara kerja</span>
            <h2 className="text-[clamp(1.75rem,3.4vw,2.6rem)] max-w-[22ch] font-bold tracking-[-0.01em] leading-[1.08]" style={{ fontVariationSettings: '"wdth" 122' }}>Kami kelola operasinya. Anda pegang kendalinya.</h2>
            <div className="mt-[48px] border-t-[2px] border-[#1C1A1B]" role="table" aria-label="Pembagian peran">
              <div className="grid grid-cols-[1.1fr_1.6fr_1fr] gap-[24px] py-[12px] border-b border-[#DEE1E3] items-start text-[0.85rem] text-[#6F696C] font-semibold max-md:hidden" role="row"><span role="columnheader">Lapisan</span><span role="columnheader">Cakupan</span><span role="columnheader">Peran</span></div>
              <div className="grid grid-cols-[1.1fr_1.6fr_1fr] gap-[24px] py-[24px] border-b border-[#DEE1E3] items-start max-md:grid-cols-1 max-md:gap-[8px]" role="row">
                <h3 className="text-[1.08rem] leading-[1.25] font-bold tracking-[-0.01em]" style={{ fontVariationSettings: '"wdth" 112' }} role="cell">Infrastruktur &amp; platform</h3>
                <p className="text-[#4A4548]" role="cell"><em>Hosting, monitoring, backup</em>, pembaruan, dukungan teknis</p>
                <span className="justify-self-start text-[0.85rem] font-semibold px-[11px] py-[5px] rounded-[6px] leading-[1.3] bg-[#A9023A] text-white" role="cell">Dikelola Exaque</span>
              </div>
              <div className="grid grid-cols-[1.1fr_1.6fr_1fr] gap-[24px] py-[24px] border-b border-[#DEE1E3] items-start max-md:grid-cols-1 max-md:gap-[8px]" role="row">
                <h3 className="text-[1.08rem] leading-[1.25] font-bold tracking-[-0.01em]" style={{ fontVariationSettings: '"wdth" 112' }} role="cell">Konfigurasi layanan</h3>
                <p className="text-[#4A4548]" role="cell">Jenis transaksi, alur layanan, target <em>SLA</em> per cabang</p>
                <span className="justify-self-start text-[0.85rem] font-semibold px-[11px] py-[5px] rounded-[6px] leading-[1.3] border-[1.5px] border-[#A9023A] text-[#A9023A]" role="cell">Disepakati bersama</span>
              </div>
              <div className="grid grid-cols-[1.1fr_1.6fr_1fr] gap-[24px] py-[24px] border-b border-[#DEE1E3] items-start max-md:grid-cols-1 max-md:gap-[8px]" role="row">
                <h3 className="text-[1.08rem] leading-[1.25] font-bold tracking-[-0.01em]" style={{ fontVariationSettings: '"wdth" 112' }} role="cell">Kedatangan &amp; pemanggilan</h3>
                <p className="text-[#4A4548]" role="cell">Registrasi kedatangan, <em>check-in</em>, pemanggilan di loket</p>
                <span className="justify-self-start text-[0.85rem] font-semibold px-[11px] py-[5px] rounded-[6px] leading-[1.3] bg-[#1C1A1B] text-white" role="cell">Dijalankan petugas Anda</span>
              </div>
              <div className="grid grid-cols-[1.1fr_1.6fr_1fr] gap-[24px] py-[24px] border-b border-[#DEE1E3] items-start max-md:grid-cols-1 max-md:gap-[8px]" role="row">
                <h3 className="text-[1.08rem] leading-[1.25] font-bold tracking-[-0.01em]" style={{ fontVariationSettings: '"wdth" 112' }} role="cell">Kecerdasan operasional</h3>
                <p className="text-[#4A4548]" role="cell">Performa per cabang, laporan bulanan, rekomendasi</p>
                <span className="justify-self-start text-[0.85rem] font-semibold px-[11px] py-[5px] rounded-[6px] leading-[1.3] bg-[#A9023A] text-white" role="cell">Disajikan Exaque, keputusan di tangan Anda</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* 5b. MASALAH YANG KAMI SELESAIKAN */}
        <section className="bg-white py-[104px] max-md:py-[72px] border-b border-[#DEE1E3]" id="masalah-terselesaikan">
          <div className="max-w-[1180px] mx-auto px-6 max-sm:px-4">
            <span className="block text-[#A9023A] font-semibold text-[0.95rem] mb-[14px]">
              Masalah yang kami selesaikan
            </span>
            <h2
              className="text-[clamp(1.75rem,3.4vw,2.6rem)] max-w-[24ch] font-bold tracking-[-0.01em] leading-[1.08]"
              style={{ fontVariationSettings: '"wdth" 122' }}
            >
              Empat masalah jaringan cabang. Satu layanan, satu laporan.
            </h2>
            <p className="text-[1.18rem] text-[#4A4548] max-w-[62ch] mt-[22px] mb-[48px]">
              Setiap masalah di bawah ditangani dalam langganan yang sama, diukur dengan SLA yang sama, dan dilaporkan dalam Laporan Performa Cabang yang sama.
            </p>
            <div className="grid grid-cols-4 gap-[24px] max-lg:grid-cols-2 max-sm:grid-cols-1">
              {[
                {
                  id: "performa-jaringan-cabang",
                  title: "Performa Jaringan Cabang",
                  desc: "Waktu tunggu dan SLA per cabang",
                },
                {
                  id: "kepuasan-nasabah-terukur",
                  title: "Kepuasan Nasabah Terukur",
                  desc: "CSAT harian per cabang",
                },
                {
                  id: "layanan-nasabah-prioritas",
                  title: "Layanan Nasabah Prioritas",
                  desc: "Sambutan tanpa melanggar kebijakan TI",
                },
                {
                  id: "standardisasi-layanan-lintas-cabang",
                  title: "Standardisasi Layanan Lintas Cabang",
                  desc: "Pasca-merger dan rebranding",
                },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    window.history.pushState(null, "", `#${item.id}`);
                    const el = document.getElementById(item.id);
                    if (el) {
                      const navOffset = 70;
                      const elementPosition = el.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
                      window.scrollTo({
                        top: Math.max(0, offsetPosition),
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="block bg-white border border-[#DEE1E3] border-t-[3px] border-t-[#A9023A] rounded-[8px] p-[24px] pb-[28px] hover:shadow-md transition-shadow duration-200 cursor-pointer"
                >
                  <h3
                    className="text-[1.12rem] font-bold text-[#1C1A1B] leading-[1.25] mb-[8px]"
                    style={{ fontVariationSettings: '"wdth" 116' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[0.92rem] text-[#6F696C] leading-[1.45] m-0">
                    {item.desc}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 5c. PERFORMA JARINGAN CABANG */}
        <section className="bg-white py-[104px] max-md:py-[72px] border-b border-[#DEE1E3] scroll-mt-20" id="performa-jaringan-cabang">
          <div className="max-w-[1180px] mx-auto px-6 max-sm:px-4 grid grid-cols-[5fr_7fr] gap-[64px] items-start max-lg:grid-cols-1 max-lg:gap-[40px]">
            <div>
              <span className="block text-[#A9023A] font-semibold text-[0.95rem] mb-[14px]">
                Performa Jaringan Cabang
              </span>
              <h2
                className="text-[clamp(1.75rem,3.4vw,2.6rem)] max-w-[20ch] font-bold tracking-[-0.01em] leading-[1.08]"
                style={{ fontVariationSettings: '"wdth" 122' }}
              >
                Waktu tunggu dan SLA setiap cabang, terpantau dari kantor pusat.
              </h2>
              <p className="text-[1.12rem] text-[#4A4548] leading-[1.6] mt-[22px] max-w-[56ch]">
                Setiap kunjungan nasabah tercatat, dari kedatangan sampai selesai dilayani. Kantor pusat melihat cabang mana yang melewati target hari ini, dan setiap bulan menerima Laporan Performa Cabang yang bisa langsung dibawa ke rapat manajemen.
              </p>

              <ul className="list-none p-0 mt-[28px] border-b border-[#DEE1E3]">
                {[
                  "Waktu tunggu dan waktu layanan per cabang, per jenis transaksi, dan per jam sibuk",
                  "Pemenuhan SLA layanan terhadap target yang disepakati",
                  "Cabang dengan deviasi terbesar beserta penyebab yang teridentifikasi",
                  "Ketersediaan sistem dan waktu respons gangguan terhadap SLA Exaque",
                ].map((text, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-[12px] py-[12px] border-t border-[#DEE1E3] text-[#4A4548] text-[0.98rem] leading-[1.45]"
                  >
                    <svg
                      className="w-[18px] h-[18px] text-[#A9023A] shrink-0 mt-[3px]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-[18px] text-[0.95rem] text-[#6F696C]">
                Ditambah tinjauan triwulanan bersama tim Anda untuk membahas tren dan rekomendasi.
              </p>

              <div className="mt-[28px]">
                <div className="flex items-center gap-[8px] text-[0.88rem] text-[#6F696C] mb-[16px] flex-wrap">
                  <span>Ditenagai</span>
                  <span className="font-bold text-[#1C1A1B]">Pintar Panel · Pintar Counter</span>
                </div>
                <a
                  href="#form-lead"
                  className="inline-block font-bold text-[#1C1A1B] text-[1.1rem] underline underline-offset-4 decoration-2 hover:text-[#A9023A] transition-colors"
                  style={{ fontVariationSettings: '"wdth" 116' }}
                >
                  Jadwalkan Assessment Cabang
                </a>
              </div>
            </div>

            <div>
              <article
                className="bg-white border border-[#DEE1E3] rounded-[4px] shadow-[0_30px_60px_-30px_rgba(28,26,27,0.25)] p-[34px] pb-[28px] max-sm:p-[22px_16px]"
                aria-label="Contoh Laporan Performa Cabang, data ilustrasi"
              >
                <div className="flex justify-between items-start gap-[16px] pb-[18px] border-b-[2px] border-[#1C1A1B]">
                  <div>
                    <span className="block text-[#A9023A] font-extrabold text-[1rem] tracking-wider mb-[4px]">
                      EXAQUE
                    </span>
                    <h3 className="text-[1.25rem] leading-[1.25] font-bold tracking-[-0.01em] text-[#1C1A1B]">
                      Laporan Performa Cabang
                    </h3>
                    <div className="text-[#6F696C] text-[0.82rem] mt-[2px]">
                      Periode September 2026 · Regional Jabodetabek
                    </div>
                  </div>
                  <span className="text-[0.75rem] font-semibold text-[#A9023A] bg-[#FCE4EC] px-[10px] py-[4px] rounded-[4px] whitespace-nowrap">
                    Contoh · data ilustrasi
                  </span>
                </div>

                <div className="grid grid-cols-3 my-[20px] mb-[24px]">
                  <div className="pr-[14px]">
                    <b
                      className="block text-[1.6rem] leading-[1.1] text-[#1C1A1B] max-sm:text-[1.25rem]"
                      style={{ fontVariationSettings: '"wdth" 118' }}
                    >
                      93,8%
                    </b>
                    <span className="text-[0.78rem] text-[#6F696C] block leading-[1.35] mt-[4px]">
                      Transaksi dalam target SLA
                    </span>
                  </div>
                  <div className="pr-[14px] pl-[14px] border-l border-[#DEE1E3]">
                    <b
                      className="block text-[1.6rem] leading-[1.1] text-[#1C1A1B] max-sm:text-[1.25rem]"
                      style={{ fontVariationSettings: '"wdth" 118' }}
                    >
                      07:42
                    </b>
                    <span className="text-[0.78rem] text-[#6F696C] block leading-[1.35] mt-[4px]">
                      Rata-rata waktu tunggu (mnt:dtk)
                    </span>
                  </div>
                  <div className="pr-[14px] pl-[14px] border-l border-[#DEE1E3]">
                    <b
                      className="block text-[1.6rem] leading-[1.1] text-[#1C1A1B] max-sm:text-[1.25rem]"
                      style={{ fontVariationSettings: '"wdth" 118' }}
                    >
                      4,6 / 5
                    </b>
                    <span className="text-[0.78rem] text-[#6F696C] block leading-[1.35] mt-[4px]">
                      CSAT rata-rata
                    </span>
                  </div>
                </div>

                <div className="text-[0.85rem]" role="table" aria-label="Waktu tunggu per cabang terhadap target 10 menit">
                  <div
                    className="grid grid-cols-[130px_1fr_54px_50px] gap-[12px] items-center py-[8px] max-sm:grid-cols-[92px_1fr_44px_40px] max-sm:gap-[8px] text-[0.72rem] text-[#6F696C] font-semibold"
                    role="row"
                  >
                    <span>Cabang</span>
                    <span>Waktu tunggu vs target 10 menit</span>
                    <span className="text-right font-tabular-nums">Menit</span>
                    <span className="text-right font-tabular-nums">CSAT</span>
                  </div>
                  {[
                    { name: "Kelapa Gading", fill: 70, over: true, min: "14,0", csat: "4,1" },
                    { name: "Bekasi Barat", fill: 58, over: true, min: "11,6", csat: "4,3" },
                    { name: "Tangerang Kota", fill: 44, over: false, min: "8,8", csat: "4,6" },
                    { name: "Depok Margonda", fill: 36, over: false, min: "7,2", csat: "4,7" },
                    { name: "Sudirman", fill: 27, over: false, min: "5,4", csat: "4,8" },
                  ].map((row, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[130px_1fr_54px_50px] gap-[12px] items-center py-[8px] border-t border-[#EEF0F2] max-sm:grid-cols-[92px_1fr_44px_40px] max-sm:gap-[8px]"
                      role="row"
                    >
                      <span className="text-[#1C1A1B] font-medium">{row.name}</span>
                      <span className="relative h-[10px] bg-[#EEF0F2] rounded-[2px]">
                        <span
                          className={`absolute left-0 top-0 bottom-0 rounded-[2px] ${row.over ? "bg-[#A9023A]" : "bg-[#C9CED3]"}`}
                          style={{ width: `${row.fill}%` }}
                        ></span>
                        <span
                          className="absolute top-[-4px] bottom-[-4px] w-[2px] bg-[#1C1A1B]"
                          style={{ left: "50%" }}
                        ></span>
                      </span>
                      <span
                        className={`text-right font-tabular-nums ${row.over ? "text-[#A9023A] font-bold" : "text-[#1C1A1B]"}`}
                      >
                        {row.min}
                      </span>
                      <span className="text-right font-tabular-nums text-[#1C1A1B]">{row.csat}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-[18px] text-[0.78rem] text-[#6F696C] flex justify-between gap-[12px] flex-wrap">
                  <span>Penyebab teridentifikasi di Kelapa Gading: 2 dari 5 loket tidak aktif pukul 11.00–13.00.</span>
                  <span>Hal. 3 dari 12</span>
                </div>

                <div className="flex items-center gap-[8px] mt-[16px] pt-[14px] border-t border-[#EEF0F2] text-[0.78rem] text-[#6F696C]">
                  <span>Data diolah oleh</span>
                  <span className="font-semibold text-[#1C1A1B]">Exaque</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 5d. KEPUASAN NASABAH TERUKUR */}
        <section
          className="bg-[#EEF0F2] py-[104px] max-md:py-[72px] border-b border-[#DEE1E3] scroll-mt-20"
          id="kepuasan-nasabah-terukur"
        >
          <div className="max-w-[1180px] mx-auto px-6 max-sm:px-4 grid grid-cols-[7fr_5fr] gap-[64px] items-start max-lg:grid-cols-1 max-lg:gap-[48px]">
            {/* Left: Pintar Insight Card */}
            <div>
              <article
                className="bg-white border border-[#DEE1E3] rounded-[10px] shadow-[0_20px_40px_-20px_rgba(28,26,27,0.12)] p-[28px] max-sm:p-[20px]"
                aria-label="Pintar Insight - CSAT harian per cabang, data contoh"
              >
                <div className="flex justify-between items-center gap-[16px] pb-[18px] border-b border-[#EEF0F2]">
                  <div className="flex items-center gap-[12px]">
                    <span className="font-bold text-[#1C1A1B] text-[1.05rem] tracking-tight">
                      Pintar Insight
                    </span>
                  </div>
                  <span className="text-[0.72rem] font-medium text-[#6F696C] bg-[#F4F5F7] border border-[#DEE1E3] px-[9px] py-[3px] rounded-[4px] whitespace-nowrap">
                    Ilustrasi · data contoh
                  </span>
                </div>

                <div className="flex justify-between items-center py-[14px] text-[0.78rem] font-semibold text-[#6F696C]">
                  <span>CSAT harian, 30 hari terakhir</span>
                  <span>Rerata</span>
                </div>

                <div className="space-y-[12px] max-sm:space-y-[10px]">
                  {csatBranches.map((branch, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-[12px] max-sm:gap-[8px]"
                    >
                      <span
                        className={`w-[130px] max-sm:w-[96px] shrink-0 text-[0.88rem] max-sm:text-[0.82rem] truncate ${
                          branch.isHighlighted
                            ? "text-[#A9023A] font-bold"
                            : "text-[#1C1A1B] font-medium"
                        }`}
                      >
                        {branch.name}
                      </span>
                      <div className="flex items-center gap-[3px] sm:gap-[3.5px] flex-1 justify-center overflow-hidden">
                        {branch.days.map((color, dIdx) => (
                          <span
                            key={dIdx}
                            className={`w-[4px] sm:w-[5px] h-[14px] sm:h-[16px] rounded-[2px] shrink-0 ${
                              color === "red"
                                ? "bg-[#A9023A]"
                                : color === "pink"
                                ? "bg-[#F48FB1]"
                                : "bg-[#CFD4DC]"
                            }`}
                          />
                        ))}
                      </div>
                      <span
                        className={`w-[32px] text-right text-[0.88rem] max-sm:text-[0.82rem] font-tabular-nums shrink-0 ${
                          branch.isHighlighted
                            ? "text-[#A9023A] font-bold"
                            : "text-[#1C1A1B] font-semibold"
                        }`}
                      >
                        {branch.score}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-[16px] flex-wrap mt-[22px] pt-[14px] border-t border-[#EEF0F2] text-[0.78rem] text-[#6F696C]">
                  <div className="flex items-center gap-[6px]">
                    <span className="w-[8px] h-[8px] rounded-[2px] bg-[#CFD4DC] shrink-0"></span>
                    <span>4,5 ke atas</span>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <span className="w-[8px] h-[8px] rounded-[2px] bg-[#F48FB1] shrink-0"></span>
                    <span>4,0–4,4</span>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <span className="w-[8px] h-[8px] rounded-[2px] bg-[#A9023A] shrink-0"></span>
                    <span>Di bawah 4,0</span>
                  </div>
                </div>

                <div className="mt-[16px] bg-[#FCE4EC] rounded-[6px] p-[12px_16px]">
                  <p className="text-[0.82rem] leading-[1.45] text-[#A9023A] font-medium m-0">
                    <strong className="font-bold">Bekasi Barat</strong> di bawah 4,0 selama 4 hari berturut-turut. Ditandai sebelum menjadi komplain.
                  </p>
                </div>
              </article>
            </div>

            {/* Right: Copy & Checklist */}
            <div>
              <span className="block text-[#A9023A] font-semibold text-[0.95rem] mb-[14px]">
                Kepuasan Nasabah Terukur
              </span>
              <h2
                className="text-[clamp(1.75rem,3.4vw,2.6rem)] max-w-[20ch] font-bold tracking-[-0.01em] leading-[1.08] text-[#1C1A1B]"
                style={{ fontVariationSettings: '"wdth" 122' }}
              >
                CSAT harian per cabang, bukan survei setahun sekali.
              </h2>
              <p className="text-[1.12rem] text-[#4A4548] leading-[1.6] mt-[22px] max-w-[56ch]">
                Survei kepuasan berkala mahal, datang terlambat, dan hanya mencakup sebagian cabang. Nasabah menilai layanan langsung setelah dilayani, sehingga setiap cabang punya angka kepuasan harian yang bisa dibandingkan dan ditindaklanjuti.
              </p>

              <ul className="list-none p-0 mt-[28px] border-b border-[#DEE1E3]">
                {[
                  "Penilaian langsung setelah layanan, di setiap cabang",
                  "CSAT per cabang, per loket, dan per jenis transaksi",
                  "Cabang dengan penurunan CSAT ditandai sebelum menjadi komplain",
                  "Masuk ke Laporan Performa Cabang bulanan",
                ].map((text, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-[12px] py-[14px] border-t border-[#DEE1E3] text-[#1C1A1B] text-[1.02rem] leading-[1.5]"
                  >
                    <svg
                      className="w-[18px] h-[18px] text-[#A9023A] shrink-0 mt-[3px]"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="4 11 8 15 16 6" />
                    </svg>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-[28px]">
                <div className="flex items-center gap-[8px] text-[0.88rem] text-[#6F696C] mb-[16px]">
                  <span>Ditenagai</span>
                  <span className="font-bold text-[#1C1A1B]">Pintar Insight</span>
                </div>
                <a
                  href="#form-lead"
                  className="inline-block font-bold text-[#1C1A1B] text-[1.1rem] underline underline-offset-4 decoration-2 hover:text-[#A9023A] transition-colors"
                >
                  Jadwalkan Assessment Cabang
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 6. LAYANAN NASABAH PRIORITAS (Disesuaikan dari Yang Anda terima) */}
        <section className="py-[104px] max-md:py-[72px] scroll-mt-20 relative" id="layanan-nasabah-prioritas">
          <div id="nasabah-prioritas" className="absolute -top-20" />
          <div className="max-w-[1180px] mx-auto px-6 max-sm:px-4 grid grid-cols-[5fr_7fr] gap-[64px] items-start max-lg:grid-cols-1 max-lg:gap-[40px]">
            <div>
              <span className="block text-[#A9023A] font-semibold text-[0.95rem] mb-[14px]">
                Layanan Nasabah Prioritas
              </span>
              <h2
                className="text-[clamp(1.75rem,3.4vw,2.6rem)] max-w-[20ch] font-bold tracking-[-0.01em] leading-[1.08]"
                style={{ fontVariationSettings: '"wdth" 122' }}
              >
                Petugas tahu nasabah prioritas tiba, sebelum ia sampai di loket.
              </h2>
              <p className="text-[1.12rem] text-[#4A4548] leading-[1.6] mt-[22px] max-w-[56ch]">
                SecureBranch memberi tahu petugas saat nasabah prioritas tiba, sehingga sambutan bisa disiapkan.
              </p>
              <p className="text-[1.12rem] text-[#4A4548] leading-[1.6] mt-[16px] max-w-[56ch]">
                Yang biasanya menghambat solusi seperti ini adalah kebijakan TI. SecureBranch berjalan di tablet yang dikunci dan di jaringan yang terpisah penuh dari jaringan internal Anda.
              </p>
              
              <ul className="list-none p-0 mt-[28px] border-b border-[#DEE1E3]">
                {[
                  "Notifikasi kedatangan ke petugas yang ditunjuk",
                  "Tablet hanya menjalankan aplikasi Exaque, dengan kamera dinonaktifkan",
                  "Router dan konektivitas disuplai Exaque, terpisah dari jaringan internal",
                  "Waktu sambut nasabah prioritas tercatat dalam Laporan Performa Cabang",
                ].map((text, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-[12px] py-[12px] border-t border-[#DEE1E3] text-[#4A4548] text-[0.98rem] leading-[1.45]"
                  >
                    <svg
                      className="w-[18px] h-[18px] text-[#A9023A] shrink-0 mt-[3px]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-[28px]">
                <div className="flex items-center gap-[8px] text-[0.88rem] text-[#6F696C] mb-[16px]">
                  <span>Ditenagai</span>
                  <span className="font-bold text-[#1C1A1B]">SecureBranch</span>
                </div>
                <a
                  href="#form-lead"
                  className="inline-block font-bold text-[#1C1A1B] text-[1.1rem] underline underline-offset-4 decoration-2 hover:text-[#A9023A] transition-colors"
                  style={{ fontVariationSettings: '"wdth" 116' }}
                >
                  Jadwalkan Assessment Cabang
                </a>
              </div>
            </div>

            <div>
              {/* Card 1: Tablet notification feed */}
              <article
                className="bg-white border border-[#DEE1E3] rounded-[10px] shadow-[0_20px_40px_-20px_rgba(28,26,27,0.12)] overflow-hidden"
                aria-label="SecureBranch notifikasi kedatangan nasabah prioritas"
              >
                {/* Header bar */}
                <div className="flex justify-between items-center px-[22px] py-[16px] border-b border-[#DEE1E3] bg-white">
                  <div className="flex items-center gap-[12px]">
                    <span
                      className="font-bold text-[0.95rem] text-[#1C1A1B]"
                      style={{ fontVariationSettings: '"wdth" 112' }}
                    >
                      SecureBranch
                    </span>
                  </div>
                  <span className="text-[0.78rem] text-[#6F696C] font-medium bg-[#F8F9FA] border border-[#DEE1E3] px-[12px] py-[4px] rounded-[6px]">
                    Cabang Sudirman
                  </span>
                </div>

                {/* Notification List */}
                <div>
                  {/* Row 1: Active alert */}
                  <div className="flex items-start justify-between px-[22px] py-[16px] bg-[#FFF5F7] border-b border-[#FCE4EC]">
                    <div className="flex items-start gap-[12px]">
                      <span className="w-[8px] h-[8px] rounded-full bg-[#A9023A] mt-[6px] shrink-0"></span>
                      <div>
                        <h4 className="font-bold text-[0.95rem] text-[#1C1A1B] leading-[1.3] m-0">
                          Nasabah prioritas tiba
                        </h4>
                        <p className="text-[0.82rem] text-[#6F696C] mt-[2px] m-0">
                          Kode P-031 · Ruang tunggu prioritas
                        </p>
                      </div>
                    </div>
                    <span className="text-[0.85rem] text-[#6F696C] font-mono shrink-0 ml-[12px]">
                      10.42
                    </span>
                  </div>

                  {/* Row 2: Past alert */}
                  <div className="flex items-start justify-between px-[22px] py-[16px] bg-white border-b border-[#EEF0F2]">
                    <div className="flex items-start gap-[12px]">
                      <span className="w-[8px] h-[8px] rounded-full bg-[#B0B7C0] mt-[6px] shrink-0"></span>
                      <div>
                        <h4 className="font-bold text-[0.95rem] text-[#1C1A1B] leading-[1.3] m-0">
                          Nasabah prioritas tiba
                        </h4>
                        <p className="text-[0.82rem] text-[#6F696C] mt-[2px] m-0">
                          Kode P-027 · Disambut 10.19
                        </p>
                      </div>
                    </div>
                    <span className="text-[0.85rem] text-[#6F696C] font-mono shrink-0 ml-[12px]">
                      10.17
                    </span>
                  </div>

                  {/* Row 3: Past alert */}
                  <div className="flex items-start justify-between px-[22px] py-[16px] bg-white">
                    <div className="flex items-start gap-[12px]">
                      <span className="w-[8px] h-[8px] rounded-full bg-[#B0B7C0] mt-[6px] shrink-0"></span>
                      <div>
                        <h4 className="font-bold text-[0.95rem] text-[#1C1A1B] leading-[1.3] m-0">
                          Nasabah prioritas tiba
                        </h4>
                        <p className="text-[0.82rem] text-[#6F696C] mt-[2px] m-0">
                          Kode P-022 · Disambut 09.51
                        </p>
                      </div>
                    </div>
                    <span className="text-[0.85rem] text-[#6F696C] font-mono shrink-0 ml-[12px]">
                      09.48
                    </span>
                  </div>
                </div>
              </article>

              {/* Card 2: Network isolation architecture */}
              <div className="mt-[18px] bg-white border border-[#DEE1E3] rounded-[8px] p-[18px_24px] grid grid-cols-[1fr_auto_1fr] items-center gap-[20px] max-sm:grid-cols-1 max-sm:gap-[14px]">
                <div>
                  <h4 className="font-bold text-[0.95rem] text-[#1C1A1B] m-0">
                    Jaringan internal bank
                  </h4>
                  <p className="text-[0.82rem] text-[#6F696C] mt-[2px] m-0">
                    Sistem inti, data nasabah
                  </p>
                </div>
                <div className="px-[16px] py-[4px] border-x border-dashed border-[#A9023A] flex flex-col items-center justify-center text-center max-sm:border-x-0 max-sm:border-y max-sm:py-[8px]">
                  <span className="text-[0.72rem] font-bold text-[#A9023A] uppercase tracking-wider leading-[1.15] text-center whitespace-nowrap">
                    Terpisah<br className="max-sm:hidden" /> penuh
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-[0.95rem] text-[#1C1A1B] m-0">
                    Jaringan SecureBranch
                  </h4>
                  <p className="text-[0.82rem] text-[#6F696C] mt-[2px] m-0">
                    Router dan tablet dari Exaque
                  </p>
                </div>
              </div>

              <figcaption className="mt-[14px] text-[0.75rem] text-[#8F898C]">
                Ilustrasi dengan data contoh. Nasabah ditampilkan dengan kode, bukan nama.
              </figcaption>
            </div>
          </div>
        </section>

        {/* 6b. STANDARDISASI LAYANAN LINTAS CABANG */}
        <section
          className="bg-[#EEF0F2] py-[104px] max-md:py-[72px] border-b border-[#DEE1E3] scroll-mt-20 relative"
          id="standardisasi-layanan-lintas-cabang"
        >
          <div id="standardisasi-layanan" className="absolute -top-20" />
          <div className="max-w-[1180px] mx-auto px-6 max-sm:px-4 grid grid-cols-[7fr_5fr] gap-[64px] items-start max-lg:grid-cols-1 max-lg:gap-[48px]">
            {/* Left: Comparison Card + Case Study Box */}
            <div>
              {/* Card 1: Visual comparison Sebelum vs Sesudah */}
              <article
                className="bg-white border border-[#DEE1E3] rounded-[10px] shadow-[0_20px_40px_-20px_rgba(28,26,27,0.12)] p-[28px] max-sm:p-[20px]"
                aria-label="Visualisasi standardisasi gerai sebelum dan sesudah"
              >
                {/* Sebelum */}
                <div className="grid grid-cols-[80px_1fr] max-sm:grid-cols-1 gap-[16px] items-center pb-[24px] border-b border-[#EEF0F2]">
                  <span className="text-[0.85rem] text-[#6F696C] font-semibold">Sebelum</span>
                  <div>
                    <div className="flex items-center gap-[8px] sm:gap-[10px] justify-between sm:justify-start flex-wrap">
                      {/* Kiosk 1 */}
                      <div className="w-[42px] sm:w-[46px] h-[58px] sm:h-[62px] bg-white border border-[#8C939E] rounded-[3px] flex flex-col items-center overflow-hidden shrink-0">
                        <div className="h-[16px] w-full bg-[#79818C]"></div>
                        <div className="flex-1 flex items-center justify-center w-full">
                          <div className="w-[24px] h-[20px] bg-[#CFD4DC] rounded-[2px]"></div>
                        </div>
                      </div>
                      {/* Kiosk 2 */}
                      <div className="w-[42px] sm:w-[46px] h-[58px] sm:h-[62px] bg-[#5B636E] rounded-t-[10px] rounded-b-[4px] flex flex-col items-center justify-center p-[4px] shrink-0">
                        <div className="w-[26px] h-[26px] bg-[#CFD4DC] rounded-full"></div>
                      </div>
                      {/* Kiosk 3 */}
                      <div className="w-[42px] sm:w-[46px] h-[58px] sm:h-[62px] bg-white border border-[#9CA3AF] rounded-[2px] flex flex-col items-center justify-center p-[6px] shrink-0">
                        <div className="w-[14px] h-[2px] bg-[#9CA3AF] mb-[6px]"></div>
                        <div className="w-[24px] h-[22px] bg-[#CFD4DC] rounded-[2px]"></div>
                      </div>
                      {/* Kiosk 4 */}
                      <div className="w-[42px] sm:w-[46px] h-[58px] sm:h-[62px] bg-white border border-[#79818C] rounded-[2px] flex flex-col items-center overflow-hidden shrink-0">
                        <div className="h-[18px] w-full bg-[#79818C]"></div>
                        <div className="flex-1 flex items-center justify-center w-full">
                          <div className="w-[22px] h-[20px] bg-[#CFD4DC] rounded-[2px]"></div>
                        </div>
                      </div>
                      {/* Kiosk 5 */}
                      <div className="w-[42px] sm:w-[46px] h-[58px] sm:h-[62px] bg-white border border-[#9CA3AF] rounded-[2px] flex flex-col items-center justify-center p-[5px] shrink-0">
                        <div className="w-[26px] h-[24px] bg-[#CFD4DC] rounded-[2px]"></div>
                      </div>
                      {/* Kiosk 6 */}
                      <div className="w-[42px] sm:w-[46px] h-[58px] sm:h-[62px] bg-[#5B636E] rounded-t-[10px] rounded-b-[4px] flex flex-col items-center justify-center p-[4px] shrink-0">
                        <div className="w-[26px] h-[26px] bg-[#CFD4DC] rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-[0.78rem] text-[#6F696C] mt-[12px] m-0">
                      Tiga merek, tiga alur layanan, tiga cara mengukur
                    </p>
                  </div>
                </div>

                {/* Sesudah */}
                <div className="grid grid-cols-[80px_1fr] max-sm:grid-cols-1 gap-[16px] items-center pt-[24px]">
                  <span className="text-[0.85rem] text-[#6F696C] font-semibold">Sesudah</span>
                  <div>
                    <div className="flex items-center gap-[8px] sm:gap-[10px] justify-between sm:justify-start flex-wrap">
                      {[0, 1, 2, 3, 4, 5].map((idx) => (
                        <div
                          key={idx}
                          className="w-[42px] sm:w-[46px] h-[58px] sm:h-[62px] bg-white border-[1.5px] border-[#A9023A] rounded-[4px] flex flex-col items-center overflow-hidden shrink-0"
                        >
                          <div className="h-[15px] w-full bg-[#A9023A]"></div>
                          <div className="flex-1 flex items-center justify-center w-full">
                            <div className="w-[24px] h-[22px] bg-[#FCE4EC] border border-[#F8BBD0] rounded-[2px]"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-[0.78rem] text-[#6F696C] mt-[12px] m-0">
                      Satu standar dan satu ukuran di setiap gerai
                    </p>
                  </div>
                </div>
              </article>
            </div>

            {/* Right: Copy & Checklist */}
            <div>
              <span className="block text-[#A9023A] font-semibold text-[0.95rem] mb-[14px]">
                Standardisasi Layanan Lintas Cabang
              </span>

              <h2
                className="text-[clamp(1.75rem,3.4vw,2.6rem)] max-w-[20ch] font-bold tracking-[-0.01em] leading-[1.08] text-[#1C1A1B]"
                style={{ fontVariationSettings: '"wdth" 122' }}
              >
                Satu standar pengalaman di setiap gerai, termasuk setelah merger atau rebranding.
              </h2>

              <p className="text-[1.12rem] text-[#4A4548] leading-[1.6] mt-[22px] max-w-[56ch]">
                Ketika jaringan bergabung atau berganti merek, setiap cabang membawa cara kerja, perangkat, dan tampilannya sendiri. Exaque menyeragamkan alur layanan, tampilan, dan ukuran performa di seluruh jaringan, lalu menjaganya tetap seragam.
              </p>

              <ul className="list-none p-0 mt-[28px] border-b border-[#DEE1E3]">
                {[
                  "Alur layanan dan jenis transaksi yang sama di setiap gerai",
                  "Tampilan layanan mengikuti identitas merek yang baru",
                  "Satu ukuran performa untuk membandingkan seluruh gerai",
                ].map((text, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-[12px] py-[14px] border-t border-[#DEE1E3] text-[#1C1A1B] text-[1.02rem] leading-[1.5]"
                  >
                    <svg
                      className="w-[18px] h-[18px] text-[#A9023A] shrink-0 mt-[3px]"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="4 11 8 15 16 6" />
                    </svg>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-[28px]">
                <div className="flex items-center gap-[8px] text-[0.88rem] text-[#6F696C] mb-[16px]">
                  <span>Ditenagai</span>
                  <span className="font-bold text-[#1C1A1B]">Qmatic Orchestra</span>
                </div>
                <a
                  href="#form-lead"
                  className="inline-block font-bold text-[#1C1A1B] text-[1.1rem] underline underline-offset-4 decoration-2 hover:text-[#A9023A] transition-colors"
                >
                  Jadwalkan Assessment Cabang
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 7. KEAMANAN */}
        <section className="py-[104px] max-md:py-[72px] border-b border-[#DEE1E3]" id="keamanan">
          <div className="max-w-[1180px] mx-auto px-6 max-sm:px-4">
            <span className="block text-[#A9023A] font-semibold text-[0.95rem] mb-[14px]">Keamanan &amp; tata kelola</span>
            <h2 className="text-[clamp(1.75rem,3.4vw,2.6rem)] max-w-[22ch] font-bold tracking-[-0.01em] leading-[1.08]" style={{ fontVariationSettings: '"wdth" 122' }}>Dirancang untuk lolos review TI, keamanan, dan kepatuhan Anda.</h2>
            <div className="grid grid-cols-2 gap-x-[48px] mt-[44px] max-md:grid-cols-1">
              <div className="py-[24px] border-t border-[#DEE1E3]">
                <h3 className="text-[1.15rem] leading-[1.25] font-bold tracking-[-0.01em] mb-[6px]">Jaringan terisolasi</h3><p className="text-[#4A4548]"><em>Router</em> dan konektivitas disuplai Exaque, terpisah penuh dari jaringan internal Anda.</p>
              </div>
              <div className="py-[24px] border-t border-[#DEE1E3]">
                <h3 className="text-[1.15rem] leading-[1.25] font-bold tracking-[-0.01em] mb-[6px]">Perangkat terkunci</h3><p className="text-[#4A4548]">Tablet SecureBranch hanya menjalankan aplikasi Exaque, dengan kamera dinonaktifkan.</p>
              </div>
              <div className="py-[24px] border-t border-[#DEE1E3]">
                <h3 className="text-[1.15rem] leading-[1.25] font-bold tracking-[-0.01em] mb-[6px]"><em>Platform enterprise</em></h3><p className="text-[#4A4548]">Dibangun di atas Qmatic Orchestra, platform <em>customer journey</em> yang digunakan institusi keuangan di berbagai negara.</p>
              </div>
              <div className="py-[24px] border-t border-[#DEE1E3]">
                <h3 className="text-[1.15rem] leading-[1.25] font-bold tracking-[-0.01em] mb-[6px]">Kepemilikan &amp; audit data</h3><p className="text-[#4A4548]">Hak akses, kepemilikan data, dan retensi disepakati sebelum implementasi.</p>
              </div>
            </div>
            <div className="mt-[44px] bg-[#A9023A] text-white rounded-[12px] p-[40px] grid grid-cols-[4fr_7fr] gap-[40px] max-md:grid-cols-1 max-md:gap-[16px] max-md:p-[26px_20px]">
              <div><h3 className="text-[1.4rem] leading-[1.25] font-bold tracking-[-0.01em] text-white">Disepakati sebelum implementasi</h3></div>
              <div>
                <p className="text-[0.95rem] text-[#E3E1E2] mb-[20px]">Semuanya ditetapkan mengikuti standar Anda, bukan sebaliknya.</p>
                <ul className="list-none p-0 grid grid-cols-2 gap-y-[14px] gap-x-[24px] max-md:grid-cols-1">
                  {[<span key="1">Lokasi pusat data dan arsitektur <em>hosting</em></span>,
                    <span key="2">Hak akses dan kepemilikan data</span>,
                    <span key="3">Kebijakan <em>backup</em> dan retensi</span>,
                    <span key="4">Skema audit dan pelaporan</span>].map((content, i) => (
                    <li key={i} className="pl-[18px] relative text-white text-[0.85rem] before:absolute before:left-0 before:top-[0.62em] before:w-[8px] before:h-[2px] before:bg-white">{content}</li>
                  ))}
                </ul>
                <p className="text-[0.95rem] text-[#E3E1E2] mt-[26px]">Kami juga menyiapkan dokumen yang dibutuhkan tim Anda untuk proses penilaian penyedia jasa TI.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. PINTAR PLATFORM */}
        <section className="bg-white py-[104px] max-md:py-[72px] border-b border-[#DEE1E3]">
          <div className="max-w-[1180px] mx-auto px-6 max-sm:px-4 grid grid-cols-[5fr_7fr] gap-[64px] items-start max-lg:grid-cols-1 max-lg:gap-[40px]">
            <div>
              <div className="flex items-center gap-[8px] mb-[24px]">
                <span className="text-[0.95rem] text-[#6F696C] font-semibold">Ditenagai</span>
                <span className="text-[1.05rem] font-bold text-[#1C1A1B]">Pintar Platform</span>
              </div>
              <h2 className="text-[clamp(1.75rem,3.4vw,2.6rem)] max-w-[22ch] font-bold tracking-[-0.01em] leading-[1.08]" style={{ fontVariationSettings: '"wdth" 122' }}>Masalah terlihat saat masih bisa diperbaiki, bukan setelah menjadi komplain.</h2>
              <p className="text-[1.18rem] text-[#4A4548] max-w-[60ch] mt-[22px]">
                Setiap kunjungan nasabah menghasilkan data yang dapat digunakan untuk memantau dan meningkatkan kinerja cabang. Dengan <strong><em>Exaque Managed Branch Performance</em></strong>, potensi masalah layanan dapat terdeteksi lebih awal dan ditangani sebelum menimbulkan keluhan nasabah.
              </p>
              <div className="grid grid-cols-2 gap-x-[28px] mt-[34px] max-sm:grid-cols-1">
                <div className="py-[18px] border-t border-[#DEE1E3]">
                  <h3 className="text-[1rem] leading-[1.25] font-bold tracking-[-0.01em] mb-[4px]">Pintar Panel</h3>
                  <p className="text-[0.95rem] text-[#4A4548]">Performa seluruh cabang dalam satu tampilan, langsung dari kantor pusat.</p>
                </div>
                <div className="py-[18px] border-t border-[#DEE1E3]">
                  <h3 className="text-[1rem] leading-[1.25] font-bold tracking-[-0.01em] mb-[4px]">Pintar Insight</h3>
                  <p className="text-[0.95rem] text-[#4A4548]"><em>CSAT</em> dan deteksi <em>bottleneck</em> lintas cabang.</p>
                </div>
                <div className="py-[18px] border-t border-[#DEE1E3]">
                  <h3 className="text-[1rem] leading-[1.25] font-bold tracking-[-0.01em] mb-[4px]">SecureBranch</h3>
                  <p className="text-[0.95rem] text-[#4A4548]">Notifikasi kedatangan nasabah prioritas kepada petugas, di atas jaringan yang terpisah dari sistem internal Anda.</p>
                </div>
                <div className="py-[18px] border-t border-[#DEE1E3]">
                  <h3 className="text-[1rem] leading-[1.25] font-bold tracking-[-0.01em] mb-[4px]">Pintar Counter</h3>
                  <p className="text-[0.95rem] text-[#4A4548]">Pemanggilan dan pelayanan di loket yang familiar bagi petugas.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[10px] border border-[#DEE1E3] overflow-hidden">
              <div className="flex justify-between items-center gap-[10px] p-[14px_18px] bg-white text-[#1C1A1B] text-[0.88rem] border-b border-[#DEE1E3] flex-wrap">
                <div className="flex items-center gap-[12px] whitespace-nowrap">
                  <b className="text-[#1C1A1B]" style={{ fontVariationSettings: '"wdth" 112' }}>Pintar Panel</b>
                </div>
                <span className="text-[0.75rem] bg-[#EEF0F2] text-[#6F696C] px-[8px] py-[3px] rounded-[4px] whitespace-nowrap">Ilustrasi · data contoh</span>
              </div>
              <div className="grid grid-cols-5 border-b border-[#DEE1E3] max-sm:grid-cols-2">
                {[
                  { val: '112', lbl: 'Total cabang', id: 'p-total' },
                  { val: '07:42', lbl: 'Rata-rata tunggu' },
                  { val: '06:15', lbl: 'Rata-rata layanan' },
                  { val: '92%', lbl: <span>Cabang dalam <em>SLA</em></span>, id: 'p-sla' },
                  { val: '4,6', lbl: <em>CSAT</em> }
                ].map((t, i) => (
                  <div key={i} className={`p-[18px_16px] ${i > 0 ? 'border-l border-[#DEE1E3] max-sm:border-l-0 max-sm:border-t max-sm:even:border-l' : ''}`}>
                    <b id={t.id} className="block text-[1.45rem] leading-[1.1] font-tabular-nums" style={{ fontVariationSettings: '"wdth" 116' }}>{t.val}</b>
                    <span className="text-[0.75rem] text-[#6F696C] block leading-[1.35] mt-[4px]">{t.lbl}</span>
                  </div>
                ))}
              </div>
              <div className="p-[6px_18px_14px]">
                <div className="grid grid-cols-[1fr_70px_70px_64px] gap-[10px] py-[10px] items-center text-[0.72rem] text-[#6F696C] font-semibold">
                  <span>Butuh perhatian</span><span className="text-right font-tabular-nums">Tunggu</span><span className="text-right font-tabular-nums">Nasabah</span><span className="text-right font-tabular-nums">Loket</span>
                </div>
                {[
                  { name: 'Kelapa Gading', wait: '14:02', queue: '23', counter: '3/5', dot: 'bg-[#A9023A]' },
                  { name: 'Bekasi Barat', wait: '11:36', queue: '17', counter: '4/6', dot: 'bg-[#A9023A]' },
                  { name: 'Bogor Pajajaran', wait: '09:48', queue: '12', counter: '3/4', dot: 'bg-[#E9A2B6]' },
                  { name: 'Cikarang', wait: '09:15', queue: '9', counter: '2/3', dot: 'bg-[#E9A2B6]' },
                ].map((r, i) => (
                  <div key={i} className="grid grid-cols-[1fr_70px_70px_64px] gap-[10px] py-[10px] items-center border-t border-[#EEF0F2] text-[0.88rem]">
                    <span><i className={`inline-block w-[8px] h-[8px] rounded-full mr-[8px] ${r.dot}`}></i>{r.name}</span>
                    <span className="text-right font-tabular-nums">{r.wait}</span><span className="text-right font-tabular-nums">{r.queue}</span><span className="text-right font-tabular-nums">{r.counter}</span>
                  </div>
                ))}
              </div>
              <p className="text-[0.8rem] text-[#6F696C] mt-[12px] px-[18px] pb-[14px]">Ilustrasi antarmuka dengan data contoh, bukan data operasional klien.</p>
            </div>
          </div>
        </section>

        {/* 9. IMPLEMENTASI */}
        <section className="bg-[#EEF0F2] py-[104px] max-md:py-[72px]">
          <div className="max-w-[1180px] mx-auto px-6 max-sm:px-4">
            <span className="block text-[#A9023A] font-semibold text-[0.95rem] mb-[14px]">Rencana transisi</span>
            <h2 className="text-[clamp(1.75rem,3.4vw,2.6rem)] max-w-[22ch] font-bold tracking-[-0.01em] leading-[1.08]" style={{ fontVariationSettings: '"wdth" 122' }}>Masih memakai sistem cabang lama? Transisinya bertahap, tanpa memutus layanan.</h2>
            <ol className="list-none p-0 mt-[48px] grid grid-cols-4 max-md:grid-cols-2 max-md:gap-y-[34px] max-sm:grid-cols-1">
              <li className="pr-[22px] relative after:absolute after:left-[40px] after:right-0 after:top-[19px] after:h-[2px] after:bg-[#DEE1E3] max-md:after:hidden">
                <span className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-white border-[2px] border-[#A9023A] text-[#A9023A] font-bold mb-[18px] relative z-[1]">1</span>
                <h3 className="text-[1.15rem] leading-[1.25] font-bold tracking-[-0.01em] mb-[6px]"><em>Assessment</em></h3><p className="text-[0.95rem] text-[#4A4548]">Pemetaan cabang, alur layanan, dan sistem yang berjalan. Hasilnya: <em>baseline</em> performa dan rencana transisi.</p>
              </li>
              <li className="pr-[22px] relative after:absolute after:left-[40px] after:right-0 after:top-[19px] after:h-[2px] after:bg-[#DEE1E3] max-md:after:hidden">
                <span className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-white border-[2px] border-[#A9023A] text-[#A9023A] font-bold mb-[18px] relative z-[1]">2</span>
                <h3 className="text-[1.15rem] leading-[1.25] font-bold tracking-[-0.01em] mb-[6px]">Persiapan</h3><p className="text-[0.95rem] text-[#4A4548]">Konfigurasi platform, target <em>SLA</em> per cabang, dan jadwal migrasi.</p>
              </li>
              <li className="pr-[22px] relative after:absolute after:left-[40px] after:right-0 after:top-[19px] after:h-[2px] after:bg-[#DEE1E3] max-md:after:hidden">
                <span className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-white border-[2px] border-[#A9023A] text-[#A9023A] font-bold mb-[18px] relative z-[1]">3</span>
                <h3 className="text-[1.15rem] leading-[1.25] font-bold tracking-[-0.01em] mb-[6px]"><em>Pilot</em></h3><p className="text-[0.95rem] text-[#4A4548]">Uji teknis dan operasional di cabang terpilih.</p>
              </li>
              <li className="pr-[22px] relative">
                <span className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-white border-[2px] border-[#A9023A] text-[#A9023A] font-bold mb-[18px] relative z-[1]">4</span>
                <h3 className="text-[1.15rem] leading-[1.25] font-bold tracking-[-0.01em] mb-[6px]"><em>Rollout</em></h3><p className="text-[0.95rem] text-[#4A4548]">Implementasi bertahap setelah <em>pilot</em> dinyatakan stabil.</p>
              </li>
            </ol>
            <div className="mt-[44px] p-[20px_24px] border-l-[4px] border-[#A9023A] bg-white max-w-[760px]">
              <h3 className="text-[1.15rem] leading-[1.3] font-bold tracking-[-0.01em] mb-[10px]">Sistem lama dinonaktifkan hanya setelah <em>pilot</em> berhasil dan operasional dinyatakan stabil.</h3>
              <p className="text-[0.95rem] text-[#6F696C]">Belum memiliki sistem pemantauan performa? <em>Assessment</em> yang sama menjadi titik awal Anda.</p>
            </div>
          </div>
        </section>

        {/* 10. BIAYA */}
        <section className="py-[104px] max-md:py-[72px]" id="biaya">
          <div className="max-w-[1180px] mx-auto px-6 max-sm:px-4">
            <span className="block text-[#A9023A] font-semibold text-[0.95rem] mb-[14px]">Struktur komersial</span>
            <h2 className="text-[clamp(1.75rem,3.4vw,2.6rem)] max-w-[22ch] font-bold tracking-[-0.01em] leading-[1.08]" style={{ fontVariationSettings: '"wdth" 122' }}>Tiga komponen, semuanya transparan.</h2>
            <p className="text-[1.18rem] text-[#6F696C] mt-[20px]">Nominal per komponen ditetapkan setelah <em>assessment</em>.</p>
            
            <div className="grid grid-cols-3 mt-[44px] border border-[#DEE1E3] rounded-[10px] overflow-hidden max-md:grid-cols-1">
              <div className="p-[36px_32px] bg-[#A9023A] text-white">
                <div className="text-[2.6rem] font-extrabold leading-none text-white mb-[20px]">A</div>
                <div className="text-[1.2rem] font-bold mb-[4px] tracking-[-0.01em]" style={{ fontVariationSettings: '"wdth" 112' }}><em>Managed Service</em></div>
                <div className="text-[0.85rem] text-[#C9C3C6] mb-[20px]">Berulang, per cabang aktif</div>
                <p className="text-[0.95rem] text-[#E3E1E2]">Pengelolaan platform, dukungan teknis, respons sesuai <em>SLA</em>, Laporan Performa Cabang bulanan, termasuk seluruh modul platform Pintar.</p>
              </div>
              <div className="p-[36px_32px] bg-white border-l border-[#DEE1E3] max-md:border-l-0 max-md:border-t">
                <div className="text-[2.6rem] font-extrabold leading-none text-[#A9023A] mb-[20px]">B</div>
                <div className="text-[1.2rem] font-bold mb-[4px] tracking-[-0.01em] text-[#1C1A1B]" style={{ fontVariationSettings: '"wdth" 112' }}>Infrastruktur</div>
                <div className="text-[0.85rem] text-[#6F696C] mb-[20px]">Diteruskan sesuai pemakaian</div>
                <p className="text-[0.95rem] text-[#4A4548]">Biaya <em>hosting cloud</em>, diteruskan sesuai konsumsi aktual.</p>
              </div>
              <div className="p-[36px_32px] bg-white border-l border-[#DEE1E3] max-md:border-l-0 max-md:border-t">
                <div className="text-[2.6rem] font-extrabold leading-none text-[#A9023A] mb-[20px]">C</div>
                <div className="text-[1.2rem] font-bold mb-[4px] tracking-[-0.01em] text-[#1C1A1B]" style={{ fontVariationSettings: '"wdth" 112' }}>Implementasi</div>
                <div className="text-[0.85rem] text-[#6F696C] mb-[20px]">Satu kali per fase</div>
                <p className="text-[0.95rem] text-[#4A4548]">Konfigurasi, migrasi, dan <em>go-live</em> setiap tahap <em>rollout</em>.</p>
              </div>
            </div>
            <p className="mt-[34px] text-[1.12rem] text-[#1C1A1B] font-bold tracking-[-0.01em] max-w-[66ch] leading-[1.5]">Karena biayanya dihitung per cabang, seluruh jaringan dapat diusulkan dalam satu siklus anggaran, bukan lewat justifikasi belanja modal cabang demi cabang.</p>
          </div>
        </section>

        {/* 11. FAQ */}
        <section className="bg-[#EEF0F2] py-[104px] max-md:py-[72px]" id="faq">
          <style>{`
            #faq details summary::-webkit-details-marker { display: none; }
            #faq details summary:after {
              content: "";
              position: absolute;
              right: 16px;
              top: 50%;
              margin-top: -6px;
              width: 10px;
              height: 10px;
              border-bottom: 2px solid #A9023A;
              border-right: 2px solid #A9023A;
              transform: rotate(45deg);
              transition: transform 0.2s ease;
            }
            #faq details[open] summary:after {
              transform: rotate(225deg);
              margin-top: -2px;
            }
          `}</style>
          <div className="max-w-[1180px] mx-auto px-6 max-sm:px-4">
            <span className="block text-[#A9023A] font-semibold text-[0.95rem] mb-[14px]">Pertanyaan yang sering diajukan</span>
            <h2 className="text-[clamp(1.75rem,3.4vw,2.6rem)] max-w-[22ch] font-bold tracking-[-0.01em] leading-[1.08]" style={{ fontVariationSettings: '"wdth" 122' }}>Sebelum Anda menjadwalkan <em>assessment</em>.</h2>
            <div className="max-w-[820px] mt-[40px] border-t-[2px] border-[#1C1A1B]">
              <details className="border-b border-[#DEE1E3]">
                <summary className="cursor-pointer list-none p-[22px_44px_22px_0] font-semibold text-[1.08rem] relative">Apa bedanya dengan membeli sistem atau perangkat sendiri?</summary>
                <div className="pb-[22px] text-[#6F696C]"><p>Anda tidak membeli perangkat. Anda berlangganan hasil: layanan cabang yang berjalan, performa yang terukur setiap bulan, dan SLA tertulis.</p></div>
              </details>
              <details className="border-b border-[#DEE1E3]" open>
                <summary className="cursor-pointer list-none p-[22px_44px_22px_0] font-semibold text-[1.08rem] relative">Apakah sistem yang sudah ada harus diganti?</summary>
                <div className="pb-[22px] text-[#6F696C]"><p>Tidak serta-merta. <em>Assessment</em> menentukan apa yang dipertahankan, apa yang dipindahkan, dan urutannya. Sistem lama baru dinonaktifkan setelah <em>pilot</em> stabil.</p></div>
              </details>
              <details className="border-b border-[#DEE1E3]">
                <summary className="cursor-pointer list-none p-[22px_44px_22px_0] font-semibold text-[1.08rem] relative">Berapa biayanya?</summary>
                <div className="pb-[22px] text-[#6F696C]"><p>Biaya utama dihitung per cabang aktif per periode, ditambah biaya infrastruktur sesuai pemakaian dan biaya implementasi per fase. Nominalnya ditetapkan setelah <em>assessment</em>.</p></div>
              </details>
              <details className="border-b border-[#DEE1E3]">
                <summary className="cursor-pointer list-none p-[22px_44px_22px_0] font-semibold text-[1.08rem] relative">Bagaimana data nasabah dijaga?</summary>
                <div className="pb-[22px] text-[#6F696C]"><p>Lokasi data, hak akses, retensi, dan skema audit disepakati sebelum implementasi dan mengikuti standar institusi Anda. Perangkat Exaque berjalan di jaringan terpisah dari jaringan internal Anda.</p></div>
              </details>
              <details className="border-b border-[#DEE1E3]">
                <summary className="cursor-pointer list-none p-[22px_44px_22px_0] font-semibold text-[1.08rem] relative">Untuk institusi seperti apa layanan ini?</summary>
                <div className="pb-[22px] text-[#6F696C]"><p>Institusi dengan jaringan cabang di perbankan, multifinance, asuransi, dan telekomunikasi.</p></div>
              </details>
              <details className="border-b border-[#DEE1E3]">
                <summary className="cursor-pointer list-none p-[22px_44px_22px_0] font-semibold text-[1.08rem] relative">Berapa lama sampai berjalan?</summary>
                <div className="pb-[22px] text-[#6F696C]"><p>Bergantung pada jumlah cabang. Jadwal <em>pilot</em> dan <em>rollout</em> dituangkan dalam rencana transisi hasil <em>assessment</em>.</p></div>
              </details>
            </div>
          </div>
        </section>

        {/* 12. CTA */}
        <section className="bg-[#A9023A] text-white py-[104px] max-md:py-[72px] scroll-mt-20 relative" id="assessment">
          <div id="kontak" className="absolute -top-20" />
          <div id="cta" className="absolute -top-20" />
          <div className="max-w-[1180px] mx-auto px-6 max-sm:px-4 grid grid-cols-[5fr_6fr] gap-[64px] items-start max-md:grid-cols-1 max-md:gap-[36px]">
            <div>
              <h2 className="text-[clamp(1.75rem,3.4vw,2.6rem)] max-w-[22ch] font-bold tracking-[-0.01em] leading-[1.08]" style={{ fontVariationSettings: '"wdth" 122' }}>Sudah saatnya mengukur apa yang selama ini dibiarkan terjadi.</h2>
              <p className="text-[1.18rem] text-white/90 max-w-[60ch] mt-[22px]">Mari jadwalkan <em>assessment</em> singkat. Kami akan memetakan proses di cabang Anda saat ini, merancang target layanan ideal, lalu menyajikan bukti konsep (<em>PoC</em>) tanpa biaya setup awal.</p>
            </div>
            <form id="form-lead" noValidate onSubmit={handleSubmit} className="bg-white p-[32px] rounded-[10px] text-[#1C1A1B] max-sm:p-[24px_20px]">
              <div className="mb-[24px]">
                <h3 className="text-[1.25rem] leading-[1.25] font-bold tracking-[-0.01em] mb-[6px] text-black">Permintaan <em>Assessment</em></h3>
                <p className="text-[0.85rem] text-[#6F696C]">Formulir ini dikhususkan untuk email korporat.</p>
              </div>

              {successMsg && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">{successMsg}</div>
              )}
              {errorMsg && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{errorMsg}</div>
              )}

              <div className="grid gap-[16px]">
                <div>
                  <label htmlFor="we" className="block text-[0.82rem] font-semibold text-[#4A4548] mb-[6px]">Email pekerjaan</label>
                  <input type="email" id="we" name="email" value={formData.email} onChange={handleChange} required className="w-full h-[44px] px-[12px] text-[0.95rem] border-[1.5px] border-[#C9CED3] rounded-[6px] focus:outline-none focus:border-[#A9023A] bg-white" />
                  <span className="text-[0.78rem] text-[#A9023A] mt-[6px] font-semibold hidden">Gunakan email dengan domain perusahaan.</span>
                </div>
                <div className="grid grid-cols-2 gap-[16px] max-sm:grid-cols-1">
                  <div>
                    <label htmlFor="nm" className="block text-[0.82rem] font-semibold text-[#4A4548] mb-[6px]">Nama lengkap</label>
                    <input type="text" id="nm" name="first_name" value={formData.first_name} onChange={handleChange} required className="w-full h-[44px] px-[12px] text-[0.95rem] border-[1.5px] border-[#C9CED3] rounded-[6px] focus:outline-none focus:border-[#A9023A] bg-white" />
                  </div>
                  <div>
                    <label htmlFor="jt" className="block text-[0.82rem] font-semibold text-[#4A4548] mb-[6px]">Jabatan</label>
                    <input type="text" id="jt" name="job_title" value={formData.job_title} onChange={handleChange} required className="w-full h-[44px] px-[12px] text-[0.95rem] border-[1.5px] border-[#C9CED3] rounded-[6px] focus:outline-none focus:border-[#A9023A] bg-white" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-[16px] max-sm:grid-cols-1">
                  <div>
                    <label htmlFor="cp" className="block text-[0.82rem] font-semibold text-[#4A4548] mb-[6px]">Perusahaan</label>
                    <input type="text" id="cp" name="company" value={formData.company} onChange={handleChange} required className="w-full h-[44px] px-[12px] text-[0.95rem] border-[1.5px] border-[#C9CED3] rounded-[6px] focus:outline-none focus:border-[#A9023A] bg-white" />
                  </div>
                  <div>
                    <label htmlFor="bc" className="block text-[0.82rem] font-semibold text-[#4A4548] mb-[6px]">Estimasi jumlah cabang</label>
                    <select id="bc" name="user_persona" value={formData.user_persona} onChange={handleChange} required className="w-full h-[44px] px-[12px] text-[0.95rem] border-[1.5px] border-[#C9CED3] rounded-[6px] focus:outline-none focus:border-[#A9023A] bg-white">
                      <option value="">Pilih</option><option value="Kurang dari 20">Kurang dari 20</option><option value="20 - 50">20 - 50</option><option value="51 - 100">51 - 100</option><option value="Lebih dari 100">Lebih dari 100</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="ch" className="block text-[0.82rem] font-semibold text-[#4A4548] mb-[6px]">Tantangan operasional saat ini (Opsional)</label>
                  <input type="text" id="ch" name="message" value={formData.message} onChange={handleChange} className="w-full h-[44px] px-[12px] text-[0.95rem] border-[1.5px] border-[#C9CED3] rounded-[6px] focus:outline-none focus:border-[#A9023A] bg-white" />
                </div>
              </div>
              <button type="submit" disabled={loading} className="mt-[24px] w-full bg-[#1C1A1B] text-white font-bold h-[48px] rounded-[6px] text-[1rem] cursor-pointer hover:bg-[#3A3638] disabled:opacity-50">
                {loading ? "Mengirim..." : "Kirim permintaan"}
              </button>
            </form>
          </div>
        </section>

      </main>
    </>
  );
};

export default ManagedServices;
