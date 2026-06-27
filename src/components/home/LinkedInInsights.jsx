import React, { useEffect } from 'react';

const LinkedInInsights = () => {
  // Ganti FEED_ID dengan Feed ID atau string unik dari akun Curator.io Anda
  // Contoh: '12345678-abcd-1234-abcd-12345678abcd'
  const feedId = "8411033f-0dd0-45d8-820a-b8eff99e6f8b"; 

  useEffect(() => {
    if (feedId === "YOUR_CURATOR_FEED_ID") return;

    // Menghindari duplikasi script jika komponen dirender ulang
    if (!document.getElementById('curator-script')) {
      const script = document.createElement('script');
      script.id = 'curator-script';
      script.async = true;
      script.charset = 'UTF-8';
      script.src = `https://cdn.curator.io/published/${feedId}.js`;
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(script, firstScript);
    }
  }, [feedId]);

  return (
    <section className="py-16 md:py-24 bg-subtle-light">
      <div className="container mx-auto px-5 md:px-8 max-w-7xl">
        <div className="text-center mb-12 space-y-4">
          <span className="inline-block px-4 py-1.5 bg-accent-light text-accent text-xs md:text-sm font-bold uppercase tracking-wider rounded-full">
            Insights & Updates
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Dari LinkedIn Exaque
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            Perspektif, <span className="italic">case study</span>, dan update terbaru seputar operasional bisnis dan ekosistem transaksi.
          </p>
        </div>
        
        {/* Curator Feed Container */}
        <div id="curator-feed-default-feed-layout" className="w-full mx-auto">
          {feedId === "YOUR_CURATOR_FEED_ID" ? (
            <div className="text-gray-500 border-2 border-dashed border-gray-300 p-10 rounded-xl text-center w-full">
              <p className="font-semibold mb-2">Curator.io Feed Placeholder</p>
              <p className="text-sm">Silakan masukkan Feed ID Anda pada komponen <code>LinkedInInsights.jsx</code></p>
            </div>
          ) : (
            <a href="https://curator.io" target="_blank" rel="noreferrer" className="crt-logo crt-tag hidden">
              Powered by Curator.io
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default LinkedInInsights;
