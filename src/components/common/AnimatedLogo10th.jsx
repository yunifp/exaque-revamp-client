import React, { useEffect, useRef } from "react";
import lottie from "lottie-web/build/player/lottie_light";
import logo10thColorData from "../../assets/logo10th.json";
import logo10thWhiteData from "../../assets/logo10th-white.json";

/**
 * Animated 10th Anniversary Exaque Logo
 * - Belum di-scroll / Navbar transparan (isSolid = false): Menggunakan logo putih animasi Lottie baru (dari folder 10TH_Animate_White)
 * - Sudah di-scroll / Navbar solid putih (isSolid = true): Menggunakan logo Lottie animasi berwarna (dari logo10th.json)
 */
export default function AnimatedLogo10th({ isSolid = false, className = "", size = "normal", style = {}, onClick }) {
  // Ref untuk logo putih animasi Lottie baru (saat belum di-scroll / navbar transparan)
  const whiteContainerRef = useRef(null);
  const whiteAnimRef = useRef(null);

  // Ref untuk logo berwarna animasi Lottie (saat sudah di-scroll / navbar solid putih)
  const colorContainerRef = useRef(null);
  const colorAnimRef = useRef(null);

  // Mount Lottie animations
  useEffect(() => {
    // 1. Mount logo putih Lottie
    if (whiteContainerRef.current) {
      if (whiteAnimRef.current) {
        whiteAnimRef.current.destroy();
      }
      whiteAnimRef.current = lottie.loadAnimation({
        container: whiteContainerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: logo10thWhiteData,
      });
    }

    // 2. Mount logo berwarna Lottie
    if (colorContainerRef.current) {
      if (colorAnimRef.current) {
        colorAnimRef.current.destroy();
      }
      colorAnimRef.current = lottie.loadAnimation({
        container: colorContainerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: logo10thColorData,
      });
    }

    return () => {
      if (whiteAnimRef.current) {
        whiteAnimRef.current.destroy();
        whiteAnimRef.current = null;
      }
      if (colorAnimRef.current) {
        colorAnimRef.current.destroy();
        colorAnimRef.current = null;
      }
    };
  }, []);

  const handleClick = (e) => {
    if (whiteAnimRef.current) {
      whiteAnimRef.current.goToAndPlay(0, true);
    }
    if (colorAnimRef.current) {
      colorAnimRef.current.goToAndPlay(0, true);
    }
    if (onClick) {
      onClick(e);
    }
  };

  const sizeClasses =
    size === "small"
      ? "w-[36px] h-[36px] md:w-[40px] md:h-[40px]"
      : "w-[50px] h-[50px] md:w-[58.5px] md:h-[58.5px]";

  return (
    <div
      onClick={handleClick}
      title="Logo 10th Anniversary Exaque • Klik untuk memutar ulang animasi"
      aria-label="Logo 10th Anniversary Exaque"
      className={`relative flex items-center justify-center ${sizeClasses} flex-shrink-0 cursor-pointer select-none transition-all duration-300 hover:scale-105 active:scale-95 ${className}`}
      style={style}
    >
      <div className="relative w-full h-full aspect-square flex-shrink-0">
        {/* 1. Logo Putih Animasi Lottie (Baru dari 10TH_Animate_White) - Aktif saat belum di-scroll / navbar transparan */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 flex items-center justify-center filter drop-shadow(0 2px 8px rgba(0, 0, 0, 0.45)) ${
            !isSolid ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            ref={whiteContainerRef}
            className="logo-10th-container w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:block"
            style={{ transform: "scale(1.42)", transformOrigin: "center center" }}
          />
        </div>

        {/* 2. Logo Berwarna Animasi Lottie (Baru) - Aktif saat sudah di-scroll / navbar solid putih */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 flex items-center justify-center filter drop-shadow(0 4px 12px rgba(169, 2, 58, 0.16)) ${
            isSolid ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            ref={colorContainerRef}
            className="logo-10th-container w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:block"
            style={{ transform: "scale(1.42)", transformOrigin: "center center" }}
          />
        </div>
      </div>
    </div>
  );
}

