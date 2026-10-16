import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Outlet, Navigate } from "react-router-dom";
import { routes } from "./routes";

import Home from "./pages/Home";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Product from "./pages/Product";
import JanjiTemuDigital from "./pages/JanjiTemuDigital";
import PerencanaanSumberDaya from "./pages/PerencanaanSumberDaya";
import MobileTicket from "./pages/MobileTicket";
import UmpanBalikPelanggan from "./pages/UmpanBalikPelanggan";
import BussinessIntelligence from "./pages/BussinessIntelligence";
import PesanOtomatis from "./pages/PesanOtomatis";
import KeamananSistem from "./pages/KeamananSistem";
import KiosLayananMandiri from "./pages/KiosLayananMandiri";
import TampilanPapanInformasiDigital from "./pages/TampilanPapanInformasiDigital";
import PengumumanSuaraOtomatis from "./pages/PengumumanSuaraOtomatis";
import DukunganPerangkatLunak from "./pages/DukunganPerangkatLunak";
import ManajemenPengunjung from "./pages/ManajemenPengunjung";
import SearchPage from "./pages/SearchPage";

import KisahPelanggan from "./pages/KisahPelangganPage";
import DetailKisahPelanggan from "./pages/DetailKisahPelanggan";
import Faq from "./pages/Faq";
import BlogPage from "./pages/BlogPage";
import DetailBlog from "./pages/DetailBlog";
import TentangKami from "./pages/TentangKami";
import PanduanSistemManajemenAntrean from "./pages/PanduanSistemManajemenAntrean";
import ArchivedRedirect from "./pages/ArchivedRedirect";
import ManagedServices from "./pages/ManagedServices";

import Solusi from "./pages/Solution";
import ManajemenAntrean from "./pages/ManajemenAntrean";
import ManajemenPerjalananPelanggan from "./pages/ManajemenPerjalananPelanggan";
import ManajemenJadwalJanjiTemu from "./pages/ManajemenJadwalJanjiTemu";
import AntreanVirtual from "./pages/AntreanVirtual";
import RapatVirtual from "./pages/RapatVirtual";
import Integrasi from "./pages/Integration";
import Salesforce from "./pages/Salesforce";
import PowerBI from "./pages/PowerBI";

import KontakPage from "./pages/KontakPage";
import NotFoundPage from "./pages/NotFoundPage";
// --- KOMPONEN BARU UNTUK SCROLL KE ATAS ---

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { AuthProvider, useAuth } from "./context/AuthContext";

import AdminLayout from "./pages/admin/Admin";
import Dashboard from "./components/admin/Dashboard";
import Artikel from "./pages/admin/Artikel";
import ArtikelForm from "./pages/admin/ArtikelForm";
import ArtikelPreview from "./pages/admin/ArtikelPreview";
import KisahPelangganForm from "./pages/admin/KisahPelangganForm";
import KategoriKisahPelanggan from "./pages/admin/KategoriKisah";
import Kategoriartikel from "./pages/admin/KategoriArtikel";
// Mengganti AdminKisahPelanggan dengan KisahPelanggan untuk admin route, 
// atau memastikan nama import konsisten
import AdminKisahPelanggan from "./pages/admin/KisahPelanggan"; 
import PermintaanPelanggan from "./pages/admin/PermintaanPelanggan";
import KisahPelangganPreview from "./pages/admin/KisahPelangganPreview";
import ChatbotFloating from "./components/common/ChatbotFloating";

const ScrollToTop = ({ children }) => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "");
      const scrollToTarget = () => {
        const element = document.getElementById(targetId);
        if (element) {
          const navOffset = 70;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;
          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: "smooth",
          });
          return true;
        }
        return false;
      };

      if (!scrollToTarget()) {
        const timer1 = setTimeout(scrollToTarget, 100);
        const timer2 = setTimeout(scrollToTarget, 350);
        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return children;
};

const MainLayout = () => {
  const { pathname } = useLocation();
  const hideFooter =
    pathname === "/exaque-managed-service" ||
    pathname === "/exaque-managed-branch-performance";
  return (
    <> <Navbar /> <main> <Outlet /> <ChatbotFloating /> </main> {!hideFooter && <Footer />} </>
  );
};

const ProtectedRoute = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

