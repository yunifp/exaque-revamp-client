import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import MegaMenuItem from "./MegaMenuItem";

const MegaMenuSolusi = () => {
  const [activePlatform, setActivePlatform] = useState("qmatic-orchestra");
  const location = useLocation();

  const isManagedServices =
    location.pathname === "/exaque-managed-service" ||
    location.pathname === "/exaque-managed-branch-performance";

  const handleSectionClick = (e, sectionId) => {
    if (isManagedServices) {
      e.preventDefault();
      window.history.pushState(null, "", `${location.pathname}#${sectionId}`);
      const el = document.getElementById(sectionId);
      if (el) {
        const navOffset = 70;
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
              title="Qmatic Orchestra"
              description="Solusi enterprise yang dibuat untuk organisasi dengan persyaratan kompleks, beberapa titik layanan, dan cabang."
            />
          </li>
          <li onMouseEnter={() => setActivePlatform("managed-service")}>
            <MegaMenuItem
              to="#"
              onClick={(e) => {
                e.preventDefault();
                setActivePlatform("managed-service");
              }}
              title="Managed branch performance"
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
              to="/exaque-managed-branch-performance#performa-jaringan-cabang"
              onClick={(e) => handleSectionClick(e, "performa-jaringan-cabang")}
              title="Performa Jaringan Cabang"
              description="Waktu tunggu dan pemenuhan SLA setiap cabang, terpantau dari kantor pusat."
            />
            <MegaMenuItem
              to="/exaque-managed-branch-performance#kepuasan-nasabah-terukur"
              onClick={(e) => handleSectionClick(e, "kepuasan-nasabah-terukur")}
              title="Kepuasan Nasabah Terukur"
              description="CSAT harian per cabang, menggantikan survei berkala yang mahal dan terlambat."
            />
            <MegaMenuItem
              to="/exaque-managed-branch-performance#layanan-nasabah-prioritas"
              onClick={(e) => handleSectionClick(e, "layanan-nasabah-prioritas")}
              title="Layanan Nasabah Prioritas"
              description="Petugas tahu saat nasabah prioritas tiba, tanpa melanggar kebijakan TI."
            />
            <MegaMenuItem
              to="/exaque-managed-branch-performance#standardisasi-layanan-lintas-cabang"
              onClick={(e) => handleSectionClick(e, "standardisasi-layanan-lintas-cabang")}
              title="Standardisasi Layanan Lintas Cabang"
              description="Satu standar pengalaman di seluruh jaringan, termasuk pasca-merger atau rebranding."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenuSolusi;
