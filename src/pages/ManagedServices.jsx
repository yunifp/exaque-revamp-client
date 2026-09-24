import React from "react";
import { Helmet } from "react-helmet-async";
import Hero from "../components/common/Hero";
import HomeCTA from "../components/home/HomeCTA";
import heroImage from "../assets/hero-managed-services.jpg";
import { 
  FaClock, FaGlobe, FaChartLine, 
  FaMicrochip, FaTruck, FaTicketAlt, FaCogs,
  FaShieldAlt, FaMoneyBillWave, FaExclamationTriangle, FaBullseye,
  FaBrain, FaUsers, FaServer, FaCloud,
  FaChartPie, FaLock, FaDesktop, FaUserTie,
  FaNetworkWired, FaTabletAlt, FaCertificate, FaFileContract,
  FaClipboardCheck, FaRocket, FaFlagCheckered,
  FaSync, FaExchangeAlt, FaCalendarCheck, FaArrowRight, FaCaretRight
} from "react-icons/fa";

const ManagedServices = () => {
  const ManagedServicesHeroProps = {
    welcomeText: "Solusi-Solusi",
    title: "Managed Services",
    imageUrl: heroImage,
    subtitle: (
      <p>
        Fokus pada pelayanan pelanggan, sementara kami menangani seluruh kompleksitas operasional perangkat antrean Anda.
      </p>
    ),
    textAlign: "text-left",
    minHeight: "min-h-[900px]",
    button1Text: "Permintaan Demo",
    button1Link: "/demo",
    button2Text: "Konsultasi",
    button2Link: "/kontak",
  };

  return (
    <>
      <Helmet>
        <title>Exaque Managed Services</title>
        <meta name="description" content="Managed Services Exaque membantu menjaga sistem customer journey tetap optimal melalui monitoring, maintenance, update, dan dukungan teknis berkelanjutan." />
      </Helmet>
      
      <main className="w-full bg-primary pb-20 overflow-hidden">
        {/* Global Standard Hero */}
        <Hero {...ManagedServicesHeroProps} />

        {/* Section 1: Pengantar Layanan */}
        <section className="bg-white py-24 px-4 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2 relative">
                {/* Decorative blob behind text */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-accent/5 rounded-full blur-2xl animate-pulse"></div>
                <p className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 flex items-center gap-3 relative z-10">
                  <span className="w-8 h-1 bg-accent inline-block rounded-full"></span> 
                  Exaque Managed Services
                </p>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-gray-900 relative z-10">
                  Menjaga layanan tetap berjalan — <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-red-500">tanpa bergantung</span> pada perangkat yang menua.
                </h2>
                <p className="text-lg text-gray-600 mb-10 leading-relaxed relative z-10">
                  Perangkat antrean generasi lama sudah masuk fase End-of-Sale dan pasokan tiket kertas impor kian langka. Exaque memindahkan operasi cabang Anda ke layanan terkelola dan Mobile Ticket — sehingga yang Anda jaga adalah pelayanan kepada nasabah, bukan mesinnya.
                </p>
                <div className="flex flex-wrap gap-4 relative z-10">
                  <a href="/kontak" className="group flex items-center gap-2 bg-accent text-white px-8 py-3.5 font-semibold rounded-full shadow-lg hover:shadow-xl hover:bg-accent-hover hover:-translate-y-1 transition-all duration-300">
                    Minta Readiness Assessment
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="#model" className="group flex items-center gap-2 bg-white border-2 border-accent text-accent px-8 py-3.5 font-semibold rounded-full hover:bg-accent/5 hover:-translate-y-1 transition-all duration-300">
                    Lihat Model Layanan
                  </a>
                </div>
              </div>
              
              <div className="lg:w-1/2 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-accent/5 to-transparent rounded-full blur-3xl -z-10"></div>
                  
                  <div className="group bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                    <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 text-accent">
                      <FaClock size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Satu dekade</h3>
                    <p className="text-sm text-gray-600">Mengelola operasi cabang institusi teregulasi di Indonesia</p>
                  </div>
                  
                  <div className="group bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 sm:translate-y-6">
                    <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 text-accent">
                      <FaGlobe size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Skala nasional</h3>
                    <p className="text-sm text-gray-600">Operasi multi-cabang berjalan penuh dengan Mobile Ticket sejak 2023</p>
                  </div>
                  
                  <div className="group bg-gradient-to-br from-accent to-[#8a012e] text-white p-8 rounded-3xl shadow-lg sm:col-span-2 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden relative">
                    <FaChartLine className="absolute -right-4 -bottom-4 text-9xl text-white/10 group-hover:scale-125 transition-transform duration-700" />
                    <div className="relative z-10">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                        <FaChartLine size={28} />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">OPEX (Bukan CAPEX)</h3>
                      <p className="text-sm text-white/90">Langganan terkelola yang dapat direncanakan tiap periode anggaran secara transparan.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Titik Balik */}
        <section className="bg-subtle-light py-24 px-4 md:px-12 lg:px-24 border-y border-gray-200">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 mb-16 items-end">
              <div className="lg:w-1/2">
                <p className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 flex items-center gap-2">
                  <span className="w-8 h-1 bg-accent inline-block rounded-full"></span> Titik baliknya
                </p>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Selama perangkat masih menyala, risikonya belum terlihat.
                </h2>
              </div>
              <div className="lg:w-1/2">
                <p className="text-gray-600 text-lg leading-relaxed">
                  Sistem lama masih bisa dipakai. Tetapi ketergantungannya bertumpuk pada satu rantai pasok yang menyempit — dan itu baru terasa ketika layanan sudah terganggu.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { num: "01", icon: <FaMicrochip size={24} />, title: "Perangkat proprietary", desc: "Printer & kiosk khusus yang sudah End-of-Sale; suku cadang makin terbatas." },
                { num: "02", icon: <FaTruck size={24} />, title: "Pengadaan impor", desc: "Penggantian bergantung pada proses pengadaan internasional yang panjang." },
                { num: "03", icon: <FaTicketAlt size={24} />, title: "Ticket roll fisik", desc: "Pasokan kertas tiket kian sulit diprediksi dan tidak lagi ekonomis." },
                { num: "04", icon: <FaCogs size={24} />, title: "Operasi harian cabang", desc: "Semua ketergantungan itu bermuara pada satu titik: layanan ke nasabah." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col group hover:-translate-y-3 hover:shadow-xl hover:border-accent/30 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 text-9xl text-gray-50 opacity-0 group-hover:opacity-100 group-hover:scale-110 -translate-y-10 translate-x-10 transition-all duration-500 z-0 pointer-events-none">
                    {item.icon}
                  </div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-4xl font-black text-gray-200 group-hover:text-accent/20 transition-colors">{item.num}</span>
                      <div className="w-12 h-12 bg-subtle-light group-hover:bg-accent group-hover:text-white rounded-full flex items-center justify-center text-gray-400 transition-colors duration-300 shadow-inner">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-accent transition-colors">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-200 flex flex-col md:flex-row items-center gap-8 hover:shadow-md transition-shadow duration-300">
                <div className="w-16 h-16 shrink-0 bg-accent/5 rounded-2xl flex items-center justify-center text-accent">
                  <FaChartLine size={28} />
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 font-bold text-lg mb-2">Biaya Tersembunyi</h4>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Menunda keputusan memiliki harga yang jarang dihitung: waktu tim internal yang terkuras, kepanikan layanan manual saat terjadi gangguan, dan pengadaan darurat yang faktanya jauh lebih mahal daripada transisi yang direncanakan sejak awal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Empat Pergeseran */}
        <section className="bg-white py-24 px-4 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
             <p className="text-accent font-semibold tracking-wider uppercase text-sm mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-accent inline-block rounded-full"></span> Empat pergeseran mendasar
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-16 max-w-3xl">
              Yang perlu dipertahankan bukan perangkatnya — melainkan <span className="text-accent">kelancaran layanannya.</span>
            </h2>
            
            <div className="flex flex-col gap-6">
              {[
                { icon: <FaShieldAlt />, title: "Kontinuitas", dari: "Perangkat End-of-Life dan pasokan tiket kertas impor.", menjadi: "Layanan tetap berjalan lewat Mobile Ticket, lepas dari ketergantungan perangkat keras." },
                { icon: <FaMoneyBillWave />, title: "Biaya", dari: "Belanja modal berulang untuk membeli dan mengganti perangkat.", menjadi: "Langganan terkelola (OPEX) yang dapat direncanakan setiap periode anggaran." },
                { icon: <FaExclamationTriangle />, title: "Risiko", dari: "Penggantian reaktif setelah gangguan sudah terjadi.", menjadi: "Transisi terencana dengan monitoring dan backup yang dikelola Exaque." },
                { icon: <FaBullseye />, title: "Fokus", dari: "Tim klien mengurus server, printer, dan pemeliharaan teknis.", menjadi: "Klien fokus pada kebijakan dan pelayanan; sisi teknis diambil alih Exaque." }
              ].map((item, idx) => (
                <div key={idx} className="group bg-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center border border-gray-100 shadow-sm hover:shadow-xl hover:border-accent/20 transition-all duration-300">
                  <div className="md:w-1/4 w-full flex items-center gap-4">
                    <div className="w-12 h-12 bg-subtle-light group-hover:bg-accent group-hover:text-white rounded-full flex items-center justify-center text-accent transition-colors duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-accent transition-colors">{item.title}</h3>
                  </div>
                  
                  <div className="md:w-1/3 w-full bg-subtle-light p-6 rounded-2xl group-hover:bg-white transition-colors border border-transparent group-hover:border-gray-100">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                      <FaCaretRight className="text-gray-400" /> DARI
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.dari}</p>
                  </div>
                  
                  <div className="hidden md:flex justify-center items-center text-gray-300 group-hover:text-accent group-hover:scale-125 transition-all duration-300">
                    <FaArrowRight size={24} />
                  </div>
                  <div className="md:hidden flex justify-center text-gray-300">
                    <FaArrowRight size={20} className="rotate-90" />
                  </div>
                  
                  <div className="md:w-5/12 w-full bg-white p-6 rounded-2xl border-2 border-gray-100 group-hover:border-accent group-hover:bg-accent/5 transition-colors duration-300 shadow-sm">
                    <p className="text-xs text-accent font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                      <FaFlagCheckered /> MENJADI
                    </p>
                    <p className="text-gray-900 font-medium text-sm leading-relaxed">{item.menjadi}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Model Layanan */}
        <section id="model" className="bg-subtle-light py-24 px-4 md:px-12 lg:px-24 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-20 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-gray-200/50 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite]"></div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-1/3">
                 <p className="text-accent font-semibold tracking-wider uppercase text-sm mb-6 flex items-center gap-2">
                  <span className="w-8 h-1 bg-accent inline-block rounded-full"></span> Model layanan
                </p>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-gray-900">
                  Empat lapisan tanggungan.
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Anda tetap memegang kendali penuh atas kebijakan dan proses layanan. Sisi teknis yang membebani tim internal berpindah ke Exaque.
                </p>
                <div className="hidden lg:block w-32 h-32 border-4 border-dashed border-gray-300 rounded-full animate-[spin_30s_linear_infinite] flex items-center justify-center opacity-50">
                  <div className="w-20 h-20 bg-accent rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <div className="lg:w-2/3 flex flex-col gap-4">
                {[
                  { num: "01", icon: <FaBrain />, title: "Intelligence — AntrePintar", desc: "Pintar Insight, SecureBranch, Pintar Panel, Pintar Counter: kecerdasan cabang di atas seluruh operasi.", tag: "ANTREPINTAR", tagColor: "bg-yellow-100 text-yellow-800 border-yellow-200" },
                  { num: "02", icon: <FaUsers />, title: "Pelanggan & Petugas", desc: "Mobile Ticket, check-in, pemanggilan, dan pelayanan di loket.", tag: "KENDALI KLIEN", tagColor: "bg-gray-100 text-gray-600 border-gray-200" },
                  { num: "03", icon: <FaServer />, title: "Platform Qmatic Orchestra", desc: "Aplikasi, konfigurasi layanan, database, dan pelaporan.", tag: "BERSAMA", tagColor: "bg-gray-100 text-gray-600 border-gray-200" },
                  { num: "04", icon: <FaCloud />, title: "Managed Infrastructure", desc: "Hosting, monitoring, backup, pemeliharaan, dan dukungan teknis ber-SLA.", tag: "DIKELOLA EXAQUE", tagColor: "bg-accent/10 text-accent border-accent/20" }
                ].map((item, idx) => (
                  <div key={idx} className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-lg hover:border-accent/30 hover:-translate-x-2 transition-all duration-300">
                    <div className="flex items-start md:items-center gap-6 w-full md:w-3/4">
                      <div className="w-14 h-14 rounded-2xl bg-subtle-light group-hover:bg-accent group-hover:text-white flex items-center justify-center flex-shrink-0 text-gray-400 font-bold transition-colors duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-accent transition-colors">{item.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                    <div className="mt-6 md:mt-0 md:ml-0 self-start md:self-center shrink-0">
                      <span className={`text-xs font-bold px-4 py-2 rounded-full tracking-wider border ${item.tagColor} inline-flex items-center gap-2`}>
                        <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-yellow-500' : idx === 3 ? 'bg-accent animate-pulse' : 'bg-gray-400'}`}></div>
                        {item.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Infrastruktur Antrean */}
        <section className="bg-white py-24 px-4 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-accent to-[#8a012e] text-white p-12 md:p-16 rounded-t-[3rem] relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djIwaC0ydi0yaC0ydi0yaC0ydjJoLTJ2MmgtMnYyaC0ydjJoLTh2LThoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8 max-w-3xl relative z-10 drop-shadow-md">
                Infrastruktur antrean kini standar di semua vendor. Yang tak bisa ditiru adalah <span className="text-yellow-400">kecerdasannya.</span>
              </h2>
              <div className="relative z-10 max-w-3xl space-y-6 text-white/90">
                <p className="leading-relaxed text-lg font-medium">
                  Di atas infrastruktur yang dikelola Exaque, AntrePintar mengubah setiap interaksi cabang menjadi kecerdasan operasional yang bisa dilihat dan ditindaklanjuti — bukan sekadar antrean yang berjalan.
                </p>
                <div className="bg-black/20 backdrop-blur-md p-6 rounded-2xl border border-white/10 mt-8 inline-block shadow-inner">
                  <p className="text-white font-bold text-xl flex items-center gap-3">
                    <FaBrain className="text-yellow-400 animate-pulse" size={28} />
                    Exaque menjaga layanan tetap berjalan. AntrePintar membuatnya bisa dipahami.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-100 border-t-0 rounded-b-[3rem] bg-white shadow-xl overflow-hidden relative z-20">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {[
                  { icon: <FaChartPie />, title: "Pintar Insight", desc: "CSAT real-time dan deteksi bottleneck lintas cabang — masalah terlihat saat masih bisa diperbaiki, bukan setelah jadi komplain." },
                  { icon: <FaLock />, title: "SecureBranch", desc: "Notifikasi kedatangan nasabah prioritas tanpa melanggar kebijakan IT, di atas jaringan yang independen dari sistem internal Anda." },
                  { icon: <FaDesktop />, title: "Pintar Panel", desc: "Pantau performa seluruh cabang di Indonesia secara langsung, dalam satu tampilan." },
                  { icon: <FaUserTie />, title: "Pintar Counter", desc: "Pemanggilan dan pelayanan yang lebih efisien di loket, familiar bagi petugas." }
                ].map((item, idx) => (
                  <div key={idx} className={`group p-10 ${idx % 2 === 0 ? 'md:border-r border-gray-100' : ''} ${idx < 2 ? 'border-b border-gray-100' : ''} hover:bg-subtle-light transition-colors duration-300`}>
                    <div className="w-14 h-14 rounded-2xl bg-accent/5 group-hover:bg-accent group-hover:text-white flex items-center justify-center mb-6 text-accent transition-all duration-300 group-hover:scale-110 shadow-sm group-hover:shadow-md">
                      {React.cloneElement(item.icon, { size: 24 })}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-accent transition-colors">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Tampilan antarmuka produk */}
        <section className="bg-subtle-light py-24 px-4 md:px-12 lg:px-24 border-y border-gray-200">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-end mb-16">
              <div className="md:w-2/3">
                <p className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 flex items-center gap-2">
                  <span className="w-8 h-1 bg-accent inline-block rounded-full"></span> Tampilan antarmuka produk
                </p>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Bukan sekadar konsep. Kecerdasan cabang yang nyata dan bisa dilihat.
                </h2>
              </div>
              <div className="md:w-1/3">
                <p className="text-sm text-gray-500 font-medium bg-white inline-flex items-start gap-3 p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <FaExclamationTriangle className="text-yellow-500 shrink-0 mt-0.5" size={20} />
                  Ilustrasi antarmuka produk dengan data contoh, bukan data operasional klien sesungguhnya.
                </p>
              </div>
            </div>
            
            <div className="bg-[#1f2937] rounded-[2rem] shadow-2xl overflow-hidden border border-gray-700 transform hover:scale-[1.01] transition-transform duration-500">
              <div className="flex justify-between items-center p-5 bg-[#111827] border-b border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <h3 className="font-semibold text-gray-300 flex items-center gap-2 text-sm">
                    <FaDesktop className="text-gray-500" /> Pintar Panel — Branch Overview
                  </h3>
                </div>
                <span className="text-xs font-bold text-red-500 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-full flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-ping absolute"></span>
                  <span className="w-2 h-2 bg-red-500 rounded-full relative"></span>
                  LIVE DATA
                </span>
              </div>
              <div className="p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px]"></div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 relative z-10">
                  {[
                    { value: "112", label: "Total Cabang", icon: <FaGlobe /> },
                    { value: "12:45", label: "Avg Waiting", icon: <FaClock /> },
                    { value: "08:32", label: "Avg Service", icon: <FaUserTie /> },
                    { value: "98%", label: "SLA Terpenuhi", icon: <FaClipboardCheck /> },
                    { value: "4.8/5", label: "CSAT", icon: <FaChartPie /> }
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col group hover:bg-white/10 transition-colors duration-300">
                      <div className="text-gray-400 mb-4 group-hover:text-accent transition-colors duration-300">
                        {React.cloneElement(stat.icon, { size: 28 })}
                      </div>
                      <div className="text-3xl md:text-4xl font-black text-white mb-2">{stat.value}</div>
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Keamanan & tata kelola data */}
        <section className="bg-white py-24 px-4 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <p className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 flex items-center gap-2">
                  <span className="w-8 h-1 bg-accent inline-block rounded-full"></span> Keamanan & tata kelola data
                </p>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-12">
                  Dirancang untuk memenuhi persyaratan IT, <span className="text-accent">keamanan</span>, dan kepatuhan.
                </h2>
                <div className="space-y-4">
                  {[
                    { icon: <FaNetworkWired />, title: "Jaringan independen (air-gapped)", desc: "Router dan konektivitas disuplai Exaque, terpisah penuh dari jaringan lokal klien." },
                    { icon: <FaTabletAlt />, title: "Perangkat yang dikeraskan", desc: "Tablet SecureBranch dikunci hanya untuk aplikasi Exaque, kamera dinonaktifkan." },
                    { icon: <FaCertificate />, title: "Platform tersertifikasi", desc: "Platform Qmatic Orchestra tersertifikasi ISO 27001." },
                    { icon: <FaFileContract />, title: "Kepemilikan & audit data", desc: "Hak akses, kepemilikan data, retensi, disepakati sebelum implementasi." }
                  ].map((item, idx) => (
                    <div key={idx} className="group flex gap-4 bg-subtle-light p-6 rounded-3xl border border-transparent hover:bg-white hover:shadow-lg hover:border-gray-100 transition-all duration-300">
                      <div className="mt-1 text-gray-400 group-hover:text-accent group-hover:scale-110 transition-all">
                        {React.cloneElement(item.icon, { size: 24 })}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1 text-lg group-hover:text-accent transition-colors">{item.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 w-full perspective-1000">
                <div className="bg-gradient-to-br from-accent/5 to-accent/10 p-10 rounded-[3rem] border border-accent/20 relative overflow-hidden shadow-2xl transform hover:rotate-y-2 transition-transform duration-700">
                  <div className="absolute -right-10 -top-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
                  <FaShieldAlt className="text-9xl absolute -bottom-10 -right-4 text-accent/10" />
                  
                  <div className="relative z-10 flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-accent">
                      <FaFileContract size={32} />
                    </div>
                    <h3 className="text-3xl font-bold text-accent">Disepakati sebelum implementasi</h3>
                  </div>
                  
                  <div className="relative z-10 bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-white">
                    <p className="text-gray-800 text-lg leading-relaxed font-medium">
                      Lokasi pusat data dan arsitektur hosting, hak akses serta kepemilikan data, kebijakan backup dan retensi, hingga skema audit dan pelaporan — semuanya ditetapkan mengikuti standar Anda, bukan sebaliknya.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Rencana transisi */}
        <section className="bg-gray-900 text-white py-24 px-4 md:px-12 lg:px-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]"></div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row gap-12 items-end mb-16">
              <div className="md:w-2/3">
                <p className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 flex items-center gap-2">
                  <span className="w-8 h-1 bg-accent inline-block rounded-full"></span> Rencana transisi
                </p>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                  Bertahap, terkendali, <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-accent">tanpa memutus layanan.</span>
                </h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 relative">
              <div className="hidden md:block absolute top-12 left-10 w-[calc(100%-5rem)] h-1 bg-white/10 z-0">
                <div className="h-full bg-accent animate-[pulse_3s_ease-in-out_infinite] w-1/3"></div>
              </div>
              
              {[
                { num: "1", icon: <FaClipboardCheck />, title: "Assessment", desc: "Inventarisasi sistem, konsumsi tiket, ketergantungan cabang." },
                { num: "2", icon: <FaCogs />, title: "Persiapan", desc: "Konfigurasi platform dan penyusunan rencana migrasi." },
                { num: "3", icon: <FaRocket />, title: "Pilot", desc: "Uji teknis dan operasional pada lokasi terpilih." },
                { num: "4", icon: <FaFlagCheckered />, title: "Rollout", desc: "Implementasi bertahap setelah pilot dinyatakan stabil." }
              ].map((item, idx) => (
                <div key={idx} className="group bg-[#1f2937] border border-gray-700 p-8 rounded-3xl relative z-10 hover:-translate-y-2 hover:bg-[#283548] hover:border-accent/50 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(169,2,58,0.2)]">
                  <div className="w-16 h-16 bg-gray-800 group-hover:bg-accent rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-6 border border-gray-600 group-hover:border-accent transition-colors shadow-lg">
                    <span className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-500 rounded-full text-black flex items-center justify-center text-sm font-black border-4 border-[#1f2937] group-hover:border-[#283548] transition-colors">{item.num}</span>
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300">{item.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center">
              <div className="bg-accent/10 border border-accent/20 p-6 rounded-3xl inline-flex items-center gap-4 hover:bg-accent/20 transition-colors">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center shrink-0">
                  <FaSync className="text-accent animate-spin-slow" size={20} />
                </div>
                <p className="text-sm md:text-base text-white/90 font-medium">
                  Printer dinonaktifkan <strong className="text-white">hanya setelah pilot berhasil</strong> dan operasional dinyatakan stabil — kontinuitas layanan terjaga sepanjang migrasi.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: Struktur komersial */}
        <section className="bg-subtle-light py-24 px-4 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-end mb-16">
              <div className="lg:w-2/3">
                <p className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 flex items-center gap-2">
                  <span className="w-8 h-1 bg-accent inline-block rounded-full"></span> Struktur komersial
                </p>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Tiga komponen yang transparan.
                </h2>
              </div>
              <div className="lg:w-1/3">
                <p className="text-gray-600 font-medium bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  Nominal per komponen ditetapkan setelah assessment teknis dan operasional.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { letter: "A", icon: <FaSync />, title: "RECURRING", subtitle: "Managed Services", desc: "Biaya berulang (OPEX) per cabang aktif — mencakup pengelolaan platform, dukungan teknis, dan respons SLA." },
                { letter: "B", icon: <FaExchangeAlt />, title: "PASS-THROUGH", subtitle: "Infrastruktur", desc: "Biaya hosting cloud yang diteruskan secara transparan, sesuai konsumsi aktual." },
                { letter: "C", icon: <FaCalendarCheck />, title: "ONE-TIME", subtitle: "Implementasi", desc: "Biaya satu kali per fase untuk konfigurasi, migrasi, dan go-live setiap tahap rollout." }
              ].map((item, idx) => (
                <div key={idx} className="group bg-white rounded-3xl p-8 shadow-sm border-t-8 border-transparent hover:border-accent flex flex-col h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 text-9xl text-gray-50 group-hover:text-accent/5 group-hover:scale-110 transition-all duration-500 pointer-events-none">
                    {item.letter}
                  </div>
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="w-14 h-14 bg-accent/10 text-accent rounded-2xl flex items-center justify-center font-bold text-2xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-black text-lg tracking-wider text-gray-900 group-hover:text-accent transition-colors">{item.title}</h3>
                      <p className="text-xs text-white font-bold mt-1 uppercase bg-gray-800 px-3 py-1 rounded-full inline-block group-hover:bg-accent transition-colors">{item.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mt-auto relative z-10">{item.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-accent to-accent-hover p-8 rounded-3xl shadow-lg flex flex-col sm:flex-row items-center gap-6 text-white transform hover:scale-[1.02] transition-transform duration-300">
              <FaChartLine className="text-5xl shrink-0 text-white/50" />
              <p className="text-base md:text-lg font-medium leading-relaxed">
                Model OPEX memberi keunggulan pelaporan bagi sektor teregulasi — langganan terkelola tidak memicu kewajiban pelaporan yang biasanya menyertai belanja modal.
              </p>
            </div>
          </div>
        </section>
        
        {/* Global CTA */}
        <HomeCTA />
      </main>
    </>
  );
};

export default ManagedServices;
