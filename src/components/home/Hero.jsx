import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import pakRicoImg from "../../assets/pak-rico.jpg";

/**
 * Hero Section 10 Tahun Exaque
 * Menggunakan font web standar Exaque yang konsisten dan elegan:
 * - Baris 1: Surat dari CEO (kiri) & Profil Enrico Simatupang (kanan)
 * - Baris 2: Video 10 Tahun Exaque (kiri) & Headline + CTA (kanan)
 */
export default function Hero({
  videoSrc = "https://youtu.be/Gih9XVwkOAs",
  thumbnailSrc,
  ctaLink,
  buttonText,
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
  const defaultThumbnail = ytId
    ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`
    : null;
  const thumbnailUrl = thumbnailSrc || defaultThumbnail;

  // Cek apakah tanggal sudah mencapai 10 November 2026 (WIB)
  // Sebelum tanggal 10: "Tonton Teaser"
  // Mulai tanggal 10 dst: "Tonton Full Podcast"
  const isFullPodcast = (() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("podcast") === "full") return true;
      if (params.get("podcast") === "teaser") return false;
    } catch (err) {}
    const releaseDate = new Date("2026-11-10T00:00:00+07:00");
    return new Date().getTime() >= releaseDate.getTime();
  })();

  const computedButtonText = buttonText || (isFullPodcast ? "Tonton Full Podcast" : "Tonton Teaser");

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
          <div className="flex flex-col items-center text-center hero-reveal hero-reveal-d1 lg:col-start-2 lg:row-start-1 mb-2 lg:mb-0">
            <a
              href="https://www.linkedin.com/in/enrico-simatupang-87211629a/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#A8023A] rounded-2xl p-2 transition-transform duration-200"
              aria-label="Buka profil LinkedIn Enrico Simatupang, Founder & CEO Exaque (tab baru)"
            >
              <div className="relative block w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[300px] aspect-square rounded-full">
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
                  alt="Foto Enrico Simatupang, Founder & CEO Exaque"
                  className="absolute inset-[14px] w-[calc(100%-28px)] h-[calc(100%-28px)] rounded-full object-cover bg-white border-[3px] border-[#A8023A] transition-transform duration-350 ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="mt-4 flex flex-col items-center text-center">
                <h2 className="font-extrabold text-xl sm:text-[1.35rem] leading-tight text-[#8A0230] group-hover:underline decoration-[#A8023A] underline-offset-4 transition-all">
                  Enrico Simatupang
                </h2>
                <p className="text-sm sm:text-[15px] font-bold text-gray-900 mt-1">
                  Founder & Chief Executive Officer
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  PT Exaque Mandiri Makmur
                </p>
              </div>
            </a>
          </div>

          {/* ========================================================
              SURAT DARI CEO (Desktop: Kolom 1, Row 1)
             ======================================================== */}
          <article
            className="relative bg-gradient-to-b from-[#FFFDF9] via-white to-[#FAF7F2] text-[#1a1a1a] rounded-2xl border border-[#F2D8E1] shadow-[0_16px_40px_rgba(168,2,58,0.07),0_2px_8px_rgba(0,0,0,0.03)] overflow-hidden hero-reveal hero-reveal-d2 lg:col-start-1 lg:row-start-1"
            id="letter"
          >
            {/* Garis aksen elegan di bagian atas kartu */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#A8023A] via-[#C9A24B] to-[#7A012A]" />

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
                className="h-[320px] sm:h-[350px] lg:h-[370px] overflow-y-auto pr-4 sm:pr-5 pb-16 ceo-letter-scroll outline-none space-y-3.5 text-[15px] sm:text-base leading-[1.75] text-[#374151]"
                tabIndex={0}
                role="region"
                aria-label="Isi surat dari CEO, gulir untuk membaca"
              >
                <p className="font-semibold text-[#A8023A] text-[15.5px] sm:text-base">
                  Salam hangat untuk seluruh klien, mitra, dan sahabat Exaque,
                </p>

                <p className="text-[15.5px] sm:text-[16.5px] leading-[1.75] text-[#2A2A2A]">
                  Sepuluh tahun lalu, Exaque memulai perjalanan dengan satu keyakinan:{" "}
                  <strong className="text-[#A8023A] font-bold">
                    waktu pelanggan sangat berharga
                  </strong>
                  , dan setiap pengalaman pelayanan mencerminkan bagaimana sebuah institusi menghargai pelanggannya.
                </p>

                <p>
                  Kami memulainya bersama tim perintis yang percaya bahwa pelayanan di cabang bisa menjadi lebih tertib, efisien, dan manusiawi. Sepanjang satu dekade, kami telah dipercaya mendampingi{" "}
                  <strong className="text-[#7A012A] font-bold">
                    institusi-institusi terkemuka
                  </strong>{" "}
                  di sektor perbankan, pembiayaan, asuransi, telekomunikasi, dan ritel. Kepercayaan Anda adalah fondasi terpenting perjalanan kami.
                </p>

                <p>
                  Sepuluh tahun pertama mengajarkan kami bahwa{" "}
                  <strong className="text-[#7A012A] font-bold">
                    keandalan sistem hanyalah awal
                  </strong>
                  . Ukuran yang sebenarnya adalah nilai yang dihasilkan teknologi bagi operasional dan pengalaman pelanggan Anda.
                </p>

                {/* Sub-heading 1 */}
                <h3 className="text-lg sm:text-xl font-bold text-[#A8023A] pt-3 pb-1 border-b border-[#E6DED0]/70">
                  Dunia pelayanan kini berubah
                </h3>

                <p>
                  Semakin banyak transaksi selesai di aplikasi. Karena itu, pelanggan yang masih datang ke kantor cabang adalah pelanggan dengan kebutuhan paling nyata, dan juga peluang yang paling berharga.
                </p>

                {/* Blockquote Pull */}
                <blockquote className="my-4 pl-4 sm:pl-5 py-2.5 border-l-4 border-[#C9A24B] bg-[#FDFBF7] rounded-r-xl text-[15px] sm:text-[16px] leading-relaxed text-[#A8023A] font-medium italic">
                  &ldquo;Ironisnya, mereka sering mendapat pengalaman yang lebih lambat daripada di kanal digital, sementara kantor pusat belum memiliki visibilitas yang cukup terhadap apa yang terjadi di jaringan cabangnya.&rdquo;
                </blockquote>

                <p className="font-semibold text-gray-800 pt-1">
                  Karena itu, dekade kedua Exaque berdiri di atas tiga prinsip:
                </p>

                {/* 3 Principles Cards */}
                <div className="grid gap-3 my-3">
                  <div className="bg-[#FAF7F2] border-l-4 border-[#A8023A] rounded-r-xl p-3.5 sm:p-4 shadow-2xs">
                    <h4 className="font-bold text-base sm:text-lg text-[#A8023A] mb-1">
                      Connected.
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      Setiap titik layanan, dari kanal digital hingga meja layanan cabang, terhubung dalam satu perjalanan pelanggan.
                    </p>
                  </div>
                  <div className="bg-[#FAF7F2] border-l-4 border-[#A8023A] rounded-r-xl p-3.5 sm:p-4 shadow-2xs">
                    <h4 className="font-bold text-base sm:text-lg text-[#A8023A] mb-1">
                      Measured.
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      Kinerja pelayanan setiap cabang terlihat dan terukur, sehingga keputusan diambil berdasarkan data.
                    </p>
                  </div>
                  <div className="bg-[#FAF7F2] border-l-4 border-[#A8023A] rounded-r-xl p-3.5 sm:p-4 shadow-2xs">
                    <h4 className="font-bold text-base sm:text-lg text-[#A8023A] mb-1">
                      Managed.
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed m-0">
                      Tim kami memantau dan menindaklanjuti anomali, seperti Waiting Time yang melampaui Service Level, sebelum berdampak pada pelanggan Anda.
                    </p>
                  </div>
                </div>

                {/* Solution Callout Block */}
                <div className="bg-gradient-to-r from-[#A8023A] to-[#7A012A] text-white p-4 sm:p-5 rounded-xl my-4 shadow-sm">
                  <p className="text-sm sm:text-[14.5px] leading-relaxed m-0">
                    Prinsip ini kami wujudkan melalui solusi{" "}
                    <strong className="text-[#F3EBD8] font-bold">
                      Customer Journey Management
                    </strong>{" "}
                    dan{" "}
                    <strong className="text-[#F3EBD8] font-bold">
                      Exaque Managed Service
                    </strong>
                    , karena kami percaya pelayanan terbaik lahir ketika teknologi, data, dan manusia bekerja bersama.
                  </p>
                </div>

                {/* Sub-heading 2 */}
                <h3 className="text-lg sm:text-xl font-bold text-[#A8023A] pt-3 pb-1 border-b border-[#E6DED0]/70">
                  Terima kasih
                </h3>

                <p>
                  Terima kasih yang sebesar-besarnya kepada seluruh klien dan mitra atas kepercayaan dan kolaborasi selama ini. Kepada seluruh rekan Exaque,{" "}
                  <strong className="text-[#7A012A] font-bold">
                    baik yang pernah maupun yang masih menjadi bagian dari perjalanan ini
                  </strong>
                  , terima kasih atas dedikasi yang telah membentuk perusahaan ini.
                </p>

                <p className="text-[15.5px] sm:text-base text-[#A8023A] font-semibold italic">
                  Sepuluh tahun patut kita syukuri. Namun yang lebih penting adalah bagaimana kita membangun sepuluh tahun berikutnya, bersama Anda.
                </p>

                {/* Navigation Links inside Letter */}
                <div className="grid sm:grid-cols-2 gap-3 my-4">
                  <a
                    href="/exaque-managed-service"
                    className="group block p-3.5 rounded-xl border border-[#A8023A] bg-white hover:bg-[#A8023A] transition-all duration-200 text-left shadow-2xs"
                  >
                    <div className="font-bold text-sm text-[#A8023A] group-hover:text-white flex items-center justify-between">
                      Kenali Exaque Managed Service
                      <span className="text-xs transition-transform group-hover:translate-x-1">→</span>
                    </div>
                    <div className="text-xs text-gray-500 group-hover:text-white/85 mt-1 font-normal">
                      Arah baru Exaque untuk dekade kedua
                    </div>
                  </a>
                  <a
                    href="https://10anniversary.exaque.com/journey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-3.5 rounded-xl border border-[#C9A24B] bg-white hover:bg-[#C9A24B] transition-all duration-200 text-left shadow-2xs"
                  >
                    <div className="font-bold text-sm text-[#8A0230] group-hover:text-white flex items-center justify-between">
                      Lihat Jejak 10 Tahun Exaque
                      <span className="text-xs transition-transform group-hover:translate-x-1">↗</span>
                    </div>
                    <div className="text-xs text-gray-500 group-hover:text-white/85 mt-1 font-normal">
                      Album foto dan video perjalanan satu dekade
                    </div>
                  </a>
                </div>

                {/* Blok Penutup dan Tanda Tangan */}
                <div className="pt-4 border-t border-[#EBD5DC] mt-6 flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-xs text-gray-500 italic mb-1">
                      Hormat saya,
                    </p>
                    <h4 className="font-bold text-base sm:text-lg text-[#A8023A]">
                      Enrico Simatupang
                    </h4>
                    <p className="text-xs font-bold text-gray-800 mt-0.5">
                      Founder & Chief Executive Officer
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      PT Exaque Mandiri Makmur &bull; Jakarta, 10 November 2026
                    </p>
                  </div>
                  <div className="text-[11px] font-semibold text-[#8A0230] bg-[#C9A24B]/15 px-3 py-1.5 rounded-lg border border-[#C9A24B]/30">
                    A Decade of Trust &bull; 2016–2026
                  </div>
                </div>
              </div>
            </div>

            {/* Gradien pemudar bawah jika belum scroll mentok */}
            <div
              className={`absolute left-0 right-0 bottom-0 h-16 rounded-b-2xl bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent pointer-events-none transition-opacity duration-300 ${
                isAtEnd ? "opacity-0" : "opacity-100"
              }`}
            />

            {/* Tombol Baca Selengkapnya yang mengarah ke halaman baru surat CEO */}
            <div className="absolute right-5 sm:right-6 bottom-3.5 z-10">
              <Link
                to="/pesan-dari-ceo"
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold text-[#A8023A] bg-white/95 hover:bg-[#A8023A] hover:text-white shadow-sm border border-[#EBD5DC] transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8023A]"
              >
                Baca Selengkapnya
                <svg
                  className="w-3.5 h-3.5 fill-none stroke-current stroke-2 transition-transform duration-200 group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </article>

          {/* ========================================================
              FEATURE ROW: VIDEO (Kiri) & HEADLINE + DESKRIPSI (Kanan)
             ======================================================== */}
          <div className="col-span-1 lg:col-span-2 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-y-9 sm:gap-y-10 gap-x-10 sm:gap-x-12 lg:gap-x-[88px] items-center mt-6 sm:mt-8 lg:mt-11">
            {/* VIDEO PLAYER CARD */}
            <div id="hero-podcast-player" className="relative w-full hero-reveal hero-reveal-d3 lg:col-start-1 lg:row-start-1">
              {/* Blok rose dekoratif di belakang video */}
              <div className="absolute inset-0 translate-x-2.5 sm:translate-x-4 lg:translate-x-[18px] translate-y-3 sm:translate-y-4 lg:translate-y-[18px] bg-[#F4D3DD] opacity-60 rounded-[26px] sm:rounded-[30px] pointer-events-none" />

              {/* Bingkai video */}
              <div className="relative w-full aspect-video bg-black rounded-[18px] sm:rounded-[24px] overflow-hidden shadow-[0_18px_44px_rgba(80,0,28,0.22)] z-[1]">
                {isPlaying ? (
                  ytId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
                      title="Exaque 10th Anniversary Podcast"
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
                    className="group relative w-full h-full border-0 p-0 cursor-pointer overflow-hidden flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8023A]"
                    style={{
                      background:
                        "radial-gradient(120% 90% at 20% 10%, rgba(168, 2, 58, 0.85), rgba(0, 0, 0, 0) 60%), #000000",
                    }}
                    aria-label="Putar Exaque 10th Anniversary Podcast"
                  >
                    {thumbnailUrl ? (
                      <img
                        src={thumbnailUrl}
                        alt="Thumbnail Exaque 10th Anniversary Podcast"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          if (ytId && !e.currentTarget.dataset.fallback) {
                            e.currentTarget.dataset.fallback = "1";
                            e.currentTarget.src = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
                          }
                        }}
                      />
                    ) : null}

                    {/* Gradient & Dark Overlay untuk kedalaman dan kontras tombol play */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/20 group-hover:bg-black/10 transition-all duration-300" />

                    {/* Tombol Play di Tengah */}
                    <span className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 md:w-[84px] md:h-[84px] rounded-full bg-white/95 text-[#A8023A] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white shadow-[0_12px_36px_rgba(0,0,0,0.5)] group-focus-visible:scale-110">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-7 h-7 sm:w-8 sm:h-8 md:w-[32px] md:h-[32px] fill-[#A8023A] ml-1 transition-transform group-hover:scale-105"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* TEKS FITUR & TOMBOL CTA */}
            <div className="hero-reveal hero-reveal-d3 lg:col-start-2 lg:row-start-1 flex flex-col items-start">
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase text-[#A8023A] mb-2 sm:mb-2.5">
                EXAQUE 10TH ANNIVERSARY PODCAST
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[2.65rem] xl:text-[2.9rem] font-extrabold leading-[1.18] tracking-tight text-gray-900">
                Teknologi Semakin Canggih.{" "}
                <span className="text-[#A8023A]">Apakah Pelayanan Semakin Baik?</span>
              </h2>
              <p className="mt-3.5 sm:mt-4 text-base sm:text-[1.05rem] leading-[1.7] text-gray-600 max-w-[48ch]">
                Dari sistem antrean hingga Customer Experience dan AI. Simak
                perspektif Founder &amp; CEO Exaque tentang bagaimana teknologi,
                data, dan manusia membentuk masa depan pelayanan pelanggan.
              </p>
              {ctaLink ? (
                <a
                  href={ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 mt-6 sm:mt-7.5 px-6 sm:px-7.5 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-base text-white shadow-[0_12px_26px_rgba(168,2,58,0.28)] hover:brightness-108 transition-all group"
                  style={{
                    background: "linear-gradient(135deg, #A8023A, #8A0230)",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-white ml-0.5 group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  {computedButtonText}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(true);
                    const playerEl = document.getElementById("hero-podcast-player");
                    if (playerEl && window.innerWidth < 1024) {
                      playerEl.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                  }}
                  className="inline-flex items-center justify-center gap-2.5 mt-6 sm:mt-7.5 px-6 sm:px-7.5 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-base text-white shadow-[0_12px_26px_rgba(168,2,58,0.28)] hover:brightness-108 hover:shadow-[0_16px_32px_rgba(168,2,58,0.35)] transition-all cursor-pointer group"
                  style={{
                    background: "linear-gradient(135deg, #A8023A, #8A0230)",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-white ml-0.5 group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  {computedButtonText}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
