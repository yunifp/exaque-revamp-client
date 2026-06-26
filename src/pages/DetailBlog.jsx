import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useApi from "../hooks/UseApi";
import Hero from "../components/common/Hero";
import heroBg from "../assets/hero-blog.webp";

const DetailBlog = () => {
  const { slug } = useParams();
  const { request, loading } = useApi();

  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Pindahkan getImageUrl ke atas agar bisa digunakan di dalam useEffect meta tags
  const getImageUrl = (path) => {
    if (!path) return "/placeholder-image.jpg";
    if (path.startsWith("https")) return path;
    const baseUrl = import.meta.env.VITE_API_BASE;
    return `${baseUrl}${path}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const detailRes = await request(`/articles/${slug}`);
        const rawDetail = detailRes.data;
        const articleData = rawDetail?.data || rawDetail;
        setPost(articleData);

        const [recentRes, catRes] = await Promise.all([
          request("/articles"),
          request("/article-categories"),
        ]);

        const rawRecent = recentRes.data;
        const allArticles = rawRecent?.data || rawRecent || [];

        if (Array.isArray(allArticles) && articleData) {
          const otherArticles = allArticles
            .filter(
              (a) =>
                a.id !== articleData.id &&
                (a.status || "").toLowerCase() === "published"
            )
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 3);

          setRecentPosts(otherArticles);
        }

        const rawCat = catRes.data;
        const catData = rawCat?.data || rawCat || [];
        if (Array.isArray(catData)) {
          setCategories(catData);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (slug) {
      fetchData();
      window.scrollTo(0, 0);
    }
  }, [slug, request]);

  // useEffect yang diperbarui untuk injeksi meta tags (termasuk og:image otomatis)
  useEffect(() => {
    if (post) {
      document.title = post.meta_title || post.title || "Exaque";
      
      const setMetaTag = (attrName, attrValue, content) => {
        let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute(attrName, attrValue);
          document.head.appendChild(element);
        }
        element.content = content;
      };

      const description = post.meta_description || "Layanan Berbasis AI Exaque";
      const imageUrl = getImageUrl(post.featured_image_url);
      const currentUrl = window.location.href;

      // Standard Meta Description
      setMetaTag('name', 'description', description);

      // Open Graph Tags (Untuk WhatsApp, Facebook, LinkedIn)
      setMetaTag('property', 'og:title', post.meta_title || post.title);
      setMetaTag('property', 'og:description', description);
      setMetaTag('property', 'og:image', imageUrl);
      setMetaTag('property', 'og:url', currentUrl);
      setMetaTag('property', 'og:type', 'article');

      // Twitter Card Tags (Untuk X / Twitter)
      setMetaTag('name', 'twitter:card', 'summary_large_image');
      setMetaTag('name', 'twitter:title', post.meta_title || post.title);
      setMetaTag('name', 'twitter:description', description);
      setMetaTag('name', 'twitter:image', imageUrl);
    }
  }, [post]);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = (platform) => {
    const currentUrl = encodeURIComponent(window.location.href);
    const postTitle = encodeURIComponent(post?.title || "");
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
        break;
      case "x":
        shareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${postTitle}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
        break;
      case "threads":
        shareUrl = `https://threads.net/intent/post?text=${postTitle}%20${currentUrl}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${postTitle}%20${currentUrl}`;
        break;
      default:
        return;
    }

    const width = 600;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    window.open(
      shareUrl,
      "_blank",
      `width=${width},height=${height},top=${top},left=${left},menubar=no,toolbar=no,resizable=yes,scrollbars=yes`
    );
  };

  if (loading && !post) return <div className="py-40 text-center">Memuat...</div>;

  if (!post && !loading)
    return (
      <div className="py-40 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Artikel Tidak Ditemukan</h2>
        <Link to="/blog" className="text-accent underline mt-4 block">Kembali ke Blog</Link>
      </div>
    );

  const heroProps = {
    hideContent: true,
    imageUrl: heroBg,
    isDetailPage: true,
  };

  const authorName = post.author_override || post.author_name || post.author?.name || "Tim Exaque";
  const authorBio = post.author_profile || post.author?.profile || "Penulis aktif membagikan wawasan dan informasi seputar solusi IT terintegrasi.";
  const authorQuotes = post.author_quotes || null;
  const initial = authorName.charAt(0).toUpperCase();

  return (
    <div className="bg-primary min-h-screen">
      <Hero {...heroProps} />
      
      <style>{`
        #blog-content-wrapper {
          color: #374151;
          font-size: 1.125rem;
          line-height: 1.5;
          text-align: left;
        }
        #blog-content-wrapper p { margin-bottom: 12px !important; display: block; }
        #blog-content-wrapper h1, #blog-content-wrapper h2, #blog-content-wrapper h3 {
          margin-top: 24px !important; margin-bottom: 12px !important; font-weight: 700; color: #111827;
        }
        #blog-content-wrapper ul, #blog-content-wrapper ol {
          margin-bottom: 12px !important; padding-left: 16px !important;
        }
        #blog-content-wrapper ul { list-style: disc inside !important; }
        #blog-content-wrapper ol { list-style: decimal inside !important; }
        #blog-content-wrapper img {
          max-width: 100% !important; height: auto !important; border-radius: 8px; margin: 24px auto !important; display: block;
        }
        #blog-content-wrapper * {
          word-break: normal !important; overflow-wrap: break-word; hyphens: none !important; text-align: left !important;
        }
      `}</style>

      <div className="container mx-auto px-6 max-w-6xl pb-20">
        
        <div className="text-sm text-gray-500 mb-8 uppercase tracking-wide font-medium mt-8 flex items-center gap-2">
          <Link to="/blog" className="hover:text-accent transition-colors">BLOG</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{post.categories?.[0]?.name || "DETAIL"}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          <div className="lg:col-span-2 min-w-0 w-full">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight text-left">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-6">
              <div className="flex items-center gap-2 text-accent font-semibold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span>{formatDate(post.published_at || post.createdAt)}</span>
              </div>
              
              <Link 
                to="/blog" 
                state={{ authorId: post.author_id, authorName: authorName }}
                className="flex items-center gap-2 text-gray-500 font-medium hover:text-accent transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                <span>{authorName}</span>
              </Link>
            </div>

            <div className="rounded-2xl overflow-hidden mb-10 shadow-sm bg-gray-100 border border-gray-100">
              <img
                src={getImageUrl(post.featured_image_url)}
                alt={post.title}
                className="w-full h-auto object-cover max-h-[500px]"
                onError={(e) => { e.target.src = "https://placehold.co/1200x600?text=No+Image"; }}
              />
            </div>

            <div className="w-full">
               <div 
                 id="blog-content-wrapper" 
                 dangerouslySetInnerHTML={{ __html: (post.content || "").replace(/&nbsp;/g, " ") }} 
               />
            </div>

            <div className="mt-12 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">Bagikan Artikel Ini:</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleShare('facebook')} className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-md">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </button>
                  <button onClick={() => handleShare('x')} className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-md">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </button>
                  <button onClick={() => handleShare('linkedin')} className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-md">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </button>
                  <button onClick={() => handleShare('threads')} className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-md">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M14.16 20.31c-.5.12-1.06.19-1.66.19-4.32 0-7.5-3.18-7.5-7.5s3.18-7.5 7.5-7.5 7.5 3.18 7.5 7.5v.19c0 2.09-1.04 3.12-2.34 3.12-1.09 0-1.87-.73-1.87-1.84v-4.16c0-1.78-1.28-3.09-3.09-3.09-1.9 0-3.37 1.53-3.37 3.53s1.47 3.53 3.37 3.53c.87 0 1.62-.31 2.19-.84.28.94.97 1.56 1.87 1.56.91 0 1.62-.62 2.03-1.53h.03v1.31c0 1.59-.97 2.5-2.28 2.5-1.03 0-1.69-.53-1.97-1.28l-1.91 1.09c.56 1.25 1.87 2.06 3.88 2.06 2.37 0 4.16-1.59 4.16-4.37v-.19c0-5.31-4.06-9.37-9.37-9.37-5.31 0-9.37 4.06-9.37 9.37 0 5.31 4.06 9.37 9.37 9.37 1.12 0 2.16-.19 3.09-.56l-.84-1.78zM12.5 12.81c-1 0-1.69-.87-1.69-1.81s.69-1.81 1.69-1.81 1.69.87 1.69 1.81-.69 1.81-1.69 1.81z"/></svg>
                  </button>
                  <button onClick={() => handleShare('whatsapp')} className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:-translate-y-1 transition-transform shadow-md">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 lg:hidden">
                <Link to="/blog" className="text-accent font-semibold flex items-center gap-2">&larr; Kembali ke Blog</Link>
            </div>
          </div>

          <div className="lg:col-span-1 w-full pl-0 lg:pl-8">
            <div className="sticky top-28 space-y-12">

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent opacity-5 rounded-bl-full z-0 transition-transform group-hover:scale-110"></div>
                  <div className="relative z-10 flex flex-col items-center text-center">
                      
                      {post.author_image ? (
                        <div className="w-20 h-20 rounded-full overflow-hidden shadow-md border-4 border-white mb-4">
                          <img 
                            src={getImageUrl(post.author_image)} 
                            alt={authorName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 bg-gradient-to-br from-accent to-blue-700 text-white rounded-full flex items-center justify-center text-3xl font-extrabold shadow-md border-4 border-white mb-4">
                            {initial}
                        </div>
                      )}

                      <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">
                          Penulis Artikel
                      </span>
                      
                      <Link 
                        to="/blog" 
                        state={{ authorId: post.author_id, authorName: authorName }}
                        className="hover:text-accent transition-colors"
                      >
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                            {authorName}
                        </h3>
                      </Link>

                      <p className="text-sm text-gray-600 leading-relaxed mb-5">
                          {authorBio}
                      </p>

                      {authorQuotes && (
                          <div className="w-full bg-gray-50 rounded-xl p-4 border border-gray-100 relative text-left">
                              <svg className="w-6 h-6 text-accent opacity-20 absolute -top-2 -left-1" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                              </svg>
                              <p className="text-gray-700 italic font-medium leading-relaxed z-10 relative pl-4 text-xs">
                                  "{authorQuotes}"
                              </p>
                          </div>
                      )}
                  </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">Artikel Terbaru</h3>
                <div className="space-y-6">
                  {recentPosts.length > 0 ? (
                      recentPosts.map((recent) => (
                        <Link key={recent.id} to={`/blog/${recent.slug}`} className="flex items-center gap-4 group">
                          <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden border border-gray-100">
                            <img src={getImageUrl(recent.featured_image_url)} alt={recent.title} className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" />
                          </div>
                          <div>
                            <p className="text-xs text-accent font-semibold mb-1 flex items-center gap-1">{formatDate(recent.published_at || recent.created_at)}</p>
                            <h4 className="text-base font-bold text-gray-800 group-hover:text-accent transition-colors line-clamp-2">{recent.title}</h4>
                          </div>
                        </Link>
                      ))
                  ) : (
                      <p className="text-sm text-gray-400 italic bg-gray-50 p-4 rounded-lg text-center">
                        Belum ada artikel lainnya.
                      </p>
                  )}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Kategori</h3>
                <ul className="space-y-3">
                  {categories.length > 0 ? (
                      categories.map((cat, idx) => (
                        <li key={idx}>
                          <Link
                            to="/blog"
                            state={{ category: cat.name }}
                            className="text-gray-600 hover:text-accent hover:pl-2 transition-all block text-sm border-b border-gray-100 pb-2 capitalize"
                          >
                            {cat.name}
                          </Link>
                        </li>
                      ))
                  ) : (
                      <li className="text-sm text-gray-400 italic">Tidak ada kategori.</li>
                  )}
                </ul>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetailBlog;