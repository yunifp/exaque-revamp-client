import React, { useState, useEffect } from "react";
import SEOMeta from "../components/common/SEOMeta";
import Hero from "../components/common/Hero";
import heroBg from "../assets/hero-faq.webp"; // Using the FAQ hero background as requested
import CallToAction from "../components/common/CallToAction";
import { FiClock, FiUsers, FiMonitor, FiSmartphone, FiCalendar, FiBell, FiCheckCircle, FiActivity, FiBriefcase, FiHeart, FiShoppingBag, FiDollarSign, FiCheck, FiSettings, FiShield } from "react-icons/fi";

const tocData = [
  { id: "apa-itu-manajemen-antrean", label: "Apa Itu Manajemen Antrian?" },
  { id: "apa-itu-sistem-manajemen-antrean", label: "Apa Itu Sistem Manajemen Antrian?" },
  { id: "manfaat-sistem-manajemen-antrean", label: "Manfaat Sistem Manajemen Antrian" },
  { id: "industri-yang-diuntungkan", label: "Industri Apa Saja yang Paling Diuntungkan?" },
  { id: "bagaimana-cara-kerja", label: "Bagaimana Cara Kerja Sistem Manajemen Antrian?" },
  { id: "cara-memilih", label: "Cara Memilih Sistem Manajemen Antrian Terbaik" },
  { id: "harga", label: "Harga Sistem Manajemen Antrian" },
];

