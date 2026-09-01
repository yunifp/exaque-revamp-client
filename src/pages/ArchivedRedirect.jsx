import React from "react";
import { Navigate, useParams } from "react-router-dom";
import SEOMeta from "../components/common/SEOMeta";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function ArchivedRedirect() {
  const { "*": path } = useParams();

  // Daftar mapping redirect untuk halaman archived yang memiliki versi baru
  const redirectMap = {
    "managed-service-oleh-exaque": "/solusi", // contoh mapping
    "ritel": "/solusi",
    "visi-nilai": "/tentang-exaque"
  };

  const newPath = redirectMap[path];

  if (newPath) {
    return <Navigate to={newPath} replace />;
  }

  // Jika tidak ada di mapping, kembalikan halaman 410 Gone / No Index
  return (
    <>
      <SEOMeta title="Halaman Tidak Tersedia" description="Halaman ini telah diarsipkan dan tidak lagi tersedia." url="https://exaque.com/archived" />
      <meta name="robots" content="noindex, nofollow" />
      <div className="bg-white min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">410</h1>
        <p className="text-gray-600 text-lg mb-8">Halaman yang Anda cari telah diarsipkan dan tidak lagi tersedia.</p>
        <a href="/" className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-colors">
          Kembali ke Beranda
        </a>
      </div>
    </>
  );
}
