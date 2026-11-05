import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const templatePath = path.resolve(distDir, 'index.html');

// Daftar halaman statis utama
const staticPages = [
  { path: '/', file: '/src/pages/Home.jsx', defaultTitle: 'Exaque — Solusi Sistem Manajemen Antrean & Pengalaman Pelanggan Enterprise' },
  { path: '/sistem-manajemen-antrian', file: '/src/pages/PanduanSistemManajemenAntrean.jsx', defaultTitle: 'Sistem Manajemen Antrian: Pengertian, Cara Kerja, Manfaat, dan Penerapannya di Berbagai Industri - Exaque' },
  { path: '/tentang-exaque', file: '/src/pages/TentangKami.jsx' },
  { path: '/tentang-kami', file: '/src/pages/TentangKami.jsx' },
  { path: '/kontak', file: '/src/pages/KontakPage.jsx' },
  { path: '/demo', file: '/src/pages/KontakPage.jsx' },
  { path: '/faq', file: '/src/pages/Faq.jsx' },
  { path: '/solusi', file: '/src/pages/Solution.jsx' },
  { path: '/manajemen-antrean', file: '/src/pages/ManajemenAntrean.jsx' },
  { path: '/manajemen-perjalanan-pelanggan', file: '/src/pages/ManajemenPerjalananPelanggan.jsx' },
  { path: '/manajemen-jadwal-janji-temu', file: '/src/pages/ManajemenJadwalJanjiTemu.jsx' },
  { path: '/antrean-virtual', file: '/src/pages/AntreanVirtual.jsx' },
  { path: '/rapat-virtual', file: '/src/pages/RapatVirtual.jsx' },
  { path: '/manajemen-pengunjung', file: '/src/pages/ManajemenPengunjung.jsx' },
  { path: '/integrasi', file: '/src/pages/Integration.jsx' },
  { path: '/salesforce', file: '/src/pages/Salesforce.jsx' },
  { path: '/power-bi', file: '/src/pages/PowerBI.jsx' },
  { path: '/qmatic-orchestra', file: '/src/pages/Product.jsx' },
  { path: '/janji-temu', file: '/src/pages/JanjiTemuDigital.jsx' },
  { path: '/perencanaan-sumber-daya', file: '/src/pages/PerencanaanSumberDaya.jsx' },
  { path: '/mobile-ticket', file: '/src/pages/MobileTicket.jsx' },
  { path: '/umpan-balik', file: '/src/pages/UmpanBalikPelanggan.jsx' },
  { path: '/business-intelligence', file: '/src/pages/BussinessIntelligence.jsx' },
  { path: '/pesan-otomatis', file: '/src/pages/PesanOtomatis.jsx' },
  { path: '/keamanan-sistem', file: '/src/pages/KeamananSistem.jsx' },
  { path: '/kios-layanan-mandiri', file: '/src/pages/KiosLayananMandiri.jsx' },
  { path: '/tampilan-papan-informasi-digital', file: '/src/pages/TampilanPapanInformasiDigital.jsx' },
  { path: '/pengumuman-suara-otomatis', file: '/src/pages/PengumumanSuaraOtomatis.jsx' },
  { path: '/dukungan-perangkat-lunak', file: '/src/pages/DukunganPerangkatLunak.jsx' },
  { path: '/exaque-managed-branch-performance', file: '/src/pages/ManagedServices.jsx' },
  { path: '/exaque-managed-service', file: '/src/pages/ExaqueManagedService.jsx' },
  { path: '/blog', file: '/src/pages/BlogPage.jsx' },
  { path: '/kisah-pelanggan', file: '/src/pages/KisahPelangganPage.jsx' },
];