export default function PanduanSistemManajemenAntrean() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0.1 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const heroProps = {
    welcomeText: "",
    title: (
      <>
        Sistem Manajemen Antrian:
        <br className="hidden sm:inline" /> Pengertian, Cara Kerja, Manfaat, dan Penerapannya di Berbagai Industri.
      </>
    ),
    subtitle: "Mengelola pengalaman pelanggan saat mengantre dan waktu tunggu merupakan hal penting untuk memberikan pengalaman terbaik bagi pelanggan.",
    imageUrl: heroBg,
    contentWidth: "w-full max-w-5xl mx-auto",
    titleClassName: "text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold leading-tight mb-6",
    textAlign: "text-center mx-auto",
    buttonJustify: "justify-center"
  };

  return (
    <div className="bg-white min-h-screen">
      <SEOMeta 
        title="Sistem Manajemen Antrian: Pengertian, Cara Kerja, Manfaat, dan Penerapannya di Berbagai Industri" 
        description="Pelajari sistem manajemen antrian, mulai dari pengertian, cara kerja, manfaat, fitur, hingga penerapannya di berbagai industri untuk meningkatkan kualitas layanan." 
        url="https://exaque.com/sistem-manajemen-antrian" 
      />
      <Hero {...heroProps} />

      <div className="container mx-auto px-6 py-12 max-w-7xl flex flex-col md:flex-row gap-12 items-start">
        {/* Table of Contents - Sticky Sidebar */}
        <aside className="w-full md:w-1/4 sticky top-28 bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100 hidden md:block">
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Daftar Isi</h3>
          <ul className="space-y-3">
            {tocData.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`block text-sm transition-colors duration-200 ${
                    activeSection === item.id
                      ? "text-accent font-semibold border-l-2 border-accent pl-3 -ml-3"
                      : "text-gray-600 hover:text-accent"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Content Area */}
        <div className="w-full md:w-3/4">
          
          <section id="apa-itu-manajemen-antrean" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Apa Itu Manajemen Antrean?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Manajemen antrean atau <em>queue management</em> adalah proses mengelola pelanggan yang sedang menunggu dan mengarahkan mereka secara efisien kepada staf untuk mendapatkan bantuan lebih lanjut, sekaligus meningkatkan pengalaman pelanggan selama menunggu di setiap tahap <em>customer journey</em>.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">Ada dua jenis waktu tunggu yang perlu dipahami dan sama-sama penting dalam penerapan manajemen antrean, yaitu:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-red-50/50 p-5 rounded-xl border border-red-100 flex items-start gap-3">
                <FiClock className="text-accent text-xl flex-shrink-0 mt-1" />
                <div>
                  <strong className="block text-gray-900 mb-1">Waktu tunggu aktual (actual wait time):</strong>
                  <span className="text-gray-700 text-sm">waktu tunggu sebenarnya yang dimulai sejak pelanggan memutuskan untuk mendapatkan sesuatu hingga mereka menerima atau memilikinya.</span>
                </div>
              </div>
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 flex items-start gap-3">
                <FiUsers className="text-blue-600 text-xl flex-shrink-0 mt-1" />
                <div>
                  <strong className="block text-gray-900 mb-1">Waktu tunggu yang dirasakan (perceived wait time):</strong>
                  <span className="text-gray-700 text-sm">durasi menunggu sebagaimana yang dirasakan pelanggan, sejak mereka memutuskan untuk mendapatkan sesuatu hingga mereka menerima atau memilikinya.</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Perbedaan utama antara waktu tunggu aktual dan waktu tunggu yang dirasakan terletak pada faktor manusia dalam <em>perceived wait time</em>. Untuk meningkatkan pengalaman pelanggan dan menerapkan proses manajemen antrean yang efektif dalam bisnis, mengurangi waktu tunggu aktual sekaligus meningkatkan pengalaman selama menunggu merupakan kunci keberhasilan. Jika hanya salah satu jenis waktu tunggu yang ditingkatkan, hasilnya tetap tidak akan optimal dan dampaknya terhadap pengalaman pelanggan tidak akan sepositif jika keduanya ditingkatkan secara bersamaan.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-6">Pentingnya Manajemen Antrean dalam Pengelolaan Customer Journey</h3>
            
            <div className="relative border-l-2 border-accent/20 pl-6 md:pl-8 space-y-8 my-8 ml-2 md:ml-4">
              {/* Point 1 */}
              <div className="relative group cursor-default">
                <div className="absolute -left-[33px] md:-left-[41px] top-2 w-4 h-4 bg-white border-4 border-accent rounded-full group-hover:scale-150 group-hover:bg-accent transition-all duration-300 shadow-sm"></div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm group-hover:shadow-lg group-hover:border-accent/30 transition-all duration-300 group-hover:-translate-y-1">
                  <p className="text-gray-700 leading-relaxed">
                    Manajemen antrean merupakan bagian penting dari pengelolaan <em>customer journey</em> yang efektif, terutama ketika kebutuhan dan perilaku pelanggan terus berubah, sementara perjalanan pelanggan menjadi semakin kompleks dan terfragmentasi untuk mengakomodasi berbagai preferensi pelanggan secara bersamaan.
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="relative group cursor-default">
                <div className="absolute -left-[33px] md:-left-[41px] top-2 w-4 h-4 bg-white border-4 border-accent rounded-full group-hover:scale-150 group-hover:bg-accent transition-all duration-300 shadow-sm"></div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm group-hover:shadow-lg group-hover:border-accent/30 transition-all duration-300 group-hover:-translate-y-1">
                  <p className="text-gray-700 leading-relaxed">
                    Istilah <em>queue management</em> pertama kali muncul pada pertengahan abad ke-20. Pada saat itu, tujuan utamanya adalah mengurangi waktu tunggu aktual bagi pelanggan yang mengantre di toko atau restoran, ketika perjalanan pelanggan masih jauh lebih sederhana dan linear. Dalam beberapa tahun terakhir, perkembangan teknologi baru dan perubahan perilaku pelanggan telah membuat <em>customer journey</em> menjadi semakin kompleks dan dinamis. Saat ini, penyedia layanan diharapkan mampu mengelola seluruh perjalanan pelanggan, mulai dari sebelum kedatangan hingga setelah layanan diberikan, sekaligus menyediakan berbagai pilihan interaktif yang dapat memenuhi beragam preferensi pelanggan, seperti antrean fisik di lokasi maupun antrean virtual (<em>virtual queueing</em>) dari luar lokasi.
                  </p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="relative group cursor-default">
                <div className="absolute -left-[33px] md:-left-[41px] top-2 w-4 h-4 bg-white border-4 border-accent rounded-full group-hover:scale-150 group-hover:bg-accent transition-all duration-300 shadow-sm"></div>
                <div className="bg-gradient-to-r from-accent/5 to-white p-6 rounded-2xl border border-accent/20 shadow-sm group-hover:shadow-lg group-hover:border-accent/40 transition-all duration-300 group-hover:-translate-y-1">
                  <p className="text-gray-900 font-medium leading-relaxed">
                    Akibatnya, manajemen antrean tidak lagi sekadar menjadi solusi yang berdiri sendiri, tetapi telah berkembang menjadi bagian penting dari pengelolaan <em>customer journey</em>. Pendekatan ini mempertimbangkan pengalaman pelanggan secara menyeluruh, tetapi tidak dapat berfungsi secara optimal tanpa mengintegrasikan aspek manajemen antrean di dalamnya.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="apa-itu-sistem-manajemen-antrean" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Apa Itu Sistem Manajemen Antrean?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Sistem manajemen antrean pada dasarnya merupakan sistem yang memastikan pelanggan dilayani sesuai urutan yang tepat, sekaligus menyediakan berbagai alat untuk mengelola alur pelanggan dan pengalaman menunggu secara sistematis di sepanjang <em>customer journey</em>.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Sistem antrean dapat mencakup perangkat lunak, perangkat keras, atau kombinasi keduanya. Sistem ini membantu bisnis mempermudah akses pelanggan terhadap layanan, merencanakan dan mengelola alur pelanggan serta staf, serta mengumpulkan data untuk meningkatkan pengalaman pelanggan melalui <em>customer feedback</em>.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Fitur dan Fungsi Sistem Manajemen Antrean</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Sistem manajemen antrean memiliki tingkat kompleksitas yang beragam. Beberapa sistem hanya terdiri dari tiket antrean sederhana berbahan kertas dan layar pemanggilan, sedangkan sistem yang lebih canggih dapat mengintegrasikan pemesanan janji temu, kios <em>self-service</em>, dan solusi antrean virtual dalam satu sistem.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Berikut adalah beberapa contoh komponen dan fungsi yang dapat dimiliki oleh sebuah sistem manajemen antrean:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <FiMonitor className="text-accent text-xl" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg">Perangkat Lunak (Software)</h4>
                </div>
                <ul className="space-y-3">
                  {[
                    "Pemesanan janji temu secara online",
                    "Antrean virtual melalui smartphone dengan Mobile Tickets",
                    "Ruang tunggu virtual",
                    "Aplikasi khusus bagi staf (notifikasi kedatangan, pemanggilan, layanan)",
                    "Notifikasi otomatis untuk pelanggan dan staf",
                    "Pemantauan operasional secara real-time",
                    "Survei customer feedback",
                    "Business intelligence dengan statistik dan analisis komprehensif"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                      <FiCheckCircle className="text-accent mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <FiSettings className="text-gray-700 text-xl" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg">Perangkat Keras (Hardware)</h4>
                </div>
                <ul className="space-y-3">
                  {[
                    "Kios self-service",
                    "Mesin pencetak tiket",
                    "Layar informasi di area tunggu",
                    "Layar informasi di loket",
                    "Perangkat visual dan audio untuk pemanggilan pelanggan"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                      <FiCheckCircle className="text-gray-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section id="manfaat-sistem-manajemen-antrean" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Manfaat Sistem Manajemen Antrean</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Sistem manajemen antrean memungkinkan Anda mengelola pelanggan secara efektif di setiap interaksi mereka dengan organisasi, sekaligus membuat perjalanan pelanggan senyaman dan semulus mungkin. Sistem ini juga membantu Anda memahami bagaimana pelanggan dan karyawan berinteraksi, sehingga Anda mendapatkan wawasan yang diperlukan untuk meningkatkan pengalaman pelanggan sekaligus efisiensi operasional.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: FiCalendar, title: "Meningkatkan Akses ke Layanan", desc: "Dengan opsi penjadwalan janji temu, Anda dapat memperkirakan pelanggan yang datang dan mengalokasikan sumber daya lebih akurat." },
                { icon: FiClock, title: "Mengurangi Waktu Tunggu Aktual", desc: "Mengelola alur pelanggan secara efisien ke dalam berbagai antrean agar pelanggan memperoleh bantuan lebih cepat." },
                { icon: FiBell, title: "Mengurangi Ketidakpastian Pelanggan", desc: "Melalui notifikasi SMS/email dan digital signage, berikan informasi terkini tentang antrean untuk mengurangi ketidakpastian." },
                { icon: FiMonitor, title: "Pelanggan Tetap Terhibur", desc: "Integrasi layar media di area tunggu memberikan hiburan dan informasi, mengurangi perceived wait time." },
                { icon: FiSmartphone, title: "Menunggu Dari Mana Saja", desc: "Dengan Mobile Ticket, pelanggan dapat memantau posisi antrean secara real-time tanpa harus berada di lokasi fisik." },
                { icon: FiUsers, title: "Mempermudah Perencanaan Staf", desc: "Data real-time membantu manajer merencanakan kebutuhan staf secara efisien dan merespons lonjakan pelanggan seketika." },
                { icon: FiCheckCircle, title: "Menyesuaikan Kompetensi", desc: "Mengelompokkan pelanggan ke jalur layanan berbeda agar ditangani oleh staf dengan keahlian yang relevan." },
                { icon: FiHeart, title: "Meningkatkan Personalisasi", desc: "Gabungkan tiket kertas, kios self-service, dan tiket virtual untuk mengakomodasi berbagai preferensi pelanggan." },
                { icon: FiActivity, title: "Mengidentifikasi Hambatan", desc: "Data waktu pelayanan membantu mengidentifikasi peluang peningkatan operasional dan memberi peringatan dini kepada manajer." },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
                    <item.icon className="text-accent text-2xl group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2 leading-snug">{item.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="industri-yang-diuntungkan" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Industri Apa Saja yang Paling Diuntungkan?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Semua organisasi tentu mendapatkan manfaat dari pelanggan yang puas. Namun, beberapa industri memiliki kebutuhan yang lebih besar terhadap sistem manajemen antrean, seperti sektor keuangan, layanan kesehatan, ritel, dan sektor publik.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border border-gray-200">
                <FiBriefcase className="text-accent text-3xl mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Sektor Publik & Pemerintahan</h3>
                <p className="text-gray-700 text-sm leading-relaxed">Sistem manajemen antrean memungkinkan kantor pemerintahan memberikan layanan berkualitas tinggi dan mengelola tingginya jumlah pengunjung melalui digital signage dan antrean virtual.</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200">
                <FiHeart className="text-blue-600 text-3xl mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Rumah Sakit & Layanan Kesehatan</h3>
                <p className="text-gray-700 text-sm leading-relaxed">Dikombinasikan dengan penjadwalan janji temu, penyedia layanan kesehatan dapat mengarahkan pasien ke departemen yang tepat lebih cepat dan mengurangi beban administratif staf.</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-2xl border border-amber-200">
                <FiShoppingBag className="text-amber-600 text-3xl mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Industri Ritel</h3>
                <p className="text-gray-700 text-sm leading-relaxed">Mengoptimalkan pengalaman omnichannel (online & in-store) dengan layanan click-and-collect, antrean virtual, dan SMS notifikasi yang sangat populer.</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-2xl border border-emerald-200">
                <FiDollarSign className="text-emerald-600 text-3xl mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Perbankan</h3>
                <p className="text-gray-700 text-sm leading-relaxed">Meningkatkan kecepatan dan kualitas layanan keuangan secara efisien melalui sistem manajemen antrean modern untuk pengalaman perbankan yang lancar.</p>
              </div>
            </div>
          </section>

          <section id="bagaimana-cara-kerja" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Bagaimana Cara Kerja Sistem Manajemen Antrean?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Sistem manajemen antrean berfungsi untuk mengelola pengalaman pelanggan selama menunggu, sekaligus menyediakan berbagai alat untuk mengurangi waktu tunggu dan mendukung staf dalam memberikan layanan pelanggan yang terbaik.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Sistem manajemen antrean dapat terdiri dari <em>touchpoint</em> digital maupun fisik yang memungkinkan pelanggan berinteraksi dengan keduanya sepanjang <em>customer journey</em>. Dengan menghubungkan tiga tahap utama, yaitu sebelum layanan (<em>pre-service</em>), saat layanan (<em>service</em>), dan setelah layanan (<em>post-service</em>) melalui berbagai <em>touchpoint</em> yang relevan, sistem ini membantu menyederhanakan alur pelanggan secara menyeluruh.
            </p>
            
            <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-lg mt-8">
              <iframe 
                width="100%" 
                height="450" 
                src="https://www.youtube.com/embed/AeeMT7FuQ1k" 
                title="Sistem Manajemen Antrean" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </section>

          <section id="cara-memilih" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Cara Memilih Sistem Manajemen Antrean Terbaik</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Sebagai penyedia layanan, Anda dapat memilih perangkat lunak manajemen antrean yang sederhana maupun yang lebih kompleks dengan berbagai modul canggih. Kami telah merangkum beberapa hal utama yang perlu dipertimbangkan saat memilih penyedia dan sistem manajemen antrean.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-6">Hal yang Perlu Dipertimbangkan Saat Memilih Penyedia</h3>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-8">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Rekam jejak yang telah terbukti",
                  "Pengalaman dalam manajemen antrean di industri Anda",
                  "Pemahaman spesifik terhadap pengunjung Anda",
                  "Mampu melibatkan seluruh stakeholder",
                  "Keahlian dalam manajemen proyek",
                  "Harga fleksibel sesuai anggaran (TCO)",
                  "Kemampuan integrasi dan dukungan teknis"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700">
                    <div className="bg-white rounded-full p-1 shadow-sm">
                      <FiCheck className="text-accent flex-shrink-0" />
                    </div>
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-6">Hal yang Perlu Dipertimbangkan Saat Memilih Sistem</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-t-accent hover:-translate-y-1 transition-transform">
                <FiShield className="text-accent text-2xl mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">Keamanan & Skalabilitas</h4>
                <p className="text-sm text-gray-600">Solusi harus memastikan data pelanggan tetap aman (sesuai GDPR) dan mampu mengakomodasi kebutuhan yang terus berkembang seiring bisnis bertumbuh.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-t-blue-500 hover:-translate-y-1 transition-transform">
                <FiSmartphone className="text-blue-500 text-2xl mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">Solusi Omnichannel</h4>
                <p className="text-sm text-gray-600">Pertimbangkan sistem yang mampu memenuhi kebutuhan pelanggan melalui berbagai saluran (fisik dan digital) tanpa mengganggu komunikasi pre-service hingga post-service.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-t-amber-500 hover:-translate-y-1 transition-transform">
                <FiActivity className="text-amber-500 text-2xl mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">Pengumpulan Data & Kecerdasan</h4>
                <p className="text-sm text-gray-600">Pilih sistem yang mampu mengumpulkan data dari seluruh touchpoint dan mencocokkan kebutuhan pelanggan dengan keahlian karyawan secara cerdas.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-t-emerald-500 hover:-translate-y-1 transition-transform">
                <FiSettings className="text-emerald-500 text-2xl mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">Fleksibilitas & Integrasi</h4>
                <p className="text-sm text-gray-600">Mampu menangani janji temu maupun walk-in, mudah dikonfigurasi, dan mendukung integrasi terbuka dengan sistem bisnis atau pihak ketiga.</p>
              </div>
            </div>
          </section>

          <section id="harga" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Harga Sistem Manajemen Antrean</h2>
            <p className="text-gray-700 leading-relaxed bg-subtle/10 p-6 rounded-2xl border-l-4 border-accent">
              Harga sistem manajemen antrean bergantung pada kebutuhan teknis serta tingkat kompleksitas solusi yang Anda butuhkan. Biayanya dapat berkisar dari sistem sederhana berupa dispenser tiket antrean kertas manual hingga solusi manajemen <em>customer journey</em> yang sepenuhnya fleksibel dan terintegrasi dengan sistem bisnis lainnya.
            </p>
          </section>

        </div>
      </div>
      
      {/* Call to Action Consistent with other pages */}
      <CallToAction />
    </div>
  );
}
