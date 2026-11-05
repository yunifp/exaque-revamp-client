import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import MegaMenuItem from "./MegaMenuItem";

const MegaMenuSolusi = () => {
  const [activePlatform, setActivePlatform] = useState("qmatic-orchestra");
  const location = useLocation();

  const isManagedServices =
    location.pathname === "/exaque-managed-service";

  const handleSectionClick = (e, sectionId) => {
    if (isManagedServices) {
      e.preventDefault();
      window.history.pushState(null, "", `${location.pathname}#${sectionId}`);
      const el = document.getElementById(sectionId);
      if (el) {
        const navOffset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="w-full grid grid-cols-3 gap-8">
      <div className="col-span-1">
        <h3 className="text-sm font-semibold uppercase text-white tracking-wider border-b border-white pb-3">
          Platform
        </h3>{" "}
        <ul className="mt-4 space-y-4">
          <li onMouseEnter={() => setActivePlatform("qmatic-orchestra")}>
            <MegaMenuItem
              to="/qmatic-orchestra"
              className={
                activePlatform === "qmatic-orchestra"
                  ? "!border-l-accent"
                  : ""
              }
              title="Qmatic Orchestra"
              description="Solusi enterprise yang dibuat untuk organisasi dengan persyaratan kompleks, beberapa titik layanan, dan cabang."
            />
          </li>
          <li onMouseEnter={() => setActivePlatform("managed-service")}>
            <MegaMenuItem
              to="/exaque-managed-service"
              className={
                activePlatform === "managed-service"
                  ? "!border-l-accent"
                  : ""
              }
              title="Exaque Managed Service"
              description="Performa setiap cabang terukur dan terkelola, dibayar per cabang aktif."
            />
          </li>
        </ul>
      </div>

      <div className="col-span-2">
        <h3 className="text-sm font-semibold uppercase text-white tracking-wider border-b border-white pb-3 transition-opacity duration-300">
          Solusi
        </h3>

        <div className="relative">
          {/* Qmatic Orchestra Solutions */}
          <div
            className={`mt-4 grid grid-cols-2 gap-x-6 gap-y-4 transition-all duration-300 ${
              activePlatform === "qmatic-orchestra"
                ? "opacity-100 relative z-10"
                : "opacity-0 absolute inset-0 pointer-events-none z-0"
            }`}
          >
            <MegaMenuItem
              to="/manajemen-antrean"
              title="Manajemen Antrean"
              description="Melayani pelanggan secara efisien dan mengurangi waktu tunggu."
            />
            <MegaMenuItem
              to="/manajemen-perjalanan-pelanggan"
              title="Manajemen Perjalanan Pelanggan"
              description="Mengelola alur dari awal hingga akhir, dan dapatkan wawasan tentang operasi Anda"
            />
            <MegaMenuItem
              to="/antrean-virtual"
              title="Antrean Virtual"
              description="Memungkinkan pelanggan menunggu di mana saja dengan tiket seluler"
            />
            <MegaMenuItem
              to="/manajemen-jadwal-janji-temu"
              title="Manajemen Jadwal Janji Temu"
              description="Meningkatkan operasi dengan pemesanan janji temu dan manajemen kedatangan"
            />
            <MegaMenuItem
              to="/rapat-virtual"
              title="Rapat Virtual"
              description="Pelayanan pelanggan dapat dilakukan dari jarak jauh melalui aplikasi rapat virtual."
            />
            <MegaMenuItem
              to="/manajemen-pengunjung"
              title="Manajemen Pengunjung"
              description="Kelola aliran pengunjung Anda dengan sistem pendaftaran pengunjung yang dirancang untuk meningkatkan efisiensi operasional dan menjaga keamanan pengunjung serta staf."
            />
          </div>

          {/* Managed Service Solutions */}
          <div
            className={`mt-4 grid grid-cols-2 gap-x-6 gap-y-4 transition-all duration-300 ${
              activePlatform === "managed-service"
                ? "opacity-100 relative z-10"
                : "opacity-0 absolute inset-0 pointer-events-none z-0"
            }`}
          >
            <MegaMenuItem
              to="/exaque-managed-service#cara-kerja"
              onClick={(e) => handleSectionClick(e, "cara-kerja")}
              title="Cara Kerja"
              description="Pemantauan indikator harian, validasi penyebab, dan rekomendasi tindak lanjut operasional."
            />
            <MegaMenuItem
              to="/exaque-managed-service#cakupan-layanan"
              onClick={(e) => handleSectionClick(e, "cakupan-layanan")}
              title="Cakupan Layanan"
              description="Platform & technical support, business support, serta pelaporan dan review berkala."
            />
            <MegaMenuItem
              to="/exaque-managed-service#model-biaya"
              onClick={(e) => handleSectionClick(e, "model-biaya")}
              title="Model Biaya"
              description="Struktur biaya terprediksi berbasis cabang aktif dengan transparansi penuh."
            />
            <MegaMenuItem
              to="/exaque-managed-service#faq"
              onClick={(e) => handleSectionClick(e, "faq")}
              title="FAQ"
              description="Jawaban atas pertanyaan umum seputar implementasi, integrasi, dan layanan."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenuSolusi;