function sanitizeMetaContent(content) {
  if (!content) return '';
  return content.replace(/"/g, '&quot;');
}

async function prerender() {
  console.log('🚀 Starting Pre-rendering (SSG)...');

  if (!fs.existsSync(templatePath)) {
    console.error('❌ dist/index.html not found! Run "vite build" first.');
    process.exit(1);
  }

  const baseTemplate = fs.readFileSync(templatePath, 'utf-8');

  // Start Vite custom instance for SSR evaluation
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    root: rootDir,
  });

  const renderedRoutes = [];

  try {
    for (const page of staticPages) {
      try {
        const pageModule = await vite.ssrLoadModule(page.file);
        const Page = pageModule.default;

        const helmetContext = {};
        const appHtml = renderToString(
          React.createElement(
            HelmetProvider,
            { context: helmetContext },
            React.createElement(
              MemoryRouter,
              { initialEntries: [page.path] },
              React.createElement(Page)
            )
          )
        );

        // Extract metadata rendered in output
        const titleMatch = appHtml.match(/<title>([^<]*)<\/title>/);
        const title = titleMatch ? titleMatch[1] : (page.defaultTitle || 'Exaque — Solusi Sistem Manajemen Antrean');

        const descMatch = appHtml.match(/<meta\s+name="description"\s+content="([^"]*)"/);
        const description = descMatch ? descMatch[1] : 'Exaque menghadirkan solusi sistem manajemen antrean terintegrasi (queue management system) dan customer journey enterprise.';

        const fullUrl = `https://exaque.com${page.path === '/' ? '' : page.path}`;

        // Build customized HTML
        let pageHtml = baseTemplate;

        // 1. Update <title>
        pageHtml = pageHtml.replace(
          /<title>.*?<\/title>/s,
          `<title>${title}</title>`
        );

        // 2. Update <meta name="description">
        if (pageHtml.includes('<meta name="description"')) {
          pageHtml = pageHtml.replace(
            /<meta name="description"[^>]*>/,
            `<meta name="description" content="${sanitizeMetaContent(description)}" />`
          );
        }

        // 3. Update canonical URL
        if (pageHtml.includes('<link rel="canonical"')) {
          pageHtml = pageHtml.replace(
            /<link rel="canonical"[^>]*>/,
            `<link rel="canonical" href="${fullUrl}" />`
          );
        }

        // 4. Update OpenGraph tags
        pageHtml = pageHtml.replace(
          /<meta property="og:title"[^>]*>/,
          `<meta property="og:title" content="${sanitizeMetaContent(title)}" />`
        );
        pageHtml = pageHtml.replace(
          /<meta property="og:description"[^>]*>/,
          `<meta property="og:description" content="${sanitizeMetaContent(description)}" />`
        );
        pageHtml = pageHtml.replace(
          /<meta property="og:url"[^>]*>/,
          `<meta property="og:url" content="${fullUrl}" />`
        );

        // 5. Update Twitter tags
        pageHtml = pageHtml.replace(
          /<meta name="twitter:title"[^>]*>/,
          `<meta name="twitter:title" content="${sanitizeMetaContent(title)}" />`
        );
        pageHtml = pageHtml.replace(
          /<meta name="twitter:description"[^>]*>/,
          `<meta name="twitter:description" content="${sanitizeMetaContent(description)}" />`
        );

        // 6. Inject structured schema if present in appHtml
        const schemaMatches = appHtml.match(/<script type="application\/ld\+json">.*?<\/script>/gs);
        if (schemaMatches && schemaMatches.length > 0) {
          pageHtml = pageHtml.replace('</head>', `  ${schemaMatches.join('\n  ')}\n</head>`);
        }

        // 7. Inject cleaned appHtml into #root (strip duplicate head tags that react-helmet might render inside body)
        const cleanAppHtml = appHtml
          .replace(/<title>.*?<\/title>/gi, '')
          .replace(/<meta\b[^>]*\/?>/gi, '')
          .replace(/<link\b[^>]*\/?>/gi, '');

        pageHtml = pageHtml.replace(
          '<div id="root"></div>',
          `<div id="root">${cleanAppHtml}</div>`
        );

        // Save files
        if (page.path === '/') {
          fs.writeFileSync(path.resolve(distDir, 'index.html'), pageHtml, 'utf-8');
        } else {
          const routeSlug = page.path.replace(/^\//, '');
          const routeDir = path.resolve(distDir, routeSlug);
          if (!fs.existsSync(routeDir)) {
            fs.mkdirSync(routeDir, { recursive: true });
          }
          fs.writeFileSync(path.resolve(routeDir, 'index.html'), pageHtml, 'utf-8');
          fs.writeFileSync(path.resolve(distDir, `${routeSlug}.html`), pageHtml, 'utf-8');
        }

        renderedRoutes.push({
          path: page.path,
          title: title.length > 60 ? title.slice(0, 57) + '...' : title,
          size: `${Math.round(pageHtml.length / 1024)} KB`
        });
      } catch (err) {
        console.warn(`⚠️ Failed to prerender ${page.path}: ${err.message}`);
      }
    }

    // Try fetching and prerendering dynamic articles
    try {
      const res = await fetch('https://apirevamp.exaque.com/api/v1/articles');
      if (res.ok) {
        const json = await res.json();
        const articles = json?.data?.data || json?.data || [];
        for (const art of articles) {
          if ((art.status || '').toLowerCase() === 'published' && art.slug) {
            const cleanSlug = art.slug.trim().replace(/^\/+|\/+$/g, '');
            const articlePath = `/blog/${cleanSlug}`;
            const fullUrl = `https://exaque.com${articlePath}`;
            const title = art.meta_title || `${art.title} - Exaque`;
            const description = art.meta_description || art.excerpt || 'Artikel wawasan Customer Journey Management dan sistem antrean dari Exaque.';
            const imageUrl = art.featured_image_url ? (art.featured_image_url.startsWith('http') ? art.featured_image_url : `https://apirevamp.exaque.com${art.featured_image_url}`) : 'https://exaque.com/og-image.png';

            let pageHtml = baseTemplate;
            pageHtml = pageHtml.replace(/<title>.*?<\/title>/s, `<title>${title}</title>`);
            pageHtml = pageHtml.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${sanitizeMetaContent(description)}" />`);
            pageHtml = pageHtml.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${fullUrl}" />`);
            pageHtml = pageHtml.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${sanitizeMetaContent(title)}" />`);
            pageHtml = pageHtml.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${sanitizeMetaContent(description)}" />`);
            pageHtml = pageHtml.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${fullUrl}" />`);
            pageHtml = pageHtml.replace(/<meta property="og:type"[^>]*>/, `<meta property="og:type" content="article" />`);
            pageHtml = pageHtml.replace(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${imageUrl}" />`);
            pageHtml = pageHtml.replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${sanitizeMetaContent(title)}" />`);
            pageHtml = pageHtml.replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${sanitizeMetaContent(description)}" />`);
            pageHtml = pageHtml.replace(/<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${imageUrl}" />`);

            // Schema Article
            const articleSchema = {
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": art.title,
              "image": [imageUrl],
              "datePublished": art.published_at || art.createdAt,
              "dateModified": art.updatedAt || art.published_at,
              "author": {
                "@type": "Person",
                "name": art.author_override || art.author_name || art.author?.name || "Tim Exaque"
              },
              "publisher": {
                "@type": "Organization",
                "name": "PT Exaque Mandiri Makmur",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://exaque.com/logo.png"
                }
              },
              "description": description
            };
            pageHtml = pageHtml.replace('</head>', `  <script type="application/ld+json">${JSON.stringify(articleSchema)}</script>\n</head>`);

            // Pre-render minimal semantic content so crawlers see article body immediately
            const minimalContent = `
              <article class="container mx-auto px-6 py-12 max-w-4xl">
                <h1 class="text-3xl md:text-5xl font-bold mb-6">${art.title}</h1>
                <p class="text-xl text-gray-600 mb-8">${description}</p>
                <div class="prose max-w-none">${art.content || ''}</div>
              </article>
            `;
            pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root">${minimalContent}</div>`);

            const routeDir = path.resolve(distDir, 'blog', cleanSlug);
            if (!fs.existsSync(routeDir)) {
              fs.mkdirSync(routeDir, { recursive: true });
            }
            fs.writeFileSync(path.resolve(routeDir, 'index.html'), pageHtml, 'utf-8');
            fs.writeFileSync(path.resolve(distDir, 'blog', `${cleanSlug}.html`), pageHtml, 'utf-8');

            renderedRoutes.push({
              path: articlePath,
              title: title.length > 60 ? title.slice(0, 57) + '...' : title,
              size: `${Math.round(pageHtml.length / 1024)} KB`
            });
          }
        }
      }
    } catch (e) {
      console.warn(`⚠️ Skipped dynamic article prerender: ${e.message}`);
    }

    // Try fetching and prerendering dynamic customer stories
    try {
      const res = await fetch('https://apirevamp.exaque.com/api/v1/stories');
      if (res.ok) {
        const json = await res.json();
        const stories = json?.data?.data || json?.data || [];
        for (const story of stories) {
          if ((story.status || '').toLowerCase() === 'published' && story.slug) {
            const storyPath = `/kisah-pelanggan/${story.slug}`;
            const fullUrl = `https://exaque.com${storyPath}`;
            const title = `${story.title} | Kisah Pelanggan Exaque`;
            const description = story.meta_description || story.excerpt || `Pelajari kisah sukses implementasi solusi antrean Exaque di ${story.title}.`;
            const imageUrl = story.featured_image_url ? (story.featured_image_url.startsWith('http') ? story.featured_image_url : `https://apirevamp.exaque.com${story.featured_image_url}`) : 'https://exaque.com/og-image.png';

            let pageHtml = baseTemplate;
            pageHtml = pageHtml.replace(/<title>.*?<\/title>/s, `<title>${title}</title>`);
            pageHtml = pageHtml.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${sanitizeMetaContent(description)}" />`);
            pageHtml = pageHtml.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${fullUrl}" />`);
            pageHtml = pageHtml.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${sanitizeMetaContent(title)}" />`);
            pageHtml = pageHtml.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${sanitizeMetaContent(description)}" />`);
            pageHtml = pageHtml.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${fullUrl}" />`);
            pageHtml = pageHtml.replace(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${imageUrl}" />`);

            const minimalContent = `
              <div class="container mx-auto px-6 py-12 max-w-4xl">
                <h1 class="text-3xl md:text-5xl font-bold mb-6">${story.title}</h1>
                <p class="text-xl text-gray-600 mb-8">${description}</p>
                <div class="prose max-w-none">${story.content || ''}</div>
              </div>
            `;
            pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root">${minimalContent}</div>`);

            const routeDir = path.resolve(distDir, 'kisah-pelanggan', story.slug);
            if (!fs.existsSync(routeDir)) {
              fs.mkdirSync(routeDir, { recursive: true });
            }
            fs.writeFileSync(path.resolve(routeDir, 'index.html'), pageHtml, 'utf-8');
            fs.writeFileSync(path.resolve(distDir, 'kisah-pelanggan', `${story.slug}.html`), pageHtml, 'utf-8');

            renderedRoutes.push({
              path: storyPath,
              title: title.length > 60 ? title.slice(0, 57) + '...' : title,
              size: `${Math.round(pageHtml.length / 1024)} KB`
            });
          }
        }
      }
    } catch (e) {
      console.warn(`⚠️ Skipped dynamic story prerender: ${e.message}`);
    }

  } finally {
    await vite.close();
  }

  console.log(`\n✅ Pre-rendering complete! Generated ${renderedRoutes.length} pages:`);
  console.table(renderedRoutes);
}

prerender().catch((err) => {
  console.error('Fatal prerender error:', err);
  process.exit(1);
});