const GuestRoute = () => {
  const { user } = useAuth();
  return !user ? <Outlet /> : <Navigate to="/admin/dashboard" replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            {/* 1. ROUTE FRONTEND (MENGGUNAKAN MainLayout) */}
            <Route element={<MainLayout />}>
              {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
            ))}
              {/* Route Utama Produk/Halaman Statis */}
              <Route path="/" element={<Home />} />
              <Route path="/qmatic-orchestra" element={<Product />} />
              <Route path="/janji-temu" element={<JanjiTemuDigital />} />
              <Route path="/perencanaan-sumber-daya" element={<PerencanaanSumberDaya />} />
              <Route path="/mobile-ticket" element={<MobileTicket />} />
              <Route path="/umpan-balik" element={<UmpanBalikPelanggan />} />
              <Route path="/business-intelligence" element={<BussinessIntelligence />} />
              <Route path="/pesan-otomatis" element={<PesanOtomatis />} />
              <Route path="/keamanan-sistem" element={<KeamananSistem />} />
              <Route path="/kios-layanan-mandiri" element={<KiosLayananMandiri />} />
              <Route path="/tampilan-papan-informasi-digital" element={<TampilanPapanInformasiDigital />} />
              <Route path="/pengumuman-suara-otomatis" element={<PengumumanSuaraOtomatis />} />
              <Route path="/dukungan-perangkat-lunak" element={<DukunganPerangkatLunak />} />
              <Route path="/tentang-exaque" element={<TentangKami />} />
              <Route path="/kontak" element={<KontakPage />} />
              <Route path="/demo" element={<KontakPage />} />
              <Route path="/pencarian" element={<SearchPage />} />

              {/* Route Solusi */}
              <Route path="/solusi" element={<Solusi />} />
              <Route path="/manajemen-antrean" element={<ManajemenAntrean />} />
              <Route path="/manajemen-perjalanan-pelanggan" element={<ManajemenPerjalananPelanggan />} />
              <Route path="/manajemen-jadwal-janji-temu" element={<ManajemenJadwalJanjiTemu />} />
              <Route path="/antrean-virtual" element={<AntreanVirtual />} />
              <Route path="/rapat-virtual" element={<RapatVirtual />} />
              <Route path="/manajemen-pengunjung" element={<ManajemenPengunjung />} />
              <Route path="/integrasi" element={<Integrasi />} />
              <Route path="/salesforce" element={<Salesforce />} />
              <Route path="/power-bi" element={<PowerBI />} />

              {/* Route Konten */}
              <Route path="/kisah-pelanggan" element={<KisahPelanggan />} />
              <Route path="/kisah-pelanggan/:slug" element={<DetailKisahPelanggan />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<DetailBlog />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/panduan-sistem-manajemen-antrean" element={<PanduanSistemManajemenAntrean />} />
              <Route path="/archived/*" element={<ArchivedRedirect />} />
              <Route path="/exaque-managed-service" element={<ManagedServices />} />
              <Route path="/exaque-managed-branch-performance" element={<ManagedServices />} />
            </Route>
              <Route path="*" element={<NotFoundPage />} />

            {/* 2. ROUTE LOGIN (Guest Route) */}
            <Route element={<GuestRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/lupa-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
            </Route>

            {/* 3. ROUTE ADMIN (Protected Route) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                
                <Route path="artikel" element={<Artikel />} />
                <Route path="kategori-artikel" element={<Kategoriartikel />} />
                <Route path="artikel/tambah" element={<ArtikelForm />} />
                <Route path="artikel/edit/:id" element={<ArtikelForm />} />
                 <Route path="artikel/preview/:id" element={<ArtikelPreview />} />
                <Route path="kisah-pelanggan/preview/:id" element={<KisahPelangganPreview />} />
                <Route path="kisah-pelanggan" element={<AdminKisahPelanggan />} /> 
                <Route path="kategori-kisah" element={<KategoriKisahPelanggan />} /> 
                <Route path="kisah-pelanggan/tambah" element={<KisahPelangganForm />} />
                <Route path="kisah-pelanggan/edit/:id" element={<KisahPelangganForm />} />
                <Route path="permintaan-demo" element={<PermintaanPelanggan />} />
              </Route>
            </Route>
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;