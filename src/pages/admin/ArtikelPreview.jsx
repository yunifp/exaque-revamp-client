import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useApi from "../../hooks/UseApi";

const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
);

const ArtikelPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { request } = useApi();
  const [article, setArticle] = useState(null);

  const getImageUrl = (path) => {
    if (!path) return "/placeholder-image.jpg";
    if (path.startsWith("https")) return path;
    const baseUrl = import.meta.env.VITE_API_BASE;
    return `${baseUrl}${path}`;
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await request("/articles?limit=1000");
        const found = response.data.data.find((a) => a.id === parseInt(id));
        setArticle(found);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArticle();
  }, [id, request]);

  if (!article) return <div className="p-8 text-center text-txt-subtle">Memuat artikel...</div>;

  const finalImageUrl = getImageUrl(article.featured_image_url);

  return (
    <div className="p-8 min-h-screen bg-primary">
      <style>{`
        #preview-content-wrapper { color: #374151; font-size: 1.125rem; line-height: 1.8; text-align: left !important; }
        #preview-content-wrapper p { margin-bottom: 20px !important; line-height: 1.8 !important; display: block; }
        #preview-content-wrapper h1 { font-size: 2.125rem !important; line-height: 1.3 !important; margin-top: 36px !important; margin-bottom: 16px !important; font-weight: 800 !important; color: #111827 !important; }
        #preview-content-wrapper h2 { font-size: 1.625rem !important; line-height: 1.35 !important; margin-top: 32px !important; margin-bottom: 14px !important; font-weight: 700 !important; color: #111827 !important; }
        #preview-content-wrapper h3 { font-size: 1.35rem !important; line-height: 1.4 !important; margin-top: 28px !important; margin-bottom: 12px !important; font-weight: 600 !important; color: #1f2937 !important; }
        #preview-content-wrapper h4 { font-size: 1.15rem !important; line-height: 1.45 !important; margin-top: 24px !important; margin-bottom: 10px !important; font-weight: 600 !important; color: #374151 !important; }
        #preview-content-wrapper blockquote { border-left: 4px solid #A9023A !important; background: #fdf2f4 !important; padding: 14px 20px !important; margin: 24px 0 !important; border-radius: 0 8px 8px 0 !important; font-style: italic !important; color: #4b5563 !important; }
        #preview-content-wrapper ul, #preview-content-wrapper ol { margin-bottom: 20px !important; padding-left: 20px !important; }
        #preview-content-wrapper ul { list-style: disc inside !important; }
        #preview-content-wrapper ol { list-style: decimal inside !important; }
        #preview-content-wrapper li { margin-bottom: 8px !important; line-height: 1.7 !important; }
        #preview-content-wrapper img { max-width: 100% !important; height: auto !important; border-radius: 12px !important; margin: 28px auto !important; display: block !important; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important; border: 1px solid #f3f4f6 !important; }
        #preview-content-wrapper a { color: #a60046; text-decoration: underline; font-weight: 500; }
        #preview-content-wrapper * { word-break: normal !important; overflow-wrap: break-word; hyphens: none !important; text-align: left !important; }
      `}</style>

      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate("/admin/artikel")} className="p-2 bg-white rounded-lg border border-subtle hover:bg-gray-50 transition-colors"><ArrowLeftIcon /></button>
        <h1 className="text-2xl font-bold text-txt-primary">Preview Artikel</h1>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-subtle max-w-4xl mx-auto">
        <div className="mb-6">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 capitalize ${article.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
            {article.status}
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{article.title}</h1>
          <div className="flex items-center text-sm text-gray-500 gap-4">
            <span>Penulis: {article.author_name || article.author?.name || "Admin"}</span>
            <span>|</span>
            <span>{new Date(article.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden mb-8 bg-gray-100 w-full h-[400px]">
          <img src={finalImageUrl} alt={article.title} className="w-full h-full object-cover" />
        </div>

        <div className="w-full">
            <div id="preview-content-wrapper" dangerouslySetInnerHTML={{ __html: (article.content || "").replace(/&nbsp;/g, " ") }} />
        </div>

        {(article.author_profile || article.author_quotes) && (
            <div className="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Tentang Penulis: {article.author_name || article.author?.name || "Admin"}</h3>
                {article.author_profile && <p className="text-gray-700 text-base mb-4 leading-relaxed">{article.author_profile}</p>}
                {article.author_quotes && (
                    <blockquote className="border-l-4 border-accent pl-4 italic text-gray-600 font-medium text-sm">
                        "{article.author_quotes}"
                    </blockquote>
                )}
            </div>
        )}

        {(article.meta_title || article.meta_description) && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h4 className="text-sm font-bold text-gray-700 mb-2">SEO Meta Data:</h4>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-800 mb-1"><strong>Title:</strong> {article.meta_title || article.title}</p>
                <p className="text-sm text-gray-600"><strong>Description:</strong> {article.meta_description || "Belum ada meta description."}</p>
            </div>
          </div>
        )}

        {article.tags && article.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h4 className="text-sm font-bold text-gray-700 mb-2">Tags:</h4>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag.id} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">{tag.name}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtikelPreview;