import React from "react";
import { Link } from "react-router-dom";

import allianzPng from "../../assets/logo/allianz-logo.png";
import allianzSvg from "../../assets/logo/allianz-logo.svg";
import axaLogo from "../../assets/logo/AXA_logo.png";
import axaMandiri from "../../assets/logo/AXA_Mandiri_Logo.png";
import bankOfChina from "../../assets/logo/Bank_Of_China_logo.png";
import bcaFinance from "../../assets/logo/BCA_Finance.png";
import bcaFinanceAlt from "../../assets/logo/bcafinancelogo.png";
import ikea from "../../assets/logo/ikea-logo.png";
import ioH from "../../assets/logo/Logo IOH-01.png";
import manulife from "../../assets/logo/manulife-logo.png";
import mufg from "../../assets/logo/MUFG_logo.gif";
import prudential from "../../assets/logo/Prudential_plc_logo.png";
import standardChartered from "../../assets/logo/Standard_Chartered_(2021).png";
import unilever from "../../assets/logo/Unilever_logo.png";
import unileverAnimated from "../../assets/logo/Unilever_logo-animated.svg";
import vipMoneyChanger from "../../assets/logo/VIP_Money_Changer_logo.png";

// Icons and images for Integrasi section
import zoomIcon from "../../assets/zoom.svg";
import teamsIcon from "../../assets/microsoft-teams.svg";
import salesforceIcon from "../../assets/salesforce.svg";
import powerBIIcon from "../../assets/power-bi.svg";
import homeIntegrasiTeaser from "../../assets/home-integrasi-teaser.webp";

const logos = [
  { name: "Allianz", img: allianzPng },
  { name: "AXA", img: axaLogo },
  { name: "AXA Mandiri", img: axaMandiri },
  { name: "Bank of China", img: bankOfChina },
  { name: "BCA Finance", img: bcaFinance },
  { name: "IKEA", img: ikea },
  { name: "IOH", img: ioH },
  { name: "Manulife", img: manulife },
  { name: "MUFG", img: mufg },
  { name: "Prudential", img: prudential },
  { name: "Standard Chartered", img: standardChartered },
  { name: "Unilever", img: unilever },
  { name: "VIP Money Changer", img: vipMoneyChanger },
];

const logosRow1 = [...logos, ...logos];
const logosRow2 = [...logos.slice().reverse(), ...logos.slice().reverse()];

function IntegrationSection() {
  return (
    <section className="container mx-auto px-6 overflow-hidden">
      <style>
        {`
          @keyframes scrollLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scrollRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-scroll-left {
            animation: scrollLeft 22s linear infinite;
          }
          .animate-scroll-right {
            animation: scrollRight 22s linear infinite;
          }
          .mask-gradient {
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          }
        `}
      </style>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative w-full space-y-6 mask-gradient py-4">
          <div className="flex space-x-6 w-max animate-scroll-right hover:[animation-play-state:paused]">
            {logosRow1.map((logo, index) => (
              <div
                key={`row1-${index}`}
                className="w-28 h-28 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center justify-center p-5 border border-gray-50 hover:scale-105 transition"
              >
                <img src={logo.img} alt={logo.name} className="w-full h-full object-contain" loading="lazy" />
              </div>
            ))}
          </div>

          <div className="flex space-x-6 w-max animate-scroll-left hover:[animation-play-state:paused]">
            {logosRow2.map((logo, index) => (
              <div
                key={`row2-${index}`}
                className="w-28 h-28 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center justify-center p-5 border border-gray-50 hover:scale-105 transition"
              >
                <img src={logo.img} alt={logo.name} className="w-full h-full object-contain" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6 text-left">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Trusted Client
          </h2>

          <p className="text-lg md:text-xl text-gray-600">
            Dipercaya oleh berbagai perusahaan terkemuka di Indonesia untuk memberikan solusi sistem antrean dan manajemen perjalanan pelanggan yang terbaik.
          </p>
        </div>
      </div>

      {/* Integrasi Exaque Section */}
      <div className="mt-24 md:mt-32">
        <div className="bg-gradient-to-br from-[#9f1b3e] to-[#7a122e] rounded-[2.5rem] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 shadow-2xl overflow-hidden relative">
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-black opacity-10 rounded-full blur-3xl -ml-20 -mb-20"></div>
          
          <div className="flex-1 space-y-8 text-left relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Integrasi Exaque
            </h2>
            <p className="text-lg md:text-xl text-white/90 font-light">
              Terintegrasi dengan <span className="font-semibold text-white">platform rapat virtual</span>, kalender, CRM, papan informasi digital, alat visualisasi data, dan sistem enterprise lainnya.
            </p>
            
            <Link
              to="/integrasi"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#9f1b3e] font-bold rounded-full shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              Lihat Selengkapnya
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          
          <div className="flex-1 relative z-10 w-full group mt-10 lg:mt-0">
            {/* Main Image Card */}
            <div className="relative rounded-2xl shadow-2xl transform transition-all duration-500 group-hover:scale-105 bg-white/10 p-3 backdrop-blur-md border border-white/20 z-10">
               <img 
                 src={homeIntegrasiTeaser}
                 alt="Integrasi Exaque"
                 className="w-full h-auto object-cover rounded-xl shadow-inner"
               />
            </div>
            
            {/* Floating Icons */}
            <div className="absolute -top-6 -left-6 md:-top-10 md:-left-10 w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-xl p-3 md:p-4 animate-bounce z-20 flex items-center justify-center [animation-delay:-1s] hover:scale-110 transition-transform cursor-pointer">
              <img src={zoomIcon} alt="Zoom" className="w-full h-full object-contain" />
            </div>
            
            <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-xl p-3 md:p-4 animate-bounce z-20 flex items-center justify-center [animation-delay:-0.5s] hover:scale-110 transition-transform cursor-pointer">
              <img src={salesforceIcon} alt="Salesforce" className="w-full h-full object-contain" />
            </div>
            
            <div className="absolute top-1/2 -right-8 w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl shadow-xl p-3 animate-pulse z-20 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
              <img src={teamsIcon} alt="Microsoft Teams" className="w-full h-full object-contain" />
            </div>
            
            <div className="absolute bottom-1/4 -left-8 w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl shadow-xl p-3 animate-pulse z-20 flex items-center justify-center [animation-delay:-1s] hover:scale-110 transition-transform cursor-pointer">
              <img src={powerBIIcon} alt="Power BI" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IntegrationSection;
