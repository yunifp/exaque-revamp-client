import React from "react";
// Import halaman yang SUDAH ADA saja
import Home from "./pages/Home";
import TentangKami from "./pages/TentangKami";
import KontakPage from "./pages/KontakPage";
import Faq from "./pages/Faq";
import BlogPage from "./pages/BlogPage";
import KisahPelanggan from "./pages/KisahPelangganPage";
import PanduanSistemManajemenAntrean from "./pages/PanduanSistemManajemenAntrean";
import ManagedServices from "./pages/ManagedServices";


// --- Helper untuk membuat struktur route ---
const createRoute = (path, element, meta) => ({
  path,
  element,
  meta
});

// --- DAFTAR ROUTE (Hanya yang penting dulu) ---
export const routes = [
  createRoute("/", <Home />, {
    title: "Beranda",
    description: "Solusi manajemen antrean dan pengalaman pelanggan enterprise.",
    keywords: "home, dashboard, antrean, queue"
  }),
  
  createRoute("/tentang-kami", <TentangKami />, {
    title: "Tentang Exaque",
    description: "Profil perusahaan, visi misi, dan sejarah Exaque.",
    keywords: "profil, perusahaan, sejarah, visi misi"
  }),

  createRoute("/kontak", <KontakPage />, {
    title: "Hubungi Kami",
    description: "Hubungi sales atau support teknis kami.",
    keywords: "kontak, lokasi, email, telepon, sales, support"
  }),

  createRoute("/faq", <Faq />, {
    title: "FAQ",
    description: "Pertanyaan yang sering diajukan seputar produk dan layanan.",
    keywords: "tanya jawab, help, bantuan, cara kerja"
  }),
  createRoute("/panduan-sistem-manajemen-antrean", <PanduanSistemManajemenAntrean />, {
    title: "Panduan Sistem Manajemen Antrian Exaque",
    description: "Sistem manajemen antrian membantu mengurangi waktu tunggu dan mengelola alur pelanggan. Pelajari cara kerja, manfaat, dan solusi yang tepat untuk bisnis Anda.",
    keywords: "panduan, sistem antrean, manajemen antrean, queue management"
  }),
  createRoute("/blog", <BlogPage />, { title: "Blog", description: "Indeks artikel dan wawasan.", keywords: "blog, artikel" }),
  createRoute("/kisah-pelanggan", <KisahPelanggan  />, { title: "Kisah Pelanggan", description: "Daftar studi kasus klien.", keywords: "klien, portfolio" }),
  createRoute("/managed-services", <ManagedServices />, { title: "Managed Services", description: "Menjaga layanan tetap berjalan tanpa bergantung pada perangkat yang menua.", keywords: "managed services, opex, layanan" }),
];