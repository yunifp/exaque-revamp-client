import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SEOMeta from "../components/common/SEOMeta";
import pakRicoImg from "../assets/pak-rico.jpg";

export default function PesanCeo() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#2A2A2A]">
      <SEOMeta
        title="A Decade of Trust | Pesan Founder & CEO Exaque"
        description="Pesan Founder & CEO Exaque dalam rangka 10th Anniversary, 10 November 2026. Connected. Measured. Managed."
        url="https://exaque.com/pesan-dari-ceo"
        exactTitle={true}
      />

      {/* ========================================================
          HERO BANNER
         ======================================================== */}
      <header className="relative bg-gradient-to-br from-[#A9023A] via-[#8A0230] to-[#600121] text-white pt-28 sm:pt-32 pb-24 sm:pb-28 px-4 sm:px-6 text-center overflow-hidden">
        {/* Angka Watermark 10 */}
        <div
          className="absolute -right-6 -bottom-16 sm:-bottom-24 font-serif text-[280px] sm:text-[380px] lg:text-[440px] font-bold text-white/[0.05] pointer-events-none select-none leading-none z-0"
          aria-hidden="true"
        >
          10
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-xs sm:text-[13px] tracking-[0.24em] uppercase text-[#C9A24B] font-bold mb-4 sm:mb-5">
            Pesan Founder &amp; CEO Exaque &nbsp;|&nbsp; 10th Anniversary
          </p>

          <h1 className="font-serif font-bold text-3xl sm:text-5xl lg:text-[56px] text-white leading-[1.15] mb-4 tracking-tight">
            A Decade of Trust.
            <span className="block text-[#C9A24B] text-[0.58em] tracking-[0.02em] mt-3 font-sans font-medium">
              Connected. Measured. Managed.
            </span>
          </h1>

          <p className="text-sm sm:text-[17px] text-white/85 font-medium mt-2">
            Jakarta, 10 November 2026
          </p>

          <hr className="w-16 h-[3px] bg-[#C9A24B] border-0 mx-auto mt-6 rounded-full" />
        </div>
      </header>

      {/* ========================================================
          SURAT UTAMA
         ======================================================== */}
      <main className="max-w-[940px] lg:max-w-[980px] mx-auto px-4 sm:px-6 -mt-12 sm:-mt-16 pb-20 relative z-10">
        <article className="bg-white rounded-2xl border-t-4 border-[#C9A24B] shadow-[0_12px_45px_rgba(122,1,42,0.08)] p-6 sm:p-12 lg:p-16">
          {/* Navigasi Atas */}
          <div className="flex items-center justify-between gap-4 mb-8 pb-6 border-b border-[#E6DED0]">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#A9023A] hover:text-[#7A012A] transition-colors"
            >
              <svg
                className="w-4 h-4 fill-none stroke-current stroke-2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Kembali ke Beranda
            </Link>
            <span className="text-[11px] sm:text-xs font-semibold text-[#8A0230] bg-[#C9A24B]/15 px-3 py-1 rounded-full border border-[#C9A24B]/30">
              Sepuluh Tahun Exaque, 2016–2026
            </span>
          </div>

          {/* Salam Pembuka */}
          <p className="font-serif text-lg sm:text-xl text-[#A9023A] font-bold mb-6">
            Salam hangat untuk seluruh klien, mitra, dan sahabat Exaque,
          </p>

          {/* Paragraf Lead */}
          <p className="font-serif text-xl sm:text-[23px] leading-[1.6] text-[#2A2A2A] mb-6">
            Sepuluh tahun lalu, Exaque memulai perjalanan dengan satu keyakinan:{" "}
            <strong className="text-[#A9023A] font-bold">
              waktu pelanggan sangat berharga
            </strong>
            , dan setiap pengalaman pelayanan mencerminkan bagaimana sebuah
            institusi menghargai pelanggannya.
          </p>

          {/* Paragraf 2 */}
          <p className="text-[17px] sm:text-[18px] leading-[1.75] text-[#2A2A2A] mb-6">
            Kami memulainya bersama tim perintis yang percaya bahwa pelayanan di
            cabang bisa menjadi lebih tertib, efisien, dan manusiawi. Sepanjang
            satu dekade, kami telah dipercaya mendampingi{" "}
            <strong className="text-[#7A012A] font-bold">
              institusi-institusi terkemuka
            </strong>{" "}
            di sektor perbankan, pembiayaan, asuransi, telekomunikasi, dan ritel.
            Kepercayaan Anda adalah fondasi terpenting perjalanan kami.
          </p>

          {/* Paragraf 3 */}
          <p className="text-[17px] sm:text-[18px] leading-[1.75] text-[#2A2A2A] mb-6">
            Sepuluh tahun pertama mengajarkan kami bahwa{" "}
            <strong className="text-[#7A012A] font-bold">
              keandalan sistem hanyalah awal
            </strong>
            . Ukuran yang sebenarnya adalah nilai yang dihasilkan teknologi bagi
            operasional dan pengalaman pelanggan Anda.
          </p>

          {/* Subheading 1 */}
          <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-[#A9023A] mt-10 mb-4 leading-snug">
            Dunia pelayanan kini berubah
          </h2>

          {/* Paragraf 4 */}
          <p className="text-[17px] sm:text-[18px] leading-[1.75] text-[#2A2A2A] mb-6">
            Semakin banyak transaksi selesai di aplikasi. Karena itu, pelanggan
            yang masih datang ke kantor cabang adalah pelanggan dengan kebutuhan
            paling nyata, dan juga peluang yang paling berharga.
          </p>

          {/* Blockquote Pull */}
          <blockquote className="my-8 pl-5 sm:pl-7 py-3 border-l-4 border-[#C9A24B] bg-[#FDFBF7] rounded-r-xl font-serif text-lg sm:text-[22px] leading-relaxed text-[#A9023A] italic">
            &ldquo;Ironisnya, mereka sering mendapat pengalaman yang lebih lambat
            daripada di kanal digital, sementara kantor pusat belum memiliki
            visibilitas yang cukup terhadap apa yang terjadi di jaringan
            cabangnya.&rdquo;
          </blockquote>

          {/* Principles Intro */}
          <p className="font-serif text-lg sm:text-[21px] font-semibold text-[#2A2A2A] mt-10 mb-5">
            Karena itu, dekade kedua Exaque berdiri di atas tiga prinsip:
          </p>

          {/* 3 Principles Cards */}
          <div className="grid gap-4 mb-8">
            <div className="bg-[#FAF7F2] border-l-4 border-[#A9023A] rounded-r-xl p-5 sm:p-6 shadow-2xs">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#A9023A] mb-2">
                Connected.
              </h3>
              <p className="text-base sm:text-[17px] text-gray-700 leading-relaxed m-0">
                Setiap titik layanan, dari kanal digital hingga meja layanan
                cabang, terhubung dalam satu perjalanan pelanggan.
              </p>
            </div>

            <div className="bg-[#FAF7F2] border-l-4 border-[#A9023A] rounded-r-xl p-5 sm:p-6 shadow-2xs">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#A9023A] mb-2">
                Measured.
              </h3>
              <p className="text-base sm:text-[17px] text-gray-700 leading-relaxed m-0">
                Kinerja pelayanan setiap cabang terlihat dan terukur, sehingga
                keputusan diambil berdasarkan data.
              </p>
            </div>

            <div className="bg-[#FAF7F2] border-l-4 border-[#A9023A] rounded-r-xl p-5 sm:p-6 shadow-2xs">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#A9023A] mb-2">
                Managed.
              </h3>
              <p className="text-base sm:text-[17px] text-gray-700 leading-relaxed m-0">
                Tim kami memantau dan menindaklanjuti anomali, seperti Waiting
                Time yang melampaui Service Level, sebelum berdampak pada
                pelanggan Anda.
              </p>
            </div>
          </div>

          {/* Solution Callout */}
          <div className="bg-gradient-to-r from-[#A9023A] to-[#7A012A] text-white p-6 sm:p-7 rounded-xl my-6 mb-8 shadow-sm">
            <p className="text-base sm:text-[17px] leading-relaxed m-0">
              Prinsip ini kami wujudkan melalui solusi{" "}
              <strong className="text-[#F3EBD8] font-bold">
                Customer Journey Management
              </strong>{" "}
              dan{" "}
              <strong className="text-[#F3EBD8] font-bold">
                Exaque Managed Service
              </strong>
              , karena kami percaya pelayanan terbaik lahir ketika teknologi, data,
              dan manusia bekerja bersama.
            </p>
          </div>

          {/* Subheading 2 */}
          <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-[#A9023A] mt-10 mb-4 leading-snug">
            Terima kasih
          </h2>

          <p className="text-[17px] sm:text-[18px] leading-[1.75] text-[#2A2A2A] mb-6">
            Terima kasih yang sebesar-besarnya kepada seluruh klien dan mitra atas
            kepercayaan dan kolaborasi selama ini. Kepada seluruh rekan Exaque,{" "}
            <strong className="text-[#7A012A] font-bold">
              baik yang pernah maupun yang masih menjadi bagian dari perjalanan
              ini
            </strong>
            , terima kasih atas dedikasi yang telah membentuk perusahaan ini.
          </p>

          <p className="font-serif text-xl sm:text-[22px] leading-relaxed text-[#A9023A] font-semibold my-8">
            Sepuluh tahun patut kita syukuri. Namun yang lebih penting adalah
            bagaimana kita membangun sepuluh tahun berikutnya, bersama Anda.
          </p>

          {/* Navigation Links */}
          <nav className="grid gap-3.5 my-9" aria-label="Tautan lanjutan">
            <Link
              to="/exaque-managed-service"
              className="group block p-4 sm:p-5 rounded-xl border border-[#A9023A] bg-[#A9023A] hover:bg-[#7A012A] text-white transition-all shadow-sm"
            >
              <div className="font-bold text-base sm:text-lg flex items-center justify-between">
                Kenali Exaque Managed Service
                <span className="text-sm transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <div className="text-xs sm:text-sm text-white/80 mt-1 font-normal">
                Arah baru Exaque untuk dekade kedua
              </div>
            </Link>

            <a
              href="https://10anniversary.exaque.com/journey"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-4 sm:p-5 rounded-xl border border-[#A9023A] bg-white hover:bg-[#A9023A] text-[#A9023A] hover:text-white transition-all shadow-2xs"
            >
              <div className="font-bold text-base sm:text-lg flex items-center justify-between">
                Lihat Jejak 10 Tahun Exaque
                <span className="text-sm transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </div>
              <div className="text-xs sm:text-sm text-gray-500 group-hover:text-white/80 mt-1 font-normal">
                Album foto dan video perjalanan satu dekade
              </div>
            </a>
          </nav>

          {/* Tanda Tangan */}
          <div className="border-t border-[#E6DED0] pt-8 mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/enrico-simatupang-87211629a/"
                target="_blank"
                rel="noopener noreferrer"
                className="group/avatar flex-shrink-0"
                title="Lihat Profil LinkedIn Enrico Simatupang"
                aria-label="Buka profil LinkedIn Enrico Simatupang (tab baru)"
              >
                <img
                  src={pakRicoImg}
                  alt="Enrico Simatupang, Founder & CEO Exaque"
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#A9023A] shadow-xs group-hover/avatar:scale-105 group-hover/avatar:border-[#0077b5] transition-all"
                />
              </a>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Hormat saya,</p>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#A9023A]">
                  <a
                    href="https://www.linkedin.com/in/enrico-simatupang-87211629a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-[#0077b5] transition-colors"
                    title="Lihat Profil LinkedIn Enrico Simatupang"
                  >
                    Enrico Simatupang
                  </a>
                </h3>
                <p className="text-sm font-bold text-gray-800">
                  Founder &amp; Chief Executive Officer
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  PT Exaque Mandiri Makmur &bull; Jakarta, 10 November 2026
                </p>
              </div>
            </div>

            <div className="sm:text-right">
              <span className="inline-block font-serif text-xs font-bold text-[#C9A24B] tracking-[0.2em] uppercase">
                A Decade of Trust &bull; 2016–2026
              </span>
              <p className="text-xs text-gray-400 mt-1">
                &copy; 2026 PT Exaque Mandiri Makmur
              </p>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
