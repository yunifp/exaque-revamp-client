import React, { useState, useEffect, useRef } from "react";
import pakRicoImg from "../../assets/pak-rico.jpg";

/**
 * Hero Section 10 Tahun Exaque
 * Menggunakan font web standar Exaque yang konsisten dan elegan:
 * - Baris 1: Surat dari CEO (kiri) & Profil Enrico Simatupang (kanan)
 * - Baris 2: Video 10 Tahun Exaque (kiri) & Headline + CTA (kanan)
 */
export default function Hero({
  videoSrc = "https://www.youtube.com/watch?v=AeeMT7FuQ1k",
  ctaLink,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const scrollerRef = useRef(null);

  // Periksa apakah surat dari CEO sudah di-scroll mendekati akhir
  const checkScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const atEnd = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;
    setIsAtEnd(atEnd);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  // Ekstrak ID YouTube jika input berupa link YouTube
  const getYouTubeId = (url) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/
    );
    return match ? match[1] : null;
  };

  const ytId = getYouTubeId(videoSrc);

  // Link tujuan CTA
  const targetCtaLink = ctaLink || "https://10anniversary.exaque.com/";

  return (
    <section
      className="bg-white min-h-[calc(100vh-64px)] pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-28 px-4 sm:px-6 md:px-10 lg:px-16"
      id="beranda"
      aria-label="Perayaan 10 tahun Exaque"
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(220px,300px)] gap-y-8 sm:gap-y-10 lg:gap-y-12 gap-x-8 sm:gap-x-12 lg:gap-x-[72px] items-start mt-2 sm:mt-4 lg:mt-6">
          {/* ========================================================
              FOTO PROFIL ENRICO SIMATUPANG (Desktop: Kolom 2, Row 1 | Mobile: Urutan atas/bawah)
             ======================================================== */}
          <div className="flex flex-col items-center text-center gap-4.5 hero-reveal hero-reveal-d1 lg:col-start-2 lg:row-start-1 mb-2 lg:mb-0">
            <a
              className="relative block w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[300px] aspect-square rounded-full group focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#A8023A]"
              href="https://www.linkedin.com/in/enrico-simatupang-87211629a/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buka profil LinkedIn Enrico Simatupang (tab baru)"
            >
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
                aria-hidden="true"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="48.5"
                  fill="none"
                  stroke="#E2A9BB"
                  strokeWidth="2"
                  strokeDasharray="2 11"
                  strokeLinecap="round"
                />
                <circle
                  className="ceo-orbit-draw"
                  cx="50"
                  cy="50"
                  r="48.5"
                  fill="none"
                  stroke="#A8023A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  style={{ "--len": 305 }}
                />
              </svg>
              <img
                src={pakRicoImg}
                alt="Foto Enrico Simatupang, CEO Exaque"
                className="absolute inset-[14px] w-[calc(100%-28px)] h-[calc(100%-28px)] rounded-full object-cover bg-white border-[3px] border-[#A8023A] transition-transform duration-350 ease-out group-hover:scale-[1.03]"
              />
            </a>
            <div className="flex flex-col items-center">
              <div className="font-extrabold text-xl sm:text-[1.3rem] leading-tight text-gray-900">
                Enrico Simatupang
              </div>
              <div className="text-sm font-medium text-gray-600 mt-0.5">
                CEO Exaque
              </div>
              <a
                className="inline-flex items-center gap-2 mt-2.5 text-xs sm:text-[0.88rem] font-semibold text-[#A8023A] border-[1.5px] border-[#A8023A] rounded-full px-3.5 py-1.5 sm:px-4 sm:py-1.5 hover:bg-[#A8023A] hover:text-white transition-colors duration-200"
                href="https://www.linkedin.com/in/enrico-simatupang-87211629a/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-current"
                  aria-hidden="true"
                >
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
                </svg>
                Lihat di LinkedIn
              </a>
            </div>
          </div>

          {/* ========================================================
              SURAT DARI CEO (Desktop: Kolom 1, Row 1)
             ======================================================== */}
          <article
            className="relative bg-gradient-to-b from-[#FFF9FB] to-[#FBF1F4] text-[#1a1a1a] rounded-2xl border border-[#F2D8E1] shadow-[0_16px_40px_rgba(168,2,58,0.07),0_2px_8px_rgba(0,0,0,0.03)] overflow-hidden hero-reveal hero-reveal-d2 lg:col-start-1 lg:row-start-1"
            id="letter"
          >
            {/* Garis aksen elegan di bagian atas kartu */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#A8023A] via-[#C8104F] to-[#8A0230]" />

            <div className="pt-6 sm:pt-7 lg:pt-8 px-6 sm:px-8 lg:px-9 pb-0">
              {/* Header Surat */}
              <div className="flex items-center justify-between gap-3 flex-wrap mb-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#A8023A]/10 text-[#A8023A] border border-[#A8023A]/15">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3.5 h-3.5 fill-none stroke-current stroke-2"
                    aria-hidden="true"
                  >
                    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                  SURAT RESMI FOUNDER & CEO
                </span>
                <span className="text-xs font-medium text-gray-500 bg-white/80 px-2.5 py-1 rounded-full border border-[#EBD5DC]">
                  Sepuluh Tahun Exaque, 2016–2026
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a1a] tracking-tight leading-tight mb-4">
                Surat dari <span className="text-[#A8023A]">CEO</span>
              </h1>

              {/* Konten Surat yang Dapat Digulir */}
              <div
                ref={scrollerRef}
                onScroll={checkScroll}
                className="h-[270px] sm:h-[290px] lg:h-[310px] overflow-y-auto pr-4 sm:pr-5 pb-16 ceo-letter-scroll outline-none space-y-3.5 text-[15px] sm:text-base leading-[1.75] text-[#374151]"
                tabIndex={0}
                role="region"
                aria-label="Isi surat dari CEO, gulir untuk membaca"
              >
                <p className="font-semibold text-gray-800 text-[15.5px]">
                  Salam hangat untuk segenap klien, mitra, dan sahabat Exaque,
                </p>

                <p>
                  Sepuluh tahun lalu, kami memulai Exaque dengan satu keyakinan
                  sederhana: menunggu tidak harus melelahkan. Antrean yang tertata
                  dan pelayanan yang jelas membuat orang merasa dihargai sejak
                  langkah pertama mereka masuk.
                </p>
                <p>
                  Hari ini, saya menulis surat ini dengan rasa syukur. Perjalanan
                  sepuluh tahun ini tidak kami jalani sendiri. Terima kasih kepada
                  para pelanggan yang mempercayakan pengalaman layanan mereka
                  kepada kami, kepada mitra yang tumbuh bersama kami, dan kepada
                  seluruh tim Exaque yang bekerja dengan sungguh-sungguh dari tahun
                  ke tahun.
                </p>
                <p>
                  Di setiap tahun, kami belajar sesuatu yang baru. Ada masa ketika
                  kami harus membangun dari nol, ada masa ketika kami harus
                  beradaptasi dengan cepat, dan ada masa ketika kami harus berhenti
                  sejenak untuk memastikan kami masih berjalan ke arah yang benar.
                  Semua itu membentuk cara kami bekerja hari ini.
                </p>
                <p>
                  Di halaman-halaman berikutnya, Anda akan melihat jejak perjalanan
                  itu, dua tahun demi dua tahun, lewat foto dan video dari
                  orang-orang yang menjalaninya. Kami mengundang Anda menelusurinya
                  bersama kami.
                </p>
                <p>
                  Sepuluh tahun adalah awal yang baik. Kami akan terus membantu
                  institusi dan pelanggan mereka merasakan layanan yang lebih
                  tertata, lebih cepat, dan lebih manusiawi.
                </p>

                {/* Blok Penutup dan Tanda Tangan */}
                <div className="pt-4 border-t border-[#EBD5DC] mt-6 flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-xs text-gray-500 italic">
                      Salam hangat dan hormat,
                    </p>
                    <h4 className="font-bold text-base sm:text-lg text-[#A8023A] mt-0.5">
                      Enrico Simatupang
                    </h4>
                    <p className="text-xs text-gray-600 font-medium">
                      Founder & CEO, PT Exaque Mandiri Makmur
                    </p>
                  </div>
                  <div className="text-[11px] font-semibold text-[#A8023A] bg-[#A8023A]/8 px-3 py-1.5 rounded-lg border border-[#A8023A]/15">
                    Satu Dekade Bersama
                  </div>
                </div>
              </div>
            </div>

            {/* Gradien pemudar bawah jika belum scroll mentok */}
            <div
              className={`absolute left-0 right-0 bottom-0 h-16 rounded-b-2xl bg-gradient-to-t from-[#FBF1F4] via-[#FBF1F4]/80 to-transparent pointer-events-none transition-opacity duration-300 ${
                isAtEnd ? "opacity-0" : "opacity-100"
              }`}
            />

            {/* Petunjuk gulir dengan pill badge interaktif */}
            <div
              className={`absolute right-6 bottom-3.5 pointer-events-none transition-all duration-300 z-10 ${
                isAtEnd ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
              }`}
              aria-hidden="true"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#A8023A] bg-white/95 shadow-sm border border-[#EBD5DC]">
                Gulir untuk membaca
                <svg
                  className="w-3.5 h-3.5 fill-none stroke-current stroke-2 animate-bounce"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </span>
            </div>
          </article>

          {/* ========================================================
              FEATURE ROW: VIDEO (Kiri) & HEADLINE + DESKRIPSI (Kanan)
             ======================================================== */}
          <div className="col-span-1 lg:col-span-2 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-y-9 sm:gap-y-10 gap-x-10 sm:gap-x-12 lg:gap-x-[88px] items-center mt-6 sm:mt-8 lg:mt-11">
            {/* VIDEO PLAYER CARD */}
            <div className="relative w-full hero-reveal hero-reveal-d3 lg:col-start-1 lg:row-start-1">
              {/* Blok rose dekoratif di belakang video */}
              <div className="absolute inset-0 translate-x-2.5 sm:translate-x-4 lg:translate-x-[18px] translate-y-3 sm:translate-y-4 lg:translate-y-[18px] bg-[#F4D3DD] opacity-60 rounded-[26px] sm:rounded-[30px] pointer-events-none" />

              {/* Bingkai video */}
              <div className="relative w-full aspect-video bg-black rounded-[18px] sm:rounded-[24px] overflow-hidden shadow-[0_18px_44px_rgba(80,0,28,0.22)] z-[1]">
                {isPlaying ? (
                  ytId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
                      title="Video 10 Tahun Exaque"
                      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                      allowFullScreen
                      className="w-full h-full border-0 bg-black"
                    />
                  ) : (
                    <video
                      src={videoSrc}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover bg-black"
                    />
                  )
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 w-full h-full border-0 cursor-pointer text-white flex flex-col items-center justify-center gap-4 sm:gap-4.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8023A]"
                    style={{
                      background:
                        "radial-gradient(120% 90% at 20% 10%, rgba(168, 2, 58, 0.85), rgba(0, 0, 0, 0) 60%), #000000",
                    }}
                    aria-label="Putar video 10 tahun Exaque"
                  >
                    <span className="w-16 h-16 sm:w-20 sm:h-20 md:w-[84px] md:h-[84px] rounded-full bg-white flex items-center justify-center transition-transform duration-250 group-hover:scale-108 group-focus-visible:scale-108 shadow-md">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-6 h-6 sm:w-7 sm:h-7 md:w-[30px] md:h-[30px] fill-[#A8023A] ml-1"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    <span className="font-extrabold text-base sm:text-xl lg:text-[1.6rem] text-white">
                      Video 10 Tahun Exaque
                    </span>
                    <span className="text-xs sm:text-[0.95rem] text-[#F4D3DD] -mt-2 font-medium">
                      Video akan ditempatkan di sini
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* TEKS FITUR & TOMBOL CTA */}
            <div className="hero-reveal hero-reveal-d3 lg:col-start-2 lg:row-start-1 flex flex-col items-start">
              <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-extrabold leading-[1.12] tracking-tight text-gray-900">
                Sepuluh tahun{" "}
                <span className="text-[#A8023A]">perjalanan Exaque.</span>
              </h2>
              <p className="mt-4 sm:mt-5 text-base sm:text-lg leading-[1.7] text-gray-600 max-w-[44ch]">
                Tonton video ini untuk melihat perjalanan kami dari 2016 sampai
                2026. Setelah itu, telusuri kisah setiap dua tahunnya di halaman
                berikutnya.
              </p>
              <a
                href={targetCtaLink}
                className="inline-flex items-center justify-center gap-2.5 mt-6 sm:mt-7.5 px-6 sm:px-7.5 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-base text-white shadow-[0_12px_26px_rgba(168,2,58,0.28)] hover:brightness-108 transition-all"
                style={{
                  background: "linear-gradient(135deg, #A8023A, #8A0230)",
                }}
              >
                Mulai dari tahun pertama
                <svg
                  viewBox="0 0 24 24"
                  className="w-4.5 h-4.5 fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
