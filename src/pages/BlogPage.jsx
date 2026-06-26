import React from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/common/Hero";
import BlogMainSection from "../components/informasi/BlogMainSection";

import heroBg from "../assets/hero-blog.webp";

function BlogPage() {
  const location = useLocation();
  
  // Tangkap state yang dikirimkan dari halaman DetailBlog
  const authorName = location.state?.authorName;
  const authorId = location.state?.authorId;
  const categoryName = location.state?.category;

  const heroProps = {
    // Sesuaikan teks Hero jika sedang melihat spesifik penulis atau kategori
    welcomeText: authorName ? "Penulis" : categoryName ? "Kategori" : "Informasi",
    title: authorName ? `Artikel oleh ${authorName}` : categoryName ? `Kategori: ${categoryName}` : "Blog Exaque",
    subtitle: authorName
      ? `Kumpulan artikel, wawasan, dan praktik terbaik yang ditulis langsung oleh ${authorName}.`
      : "Temukan wawasan, tren industri, dan praktik terbaik seputar Customer Journey Management dan optimalisasi layanan dari para ahli kami.",
    imageUrl: heroBg,
    textAlign: "text-center mx-auto",
    buttonJustify: "justify-center",
    button1Text: "Permintaan Demo",
    button1Link: "/demo",
    button2Text: "Kontak",
    button2Link: "/kontak",
  };

  return (
    <div className="bg-white min-h-screen">
      <Hero {...heroProps} />
      <div className="py-8 md:py-20 space-y-15 md:space-y-20">
        {/* Lempar authorId dan category ke komponen yang merender list artikel */}
        <BlogMainSection authorId={authorId} category={categoryName} />
      </div>
    </div>
  );
}

export default BlogPage;